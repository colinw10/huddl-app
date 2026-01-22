# Messaging System — Backend Implementation

## Overview

This implements direct messaging between users. The backend handles:

- Storing messages in the database
- API endpoints for sending/receiving messages
- Conversation grouping
- Read/unread status

---

## File 1: `backend/messages_app/models.py`

```python
# 🔵 PABLO - Messaging System
# models.py - Database structure for direct messages

from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    """
    Direct message between two users.
    Based on ERD: MESSAGE table with sender_id, receiver_id, content, is_read, created_at
    """
    # sender_id (FK) - User who sent the message
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )

    # receiver_id (FK) - User who receives the message
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )

    # content - The message text
    content = models.TextField()

    # is_read - Has the receiver seen this message?
    is_read = models.BooleanField(default=False)

    # created_at - When the message was sent
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']  # Oldest first (chronological)

    def __str__(self):
        return f"{self.sender.username} → {self.receiver.username}: {self.content[:30]}..."
```

---

## File 2: `backend/messages_app/serializers.py`

```python
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
```

---

## File 3: `backend/messages_app/views.py`

```python
# 🔵 PABLO - Messaging System
# views.py - API endpoints for direct messages

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoints for messages:
    - GET /messages/ - List conversations (grouped by user)
    - GET /messages/conversation/?user_id=X - Get messages with specific user
    - POST /messages/ - Send a new message
    - PATCH /messages/{id}/read/ - Mark message as read
    """
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Get messages where user is sender OR receiver"""
        user = self.request.user
        return Message.objects.filter(
            Q(sender=user) | Q(receiver=user)
        ).select_related('sender', 'receiver')

    @action(detail=False, methods=['get'])
    def conversation(self, request):
        """
        Get all messages between current user and another user.
        Usage: GET /messages/conversation/?user_id=5
        """
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response(
                {'error': 'user_id parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        messages = Message.objects.filter(
            (Q(sender=request.user) & Q(receiver_id=user_id)) |
            (Q(sender_id=user_id) & Q(receiver=request.user))
        ).order_by('created_at')

        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def conversations(self, request):
        """
        Get list of all conversations (unique users you've messaged with).
        Returns the most recent message with each user.
        """
        user = request.user

        # Get all unique users this person has messaged with
        sent_to = Message.objects.filter(sender=user).values_list('receiver_id', flat=True)
        received_from = Message.objects.filter(receiver=user).values_list('sender_id', flat=True)
        user_ids = set(sent_to) | set(received_from)

        conversations = []
        for uid in user_ids:
            # Get most recent message with this user
            last_message = Message.objects.filter(
                (Q(sender=user) & Q(receiver_id=uid)) |
                (Q(sender_id=uid) & Q(receiver=user))
            ).order_by('-created_at').first()

            if last_message:
                other_user = last_message.receiver if last_message.sender == user else last_message.sender
                unread_count = Message.objects.filter(
                    sender_id=uid,
                    receiver=user,
                    is_read=False
                ).count()

                conversations.append({
                    'user': {
                        'id': other_user.id,
                        'username': other_user.username,
                        'first_name': other_user.first_name,
                        'last_name': other_user.last_name,
                    },
                    'last_message': MessageSerializer(last_message).data,
                    'unread_count': unread_count,
                })

        # Sort by most recent message
        conversations.sort(key=lambda x: x['last_message']['created_at'], reverse=True)
        return Response(conversations)

    @action(detail=True, methods=['patch'])
    def read(self, request, pk=None):
        """Mark a message as read"""
        message = self.get_object()
        if message.receiver != request.user:
            return Response(
                {'error': 'You can only mark your own received messages as read'},
                status=status.HTTP_403_FORBIDDEN
            )
        message.is_read = True
        message.save()
        return Response(MessageSerializer(message).data)

    @action(detail=False, methods=['patch'])
    def read_all(self, request):
        """Mark all messages from a specific user as read"""
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response(
                {'error': 'user_id parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        updated = Message.objects.filter(
            sender_id=user_id,
            receiver=request.user,
            is_read=False
        ).update(is_read=True)

        return Response({'marked_read': updated})
```

---

## File 4: `backend/messages_app/urls.py`

```python
# 🔵 PABLO - Messaging System
# urls.py - Route configuration for messages API

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

router = DefaultRouter()
router.register(r'', MessageViewSet, basename='messages')

urlpatterns = [
    path('', include(router.urls)),
]
```

---

## File 5: Update `backend/numeneon/urls.py`

Add this line to include the messages routes:

```python
# In the urlpatterns list, add:
path('api/messages/', include('messages_app.urls')),
```

---

## File 6: Update `backend/numeneon/settings.py`

Make sure `messages_app` is in `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ... existing apps ...
    'messages_app',
]
```

---

## After Creating Files

Run migrations:

```bash
cd backend
python manage.py makemigrations messages_app
python manage.py migrate
```

---

## API Endpoints Summary

| Method | Endpoint                                | Description                                 |
| ------ | --------------------------------------- | ------------------------------------------- |
| GET    | `/api/messages/`                        | List all your messages                      |
| POST   | `/api/messages/`                        | Send a message (`{ receiver_id, content }`) |
| GET    | `/api/messages/conversations/`          | List all conversations                      |
| GET    | `/api/messages/conversation/?user_id=X` | Get messages with user X                    |
| PATCH  | `/api/messages/{id}/read/`              | Mark message as read                        |
| PATCH  | `/api/messages/read_all/?user_id=X`     | Mark all from user X as read                |
