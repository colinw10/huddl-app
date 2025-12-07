# =============================================================================
# POSTS APP - VIEWS (API Endpoints)
# =============================================================================
#
# File: backend/posts/views.py
# Assigned to: COLIN
# Responsibility: Posts API - CRUD operations, feed
#
# TODO:
# - [ ] Import Post model and PostSerializer
# - [ ] Create PostViewSet with ModelViewSet
# - [ ] GET /api/posts/ - List all posts (newest first)
# - [ ] POST /api/posts/ - Create new post (authenticated only)
# - [ ] GET /api/posts/{id}/ - Get single post
# - [ ] PUT/PATCH /api/posts/{id}/ - Update post (author only)
# - [ ] DELETE /api/posts/{id}/ - Delete post (author only)
# - [ ] Implement perform_create to set author automatically
#
# Status: PLACEHOLDER
# =============================================================================

from rest_framework import viewsets, permissions
# TODO: Colin - Import your models and serializers
# from .models import Post
# from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    Colin: Implement full CRUD for posts
    
    A ModelViewSet gives you these endpoints automatically:
    - list (GET /posts/)
    - retrieve (GET /posts/12/)
    - create (POST /posts/)
    - update (PUT/PATCH /posts/12/)
    - destroy (DELETE /posts/12/)
    """
    # TODO: Colin - Uncomment and configure
    # queryset = Post.objects.all().order_by('-created_at')
    # serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        """
        This runs when creating a new Post.
        It saves the post AND assigns the current logged-in user as author.
        """
        # TODO: Colin - Save with author
        # serializer.save(author=self.request.user)
        pass
