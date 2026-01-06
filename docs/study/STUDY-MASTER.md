# NUMENEON STUDY MASTER PLAN

## 🎯 MISSION: Master 20 Critical Files in 16 Days

**Deadline:** January 20, 2026 (Graduation: Jan 24)  
**Study Time:** Jan 4 → Jan 20 = 16 days  
**Goal:** Confidently explain architecture in technical interviews

---

## 👤 WHO I AM

Pablo - UI Lead on NUMENEON (capstone project). 45 years old, career changer, visual-spatial learner with synesthesia. Graduating General Assembly bootcamp January 24th. Need to understand my codebase deeply for technical interviews.

**My Strengths:**

- Visual/spatial thinking
- Pattern recognition (synesthesia helps!)
- UI/UX design background
- Built the entire frontend

**My Challenge:**

- ~100 files in codebase
- Limited time before graduation
- Need to explain technical decisions clearly

---

## 📚 WHAT WE'RE STUDYING

**Frontend:** React 18 + Vite 7.2 + Context API + Axios  
**Backend:** Django 5.2 + DRF + JWT Auth + SQLite  
**Build:** Vite path aliases (@assets, @components, @contexts, etc.)

**Focus:** 20 must-know files (out of 100+ total)

- 12 frontend files
- 8 backend files

---

## 🎓 STUDY METHOD

### Phase 1: File-by-File Linear Study (Days 1-16)

**Goal:** Exposure, not mastery. "I've seen this. I know what lives here."

**For each file:**

1. Read the file with inline comments (explaining syntax)
2. Identify ONE connection to another file
3. Note: "🔗 This connects to [filename]"
4. Write a 2-3 sentence summary
5. Move to next file

**DO NOT:**

- Try to memorize everything
- Get stuck on one file for hours
- Jump around randomly

### Phase 2: Multi-File Deep Tracing (Days 17-20)

**Goal:** Trace complete flows across 3-4 files

**Pick a flow:**

- "Creating a Post": ComposerModal → PostsContext → postsService → apiClient → Backend
- "User Login": Login.jsx → AuthContext → Backend → JWT token → apiClient
- "Loading Feed": Home.jsx → PostsContext → postsService → Backend → TimelineRiverFeed

**For each trace:**

1. Open 3-4 related files
2. Identify where function is DEFINED (file + line)
3. Where it's IMPORTED (file + line)
4. Where it's CALLED (file + line)
5. Practice explaining out loud

**Color coding for roles:**

- 🔴 Entry points (user action starts here)
- 🟡 Orchestrators (manage state, coordinate)
- 🟢 Workers (do the actual work)
- 🔵 Utilities (helpers, tools)

---

## 📅 16-DAY STUDY SCHEDULE

### Days 1-2: Entry Layer (2 files)

- ✅ main.jsx - How React app starts
- ✅ App.jsx - Routing and page structure

**What to know:**

- How providers wrap the app
- Route definitions
- Layout structure (TopBar + SideNav + content)

```javascript
// 📁 FILE: filename.jsx
// ⬆️ RECEIVES: what this file gets from other files
// ⬇️ SENDS: what this file exports to other files

// Comment INSIDE the code explaining:
// - What each block does
// - Syntax explanations (not overwhelming)
// - 🔗 CONNECTION: filename.jsx when referencing another file
```

Then a summary AFTER the code block tying it together.

---

## FILES COMPLETED (Phase 1)

**Entry:**

- ✅ main.jsx → connects to App.jsx, all context providers
- ✅ App.jsx → connects to all page components, MessageContext

**Contexts:**

- ✅ AuthContext.jsx → connects to apiClient.js
- ✅ PostsContext.jsx → connects to postsService.js, AuthContext
- ✅ FriendsContext.jsx → connects to friendsService.js, AuthContext
- ✅ MessageContext.jsx → connects to (mock data, no service yet)
- ✅ ThemeContext.jsx → connects to (localStorage only)

**Services:**

- ✅ apiClient.js → connects to postsService.js, friendsService.js, AuthContext.jsx

