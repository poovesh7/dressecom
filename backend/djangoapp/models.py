from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('Retailers', 'Retailers'),
        ('Customer', 'Customer'),  # Added Customer Role
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)

    contact = models.CharField(max_length=15, null=True, blank=True)  # Fixed naming
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.username

class Customer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='customer_profile')

    date_of_birth = models.DateField(null=True, blank=True)
    login_role = models.CharField(max_length=15, default='Customer')

    def __str__(self):
        return f"{self.user.username}'s Profile"
    