# HUDDL Project Tree - Responsibility Matrix

> **Legend:**  
> 🔵 PABLO | 🟢 COLIN | 🟡 NATALIA | 🟣 CRYSTAL | 🟠 TITO  
> ✅ = Done | 🔧 = Placeholder (needs review) | ❌ = Not Started

```
huddl-app/
├── README.md                              🔵 PABLO ✅
├── BACKEND_README.md                      🔵 PABLO ✅
├── Makefile                               🔵 PABLO ✅
│
├── backend/
│   ├── manage.py                          ✅ (auto-generated)
│   ├── db.sqlite3                         ✅ (auto-generated)
│   │
│   ├── huddl/                             # Project settings
│   │   ├── settings.py                    🔵 PABLO ✅ (CORS configured)
│   │   ├── urls.py                        🔵 PABLO ✅
│   │   └── wsgi.py / asgi.py              ✅ (auto-generated)
│   │
│   ├── posts/                             # Posts app - COLIN
│   │   ├── models.py                      🟢 COLIN ✅
│   │   ├── serializers.py                 🟢 COLIN 🔧 (placeholder - review)
│   │   ├── urls.py                        🟢 COLIN 🔧 (placeholder - review)
│   │   ├── views.py                       🟢 COLIN 🔧 (placeholder - review)
│   │   ├── admin.py                       🟢 COLIN ❌
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   ├── users/                             # Users/Auth app - NATALIA
│   │   ├── models.py                      🟡 NATALIA ✅
│   │   ├── serializers.py                 🟡 NATALIA ✅
│   │   ├── urls.py                        🟡 NATALIA ✅
│   │   ├── views.py                       🟡 NATALIA ✅
│   │   ├── apps.py                        ✅ (auto-generated)
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   └── friends/                           # Friends app - CRYSTAL
│       ├── models.py                      🟣 CRYSTAL 🔧 (placeholder - review)
│       ├── serializers.py                 🟣 CRYSTAL 🔧 (placeholder - review)
│       ├── urls.py                        🟣 CRYSTAL 🔧 (placeholder - review)
│       ├── views.py                       🟣 CRYSTAL 🔧 (placeholder - review)
│       ├── admin.py                       🟣 CRYSTAL ❌
│       └── migrations/                    ✅ (auto-generated)
│
├── frontend/
│   ├── index.html                         🔵 PABLO ✅
│   ├── package.json                       🔵 PABLO ✅
│   ├── vite.config.js                     🔵 PABLO ✅
│   ├── eslint.config.js                   🔵 PABLO ✅
│   │
│   └── src/
│       ├── main.jsx                       🔵 PABLO ✅
│       ├── App.jsx                        🔵 PABLO ✅
│       ├── index.css                      🔵 PABLO ✅
│       │
│       ├── styles/                        # Design System [ALL PABLO ✅]
│       │   ├── main.scss                  🔵 PABLO ✅
│       │   ├── _variables.scss            🔵 PABLO ✅
│       │   ├── _theme.scss                🔵 PABLO ✅
│       │   ├── _mixins.scss               🔵 PABLO ✅
│       │   ├── _reset.scss                🔵 PABLO ✅
│       │   ├── _typography.scss           🔵 PABLO ✅
│       │   ├── _layout.scss               🔵 PABLO ✅
│       │   ├── _buttons.scss              🔵 PABLO ✅
│       │   ├── _cards.scss                🔵 PABLO ✅
│       │   ├── _glass.scss                🔵 PABLO ✅
│       │   ├── _blobs.scss                🔵 PABLO ✅
│       │   ├── _animations.scss           🔵 PABLO ✅
│       │   ├── _utilities.scss            🔵 PABLO ✅
│       │   └── _light-mode.scss           🔵 PABLO ✅
│       │
│       ├── services/                      # API Layer
│       │   ├── apiClient.js               🟠 TITO 🔧 (placeholder - review)
│       │   ├── postsService.js            🟢 COLIN 🔧 (placeholder - review)
│       │   ├── friendsService.js          🟣 CRYSTAL 🔧 (placeholder - review)
│       │   └── README.md                  🔵 PABLO ✅
│       │
│       ├── contexts/                      # State Management
│       │   ├── index.js                   🔵 PABLO ✅
│       │   ├── ThemeContext.jsx           🔵 PABLO ✅
│       │   ├── MessageContext.jsx         🔵 PABLO ✅
│       │   ├── AuthContext.jsx            🟡 NATALIA 🔧 (placeholder - review)
│       │   ├── PostsContext.jsx           🟢 COLIN 🔧 (placeholder - review)
│       │   └── FriendsContext.jsx         🟣 CRYSTAL 🔧 (placeholder - review)
│       │
│       ├── utils/                         # Helpers
│       │   └── README.md                  🔵 PABLO ✅
│       │
│       ├── components/
│       │   │
│       │   ├── layout/                    # Layout [ALL PABLO ✅]
│       │   │   ├── Shell/                 🔵 PABLO ✅
│       │   │   ├── TopBar/                🔵 PABLO ✅
│       │   │   ├── SideNav/               🔵 PABLO ✅
│       │   │   └── BottomNav/             🔵 PABLO ✅
│       │   │
│       │   ├── ui/                        # Shared UI Components
│       │   │   ├── ThemeToggle/           🔵 PABLO ✅
│       │   │   └── ProtectedRoute.jsx     🔵 PABLO ✅
│       │   │
│       │   └── pages/
│       │       ├── Landing/               🔵 PABLO ✅
│       │       │   ├── Landing.jsx        🔵 PABLO ✅
│       │       │   └── Landing.scss       🔵 PABLO ✅
│       │       │
│       │       ├── Login/                 
│       │       │   ├── Login.jsx          🔵 PABLO ✅
│       │       │   └── Login.scss         🔵 PABLO ✅
│       │       │
│       │       ├── Signup/                
│       │       │   ├── Signup.jsx         🔵 PABLO ✅
│       │       │   └── Signup.scss        🔵 PABLO ✅
│       │       │
│       │       ├── Home/                  
│       │       │   ├── Home.jsx           🔵 PABLO ✅
│       │       │   └── Home.scss          🔵 PABLO ✅
│       │       │
│       │       ├── Profile/               
│       │       │   ├── Profile.jsx        �� PABLO ✅
│       │       │   └── Profile.scss       🔵 PABLO ✅
│       │       │
│       │       ├── Friends/               
│       │       │   ├── Friends.jsx        🔵 PABLO ✅
│       │       │   └── Friends.scss       🔵 PABLO ✅
│       │       │
│       │       ├── About/                 
│       │       │   ├── About.jsx          🔵 PABLO ✅
│       │       │   └── About.scss         🔵 PABLO ✅
│       │       │
│       │       └── NotFound/              
│       │           ├── NotFound.jsx       🔵 PABLO ✅
│       │           └── NotFound.scss      🔵 PABLO ✅
│
└── docs/                                  🔵 PABLO ✅
    ├── huddl-app-summary.md               🔵 PABLO ✅
    ├── features/                          🔵 PABLO ✅
    ├── stretch-goals/                     🔵 PABLO ✅
    └── team-plan-v2/                      🔵 PABLO ✅
```

