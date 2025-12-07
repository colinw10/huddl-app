# =============================================================================
# FRIENDS APP - SERIALIZERS
# =============================================================================
#
# File: backend/friends/serializers.py
# Assigned to: CRYSTAL
# Responsibility: Convert Friendship model ↔ JSON
#
# TODO:
# - [ ] Import Friendship model
# - [ ] Create FriendshipSerializer with ModelSerializer
# - [ ] Include fields: id, user, friend, created_at
# - [ ] Add nested user serializer for display
#
# Status: PLACEHOLDER
# =============================================================================

from rest_framework import serializers
from django.contrib.auth.models import User
# TODO: Crystal - Import your models
# from .models import Friendship


class UserSerializer(serializers.ModelSerializer):
    """Simple user serializer for friend display"""
    class Meta:
        model = User
        fields = ['id', 'username']


class FriendshipSerializer(serializers.ModelSerializer):
    """
    Crystal: Serialize Friendship model to/from JSON
    
    Example output:
    {
        "id": 1,
        "user": {"id": 1, "username": "crystal"},
        "friend": {"id": 2, "username": "pablo"},
        "created_at": "2024-01-15T10:30:00Z"
    }
    """
    # TODO: Crystal - Configure serializer
    # user = UserSerializer(read_only=True)
    # friend = UserSerializer(read_only=True)
    # 
    # class Meta:
    #     model = Friendship
    #     fields = ['id', 'user', 'friend', 'created_at']
    pass
