from django.db import models

# FRIENDS APP - MODELS
# Owner: Colin (Backend Lead) + Crystal (Friends Features)
# Status: EMPTY - needs implementation
#
# Purpose: Define Friendship and FriendRequest models
#
# TODO:
# - Create FriendRequest model (from_user, to_user, created_at, status)
# - Status choices: 'pending', 'accepted', 'declined'
# - Create Friendship model (user1, user2, created_at) OR use ManyToManyField on User
# - Prevent duplicate friend requests (unique_together constraint)
# - Add methods: accept(), decline()
# - Add __str__ methods for admin panel
# - Create migrations: python manage.py makemigrations
# - Apply migrations: python manage.py migrate
# - Register models in admin.py
#
# Example:
# class FriendRequest(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('accepted', 'Accepted'),
#         ('declined', 'Declined'),
#     ]
#     from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
#     to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)
#
# Create your models here.
