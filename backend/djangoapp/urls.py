# from django.urls import path
# from . import views  # Import views from your app

# urlpatterns = [
#     path('test/', views.test_api),  # Test API endpoint
#     path('products/', views.product_list),  # Products API endpoint
# ]

from django.urls import path
from .views import SignupView, LoginView, GetUserListView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('get-users/', GetUserListView.as_view(), name='get_users'),
]


