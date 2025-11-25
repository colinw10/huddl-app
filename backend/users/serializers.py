from rest_framework import serializers
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

# UserSerializer - converts User model to JSON
# Shows username, email, id (basic user info)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Which model to serialize
        fields = ['id', 'username', 'email', 'date_joined']  # Which fields to include
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