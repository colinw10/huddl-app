"""
===============================================================================
FRIENDS SERIALIZERS
===============================================================================

File: backend/friends/serializers.py
Assigned to: CRYSTAL 🟣
Responsibility: Convert Friend models to/from JSON

SERIALIZERS TO CREATE:

1. UserSerializer - for nested user data in responses
2. FriendshipSerializer - for friend list
3. FriendRequestSerializer - for pending requests

===============================================================================
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
# TODO: Import your models after creating them
# from .models import Friendship, FriendRequest

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Simple user serializer for nested data"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class FriendshipSerializer(serializers.ModelSerializer):
    """
    TODO: Implement FriendshipSerializer
    
    Should return the friend's info (the OTHER user, not current user)
    
    Tip: Use SerializerMethodField to get the correct friend
    """
    pass  # TODO: Implement after model is created


class FriendRequestSerializer(serializers.ModelSerializer):
    """
    TODO: Implement FriendRequestSerializer
    
    Should include nested from_user data
    """
    pass  # TODO: Implement after model is created
