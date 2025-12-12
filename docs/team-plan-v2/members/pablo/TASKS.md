# Pablo - Backend Tasks

> **Your Role:** ~22% of backend work

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/posts/admin.py` | ❌ TODO | Register Post model |
| `backend/users/views.py` | ❌ TODO | signup, login, me endpoints |
| `backend/friends/serializers.py` | ❌ TODO | Create serializers |

---

## Task 1: posts/admin.py

Register Post model:

```python
from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'type', 'content', 'created_at']
    list_filter = ['type', 'created_at']
    search_fields = ['content', 'author__username']
```

---

## Task 2: users/views.py

Create auth endpoints:

```python
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, SignupSerializer

class SignupView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        from django.contrib.auth.models import User
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = authenticate(username=user.username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class MeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response(UserSerializer(request.user).data)
```

---

## Task 3: friends/serializers.py

Create serializers:

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Friendship, FriendRequest

class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class FriendshipSerializer(serializers.ModelSerializer):
    friend = UserMinimalSerializer(read_only=True)
    
    class Meta:
        model = Friendship
        fields = ['id', 'friend', 'created_at']

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserMinimalSerializer(read_only=True)
    to_user_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user_id', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']
    
    def create(self, validated_data):
        to_user_id = validated_data.pop('to_user_id')
        to_user = User.objects.get(id=to_user_id)
        return FriendRequest.objects.create(to_user=to_user, **validated_data)
```

---

## Testing

After implementation:
```bash
cd backend
python manage.py runserver
# Test: curl http://localhost:8000/api/auth/signup/ -X POST -H "Content-Type: application/json" -d '{"username":"test","email":"test@test.com","password":"test123"}'
```
