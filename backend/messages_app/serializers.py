# 🔵 PABLO - Messaging System
# serializers.py - Convert Message model to/from JSON

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Message


class UserMinimalSerializer(serializers.ModelSerializer):
    """Minimal user info for message display"""
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class MessageSerializer(serializers.ModelSerializer):
    """Full message serializer with nested user info"""
    sender = UserMinimalSerializer(read_only=True)
    receiver = UserMinimalSerializer(read_only=True)
    receiver_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'receiver_id', 'content', 'is_read', 'created_at']
        read_only_fields = ['sender', 'is_read', 'created_at']
    
    def create(self, validated_data):
        """Set sender to current user when creating message"""
        receiver_id = validated_data.pop('receiver_id')
        receiver = User.objects.get(id=receiver_id)
        return Message.objects.create(
            sender=self.context['request'].user,
            receiver=receiver,
            **validated_data
        )
