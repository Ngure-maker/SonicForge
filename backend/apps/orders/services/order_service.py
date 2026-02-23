from decimal import Decimal

from django.core.mail import send_mail
from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.products.models import Product
from apps.orders.models import Order, OrderItem


@transaction.atomic
def create_order(*, user, items):
    if not items:
        raise ValidationError('Order items are required.')

    order = Order.objects.create(user=user, status='pending', total_amount=Decimal('0.00'))
    running_total = Decimal('0.00')

    for item in items:
        product_id = item.get('product_id')
        quantity = int(item.get('quantity', 0))
        if quantity < 1:
            raise ValidationError('Quantity must be at least 1.')

        product = Product.objects.select_for_update().filter(id=product_id).first()
        if not product:
            raise ValidationError(f'Product {product_id} not found.')
        if product.stock < quantity:
            raise ValidationError(f'Insufficient stock for {product.name}.')

        product.stock -= quantity
        product.save(update_fields=['stock'])

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.price,
        )
        running_total += product.price * quantity

    order.total_amount = running_total
    order.save(update_fields=['total_amount'])

    send_mail(
        subject=f'Order #{order.id} confirmation',
        message=f'Your order was created. Total amount: {order.total_amount}',
        from_email=None,
        recipient_list=[user.email],
        fail_silently=True,
    )

    return order
