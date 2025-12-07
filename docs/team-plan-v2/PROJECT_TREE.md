# HUDDL Project Tree - Responsibility Matrix

> **Legend:**  
> 🔵 PABLO | 🟢 COLIN | 🟡 NATALIA | 🟣 CRYSTAL | 🟠 TITO  
> ✅ = Done | 📝 = Has TODO placeholder | 🔧 = In Progress

```
huddl-app/
├── README.md                              🔵 PABLO ✅
├── BACKEND_SETUP.md                       🔵 PABLO ✅
│
├── backend/
│   ├── manage.py                          ✅ (auto-generated)
│   │
│   ├── huddl/                             # Project settings
│   │   ├── settings.py                    🟠 TITO 📝 (add CORS)
│   │   ├── urls.py                        🔵 PABLO ✅
│   │   └── wsgi.py / asgi.py              ✅ (auto-generated)
│   │
│   ├── posts/                             # Posts app - COLIN
│   │   ├── models.py                      🟢 COLIN 📝
│   │   ├── serializers.py                 🟢 COLIN 📝
│   │   ├── urls.py                        🟢 COLIN 📝
│   │   ├── views.py                       🟢 COLIN 📝
│   │   ├── admin.py                       🟢 COLIN ✅
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   ├── users/                             # Users/Auth app - NATALIA
│   │   ├── models.py                      🟡 NATALIA ✅
│   │   ├── serializers.py                 🟡 NATALIA 📝
│   │   ├── urls.py                        🟡 NATALIA 📝
│   │   ├── views.py                       🟡 NATALIA 📝
│   │   ├── admin.py                       🟡 NATALIA ✅
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   └── friends/                           # Friends app - CRYSTAL
│       ├── models.py                      🟣 CRYSTAL 📝
│       ├── serializers.py                 🟣 CRYSTAL 📝
│       ├── urls.py                        🟣 CRYSTAL 📝
│       ├── views.py                       🟣 CRYSTAL 📝
│       ├── admin.py                       🟣 CRYSTAL ✅
│       └── migrations/                    ✅ (auto-generated)
│
├── frontend/
│   ├── index.html                         🔵 PABLO ✅
│   ├── package.json                       🔵 PABLO ✅
│   ├── vite.config.js                     🔵 PABLO ✅
│   │
│   └── src/
│       ├── main.jsx                       🔵 PABLO ✅
│       ├── App.jsx                        🔵 PABLO ✅
│       │
│       ├── styles/                        # Design System [ALL PABLO ✅]
│       │   ├── _variables.scss            🔵 PABLO ✅
│       │   ├── _mixins.scss               🔵 PABLO ✅
│       │   ├── _utilities.scss            🔵 PABLO ✅
│       │   ├── _buttons.scss              🔵 PABLO ✅
│       │   ├── _cards.scss                🔵 PABLO ✅
│       │   ├── _animations.scss           🔵 PABLO ✅
│       │   ├── _blobs.scss                🔵 PABLO ✅
│       │   ├── _light-mode.scss           🔵 PABLO ✅
│       │   └── main.scss                  🔵 PABLO ✅
│       │
│       ├── services/                      # API Layer
│       │   ├── apiClient.js               🟠 TITO 📝
│       │   ├── postsService.js            🟢 COLIN 📝
│       │   └── friendsService.js          🟣 CRYSTAL 📝
│       │
│       ├── contexts/                      # State Management
│       │   ├── index.js                   🔵 PABLO ✅
│       │   ├── ThemeContext.jsx           🔵 PABLO ✅
│       │   ├── AuthContext.jsx            🟡 NATALIA 📝
│       │   ├── PostsContext.jsx           🟢 COLIN 📝
│       │   ├── FriendsContext.jsx         🟣 CRYSTAL 📝
│       │   └── MessageContext.jsx         🟠 TITO 📝
│       │
│       ├── components/
│       │   │
│       │   ├── layout/                    # Layout [ALL PABLO ✅]
│       │   │   ├── Shell/                 🔵 PABLO ✅
│       │   │   ├── TopBar/                🔵 PABLO ✅
│       │   │   ├── SideNav/               🔵 PABLO ✅
│       │   │   └── BottomNav/             🔵 PABLO ✅
│       │   │
│       │   ├── ui/                        # UI Components [ALL PABLO ✅]
│       │   │   ├── ThemeToggle/           🔵 PABLO ✅
│       │   │   └── ProtectedRoute.jsx     🔵 PABLO ✅
│       │   │
│       │   └── pages/
│       │       ├── Landing/               🔵 PABLO ✅
│       │       │
│       │       ├── Login/
│       │       │   ├── Login.jsx          🟡 NATALIA 📝 (wire up auth)
│       │       │   └── Login.scss         🔵 PABLO ✅
│       │       │
│       │       ├── Signup/
│       │       │   ├── Signup.jsx         🟡 NATALIA 📝 (wire up auth)
│       │       │   └── Signup.scss        🔵 PABLO ✅
│       │       │
│       │       ├── Home/
│       │       │   ├── Home.jsx           🟢 COLIN 📝 (wire up posts)
│       │       │   ├── Home.scss          🔵 PABLO ✅
│       │       │   └── components/        🔵 PABLO ✅
│       │       │       ├── TimelineRiverFeed/
│       │       │       └── TimelineRiverRow/
│       │       │
│       │       ├── Profile/
│       │       │   ├── Profile.jsx        🟣 CRYSTAL 📝 (wire up profile)
│       │       │   ├── Profile.scss       🔵 PABLO ✅
│       │       │   └── components/        🔵 PABLO ✅
│       │       │       ├── ProfileCard/
│       │       │       └── TimelineRiver/
│       │       │
│       │       └── Friends/
│       │           ├── Friends.jsx        🟣 CRYSTAL 📝 (wire up friends)
│       │           └── Friends.scss       🔵 PABLO ✅
│
└── docs/                                  🔵 PABLO ✅
    ├── team-plan-v2/                      # This folder
    ├── features/                          # Feature documentation
    └── refactoring/                       # Technical debt tracking
```

