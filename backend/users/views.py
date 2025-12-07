# =============================================================================
# USERS APP - VIEWS (API Endpoints)
# =============================================================================
#
# File: backend/users/views.py
# Assigned to: NATALIA
# Responsibility: Auth endpoints - signup, login, me
#
# TODO:
# - [ ] Import User model and serializers
# - [ ] POST /api/auth/signup/ - Register new user
# - [ ] POST /api/auth/login/ - Login (returns JWT tokens)
# - [ ] GET /api/auth/me/ - Get current user info
# - [ ] POST /api/auth/refresh/ - Refresh JWT token
#
# Status: PLACEHOLDER
# =============================================================================

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
# TODO: Natalia - Import your serializers
# from .serializers import UserSerializer, SignupSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """
    POST /api/auth/signup/
    Register a new user
    
    Body: { "username": "...", "email": "...", "password": "..." }
    """
    # TODO: Natalia - Validate and create user
    # serializer = SignupSerializer(data=request.data)
    # if serializer.is_valid():
    #     user = serializer.save()
    #     return Response({'message': 'User created'}, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Natalia: Implement signup'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    """
    GET /api/auth/me/
    Get current logged-in user info
    """
    # TODO: Natalia - Return current user
    # serializer = UserSerializer(request.user)
    # return Response(serializer.data)
    return Response({'message': 'Natalia: Implement me endpoint'})
