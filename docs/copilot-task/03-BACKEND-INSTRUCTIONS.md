This file contains specific instructions for adding pseudocode to all backend Python files.

markdown# NUMENEON TEAM REBUILD - Part 3: Backend Instructions

## HOW TO USE THESE FILES
This is Part 3 of 5. Read these files in order:
1. `01-CONTEXT-AND-STRATEGY.md` - Background, strategy, assignments
2. `02-PSEUDOCODE-EXAMPLES.md` - All 11 example templates
3. `03-BACKEND-INSTRUCTIONS.md` ← YOU ARE HERE
4. `04-FRONTEND-INSTRUCTIONS.md` - Frontend pseudocode tasks
5. `05-TEAM-PLAN-FILES.md` - Team markdown file templates

---

## BRANCH: `team-shell-backend`

Before starting:
1. Create branch `team-shell-backend` from main
2. Delete the entire `frontend/` folder
3. Keep `backend/` folder with all files
4. Apply pseudocode as instructed below

---

## BACKEND FILE LIST BY OWNER

### NATALIA - Users App (11 files)

| File | Action |
|------|--------|
| `backend/users/models.py` | Full pseudocode |
| `backend/users/views.py` | Full pseudocode |
| `backend/users/serializers.py` | Full pseudocode |
| `backend/users/urls.py` | Full pseudocode |
| `backend/users/apps.py` | Minimal pseudocode (just config) |
| `backend/users/__init__.py` | Empty with comment |
| `backend/users/management/__init__.py` | Empty with comment |
| `backend/users/management/commands/__init__.py` | Empty with comment |
| `backend/users/management/commands/create_test_user.py` | Full pseudocode |
| `backend/users/migrations/__init__.py` | Empty with comment |
| `backend/users/migrations/0001_initial.py` | Reference comment (auto-generated) |

---

### COLIN - Posts App (7 files)

| File | Action |
|------|--------|
| `backend/posts/models.py` | Full pseudocode |
| `backend/posts/views.py` | Full pseudocode |
| `backend/posts/serializers.py` | Full pseudocode |
| `backend/posts/urls.py` | Full pseudocode |
| `backend/posts/apps.py` | Minimal pseudocode |
| `backend/posts/__init__.py` | Empty with comment |
| `backend/posts/admin.py` | Minimal pseudocode |

---

### CRYSTAL - Friends App (7 files)

| File | Action |
|------|--------|
| `backend/friends/models.py` | Full pseudocode |
| `backend/friends/views.py` | Full pseudocode |
| `backend/friends/serializers.py` | Full pseudocode |
| `backend/friends/urls.py` | Full pseudocode |
| `backend/friends/apps.py` | Minimal pseudocode |
| `backend/friends/__init__.py` | Empty with comment |
| `backend/friends/admin.py` | Minimal pseudocode |

---

### COLLABORATIVE - Project URLs (1 file)

| File | Action |
|------|--------|
| `backend/huddl/urls.py` | TODO comments for each person |

---

## DETAILED PSEUDOCODE FOR EACH FILE

### NATALIA'S FILES

#### `backend/users/models.py`
```python
"""
TODO: Create the Profile model - extends Django's built-in User

NUMENEON needs to store extra info about users beyond username/email/password.
Django's built-in User model handles auth, but we need to add:
- Profile picture (for display in posts, TopBar, ProfileCard)
- Bio (for the profile page)

Two approaches exist:
1. Extend AbstractUser (replace Django's User entirely)
2. Create Profile model with OneToOneField to User (recommended - simpler)

We recommend approach #2: Create a Profile that links to User.

Fields you need:
- user: OneToOne link to Django's User model
- profile_picture: Image field (optional - users might not upload one)
- bio: Text field (optional - can be blank)
- created_at: When profile was created

Integration points:
- Posts reference User as author (Colin's Post.author field)
- Frontend ProfileCard displays profile_picture and bio
- TopBar shows current user's profile_picture
- Serializers need to combine User + Profile data

Think about:
- What happens when a new User is created? (Signal to auto-create Profile?)
- How do you handle image uploads? (Django's ImageField + media settings)
- Should bio have a max length? (Probably yes - prevents abuse)
- What if user has no profile_picture? (Frontend needs to handle null)

Hint: Use OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
Hint: For images: ImageField(upload_to='profile_pics/', blank=True, null=True)
Hint: Consider using Django signals to auto-create Profile when User is created
Hint: Add __str__ method to return username for admin readability
"""

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    # Your code here
    pass
```

