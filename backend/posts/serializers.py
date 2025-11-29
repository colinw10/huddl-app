"""
=============================================================================
POSTS APP - SERIALIZERS
=============================================================================

File: backend/posts/serializers.py
Assigned to: COLIN
Responsibility: Convert Post model to/from JSON for API

TODO:
- [ ] Create PostSerializer with ModelSerializer
- [ ] Include fields: id, author, content, post_type, media_url, created_at, like_count, is_liked
- [ ] Add author as nested serializer (username, avatar)
- [ ] Add SerializerMethodField for like_count
- [ ] Add SerializerMethodField for is_liked (check if current user liked)
- [ ] Validate content length (max 500 chars)
- [ ] Auto-set author to request.user in create()

Status: PLACEHOLDER
=============================================================================
"""

from rest_framework import serializers

# TODO: Colin - Import Post model
# from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Colin: Implement full serializer for Post model
    """
    # TODO: Colin - Add nested author serializer
    # author = UserSerializer(read_only=True)
    
    # TODO: Colin - Add computed fields
    # like_count = serializers.SerializerMethodField()
    # is_liked = serializers.SerializerMethodField()
    
    class Meta:
        # TODO: Colin - Uncomment when model is ready
        # model = Post
        fields = ['id', 'author', 'content', 'post_type', 'media_url', 'created_at']
    
    def get_like_count(self, obj):
        """Return number of likes on this post"""
        # TODO: Colin - return obj.likes.count()
        return 0
    
    def get_is_liked(self, obj):
        """Check if current user has liked this post"""
        # TODO: Colin - check request.user in obj.likes
        return False
    
    def create(self, validated_data):
        """Auto-set author to current user"""
        # TODO: Colin - validated_data['author'] = self.context['request'].user
        pass