---

## FILES REMAINING (Phase 1)

### LAYER 1: SERVICES (Study Next - These connect Frontend → Backend)

- ⏳ postsService.js → connects to apiClient.js, PostsContext.jsx
- ⏳ friendsService.js → connects to apiClient.js, FriendsContext.jsx

### LAYER 2: LAYOUT (Frame the app)

- ⏳ TopBar/TopBar.jsx → connects to AuthContext, ThemeContext, SearchModal, MessageModal, NotificationModal
- ⏳ SideNav/SideNav.jsx → connects to AuthContext, icon components
- ⏳ TopBar/SearchModal → connects to FriendsContext
- ⏳ TopBar/MessageModal → connects to MessageContext
- ⏳ TopBar/NotificationModal → connects to (mock data)

### LAYER 3: PAGES (Main views)

- ⏳ Landing/Landing.jsx → public page, no auth
- ⏳ Login/Login.jsx → connects to AuthContext
- ⏳ Signup/Signup.jsx → connects to AuthContext
- ⏳ Home/Home.jsx → connects to PostsContext, TimelineRiverFeed
- ⏳ Profile/Profile.jsx → connects to PostsContext, FriendsContext, ProfileCard, TimelineRiver
- ⏳ Friends/Friends.jsx → connects to FriendsContext
- ⏳ About/About.jsx → static page
- ⏳ NotFound/NotFound.jsx → 404 page

### LAYER 4: FEATURE COMPONENTS (Complex UI features)

**Home Components:**

- ⏳ TimelineRiverFeed/TimelineRiverFeed.jsx → connects to TimelineRiverRow
- ⏳ TimelineRiverRow/TimelineRiverRow.jsx → displays posts, connects to PostsContext
- ⏳ DeleteConfirmModal → confirms post deletion
- ⏳ MediaLightbox → displays images fullscreen

**Profile Components:**

- ⏳ ProfileCard/ProfileCard.jsx → connects to ProfileCardFront, ProfileCardBack
- ⏳ ProfileCard/components/ProfileCardFront.jsx → user avatar, stats, bio
- ⏳ ProfileCard/components/ProfileCardBack.jsx → flipped view with analytics
- ⏳ ProfileCard/components/ActivityVisualization.jsx → GitHub-style contribution grid
- ⏳ ProfileCard/components/PostTypeBreakdown.jsx → pie/bar chart of content types
- ⏳ ProfileCard/components/QuickSettings.jsx → profile settings panel
- ⏳ TimelineRiver → Profile version of timeline
- ⏳ ComposerModal → creates new posts, connects to PostsContext

### LAYER 5: UI UTILITIES

- ⏳ ProtectedRoute.jsx → connects to AuthContext
- ⏳ ThemeToggle/ThemeToggle.jsx → connects to ThemeContext

### LAYER 6: ASSETS (NEW! SVG Icons as Components)

- ⏳ assets/icons.jsx → barrel export file (DEPRECATED but shows structure)
- ⏳ assets/icons/index.js → master export
- ⏳ assets/icons/navigation.jsx → TargetReticle, Chevron, Back, Flip icons
- ⏳ assets/icons/user.jsx → User, Globe, Lock, Friends, HexProfile icons
- ⏳ assets/icons/engagement.jsx → Heart, Comment, Share, Repost icons
- ⏳ assets/icons/actions.jsx → Edit, Trash, Close, Plus, Send icons
- ⏳ assets/icons/media.jsx → Image, Expand, Maximize, Minimize icons
- ⏳ assets/icons/ui.jsx → Settings, Eye, More, Grid, Clock icons
- ⏳ assets/icons/sidenav.jsx → HexHome, Signal, Network, CircuitInfo icons
- ⏳ assets/icons/analytics.jsx → Bolt, BarChart, Shield, Activity icons
- ⏳ assets/icons/profile.jsx → Location, Link, Calendar, Star icons
- ⏳ assets/icons/messaging.jsx → MessageBubble, MessageLine, Emoji icons
- ⏳ assets/icons/misc.jsx → Music, MapPin, PostTriangle icons

