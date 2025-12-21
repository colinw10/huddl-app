This file contains templates for creating the 6 team plan markdown files in the team-plan/ folder.

markdown# NUMENEON TEAM REBUILD - Part 5: Team Plan Files

## HOW TO USE THESE FILES

This is Part 5 of 5. Read these files in order:

1. `01-CONTEXT-AND-STRATEGY.md` - Background, strategy, assignments
2. `02-PSEUDOCODE-EXAMPLES.md` - All 11 example templates
3. `03-BACKEND-INSTRUCTIONS.md` - Backend pseudocode tasks
4. `04-FRONTEND-INSTRUCTIONS.md` - Frontend pseudocode tasks
5. `05-TEAM-PLAN-FILES.md` ← YOU ARE HERE

---

## CREATE: `team-plan/` FOLDER

Create a folder called `team-plan/` in the project root with these 6 files:

1. `natalia.md`
2. `colin.md`
3. `crystal.md`
4. `pablo.md`
5. `tito.md`
6. `team-structure.md`

---

## FILE 1: `team-plan/natalia.md`

````markdown
# Natalia's Tasks (Size: L)

## Your Mission

You're building the authentication system - the foundation that lets users create accounts, log in, and access protected features. Without auth, nobody can use NUMENEON! You're also the team's migration manager, keeping the database healthy as everyone builds their models.

## Files You Own

**Important:** Don't touch anyone else's files to avoid merge conflicts!

### Backend Files (11 total)

| File                                                    | Description                           |
| ------------------------------------------------------- | ------------------------------------- |
| `backend/users/models.py`                               | Profile model (extends Django User)   |
| `backend/users/views.py`                                | Signup, login, current user endpoints |
| `backend/users/serializers.py`                          | User data validation and formatting   |
| `backend/users/urls.py`                                 | Auth API route configuration          |
| `backend/users/apps.py`                                 | Django app config                     |
| `backend/users/__init__.py`                             | Package marker                        |
| `backend/users/management/__init__.py`                  | Management package                    |
| `backend/users/management/commands/__init__.py`         | Commands package                      |
| `backend/users/management/commands/create_test_user.py` | Test user script                      |
| `backend/users/migrations/__init__.py`                  | Migrations package                    |
| `backend/users/migrations/0001_initial.py`              | Initial migration (auto-generated)    |

### Frontend Files (8 total)

| File                                               | Description                              |
| -------------------------------------------------- | ---------------------------------------- |
| `frontend/src/contexts/AuthContext.jsx`            | Auth state (user, login, logout, signup) |
| `frontend/src/components/pages/Login/Login.jsx`    | Login form                               |
| `frontend/src/components/pages/Login/Login.scss`   | Login styling                            |
| `frontend/src/components/pages/Login/index.js`     | Export                                   |
| `frontend/src/components/pages/Signup/Signup.jsx`  | Registration form                        |
| `frontend/src/components/pages/Signup/Signup.scss` | Signup styling                           |
| `frontend/src/components/pages/Signup/index.js`    | Export                                   |
| `frontend/src/components/ui/ProtectedRoute.jsx`    | Route guard                              |

### Special Responsibility: Migration Manager

You review and run ALL database migrations for the team.

---

## Task Breakdown

### ✅ Task 1: Create Profile Model

**Files:** `backend/users/models.py`

**What:** Define database structure for user profiles extending Django's built-in User.

**Why:** Users need profile pictures and bios beyond basic auth info.

**Acceptance Criteria:**

- [ ] Profile model with OneToOneField to User
- [ ] profile_picture field (ImageField, optional)
- [ ] bio field (TextField, optional)
- [ ] created_at timestamp
- [ ] Model visible in Django admin

**Think about:**

- When a User is created, should a Profile auto-create? (Signals)
- What happens if profile_picture is empty?

---

### ✅ Task 2: Build Auth API Views

**Files:** `backend/users/views.py`, `backend/users/serializers.py`

**What:** Create signup, login, and current user endpoints.

**Why:** Frontend needs to authenticate users and get their data.

**Acceptance Criteria:**

