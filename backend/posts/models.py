from django.db import models

# POSTS APP - MODELS
# Owner: Colin (Backend Lead) + Tito (Post Features)
# Status: EMPTY - needs implementation
#
# Purpose: Define Post model for user-generated content
#
# TODO:
# - Create Post model with ForeignKey to User (author)
# - Add fields: content (text), media_url (optional image/video), created_at, updated_at
# - Add Like model (many-to-many through table: user, post, created_at)
# - Add methods: like_count, is_liked_by(user)
# - Add __str__ method returning truncated content
# - Add ordering: Meta class with ordering = ['-created_at']
# - Create migrations: python manage.py makemigrations
# - Apply migrations: python manage.py migrate
# - Register models in admin.py
#
# Example:
# class Post(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
#     content = models.TextField(max_length=500)
#     media_url = models.URLField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
#
# Create your models here.
