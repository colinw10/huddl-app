# NUMENEON Study Plan

**Start:** January 6, 2026 | **Graduation:** January 24, 2026

---

## 📁 Project Tree

```
frontend/src/
├── main.jsx                          # App entry, wraps all providers
├── App.jsx                           # Routes + layout (TopBar, SideNav)
├── contexts/
│   ├── AuthContext.jsx               # Login/logout, JWT storage
│   ├── PostsContext.jsx              # Posts CRUD, calls postsService
│   ├── FriendsContext.jsx            # Friends state
│   ├── SearchContext.jsx             # Search modal state
│   └── MessageContext.jsx            # DM modal state
├── services/
│   ├── apiClient.js                  # Axios + JWT interceptors
│   ├── postsService.js               # Posts API calls
│   └── friendsService.js             # Friends API calls
└── components/
    ├── layout/
    │   ├── TopBar/                   # Header + search + notifications
    │   └── SideNav/                  # Left navigation
    └── pages/
        ├── Home/
        │   ├── Home.jsx              # Main feed page
        │   └── components/
        │       ├── TimelineRiverFeed/    # Groups posts by user+day
        │       └── TimelineRiverRow/     # One user's row
        │           └── components/
        │               ├── PostCard/     # Single post + actions ⭐
        │               ├── SmartDeck/    # Carousel navigation
        │               ├── ThreadView/   # Inline replies
        │               └── RepostModal/  # Share options
        └── Profile/
            ├── Profile.jsx           # /profile/:username page
            └── components/
                ├── ProfileCard/      # User info card
                ├── TimelineRiver/    # Profile's post display
                └── ComposerModal/    # Create new post

backend/
├── numeneon/
│   ├── settings.py                   # Django config, CORS, JWT
│   └── urls.py                       # Routes → /api/auth, /api/posts, /api/friends
├── users/
│   ├── views.py                      # signup(), login(), /me
│   └── urls.py                       # Auth endpoints
├── posts/
│   ├── models.py                     # Post, Like models
│   ├── views.py                      # PostViewSet (CRUD + like + share)
│   └── serializers.py                # JSON ↔ Model conversion
└── friends/
    ├── models.py                     # Friendship, FriendRequest
    └── views.py                      # Friend operations
```

---

## 🎯 Must-Know Files (18 total)

### Frontend (12 files)

| #   | File                    | Why It Matters                    |
| --- | ----------------------- | --------------------------------- |
| 1   | `main.jsx`              | Provider nesting order            |
| 2   | `App.jsx`               | Routes, layout logic              |
| 3   | `apiClient.js`          | JWT interceptors                  |
| 4   | `AuthContext.jsx`       | Login flow, token storage         |
| 5   | `PostsContext.jsx`      | Posts state + CRUD methods        |
| 6   | `postsService.js`       | API call patterns                 |
| 7   | `Home.jsx`              | Main feed, inline composer        |
| 8   | `TimelineRiverFeed.jsx` | Post grouping by user+day         |
| 9   | `TimelineRiverRow.jsx`  | Row orchestrator                  |
| 10  | `PostCard.jsx`          | **Actions: like, comment, share** |
| 11  | `Profile.jsx`           | Dynamic routing                   |
| 12  | `ComposerModal.jsx`     | Post creation                     |

### Backend (6 files)

| #   | File                   | Why It Matters             |
| --- | ---------------------- | -------------------------- |
| 13  | `settings.py`          | CORS, JWT, REST config     |
| 14  | `posts/models.py`      | Post fields, relationships |
| 15  | `posts/views.py`       | ViewSet + custom actions   |
| 16  | `posts/serializers.py` | JSON conversion            |
| 17  | `users/views.py`       | Auth endpoints             |
| 18  | `numeneon/urls.py`     | API route mapping          |

---

## 📅 Daily Schedule

### Week 1: Frontend

| Day | Files                              | Focus                  |
| --- | ---------------------------------- | ---------------------- |
| 1   | main.jsx, App.jsx, apiClient.js    | How app starts         |
| 2   | AuthContext, PostsContext          | State management       |
| 3   | postsService.js                    | API call patterns      |
| 4   | Home.jsx, TimelineRiverFeed        | Main feed              |
| 5   | TimelineRiverRow, **PostCard.jsx** | Post display + actions |
| 6   | Profile.jsx                        | Dynamic routes         |
| 7   | ComposerModal.jsx                  | Post creation          |

### Week 2: Backend + Review

| Day   | Files                       | Focus           |
| ----- | --------------------------- | --------------- |
| 8     | settings.py, urls.py        | Django config   |
| 9     | posts/models.py             | Database schema |
| 10    | posts/views.py, serializers | API endpoints   |
| 11    | users/views.py              | Auth flow       |
| 12-14 | Review                      | Practice flows  |

---

## 🔄 Core Flows to Know

### Flow 1: Creating a Post

```
User types in ComposerModal
  → handleSubmit()
  → PostsContext.createPost()
  → postsService.create()
  → apiClient.post('/posts/') ← JWT added automatically

Backend:
  → POST /api/posts/
  → PostViewSet.create()
  → Post.objects.create()
  → Returns JSON (201)

Frontend response:
  → PostsContext adds to state
  → UI re-renders
```

### Flow 2: Liking a Post

```
User clicks heart in PostCard
  → onLike(postId)
  → PostsContext.likePost()
  → postsService.like()
  → apiClient.post('/posts/{id}/like/')

Backend:
  → PostViewSet.like() [@action decorator]
  → Toggle Like in database
  → Returns updated post

Frontend:
  → Heart fills/unfills
  → Count updates
```

### Flow 3: User Login

```
User submits Login form
  → AuthContext.login(email, password)
  → apiClient.post('/auth/login/')

Backend:
  → Validates credentials
  → Returns { access, refresh } JWT tokens

Frontend:
  → Stores tokens in localStorage
  → Sets user state
  → Redirects to /home
```

---

## 🎤 Interview Cheat Sheet

### Opening Statement

> "NUMENEON is a cyberpunk-themed social media platform. Full-stack React + Django with JWT auth. I focused on clean separation - Context API for state, service layer for API calls, modular components."

### Key Decisions

**Why Context API over Redux?**

> "Six clear state domains with minimal overlap. Context provides what we need without Redux boilerplate."

**Why separate service layer?**

> "Keeps API logic out of components. If endpoints change, I update one file. Also makes testing easier."

**Why Vite?**

> "Faster dev server, native ES modules, built-in path aliases like @contexts and @services."

---

## ✅ Progress Checklist

- [ ] Day 1: Entry + Infrastructure
- [ ] Day 2: Auth + State
- [ ] Day 3: Services
- [ ] Day 4: Main Feed
- [ ] Day 5: Post Display + Actions
- [ ] Day 6: Profile
- [ ] Day 7: Composer
- [ ] Day 8-10: Backend
- [ ] Day 11-14: Review + Practice
