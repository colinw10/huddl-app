# Services Layer

**Owner:** Colin (Backend + API Integration Lead)  
**Status:** EMPTY - needs implementation

## Purpose
Create service files that communicate with the Django backend API. Each service should export functions that make HTTP requests.

## Required Files

### 1. `api.js` - Base API Configuration
**Owner:** Colin  
**TODO:**
- Set up axios or fetch configuration
- Add base URL (http://localhost:8000/api/)
- Add request interceptors (add auth token to headers)
- Add response interceptors (handle errors globally)
- Export configured axios instance

### 2. `authService.js` - Authentication
**Owner:** Colin + Natalia  
**TODO:**
- `login(email, password)` - POST /api/auth/login/
- `signup(username, email, password)` - POST /api/auth/signup/
- `logout()` - Clear token from localStorage
- `getCurrentUser()` - GET /api/auth/me/
- `saveToken(token)` - Save to localStorage
- `getToken()` - Get from localStorage
- `isAuthenticated()` - Check if token exists

### 3. `postService.js` - Posts CRUD
**Owner:** Tito  
**TODO:**
- `getFeed()` - GET /api/posts/feed/ (all friends' posts)
- `getUserPosts(userId)` - GET /api/posts/user/{id}/
- `createPost(content, mediaUrl)` - POST /api/posts/
- `updatePost(postId, content)` - PUT /api/posts/{id}/
- `deletePost(postId)` - DELETE /api/posts/{id}/
- `likePost(postId)` - POST /api/posts/{id}/like/
- `unlikePost(postId)` - DELETE /api/posts/{id}/like/

### 4. `friendService.js` - Friends
**Owner:** Crystal  
**TODO:**
- `getFriends()` - GET /api/friends/
- `getFriendRequests()` - GET /api/friends/requests/
- `sendFriendRequest(userId)` - POST /api/friends/request/
- `acceptFriendRequest(requestId)` - POST /api/friends/accept/{id}/
- `declineFriendRequest(requestId)` - DELETE /api/friends/decline/{id}/
- `removeFriend(friendId)` - DELETE /api/friends/{id}/

### 5. `userService.js` - User Profile
**Owner:** Tito  
**TODO:**
- `getProfile(userId)` - GET /api/users/{id}/
- `updateProfile(userId, data)` - PUT /api/users/{id}/
- `uploadAvatar(file)` - POST /api/users/avatar/

## Usage Example

```javascript
// In a component
import { postService } from '../services/postService';

const fetchPosts = async () => {
  try {
    const posts = await postService.getFeed();
    setPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
```

## Important Rules
- **DO NOT modify UI components when adding services**
- All services should use async/await
- Handle errors consistently
- Return data directly (unwrap response.data)
- Add JSDoc comments to all functions
