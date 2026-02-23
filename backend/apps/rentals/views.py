from rest_framework import generics, permissions

from apps.core.permissions import IsAdmin
from .models import Rental
from .serializers import RentalSerializer


class RentalListCreateView(generics.ListCreateAPIView):
    queryset = Rental.objects.select_related('product').all()
    serializer_class = RentalSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [permissions.AllowAny()]
