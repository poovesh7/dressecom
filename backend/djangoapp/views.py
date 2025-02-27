
from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from .serializers import *
from django.conf import settings
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

from .models import *


from rest_framework.permissions import IsAuthenticated

@csrf_exempt 
@api_view(['POST'])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



User = get_user_model()

 # Ensure you have a serializer for the CustomUser model

class CustomerRetailerListView(APIView):
    def get(self, request):
        customers = User.objects.filter(role='customer')
        retailers = User.objects.filter(role='Retailers')

        customer_count = customers.count()
        retailer_count = retailers.count()

        serializer = UserSerializer(customers | retailers, many=True)  # Merging Querysets

        return Response({
            "total_customers": customer_count,
            "total_retailers": retailer_count,
            
        }, status=status.HTTP_200_OK)




class SignupView(APIView):
    """
    Handles user registration and sends an email with login credentials.
    """

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role', 'customer')  # Default role is 'customer'

        if not username or not email or not password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.role = role  # Assign role if using custom user model
            user.save()

            # Send email with username and password
            subject = "Your Account Details"
            message = f"""
            Hello {username} Welcome to Our Kevin Shops,

            Your account has been successfully created.

            Username: {username}
            Password: {password} 
            Role: {role}

            You can log in using your credentials.

            Regards,
            Kvin Shops
            """

            send_mail(subject, message, settings.EMAIL_HOST_USER, [email], fail_silently=False)

            
            print(send_mail)

            return Response({'message': 'User created successfully. Email sent.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    """
    Handles user authentication and JWT token generation.
    """

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data  

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': user_data
        }, status=status.HTTP_200_OK)



class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Retrieve the authenticated user's profile."""
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Create a new user profile."""
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        """Update the authenticated user's profile."""
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

