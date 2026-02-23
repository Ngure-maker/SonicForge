from django.urls import path
from .views import CreateOrderView, MyOrdersView, OrderDetailView

urlpatterns = [
    path('', CreateOrderView.as_view(), name='create-order'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),
    path('<int:id>/', OrderDetailView.as_view(), name='order-detail'),
]
