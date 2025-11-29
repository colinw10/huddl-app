# Frontend Guide

This is the React frontend for HUDDL.

---

## Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at: **http://localhost:5173**

---

## Initial Project Structure

```
frontend/src/
├── main.jsx                          # Entry point
├── App.jsx                           ← PABLO: Router + Shell layout
├── index.css                         # Global styles
│
├── contexts/                         # Global State - PABLO
│   ├── index.js                      ← Barrel export
│   ├── ThemeContext.jsx              ← Dark/light mode toggle
│   └── AuthContext.jsx               ← User auth state (with NATALIA)
│
├── services/                         # API Layer
│   └── apiClient.js                  ← PABLO: Axios with auth interceptors
│
├── components/
│   ├── layout/                       # Shell Layout - PABLO
│   │   ├── Shell/                    ← Main layout wrapper
│   │   │   ├── Shell.jsx
│   │   │   ├── Shell.scss
│   │   │   └── index.js
│   │   ├── TopBar/                   ← Header with logo, search, user menu
│   │   │   ├── TopBar.jsx
│   │   │   ├── TopBar.scss
│   │   │   └── index.js
│   │   ├── SideNav/                  ← Desktop sidebar navigation
│   │   │   ├── SideNav.jsx
│   │   │   ├── SideNav.scss
│   │   │   └── index.js
│   │   └── BottomNav/                ← Mobile bottom navigation
│   │       ├── BottomNav.jsx
│   │       ├── BottomNav.scss
│   │       └── index.js
│   │
│   ├── ui/                           # Shared Components
│   │   └── MessageModal/             ← TITO: Direct messaging
│   │       ├── MessageModal.jsx
│   │       ├── MessageModal.scss
│   │       └── index.js
│   │
│   └── pages/
│       ├── Home/                     # Feed Page - COLIN
│       │   ├── Home.jsx              ← Main feed container
│       │   ├── Home.scss
│       │   ├── index.js
│       │   ├── components/
│       │   │   ├── TimelineRiverFeed.jsx
│       │   │   ├── TimelineRiverFeed.scss
│       │   │   ├── TimelineRiverRow.jsx
│       │   │   ├── TimelineRiverRow.scss
│       │   │   └── index.js
│       │   └── utils/
│       │       └── groupPosts.js     ← Post clustering utility
│       │
│       ├── Profile/                  # Profile Page - CRYSTAL
│       │   ├── Profile.jsx           ← User profile container
│       │   ├── Profile.scss
│       │   ├── index.js
│       │   └── components/
│       │       └── ProfileCard/      ← Flip card component
│       │           ├── ProfileCard.jsx
│       │           ├── ProfileCard.scss
│       │           └── index.js
│       │
│       ├── Friends/                  # Friends Page - CRYSTAL
│       │   ├── Friends.jsx           ← Friends list & requests
│       │   ├── Friends.scss
│       │   └── index.js
│       │
│       ├── Login/                    # Login Page - NATALIA
│       │   ├── Login.jsx             ← Login form + validation
│       │   ├── Login.scss
│       │   └── index.js
│       │
│       ├── Signup/                   # Signup Page - NATALIA
│       │   ├── Signup.jsx            ← Registration form
│       │   ├── Signup.scss
│       │   └── index.js
│       │
│       └── Landing/                  # Landing Page - NATALIA
│           ├── Landing.jsx           ← Hero, features, CTAs
│           ├── Landing.scss
│           └── index.js
```

---

## What We'll Build

### Week 2: Services Layer

**Tito → apiClient.js**

- Base HTTP client with auth headers
- Handles token storage and 401 redirects
- All other services use this

**Natalia → authService.js**

- `login(username, password)` → stores JWT
- `signup(username, email, password)`
- `logout()` → clears token
- `isAuthenticated()` → check if logged in

**Tito → postsService.js**

- `getFeed()` → GET /api/posts/
- `createPost(content, type)` → POST /api/posts/
- `deletePost(id)` → DELETE /api/posts/:id/

**Crystal → friendsService.js**

- `getFriends()` → GET /api/friends/
- `sendRequest(userId)` → POST /api/friends/send/

---

### Week 3: Connect Forms to API

**Natalia → Login.jsx logic**

```javascript
// In handleSubmit:
const result = await authService.login(username, password);
if (result.success) {
  navigate("/home");
} else {
  setError(result.error);
}
```

**Natalia → ProtectedRoute.jsx**

```javascript
// Wrap routes that need login
if (!authService.isAuthenticated()) {
  return <Navigate to="/login" />;
}
```

---

## Guidelines (Suggested)

1. **Use the services layer** - Keeps API calls organized in one place
2. **Follow the folder structure** - Helps keep merges clean
3. **Check backend README** - See `BACKEND_README.md` for API details

> Have a better approach? Let's discuss it!

---

## Week 1: Backend Focus

Week 1 focuses on backend setup. Frontend work ramps up in Week 2.

**But you can:**

- Run `npm run dev` to see the current UI
- Look at the component files to understand the structure
- Read the backend README to understand what APIs you'll call

---

## How Frontend Talks to Backend

```
User clicks Login
    ↓
Login.jsx calls authService.login()
    ↓
authService uses apiClient.post('/auth/login/')
    ↓
apiClient adds headers, sends fetch to Django
    ↓
Django returns JWT token
    ↓
authService stores token in localStorage
    ↓
User redirected to /home
```

---

## Common Commands

```bash
# Start dev server
npm run dev

# Install new package
npm install package-name

# Build for production
npm run build
```
