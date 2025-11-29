"""
=============================================================================
API APP - VIEWS
=============================================================================

File: backend/api/views.py
Assigned to: TITO
Responsibility: Core API viewsets for messaging and shared endpoints

TODO:
- [ ] Create MessageViewSet:
      - list() - Get conversation messages
      - create() - Send new message
      - conversations() - Get all user conversations
- [ ] Create NotificationViewSet (stretch):
      - list() - Get user notifications
      - mark_read() - Mark notification as read
- [ ] Add IsAuthenticated permission to all endpoints
- [ ] Implement pagination for message lists
- [ ] Add error handling with proper status codes

Status: PLACEHOLDER
=============================================================================
"""

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class MessageViewSet(viewsets.ViewSet):
    """
    Tito: Implement messaging endpoints
    """
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        """Get messages in a conversation"""
        # TODO: Tito - Get conversation_id from query params
        # TODO: Tito - Filter messages by conversation
        # TODO: Tito - Paginate results
        return Response({
            'status': 'placeholder',
            'messages': []
        })
    
    def create(self, request):
        """Send a new message"""
        # TODO: Tito - Validate request data
        # TODO: Tito - Create Message object
        # TODO: Tito - Return created message
        return Response({
            'status': 'placeholder',
            'message': 'Message sending not implemented'
        }, status=status.HTTP_501_NOT_IMPLEMENTED)
    
    @action(detail=False, methods=['get'])
    def conversations(self, request):
        """Get all conversations for current user"""
        # TODO: Tito - Get distinct conversations
        # TODO: Tito - Include last message preview
        # TODO: Tito - Include unread count
        return Response({
            'status': 'placeholder',
            'conversations': []
        })


class NotificationViewSet(viewsets.ViewSet):
    """
    Tito: Implement notification endpoints (stretch goal)
    """
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        """Get user notifications"""
        # TODO: Tito - Get notifications for current user
        # TODO: Tito - Filter by read/unread
        return Response({
            'status': 'placeholder',
            'notifications': []
        })
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Mark notification as read"""
        # TODO: Tito - Update notification.is_read = True
        return Response({
            'status': 'placeholder'
        })