#### `backend/users/views.py`
```python
"""
TODO: Create Authentication Views - signup, login, and current user endpoints

This file handles user registration, login, and fetching current user data.
Unlike Posts/Friends which use ViewSets, auth typically uses function-based views
or simple APIViews because the operations are unique (not standard CRUD).

Endpoints to create:
- POST /api/auth/signup/ - Create new user account
- POST /api/auth/login/ - Authenticate and return JWT tokens
- GET /api/auth/me/ - Get current logged-in user's data

For signup:
- Receive: { username, email, password }
- Validate: Username/email not taken, password meets requirements
- Create: User + Profile
- Return: JWT tokens + user data

For login:
- Receive: { username, password }
- Validate: Credentials are correct
- Return: JWT tokens + user data

For me:
- Require: Valid JWT token in Authorization header
- Return: Current user's data (id, username, email, profile)

Expected response format for user data:
{
  "id": 1,
  "username": "alice",
  "email": "alice@example.com",
  "profile": {
    "profile_picture": "url or null",
    "bio": "text or empty string"
  }
}

Think about:
- How do you hash passwords? (Django's User.objects.create_user() handles this)
- Where do JWT tokens come from? (rest_framework_simplejwt is configured in settings)
- How do you return tokens on signup/login? (Look up RefreshToken.for_user())
- For /me/, how do you get the current user? (request.user when authenticated)
- What errors should you return? (400 for validation, 401 for bad credentials)

Hint: Use @api_view(['POST']) decorator for function-based views
Hint: For JWT: from rest_framework_simplejwt.tokens import RefreshToken
Hint: Token generation: refresh = RefreshToken.for_user(user)
Hint: Use IsAuthenticated permission for /me/ endpoint
Hint: Use your serializers to validate input and format output
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, SignupSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    # Your code here
    pass

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    # Your code here
    pass

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    # Your code here
    pass
```

#### `backend/users/serializers.py`
```python
"""
TODO: Create User Serializers - validate and format user data

Serializers do two jobs:
1. Validate incoming data (signup form, login form)
2. Format outgoing data (user JSON for frontend)

Serializers you need:
- SignupSerializer: Validates signup form data, creates User + Profile
- LoginSerializer: Validates login credentials
- ProfileSerializer: Formats Profile data (profile_picture, bio)
- UserSerializer: Formats full user data including nested profile

For SignupSerializer:
- Fields: username, email, password, password_confirm
- Validation: passwords match, username unique, email unique
- Create method: creates User and Profile together

For UserSerializer (output):
- Include: id, username, email
- Nested: profile (ProfileSerializer)
- Read-only: Don't allow editing user via this serializer

Expected output format:
{
  "id": 1,
  "username": "alice",
  "email": "alice@example.com",
  "profile": {
    "profile_picture": "/media/profile_pics/alice.jpg",
    "bio": "Hello world!"
  }
}

Think about:
- How do you validate that passwords match? (validate() method)
- How do you check if username already exists? (validate_username() method)
- How do you nest ProfileSerializer inside UserSerializer?
- Should password be write_only? (YES - never return passwords!)
- How do you create both User and Profile in one serializer? (create() method)

Hint: Use serializers.Serializer for custom validation (Signup, Login)
Hint: Use serializers.ModelSerializer for model-based serializers (Profile, User)
Hint: For nested serializers: profile = ProfileSerializer(read_only=True)
Hint: For write_only fields: password = serializers.CharField(write_only=True)
Hint: Override create() method to handle User + Profile creation together
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    # Your code here
    pass

class UserSerializer(serializers.ModelSerializer):
    # Your code here - include nested ProfileSerializer
    pass

class SignupSerializer(serializers.Serializer):
    # Your code here - validate and create user
    pass

class LoginSerializer(serializers.Serializer):
    # Your code here - validate credentials
    pass
```

