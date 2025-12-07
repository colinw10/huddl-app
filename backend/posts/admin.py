# 🟢 COLIN - Posts Backend Lead
# admin.py - Django admin interface for managing posts

from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """Admin interface for viewing and managing posts"""
    # Show these columns in the post list
    list_display = ['id', 'author', 'type', 'created_at', 'updated_at']
    # Add filters in the sidebar for these fields
    list_filter = ['type', 'created_at', 'updated_at']
    # Search posts by author username or content text
    search_fields = ['author__username', 'content']
    # Sort by newest first
    ordering = ['-created_at']
    # These fields can't be edited (auto-generated timestamps)
    readonly_fields = ['created_at', 'updated_at']
