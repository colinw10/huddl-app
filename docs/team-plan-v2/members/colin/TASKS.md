# Colin - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/posts/models.py` | ❌ TODO | Create Post model |
| `backend/users/serializers.py` | ❌ TODO | UserSerializer, SignupSerializer |
| `backend/friends/views.py` | ❌ TODO | Friend request endpoints |

---

## Task 1: posts/models.py

Create the Post model:

```python
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    POST_TYPES = [
        ('text', 'Text'),
        ('image', 'Image'),
        ('link', 'Link'),
    ]
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    type = models.CharField(max_length=10, choices=POST_TYPES, default='text')
    media_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author.username}: {self.content[:50]}"
```

---

## Task 2: users/serializers.py

Create user serializers:

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'avatar_url', 'theme_color']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user
```

---

## Task 3: friends/views.py

Create friend request endpoints:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Friendship, FriendRequest
from .serializers import FriendshipSerializer, FriendRequestSerializer

class FriendRequestViewSet(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return FriendRequest.objects.filter(to_user=self.request.user, status='pending')
    
    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        friend_request = self.get_object()
        friend_request.status = 'accepted'
        friend_request.save()
        # Create friendship both ways
        Friendship.objects.create(user=friend_request.from_user, friend=friend_request.to_user)
        Friendship.objects.create(user=friend_request.to_user, friend=friend_request.from_user)
        return Response({'status': 'accepted'})
    
    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        friend_request = self.get_object()
        friend_request.status = 'declined'
        friend_request.save()
        return Response({'status': 'declined'})

class FriendshipViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Friendship.objects.filter(user=self.request.user)
```

---

## After Implementation

Run migrations:
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```
