from django.shortcuts import render
from rest_framework import viewsets

# FRIENDS APP - VIEWS
# Owner: Colin (Backend Lead) + Crystal (Friends Logic)
# Status: EMPTY - needs implementation
#
# Purpose: Define API endpoints for friend requests and friendships
#
# TODO:
# - Create FriendViewSet with ViewSet (or ModelViewSet)
# - GET /api/friends/ - List all friends of current user
# - GET /api/friends/requests/ - List pending friend requests
# - POST /api/friends/request/ - Send friend request (provide user_id in body)
# - POST /api/friends/accept/{id}/ - Accept friend request
# - DELETE /api/friends/decline/{id}/ - Decline friend request
# - DELETE /api/friends/{id}/ - Remove friend
# - Add permissions: IsAuthenticated (all endpoints)
# - Prevent sending request to yourself
# - Prevent duplicate requests
# - Test all endpoints with Postman
#
# Example:
# class FriendViewSet(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     
#     def list(self, request):
#         # Return user's friends
#         pass
#     
#     @action(detail=False, methods=['post'])
#     def request(self, request):
#         # Send friend request
#         pass
#
# Create your views here.
