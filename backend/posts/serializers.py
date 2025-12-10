# 🟢 COLIN - Posts Backend Lead
# serializers.py - Data conversion between Django models and JSON

from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User
from users.serializers import UserSerializer  # nested author data

# Create your serializers here.
class PostSerializer(serializers.ModelSerializer):
    """
    Converts Post model to/from JSON
    Includes nested author object (not just author ID)
    """
    # Nested serializer = returns full user object instead of just ID
    # read_only=True = author is set automatically, can't be changed via API
    author = UserSerializer(read_only=True)
    
    # For threading - include reply count and parent reference
    reply_count = serializers.SerializerMethodField()
    parent_id = serializers.PrimaryKeyRelatedField(
        queryset=Post.objects.all(),
        source='parent',
        required=False,
        allow_null=True,
        write_only=True
    )
    
    def get_reply_count(self, obj):
        return obj.replies.count()
   
    class Meta:
        model = Post
        # Fields that will appear in JSON response
        # Note: Python uses underscores, not hyphens in field names
        fields = [
            'id',
            'author',
            'content',
            'type',
            'media_url',  # Fixed: was 'media-url', should be 'media_url'
            'created_at',
            'updated_at',
            'parent',
            'parent_id',
            'reply_count',
        ]
        # These fields are auto-generated and can't be modified via API
        read_only_fields = ['author', 'created_at', 'updated_at', 'parent', 'reply_count']