---

## Summary by Person

### 🔵 Pablo (UI Architect) - ~60% ✅

**COMPLETE:**
- All CSS/SCSS styling across the entire project
- All page component structure (JSX layout)
- Design system (`styles/` folder)
- Layout components (Shell, TopBar, SideNav, BottomNav)
- Theme system and animations
- Documentation and project coordination
- ProtectedRoute component
- Main app structure (App.jsx, main.jsx)
- Backend configuration (settings.py, urls.py)

### 🟢 Colin (Posts) - ~20% 🔧

**HAS PLACEHOLDERS - NEEDS REVIEW:**
- `backend/posts/serializers.py` - PostSerializer with reply_count
- `backend/posts/views.py` - PostViewSet with CRUD + replies endpoint
- `backend/posts/urls.py` - Router setup
- `frontend/src/services/postsService.js` - API calls
- `frontend/src/contexts/PostsContext.jsx` - State management

**TODO:**
- [ ] Review placeholder code, ensure it works
- [ ] Add admin.py for Posts
- [ ] Test endpoints manually

### 🟡 Natalia (Auth & Users) - ~10% 🔧

**COMPLETE (from scaffold):**
- `backend/users/` - models, serializers, views, urls (email login, JWT)

**HAS PLACEHOLDERS - NEEDS REVIEW:**
- `frontend/src/contexts/AuthContext.jsx` - Login, signup, logout

**TODO:**
- [ ] Review AuthContext placeholder
- [ ] Test login/signup flow end-to-end

### 🟣 Crystal (Friends System) - ~10% 🔧

**HAS PLACEHOLDERS - NEEDS REVIEW:**
- `backend/friends/models.py` - Friendship + FriendRequest models
- `backend/friends/serializers.py` - Serializers
- `backend/friends/views.py` - All friend endpoints
- `backend/friends/urls.py` - URL routing
- `frontend/src/services/friendsService.js` - API calls
- `frontend/src/contexts/FriendsContext.jsx` - State management

**TODO:**
- [ ] Review all placeholder files
- [ ] Run migrations for friends app
- [ ] Add admin.py for Friends
- [ ] Test friend request flow

### 🟠 Tito (Infrastructure) - ~5% 🔧

**HAS PLACEHOLDERS - NEEDS REVIEW:**
- `frontend/src/services/apiClient.js` - Axios with interceptors + token refresh

**TODO:**
- [ ] Review apiClient placeholder
- [ ] Verify CORS working
- [ ] Test token refresh flow

---

## Quick Start Commands

```bash
# Backend
cd backend
python manage.py migrate
python manage.py runserver

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

## What "Placeholder" Means

Files marked as 🔧 have:
- Complete code structure
- TODO comments explaining what the code does
- HINT comments with the actual implementation
- The implementation IS already filled in (just needs testing)

Your job is to:
1. Review the code to understand it
2. Test that it works
3. Mark off the TODOs in your task list
