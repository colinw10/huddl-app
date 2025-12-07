# =============================================================================
# FRIENDS APP - VIEWS (API Endpoints)
# =============================================================================
#
# File: backend/friends/views.py
# Assigned to: CRYSTAL
# Responsibility: Friends API - list, requests, add/remove
#
# TODO:
# - [ ] Import Friendship model and serializers
# - [ ] Create FriendViewSet or function-based views
# - [ ] GET /api/friends/ - List user's friends
# - [ ] GET /api/friends/requests/ - List pending requests
# - [ ] POST /api/friends/request/ - Send friend request
# - [ ] POST /api/friends/accept/{id}/ - Accept request
# - [ ] POST /api/friends/decline/{id}/ - Decline request
# - [ ] DELETE /api/friends/{id}/ - Remove friend
#
# Status: PLACEHOLDER
# =============================================================================

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
# TODO: Crystal - Import your models and serializers
# from .models import Friendship
# from .serializers import FriendshipSerializer


class FriendViewSet(viewsets.ModelViewSet):
    """
    Crystal: Implement friends management
    """
    # TODO: Crystal - Configure viewset
    # queryset = Friendship.objects.all()
    # serializer_class = FriendshipSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return only current user's friendships"""
        # TODO: Crystal - Filter by current user
        # return Friendship.objects.filter(user=self.request.user)
        pass
    
    @action(detail=False, methods=['get'])
    def requests(self, request):
        """GET /api/friends/requests/ - Pending friend requests"""
        # TODO: Crystal - Return pending requests
        return Response({'message': 'Crystal: Implement requests endpoint'})
    
    @action(detail=False, methods=['post'])
    def send_request(self, request):
        """POST /api/friends/request/ - Send friend request"""
        # TODO: Crystal - Create friend request
        return Response({'message': 'Crystal: Implement send_request endpoint'})
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        """POST /api/friends/accept/{id}/ - Accept request"""
        # TODO: Crystal - Accept and create friendship
        return Response({'message': 'Crystal: Implement accept endpoint'})
    
    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        """POST /api/friends/decline/{id}/ - Decline request"""
        # TODO: Crystal - Decline/delete request
        return Response({'message': 'Crystal: Implement decline endpoint'})
