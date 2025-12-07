# 🟢 COLIN - Posts Backend Lead
# views.py - API endpoints for posts (using ViewSet approach)

from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostSerializer

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    """
    A ModelViewSet gives full CRUD operations automatically:
    - list (GET /posts/)
    - retrieve (GET /posts/12/)
    - create (POST /posts/)
    - update (PUT/PATCH /posts/12/)
    - delete (DELETE /posts/12/)
    """
    # This is the list of posts returned; sorted newest-first
    # Note: field name is 'created_at' not '_created_at'
    queryset = Post.objects.all().order_by('-created_at')
    
    # Tells DRF to use PostSerializer for JSON input/output
    serializer_class = PostSerializer
    
    # Only logged-in users can access these endpoints
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        """
        This function runs automatically when creating a new Post
        It saves the post AND assigns the current logged-in user as the author
        """
        serializer.save(author=self.request.user)
