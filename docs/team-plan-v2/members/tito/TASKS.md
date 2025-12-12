# Tito - Backend Tasks

> **Your Role:** ~17% of backend work

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/huddl/urls.py` | ❌ TODO | Wire up all app routes |
| `backend/posts/urls.py` | ❌ TODO | Set up posts router |
| `backend/friends/admin.py` | ❌ TODO | Register Friend models |

---

## Task 1: huddl/urls.py

Wire up all app routes:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/friends/', include('friends.urls')),
]
```

---

## Task 2: posts/urls.py

Set up posts router:

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

---

## Task 3: friends/admin.py

Register Friend models:

```python
from django.contrib import admin
from .models import Friendship, FriendRequest

@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ['user', 'friend', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'friend__username']

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['from_user__username', 'to_user__username']
```

---

## Testing

After implementation, test:
```bash
cd backend
python manage.py runserver
# Visit http://localhost:8000/admin/
```
