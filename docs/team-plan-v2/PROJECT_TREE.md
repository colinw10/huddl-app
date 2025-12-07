# HUDDL Project Tree - Responsibility Matrix

> **Legend:**  
> 🔵 PABLO | 🟢 COLIN | 🟡 NATALIA | 🟣 CRYSTAL | 🟠 TITO  
> ✅ = Done | 🔧 = In Progress | ❌ = Not Started

```
huddl-app/
├── README.md                              🔵 PABLO ✅
├── BACKEND_SETUP.md                       🔵 PABLO ✅
│
├── backend/
│   ├── manage.py                          ✅ (auto-generated)
│   │
│   ├── huddl/                             # Project settings
│   │   ├── settings.py                    🟠 TITO 🔧 (needs CORS)
│   │   ├── urls.py                        🔵 PABLO ✅
│   │   └── wsgi.py / asgi.py              ✅ (auto-generated)
│   │
│   ├── api/                               # General API app
│   │   ├── models.py                      🟢 COLIN ❌
│   │   ├── serializers.py                 🟢 COLIN ❌
│   │   ├── urls.py                        🟠 TITO ❌
│   │   └── views.py                       🟢 COLIN ❌
│   │
│   ├── posts/                             # Posts app
│   │   ├── models.py                      🟢 COLIN ✅
│   │   ├── serializers.py                 🟢 COLIN ❌
│   │   ├── urls.py                        🟢 COLIN ❌
│   │   ├── views.py                       🟢 COLIN ❌
│   │   ├── admin.py                       🟢 COLIN ❌
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   ├── users/                             # Users/Auth app
│   │   ├── models.py                      🟡 NATALIA ✅
│   │   ├── serializers.py                 🟡 NATALIA ✅
│   │   ├── urls.py                        🟡 NATALIA ✅
│   │   ├── views.py                       🟡 NATALIA ✅
│   │   ├── admin.py                       🟡 NATALIA ❌
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   └── friends/                           # Friends app
│       ├── models.py                      🟣 CRYSTAL ❌
│       ├── serializers.py                 🟣 CRYSTAL ❌
│       ├── urls.py                        🟣 CRYSTAL ❌
│       ├── views.py                       🟣 CRYSTAL ❌
│       └── admin.py                       🟣 CRYSTAL ❌
│
├── frontend/
│   ├── index.html                         🔵 PABLO ✅
│   ├── package.json                       🔵 PABLO ✅
│   ├── vite.config.js                     🔵 PABLO ✅
│   │
│   └── src/
│       ├── main.jsx                       🔵 PABLO ✅
│       ├── App.jsx                        🔵 PABLO ✅
│       ├── index.css                      🔵 PABLO ✅
│       │
│       ├── styles/                        # Design System [ALL PABLO ✅]
│       │   ├── design-const.css           🔵 PABLO ✅
│       │   ├── utilities.css              🔵 PABLO ✅
│       │   ├── App.css                    🔵 PABLO ✅
│       │   ├── theme.css                  🔵 PABLO ✅
│       │   ├── Buttons.css                🔵 PABLO ✅
│       │   ├── Blobs.css                  🔵 PABLO ✅
│       │   └── Logo.css                   🔵 PABLO ✅
│       │
│       ├── services/                      # API Layer [NEEDS CREATION]
│       │   ├── apiClient.js               🟠 TITO ❌
│       │   ├── authService.js             🟡 NATALIA ❌
│       │   ├── postsService.js            🟠 TITO ❌
│       │   └── friendsService.js          🟣 CRYSTAL ❌
│       │
│       ├── utils/                         # Helpers [NEEDS CREATION]
│       │   ├── formatters.js              🟠 TITO ❌
│       │   └── validators.js              🟠 TITO ❌
│       │
│       ├── components/
│       │   │
│       │   ├── auth/                      # Auth Components [NEEDS CREATION]
│       │   │   └── ProtectedRoute.jsx     🟡 NATALIA ❌
│       │   │
│       │   ├── layout/                    # Layout [ALL PABLO ✅]
│       │   │   ├── TopBar/                🔵 PABLO ✅
│       │   │   ├── SideNav/               🔵 PABLO ✅
│       │   │   └── BottomNav/             🔵 PABLO ✅
│       │   │
│       │   └── pages/
│       │       ├── Landing/               🔵 PABLO ✅
│       │       │
│       │       ├── Login/
│       │       │   ├── Login.jsx          🔵 UI ✅ | 🟡 Logic ❌
│       │       │   └── Login.css          🔵 PABLO ✅
│       │       │
│       │       ├── Signup/
│       │       │   ├── Signup.jsx         🔵 UI ✅ | 🟡 Logic ❌
│       │       │   └── Signup.css         🔵 PABLO ✅
│       │       │
│       │       ├── Home/
│       │       │   ├── Home.jsx           🔵 UI ✅ | 🟢🟠 Logic ❌
│       │       │   ├── Home.css           🔵 PABLO ✅
│       │       │   ├── utils/groupPosts.js 🔵 PABLO ✅
│       │       │   └── components/        🔵 PABLO ✅
│       │       │       ├── TimelineRiverFeed.jsx
│       │       │       ├── TimelineRiverRow.jsx
│       │       │       └── MediaLightbox/
│       │       │
│       │       ├── Profile/
│       │       │   ├── Profile.jsx        🔵 UI ✅ | 🟡 Logic ❌
│       │       │   ├── Profile.css        🔵 PABLO ✅
│       │       │   └── components/        🔵 PABLO ✅
│       │       │       ├── ProfileCard/
│       │       │       ├── ComposerModal/
│       │       │       └── TimelineRiver/
│       │       │
│       │       ├── Friends/
│       │       │   ├── Friends.jsx        🔵 UI ✅ | 🟣 Logic ❌
│       │       │   └── Friends.css        🔵 PABLO (if needed)
│       │       │
│       │       └── About/
│       │           └── About.jsx          🟣 CRYSTAL ❌
│
└── docs/                                  🔵 PABLO ✅
    ├── team-plan-v2/                      # This folder
    └── features/
```

---

## Summary by Person

### 🔵 Pablo (UI Architect)

- **All CSS/styling** across the entire project
- **All component structure** (JSX layout, no API logic)
- **Design system** and visual consistency
- **Documentation** and project coordination
- **Remaining:** Backend gaps, CORS, error handling patterns

### 🟢 Colin (Posts Backend)

- `posts/` Django app (models ✅, serializers, views, urls, admin)
- Feed logic integration with Home.jsx
- ComposerModal post creation logic

### 🟡 Natalia (Auth & Users)

- `users/` Django app (models ✅, serializers ✅, views ✅, urls ✅, admin)
- `authService.js` frontend service
- `ProtectedRoute.jsx` component
- Login/Signup form → API connection

### 🟣 Crystal (Friends System)

- `friends/` Django app (models, serializers, views, urls, admin)
- `friendsService.js` frontend service
- Friends.jsx logic
- About.jsx page

### 🟠 Tito (Infrastructure)

- `settings.py` CORS configuration
- `apiClient.js` base HTTP client with auth
- `postsService.js` posts API wrapper
- `utils/formatters.js` and `validators.js`
- API routing setup
