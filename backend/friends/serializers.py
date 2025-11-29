"""
=============================================================================
FRIENDS APP - SERIALIZERS
=============================================================================

File: backend/friends/serializers.py
Assigned to: CRYSTAL
Responsibility: FriendRequest and Friendship serializers

TODO:
- [ ] Create FriendRequestSerializer:
      - from_user (nested UserSerializer, read_only)
      - to_user (nested UserSerializer, read_only)
      - to_user_id (write_only for creating requests)
      - status, created_at
- [ ] Create FriendSerializer:
      - Basic user info for friend list display
      - username, avatar_url, is_online
- [ ] Add validation:
      - Prevent sending request to yourself
      - Check if request already exists
- [ ] Import UserSerializer from users app

Status: PLACEHOLDER
=============================================================================
"""

from rest_framework import serializers
from .models import FriendRequest, Friendship
from users.serializers import UserSerializer


class FriendRequestSerializer(serializers.ModelSerializer):
    """
    Crystal: Implement FriendRequest serializer
    """
    # TODO: Crystal - Uncomment and implement
    # from_user = UserSerializer(read_only=True)
    # to_user = UserSerializer(read_only=True)
    # to_user_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = FriendRequest
        # TODO: Crystal - fields = ['id', 'from_user', 'to_user', 'to_user_id', 'status', 'created_at']
        fields = '__all__'
    
    def validate_to_user_id(self, value):
        """Prevent sending request to yourself"""
        # TODO: Crystal - Implement validation
        # if value == self.context['request'].user.id:
        #     raise serializers.ValidationError("Cannot send friend request to yourself")
        return value
    
    def validate(self, data):
        """Check if request already exists"""
        # TODO: Crystal - Check for existing requests
        return data


class FriendSerializer(serializers.Serializer):
    """
    Crystal: Implement Friend serializer for list display
    """
    # TODO: Crystal - Uncomment and implement
    # id = serializers.IntegerField()
    # username = serializers.CharField()
    # avatar_url = serializers.CharField(allow_null=True)
    # is_online = serializers.BooleanField(default=False)
    pass
