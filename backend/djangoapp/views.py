# from rest_framework.response import Response
# from rest_framework.decorators import api_view

# @api_view(['GET'])
# def test_api(request):
#     return Response({"message": "Django-React connection successful!"})

# @api_view(['GET'])
# def product_list(request):
#     PRODUCTS = [
#         {"id": 1, "name": "Laptop", "price": 50000},
#         {"id": 2, "name": "Mobile", "price": 20000},
#     ]
#     return Response(PRODUCTS)



# login

from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
