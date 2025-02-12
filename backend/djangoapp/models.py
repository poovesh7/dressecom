from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

# # from django.db import models
# # from django.contrib.auth.models import AbstractUser

# # class CustomUser(AbstractUser):
# #     email = models.EmailField(unique=True)
# #     password = models.CharField(max_length=128)

# #     groups = models.ManyToManyField(
# #         "auth.Group",
# #         related_name="customuser_set",
# #         blank=True
# #     )
# #     user_permissions = models.ManyToManyField(
# #         "auth.Permission",
# #         related_name="customuser_permissions_set",
# #         blank=True
# #     )

# #     def __str__(self):
# #         return self.username



# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class CustomUser(AbstractUser):
#     email = models.EmailField(unique=True)  # Ensuring email is unique

#     def __str__(self):
#         return self.username
