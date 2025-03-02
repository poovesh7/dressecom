from django.urls import path
from .views import *


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('customers-retailers/', CustomerRetailerListView.as_view(), name='customer-retailer-list'),
    path('profile/',ProfileView.as_view(), name='profile'),

    path('products/', ProductListCreate.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    
  
    
]