### LAYER 7: STYLES (Study Last - Visual layer)

- ⏳ main.scss → imports all partials
- ⏳ \_variables.scss → colors, spacing, breakpoints
- ⏳ \_theme.scss → dark mode CSS variables
- ⏳ \_light-mode.scss → light mode overrides
- ⏳ \_reset.scss → CSS reset
- ⏳ \_typography.scss → fonts, text styles
- ⏳ \_buttons.scss → button styles
- ⏳ \_cards.scss → card styles
- ⏳ \_layout.scss → grid, flex utilities
- ⏳ \_animations.scss → transitions, keyframes
- ⏳ \_blobs.scss → organic background shapes
- ⏳ \_utilities.scss → helper classes
- ⏳ \_mixins.scss → reusable SCSS functions

---

## PROJECT STRUCTURE

```
frontend/src/
├── main.jsx (🔴 ENTRY - React app starts here)
├── App.jsx (🟡 ORCHESTRATOR - Routing + layout logic)
│
├── contexts/ (🟡 ORCHESTRATORS - Global state managers)
│   ├── index.js (barrel export)
│   ├── AuthContext.jsx (user login/logout, current user)
│   ├── PostsContext.jsx (posts CRUD, likes, comments)
│   ├── FriendsContext.jsx (friends list, requests, profile data)
│   ├── MessageContext.jsx (messaging - mock data for now)
│   └── ThemeContext.jsx (dark/light mode toggle)
│
├── services/ (🔵 UTILITIES - API communication layer)
│   ├── apiClient.js (axios instance, auth headers, base URL)
│   ├── postsService.js (posts API calls)
│   └── friendsService.js (friends/users API calls)
│
├── components/
│   ├── layout/ (🟡 ORCHESTRATORS - App frame)
│   │   ├── TopBar/
│   │   │   ├── TopBar.jsx (top navigation bar)
│   │   │   ├── TopBar.scss
│   │   │   ├── SearchModal/ (search users)
│   │   │   ├── MessageModal/ (inbox)
│   │   │   └── NotificationModal/ (notifications)
│   │   │
│   │   └── SideNav/
│   │       ├── SideNav.jsx (left sidebar navigation)
│   │       └── SideNav.scss
│   │
│   ├── pages/ (🟢 WORKERS - Main view components)
│   │   ├── Landing/ (public homepage)
│   │   ├── Login/ (auth form)
│   │   ├── Signup/ (registration form)
│   │   ├── Home/ (main feed)
│   │   │   ├── Home.jsx
│   │   │   ├── components/
│   │   │   │   ├── TimelineRiverFeed/
│   │   │   │   ├── TimelineRiverRow/
│   │   │   │   ├── DeleteConfirmModal/
│   │   │   │   └── MediaLightbox/
│   │   │   └── utils/
│   │   │
│   │   ├── Profile/ (user profile page)
│   │   │   ├── Profile.jsx
│   │   │   └── components/
│   │   │       ├── ProfileCard/
│   │   │       ├── TimelineRiver/
│   │   │       └── ComposerModal/
│   │   │
│   │   ├── Friends/ (friends list page)
│   │   ├── About/ (about page)
│   │   └── NotFound/ (404 page)
│   │
│   └── ui/ (🔵 UTILITIES - Reusable UI components)
│       ├── ProtectedRoute.jsx (auth guard for routes)
│       └── ThemeToggle/
│           ├── ThemeToggle.jsx (dark/light switch)
│           └── ThemeToggle.scss
│
├── assets/ (🔵 UTILITIES - Static resources)
│   ├── icons.jsx (DEPRECATED - legacy barrel export)
│   └── icons/ (SVG components organized by category)
│       ├── index.js (master export)
│       ├── navigation.jsx (TargetReticle, Chevron, Back, Flip)
│       ├── user.jsx (User, Globe, Lock, Friends, HexProfile)
│       ├── engagement.jsx (Heart, Comment, Share, Repost)
│       ├── actions.jsx (Edit, Trash, Close, Plus, Send)
│       ├── media.jsx (Image, Expand, Maximize, Minimize)
│       ├── ui.jsx (Settings, Eye, More, Grid, Clock)
│       ├── sidenav.jsx (HexHome, Signal, Network, CircuitInfo)
│       ├── analytics.jsx (Bolt, BarChart, Shield, Activity)
│       ├── profile.jsx (Location, Link, Calendar, Star)
│       ├── messaging.jsx (MessageBubble, MessageLine, Emoji)
│       └── misc.jsx (Music, MapPin, PostTriangle)
│
└── styles/ (🎨 VISUAL - SCSS architecture)
    ├── main.scss (imports all partials)
    ├── _variables.scss (colors, spacing, breakpoints)
    ├── _theme.scss (dark mode CSS variables)
    ├── _light-mode.scss (light mode overrides)
    ├── _reset.scss (CSS normalization)
    ├── _typography.scss (fonts, text styles)
    ├── _mixins.scss (reusable SCSS functions)
    ├── _buttons.scss (button component styles)
    ├── _cards.scss (card component styles)
    ├── _layout.scss (grid, flex utilities)
    ├── _animations.scss (transitions, keyframes)
    ├── _blobs.scss (organic background shapes)
    └── _utilities.scss (helper classes)
```

