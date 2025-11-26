# Pablo - UI Architect & Project Lead

## Your Role

You're the **UI Architect and Project Coordinator**. You've built the entire visual foundation of the app - the design system, component structure, layouts, and styling. Your remaining work is filling in backend gaps, ensuring frontend-backend connection works, adding error handling patterns, and coordinating the team. You have the complete working reference on your branch that the team will be building towards on the shared branch.

## What You've Completed ✅

### Frontend (100% of styling, structure)

- Design system (`styles/` folder - tokens, utilities, theme)
- All layout components (TopBar, SideNav, BottomNav)
- All page UI structure (Landing, Login, Signup, Home, Profile, Friends)
- Timeline River feed architecture
- Profile card with flip animation
- Composer modal UI
- Responsive design

### Backend (Partial)

- Django project setup with all apps
- User/Profile models + migrations
- Post model + migrations
- Auth endpoints (signup, login, token refresh, me)
- JWT configuration

---

## 🔧 What's Left To Do

### PRIORITY 1: Backend Connection (Blocking Everything)

#### 1. CORS Configuration

The frontend can't talk to the backend without this.

**File:** `backend/huddl/settings.py`

```python
# Install first: pip install django-cors-headers

# Add to INSTALLED_APPS:
'corsheaders',

# Add to TOP of MIDDLEWARE:
'corsheaders.middleware.CorsMiddleware',

# Add at bottom of file:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

#### 2. Profile Auto-Creation Signal

When a user signs up, their Profile should be created automatically.

**File:** `backend/users/models.py` - Add at bottom:

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create Profile when User is created"""
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save Profile when User is saved"""
    if hasattr(instance, 'profile'):
        instance.profile.save()
```

---

### PRIORITY 2: Posts Backend (Colin's job, but you have the code)

#### Posts Serializer

**File:** `backend/posts/serializers.py`

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
        read_only_fields = ['created_at', 'updated_at']

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

#### Posts Views

**File:** `backend/posts/views.py`

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
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save(author=request.user)
            return_serializer = PostSerializer(post)
            return Response(return_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)

    elif request.method in ['PUT', 'DELETE']:
        if post.author != request.user:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

        if request.method == 'PUT':
            serializer = PostCreateSerializer(post, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(PostSerializer(post).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts(request, user_id):
    posts = Post.objects.filter(author__id=user_id)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)
```

#### Posts URLs

**File:** `backend/posts/urls.py`

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

### PRIORITY 3: Frontend Services (Tito's job, but you have the code)

#### API Client

**File:** `frontend/src/services/apiClient.js`

```javascript
const API_BASE_URL = "http://localhost:8000/api";

const getAuthToken = () => localStorage.getItem("token");

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

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
    if (!response.ok) throw new Error(`GET ${endpoint} failed`);
    return await response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "POST failed");
    }
    return await response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetchWithAuth(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("PUT failed");
    return await response.json();
  },

  delete: async (endpoint) => {
    const response = await fetchWithAuth(endpoint, { method: "DELETE" });
    if (!response.ok) throw new Error("DELETE failed");
    return true;
  },
};
```

#### Auth Service

**File:** `frontend/src/services/authService.js`

```javascript
const API_URL = "http://localhost:8000/api/auth";

export const authService = {
  login: async (username, password) => {
    try {
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
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      return response.ok
        ? { success: true, data }
        : { success: false, error: data };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.ok ? await response.json() : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => !!localStorage.getItem("token"),
  getToken: () => localStorage.getItem("token"),
};
```

---

### PRIORITY 4: Error Handling Patterns

Add to `frontend/src/components/ui/`:

#### ErrorBoundary.jsx

```javascript
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### LoadingSpinner.jsx

```javascript
function LoadingSpinner({ size = "medium" }) {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-ring"></div>
    </div>
  );
}

export default LoadingSpinner;
```

---

## Coordination Checklist

- [ ] Week 1: Ensure Tito does CORS first (blocks everyone)
- [ ] Week 1: Verify Colin understands Post model already exists
- [ ] Week 2: Check Natalia's authService works with existing endpoints
- [ ] Week 3: Test full login flow end-to-end
- [ ] Week 4: Verify posts and friends are working
- [ ] Week 5: Polish, bug fixes, deployment prep
