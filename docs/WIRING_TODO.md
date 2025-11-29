# Pablo TODO: Frontend-Backend Wiring

## Overview

The backend API is complete. The frontend UI is complete.
These tasks connect them together.

---

## Priority 1: apiClient.js

**File:** `frontend/src/services/apiClient.js`

The axios client is set up but token refresh is commented out.

### Tasks:

- [ ] Uncomment the token refresh logic in response interceptor
- [ ] Test that 401 errors trigger token refresh
- [ ] Test that expired tokens redirect to login

### Test:

```bash
# Start backend
cd backend && source venv/bin/activate && python manage.py runserver

# In browser console, try:
# apiClient.get('/auth/me/') should fail without token
# apiClient.post('/auth/login/', {username: 'test', password: 'test'})
```

---

## Priority 2: AuthContext.jsx

**File:** `frontend/src/contexts/AuthContext.jsx`

The context structure is ready. Need to uncomment the API calls.

### Tasks:

- [ ] Uncomment `checkAuth` useEffect (calls /api/auth/me/)
- [ ] Uncomment `login` function (calls /api/auth/login/)
- [ ] Uncomment `signup` function (calls /api/auth/signup/)
- [ ] Test login/logout flow

### Test:

1. Wrap App in `<AuthProvider>`
2. Try `useAuth()` in Login.jsx
3. Call `login(username, password)` on form submit
4. Check that user state updates

---

## Priority 3: Wrap App with Providers

**File:** `frontend/src/App.jsx`

### Tasks:

- [ ] Import AuthProvider and ThemeProvider from contexts
- [ ] Wrap Router with providers:

```jsx
import { AuthProvider, ThemeProvider } from "./contexts";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>{/* ... routes ... */}</Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

---

## Priority 4: Connect Login Form

**File:** `frontend/src/components/pages/Login/Login.jsx`

### Tasks:

- [ ] Import `useAuth` from contexts
- [ ] Get `login` function from `useAuth()`
- [ ] On form submit, call `login(username, password)`
- [ ] Handle success: redirect to /home
- [ ] Handle error: show error message

### Example:

```jsx
import { useAuth } from "../../../contexts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };
  // ...
};
```

---

## Priority 5: Connect Signup Form

**File:** `frontend/src/components/pages/Signup/Signup.jsx`

Same pattern as Login - use `signup` from `useAuth()`.

---

## Priority 6: Protected Routes

### Tasks:

- [ ] Create `PrivateRoute` component
- [ ] Check `isAuthenticated` from `useAuth()`
- [ ] Redirect to /login if not authenticated
- [ ] Wrap /home, /profile, /friends routes

### Example:

```jsx
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

// In App.jsx routes:
<Route
  path="/home"
  element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }
/>;
```

---

## Priority 7: Connect Home Feed to Posts API

**File:** `frontend/src/components/pages/Home/Home.jsx`

### Tasks:

- [ ] Import apiClient
- [ ] Fetch posts on mount: `apiClient.get('/posts/')`
- [ ] Store posts in state
- [ ] Pass real data to TimelineRiverFeed instead of mock data

---

## Quick Test Checklist

After completing the wiring:

1. [ ] Can create account via Signup form
2. [ ] Can login via Login form
3. [ ] Redirected to /home after login
4. [ ] Can see posts on home page (from API)
5. [ ] Refresh page stays logged in
6. [ ] Logout clears session
7. [ ] Visiting /home without login redirects to /login

---

## API Endpoints Reference

| Endpoint               | Method | Body                          | Returns                          |
| ---------------------- | ------ | ----------------------------- | -------------------------------- |
| `/auth/signup/`        | POST   | `{username, email, password}` | `{id, username, email}`          |
| `/auth/login/`         | POST   | `{username, password}`        | `{access, refresh}`              |
| `/auth/token/refresh/` | POST   | `{refresh}`                   | `{access}`                       |
| `/auth/me/`            | GET    | -                             | `{id, username, email, profile}` |
| `/posts/`              | GET    | -                             | `[{id, content, author, ...}]`   |
| `/posts/`              | POST   | `{content, type}`             | `{id, content, ...}`             |
