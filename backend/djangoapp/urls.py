

from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('customers-retailers/', CustomerRetailerListView.as_view(), name='customer-retailer-list'),
    
 
]



