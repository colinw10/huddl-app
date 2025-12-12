# Crystal - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/posts/views.py` | ❌ TODO | Create PostViewSet with CRUD |
| `backend/users/urls.py` | ❌ TODO | Wire up auth routes |
| `backend/friends/models.py` | ❌ TODO | Friendship + FriendRequest models |

---

## Task 1: posts/views.py

Create PostViewSet:

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def get_queryset(self):
        queryset = Post.objects.all()
        author = self.request.query_params.get('author')
        if author:
            queryset = queryset.filter(author__username=author)
        return queryset
```

---

## Task 2: users/urls.py

Wire up auth routes:

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignupView, LoginView, MeView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
]
```

---

## Task 3: friends/models.py

Create friendship models:

```python
from django.db import models
from django.contrib.auth.models import User

class Friendship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends_of')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'friend']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} <-> {self.friend.username}"


class FriendRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]
    
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['from_user', 'to_user']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.from_user.username} -> {self.to_user.username} ({self.status})"
```

---

## After Implementation

Run migrations:
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```
