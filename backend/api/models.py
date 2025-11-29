"""
=============================================================================
API APP - MODELS
=============================================================================

File: backend/api/models.py
Assigned to: TITO
Responsibility: Message and Notification models for messaging system

TODO:
- [ ] Create Message model:
      - sender (ForeignKey to User)
      - recipient (ForeignKey to User)
      - content (TextField)
      - created_at (auto)
      - is_read (Boolean)
- [ ] Create Conversation model (optional):
      - participants (ManyToMany to User)
      - created_at (auto)
      - updated_at (auto)
- [ ] Create Notification model:
      - user (ForeignKey to User)
      - type (friend_request, message, like, etc.)
      - content (TextField)
      - is_read (Boolean)
      - created_at (auto)
- [ ] Run migrations after implementing

Status: PLACEHOLDER
=============================================================================
"""

from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    """
    Tito: Implement Message model for direct messaging
    """
    # TODO: Tito - Uncomment and implement
    # sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    # recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    # content = models.TextField(max_length=500)
    # is_read = models.BooleanField(default=False)
    # created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        # TODO: Tito - ordering = ['-created_at']
        pass
    
    def __str__(self):
        # TODO: Tito - return f"{self.sender} -> {self.recipient}: {self.content[:20]}"
        return "Message placeholder"


class Notification(models.Model):
    """
    Tito: Implement Notification model (stretch goal)
    """
    NOTIFICATION_TYPES = [
        ('friend_request', 'Friend Request'),
        ('friend_accept', 'Friend Accepted'),
        ('message', 'New Message'),
        ('like', 'Post Liked'),
        ('comment', 'New Comment'),
    ]
    
    # TODO: Tito - Uncomment and implement
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    # type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    # content = models.TextField()
    # is_read = models.BooleanField(default=False)
    # created_at = models.DateTimeField(auto_now_add=True)
    # related_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='caused_notifications')
    
    class Meta:
        # TODO: Tito - ordering = ['-created_at']
        pass
    
    def __str__(self):
        # TODO: Tito - return f"{self.type} for {self.user}"
        return "Notification placeholder"
