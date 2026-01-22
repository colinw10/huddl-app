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
