from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'price', 'stock', 'is_featured')
    search_fields = ('name', 'category', 'brand')
    prepopulated_fields = {'slug': ('name',)}