#### `backend/users/urls.py`
```python
"""
TODO: Configure URL routes for authentication endpoints

This file maps URLs to view functions.
These URLs will be included in the main urls.py under /api/auth/

Routes to create:
- POST /api/auth/signup/ → signup view
- POST /api/auth/login/ → login view
- GET /api/auth/me/ → current_user view
- POST /api/auth/token/refresh/ → JWT token refresh (from simplejwt)

The token refresh endpoint is provided by simplejwt library.

Think about:
- Do you use path() or include() here? (path() for each route)
- How do you import views from the same app? (from .views import ...)
- Should the trailing slash be included? (Yes, Django convention)

Hint: from django.urls import path
Hint: from rest_framework_simplejwt.views import TokenRefreshView
Hint: path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Your code here
]
```

#### `backend/users/apps.py`
```python
"""
TODO: Django app configuration for users app

This is minimal boilerplate. Just configure the app name.

Hint: Django generates most of this automatically
"""

from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    
    # Optional: Add ready() method if using signals for auto-creating profiles
```

#### `backend/users/__init__.py`
```python
# Users app package marker
# This file can be empty - it just tells Python this folder is a package
```

#### `backend/users/management/__init__.py`
```python
# Management commands package marker
# This file can be empty
```

#### `backend/users/management/commands/__init__.py`
```python
# Commands subpackage marker
# This file can be empty
```

#### `backend/users/management/commands/create_test_user.py`
```python
"""
TODO: Create management command to generate test user

This command creates a test user for development/demo purposes.
Run it with: python manage.py create_test_user

What it should do:
1. Create a User with known credentials (e.g., username: testuser, password: testpass123)
2. Create associated Profile
3. Print success message with credentials

This is useful for:
- Quick setup after fresh database
- Demo purposes
- Testing without manual signup

Think about:
- What if user already exists? (Check first, skip or update)
- Should password be hardcoded or accept as argument?
- What default profile data to set?

Hint: Inherit from BaseCommand
Hint: Use User.objects.create_user() for proper password hashing
Hint: Access Profile via user.profile (if using signals) or create manually
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import Profile

class Command(BaseCommand):
    help = 'Creates a test user for development'

    def handle(self, *args, **options):
        # Your code here
        pass
```

#### `backend/users/migrations/__init__.py`
```python
# Migrations package marker
# This file can be empty
```

#### `backend/users/migrations/0001_initial.py`
```python
"""
NOTE: This file is auto-generated by Django

When you run: python manage.py makemigrations users
Django will create this file based on your models.py

DO NOT write this manually - let Django generate it.

Natalia's responsibility:
1. Define models in models.py
2. Run: python manage.py makemigrations users
3. Review the generated migration
4. Run: python manage.py migrate

This placeholder shows what to expect, but Django creates the actual content.
"""

# Django will generate migration code here
```

---

### COLIN'S FILES

#### `backend/posts/models.py`
```python
"""
TODO: Create the Post model - core content type for NUMENEON

A post is the main content users create. NUMENEON has 3 post types:
- 'thought': Text-only posts (displayed in left column of Timeline River)
- 'media': Posts with images (displayed in center column)
- 'milestone': Achievement posts (displayed in right column)

Posts can also be replies to other posts, creating threaded conversations.

Fields you need:
- author: Who created it? (ForeignKey to User)
- type: What kind? (CharField with choices: 'thought', 'media', 'milestone')
- content: The text content (TextField, can be blank for media-only)
- image: Optional image (ImageField, only for media posts)
- parent: Reply to which post? (ForeignKey to self, null for top-level posts)
- created_at: When created? (DateTimeField, auto-set)

Integration points:
- PostsContext (Colin's frontend) fetches and manages these
- Pablo's TimelineRiverFeed displays posts grouped by author and date
- Pablo's TimelineRiverRow renders individual posts by type
- Each column of the Timeline River shows one post type

Expected JSON format (from serializer):
{
  "id": 1,
  "author": {
    "id": 5,
    "username": "alice",
    "profile_picture": "/media/profile_pics/alice.jpg"
  },
  "type": "thought",
  "content": "Hello NUMENEON!",
  "image": null,
  "parent": null,
  "created_at": "2024-12-19T10:30:00Z"
}

Think about:
- How do you restrict 'type' to only 3 values? (choices parameter)
- How do you make a post reply to another post? (ForeignKey to 'self')
- What happens when author is deleted? (CASCADE - delete their posts too)
- What happens when parent post is deleted? (CASCADE or SET_NULL?)
- Should content be required? (No - media posts might be image-only)
- How do you order posts? (Meta class with ordering = ['-created_at'])

Hint: POST_TYPE_CHOICES = [('thought', 'Thought'), ('media', 'Media'), ('milestone', 'Milestone')]
Hint: type = models.CharField(max_length=10, choices=POST_TYPE_CHOICES)
Hint: parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
Hint: created_at = models.DateTimeField(auto_now_add=True)
"""

from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    # Your code here
    pass
```

