# Tito - API Client Tasks

> **Your Role:** Create the central API client that handles all HTTP requests, authentication headers, and token refresh.

---

## 📁 YOUR FILES

| File | Status | What to do |
|------|--------|-----------|
| `frontend/src/services/apiClient.js` | ❌ TODO | Axios/fetch setup + token handling |

---

## Week 1: Verify CORS is Working

### Task 1: Check Backend CORS

Make sure `backend/huddl/settings.py` has CORS configured:

```python
INSTALLED_APPS = [
    # ... other apps ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    # ... other middleware ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

### Task 2: Test CORS

1. Start backend: `cd backend && python manage.py runserver`
2. Start frontend: `cd frontend && npm run dev`
3. Open browser console - should NOT see CORS errors

---

## Week 2: Create API Client

### Task 1: Implement `frontend/src/services/apiClient.js`

```javascript
/**
 * API Client - Central HTTP client for all API requests
 * Handles authentication headers and token refresh
 */

const API_BASE_URL = 'http://localhost:8000/api'\;

// Get token from localStorage
const getToken = () => localStorage.getItem('token');
const getRefreshToken = () => localStorage.getItem('refreshToken');

// Set tokens
const setTokens = (access, refresh) => {
  localStorage.setItem('token', access);
  if (refresh) {
    localStorage.setItem('refreshToken', refresh);
  }
};

// Clear tokens (logout)
const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      setTokens(data.access, data.refresh);
      return data.access;
    } else {
      // Refresh token expired, clear everything
      clearTokens();
      return null;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
};

// Main fetch wrapper with auth
const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Build headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Make request
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If 401, try refreshing token
  if (response.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry with new token
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    }
  }

  return response;
};

// Convenience methods
export const api = {
  get: (endpoint) => apiClient(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => apiClient(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  patch: (endpoint, data) => apiClient(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => apiClient(endpoint, { method: 'DELETE' }),
};

// Export utilities for auth
export const authUtils = {
  getToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  refreshAccessToken,
};

export default api;
```

---

## Week 3: Test the API Client

### Task 1: Test in Browser Console

Open browser dev tools and test:

```javascript
// Import (if using modules)
import api from './services/apiClient';

// Test get posts (no auth needed)
const response = await api.get('/posts/');
const posts = await response.json();
console.log(posts);

// Test with auth (after logging in)
const meResponse = await api.get('/auth/me/');
const user = await meResponse.json();
console.log(user);
```

### Task 2: Test Token Refresh

1. Login to get tokens
2. Manually expire the access token (or wait)
3. Make a request - should auto-refresh
4. Check localStorage for new token

---

## How Other Team Members Use Your API Client

Once you're done, others can use it like this:

```javascript
import api from '../services/apiClient';

// In postsService.js (Colin's code)
export const postsService = {
  getAllPosts: async () => {
    const response = await api.get('/posts/');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },
};

// In friendsService.js (Crystal's code)  
export const friendsService = {
  getFriends: async () => {
    const response = await api.get('/friends/');
    if (!response.ok) throw new Error('Failed to fetch friends');
    return response.json();
  },
};
```

---

## Testing Checklist

- [ ] CORS working (no console errors)
- [ ] Can make GET requests without auth
- [ ] Can make POST requests with auth
- [ ] Token refresh works when access token expires
- [ ] clearTokens properly logs out user

---

## Commits to Make

1. "Verify CORS configuration"
2. "Create apiClient with fetch wrapper"
3. "Add token refresh logic"
4. "Add convenience methods (get, post, put, delete)"
5. "Test and document API client usage"
