from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .serializers import UserSerializer  




# Get the custom user model
User = get_user_model()

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the new user
        user = User.objects.create_user(username=username, email=email, password=password,role=role)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)



class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')
        print(request.data)
        user = authenticate(username=username, password=password, role=role)

        if user is not None:
            if user.role == 'Admin':
                refresh = RefreshToken.for_user(user)
                user_data = UserSerializer(user).data  # Serialize user data
                return Response({
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_200_OK)
                
            if user.role != role:
                return Response({'error': 'Role does not match'}, status=status.HTTP_400_BAD_REQUEST)
            
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data  # Serialize user data
            return Response({
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    



