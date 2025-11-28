# 🟣 CRYSTAL - Friends System Lead
# models.py - Database structure for friendships and friend requests

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Friendship(models.Model):
    """User friendship connections"""
    # ForeignKey = link to another table (in this case, User)
    # CASCADE = if user is deleted, delete their friendships too
    # related_name = lets you access friendships FROM a user object
    # Example: user.friendships.all() gives all Friendship objects where user is the main person
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    
    # The actual friend (also a User)
    # related_name='friends' lets you do: user.friends.all()
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    
    # Timestamp - auto_now_add=True means Django sets this automatically when created
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # unique_together = prevents duplicate friendships (can't be friends twice)
        # This means you can't have two rows with same user + friend combo
        unique_together = ['user', 'friend']
        # Default sorting: newest first (the - means descending/reverse)
        ordering = ['-created_at']

    def __str__(self):
        # How this object appears in Django admin or when printed
        # Shows: "pablo → crystal"
        return f"{self.user.username} → {self.friend.username}"


class FriendRequest(models.Model):
    """Pending friend requests"""
    # Person SENDING the request
    # related_name='sent_requests' means: user.sent_requests.all() = all requests this user sent
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    
    # Person RECEIVING the request
    # related_name='received_requests' means: user.received_requests.all() = all pending requests TO this user
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    
    # When the request was created
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Can't send multiple requests to same person
        unique_together = ['from_user', 'to_user']
        # Show newest requests first
        ordering = ['-created_at']

    def __str__(self):
        # Shows: "pablo → crystal" (request from pablo to crystal)
        return f"{self.from_user.username} → {self.to_user.username}"
