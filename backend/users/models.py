from django.db import models

# USERS APP - MODELS
# Owner: Colin (Backend Lead) + Natalia (User Profile Features)
# Status: EMPTY - needs implementation
#
# Purpose: Define User model and profile extensions
#
# TODO:
# - Extend Django's built-in User model (AbstractUser)
# - Add custom fields: bio, avatar, location, website, etc.
# - Add timestamps (created_at, updated_at)
# - Add __str__ method returning username
# - Create Profile model if separating user data (optional)
# - Create migrations: python manage.py makemigrations
# - Apply migrations: python manage.py migrate
# - Register model in admin.py
#
# Example:
# from django.contrib.auth.models import AbstractUser
# 
# class User(AbstractUser):
#     bio = models.TextField(blank=True)
#     avatar = models.URLField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#
# Create your models here.
