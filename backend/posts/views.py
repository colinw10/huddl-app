# 🟢 COLIN - Posts Backend Lead
# views.py - API endpoints for posts (using ViewSet approach)

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post, Like
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
        Supports optional ?username= filter to get posts by a specific user
        For detail actions (retrieve, update, delete): return all posts
        """
        if self.action == 'list':
            queryset = Post.objects.filter(parent__isnull=True).order_by('-created_at')
            
            # Optional username filter for viewing a specific user's posts
            username = self.request.query_params.get('username', None)
            if username:
                queryset = queryset.filter(author__username=username)
            
            return queryset
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
        serializer = PostSerializer(replies, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """
        POST /api/posts/{id}/like/ - toggle like on a post
        Returns the updated post with new like count and is_liked status
        """
        post = self.get_object()
        user = request.user
        
        # Check if already liked
        existing_like = Like.objects.filter(user=user, post=post).first()
        
        if existing_like:
            # Unlike - remove the like
            existing_like.delete()
            post.likes_count = max(0, post.likes_count - 1)
            post.save()
            is_liked = False
        else:
            # Like - create new like
            Like.objects.create(user=user, post=post)
            post.likes_count += 1
            post.save()
            is_liked = True
        
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def share(self, request, pk=None):
        """
        POST /api/posts/{id}/share/ - increment share count
        """
        post = self.get_object()
        post.shares_count += 1
        post.save()
        
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data)
