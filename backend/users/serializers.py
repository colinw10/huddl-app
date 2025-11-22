from rest_framework import serializers

# USERS APP - SERIALIZERS
# Owner: Colin (Backend Lead)
# Status: EMPTY - needs implementation
#
# Purpose: Convert User model to/from JSON
#
# TODO:
# - Create UserSerializer with ModelSerializer
# - Include fields: id, username, email, bio, avatar, created_at
# - EXCLUDE password hash from responses
# - Make email read-only after signup (optional)
# - Add validation for bio length, avatar URL format
# - Add nested serializers if including friends count, posts count, etc.
#
# Example:
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'bio', 'avatar', 'created_at']
#         read_only_fields = ['id', 'created_at']
#
# Create your serializers here.
