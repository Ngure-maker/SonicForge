import logging

from django.db import transaction
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.orders.models import Order

from .models import PaymentTransaction
from .serializers import STKPushSerializer
from .services.daraja_service import DarajaService

logger = logging.getLogger(__name__)


class STKPushView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = STKPushSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = Order.objects.filter(id=serializer.validated_data['order_id'], user=request.user).first()
        if not order:
            return Response({'detail': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)

        daraja = DarajaService()
        response_data = daraja.stk_push(
            phone_number=serializer.validated_data['phone_number'],
            amount=order.total_amount,
            account_reference=f'ORDER-{order.id}',
            transaction_desc='SonicForge order payment',
        )

        checkout_request_id = response_data.get('CheckoutRequestID', '')
        merchant_request_id = response_data.get('MerchantRequestID', '')

        PaymentTransaction.objects.create(
            order=order,
            checkout_request_id=checkout_request_id,
            merchant_request_id=merchant_request_id,
            phone_number=serializer.validated_data['phone_number'],
            amount=order.total_amount,
            status='pending',
        )

        order.payment_reference = checkout_request_id
        order.save(update_fields=['payment_reference'])

        return Response(response_data, status=status.HTTP_200_OK)


class CallbackView(APIView):
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def post(self, request):
        payload = request.data
        body = payload.get('Body', {})
        callback = body.get('stkCallback', {})

        checkout_request_id = callback.get('CheckoutRequestID', '')
        result_code = str(callback.get('ResultCode', ''))
        result_desc = callback.get('ResultDesc', '')

        tx = PaymentTransaction.objects.select_related('order').filter(checkout_request_id=checkout_request_id).first()
        if not tx:
            logger.warning('Callback received for unknown checkout_request_id=%s', checkout_request_id)
            return Response({'ResultCode': 0, 'ResultDesc': 'Accepted'})

        metadata_items = callback.get('CallbackMetadata', {}).get('Item', [])
        metadata = {item.get('Name'): item.get('Value') for item in metadata_items if isinstance(item, dict)}

        tx.result_code = result_code
        tx.result_desc = result_desc
        tx.mpesa_receipt_number = str(metadata.get('MpesaReceiptNumber', ''))
        tx.status = 'paid' if result_code == '0' else 'failed'
        tx.save(update_fields=['result_code', 'result_desc', 'mpesa_receipt_number', 'status', 'updated_at'])

        tx.order.status = 'paid' if result_code == '0' else 'failed'
        tx.order.payment_reference = tx.mpesa_receipt_number or tx.checkout_request_id
        tx.order.save(update_fields=['status', 'payment_reference'])

        return Response({'ResultCode': 0, 'ResultDesc': 'Accepted'})


class VerifyPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        checkout_request_id = request.data.get('checkout_request_id')
        tx = PaymentTransaction.objects.select_related('order').filter(checkout_request_id=checkout_request_id).first()
        if not tx:
            return Response({'detail': 'Transaction not found.'}, status=status.HTTP_404_NOT_FOUND)
        if tx.order.user_id != request.user.id and request.user.role != 'admin':
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

        daraja = DarajaService()
        response_data = daraja.query_status(checkout_request_id=checkout_request_id)

        result_code = str(response_data.get('ResultCode', ''))
        tx.result_code = result_code
        tx.result_desc = response_data.get('ResultDesc', tx.result_desc)

        if result_code == '0':
            tx.status = 'paid'
            tx.order.status = 'paid'
        elif result_code:
            tx.status = 'failed'
            tx.order.status = 'failed'

        tx.save(update_fields=['result_code', 'result_desc', 'status', 'updated_at'])
        tx.order.save(update_fields=['status'])

        return Response(response_data)
