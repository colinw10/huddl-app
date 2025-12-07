# 🟡 NATALIA - Auth & Users Lead
# models.py - Extended user profile data

from django.db import models
# models = Django's tools for creating database tables
from django.contrib.auth.models import User
# User = Django's built-in user model (username, email, password)

# Profile model extends Django's built-in User
# One-to-One relationship: each User has exactly one Profile
class Profile(models.Model):
    # Link to Django's User model (username, email, password stored there)
    # on_delete=models.CASCADE means: if User deleted, Profile deleted too
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # user = this Profile belongs to a User
    # OneToOneField = 1 User has 1 Profile (not many)
    # on_delete=models.CASCADE = if User deleted, delete this Profile too
    # related_name='profile' = lets you do user.profile to get the profile
    
    # Profile fields
    bio = models.TextField(max_length=500, blank=True)
    # TextField = stores long text (like paragraphs)
    # max_length=500 = can't exceed 500 characters
    # blank=True = this field is optional (user doesn't have to fill it)
    
    avatar = models.URLField(max_length=500, blank=True)
    # URLField = stores a web address (validates it's a proper URL)
    # We're storing the URL to their avatar image, not the image itself
    
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(max_length=200, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    # DateTimeField = stores date + time
    # auto_now_add=True = automatically set to NOW when profile created
    # Never changes after that
    
    updated_at = models.DateTimeField(auto_now=True)
    # auto_now=True = automatically updates to NOW every time profile saved
    
    def __str__(self):
        return f"{self.user.username}'s profile"
        # This makes the profile display nicely in Django admin
        # Instead of "Profile object (1)", you see "pablo_cordero's profile"