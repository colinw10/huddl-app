# =============================================================================
# USERS APP - SERIALIZERS
# =============================================================================
#
# File: backend/users/serializers.py
# Assigned to: NATALIA
# Responsibility: User/auth serialization
#
# TODO:
# - [ ] Create UserSerializer for user info display
# - [ ] Create SignupSerializer for registration
# - [ ] Handle password hashing in SignupSerializer
#
# Status: PLACEHOLDER
# =============================================================================

from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Natalia: Serialize User for display
    
    Example output:
    {
        "id": 1,
        "username": "natalia",
        "email": "natalia@example.com"
    }
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class SignupSerializer(serializers.ModelSerializer):
    """
    Natalia: Handle user registration
    
    Body: { "username": "...", "email": "...", "password": "..." }
    """
    # TODO: Natalia - Configure signup serializer
    # password = serializers.CharField(write_only=True)
    # 
    # class Meta:
    #     model = User
    #     fields = ['username', 'email', 'password']
    # 
    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password']
    #     )
    #     return user
    pass
