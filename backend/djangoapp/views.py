
# # # login

# # from django.contrib.auth.models import User
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status
# # from rest_framework_simplejwt.tokens import RefreshToken
# # from django.contrib.auth import authenticate

# # class SignupView(APIView):
# #     def post(self, request):
# #         username = request.data.get('username')
# #         email = request.data.get('email')
# #         password = request.data.get('password')

# #         if User.objects.filter(username=username).exists():
# #             return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

# #         user = User.objects.create_user(username=username, email=email, password=password)
# #         return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# # class LoginView(APIView):
# #     def post(self, request):
# #         username = request.data.get('username')
# #         password = request.data.get('password')
# #         user = authenticate(username=username, password=password)

# #         if user is not None:
# #             refresh = RefreshToken.for_user(user)
# #             return Response({'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
# #         return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# from django.contrib.auth import get_user_model, authenticate
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken

# User = get_user_model()  # Use the custom user model

# class SignupView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         email = request.data.get('email')
#         password = request.data.get('password')

#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

#         if User.objects.filter(email=email).exists():
#             return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.create_user(username=username, email=email, password=password)
#         return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(username=username, password=password)

#         if user is not None:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'access': str(refresh.access_token),
#                 'refresh': str(refresh)
#             }, status=status.HTTP_200_OK)

#         return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

User = get_user_model()  # Use the custom user model

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class GetUserListView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication

    def get(self, request):
        user_ids = request.GET.getlist('ids')  # Example: ?ids=1&ids=2&ids=3
        if not user_ids:
            return Response({'error': 'No user IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        users = User.objects.filter(id__in=user_ids).values('id', 'username', 'email')

        return Response(users, status=status.HTTP_200_OK)
