# Pablo - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status |
|------|--------|
| `backend/posts/admin.py` | ❌ TODO |
| `backend/users/views.py` | ❌ TODO |
| `backend/friends/serializers.py` | ❌ TODO |

---

## Task 1: posts/admin.py

Register Post model with:
- list_display: author, type, content, created_at
- list_filter: type, created_at
- search_fields: content, author username

**Example pattern:**
```python
@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ['field1', 'field2']
```

---

## Task 2: users/views.py

Create APIViews:
- `SignupView` - POST, create user, return JWT tokens
- `LoginView` - POST, authenticate, return JWT tokens
- `MeView` - GET, return current user (requires auth)

**Example pattern:**
```python
class MyView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # validate, save, return response
        return Response(data, status=status.HTTP_201_CREATED)
```

---

## Task 3: friends/serializers.py

Create serializers:
- `FriendshipSerializer` - nested friend info
- `FriendRequestSerializer` - from_user read-only, to_user_id write-only

**Example pattern:**
```python
class MySerializer(serializers.ModelSerializer):
    related = RelatedSerializer(read_only=True)
    related_id = serializers.IntegerField(write_only=True)
```

---

## Testing

```bash
cd backend && python manage.py runserver
```