### BACKEND STRUCTURE (Django REST API)

```
backend/
├── manage.py (Django CLI tool)
├── db.sqlite3 (database file)
├── seed_posts.py (test data generator)
│
├── numeneon/ (Django project config)
│   ├── settings.py (app configuration)
│   ├── urls.py (🔴 MAIN URL ROUTER - directs api/auth, api/posts, api/friends)
│   ├── wsgi.py (server deployment)
│   └── asgi.py (async server)
│
├── users/ (authentication app)
│   ├── models.py (User model - extends Django's AbstractUser)
│   ├── views.py (signup, login, logout, current user)
│   ├── serializers.py (converts User model ↔ JSON)
│   └── urls.py (routes: /api/auth/signup, /api/auth/login, etc.)
│
├── posts/ (posts/comments/likes app)
│   ├── models.py (Post, Like models)
│   ├── views.py (create/read/update/delete posts, toggle likes)
│   ├── serializers.py (converts Post/Like models ↔ JSON)
│   └── urls.py (routes: /api/posts/, /api/posts/<id>/, etc.)
│
└── friends/ (relationships app)
    ├── models.py (Friendship, FriendRequest models)
    ├── views.py (send/accept/reject requests, list friends)
    ├── serializers.py (converts models ↔ JSON)
    └── urls.py (routes: /api/friends/requests, /api/friends/list, etc.)
```

---

## TEACHING RULES

1. Comment INSIDE the code first, then explain after
2. Full sentences - no assumptions
3. Explain syntax that might be confusing
4. Show what block does and in what order things run
5. Note connections with 🔗 CONNECTION: filename
6. One mini-connection per file, then stop
7. Don't overwhelm - exposure, not mastery

---

## CURRENT STATUS

Just finished apiClient.js.

**Next file to study: postsService.js**

---

## STUDY ORDER RECOMMENDATION (Follow the Layers!)

### Phase 1 Path (Already Started):

1. ✅ Entry: main.jsx, App.jsx
2. ✅ Contexts: Auth, Posts, Friends, Message, Theme
3. ✅ Services: apiClient.js
4. ⏳ Services: **postsService.js ← YOU ARE HERE**
5. ⏳ Services: friendsService.js

### Phase 1 Path (Continue):

6. Layout: TopBar.jsx, SideNav.jsx
7. Layout Modals: SearchModal, MessageModal, NotificationModal
8. Pages: Landing, Login, Signup (auth flow)
9. Pages: Home (main feed)
10. Home Components: TimelineRiverFeed, TimelineRiverRow
11. Pages: Profile
12. Profile Components: ProfileCard, TimelineRiver, ComposerModal
13. Pages: Friends, About, NotFound
14. UI: ProtectedRoute, ThemeToggle
15. Assets: Icon components (by category)
16. Styles: Study SCSS files last

