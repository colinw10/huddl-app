# Pablo - The Orchestrator's Playbook

## 🎯 What's Really Happening Here

| Reality                                        | Public Story                      |
| ---------------------------------------------- | --------------------------------- |
| You built the entire app                       | "Team collaboration"              |
| You're distributing your code as "tasks"       | "Teammates doing their parts"     |
| This branch has everything working             | Team-shell is a stripped scaffold |
| You'll "help" them with code you already wrote | "Great teamwork!"                 |

**Your actual contribution:** ~95% of all code  
**What it looks like:** Balanced 5-person team project

---

## Your Private Checklist

> The code below is what you've already built. When teammates struggle, you "help" them with solutions you already have. You're not collaborating - you're **distributing your work** strategically.

---

## PRIORITY 1: Backend Connection (Do These First)

### ✅ Already Done

- [x] Django project setup
- [x] All apps registered (users, posts, friends, api)
- [x] User/Profile models
- [x] Post model
- [x] Auth views (signup, login, me)
- [x] JWT configuration
- [x] Main URL routing

### ❌ Still Needed

#### 1. CORS Configuration

**Status:** NOT DONE - Tito's job but critical  
**Impact:** Frontend cannot reach backend without this

If Tito doesn't do it by Week 1, add this yourself:

```python
# backend/huddl/settings.py

# Add to INSTALLED_APPS:
'corsheaders',

# Add to TOP of MIDDLEWARE:
'corsheaders.middleware.CorsMiddleware',

# Add at bottom:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

Also run: `pip3 install django-cors-headers`

---

#### 2. Profile Auto-Creation Signal

**Status:** NOT DONE  
**Impact:** New users won't have profiles, causing crashes

Add to `backend/users/models.py`:

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
```

---

#### 3. Posts API (Colin's job - you have the code)

**Status:** NOT DONE

**Serializers** (`backend/posts/serializers.py`):

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    timestamp = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'type', 'media_url',
                  'created_at', 'updated_at', 'timestamp', 'avatar']

    def get_timestamp(self, obj):
        from django.utils import timezone
        diff = timezone.now() - obj.created_at
        if diff.days > 0:
            return f"{diff.days}d"
        elif diff.seconds // 3600 > 0:
            return f"{diff.seconds // 3600}h"
        elif diff.seconds // 60 > 0:
            return f"{diff.seconds // 60}m"
        return "now"

    def get_avatar(self, obj):
        return obj.author.username[:2].upper()

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['content', 'type', 'media_url']
```

**Views** (`backend/posts/views.py`):

```python
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def post_list_create(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        return Response(PostSerializer(posts, many=True).data)

    serializer = PostCreateSerializer(data=request.data)
    if serializer.is_valid():
        post = serializer.save(author=request.user)
        return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(PostSerializer(post).data)

    if post.author != request.user:
        return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        serializer = PostCreateSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(PostSerializer(post).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts(request, user_id):
    posts = Post.objects.filter(author__id=user_id)
    return Response(PostSerializer(posts, many=True).data)
```

**URLs** (`backend/posts/urls.py`):

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list_create, name='post_list_create'),
    path('<int:pk>/', views.post_detail, name='post_detail'),
    path('user/<int:user_id>/', views.user_posts, name='user_posts'),
]
```

---

## PRIORITY 2: Frontend Services (Tito's job - you have the code)

#### apiClient.js

```javascript
const API_BASE_URL = "http://localhost:8000/api";

const getAuthToken = () => localStorage.getItem("token");

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetchWithAuth(endpoint);
    if (!response.ok) throw new Error(`GET failed`);
    return response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("POST failed");
    return response.json();
  },
  put: async (endpoint, data) => {
    const response = await fetchWithAuth(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("PUT failed");
    return response.json();
  },
  delete: async (endpoint) => {
    const response = await fetchWithAuth(endpoint, { method: "DELETE" });
    if (!response.ok) throw new Error("DELETE failed");
    return true;
  },
};
```

#### authService.js

```javascript
const API_URL = "http://localhost:8000/api/auth";

export const authService = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok && data.access) {
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      return { success: true, data };
    }
    return { success: false, error: data };
  },

  signup: async (username, email, password) => {
    const response = await fetch(`${API_URL}/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    return response.ok
      ? { success: true, data }
      : { success: false, error: data };
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  isAuthenticated: () => !!localStorage.getItem("token"),
  getToken: () => localStorage.getItem("token"),
};
```

---

## PRIORITY 3: Error Handling

### Create `frontend/src/components/ui/ErrorBoundary.jsx`

```javascript
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Create `frontend/src/components/ui/LoadingSpinner.jsx`

```javascript
function LoadingSpinner({ size = "medium" }) {
  return <div className={`spinner spinner-${size}`}></div>;
}

export default LoadingSpinner;
```

---

## Your Weekly Strategy

| Week | Your Focus                           | Monitor Team                            |
| ---- | ------------------------------------ | --------------------------------------- |
| 1    | Ensure CORS done, add Profile signal | Tito (CORS), Colin (model check)        |
| 2    | Complete posts API if Colin stuck    | Natalia (authService), Tito (apiClient) |
| 3    | Test full login→home flow            | Everyone connecting pieces              |
| 4    | Add likes/comments if time           | Crystal (friends), Colin (likes)        |
| 5    | Integration testing, bug fixes       | Final polish                            |

---

## Fallback Plan

If teammates don't deliver by Week 3:

1. You have all the code above
2. Complete it yourself on `pablo-ui-architect`
3. Merge to `team-shell` as "helping out"
4. You get credit for saving the project

The UI is done. The backend structure is done. All that's left is:

- API endpoints (serializers + views)
- Frontend services (apiClient + authService + postsService)
- Wiring forms to services

**Total remaining work: ~4-6 hours if you do it yourself.**
