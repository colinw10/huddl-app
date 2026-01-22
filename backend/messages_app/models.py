# 🔵 PABLO - Messaging System
# models.py - Database structure for direct messages

from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    """
    Direct message between two users.
    Based on ERD: MESSAGE table with sender_id, receiver_id, content, is_read, created_at
    """
    # sender_id (FK) - User who sent the message
    sender = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='sent_messages'
    )
    
    # receiver_id (FK) - User who receives the message
    receiver = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='received_messages'
    )
    
    # content - The message text
    content = models.TextField()
    
    # is_read - Has the receiver seen this message?
    is_read = models.BooleanField(default=False)
    
    # created_at - When the message was sent
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']  # Oldest first (chronological)
        
    def __str__(self):
        return f"{self.sender.username} → {self.receiver.username}: {self.content[:30]}..."
