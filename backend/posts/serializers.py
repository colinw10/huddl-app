from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User
from users.serializers import UserSerializer  # nested author data

# Create your serializers here.
class PostSerializer(serializers.ModelSerializer):
   author = UserSerializer(read_only=True) # nested user object
   
   class Meta:
    model = Post
    fields = [
      'id',
      'author',
      'content',
      'type',
      'media-url',
      'created_at',
      'updated_at',
    ]
    read_only_fields = ['author', 'created_at', 'updated_at']
