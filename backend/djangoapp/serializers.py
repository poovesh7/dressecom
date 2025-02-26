from django.contrib.auth import get_user_model
from rest_framework import serializers
# from .models import Product
from rest_framework import serializers
from .models import Product


User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'image','username']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role', 'address', 'contact']  # Fixed naming


