# Colin - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status |
|------|--------|
| `backend/posts/models.py` | ❌ TODO |
| `backend/users/serializers.py` | ❌ TODO |
| `backend/friends/views.py` | ❌ TODO |

---

## Task 1: posts/models.py

Create a `Post` model with:
- ForeignKey to User (author)
- `type` field (choices: text, image, mood, activity)
- `content` TextField
- `image` ImageField (optional)
- `created_at` timestamp

**Example pattern:**
```python
class MyModel(models.Model):
    TYPE_CHOICES = [('a', 'Option A'), ('b', 'Option B')]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
```

---

## Task 2: users/serializers.py

Create serializers:
- `UserSerializer` - returns id, username, email
- `SignupSerializer` - validates username, email, password, creates user

**Example pattern:**
```python
class MySerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = ['id', 'name']
```

---

## Task 3: friends/views.py

Create ViewSets:
- `FriendshipViewSet` - list friends, delete friendship
- `FriendRequestViewSet` - create request, accept/reject actions

**Example pattern:**
```python
class MyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return MyModel.objects.filter(user=self.request.user)
```

---

## Testing

```bash
cd backend && python manage.py runserver
```