- [ ] POST /api/auth/signup/ creates user + profile, returns JWT
- [ ] POST /api/auth/login/ validates credentials, returns JWT
- [ ] GET /api/auth/me/ returns current user data (requires auth)
- [ ] Proper error responses (400, 401)
- [ ] Passwords never returned in responses

**Think about:**

- How do you generate JWT tokens? (rest_framework_simplejwt)
- What data should /me/ return? (User + nested Profile)

---

### ✅ Task 3: Configure Auth Routes

**Files:** `backend/users/urls.py`, `backend/huddl/urls.py` (add your line)

**What:** Map URLs to your view functions.

**Why:** Frontend needs to know where to send requests.

**Acceptance Criteria:**

- [ ] /api/auth/signup/ route works
- [ ] /api/auth/login/ route works
- [ ] /api/auth/me/ route works
- [ ] /api/auth/token/refresh/ route works (from simplejwt)
- [ ] Routes included in main urls.py

---

### ✅ Task 4: Create AuthContext

**Files:** `frontend/src/contexts/AuthContext.jsx`

**What:** React context managing user auth state.

**Why:** Many components need to know if user is logged in.

**Acceptance Criteria:**

- [ ] Provides `user` state (object or null)
- [ ] Provides `loading` state
- [ ] Provides `error` state
- [ ] `login(credentials)` function works
- [ ] `signup(userData)` function works
- [ ] `logout()` clears token and user
- [ ] On mount, checks for existing token
- [ ] JWT stored in localStorage
- [ ] Custom `useAuth()` hook exported

**Think about:**

- What if token exists but is expired?
- When should loading be true?

---

### ✅ Task 5: Build Login & Signup Pages

**Files:** Login/, Signup/ folders (JSX, SCSS, index.js)

**What:** User-facing forms for authentication.

**Why:** Users need a way to sign in and create accounts.

**Acceptance Criteria:**

- [ ] Login form with username/password fields
- [ ] Signup form with username/email/password/confirm fields
- [ ] Forms call AuthContext functions on submit
- [ ] Redirect to /home on success
- [ ] Display errors clearly
- [ ] Uses Pablo's design system (glass-card, variables)
- [ ] Mobile responsive

**Think about:**

- How do you prevent page refresh on submit?
- What if passwords don't match on signup?

---

### ✅ Task 6: Create ProtectedRoute

**Files:** `frontend/src/components/ui/ProtectedRoute.jsx`

**What:** Component that redirects unauthenticated users.

**Why:** Some pages (Home, Profile) require login.

**Acceptance Criteria:**

- [ ] Checks AuthContext for user
- [ ] If loading, shows loading state
- [ ] If no user, redirects to /login
- [ ] If user exists, renders children

---

## Migration Manager Duties

### Your Workflow:

1. **Your migrations:** `python manage.py makemigrations users`
2. **Review Colin's:** Check `backend/posts/migrations/` files
3. **Review Crystal's:** Check `backend/friends/migrations/` files
4. **Run all:** `python manage.py migrate`

### When to Run:

