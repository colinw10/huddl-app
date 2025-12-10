"""
===============================================================================
FRIENDS VIEWS
===============================================================================

File: backend/friends/views.py
Assigned to: CRYSTAL 🟣
Responsibility: API endpoints for friends system

ENDPOINTS TO CREATE:
- GET    /friends/                    → list current user's friends
- GET    /friends/pending/            → list pending requests TO current user
- POST   /friends/request/            → send friend request
- POST   /friends/accept/:id/         → accept request
- POST   /friends/decline/:id/        → decline request
- DELETE /friends/remove/:id/         → remove friend

RESOURCES:
- DRF Function-based views: https://www.django-rest-framework.org/api-guide/views/\#function-based-views
- @api_view decorator: wraps function to handle request/response
- @permission_classes: requires authentication

===============================================================================
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
# TODO: Import your models and serializers after creating them
# from .models import Friendship, FriendRequest
# from .serializers import FriendshipSerializer, FriendRequestSerializer, UserSerializer

User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_list(request):
    """
    TODO: Get current user's friends
    
    Steps:
    1. Query Friendship where user is either user1 OR user2
       Hint: Use Q objects - Q(user1=request.user) | Q(user2=request.user)
    2. For each friendship, return the OTHER user's info
    3. Return as JSON array
    """
    return Response([])  # TODO: Implement


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pending_requests(request):
    """
    TODO: Get pending friend requests sent TO current user
    
    Steps:
    1. Query FriendRequest where to_user=request.user AND status='pending'
    2. Serialize and return
    """
    return Response([])  # TODO: Implement


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_request(request):
    """
    TODO: Send friend request to another user
    
    Expected body: { "to_user_id": 123 }
    
    Steps:
    1. Get to_user_id from request.data
    2. Validate: user exists, not yourself, not already friends, no pending request
    3. Create FriendRequest
    4. Return success message
    """
    return Response({'detail': 'Not implemented'}, status=status.HTTP_501_NOT_IMPLEMENTED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request, request_id):
    """
    TODO: Accept a friend request
    
    Steps:
    1. Get the FriendRequest by ID
    2. Verify to_user is current user and status is 'pending'
    3. Create Friendship between the two users
    4. Update request status to 'accepted'
    5. Return the new friend's data
    """
    return Response({'detail': 'Not implemented'}, status=status.HTTP_501_NOT_IMPLEMENTED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_request(request, request_id):
    """
    TODO: Decline a friend request
    
    Steps:
    1. Get the FriendRequest by ID
    2. Verify to_user is current user
    3. Update status to 'declined'
    """
    return Response({'detail': 'Not implemented'}, status=status.HTTP_501_NOT_IMPLEMENTED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request, user_id):
    """
    TODO: Remove a friend
    
    Steps:
    1. Find Friendship where current user and user_id are involved
    2. Delete it
    """
    return Response({'detail': 'Not implemented'}, status=status.HTTP_501_NOT_IMPLEMENTED)
