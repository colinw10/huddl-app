"""
=============================================================================
USERS APP - VIEWS (Authentication & Profile Endpoints)
=============================================================================

File: backend/users/views.py
Assigned to: NATALIA
Responsibility: User authentication (signup, login, JWT) and profile management

TODO:
- [ ] POST /api/users/signup/ - Create new user account
- [ ] POST /api/users/login/ - Authenticate and return JWT tokens
- [ ] POST /api/users/token/refresh/ - Refresh access token
- [ ] GET /api/users/me/ - Get current user profile
- [ ] PUT /api/users/me/ - Update current user profile
- [ ] GET /api/users/{id}/ - Get public user profile
- [ ] Add password hashing with Django's make_password
- [ ] Add JWT token generation with simplejwt
- [ ] Add validation for unique email/username

Status: PLACEHOLDER
=============================================================================
"""

from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# TODO: Natalia - Import serializers
# from .serializers import UserSerializer, SignupSerializer, LoginSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """
    POST /api/users/signup/
    Create a new user account
    
    Request: { username, email, password }
    Response: { id, username, email }
    """
    # TODO: Natalia - Implement signup
    # 1. Validate request data
    # 2. Check if username/email already exists
    # 3. Create user with hashed password
    # 4. Return user data (without password)
    return Response({'message': 'Natalia: Implement signup endpoint'})


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    POST /api/users/login/
    Authenticate user and return JWT tokens
    
    Request: { email, password }
    Response: { access, refresh, user: { id, username, email } }
    """
    # TODO: Natalia - Implement login
    # 1. Get email and password from request
    # 2. Find user by email
    # 3. Check password with check_password()
    # 4. Generate JWT tokens with RefreshToken.for_user()
    # 5. Return tokens and user data
    return Response({'message': 'Natalia: Implement login endpoint'})


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    GET /api/users/me/ - Get current user profile
    PUT /api/users/me/ - Update current user profile
    """
    # TODO: Natalia - Implement current user endpoint
    if request.method == 'GET':
        # Return current user data
        return Response({'message': 'Natalia: Implement get current user'})
    elif request.method == 'PUT':
        # Update current user data
        return Response({'message': 'Natalia: Implement update current user'})


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Natalia: Public user profiles (read-only)
    GET /api/users/{id}/ - Get public profile
    """
    # TODO: Natalia - Uncomment and implement
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
    pass
