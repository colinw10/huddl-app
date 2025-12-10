"""
===============================================================================
FRIENDS MODELS
===============================================================================

File: backend/friends/models.py
Assigned to: CRYSTAL 🟣
Responsibility: Database models for friendships

MODELS TO CREATE:

1. Friendship - represents a mutual friendship
   Fields:
   - user1 (ForeignKey to User)
   - user2 (ForeignKey to User)
   - created_at (DateTimeField)
   
2. FriendRequest - represents a pending request
   Fields:
   - from_user (ForeignKey to User)
   - to_user (ForeignKey to User)
   - status (CharField: 'pending', 'accepted', 'declined')
   - created_at (DateTimeField)
   - updated_at (DateTimeField)

RESOURCES:
- Django Models: https://docs.djangoproject.com/en/5.0/topics/db/models/
- ForeignKey: https://docs.djangoproject.com/en/5.0/ref/models/fields/\#foreignkey

===============================================================================
"""

from django.db import models
from django.conf import settings


class Friendship(models.Model):
    """
    TODO: Implement Friendship model
    
    Represents a mutual friendship between two users.
    
    Fields needed:
    - user1: ForeignKey to User (on_delete=CASCADE)
    - user2: ForeignKey to User (on_delete=CASCADE)
    - created_at: DateTimeField(auto_now_add=True)
    
    Tips:
    - Use settings.AUTH_USER_MODEL for the User reference
    - Add related_name to avoid clashes (e.g., 'friendships_as_user1')
    - Add unique_together = ['user1', 'user2'] in Meta to prevent duplicates
    """
    pass  # TODO: Add fields


class FriendRequest(models.Model):
    """
    TODO: Implement FriendRequest model
    
    Represents a pending friend request.
    
    Fields needed:
    - from_user: ForeignKey to User
    - to_user: ForeignKey to User
    - status: CharField with choices ('pending', 'accepted', 'declined')
    - created_at: DateTimeField(auto_now_add=True)
    - updated_at: DateTimeField(auto_now=True)
    
    Tips:
    - Use related_name like 'sent_requests' and 'received_requests'
    - Default status should be 'pending'
    """
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]
    
    pass  # TODO: Add fields
