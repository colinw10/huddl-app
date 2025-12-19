# 🟢 COLIN - Posts Backend Lead
# views.py - API endpoints for posts (using ViewSet approach)

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
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
    # Tells DRF to use PostSerializer for JSON input/output
    serializer_class = PostSerializer
    
    # Only logged-in users can access these endpoints
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        For list action: only return top-level posts (no parent)
        For detail actions (retrieve, update, delete): return all posts
        """
        if self.action == 'list':
            # Only top-level posts for the feed
            return Post.objects.filter(parent__isnull=True).order_by('-created_at')
        else:
            # All posts for detail views (so we can delete/update replies too)
            return Post.objects.all().order_by('-created_at')
    
    def perform_create(self, serializer):
        """
        This function runs automatically when creating a new Post
        It saves the post AND assigns the current logged-in user as the author
        """
        serializer.save(author=self.request.user)
    
    @action(detail=True, methods=['get'])
    def replies(self, request, pk=None):
        """
        GET /api/posts/{id}/replies/ - fetch all replies for a post
        """
        post = self.get_object()
        replies = post.replies.all().order_by('created_at')
        serializer = PostSerializer(replies, many=True)
        return Response(serializer.data)
