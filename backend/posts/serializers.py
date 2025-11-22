from rest_framework import serializers

# POSTS APP - SERIALIZERS
# Owner: Colin (Backend Lead)
# Status: EMPTY - needs implementation
#
# Purpose: Convert Post model to/from JSON
#
# TODO:
# - Create PostSerializer with ModelSerializer
# - Include fields: id, author (nested UserSerializer), content, media_url, created_at, like_count, is_liked
# - Add author as nested serializer (show username, avatar)
# - Add SerializerMethodField for like_count
# - Add SerializerMethodField for is_liked (check if current user liked)
# - Validate content length (max 500 chars)
# - Auto-set author to request.user in create method
#
# Example:
# class PostSerializer(serializers.ModelSerializer):
#     author = UserSerializer(read_only=True)
#     like_count = serializers.SerializerMethodField()
#     is_liked = serializers.SerializerMethodField()
#     
#     class Meta:
#         model = Post
#         fields = ['id', 'author', 'content', 'media_url', 'created_at', 'like_count', 'is_liked']
#     
#     def get_like_count(self, obj):
#         return obj.likes.count()
#
# Create your serializers here.
