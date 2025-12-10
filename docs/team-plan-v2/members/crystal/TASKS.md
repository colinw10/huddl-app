# Crystal - Friends System Tasks

> **Your Role:** Build the entire friends system! Backend models + API + Frontend service + context + wire up the Friends page.

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `backend/friends/models.py` | ❌ TODO | Create Friendship + FriendRequest models |
| `backend/friends/serializers.py` | ❌ TODO | Create serializers |
| `backend/friends/views.py` | ❌ TODO | Create API endpoints |
| `backend/friends/urls.py` | ❌ TODO | Set up URL routing |
| `backend/friends/admin.py` | ❌ TODO | Register models in admin |
| `frontend/src/services/friendsService.js` | ❌ TODO | API calls |
| `frontend/src/contexts/FriendsContext.jsx` | ❌ TODO | State management |
| `frontend/src/components/pages/Friends/Friends.jsx` | 🔵 UI ✅ / 🟣 Logic ❌ | Wire up handlers |

---

## Week 1: Backend Models

### Task 1: Create Models in `backend/friends/models.py`

```python
from django.db import models
from django.contrib.auth.models import User

class Friendship(models.Model):
    """Accepted friendship between two users"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends_of')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'friend']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} ↔ {self.friend.username}"


class FriendRequest(models.Model):
    """Pending friend request"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]
    
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['from_user', 'to_user']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.from_user.username} → {self.to_user.username} ({self.status})"
```

### Task 2: Run Migrations

```bash
cd backend
python manage.py makemigrations friends
python manage.py migrate
```

### Task 3: Register in Admin - `backend/friends/admin.py`

```python
from django.contrib import admin
from .models import Friendship, FriendRequest

@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ['user', 'friend', 'created_at']
    search_fields = ['user__username', 'friend__username']

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['from_user__username', 'to_user__username']
```

---

## Week 2: Backend API

### Task 1: Create Serializers - `backend/friends/serializers.py`

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Friendship, FriendRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class FriendshipSerializer(serializers.ModelSerializer):
    friend = UserSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ['id', 'friend', 'created_at']

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'status', 'created_at']
```

### Task 2: Create Views - `backend/friends/views.py`

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Friendship, FriendRequest
from .serializers import FriendshipSerializer, FriendRequestSerializer, UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friends(request):
    """Get all friends of current user"""
    friendships = Friendship.objects.filter(user=request.user)
    serializer = FriendshipSerializer(friendships, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pending_requests(request):
    """Get pending friend requests for current user"""
    requests = FriendRequest.objects.filter(to_user=request.user, status='pending')
    serializer = FriendRequestSerializer(requests, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_request(request):
    """Send a friend request"""
    to_user_id = request.data.get('to_user_id')
    try:
        to_user = User.objects.get(id=to_user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if to_user == request.user:
        return Response({'error': 'Cannot friend yourself'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if already friends or request exists
    if FriendRequest.objects.filter(from_user=request.user, to_user=to_user).exists():
        return Response({'error': 'Request already sent'}, status=status.HTTP_400_BAD_REQUEST)
    
    friend_request = FriendRequest.objects.create(from_user=request.user, to_user=to_user)
    serializer = FriendRequestSerializer(friend_request)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request, request_id):
    """Accept a friend request"""
    try:
        friend_request = FriendRequest.objects.get(id=request_id, to_user=request.user, status='pending')
    except FriendRequest.DoesNotExist:
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Create friendship both ways
    Friendship.objects.create(user=request.user, friend=friend_request.from_user)
    Friendship.objects.create(user=friend_request.from_user, friend=request.user)
    
    # Update request status
    friend_request.status = 'accepted'
    friend_request.save()
    
    return Response({'message': 'Friend request accepted'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_request(request, request_id):
    """Decline a friend request"""
    try:
        friend_request = FriendRequest.objects.get(id=request_id, to_user=request.user, status='pending')
    except FriendRequest.DoesNotExist:
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)
    
    friend_request.status = 'declined'
    friend_request.save()
    
    return Response({'message': 'Friend request declined'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request, friend_id):
    """Remove a friend"""
    try:
        friend = User.objects.get(id=friend_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Delete both directions
    Friendship.objects.filter(user=request.user, friend=friend).delete()
    Friendship.objects.filter(user=friend, friend=request.user).delete()
    
    return Response({'message': 'Friend removed'})
```