#### `backend/posts/views.py`
```python
"""
TODO: Create Posts API Views - full CRUD for posts

This ViewSet handles all post operations via REST API.
Use ModelViewSet for automatic CRUD operations.

Endpoints (automatic from ModelViewSet):
- GET /api/posts/ - List all posts
- POST /api/posts/ - Create new post
- GET /api/posts/:id/ - Get single post
- PUT /api/posts/:id/ - Full update
- PATCH /api/posts/:id/ - Partial update
- DELETE /api/posts/:id/ - Delete post

Custom endpoint needed:
- GET /api/posts/:id/replies/ - Get all replies to a post

Permissions:
- List/Retrieve: Allow any (or authenticated only - your choice)
- Create: Authenticated only (need to know who's posting)
- Update/Delete: Author only (can't edit others' posts)

For create:
- Automatically set author to request.user
- Don't let users specify author in request body

Expected response format: (see models.py for full format)

Think about:
- How do you auto-set author on create? (Override perform_create())
- How do you restrict update/delete to author only? (Custom permission class)
- For /replies/, how do you filter by parent? (@action decorator + queryset filter)
- Should posts be ordered newest first? (queryset ordering)
- How do you include nested author data? (Serializer handles this)

Hint: Use ModelViewSet for automatic CRUD
Hint: Override perform_create(self, serializer): serializer.save(author=self.request.user)
Hint: Use @action(detail=True, methods=['get']) for custom /replies/ endpoint
Hint: Filter replies: Post.objects.filter(parent=pk)
Hint: For author-only permissions, check obj.author == request.user
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    # Your code here
    pass
```

#### `backend/posts/serializers.py`
```python
"""
TODO: Create Post Serializer - formats post data for API responses

The serializer transforms Post model instances to JSON and validates incoming data.

Key requirement: Nested author data
- Don't just return author: 5 (the ID)
- Return author: { id: 5, username: "alice", profile_picture: "url" }
- Pablo's components expect this nested format!

For input (creating posts):
- Accept: type, content, image, parent
- Don't accept: author, created_at (these are auto-set)

For output (returning posts):
- Include: id, author (nested), type, content, image, parent, created_at
- Author should include: id, username, and profile.profile_picture

Think about:
- How do you nest author data? (Create AuthorSerializer, use it as field)
- How do you include profile_picture from related Profile model?
- Should author be read-only? (Yes - set automatically, not by user)
- How do you handle image field? (ImageField serializes to URL automatically)
- For parent field, should it return nested post or just ID? (Just ID is fine)

Hint: Create a simple AuthorSerializer for nested user data
Hint: In AuthorSerializer, add: profile_picture = serializers.ImageField(source='profile.profile_picture')
Hint: In PostSerializer: author = AuthorSerializer(read_only=True)
Hint: Make author read_only so users can't set it manually
"""

from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

class AuthorSerializer(serializers.ModelSerializer):
    # Nested serializer for author data
    # Include: id, username, profile_picture (from profile)
    # Your code here
    pass

class PostSerializer(serializers.ModelSerializer):
    # Your code here
    pass
```

#### `backend/posts/urls.py`
```python
"""
TODO: Configure URL routes for posts API

Use Django REST Framework's router for automatic URL generation.
Router creates all CRUD URLs from your ViewSet automatically.

Routes created by router:
- GET /api/posts/ - list
- POST /api/posts/ - create
- GET /api/posts/:id/ - retrieve
- PUT /api/posts/:id/ - update
- PATCH /api/posts/:id/ - partial_update
- DELETE /api/posts/:id/ - destroy

Plus your custom @action endpoints.

Think about:
- DefaultRouter vs SimpleRouter? (DefaultRouter adds API root view)
- How do you register a ViewSet with router?

Hint: from rest_framework.routers import DefaultRouter
Hint: router = DefaultRouter()
Hint: router.register(r'', PostViewSet, basename='post')
Hint: urlpatterns = router.urls
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

# Your code here
```