- After any model changes (yours or teammates')
- Before testing/demos
- When someone reports database errors

### Helpful Commands:

```bash
python manage.py showmigrations      # See status
python manage.py makemigrations      # Create migrations
python manage.py migrate             # Apply migrations
python manage.py migrate --fake app 0001  # Mark as done without running
```

---

## Integration Points

**You Provide:**

- AuthContext → Used by everyone
- User model → Colin/Crystal reference via ForeignKey
- Login/Signup pages → App routing uses these
- ProtectedRoute → Wraps authenticated pages

**You Consume:**

- Pablo's design system → For Login/Signup styling
- Tito's apiClient.js → For making API calls

**Work Closely With:**

- **Tito:** apiClient must handle JWT tokens correctly
- **Colin & Crystal:** Their models have ForeignKey to User
- **Pablo:** Ensure auth UI matches design system
````

---

## FILE 2: `team-plan/colin.md`

```markdown
# Colin's Tasks (Size: M)

## Your Mission

You're building the posts system - the core content that users create and view. Posts are what make NUMENEON a social app! Your backend serves the data, your context manages it, and Pablo's UI displays it.

## Files You Own

### Backend Files (7 total)

| File                           | Description                               |
| ------------------------------ | ----------------------------------------- |
| `backend/posts/models.py`      | Post model (type, content, image, parent) |
| `backend/posts/views.py`       | Posts CRUD ViewSet                        |
| `backend/posts/serializers.py` | Post data formatting                      |
| `backend/posts/urls.py`        | Posts API routes                          |
| `backend/posts/apps.py`        | Django app config                         |
| `backend/posts/__init__.py`    | Package marker                            |
| `backend/posts/admin.py`       | Admin registration                        |

### Frontend Files (2 total)

| File                                     | Description            |
| ---------------------------------------- | ---------------------- |
| `frontend/src/contexts/PostsContext.jsx` | Posts state management |
| `frontend/src/services/postsService.js`  | Posts API calls        |

---

## Task Breakdown

### ✅ Task 1: Create Post Model

**Files:** `backend/posts/models.py`

**What:** Define database structure for posts.

**Why:** Posts are the main content - thoughts, media, milestones.

**Acceptance Criteria:**

- [ ] author field (ForeignKey to User)
- [ ] type field (choices: 'thought', 'media', 'milestone')
- [ ] content field (TextField, can be blank)
- [ ] image field (ImageField, optional)
- [ ] parent field (ForeignKey to self, for replies)
- [ ] created_at timestamp (auto)
- [ ] likes_count field (IntegerField, default=0)
- [ ] comments_count field (IntegerField, default=0)
- [ ] shares_count field (IntegerField, default=0)
- [ ] Ordered by newest first

**IMPORTANT:** Engagement fields are REQUIRED for Pablo's ProfileCard analytics!
The wave chart and heatmap use these metrics to visualize user activity.

**Think about:**

- What happens when a user is deleted? (CASCADE)
- What happens when parent post is deleted?

---

### ✅ Task 2: Build Posts ViewSet

**Files:** `backend/posts/views.py`, `backend/posts/serializers.py`

**What:** Create full CRUD API for posts.

**Why:** Frontend needs to create, read, update, delete posts.

**Acceptance Criteria:**

- [ ] GET /api/posts/ lists all posts
- [ ] POST /api/posts/ creates post (authenticated)
- [ ] GET /api/posts/:id/ gets single post
- [ ] PATCH /api/posts/:id/ updates post (author only)
- [ ] DELETE /api/posts/:id/ deletes post (author only)
- [ ] GET /api/posts/:id/replies/ gets replies
- [ ] Author auto-set from request.user
- [ ] Nested author data in response (id, username, profile_picture)
- [ ] Include engagement fields in response (likes_count, comments_count, shares_count)

**Think about:**

- How do you auto-set author? (perform_create)
- How do you restrict edit/delete to author only?

---

### ✅ Task 3: Configure Posts Routes

**Files:** `backend/posts/urls.py`, `backend/huddl/urls.py` (add your line)

**What:** Set up URL routing with DRF router.

**Why:** Router auto-generates CRUD URLs from ViewSet.

**Acceptance Criteria:**

- [ ] Router registered with PostViewSet
- [ ] Routes included in main urls.py at /api/posts/

---

### ✅ Task 4: Create PostsContext

**Files:** `frontend/src/contexts/PostsContext.jsx`

**What:** React context managing posts state.

**Why:** Multiple components need access to posts data.

**Acceptance Criteria:**

- [ ] `posts` state (array)
- [ ] `loading` state
- [ ] `error` state
- [ ] `fetchPosts()` gets all posts
- [ ] `createPost(data)` creates and adds to state
- [ ] `updatePost(id, data)` updates in state
- [ ] `deletePost(id)` removes from state
- [ ] Custom `usePosts()` hook exported
- [ ] Posts sorted newest first
- [ ] Post objects include engagement fields (likes_count, comments_count, shares_count)

**NOTE:** Pablo's ProfileCard.jsx consumes posts for analytics visualizations.
Posts must include engagement fields for the wave chart and heatmap to work!

**Think about:**

- Fetch on mount or let components trigger?
- After create, refetch all or just add to array?

---

### ✅ Task 5: Create Posts Service

**Files:** `frontend/src/services/postsService.js`

**What:** Functions that make API calls for posts.

**Why:** Separates API logic from state management.

**Acceptance Criteria:**

- [ ] `getPosts()` fetches all
- [ ] `getPost(id)` fetches one
- [ ] `createPost(data)` creates new
- [ ] `updatePost(id, data)` updates
- [ ] `deletePost(id)` deletes
- [ ] `getReplies(postId)` fetches replies
- [ ] Uses Tito's apiClient
- [ ] Handles FormData for image uploads

---

## Integration Points

**You Provide:**

- PostsContext → Pablo's Home, Profile, ComposerModal use it
- Posts API → Returns data Pablo's UI expects
- Post format with nested author data

**You Consume:**

- Natalia's User model → ForeignKey reference
- Tito's apiClient → For HTTP requests

**Work Closely With:**

- **Pablo:** Ensure post data format matches his components
- **Natalia:** Your Post.author references her User model
```

---

## FILE 3: `team-plan/crystal.md`

```markdown
# Crystal's Tasks (Size: M)

## Your Mission

You're building the friends system - the social connections between users. Friend requests, accepting/declining, viewing friends list. This makes NUMENEON truly social!

## Files You Own

### Backend Files (7 total)

| File                             | Description                       |
| -------------------------------- | --------------------------------- |
| `backend/friends/models.py`      | Friendship + FriendRequest models |
| `backend/friends/views.py`       | Friends API views                 |
| `backend/friends/serializers.py` | Friends data formatting           |
| `backend/friends/urls.py`        | Friends API routes                |
| `backend/friends/apps.py`        | Django app config                 |
| `backend/friends/__init__.py`    | Package marker                    |
| `backend/friends/admin.py`       | Admin registration                |

### Frontend Files (5 total)

| File                                                 | Description              |
| ---------------------------------------------------- | ------------------------ |
| `frontend/src/contexts/FriendsContext.jsx`           | Friends state management |
| `frontend/src/services/friendsService.js`            | Friends API calls        |
| `frontend/src/components/pages/Friends/Friends.jsx`  | Friends page UI          |
| `frontend/src/components/pages/Friends/Friends.scss` | Friends styling          |
| `frontend/src/components/pages/Friends/index.js`     | Export                   |

---

## Task Breakdown

### ✅ Task 1: Create Friends Models

**Files:** `backend/friends/models.py`

**What:** Define Friendship and FriendRequest database structures.

**Why:** Need to track who is friends with whom, and pending requests.

**Acceptance Criteria:**

- [ ] Friendship model with user1, user2 fields
- [ ] FriendRequest model with from_user, to_user, status
- [ ] Status choices: pending, accepted, declined
- [ ] created_at timestamps
- [ ] Prevent duplicate friendships (unique_together)
- [ ] Prevent self-friendship

**Think about:**

- Friendship is symmetric: Alice-Bob = Bob-Alice
- How do you query "all friends of user X"?

---

### ✅ Task 2: Build Friends Views

**Files:** `backend/friends/views.py`, `backend/friends/serializers.py`

**What:** Create API endpoints for friend operations.

**Why:** Frontend needs to manage friendships.

**Acceptance Criteria:**

- [ ] GET /api/friends/ lists current user's friends
- [ ] GET /api/friends/requests/ lists pending requests
- [ ] POST /api/friends/request/:user_id/ sends request
- [ ] POST /api/friends/accept/:request_id/ accepts
- [ ] POST /api/friends/decline/:request_id/ declines
- [ ] DELETE /api/friends/remove/:user_id/ unfriends
- [ ] All require authentication
- [ ] Proper error handling

**Think about:**

- What if already friends? (Error)
- What if request already sent? (Error)
- When accepting, create Friendship and update request

---

### ✅ Task 3: Configure Friends Routes

**Files:** `backend/friends/urls.py`, `backend/huddl/urls.py` (add your line)

**What:** Map URLs to view functions.

**Acceptance Criteria:**

- [ ] All friend endpoints routed
- [ ] Routes included in main urls.py at /api/friends/

---

### ✅ Task 4: Create FriendsContext

**Files:** `frontend/src/contexts/FriendsContext.jsx`

**What:** React context managing friends state.

**Acceptance Criteria:**

- [ ] `friends` state (array of users)
- [ ] `requests` state (array of requests)
- [ ] `loading` and `error` states
- [ ] `fetchFriends()` and `fetchRequests()`
- [ ] `sendRequest(userId)`
- [ ] `acceptRequest(requestId)`
- [ ] `declineRequest(requestId)`
- [ ] `removeFriend(userId)`
- [ ] Custom `useFriends()` hook

---

### ✅ Task 5: Create Friends Service

**Files:** `frontend/src/services/friendsService.js`

**What:** Functions for friends API calls.

**Acceptance Criteria:**

- [ ] All CRUD functions for friends/requests
- [ ] Uses Tito's apiClient

---

### ✅ Task 6: Build Friends Page

**Files:** `Friends.jsx`, `Friends.scss`, `index.js`

**What:** UI for viewing friends and handling requests.

**Why:** Users need to see and manage their friendships.

**Acceptance Criteria:**

- [ ] Shows list of friends
- [ ] Shows pending requests with accept/decline buttons
- [ ] Remove friend button (with confirmation)
- [ ] Empty states for no friends/no requests
- [ ] Uses Pablo's design system
- [ ] Mobile responsive

---

## Integration Points

**You Provide:**

- FriendsContext → Friends.jsx consumes it
- Friends API → Manages social connections
- Friends page → Part of app navigation

**You Consume:**

- Natalia's User model → ForeignKey references
- Tito's apiClient → For HTTP requests
- Pablo's design system → For styling

**Work Closely With:**

- **Natalia:** Your models reference User
- **Pablo:** Ensure Friends page matches design system
```

---

## FILE 4: `team-plan/pablo.md`

````markdown
# Pablo's Tasks (Size: XL)

## Your Mission

You've already built the complete UI architecture for NUMENEON - all 75+ component and styling files. Your role now is integration support: documenting data requirements, reviewing teammate implementations, and debugging when things don't connect.

## Your UI (Pre-Built - DO NOT REBUILD)

### What You Built:

- **Layout:** TopBar, SideNav, MessageModal, App routing
- **Home:** TimelineRiverFeed, TimelineRiverRow, MediaLightbox, DeleteConfirmModal
- **Profile:** ProfileCard (with flip animation), ComposerModal, TimelineRiver
- **Pages:** Landing, About, NotFound
- **Design System:** 13 SCSS files (variables, mixins, animations, themes)
- **Contexts:** MessageContext

**Total: ~75 files** - These stay 100% intact.

---

## Your Responsibilities

### ✅ Task 1: Document Data Requirements

**What:** Add USAGE comment blocks to your components.

**Why:** Team needs to know what data format you expect.

**Acceptance Criteria:**

- [ ] Every major JSX component has USAGE comment
- [ ] Comments specify which context is consumed
- [ ] Comments show expected data format
- [ ] Comments explain integration points
- [ ] All marked "DO NOT MODIFY"

---

### ✅ Task 2: Define API Contracts

**What:** Document exact JSON structures your components expect.

**Why:** Backend team needs specs to build correct APIs.

**Key Formats to Document:**

**Post Object (REQUIRED for ProfileCard analytics):**

```json
{
  "id": 1,
  "author": {
    "id": 5,
    "username": "alice",
    "profile_picture": "/media/pics/alice.jpg"
  },
  "type": "thought",
  "content": "Hello world",
  "image": null,
  "parent": null,
  "created_at": "2024-12-19T10:30:00Z",
  "likes_count": 42,
  "comments_count": 7,
  "shares_count": 3
}
```

**CRITICAL:** ProfileCard.jsx uses engagement fields for analytics:

- `likes_count`, `comments_count`, `shares_count` → Wave chart engagement totals
- `created_at` → Heatmap posting frequency calendar
- `type` → Post type breakdown donut chart

**User Object:**

```json
{
  "id": 1,
  "username": "alice",
  "email": "alice@example.com",
  "profile": {
    "profile_picture": "/media/pics/alice.jpg",
    "bio": "Hello!"
  }
}
```

---

### ✅ Task 3: Review Context Implementations

**What:** Code review teammates' contexts as they build.

**Why:** Ensure data flows correctly to your components.

**Review Checklist:**

- [ ] PostsContext provides correct post format
- [ ] AuthContext provides correct user format
- [ ] FriendsContext provides correct friends format
- [ ] All contexts handle loading/error states
- [ ] Custom hooks work correctly

---

### ✅ Task 4: Integration Debugging

**What:** Help teammates when their code doesn't connect to your UI.

**Common Issues:**

- Date format mismatches (ISO string vs Date object)
- Missing nested fields (author: 5 vs author: {...})
- Null handling (component crashes on null image)
- Type mismatches (string "5" vs number 5)

**Debugging Tools:**

- Browser Console for errors
- Network tab for API responses
- React DevTools for state inspection

---

## What You DON'T Do

- ❌ Rebuild any components
- ❌ Add pseudocode to your files
- ❌ Strip implementation
- ❌ Modify styling/animations
- ❌ Change design system files

---

## ⚠️ Placeholder Components (Team Awareness)

### Engagement Ring (ProfileCardFront.jsx)

**Status:** PLACEHOLDER - decorative animation only

**Location:** `frontend/src/components/pages/Profile/ProfileCardFront.jsx` (lines 78-101)

**What it does now:**

- SVG ring around profile avatar that fills to ~12.5% on page load
- CSS animation only - no real data backing it

**Future Implementation Options (see `docs/stretch-goals/EngagementRing.md`):**

1. Profile Completion % (easiest)
2. Weekly Activity Score
3. XP/Level System
4. Engagement Score

**Team Action:**

- Do NOT assume this shows real data
- Do NOT "fix" why it only fills partially
- When ready to implement, see stretch goal doc for full plan

---

## Integration Points

**You Provide:**

- Complete UI layer
- Design system (variables, mixins) for team to use
- Data format specifications
- MessageContext (already complete)

**You Consume:**

- PostsContext (Colin) → for Timeline components
- AuthContext (Natalia) → for TopBar, ProtectedRoute
- FriendsContext (Crystal) → if any component needs it
- ThemeContext (Tito) → for theme switching

**Work Closely With:**

- **Everyone** → You're the integration expert
````

---

## FILE 5: `team-plan/tito.md`

```markdown
# Tito's Tasks (Size: S)

## Your Mission

You're building the infrastructure layer - the foundation that everyone else depends on. The API client that handles authentication, the theme system, and the app's entry point. Small file count, but critical importance!

## Files You Own (6 total)

| File                                                      | Description             |
| --------------------------------------------------------- | ----------------------- |
| `frontend/src/main.jsx`                                   | React app entry point   |
| `frontend/src/services/apiClient.js`                      | Axios with JWT handling |
| `frontend/src/contexts/ThemeContext.jsx`                  | Light/dark theme state  |
| `frontend/src/components/ui/ThemeToggle/ThemeToggle.jsx`  | Theme switch button     |
| `frontend/src/components/ui/ThemeToggle/ThemeToggle.scss` | Button styling          |
| `frontend/src/components/ui/ThemeToggle/index.js`         | Export                  |

---

## Task Breakdown

### ✅ Task 1: Create API Client

**Files:** `frontend/src/services/apiClient.js`

**What:** Axios instance with JWT authentication handling.

**Why:** EVERY API call goes through this. Critical foundation.

**Acceptance Criteria:**

- [ ] Base URL: http://localhost:8000/api
- [ ] Request interceptor adds Authorization header
- [ ] Gets token from localStorage
- [ ] Response interceptor handles 401 errors
- [ ] Clears token on 401 (expired)
- [ ] Exports configured axios instance

**Think about:**

- What if no token exists? (Don't add header)
- What if token is expired? (401 response)

---

### ✅ Task 2: Create ThemeContext

**Files:** `frontend/src/contexts/ThemeContext.jsx`

**What:** Manages light/dark theme state.

**Why:** NUMENEON supports both themes.

**Acceptance Criteria:**

- [ ] `theme` state ('light' | 'dark')
- [ ] `toggleTheme()` function
- [ ] Persists to localStorage
- [ ] Applies class to document.body
- [ ] Loads saved preference on mount
- [ ] Custom `useTheme()` hook

**How theming works:**

- Dark mode: default (no class)
- Light mode: add 'light-mode' class to body
- Pablo's CSS handles the rest

---

### ✅ Task 3: Create ThemeToggle

**Files:** `ThemeToggle.jsx`, `ThemeToggle.scss`, `index.js`

**What:** Button to switch themes.

**Acceptance Criteria:**

- [ ] Shows current theme icon (sun/moon)
- [ ] Calls toggleTheme() on click
- [ ] Accessible (proper button, aria-label)
- [ ] Styled with Pablo's design system

---

### ✅ Task 4: Set Up main.jsx

**Files:** `frontend/src/main.jsx`

**What:** App entry point with provider nesting.

**Acceptance Criteria:**

- [ ] Imports React, ReactDOM
- [ ] Imports global styles
- [ ] Wraps App with BrowserRouter
- [ ] Nests all context providers
- [ ] Mounts to #root

**Provider Order (outer to inner):**

1. BrowserRouter
2. ThemeProvider
3. AuthProvider
4. PostsProvider
5. FriendsProvider
6. MessageProvider
7. App

---

## Integration Points

**You Provide:**

- apiClient → Used by ALL services (posts, friends, auth)
- ThemeContext → Used by ThemeToggle, affects entire app
- main.jsx → Bootstraps everything

**You Consume:**

- Pablo's design system → For ThemeToggle styling
- All contexts → You wire them together in main.jsx

**Work Closely With:**

- **Natalia:** Her AuthContext depends on apiClient for API calls
- **Colin:** His postsService depends on apiClient
- **Crystal:** Her friendsService depends on apiClient
- **Everyone:** You're the glue that connects everything
```

---

## FILE 6: `team-plan/team-structure.md`

```markdown
# NUMENEON Project Structure & Ownership

## Team Overview

| Person  | Size | Focus Area                  |
| ------- | ---- | --------------------------- |
| Pablo   | XL   | UI Architecture (pre-built) |
| Natalia | L    | Auth + Migration Management |
| Colin   | M    | Posts System                |
| Crystal | M    | Friends System              |
| Tito    | S    | Infrastructure              |

---

## File Ownership Map

### Backend
```

backend/
├── manage.py [SHARED]
├── db.sqlite3 [SHARED]
├── seed_posts.py [SHARED]
│
├── huddl/ [SHARED CONFIG]
│ ├── settings.py (pre-configured)
│ ├── urls.py [COLLABORATIVE]
│ └── ...
│
├── users/ [NATALIA]
│ ├── models.py ← Build this
│ ├── views.py ← Build this
│ ├── serializers.py ← Build this
│ ├── urls.py ← Build this
│ └── migrations/ ← Manage all team migrations
│
├── posts/ [COLIN]
│ ├── models.py ← Build this
│ ├── views.py ← Build this
│ ├── serializers.py ← Build this
│ ├── urls.py ← Build this
│ └── ...
│
└── friends/ [CRYSTAL]
├── models.py ← Build this
├── views.py ← Build this
├── serializers.py ← Build this
├── urls.py ← Build this
└── ...

```

### Frontend
```

frontend/src/
├── main.jsx [TITO]
├── App.jsx [PABLO - intact]
│
├── contexts/
│ ├── index.js [COLLABORATIVE]
│ ├── AuthContext.jsx [NATALIA]
│ ├── PostsContext.jsx [COLIN]
│ ├── FriendsContext.jsx [CRYSTAL]
│ ├── ThemeContext.jsx [TITO]
│ └── MessageContext.jsx [PABLO - intact]
│
├── services/
│ ├── apiClient.js [TITO]
│ ├── postsService.js [COLIN]
│ └── friendsService.js [CRYSTAL]
│
├── components/
│ ├── layout/ [PABLO - intact]
│ ├── pages/
│ │ ├── Home/ [PABLO - intact]
│ │ ├── Profile/ [PABLO - intact]
│ │ ├── Login/ [NATALIA]
│ │ ├── Signup/ [NATALIA]
│ │ ├── Friends/ [CRYSTAL]
│ │ ├── About/ [PABLO - intact]
│ │ ├── Landing/ [PABLO - intact]
│ │ └── NotFound/ [PABLO - intact]
│ └── ui/
│ ├── ProtectedRoute.jsx [NATALIA]
│ └── ThemeToggle/ [TITO]
│
└── styles/ [PABLO - DO NOT TOUCH]
└── (13 files)

```

---

## Data Flow Diagrams

### Posts Flow
```

Django Post Model [Colin]
↓
Post API ViewSet [Colin]
↓
postsService.js [Colin]
↓
PostsContext [Colin]
↓
usePosts() hook
↓
TimelineRiverFeed [Pablo]

```

### Auth Flow
```

Django User Model [Natalia]
↓
Auth API Views [Natalia]
↓
apiClient.js [Tito]
↓
AuthContext [Natalia]
↓
useAuth() hook
↓
Login/Signup/TopBar [Natalia/Pablo]

```

### Friends Flow
```

Django Friendship Model [Crystal]
↓
Friends API Views [Crystal]
↓
friendsService.js [Crystal]
↓
FriendsContext [Crystal]
↓
useFriends() hook
↓
Friends.jsx [Crystal]

File Counts
PersonBackendFrontendTotalPablo0~75~75 (pre-built)Natalia11819 (+migrations)Colin729Crystal7512Tito066Shared~10~17~27

Critical Rules

NO TWO PEOPLE work on the same file - prevents merge conflicts
Pablo's UI stays 100% intact - team builds the engine
Global styles are untouchable - everyone uses, nobody modifies
Collaborative files - each person adds exactly ONE thing

## API Response Formats

### Post Object (REQUIRED FORMAT - includes engagement metrics)

```json
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
  "created_at": "2024-12-19T10:30:00Z",
  "likes_count": 42,
  "comments_count": 7,
  "shares_count": 3
}
```

**⚠️ CRITICAL:** Engagement fields are REQUIRED for Pablo's ProfileCard analytics:

- `likes_count`, `comments_count`, `shares_count` → Used by wave chart
- `created_at` → Used by heatmap calendar
- `type` → Used by post type breakdown donut chart

### User Object

```json
{
  "id": 1,
  "username": "alice",
  "email": "alice@example.com",
  "profile": {
    "profile_picture": "/media/profile_pics/alice.jpg",
    "bio": "Cyberpunk enthusiast"
  }
}
```

### Friend Object (in list)

```json
"id": 2,
"username": "bob",
"profile_picture": null
}
Friend Request Object
json{
"id": 1,
"from_user": {
"id": 3,
"username": "charlie",
"profile_picture": "/media/profile_pics/charlie.jpg"
},
"created_at": "2024-12-19T09:00:00Z"
}

```

```

---

## SUMMARY: FILES TO CREATE

Create `team-plan/` folder with:

1. `natalia.md` - Auth system tasks
2. `colin.md` - Posts system tasks
3. `crystal.md` - Friends system tasks
4. `pablo.md` - Integration support tasks
5. `tito.md` - Infrastructure tasks
6. `team-structure.md` - Full ownership map

---

## FINAL CHECKLIST

After creating all 5 instruction files and 6 team plan files:

**For Copilot to execute:**

### On `team-shell-backend` branch:

- [ ] Delete `frontend/` folder
- [ ] Add pseudocode to all Natalia backend files (11)
- [ ] Add pseudocode to all Colin backend files (7)
- [ ] Add pseudocode to all Crystal backend files (7)
- [ ] Add TODO comments to collaborative urls.py

### On `team-shell-frontend` branch:

- [ ] Delete `backend/` folder
- [ ] Add pseudocode to Natalia frontend files (8)
- [ ] Add pseudocode to Colin frontend files (2)
- [ ] Add pseudocode to Crystal frontend files (5)
- [ ] Add pseudocode to Tito frontend files (6)
- [ ] Add TODO comments to collaborative contexts/index.js
- [ ] Add USAGE comments to Pablo's ~40 JSX files

### In project root (both branches):

- [ ] Create `team-plan/` folder with 6 markdown files

---

**END OF TEAM REBUILD DOCUMENTATION**

That's all 5 files! Here's the summary:
FileNameContent101-CONTEXT-AND-STRATEGY.mdBackground, strategy, assignments, pseudocode guidelines202-PSEUDOCODE-EXAMPLES.mdAll 11 example templates303-BACKEND-INSTRUCTIONS.mdFull pseudocode for all backend Python files404-FRONTEND-INSTRUCTIONS.mdFull pseudocode for frontend + usage comment instructions505-TEAM-PLAN-FILES.mdTemplates for all 6 team-plan markdown files
```
