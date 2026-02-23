from django.db import models

from apps.products.models import Product


class Rental(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='rentals')
    start_date = models.DateField()
    end_date = models.DateField()
    rental_price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=['status']), models.Index(fields=['start_date', 'end_date'])]

    def __str__(self):
        return f'{self.product.name} ({self.start_date} to {self.end_date})'
