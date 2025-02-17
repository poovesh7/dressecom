

from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from .models import *

# class CustomUserAdmin(UserAdmin):
#     model = CustomUser
#     list_display = ('username', 'email', 'role', 'is_staff')
#     list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')

admin.site.register(CustomUser)
admin.site.register(Customer)
