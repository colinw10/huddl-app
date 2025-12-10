"""
===============================================================================
POSTS VIEWS
===============================================================================

File: backend/posts/views.py
Assigned to: COLIN 🟢
Responsibility: API endpoints for posts CRUD

WHAT VIEWSETS DO:
- Handle HTTP requests (GET, POST, PUT, DELETE)
- Use serializers to convert data
- Return JSON responses

RESOURCES:
- DRF ViewSets: https://www.django-rest-framework.org/api-guide/viewsets/
- ModelViewSet gives you list, create, retrieve, update, destroy automatically

ENDPOINTS TO CREATE:
- GET    /posts/           → list all top-level posts (parent=None)
- POST   /posts/           → create new post
- GET    /posts/:id/       → get single post
- PUT    /posts/:id/       → update post
- DELETE /posts/:id/       → delete post  
- GET    /posts/:id/replies/  → get replies to a post
- POST   /posts/:id/replies/  → create reply

TODO:
1. Create PostViewSet using ModelViewSet
2. Override get_queryset() to filter top-level posts for list view
3. Add @action for replies endpoint

===============================================================================
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    TODO: Implement PostViewSet
    
    This gives you CRUD operations automatically.
    You just need to:
    1. Set serializer_class
    2. Set permission_classes
    3. Override get_queryset() for filtering
    4. Add replies action
    """
    
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        TODO: Return posts queryset
        
        For 'list' action: only return top-level posts (parent=None)
        For other actions: return all posts
        
        Hint: Check self.action == 'list'
        Hint: Order by -created_at for newest first
        """
        return Post.objects.all()  # TODO: Add filtering
    
    def perform_create(self, serializer):
        """
        TODO: Set author when creating post
        
        Hint: serializer.save(author=self.request.user)
        """
        pass  # TODO: Implement
    
    @action(detail=True, methods=['get', 'post'])
    def replies(self, request, pk=None):
        """
        TODO: Implement replies endpoint
        
        GET: Return all replies to this post
        POST: Create a new reply to this post
        
        Hint for GET:
        - Get the parent post with self.get_object()
        - Filter Post.objects.filter(parent=post)
        - Serialize and return
        
        Hint for POST:
        - Validate with serializer
        - Save with author=request.user and parent=post
        """
        post = self.get_object()
        
        if request.method == 'GET':
            # TODO: Get and return replies
            return Response([])
        
        elif request.method == 'POST':
            # TODO: Create reply
            return Response({'detail': 'Not implemented'}, status=status.HTTP_501_NOT_IMPLEMENTED)
