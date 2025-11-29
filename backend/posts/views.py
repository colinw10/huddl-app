"""
=============================================================================
POSTS APP - VIEWS (API Endpoints)
=============================================================================

File: backend/posts/views.py
Assigned to: COLIN
Responsibility: Posts API - CRUD operations, feed, likes

TODO:
- [ ] Create PostViewSet with ModelViewSet
- [ ] GET /api/posts/ - List all posts (paginated)
- [ ] GET /api/posts/feed/ - Get posts from user's friends (custom action)
- [ ] GET /api/posts/user/{id}/ - Get posts by specific user
- [ ] POST /api/posts/ - Create new post (authenticated only)
- [ ] PUT /api/posts/{id}/ - Update post (author only)
- [ ] DELETE /api/posts/{id}/ - Delete post (author only)
- [ ] POST /api/posts/{id}/like/ - Like a post
- [ ] DELETE /api/posts/{id}/like/ - Unlike a post
- [ ] Add IsAuthenticatedOrReadOnly permission
- [ ] Add IsAuthorOrReadOnly custom permission
- [ ] Add pagination (10-20 posts per page)

Status: PLACEHOLDER
=============================================================================
"""

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# TODO: Colin - Import Post model and PostSerializer
# from .models import Post
# from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    Colin: Implement full CRUD for posts
    
    Endpoints:
    - GET /api/posts/ - List posts
    - POST /api/posts/ - Create post
    - GET /api/posts/{id}/ - Get single post
    - PUT /api/posts/{id}/ - Update post
    - DELETE /api/posts/{id}/ - Delete post
    """
    # TODO: Colin - Uncomment and implement
    # queryset = Post.objects.all()
    # serializer_class = PostSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def feed(self, request):
        """
        GET /api/posts/feed/
        Returns posts from user's friends, ordered by newest first
        """
        # TODO: Colin - Get user's friends, filter posts
        return Response({'message': 'Colin: Implement feed endpoint'})
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """
        POST /api/posts/{id}/like/
        Like a post
        """
        # TODO: Colin - Add user to post.likes
        return Response({'message': 'Colin: Implement like endpoint'})
    
    @action(detail=True, methods=['delete'])
    def unlike(self, request, pk=None):
        """
        DELETE /api/posts/{id}/like/
        Unlike a post
        """
        # TODO: Colin - Remove user from post.likes
        return Response({'message': 'Colin: Implement unlike endpoint'})
#         # Add like logic
#         pass
#
# Create your views here.
