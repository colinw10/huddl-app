# HUDDL Project Tree - Responsibility Matrix

> **Legend:**  
> � COLIN | 🟡 NATALIA | 🟣 CRYSTAL | 🟠 TITO | 🔵 PABLO  
> ✅ = Done | ❌ = TODO (needs implementation)

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
│   │   ├── models.py                      🔵 PABLO ✅
│   │   ├── serializers.py                 🟢 COLIN ❌ TODO
│   │   ├── urls.py                        🟢 COLIN ❌ TODO
│   │   ├── views.py                       🟢 COLIN ❌ TODO
│   │   ├── admin.py                       🟢 COLIN ❌ TODO
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   ├── users/                             # Users/Auth app - NATALIA
│   │   ├── models.py                      🔵 PABLO ✅
│   │   ├── serializers.py                 🔵 PABLO ✅
│   │   ├── urls.py                        🔵 PABLO ✅
│   │   ├── views.py                       🔵 PABLO ✅
│   │   ├── apps.py                        ✅ (auto-generated)
│   │   └── migrations/                    ✅ (auto-generated)
│   │
│   └── friends/                           # Friends app - CRYSTAL
│       ├── models.py                      �� CRYSTAL ❌ TODO
│       ├── serializers.py                 🟣 CRYSTAL ❌ TODO
│       ├── urls.py                        🟣 CRYSTAL ❌ TODO
│       ├── views.py                       🟣 CRYSTAL ❌ TODO
│       ├── admin.py                       🟣 CRYSTAL ❌ TODO
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
│       │   ├── apiClient.js               🟠 TITO ❌ TODO
│       │   ├── postsService.js            🟢 COLIN ❌ TODO
│       │   ├── friendsService.js          🟣 CRYSTAL ❌ TODO
│       │   └── README.md                  🔵 PABLO ✅
│       │
│       ├── contexts/                      # State Management
│       │   ├── index.js                   🔵 PABLO ✅
│       │   ├── ThemeContext.jsx           🔵 PABLO ✅
│       │   ├── MessageContext.jsx         🔵 PABLO ✅
│       │   ├── AuthContext.jsx            �� NATALIA ❌ TODO
│       │   ├── PostsContext.jsx           🟢 COLIN ❌ TODO
│       │   └── FriendsContext.jsx         🟣 CRYSTAL ❌ TODO
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
│       │       ├── Login/                 # NATALIA wires up auth logic
│       │       │   ├── Login.jsx          🔵 UI ✅ | 🟡 LOGIC ❌
│       │       │   └── Login.scss         🔵 PABLO ✅
│       │       │
│       │       ├── Signup/                # NATALIA wires up auth logic
│       │       │   ├── Signup.jsx         🔵 UI ✅ | 🟡 LOGIC ❌
│       │       │   └── Signup.scss        🔵 PABLO ✅
│       │       │
│       │       ├── Home/                  # PABLO (complex page)
│       │       │   ├── Home.jsx           🔵 PABLO ✅
│       │       │   └── Home.scss          🔵 PABLO ✅
│       │       │
│       │       ├── Profile/               # PABLO (complex page)
│       │       │   ├── Profile.jsx        🔵 PABLO ✅
│       │       │   └── Profile.scss       🔵 PABLO ✅
│       │       │
│       │       ├── Friends/               # CRYSTAL wires up friends logic
│       │       │   ├── Friends.jsx        🔵 UI ✅ | 🟣 LOGIC ❌
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

### � Colin (Posts System) - ~22.5%

**YOUR FILES TO IMPLEMENT:**
| File | What to do |
|------|-----------|
| `backend/posts/serializers.py` | Create PostSerializer |
| `backend/posts/views.py` | Create PostViewSet with CRUD |
| `backend/posts/urls.py` | Set up router |
| `backend/posts/admin.py` | Register Post model |
| `frontend/src/services/postsService.js` | API calls for posts |
| `frontend/src/contexts/PostsContext.jsx` | Posts state management |

**SEE:** `docs/team-plan-v2/members/colin/TASKS.md` for code examples!

### 🟡 Natalia (Auth System) - ~22.5%

**YOUR FILES TO IMPLEMENT:**
| File | What to do |
|------|-----------|
| `frontend/src/contexts/AuthContext.jsx` | Auth state management |
| `frontend/src/components/pages/Login/Login.jsx` | Wire up handleSubmit (UI done!) |
| `frontend/src/components/pages/Signup/Signup.jsx` | Wire up handleSubmit (UI done!) |
| `frontend/src/components/ui/ProtectedRoute.jsx` | Auth guard logic |

**SEE:** `docs/team-plan-v2/members/natalia/TASKS.md` for code examples!

### 🟣 Crystal (Friends System) - ~22.5%

**YOUR FILES TO IMPLEMENT:**
| File | What to do |
|------|-----------|
| `backend/friends/models.py` | Create Friendship + FriendRequest models |
| `backend/friends/serializers.py` | Create serializers |
| `backend/friends/views.py` | Create friend endpoints |
| `backend/friends/urls.py` | Set up routing |
| `backend/friends/admin.py` | Register models |
| `frontend/src/services/friendsService.js` | API calls for friends |
| `frontend/src/contexts/FriendsContext.jsx` | Friends state management |
| `frontend/src/components/pages/Friends/Friends.jsx` | Wire up handlers (UI done!) |

**SEE:** `docs/team-plan-v2/members/crystal/TASKS.md` for code examples!

### 🟠 Tito (Infrastructure) - ~10%

**YOUR FILES TO IMPLEMENT:**
| File | What to do |
|------|-----------|
| `frontend/src/services/apiClient.js` | Axios setup + token refresh |
| `frontend/src/utils/` | Helper functions (formatters, validators) |

**SEE:** `docs/team-plan-v2/members/tito/TASKS.md` for code examples!

### 🔵 Pablo (UI Architecture) - ~22.5%

**COMPLETE:**
- All CSS/SCSS styling across the entire project
- All page component structure (JSX layout)
- Design system (`styles/` folder)
- Layout components (Shell, TopBar, SideNav, BottomNav)
- Theme system and animations
- Documentation and project coordination

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

---

## File Status Key

- **🔵 UI ✅ | 🟡 LOGIC ❌** = Pablo did the styling/JSX, teammate implements the logic
- **❌ TODO** = File has placeholder structure, needs implementation
- **✅** = Complete and working
