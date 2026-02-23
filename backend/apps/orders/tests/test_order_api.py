from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.products.models import Product
from apps.users.models import User


class OrderCreationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='buyer@example.com',
            full_name='Buyer',
            password='StrongPass123',
            role='customer',
        )
        self.product = Product.objects.create(
            name='Microphone',
            description='Condenser mic',
            price='10000.00',
            stock=10,
            category='Microphones',
            brand='Rode',
        )

    def test_create_order(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('create-order')
        payload = {'items': [{'product_id': self.product.id, 'quantity': 2}]}
        response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(str(response.data['total_amount']), '20000.00')
