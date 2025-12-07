# Colin - Weekly Tasks

> **Note:** The Post model already exists! Check `backend/posts/models.py` before Week 1. You're building the API layer on top of it.

---

## Week 1: Posts API Foundation

### Task 1: Verify Post Model Exists

Open `backend/posts/models.py` - confirm the Post model is there with:

- `author` (ForeignKey to User)
- `content` (TextField)
- `type` (CharField with choices)
- `media_url` (URLField)
- `created_at`, `updated_at`

If it matches, skip to Task 2. If different, let Pablo know.

### Task 2: Register Post in Admin

Open `backend/posts/admin.py`:

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
python3 manage.py createsuperuser
# Username: admin, Password: admin123

python3 manage.py runserver
```

Go to http://127.0.0.1:8000/admin, login, create 2-3 test posts.

**Commits:**

1. "Register Post model in Django admin"
2. "Create test posts via admin"

---

## Week 2: Posts API Endpoints

### Task 1: Create Post Serializer

Open `backend/posts/serializers.py`:

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

### Task 2: Create Views

Open `backend/posts/views.py`:

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
            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

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

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts(request, user_id):
    posts = Post.objects.filter(author__id=user_id)
    return Response(PostSerializer(posts, many=True).data)
```

### Task 3: Create URLs

Open `backend/posts/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list_create, name='post_list_create'),
    path('<int:pk>/', views.post_detail, name='post_detail'),
    path('user/<int:user_id>/', views.user_posts, name='user_posts'),
]
```

### Task 4: Test Endpoints

```bash
# Get token from login endpoint first, then:
curl http://127.0.0.1:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Commits:**

1. "Create Post serializers"
2. "Build posts API views"
3. "Add posts URL routing"

---

## Week 3: Home Feed Integration

### Task 1: Connect Home.jsx to API

Update `frontend/src/components/pages/Home/Home.jsx` - add the API connection logic. The UI is already built, you're adding the data fetching.

Key changes:

- Import `postsService` (Tito will create this)
- Add `useState` for posts, loading, error
- Add `useEffect` to fetch posts on mount
- Pass real data to `TimelineRiverFeed`

### Task 2: Wire Up ComposerModal

The ComposerModal UI exists. Add the logic to:

- Call `postsService.createPost()` on submit
- Handle loading/error states
- Refresh feed after post creation

**Commits:**

1. "Connect Home page to posts API"
2. "Wire ComposerModal to create posts"

---

## Week 4: Likes & Comments

### Task 1: Add Like Model

Update `backend/posts/models.py` - ADD:

```python
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'post']
```

### Task 2: Add Comment Model

```python
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
```

### Task 3: Run Migrations

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### Task 4: Add Like/Comment Endpoints

Add to views.py:

- `toggle_like(request, pk)` - POST to like/unlike
- `post_comments(request, pk)` - GET/POST comments
- `delete_comment(request, pk)` - DELETE comment

### Task 5: Update URLs

Add new routes for likes and comments.

**Commits:**

1. "Create Like and Comment models"
2. "Add like/comment endpoints"
3. "Run migrations"

---

## Week 5: Polish & Bug Fixes

### Task 1: Add Post Stats Endpoint

```python
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def post_stats(request):
    user_posts = Post.objects.filter(author=request.user)
    total_likes = Like.objects.filter(post__author=request.user).count()

    return Response({
        'total_posts': user_posts.count(),
        'total_likes': total_likes
    })
```

### Task 2: Test All Endpoints

- GET /api/posts/ ✓
- POST /api/posts/ ✓
- GET /api/posts/:id/ ✓
- PUT /api/posts/:id/ ✓
- DELETE /api/posts/:id/ ✓
- POST /api/posts/:id/like/ ✓
- GET/POST /api/posts/:id/comments/ ✓

### Task 3: Fix Bugs

- Handle edge cases
- Add proper error messages
- Test with frontend

**Commits:**

1. "Add post stats endpoint"
2. "Fix bugs and edge cases"
3. "Final testing and cleanup"
