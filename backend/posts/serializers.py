"""
===============================================================================
POSTS SERIALIZERS
===============================================================================

File: backend/posts/serializers.py
Assigned to: COLIN 🟢
Responsibility: Convert Post model to/from JSON

WHAT SERIALIZERS DO:
- Convert Django model instances to JSON (for API responses)
- Validate incoming JSON data (for creating/updating)
- Control which fields are exposed in the API

RESOURCES:
- DRF Serializers: https://www.django-rest-framework.org/api-guide/serializers/
- ModelSerializer: https://www.django-rest-framework.org/api-guide/serializers/\#modelserializer

TODO:
1. Create PostSerializer using ModelSerializer
2. Include fields: id, author, content, parent, reply_count, created_at, updated_at
3. Make author read-only (auto-set from request.user)
4. Add reply_count as SerializerMethodField

===============================================================================
"""

from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


# Helper serializer for nested author data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class PostSerializer(serializers.ModelSerializer):
    """
    TODO: Implement PostSerializer
    
    Fields needed:
    - id (auto)
    - author (nested UserSerializer, read_only)
    - content
    - parent (for replies, nullable)
    - reply_count (SerializerMethodField)
    - created_at (read_only)
    - updated_at (read_only)
    """
    
    # TODO: Add author field using UserSerializer(read_only=True)
    
    # TODO: Add reply_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = '__all__'  # TODO: List specific fields instead
        # read_only_fields = ['author', 'created_at', 'updated_at']
    
    # TODO: Implement get_reply_count method
    # def get_reply_count(self, obj):
    #     return obj.replies.count()
    
    # TODO: Override create() to set author from request.user
    # def create(self, validated_data):
    #     validated_data['author'] = self.context['request'].user
    #     return super().create(validated_data)
