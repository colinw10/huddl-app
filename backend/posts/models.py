"""
=============================================================================
POSTS APP - MODELS
=============================================================================

File: backend/posts/models.py
Assigned to: COLIN
Responsibility: Post model for user-generated content

TODO:
- [ ] Create Post model with fields:
      - author (ForeignKey to User)
      - content (TextField, max 500 chars)
      - post_type (CharField: 'thought', 'media', 'milestone')
      - media_url (URLField, optional)
      - created_at (DateTimeField, auto)
      - updated_at (DateTimeField, auto)
      - likes (ManyToManyField to User)
- [ ] Add __str__ method
- [ ] Add Meta class with ordering = ['-created_at']
- [ ] Add like_count property
- [ ] Run migrations after implementing

Status: PLACEHOLDER
=============================================================================
"""

from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """
    Colin: Implement Post model
    """
    POST_TYPES = [
        ('thought', 'Thought'),
        ('media', 'Media'),
        ('milestone', 'Milestone'),
    ]
    
    # TODO: Colin - Uncomment and implement
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    # content = models.TextField(max_length=500)
    # post_type = models.CharField(max_length=20, choices=POST_TYPES, default='thought')
    # media_url = models.URLField(blank=True, null=True)
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)
    # likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        # TODO: Colin - return f"{self.author.username}: {self.content[:50]}..."
        return "Post placeholder"
    
    @property
    def like_count(self):
        # TODO: Colin - return self.likes.count()
        return 0

