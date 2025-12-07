# Crystal - Weekly Tasks

> **Note:** The friends app is empty - you're building from scratch! Start with the model, then API, then frontend.

---

## Week 1: Friendship Model

### Task 1: Create Friendship Model

Open `backend/friends/models.py`:

```python
from django.db import models
from django.contrib.auth.models import User

class Friendship(models.Model):
    """User friendship connections"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'friend']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} → {self.friend.username}"
```

### Task 2: Register in Admin

Open `backend/friends/admin.py`:

```python
from django.contrib import admin
from .models import Friendship

@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ['user', 'friend', 'created_at']
    search_fields = ['user__username', 'friend__username']
```

### Task 3: Run Migrations

```bash
cd backend
python3 manage.py makemigrations friends
python3 manage.py migrate
```

### Task 4: Test in Admin

Go to http://127.0.0.1:8000/admin, create a test friendship.

**Commits:**

1. "Create Friendship model"
2. "Register in admin"
3. "Run migrations"

---

## Week 2: Basic Friends API

### Task 1: Create Serializers

Open `backend/friends/serializers.py`:

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Friendship

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']

    def get_avatar(self, obj):
        return obj.username[:2].upper()

class FriendshipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    friend = UserSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend', 'created_at']
```

### Task 2: Create Basic View

Open `backend/friends/views.py`:

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Friendship
from .serializers import FriendshipSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_list(request):
    """Get user's friends"""
    friendships = Friendship.objects.filter(user=request.user)
    serializer = FriendshipSerializer(friendships, many=True)
    return Response(serializer.data)
```

### Task 3: Create URLs

Open `backend/friends/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.friend_list, name='friend_list'),
]
```

### Task 4: Test

```bash
curl http://127.0.0.1:8000/api/friends/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Commits:**

1. "Create Friendship serializers"
2. "Add friend list endpoint"
3. "Create friends URLs"

---

## Week 3: Friends Page Frontend

### Task 1: Create friendsService.js

Create `frontend/src/services/friendsService.js`:

```javascript
import { apiClient } from "./apiClient";

export const friendsService = {
  getFriends: async () => {
    return await apiClient.get("/friends/");
  },

  // Placeholders for Week 4
  sendFriendRequest: async (friendId) => {
    return await apiClient.post("/friends/send/", { friend_id: friendId });
  },

  removeFriend: async (friendshipId) => {
    return await apiClient.delete(`/friends/remove/${friendshipId}/`);
  },
};
```

### Task 2: Update Friends.jsx

Update `frontend/src/components/pages/Friends/Friends.jsx`:

```javascript
import { useState, useEffect } from "react";
import { friendsService } from "../../../services/friendsService";
import "./Friends.css";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    setIsLoading(true);
    try {
      const data = await friendsService.getFriends();
      setFriends(data);
    } catch (err) {
      setError("Failed to load friends");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="friends-container">
      <h1>Friends</h1>

      {friends.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        <div className="friends-grid">
          {friends.map((f) => (
            <div key={f.id} className="friend-card">
              <div className="friend-avatar">{f.friend.avatar}</div>
              <h3>{f.friend.username}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Friends;
```

### Task 3: Create About.jsx

Create `frontend/src/components/pages/About/About.jsx`:

```javascript
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About HUDDL</h1>
      <p>
        HUDDL is a social platform for sharing thoughts, media, and milestones
        with friends.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Share posts with your network</li>
        <li>Connect with friends</li>
        <li>Track milestones</li>
      </ul>
    </div>
  );
}

export default About;
```

**Commits:**

1. "Create friendsService"
2. "Connect Friends page to API"
3. "Create About page"

---

## Week 4: Friend Requests System

### Task 1: Update Friendship Model with Status

Update `backend/friends/models.py`:

```python
class Friendship(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_requests')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'friend']
```

### Task 2: Run Migrations

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### Task 3: Add Request Endpoints

Add to `backend/friends/views.py`:

```python
from rest_framework import status
from django.contrib.auth.models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests(request):
    """Get pending requests received"""
    requests = Friendship.objects.filter(friend=request.user, status='pending')
    return Response(FriendshipSerializer(requests, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request):
    """Send friend request"""
    friend_id = request.data.get('friend_id')

    try:
        friend = User.objects.get(id=friend_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if friend == request.user:
        return Response({'error': 'Cannot add yourself'}, status=status.HTTP_400_BAD_REQUEST)

    friendship, created = Friendship.objects.get_or_create(
        user=request.user,
        friend=friend,
        defaults={'status': 'pending'}
    )

    if not created:
        return Response({'error': 'Request already exists'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(FriendshipSerializer(friendship).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def respond_friend_request(request, pk):
    """Accept or reject request"""
    action = request.data.get('action')  # 'accept' or 'reject'

    try:
        friendship = Friendship.objects.get(pk=pk, friend=request.user, status='pending')
    except Friendship.DoesNotExist:
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

    if action == 'accept':
        friendship.status = 'accepted'
        friendship.save()
        # Create reverse friendship
        Friendship.objects.create(user=friendship.friend, friend=friendship.user, status='accepted')
    elif action == 'reject':
        friendship.status = 'rejected'
        friendship.save()

    return Response(FriendshipSerializer(friendship).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request, pk):
    """Remove friend"""
    try:
        friendship = Friendship.objects.get(pk=pk, user=request.user)
        # Delete both directions
        Friendship.objects.filter(user=friendship.friend, friend=request.user).delete()
        friendship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Friendship.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
```

### Task 4: Update URLs

```python
urlpatterns = [
    path('', views.friend_list, name='friend_list'),
    path('requests/', views.friend_requests, name='friend_requests'),
    path('send/', views.send_friend_request, name='send_friend_request'),
    path('respond/<int:pk>/', views.respond_friend_request, name='respond_request'),
    path('remove/<int:pk>/', views.remove_friend, name='remove_friend'),
]
```

**Commits:**

1. "Add status to Friendship model"
2. "Create friend request endpoints"
3. "Update friendsService"

---

## Week 5: Friend Requests UI

### Task 1: Update friendsService.js

Add the new methods:

```javascript
getFriendRequests: async () => {
  return await apiClient.get('/friends/requests/');
},

acceptRequest: async (requestId) => {
  return await apiClient.post(`/friends/respond/${requestId}/`, { action: 'accept' });
},

rejectRequest: async (requestId) => {
  return await apiClient.post(`/friends/respond/${requestId}/`, { action: 'reject' });
}
```

### Task 2: Add Tabs to Friends Page

- Friends tab (accepted)
- Requests tab (pending)

### Task 3: Test Full Flow

1. User A sends request to User B
2. User B sees request in "Requests" tab
3. User B accepts
4. Both see each other in "Friends" tab

**Commits:**

1. "Add friend request UI"
2. "Test friend request flow"
3. "Polish and bug fixes"
