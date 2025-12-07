# =============================================================================
# FRIENDS APP - MODELS
# =============================================================================
#
# File: backend/friends/models.py
# Assigned to: CRYSTAL
# Responsibility: Friendship data model
#
# TODO:
# - [ ] Create Friendship model with fields:
#       - user (ForeignKey to User)
#       - friend (ForeignKey to User)
#       - created_at (DateTimeField, auto_now_add)
# - [ ] Add unique_together constraint
# - [ ] Add __str__ method
# - [ ] Optional: Create FriendRequest model for pending requests
#
# Status: PLACEHOLDER
# =============================================================================

from django.db import models
from django.contrib.auth.models import User


class Friendship(models.Model):
    """
    Crystal: Represents a friendship between two users
    
    Example:
        friendship = Friendship.objects.create(user=user1, friend=user2)
    """
    # TODO: Crystal - Add fields
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    # friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    # created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        # TODO: Crystal - Prevent duplicate friendships
        # unique_together = ['user', 'friend']
        ordering = ['-created_at']
    
    def __str__(self):
        # TODO: Crystal - Return meaningful string
        # return f"{self.user.username} ↔ {self.friend.username}"
        return "Friendship placeholder"
