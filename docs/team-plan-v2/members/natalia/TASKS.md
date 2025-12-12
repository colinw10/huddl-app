# Natalia - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status |
|------|--------|
| `backend/huddl/settings.py` | ❌ TODO |
| `backend/posts/serializers.py` | ❌ TODO |
| `backend/users/models.py` | ❌ TODO |
| `backend/friends/urls.py` | ❌ TODO |

---

## Task 1: huddl/settings.py

Add to INSTALLED_APPS:
- rest_framework
- rest_framework_simplejwt
- corsheaders
- users, posts, friends apps

Configure:
- CORS_ALLOW_ALL_ORIGINS
- REST_FRAMEWORK default authentication
- SIMPLE_JWT token lifetimes

**Example pattern:**
```python
INSTALLED_APPS = [
    # ... existing
    'rest_framework',
    'myapp',
]
```

---

## Task 2: posts/serializers.py

Create `PostSerializer`:
- Include all Post fields
- Nested author info (read only)
- author_id write-only for creation

**Example pattern:**
```python
author = UserSerializer(read_only=True)
author_id = serializers.IntegerField(write_only=True)
```

---

## Task 3: users/models.py

Extend User with `Profile` model:
- OneToOne to User
- bio, avatar, theme_color fields
- Signal to auto-create profile

**Example pattern:**
```python
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

---

## Task 4: friends/urls.py

Create router and register:
- FriendshipViewSet at 'friendships'
- FriendRequestViewSet at 'requests'

**Example pattern:**
```python
router = DefaultRouter()
router.register('items', ItemViewSet)
urlpatterns = router.urls
```

---

## Testing

```bash
cd backend && python manage.py runserver
```
