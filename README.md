# HUDDL Team Project

**Due:** January 24, 2026  
**Branch:** `team-shell`

> **Note:** Hey, Equipo. These are suggested tasks and assignments. If anyone wants to swap roles, take on different work, or has ideas to improve the workflow, let's discuss it! I'm also willing to help anyone in any area if necessary, so... feel free.

---

## Quick Start

```bash
# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
# → http://localhost:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Team Roles

| Person      | Role                | Main Files                                                              |
| ----------- | ------------------- | ----------------------------------------------------------------------- |
| **Pablo**   | Architecture & Lead | `App.jsx`, `layout/`, `contexts/`, `apiClient.js`, theming, integration |
| **Colin**   | Home/Feed           | `pages/Home/`, `backend/posts/`                                         |
| **Natalia** | Auth & Landing      | `pages/Login/`, `pages/Signup/`, `pages/Landing/`, `backend/users/`     |
| **Crystal** | Profile & Friends   | `pages/Profile/`, `pages/Friends/`, `backend/friends/`                  |
| **Tito**    | Messaging & API     | `ui/MessageModal/`, `backend/api/` (messages, notifications)            |

---

## Week 1 Tasks (This Week)

| Person      | Task                                      | File to Create/Edit         |
| ----------- | ----------------------------------------- | --------------------------- |
| **Tito**    | CORS config (with Pablo)                  | `backend/huddl/settings.py` |
| **Pablo**   | JWT auth setup + help Tito                | `backend/huddl/settings.py` |
| **Colin**   | Register Post in admin + start serializer | `backend/posts/admin.py`    |
| **Natalia** | Register Profile in admin + auth views    | `backend/users/admin.py`    |
| **Crystal** | Create Friendship model                   | `backend/friends/models.py` |

**⚠️ Tito + Pablo go first!** Without CORS, frontend can't reach backend.

**Need help?** Slack Pablo — happy to pair on backend or frontend stuff.

---

## Current Project Tree

```
huddl-app/
├── backend/
│   ├── huddl/                          # Project config
│   │   ├── settings.py                 ← TITO + PABLO: CORS + JWT
│   │   └── urls.py                     ✓ Done
│   │
│   ├── api/                            # Core API - TITO
│   │   ├── models.py                   ← Message, Notification models
│   │   ├── serializers.py              ← MessageSerializer, NotificationSerializer
│   │   ├── views.py                    ← MessageViewSet, NotificationViewSet
│   │   └── urls.py                     ← /api/messages/, /api/notifications/
│   │
│   ├── posts/                          # Posts API - COLIN
│   │   ├── models.py                   ✓ Post model exists
│   │   ├── admin.py                    ← Register Post
│   │   ├── serializers.py              ← PostSerializer (with like_count, is_liked)
│   │   ├── views.py                    ← PostViewSet (feed, like, unlike)
│   │   └── urls.py                     ← /api/posts/ routes
│   │
│   ├── users/                          # Auth API - NATALIA
│   │   ├── models.py                   ✓ Profile model exists
│   │   ├── admin.py                    ← Register Profile
│   │   ├── serializers.py              ← UserSerializer, SignupSerializer, LoginSerializer
│   │   ├── views.py                    ← signup, login, current_user endpoints
│   │   └── urls.py                     ← /api/auth/ routes
│   │
│   └── friends/                        # Friends API - CRYSTAL
│       ├── models.py                   ← FriendRequest, Friendship models
│       ├── admin.py                    ← Register models
│       ├── serializers.py              ← FriendRequestSerializer, FriendSerializer
│       ├── views.py                    ← FriendViewSet (list, send_request, accept, decline)
│       └── urls.py                     ← /api/friends/ routes
│
└── frontend/src/
    ├── App.jsx                         ← PABLO: Router + Shell integration
    ├── main.jsx                        ✓ Entry point
    │
    ├── contexts/                       # Global State - PABLO
    │   ├── index.js                    ← Barrel export
    │   ├── ThemeContext.jsx            ← Dark/light mode toggle
    │   └── AuthContext.jsx             ← User auth state (with NATALIA)
    │
    ├── services/                       # API Layer
    │   └── apiClient.js                ← PABLO: Axios client with interceptors
    │
    ├── components/
    │   ├── layout/                     # Shell Layout - PABLO
    │   │   ├── Shell/                  ← Main layout wrapper
    │   │   ├── TopBar/                 ← Header with logo, search, user menu
    │   │   ├── SideNav/                ← Desktop sidebar navigation
    │   │   └── BottomNav/              ← Mobile bottom navigation
    │   │
    │   ├── ui/                         # Shared Components
    │   │   └── MessageModal/           ← TITO: Direct messaging modal
    │   │
    │   └── pages/
    │       ├── Home/                   # Feed Page - COLIN
    │       │   ├── Home.jsx            ← Main feed container
    │       │   ├── Home.scss           ← Feed styles
    │       │   ├── components/
    │       │   │   ├── TimelineRiverFeed.jsx  ← 3-column river layout
    │       │   │   └── TimelineRiverRow.jsx   ← Individual post display
    │       │   └── utils/
    │       │       └── groupPosts.js   ← Post clustering by time
    │       │
    │       ├── Profile/                # Profile Page - CRYSTAL
    │       │   ├── Profile.jsx         ← User profile container
    │       │   ├── Profile.scss        ← Profile styles
    │       │   └── components/
    │       │       └── ProfileCard/    ← Flip card component
    │       │
    │       ├── Friends/                # Friends Page - CRYSTAL
    │       │   ├── Friends.jsx         ← Friends list & requests
    │       │   └── Friends.scss        ← Friends styles
    │       │
    │       ├── Login/                  # Login Page - NATALIA
    │       │   ├── Login.jsx           ← Login form
    │       │   └── Login.scss          ← Login styles
    │       │
    │       ├── Signup/                 # Signup Page - NATALIA
    │       │   ├── Signup.jsx          ← Registration form
    │       │   └── Signup.scss         ← Signup styles
    │       │
    │       └── Landing/                # Landing Page - NATALIA
    │           ├── Landing.jsx         ← Hero, features, CTAs
    │           └── Landing.scss        ← Landing styles
```

**Legend:** ✓ Done | ← Assigned (placeholder ready)

---

## 5-Week Roadmap

| Week  | Focus             | Goal                                   |
| ----- | ----------------- | -------------------------------------- |
| **1** | Setup             | CORS, models in admin, project running |
| **2** | API               | Serializers, views, basic endpoints    |
| **3** | Frontend Services | apiClient, authService, connect forms  |
| **4** | Features          | Likes, comments, friend requests       |
| **5** | Polish            | Bug fixes, testing, final integration  |

---

## Documentation

- **Backend details:** See `BACKEND_README.md`
- **Frontend details:** See `FRONTEND_README.md`

---

## Branch Rules (Suggested)

1. Create feature branch from `team-shell`
2. Try to work on your assigned files to avoid conflicts
3. Push and create PR when ready
4. Let's coordinate on shared files to avoid merge conflicts
