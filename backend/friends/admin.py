# 🟣 CRYSTAL - Friends System Lead
# admin.py - Django admin interface for managing friendships

from django.contrib import admin
from .models import Friendship, FriendRequest

# @admin.register = decorator that registers the model with admin site
# Same as: admin.site.register(Friendship, FriendshipAdmin)
@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    """Admin interface for viewing and managing friendships"""
    # list_display = columns shown in admin list view
    list_display = ['user', 'friend', 'created_at']
    # list_filter = adds sidebar filters
    list_filter = ['created_at']
    # search_fields = adds search box (__ means search in related model)
    search_fields = ['user__username', 'friend__username']
    # ordering = default sort order (- means descending/newest first)
    ordering = ['-created_at']


@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    """Admin interface for viewing and managing friend requests"""
    list_display = ['from_user', 'to_user', 'created_at']
    list_filter = ['created_at']
    search_fields = ['from_user__username', 'to_user__username']
    ordering = ['-created_at']
