# 🟣 CRYSTAL - Friends System Lead
# views.py - API endpoints for friend operations

# api_view - turns a function into an API endpoint
# permission_classes - controls who can access
# IsAuthenticated - requires login
# Response - sends JSON back to React
# status - HTTP codes (200, 400, 404, etc.)
# User - Django's built-in user model
# FriendRequest, Friendship - your models (we may need to build these)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import render
from .models import FriendRequest, Friendship

# ═══════════════════════════════════════════════════════════════════════
# 🟢 CRYSTAL - Friend List
# ═══════════════════════════════════════════════════════════════════════

@api_view(['GET']) # Only accepts GET requests
@permission_classes([IsAuthenticated]) # Must be logged in
def friend_list(request):
  '''
  Returns all friends of the logged-in user

  Frontend calls: GET /api/friends/
  Returns: [{ "id": 2, "username": "sarah" }, ...]
  '''
  #request.user = logged-in user (from JWT token)
  user = request.user

  # Get all friendships where this user is involved
  friendships = Friendship.objects.filter(user=user)

  # Build a list of friend data to send back
  friends = []
  for friendship in friendships:
      friends.append({
        'id': friendship.friend.id,
        'username': friendship.friend.username,
      })

  # Return the list as JSON
  return Response(friends)
# Create your views here.

# 🟢 CRYSTAL - Send Friend Request
# ═══════════════════════════════════════════════════════════════════════

@api_view(['POST']) # Only accepts POST requests
@permission_classes([IsAuthenticated]) # must be logged in
def send_request(request, user_id):
  '''
  Sends a friend request to another user

  Frontend calls: POST /api/friends/request/5/
  user_id comes from the URL (the person you want to add)
  '''
  # Get the logged-in user
  from_user = request.user
  # Find the user we're sending the request to
  try:
    to_user = User.objects.get(id=user_id)
  except User.DoesNotExist:
    return Response(
      {'error': 'User not found'},
      status=status.HTTP_404_NOT_FOUND
    )
  # Can't send request yourself
  if from_user == to_user:
    return Response(
      {'error': 'Cannot send friend request to yourself'},
      status=status.HTTP_400_BAD_REQUEST
    )

  # Check if request already exists
  if FriendRequest.objects.filter(from_user=from_user, to_user=to_user).exists():
    return Response(
      {'error': 'Friend request already sent'},
      status=status.HTTP_400_BAD_REQUEST
    )
  # Create the friend request
  FriendRequest.objects.create(from_user=from_user, to_user=to_user)

  return Response(
    {'message': f'Friend request sent to {to_user.username}'},
    status=status.HTTP_201_CREATED
  )

# 🟢 CRYSTAL - Accept Friend Request
# ═══════════════════════════════════════════════════════════════════════
@api_view(['POST']) # Only accepts POST requests
@permission_classes([IsAuthenticated]) # Must be logged-in
def accept_request(request, request_id):
  '''
  Accepts a pending friend request

  Frontend calls: POST /api/friends/accept/12/
  request_id comes from the URL (the specific friend request)
  '''
  user = request.user

  # Find the friend request
  try:
    friend_request = FriendRequest.objects.get(id=request_id)
  except FriendRequest.DoesNotExist:
    return Response(
      {'error': 'Friend request not found'},
      status=status.HTTP_404_NOT_FOUND
    )
  # Make sure this request was sent TO the logged-in user
  if friend_request.to_user != user:
    return Response(
      {'error': 'This request was not sent to you'},
      status=status.HTTP_403_FORBIDDEN
    )
  # Create friendship both way (user1 -> user2 AND user2 -> user1)
  Friendship.objects.create(user=user, friend=friend_request.from_user)
  Friendship.objects.create(user=friend_request.from_user, friend=user)

  # Delete the friend request no longer needed
  friend_request.delete()

  return Response(
    {'message': f'You are now friends with {friend_request.from_user.username}'},
    status=status.HTTP_201_CREATED
  )
# 🟢 CRYSTAL - Decline Friend Request
# ═══════════════════════════════════════════════════════════════════════
@api_view(['POST']) # Only accepts POST requests
@permission_classes([IsAuthenticated]) # Must be logged-in
def decline_request(request, request_id):
  '''
  Declines a pending friend request

  Frontend calls: POST /api/friends/decline/12/
  request_id comes from URL (the specific friend request)
  '''
  user = request.user
  # Find the friend request
  try:
    friend_request = FriendRequest.objects.get(id=request_id)
  except FriendRequest.DoesNotExist:
    return Response(
      {'error': 'Friend request not found'},
      status=status.HTTP_404_NOT_FOUND
    )

  # Make sure this request was sent TO the logged-in user
  if friend_request.to_user != user:
    return Response(
      {'error': 'This request was not sent to you'},
      status=status.HTTP_403_FORBIDDEN
    )

  # Delete the friend request (declined)
  friend_request.delete()

  return Response({'message': 'Friend request declined'})

# 🟢 CRYSTAL - Remove Friend
# ═══════════════════════════════════════════════════════════════════════
@api_view(['DELETE']) # Only accepts DELETE requests
@permission_classes([IsAuthenticated]) # Must be logged-in
def remove_friend(request, user_id):
  '''
  Removes a friend from your friend list

  Frontend calls: DELETE /api/friends/remove/5/
  user_id comes from the URL (the friend to remove)
  '''
  user = request.user
  # find the friend we're removing
  try:
    friend = User.objects.get(id=user_id)
  except User.DoesNotExist:
    return Response(
      {'error': 'User not found'},
      status=status.HTTP_404_NOT_FOUND
    )

  # Delete friendship both ways (user -> friend AND friend -> user)
  Friendship.objects.filter(user=user, friend=friend).delete()
  Friendship.objects.filter(user=friend, friend=user).delete()
  return Response({'message': f'{friend.username} removed from friends'})