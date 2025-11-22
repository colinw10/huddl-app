from django.shortcuts import render
from rest_framework import viewsets

# USERS APP - VIEWS
# Owner: Colin (Backend Lead)
# Status: EMPTY - needs implementation
#
# Purpose: Define API endpoints for user profiles (CRUD operations)
#
# TODO:
# - Create UserViewSet with ModelViewSet
# - GET /api/users/{id}/ - Retrieve user profile
# - PUT /api/users/{id}/ - Update user profile (must be owner)
# - POST /api/users/avatar/ - Upload avatar image
# - Add permission: IsAuthenticatedOrReadOnly (anyone can view, only owner can edit)
# - Add filtering/search (optional)
# - Test with Postman
#
# Example:
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#
# Create your views here.