#### `backend/posts/apps.py`
```python
"""
TODO: Django app configuration for posts app

Minimal boilerplate - just configure the app name.
"""

from django.apps import AppConfig

class PostsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'posts'
```

#### `backend/posts/__init__.py`
```python
# Posts app package marker
# This file can be empty
```

#### `backend/posts/admin.py`
```python
"""
TODO: Register Post model with Django admin

This allows you to view/edit posts in Django's admin interface.
Useful for debugging and managing test data.

Optional enhancements:
- list_display: Show columns in list view
- list_filter: Filter by type, author
- search_fields: Search by content

Hint: from .models import Post
Hint: admin.site.register(Post)
Hint: Or use @admin.register(Post) decorator with ModelAdmin class
"""

from django.contrib import admin
from .models import Post

# Your code here
```

---

### CRYSTAL'S FILES

#### `backend/friends/models.py`
```python
"""
TODO: Create Friendship models - friend connections and requests

NUMENEON has a friends system with two models:
1. Friendship: Represents an accepted friendship between two users
2. FriendRequest: Represents a pending friend request

Friendship model:
- user1: First user in friendship (ForeignKey to User)
- user2: Second user in friendship (ForeignKey to User)
- created_at: When friendship was created

FriendRequest model:
- from_user: Who sent the request (ForeignKey to User)
- to_user: Who received it (ForeignKey to User)
- created_at: When request was sent
- status: pending, accepted, declined (CharField with choices)

Design decision: Friendship is symmetric
- If Alice and Bob are friends, there's ONE Friendship record
- Either user1=Alice, user2=Bob OR user1=Bob, user2=Alice
- When querying "Alice's friends", check both user1 and user2

Integration points:
- FriendsContext (Crystal's frontend) fetches and displays friends
- Friends.jsx shows friend list and pending requests
- TopBar might show friend request notifications

Think about:
- How do you prevent duplicate friendships? (unique_together or check in view)
- How do you prevent self-friendship? (validate user1 != user2)
- When request is accepted, create Friendship and delete/update request?
- How do you get all friends for a user? (Q objects: Q(user1=user) | Q(user2=user))

Hint: Use choices for status: STATUS_CHOICES = [('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')]
Hint: For unique together: class Meta: unique_together = ['user1', 'user2']
Hint: related_name helps with reverse lookups: related_name='friendships_as_user1'
"""

from django.db import models
from django.contrib.auth.models import User

class Friendship(models.Model):
    # Your code here
    pass

class FriendRequest(models.Model):
    # Your code here
    pass
```

#### `backend/friends/views.py`
```python
"""
TODO: Create Friends API Views - manage friendships and requests

Unlike Posts (CRUD on single model), friends has custom operations.
Consider using function-based views or APIView instead of ViewSet.

Endpoints to create:
- GET /api/friends/ - List current user's friends
- GET /api/friends/requests/ - List pending friend requests (received)
- POST /api/friends/request/:user_id/ - Send friend request to user
- POST /api/friends/accept/:request_id/ - Accept a friend request
- POST /api/friends/decline/:request_id/ - Decline a friend request
- DELETE /api/friends/remove/:user_id/ - Remove a friend

All endpoints require authentication (must be logged in).

Expected response for GET /api/friends/:
[
  {
    "id": 1,
    "username": "alice",
    "profile_picture": "/media/profile_pics/alice.jpg"
  },
  {
    "id": 2,
    "username": "bob",
    "profile_picture": null
  }
]

Think about:
- How do you find all friends for current user? (Q objects for both sides)
- When accepting request, do you create Friendship and delete request?
- What if user tries to friend themselves? (Return error)
- What if friend request already exists? (Return error or existing request)
- What if users are already friends? (Return error)
- For remove, do you delete Friendship where user is on either side?

Hint: from django.db.models import Q
Hint: Friendship.objects.filter(Q(user1=request.user) | Q(user2=request.user))
Hint: Use @api_view decorator for function-based views
Hint: Or create a ViewSet with custom @action methods
Hint: Return proper status codes: 201 Created, 400 Bad Request, 404 Not Found
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Friendship, FriendRequest
from .serializers import FriendshipSerializer, FriendRequestSerializer, UserFriendSerializer

# Your views here
```

