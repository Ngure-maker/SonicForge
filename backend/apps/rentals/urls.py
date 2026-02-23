from django.urls import path
from .views import RentalListCreateView

urlpatterns = [
    path('', RentalListCreateView.as_view(), name='rentals-list-create'),
]
