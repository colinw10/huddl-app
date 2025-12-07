# =============================================================================
# POSTS APP - SERIALIZERS
# =============================================================================
#
# File: backend/posts/serializers.py
# Assigned to: COLIN
# Responsibility: Convert Post model ↔ JSON
#
# TODO:
# - [ ] Import Post model
# - [ ] Create PostSerializer with ModelSerializer
# - [ ] Include fields: id, author, content, created_at, updated_at
# - [ ] Make author read-only (set automatically in view)
# - [ ] Add nested author serializer for username display
#
# Status: PLACEHOLDER
# =============================================================================

from rest_framework import serializers
# TODO: Colin - Import your models
# from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Colin: Serialize Post model to/from JSON
    
    Example output:
    {
        "id": 1,
        "author": {"id": 1, "username": "colin"},
        "content": "Hello world!",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
    """
    # TODO: Colin - Configure serializer
    # class Meta:
    #     model = Post
    #     fields = ['id', 'author', 'content', 'created_at', 'updated_at']
    #     read_only_fields = ['author', 'created_at', 'updated_at']
    pass