#### `backend/friends/serializers.py`
```python
"""
TODO: Create Friends Serializers - format friendship data

You need serializers for:
1. UserFriendSerializer: Simple user data for friend lists (id, username, profile_picture)
2. FriendshipSerializer: Full friendship data (optional, for admin/debugging)
3. FriendRequestSerializer: Friend request data with from_user and to_user

For friend list (GET /api/friends/):
- Just return array of user objects, not Friendship objects
- Each user needs: id, username, profile_picture

For friend requests (GET /api/friends/requests/):
- Return: id (request id), from_user (nested), created_at
- from_user should include: id, username, profile_picture

Think about:
- UserFriendSerializer is similar to AuthorSerializer from posts
- How do you include profile_picture from Profile model?
- For FriendRequestSerializer, which user is nested? (from_user, since to_user is current user)

Hint: Reuse the pattern from PostSerializer's AuthorSerializer
Hint: profile_picture = serializers.ImageField(source='profile.profile_picture', read_only=True)
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Friendship, FriendRequest

class UserFriendSerializer(serializers.ModelSerializer):
    # Your code here
    pass

class FriendshipSerializer(serializers.ModelSerializer):
    # Your code here
    pass

class FriendRequestSerializer(serializers.ModelSerializer):
    # Your code here
    pass
```

#### `backend/friends/urls.py`
```python
"""
TODO: Configure URL routes for friends API

Map each endpoint to its view function.
These will be included in main urls.py under /api/friends/

Routes:
- GET /api/friends/ → friend_list view
- GET /api/friends/requests/ → friend_requests view
- POST /api/friends/request// → send_request view
- POST /api/friends/accept// → accept_request view
- POST /api/friends/decline// → decline_request view
- DELETE /api/friends/remove// → remove_friend view

Think about:
- Use  for URL parameters that are integers
- Each route maps to a view function

Hint: path('', views.friend_list, name='friend_list')
Hint: path('request//', views.send_request, name='send_request')
"""

from django.urls import path
from . import views

urlpatterns = [
    # Your code here
]
```

#### `backend/friends/apps.py`
```python
"""
TODO: Django app configuration for friends app

Minimal boilerplate.
"""

from django.apps import AppConfig

class FriendsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'friends'
```

#### `backend/friends/__init__.py`
```python
# Friends app package marker
# This file can be empty
```

#### `backend/friends/admin.py`
```python
"""
TODO: Register Friends models with Django admin

Register both Friendship and FriendRequest models.
Useful for debugging friend connections.

Hint: admin.site.register(Friendship)
Hint: admin.site.register(FriendRequest)
"""

from django.contrib import admin
from .models import Friendship, FriendRequest

# Your code here
```

---

### COLLABORATIVE FILE

#### `backend/huddl/urls.py`
```python
"""
TODO: Root URL configuration for NUMENEON backend

This file imports and includes all the app-specific URL patterns.
Each backend team member adds their app's URLs here.

COLLABORATIVE FILE - Each person adds ONE line:
- Natalia: Users/auth URLs at /api/auth/
- Colin: Posts URLs at /api/posts/
- Crystal: Friends URLs at /api/friends/

The admin URL is already configured.

Pattern: path('api/[prefix]/', include('[app].urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # TODO (Natalia): Add users/auth URLs
    # path('api/auth/', include('users.urls')),
    
    # TODO (Colin): Add posts URLs  
    # path('api/posts/', include('posts.urls')),
    
    # TODO (Crystal): Add friends URLs
    # path('api/friends/', include('friends.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

## SHARED FILES (DO NOT TOUCH)

These files are pre-configured and should not be modified:
- `backend/manage.py`
- `backend/db.sqlite3`
- `backend/seed_posts.py`
- `backend/huddl/__init__.py`
- `backend/huddl/settings.py`
- `backend/huddl/asgi.py`
- `backend/huddl/wsgi.py`

---

**NEXT:** Read `04-FRONTEND-INSTRUCTIONS.md` for frontend pseudocode tasks