### Task 3: Create URLs - `backend/friends/urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_friends, name='friends-list'),
    path('requests/', views.get_pending_requests, name='friend-requests'),
    path('requests/send/', views.send_request, name='send-request'),
    path('requests/<int:request_id>/accept/', views.accept_request, name='accept-request'),
    path('requests/<int:request_id>/decline/', views.decline_request, name='decline-request'),
    path('<int:friend_id>/remove/', views.remove_friend, name='remove-friend'),
]
```

---

## Week 3: Frontend Service & Context

### Task 1: Implement `frontend/src/services/friendsService.js`

```javascript
const API_URL = 'http://localhost:8000/api/friends'\;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const friendsService = {
  getFriends: async () => {
    const response = await fetch(`${API_URL}/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch friends');
    return response.json();
  },

  getPendingRequests: async () => {
    const response = await fetch(`${API_URL}/requests/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch requests');
    return response.json();
  },

  sendRequest: async (toUserId) => {
    const response = await fetch(`${API_URL}/requests/send/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ to_user_id: toUserId }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to send request');
    }
    return response.json();
  },

  acceptRequest: async (requestId) => {
    const response = await fetch(`${API_URL}/requests/${requestId}/accept/`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to accept request');
    return response.json();
  },

  declineRequest: async (requestId) => {
    const response = await fetch(`${API_URL}/requests/${requestId}/decline/`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to decline request');
    return response.json();
  },

  removeFriend: async (friendId) => {
    const response = await fetch(`${API_URL}/${friendId}/remove/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to remove friend');
    return response.json();
  },
};

export default friendsService;
```

### Task 2: Implement `frontend/src/contexts/FriendsContext.jsx`

```javascript
import { createContext, useContext, useState, useCallback } from 'react';
import friendsService from '../services/friendsService';

const FriendsContext = createContext(null);

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFriends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [friendsData, requestsData] = await Promise.all([
        friendsService.getFriends(),
        friendsService.getPendingRequests(),
      ]);
      setFriends(friendsData);
      setPendingRequests(requestsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      await friendsService.acceptRequest(requestId);
      await loadFriends(); // Refresh data
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const declineRequest = async (requestId) => {
    try {
      await friendsService.declineRequest(requestId);
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeFriend = async (friendId) => {
    try {
      await friendsService.removeFriend(friendId);
      setFriends(prev => prev.filter(f => f.friend.id !== friendId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <FriendsContext.Provider value={{
      friends,
      pendingRequests,
      loading,
      error,
      loadFriends,
      acceptRequest,
      declineRequest,
      removeFriend,
    }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriends must be used within FriendsProvider');
  }
  return context;
}

export default FriendsContext;
```

---

## Week 4: Wire Up Friends Page

### Task 1: Open `frontend/src/components/pages/Friends/Friends.jsx`

Look for the TODO comments and make these changes:

1. **Uncomment the import:**
```javascript
import { useFriends } from '../../../contexts/FriendsContext';
```

2. **Replace the placeholder state with context:**
```javascript
const { 
  friends, 
  pendingRequests, 
  loadFriends, 
  acceptRequest, 
  declineRequest,
  removeFriend,
  loading,
  error 
} = useFriends();
```

3. **Remove the mock useState calls and useEffect mock data**

4. **Update the useEffect to call loadFriends:**
```javascript
useEffect(() => {
  loadFriends();
}, [loadFriends]);
```

5. **Update the handlers:**
```javascript
const handleAcceptRequest = async (requestId) => {
  const result = await acceptRequest(requestId);
  if (!result.success) {
    alert(result.error);
  }
};

const handleDeclineRequest = async (requestId) => {
  const result = await declineRequest(requestId);
  if (!result.success) {
    alert(result.error);
  }
};

const handleRemoveFriend = async (friendId) => {
  const result = await removeFriend(friendId);
  if (!result.success) {
    alert(result.error);
  }
};
```

---

## Testing Checklist

- [ ] Models created and migrations run
- [ ] Can see models in Django admin
- [ ] API endpoints return correct data
- [ ] Friends list loads on page
- [ ] Can accept friend request
- [ ] Can decline friend request
- [ ] Can remove friend

---

## Commits to Make

1. "Create Friendship and FriendRequest models"
2. "Add friends API endpoints"  
3. "Implement friendsService.js"
4. "Implement FriendsContext"
5. "Wire up Friends page to context"
