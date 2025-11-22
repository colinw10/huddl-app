from rest_framework import serializers

# FRIENDS APP - SERIALIZERS
# Owner: Colin (Backend Lead)
# Status: EMPTY - needs implementation
#
# Purpose: Convert FriendRequest and Friendship models to/from JSON
#
# TODO:
# - Create FriendRequestSerializer with ModelSerializer
# - Include fields: id, from_user (nested), to_user (nested), status, created_at
# - Nest UserSerializer to show usernames and avatars
# - Make from_user auto-set to request.user (read_only in serializer)
# - Create FriendSerializer (simple UserSerializer for friend list)
# - Add validation: prevent sending request to yourself
# - Add validation: check if request already exists
#
# Example:
# class FriendRequestSerializer(serializers.ModelSerializer):
#     from_user = UserSerializer(read_only=True)
#     to_user = UserSerializer(read_only=True)
#     to_user_id = serializers.IntegerField(write_only=True)
#     
#     class Meta:
#         model = FriendRequest
#         fields = ['id', 'from_user', 'to_user', 'to_user_id', 'status', 'created_at']
#     
#     def validate_to_user_id(self, value):
#         if value == self.context['request'].user.id:
#             raise serializers.ValidationError("Cannot send friend request to yourself")
#         return value
#
# Create your serializers here.
