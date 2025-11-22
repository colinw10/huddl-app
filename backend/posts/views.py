from django.shortcuts import render
from rest_framework import viewsets

# POSTS APP - VIEWS
# Owner: Colin (Backend Lead) + Tito (Post Logic)
# Status: EMPTY - needs implementation
#
# Purpose: Define API endpoints for posts (CRUD + like/unlike)
#
# TODO:
# - Create PostViewSet with ModelViewSet
# - GET /api/posts/feed/ - Get posts from user's friends (custom action)
# - GET /api/posts/user/{id}/ - Get posts by specific user
# - POST /api/posts/ - Create new post (must be authenticated)
# - PUT /api/posts/{id}/ - Update post (must be author)
# - DELETE /api/posts/{id}/ - Delete post (must be author)
# - POST /api/posts/{id}/like/ - Like a post
# - DELETE /api/posts/{id}/like/ - Unlike a post
# - Add permissions: IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly
# - Add pagination for feed (10-20 posts per page)
# - Test all endpoints with Postman
#
# Example:
# class PostViewSet(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     
#     @action(detail=True, methods=['post'])
#     def like(self, request, pk=None):
#         # Add like logic
#         pass
#
# Create your views here.
