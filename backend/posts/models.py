# =============================================================================
# POSTS APP - MODELS
# =============================================================================
#
# File: backend/posts/models.py
# Assigned to: COLIN
# Responsibility: Post data model
#
# TODO:
# - [ ] Create Post model with fields:
#       - author (ForeignKey to User)
#       - content (TextField)
#       - created_at (DateTimeField, auto_now_add)
#       - updated_at (DateTimeField, auto_now)
# - [ ] Add __str__ method
# - [ ] Add Meta class with ordering
#
# Status: PLACEHOLDER
# =============================================================================

from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """
    Colin: A single post in the feed
    
    Example:
        post = Post.objects.create(author=user, content="Hello!")
    """
    # TODO: Colin - Add fields
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    # content = models.TextField()
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']  # Newest first
    
    def __str__(self):
        # TODO: Colin - Return meaningful string
        # return f"{self.author.username}: {self.content[:50]}"
        return "Post placeholder"
