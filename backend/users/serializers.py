# 🟡 NATALIA - Auth & Users Lead
# serializers.py - Data conversion between Django models and JSON

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile


# ═══════════════════════════════════════════════════════════════════════
# 🔐 EMAIL LOGIN SERIALIZER
# Custom JWT serializer that accepts email instead of username
# ═══════════════════════════════════════════════════════════════════════
class EmailLoginSerializer(serializers.Serializer):
    """
    Custom login serializer that accepts email + password.
    Returns JWT access and refresh tokens.
    
    Frontend sends: POST /api/auth/login/
    Body: { "email": "pablo@huddl.com", "password": "test123" }
    Returns: { "access": "...", "refresh": "..." }
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        # Look up user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid email or password')
        
        # Authenticate with username (Django's auth uses username internally)
        user = authenticate(username=user.username, password=password)
        
        if not user:
            raise serializers.ValidationError('Invalid email or password')
        
        if not user.is_active:
            raise serializers.ValidationError('User account is disabled')
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }


# UserSerializer - converts User model to JSON
# Shows username, email, id (basic user info)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Which model to serialize
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']  # Which fields to include
        # date_joined comes from Django's User model automatically
        # ProfileSerializer - converts Profile model to JSON
# Shows bio, avatar, location, etc.

class ProfileSerializer(serializers.ModelSerializer):
    # Nested serializer - includes full user data inside profile
    # read_only=True means we don't accept this in POST/PUT requests
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile  # Which model to serialize
        fields = ['id', 'user', 'bio', 'avatar', 'location', 'website', 'created_at', 'updated_at']
        # read_only_fields - these can't be changed by API requests
        read_only_fields = ['created_at', 'updated_at']