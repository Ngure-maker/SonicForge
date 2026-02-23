from django.contrib import admin
from .models import Rental


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'start_date', 'end_date', 'rental_price', 'status')
    list_filter = ('status',)
