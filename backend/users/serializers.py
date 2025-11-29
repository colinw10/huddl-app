"""
=============================================================================
USERS APP - SERIALIZERS
=============================================================================

File: backend/users/serializers.py
Assigned to: NATALIA
Responsibility: User serialization for auth and profiles

TODO:
- [ ] Create UserSerializer for profile display
- [ ] Create SignupSerializer for registration
- [ ] Create LoginSerializer for authentication
- [ ] Exclude password from all responses
- [ ] Add validation for email format
- [ ] Add validation for password strength

Status: PLACEHOLDER
=============================================================================
"""

from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Natalia: Public user profile serializer
    Used for displaying user info (never includes password)
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class SignupSerializer(serializers.Serializer):
    """
    Natalia: Registration serializer
    Validates and creates new users
    """
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    
    def validate_username(self, value):
        # TODO: Natalia - Check if username already exists
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value
    
    def validate_email(self, value):
        # TODO: Natalia - Check if email already exists
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value
    
    def create(self, validated_data):
        # TODO: Natalia - Create user with hashed password
        # user = User.objects.create_user(
        #     username=validated_data['username'],
        #     email=validated_data['email'],
        #     password=validated_data['password']
        # )
        # return user
        pass


class LoginSerializer(serializers.Serializer):
    """
    Natalia: Login serializer
    Validates credentials
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

