from django.contrib.auth import get_user_model
from rest_framework import serializers
# from .models import Product
from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')  # Show category name

    class Meta:
        model = Product
        fields = ["id", "retailer", "name", "price", "category", "image"]
        read_only_fields = ['retailer']  # Retailer is set automatically


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role', 'address', 'contact']  # Fixed naming


