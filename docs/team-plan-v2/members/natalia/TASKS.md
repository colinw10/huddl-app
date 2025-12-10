# Natalia - Auth Tasks

> **Your Role:** Wire up the authentication frontend. The backend auth is DONE. The UI is DONE. You just need to connect them!

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `frontend/src/contexts/AuthContext.jsx` | ❌ TODO | Implement auth state management |
| `frontend/src/components/pages/Login/Login.jsx` | 🔵 UI ✅ / 🟡 Logic ❌ | Wire up handleSubmit |
| `frontend/src/components/pages/Signup/Signup.jsx` | 🔵 UI ✅ / 🟡 Logic ❌ | Wire up handleSubmit |

---

## Week 1: Test Backend Auth

### Task 1: Verify Backend Auth Works

Test the existing endpoints:

```bash
# Signup
curl -X POST http://127.0.0.1:8000/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'

# Login (uses EMAIL, not username!)
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

You should get JWT tokens back from login.

---

## Week 2: Implement AuthContext

### Task 1: Open `frontend/src/contexts/AuthContext.jsx`

The file has TODO comments. Here's the code to implement:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch current user
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/me/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token invalid, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.access) {
        localStorage.setItem('token', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        await fetchCurrentUser(data.access);
        return { success: true };
      }

      return { success: false, error: data.detail || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      }

      // Handle validation errors
      const errorMsg = data.email?.[0] || data.username?.[0] || data.password?.[0] || 'Signup failed';
      return { success: false, error: errorMsg };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
```

---

## Week 3: Wire Up Login Page

### Task 1: Open `frontend/src/components/pages/Login/Login.jsx`

Find the `handleSubmit` function and implement it. Look for the TODO comments!

**What to change:**

1. Uncomment the `useAuth` import at the top
2. Uncomment `const { login } = useAuth();`
3. Replace the placeholder in `handleSubmit`:

```javascript
// In handleSubmit, replace the placeholder with:
const result = await login(formData.email, formData.password);

if (result.success) {
  navigate(from, { replace: true });
} else {
  setErrors({ submit: result.error });
}
setIsLoading(false);
```

---

## Week 4: Wire Up Signup Page

### Task 1: Open `frontend/src/components/pages/Signup/Signup.jsx`

Same pattern as Login!

1. Uncomment the `useAuth` import at the top
2. Uncomment `const { signup } = useAuth();`
3. Replace the placeholder in `handleSubmit`:

```javascript
// In handleSubmit, replace the placeholder with:
const result = await signup(formData.username, formData.email, formData.password);

if (result.success) {
  navigate('/login');
} else {
  setErrors({ submit: result.error });
}
setIsLoading(false);
```

---

## Testing Checklist

- [ ] Can sign up with new account
- [ ] Get redirected to login after signup
- [ ] Can log in with email/password
- [ ] Get redirected to /home after login
- [ ] User stays logged in on page refresh
- [ ] Logout clears token and redirects

---

## Commits to Make

1. "Implement AuthContext with login/signup/logout"
2. "Wire up Login page to AuthContext"
3. "Wire up Signup page to AuthContext"
4. "Test auth flow end-to-end"
