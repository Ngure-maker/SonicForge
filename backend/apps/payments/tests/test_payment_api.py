from unittest.mock import patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.orders.models import Order
from apps.users.models import User


class PaymentInitiationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='paying@example.com',
            full_name='Paying User',
            password='StrongPass123',
            role='customer',
        )
        self.order = Order.objects.create(user=self.user, total_amount='5000.00', status='pending')

    @patch('apps.payments.views.DarajaService.stk_push')
    def test_stk_push(self, mock_stk_push):
        mock_stk_push.return_value = {
            'MerchantRequestID': '12345',
            'CheckoutRequestID': 'ws_CO_12345',
            'ResponseCode': '0',
            'ResponseDescription': 'Success. Request accepted for processing',
        }

        self.client.force_authenticate(user=self.user)
        url = reverse('stk-push')
        payload = {'order_id': self.order.id, 'phone_number': '254700000000'}
        response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['CheckoutRequestID'], 'ws_CO_12345')
