# Natalia - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/huddl/settings.py` | ❌ TODO | Configure CORS, JWT, installed apps |
| `backend/posts/serializers.py` | ❌ TODO | Create PostSerializer |
| `backend/users/models.py` | ❌ TODO | Create Profile model |
| `backend/friends/urls.py` | ❌ TODO | Set up routing |

---

## Task 1: huddl/settings.py

Add these configurations:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    # Local apps
    'users',
    'posts',
    'friends',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
```

---

## Task 2: posts/serializers.py

Create PostSerializer:

```python
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'author', 'author_username', 'content', 'type', 'media_url', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']
```

---

## Task 3: users/models.py

Create Profile model:

```python
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, max_length=500)
    avatar_url = models.URLField(blank=True, null=True)
    theme_color = models.CharField(max_length=7, default='#6366f1')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
```

---

## Task 4: friends/urls.py

Set up routing:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendRequestViewSet, FriendshipViewSet

router = DefaultRouter()
router.register(r'requests', FriendRequestViewSet, basename='friend-request')
router.register(r'list', FriendshipViewSet, basename='friendship')

urlpatterns = [
    path('', include(router.urls)),
]
```

---

## After Implementation

Run migrations:
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```