---

## Summary by Person

### 🔵 Pablo (UI Architect) - DONE ✅

- **All SCSS styling** across the entire project
- **All component structure** (JSX layout)
- **Design system** (variables, mixins, utilities)
- **Layout components** (Shell, TopBar, SideNav, BottomNav)
- **ThemeContext** for dark/light mode
- **Documentation** and project coordination

### 🟢 Colin (Posts) - 📝 TODO

Backend:

- `posts/models.py` - Uncomment Post model fields
- `posts/serializers.py` - Implement PostSerializer
- `posts/views.py` - Implement PostViewSet
- `posts/urls.py` - Register routes

Frontend:

- `postsService.js` - Implement API calls
- `PostsContext.jsx` - Implement state management
- `Home.jsx` - Wire up to PostsContext

### 🟡 Natalia (Auth) - 📝 TODO

Backend:

- `users/serializers.py` - Implement serializers
- `users/views.py` - Implement signup/me endpoints
- `users/urls.py` - Register routes

Frontend:

- `AuthContext.jsx` - Implement auth state
- `Login.jsx` - Wire up login form
- `Signup.jsx` - Wire up signup form

### 🟣 Crystal (Friends) - 📝 TODO

Backend:

- `friends/models.py` - Uncomment Friendship model
- `friends/serializers.py` - Implement serializers
- `friends/views.py` - Implement FriendViewSet
- `friends/urls.py` - Register routes

Frontend:

- `friendsService.js` - Implement API calls
- `FriendsContext.jsx` - Implement state management
- `Friends.jsx` - Wire up friends list
- `Profile.jsx` - Wire up profile page

### 🟠 Tito (Infrastructure) - 📝 TODO

Backend:

- `huddl/settings.py` - Add CORS configuration

Frontend:

- `apiClient.js` - Implement Axios with auth
- `MessageContext.jsx` - Implement messaging (stretch)
