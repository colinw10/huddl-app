"""
=============================================================================
FRIENDS APP - VIEWS (API Endpoints)
=============================================================================

File: backend/friends/views.py
Assigned to: CRYSTAL
Responsibility: Friend requests and friendship management

TODO:
- [ ] GET /api/friends/ - List all friends of current user
- [ ] GET /api/friends/requests/ - List pending friend requests
- [ ] POST /api/friends/request/ - Send friend request
- [ ] POST /api/friends/accept/{id}/ - Accept friend request
- [ ] DELETE /api/friends/decline/{id}/ - Decline friend request
- [ ] DELETE /api/friends/{id}/ - Remove friend
- [ ] Prevent duplicate requests
- [ ] Prevent self-requests
- [ ] Add IsAuthenticated permission

Status: PLACEHOLDER
=============================================================================
"""

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# TODO: Crystal - Import models and serializers
# from .models import Friendship, FriendRequest
# from .serializers import FriendSerializer, FriendRequestSerializer


class FriendViewSet(viewsets.ViewSet):
    """
    Crystal: Implement friendship management
    """
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        """
        GET /api/friends/
        List all friends of current user
        """
        # TODO: Crystal - Get user's friends
        return Response({'message': 'Crystal: Implement list friends'})
    
    @action(detail=False, methods=['get'])
    def requests(self, request):
        """
        GET /api/friends/requests/
        List pending friend requests
        """
        # TODO: Crystal - Get pending requests
        return Response({'message': 'Crystal: Implement list requests'})
    
    @action(detail=False, methods=['post'])
    def send_request(self, request):
        """
        POST /api/friends/request/
        Send a friend request
        Body: { user_id: int }
        """
        # TODO: Crystal - Create friend request
        # 1. Get target user_id from request.data
        # 2. Check not self-request
        # 3. Check not already friends
        # 4. Check no pending request
        # 5. Create FriendRequest
        return Response({'message': 'Crystal: Implement send request'})
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        """
        POST /api/friends/accept/{id}/
        Accept a friend request
        """
        # TODO: Crystal - Accept request, create friendship
        return Response({'message': 'Crystal: Implement accept request'})
    
    @action(detail=True, methods=['delete'])
    def decline(self, request, pk=None):
        """
        DELETE /api/friends/decline/{id}/
        Decline a friend request
        """
        # TODO: Crystal - Delete the request
        return Response({'message': 'Crystal: Implement decline request'})
    
    def destroy(self, request, pk=None):
        """
        DELETE /api/friends/{id}/
        Remove a friend
        """
        # TODO: Crystal - Delete friendship
        return Response({'message': 'Crystal: Implement remove friend'})
