# Colin - Posts System Tasks

> **Your Role:** Build the Posts API and frontend integration. The Post model already exists!

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/posts/serializers.py` | ❌ TODO | Create PostSerializer |
| `backend/posts/views.py` | ❌ TODO | Create PostViewSet with CRUD |
| `backend/posts/urls.py` | ❌ TODO | Set up router |
| `backend/posts/admin.py` | ❌ TODO | Register Post model |
| `frontend/src/services/postsService.js` | ❌ TODO | API calls for posts |
| `frontend/src/contexts/PostsContext.jsx` | ❌ TODO | Posts state management |

---

## Week 1: Verify Model & Admin

### Task 1: Check Post Model Exists

Open `backend/posts/models.py` - confirm the Post model has:
- `author` (ForeignKey to User)
- `content` (TextField)
- `type` (CharField with choices)
- `media_url` (URLField)
- `created_at`, `updated_at`

### Task 2: Register in Admin - `backend/posts/admin.py`

```python
from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'type', 'content', 'created_at']
    list_filter = ['type', 'created_at']
    search_fields = ['content', 'author__username']
```

### Task 3: Create Test Data

```bash
cd backend
python manage.py createsuperuser
# Username: admin, Password: admin123

python manage.py runserver
```

Go to http://127.0.0.1:8000/admin, create 2-3 test posts.

---

## Week 2: Backend API

### Task 1: Create Serializers - `backend/posts/serializers.py`

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

### Task 2: Create Views - `backend/posts/views.py`

```python
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return PostCreateSerializer
        return PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            return Response(
                {'error': 'You can only edit your own posts'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            return Response(
                {'error': 'You can only delete your own posts'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)
```

### Task 3: Create URLs - `backend/posts/urls.py`

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register(r'', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
]
```

### Task 4: Test with curl

```bash
# Get all posts (no auth needed)
curl http://127.0.0.1:8000/api/posts/

# Create post (needs auth - get token from login first)
curl -X POST http://127.0.0.1:8000/api/posts/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"Hello world!","type":"text"}'
```

---

## Week 3: Frontend Service & Context

### Task 1: Implement `frontend/src/services/postsService.js`

```javascript
const API_URL = 'http://localhost:8000/api/posts'\;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const postsService = {
  getAllPosts: async () => {
    const response = await fetch(`${API_URL}/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  getPost: async (id) => {
    const response = await fetch(`${API_URL}/${id}/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  createPost: async (postData) => {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || 'Failed to create post');
    }
    return response.json();
  },

  updatePost: async (id, postData) => {
    const response = await fetch(`${API_URL}/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  deletePost: async (id) => {
    const response = await fetch(`${API_URL}/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return true;
  },
};

export default postsService;
```

### Task 2: Implement `frontend/src/contexts/PostsContext.jsx`

```javascript
import { createContext, useContext, useState, useCallback } from 'react';
import postsService from '../services/postsService';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postsService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (postData) => {
    try {
      const newPost = await postsService.createPost(postData);
      setPosts(prev => [newPost, ...prev]);
      return { success: true, post: newPost };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const updatedPost = await postsService.updatePost(id, postData);
      setPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      return { success: true, post: updatedPost };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deletePost = async (id) => {
    try {
      await postsService.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <PostsContext.Provider value={{
      posts,
      loading,
      error,
      loadPosts,
      createPost,
      updatePost,
      deletePost,
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within PostsProvider');
  }
  return context;
}

export default PostsContext;
```

---

## Testing Checklist

- [ ] Post model registered in admin
- [ ] Can create posts in admin
- [ ] GET /api/posts/ returns posts
- [ ] POST /api/posts/ creates post (with auth)
- [ ] PUT /api/posts/:id/ updates post (only own posts)
- [ ] DELETE /api/posts/:id/ deletes post (only own posts)
- [ ] PostsContext loads and manages state

---

## Commits to Make

1. "Register Post model in admin"
2. "Create PostSerializer and PostCreateSerializer"
3. "Create PostViewSet with CRUD operations"
4. "Set up posts URL routing"
5. "Implement postsService.js"
6. "Implement PostsContext"
