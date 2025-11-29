"""
=============================================================================
API APP - SERIALIZERS
=============================================================================

File: backend/api/serializers.py
Assigned to: TITO
Responsibility: Message and Notification serializers

TODO:
- [ ] Create MessageSerializer:
      - sender (nested UserSerializer, read_only)
      - recipient (nested UserSerializer, read_only)
      - recipient_id (write_only for creating)
      - content, is_read, created_at
- [ ] Create ConversationSerializer:
      - participants
      - last_message (nested)
      - unread_count
- [ ] Create NotificationSerializer:
      - type, content, is_read, created_at
      - related_user (nested)
- [ ] Add validation for message content length

Status: PLACEHOLDER
=============================================================================
"""

from rest_framework import serializers
from .models import Message, Notification
from users.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    """
    Tito: Implement Message serializer
    """
    # TODO: Tito - Uncomment and implement
    # sender = UserSerializer(read_only=True)
    # recipient = UserSerializer(read_only=True)
    # recipient_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Message
        # TODO: Tito - fields = ['id', 'sender', 'recipient', 'recipient_id', 'content', 'is_read', 'created_at']
        fields = '__all__'
    
    def validate_content(self, value):
        """Validate message content"""
        # TODO: Tito - Check content length, profanity filter, etc.
        if len(value.strip()) == 0:
            raise serializers.ValidationError("Message cannot be empty")
        return value


class ConversationSerializer(serializers.Serializer):
    """
    Tito: Implement Conversation serializer for inbox view
    """
    # TODO: Tito - Uncomment and implement
    # id = serializers.IntegerField()
    # other_user = UserSerializer()
    # last_message = MessageSerializer()
    # unread_count = serializers.IntegerField()
    pass


class NotificationSerializer(serializers.ModelSerializer):
    """
    Tito: Implement Notification serializer (stretch goal)
    """
    # TODO: Tito - Uncomment and implement
    # related_user = UserSerializer(read_only=True)
    
    class Meta:
        model = Notification
        # TODO: Tito - fields = ['id', 'type', 'content', 'is_read', 'created_at', 'related_user']
        fields = '__all__'
