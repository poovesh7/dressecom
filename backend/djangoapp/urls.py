from django.urls import path
from .views import *


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('customers-retailers/', CustomerRetailerListView.as_view(), name='customer-retailer-list'),
    path('profile/',ProfileView.as_view(), name='profile'),
    
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/add/', ProductCreateView.as_view(), name='product-add'),
    path('products/update/<int:pk>/', ProductUpdateView.as_view(), name='product-update'),
    path('products/delete/<int:pk>/', ProductDeleteView.as_view(), name='product-delete'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    
]





