from django.urls import path
from .views import ProductDetailBySlugView, ProductListCreateView, ProductUpdateDeleteView

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='products-list-create'),
    path('<slug:slug>/', ProductDetailBySlugView.as_view(), name='product-detail-slug'),
    path('id/<int:id>/', ProductUpdateDeleteView.as_view(), name='product-update-delete'),
]
