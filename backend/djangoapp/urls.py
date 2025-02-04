# from django.urls import path
# from . import views  # Import views from your app

# urlpatterns = [
#     path('test/', views.test_api),  # Test API endpoint
#     path('products/', views.product_list),  # Products API endpoint
# ]

from django.urls import path
from .views import SignupView, LoginView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),  # Endpoint: /api/signup/
    path('login/', LoginView.as_view(), name='login'),      # Endpoint: /api/login/
]