---

## PHASE 2 EXAMPLES (Multi-File Deep Tracing)

**TRACE 1: Creating a Post**

- 🔴 ENTRY: ComposerModal user clicks "Post"
- 🟡 ORCHESTRATOR: PostsContext.createPost()
  - File: frontend/src/contexts/PostsContext.jsx
  - Line: [where createPost function is defined]
- 🟢 WORKER: postsService.createPost()
  - File: frontend/src/services/postsService.js
  - Line: [where createPost function is defined]
- 🔵 UTILITY: apiClient.post()
  - File: frontend/src/services/apiClient.js
  - Line: [axios instance]
- 🌐 BACKEND: POST /api/posts/
  - File: backend/posts/urls.py
  - Forwards to: backend/posts/views.py
  - Function: PostViewSet.create()

**TRACE 2: Loading User Profile**

- 🔴 ENTRY: User navigates to /profile/:username
- 🟡 ORCHESTRATOR: Profile.jsx useEffect
  - File: frontend/src/components/pages/Profile/Profile.jsx
- 🟡 ORCHESTRATOR: FriendsContext.fetchUserProfile()
  - File: frontend/src/contexts/FriendsContext.jsx
- 🟢 WORKER: friendsService.getUserProfile()
  - File: frontend/src/services/friendsService.js
- 🔵 UTILITY: apiClient.get()
  - File: frontend/src/services/apiClient.js
- 🌐 BACKEND: GET /api/friends/profile/:username
  - File: backend/friends/urls.py
  - Forwards to: backend/friends/views.py

**TRACE 3: Liking a Post**

- 🔴 ENTRY: TimelineRiverRow user clicks heart icon
- 🟡 ORCHESTRATOR: PostsContext.toggleLike()
  - File: frontend/src/contexts/PostsContext.jsx
- 🟢 WORKER: postsService.toggleLike()
  - File: frontend/src/services/postsService.js
- 🔵 UTILITY: apiClient.post()
  - File: frontend/src/services/apiClient.js
- 🌐 BACKEND: POST /api/posts/:id/toggle_like
  - File: backend/posts/urls.py
  - Forwards to: backend/posts/views.py
  - Function: PostViewSet.toggle_like()

**TRACE 4: Icon Import Flow**

- 🔴 ENTRY: Component needs HeartIcon
- Import: `import { HeartIcon } from '../../assets/icons'`
- 🔵 UTILITY: assets/icons/index.js re-exports from engagement.jsx
  - File: frontend/src/assets/icons/index.js
- 🟢 WORKER: HeartIcon component defined in engagement.jsx
  - File: frontend/src/assets/icons/engagement.jsx
- Component renders SVG directly in JSX

---

## BACKEND API ENDPOINTS (What Frontend Connects To)

### Auth Endpoints (users/urls.py)

- POST /api/auth/signup → Register new user
- POST /api/auth/login → Login, returns token
- POST /api/auth/logout → Logout
- GET /api/auth/current → Get current logged-in user

### Posts Endpoints (posts/urls.py)

- GET /api/posts/ → List all posts (feed)
- POST /api/posts/ → Create new post
- GET /api/posts/:id/ → Get single post
- PUT /api/posts/:id/ → Update post
- DELETE /api/posts/:id/ → Delete post
- POST /api/posts/:id/toggle_like → Like/unlike post
- GET /api/posts/user/:username/ → Get posts by specific user

### Friends Endpoints (friends/urls.py)

- GET /api/friends/list/ → List user's friends
- GET /api/friends/requests/ → List friend requests
- POST /api/friends/request/:username/ → Send friend request
- POST /api/friends/accept/:id/ → Accept friend request
- POST /api/friends/reject/:id/ → Reject friend request
- GET /api/friends/profile/:username/ → Get user profile data
