from django.contrib import admin
from .models import PaymentTransaction


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'checkout_request_id', 'status', 'amount', 'created_at')
    search_fields = ('checkout_request_id', 'merchant_request_id', 'mpesa_receipt_number')
    list_filter = ('status',)
