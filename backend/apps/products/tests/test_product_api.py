from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.products.models import Product
from apps.users.models import User


class ProductAPITestCase(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email='admin@example.com',
            full_name='Admin',
            password='StrongPass123',
            role='admin',
            is_staff=True,
        )
        Product.objects.create(
            name='Studio Monitor',
            description='Professional monitor',
            price='60000.00',
            stock=4,
            category='Monitors',
            brand='Yamaha',
            is_featured=True,
        )

    def test_list_products(self):
        url = reverse('products-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_admin_can_create_product(self):
        self.client.force_authenticate(user=self.admin)
        url = reverse('products-list-create')
        payload = {
            'name': 'Audio Interface',
            'description': 'USB interface',
            'price': '25000.00',
            'stock': 10,
            'category': 'Interfaces',
            'brand': 'Focusrite',
            'is_featured': False,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
