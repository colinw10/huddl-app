# 🟣 CRYSTAL - Friends System Lead
# serializers.py - Data conversion between Django models and JSON

from rest_framework import serializers
from .models import Friendship, FriendRequest
from users.serializers import UserSerializer

# Create your serializers here.

class FriendshipSerializer(serializers.ModelSerializer):
    """Serializer for Friendship model - shows user and friend details"""
    # Nested serializers = instead of just showing user ID, show full user data
    # read_only=True = can't create/update friendships by passing user objects
    user = UserSerializer(read_only=True)
    friend = UserSerializer(read_only=True)
    
    class Meta:
        model = Friendship
        # Fields that will appear in JSON
        fields = ['id', 'user', 'friend', 'created_at']
        # These fields can't be modified via API
        read_only_fields = ['created_at']


class FriendRequestSerializer(serializers.ModelSerializer):
    """Serializer for FriendRequest model - shows who sent and received"""
    # Nested user objects for from_user and to_user
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)
    
    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'created_at']
        read_only_fields = ['created_at']
