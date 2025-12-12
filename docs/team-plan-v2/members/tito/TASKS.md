# Tito - Backend Tasks

> **Your Role:** ~17% of backend work

---

## 📁 YOUR FILES

| File | Status |
|------|--------|
| `backend/huddl/urls.py` | ❌ TODO |
| `backend/posts/urls.py` | ❌ TODO |
| `backend/friends/admin.py` | ❌ TODO |

---

## Task 1: huddl/urls.py

Include app URLs:
- /api/auth/ -> users.urls
- /api/posts/ -> posts.urls
- /api/friends/ -> friends.urls
- /api/token/ -> JWT token views

**Example pattern:**
```python
urlpatterns = [
    path('api/myapp/', include('myapp.urls')),
]
```

---

## Task 2: posts/urls.py

Create router and register PostViewSet at 'posts'

**Example pattern:**
```python
router = DefaultRouter()
router.register('items', ItemViewSet, basename='item')
urlpatterns = router.urls
```

---

## Task 3: friends/admin.py

Register models:
- Friendship with list_display
- FriendRequest with list_display and list_filter

**Example pattern:**
```python
@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ['field1', 'field2']
```

---

## Testing

```bash
cd backend && python manage.py runserver
```
