"""
=============================================================================
FRIENDS APP - MODELS
=============================================================================

File: backend/friends/models.py
Assigned to: CRYSTAL
Responsibility: Friendship and FriendRequest models

TODO:
- [ ] Create FriendRequest model:
      - from_user (ForeignKey to User)
      - to_user (ForeignKey to User)
      - status (pending, accepted, declined)
      - created_at (auto)
- [ ] Create Friendship model:
      - user1 (ForeignKey to User)
      - user2 (ForeignKey to User)
      - created_at (auto)
- [ ] Add unique_together constraint to prevent duplicates
- [ ] Add accept() and decline() methods
- [ ] Run migrations after implementing

Status: PLACEHOLDER
=============================================================================
"""

from django.db import models
from django.contrib.auth.models import User


class FriendRequest(models.Model):
    """
    Crystal: Implement FriendRequest model
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]
    
    # TODO: Crystal - Uncomment and implement
    # from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    # to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    # status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    # created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        # TODO: Crystal - Prevent duplicate requests
        # unique_together = ['from_user', 'to_user']
        pass
    
    def __str__(self):
        # TODO: Crystal - return f"{self.from_user} -> {self.to_user} ({self.status})"
        return "FriendRequest placeholder"
    
    def accept(self):
        """Accept this request and create friendship"""
        # TODO: Crystal - Create Friendship, update status
        pass
    
    def decline(self):
        """Decline this request"""
        # TODO: Crystal - Update status to declined
        pass


class Friendship(models.Model):
    """
    Crystal: Implement Friendship model
    """
    # TODO: Crystal - Uncomment and implement
    # user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships_as_user1')
    # user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships_as_user2')
    # created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        # TODO: Crystal - Prevent duplicate friendships
        # unique_together = ['user1', 'user2']
        pass
    
    def __str__(self):
        # TODO: Crystal - return f"{self.user1} <-> {self.user2}"
        return "Friendship placeholder"
