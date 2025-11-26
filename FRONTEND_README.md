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
├── main.jsx              # Entry point
├── App.jsx               # Router + layout
├── index.css             # Global styles
│
├── services/             # API calls (Week 2)
│   ├── apiClient.js      ← Tito
│   ├── authService.js    ← Natalia
│   ├── postsService.js   ← Tito
│   └── friendsService.js ← Crystal
│
├── utils/                # Helpers (Week 3)
│   ├── formatters.js     ← Tito
│   └── validators.js     ← Tito
│
└── components/
    ├── layout/           # TopBar, SideNav, BottomNav
    └── pages/            # Page components
        ├── Home/         # Feed page
        ├── Profile/      # User profile
        ├── Friends/      # Friends list
        ├── Login/        # Login form
        └── Signup/       # Signup form
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
