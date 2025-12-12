# Crystal - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status |
|------|--------|
| `backend/posts/views.py` | ❌ TODO |
| `backend/users/urls.py` | ❌ TODO |
| `backend/friends/models.py` | ❌ TODO |

---

## Task 1: posts/views.py

Create `PostViewSet`:
- List all posts (GET)
- Create post (POST) - set author from request.user
- Filter by type query param

**Example pattern:**
```python
class MyViewSet(viewsets.ModelViewSet):
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
```

---

## Task 2: users/urls.py

Create URL patterns for:
- /signup/ -> SignupView
- /login/ -> LoginView  
- /me/ -> MeView

**Example pattern:**
```python
urlpatterns = [
    path('endpoint/', MyView.as_view(), name='my-view'),
]
```

---

## Task 3: friends/models.py

Create models:
- `Friendship` - user1, user2, created_at
- `FriendRequest` - from_user, to_user, status (pending/accepted/rejected)

**Example pattern:**
```python
class MyModel(models.Model):
    STATUS_CHOICES = [('p', 'Pending'), ('a', 'Accepted')]
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='p')
```

---

## Testing

```bash
cd backend && python manage.py runserver
```
