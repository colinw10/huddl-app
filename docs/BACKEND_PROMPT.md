# Backend Development Prompt

I need help building a Django REST API backend for my social media app called Huddl. I have the frontend completely built in React, and now I need the backend to match the frontend's requirements.

## Project Context

**Frontend Tech Stack:**

- React 19.2.0 + Vite 7.2.2
- React Router 7.9.6
- Running on http://localhost:5173

**Backend Current State:**

- Django + Django REST Framework installed
- SQLite database (db.sqlite3)
- 4 Django apps created but empty:
  - `api` (authentication endpoints)
  - `users` (user profiles)
  - `posts` (posts CRUD)
  - `friends` (friend requests & friendships)

**Apps installed in settings.py:**

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # DRF installed
    'users',
    'posts',
    'friends',
    'api',
]
```

---

## What the Frontend Expects

### Post Types

The frontend categorizes posts into 3 types displayed in a "river timeline" layout:

1. **Thoughts** - Text-only posts (max 500 chars)
2. **Media** - Photo/video posts with captions
3. **Milestones** - Achievement posts (highlighted with special styling)

### Data Models Needed

**User Model:**

- Built-in Django User extended with custom fields
- Fields: bio, avatar (URL), location, website, created_at
- Relationships: friends (many-to-many), posts (one-to-many)

**Post Model:**

- Fields: author (FK to User), content (text), media_url (optional), type (thoughts/media/milestones), created_at, updated_at
- Relationships: likes (many-to-many with User)

**Friend Request Model:**

- Fields: from_user (FK), to_user (FK), status (pending/accepted/declined), created_at
- Prevent duplicate requests

**Friendship Model:**

- Simple many-to-many between users OR separate model with created_at timestamp

---

## API Endpoints Frontend Expects

### Authentication (`/api/auth/`)

- `POST /api/auth/signup/` - Register new user (username, email, password)
- `POST /api/auth/login/` - Login (email, password) → return auth token
- `POST /api/auth/logout/` - Logout (clear token)
- `GET /api/auth/me/` - Get current authenticated user info

### Posts (`/api/posts/`)

- `GET /api/posts/feed/` - Get all posts from user's friends (sorted newest first)
- `GET /api/posts/user/<user_id>/` - Get specific user's posts
- `POST /api/posts/` - Create new post
  - Body: `{ content, media_url?, type }`
  - Auto-set author to request.user
- `PUT /api/posts/<id>/` - Update post (only author can edit)
- `DELETE /api/posts/<id>/` - Delete post (only author can delete)
- `POST /api/posts/<id>/like/` - Like a post
- `DELETE /api/posts/<id>/like/` - Unlike a post

### Users (`/api/users/`)

- `GET /api/users/<id>/` - Get user profile (public info)
- `PUT /api/users/<id>/` - Update profile (only own profile)
- `POST /api/users/avatar/` - Upload avatar image

### Friends (`/api/friends/`)

- `GET /api/friends/` - Get current user's friend list
- `GET /api/friends/requests/` - Get pending friend requests
- `POST /api/friends/request/` - Send friend request
  - Body: `{ to_user_id }`
- `POST /api/friends/accept/<request_id>/` - Accept friend request
- `DELETE /api/friends/decline/<request_id>/` - Decline friend request
- `DELETE /api/friends/<friend_id>/` - Remove friend

---

## Frontend Data Structures

**Post Object Expected:**

```json
{
  "id": 1,
  "author": {
    "id": 2,
    "username": "sarah_chen",
    "avatar": "https://...",
    "name": "Sarah Chen"
  },
  "content": "Just finished an amazing workout!",
  "media_url": null,
  "type": "thoughts",
  "created_at": "2024-01-15T14:30:00Z",
  "likes": 24,
  "is_liked": false,
  "is_public": true
}
```

**User Object Expected:**

```json
{
  "id": 1,
  "username": "pablo_cordero",
  "email": "pablo@example.com",
  "bio": "UI/UX Designer",
  "avatar": "https://...",
  "location": "San Francisco",
  "website": "https://...",
  "created_at": "2024-01-01T00:00:00Z",
  "friends_count": 42,
  "posts_count": 156,
  "milestones_count": 8
}
```

---

## What I Need Help With

1. **Set up Django models** (User extension, Post, FriendRequest, Friendship)
2. **Create serializers** for all models (nested serializers for related data)
3. **Build all API endpoints** listed above
4. **Add authentication** (TokenAuthentication or JWT)
5. **Set up permissions** (IsAuthenticated, IsAuthorOrReadOnly, etc.)
6. **Configure CORS** to allow frontend (localhost:5173) to make requests
7. **Add pagination** to feed endpoint (10-20 posts per page)

---

## Constraints & Requirements

- Use **Token Authentication** (simple, works well with React)
- Return proper **HTTP status codes** (200, 201, 400, 401, 404)
- Add **validation** (email format, password strength, no duplicate friend requests)
- Handle **errors gracefully** with clear error messages
- Auto-set `author` field on post creation (don't trust client)
- Prevent users from liking their own posts
- Ensure users can't send friend requests to themselves

---

## Project Structure

```
backend/
├── api/          # Authentication endpoints
├── users/        # User profile CRUD
├── posts/        # Posts CRUD + likes
├── friends/      # Friend requests + friendships
└── huddl/        # Django project settings
```

Each app has:

- `models.py` - Database schema
- `serializers.py` - JSON conversion
- `views.py` - API endpoint logic
- `urls.py` - URL routing

---

## Example Frontend Usage

```javascript
// How frontend will call your API
const createPost = async (content, type) => {
  const response = await fetch("http://localhost:8000/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    },
    body: JSON.stringify({ content, type }),
  });
  return response.json();
};
```

---

Please help me build this backend step-by-step, starting with:

1. Models (with proper relationships)
2. Serializers (with nested data)
3. Views (with authentication & permissions)
4. URL routing
5. CORS configuration

Let me know if you need any clarification on the frontend requirements!
