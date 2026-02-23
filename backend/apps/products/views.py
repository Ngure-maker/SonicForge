from rest_framework import filters, generics
from rest_framework.permissions import AllowAny

from apps.core.permissions import IsAdmin
from .models import Product
from .serializers import ProductSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category', 'brand']
    ordering_fields = ['created_at', 'price']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [AllowAny()]

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        brand = self.request.query_params.get('brand')
        featured = self.request.query_params.get('featured')
        if category:
            queryset = queryset.filter(category__iexact=category)
        if brand:
            queryset = queryset.filter(brand__iexact=brand)
        if featured in ['true', 'false']:
            queryset = queryset.filter(is_featured=(featured == 'true'))
        return queryset


class ProductDetailBySlugView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class ProductUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdmin]
    lookup_field = 'id'
