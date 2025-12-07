# Tito - Weekly Tasks

> **CRITICAL:** Your Week 1 CORS task blocks EVERYONE. Without CORS, the frontend cannot talk to the backend. Do this first!

---

## Week 1: CORS Configuration (BLOCKING)

### Task 1: Install django-cors-headers

```bash
cd backend
pip3 install django-cors-headers
pip3 freeze > requirements.txt
```

### Task 2: Update settings.py

Open `backend/huddl/settings.py`:

**Add to INSTALLED_APPS:**

```python
INSTALLED_APPS = [
    # ... existing apps ...
    'corsheaders',  # ADD THIS
    # ... rest of apps ...
]
```

**Add to TOP of MIDDLEWARE (MUST BE FIRST):**

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ADD THIS FIRST
    'django.middleware.security.SecurityMiddleware',
    # ... rest of middleware ...
]
```

**Add at BOTTOM of file:**

```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React dev server
]

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

### Task 3: Create requirements.txt

```bash
pip3 freeze > requirements.txt
```

### Task 4: Test CORS

1. Start backend: `python3 manage.py runserver`
2. Start frontend: `cd frontend && npm run dev`
3. Open browser console - should NOT see CORS errors

**Commits:**

1. "Install and configure CORS"
2. "Create requirements.txt"

---

## Week 2: API Client & Posts Service

### Task 1: Create apiClient.js

Create `frontend/src/services/apiClient.js`:

```javascript
const API_BASE_URL = "http://localhost:8000/api";

const getAuthToken = () => localStorage.getItem("token");

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // Handle 401 - token expired
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetchWithAuth(endpoint);
    if (!response.ok) throw new Error(`GET ${endpoint} failed`);
    return await response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "POST failed");
    }
    return await response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetchWithAuth(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("PUT failed");
    return await response.json();
  },

  delete: async (endpoint) => {
    const response = await fetchWithAuth(endpoint, { method: "DELETE" });
    if (!response.ok) throw new Error("DELETE failed");
    return true;
  },
};
```

### Task 2: Create postsService.js

Create `frontend/src/services/postsService.js`:

```javascript
import { apiClient } from "./apiClient";

export const postsService = {
  getFeed: async () => {
    return await apiClient.get("/posts/");
  },

  createPost: async (content, type = "thoughts", mediaUrl = null) => {
    return await apiClient.post("/posts/", {
      content,
      type,
      media_url: mediaUrl,
    });
  },

  getPost: async (postId) => {
    return await apiClient.get(`/posts/${postId}/`);
  },

  updatePost: async (postId, data) => {
    return await apiClient.put(`/posts/${postId}/`, data);
  },

  deletePost: async (postId) => {
    return await apiClient.delete(`/posts/${postId}/`);
  },

  getUserPosts: async (userId) => {
    return await apiClient.get(`/posts/user/${userId}/`);
  },
};
```

**Commits:**

1. "Create apiClient with auth handling"
2. "Create postsService"

---

## Week 3: Utilities

### Task 1: Create formatters.js

Create `frontend/src/utils/formatters.js`:

```javascript
/**
 * Format date to relative time (e.g., "2h", "3d")
 */
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `${diffDay}d`;
  if (diffHour > 0) return `${diffHour}h`;
  if (diffMin > 0) return `${diffMin}m`;
  return "now";
};

/**
 * Format number with K/M suffix (1500 -> 1.5K)
 */
export const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

/**
 * Truncate text to max length
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Format full date (Jan 15, 2024)
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
```

### Task 2: Create validators.js

Create `frontend/src/utils/validators.js`:

```javascript
/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate username (3-20 chars)
 */
export const isValidUsername = (username) => {
  return username.length >= 3 && username.length <= 20;
};

/**
 * Validate password (min 6 chars)
 */
export const isValidPassword = (password) => {
  return password.length >= 6;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
```

**Commits:**

1. "Create formatters utility"
2. "Create validators utility"

---

## Week 4: Update Services + Documentation

### Task 1: Add Like/Comment Methods to postsService

Update `postsService.js`:

```javascript
// Add these methods:
toggleLike: async (postId) => {
  return await apiClient.post(`/posts/${postId}/like/`);
},

getComments: async (postId) => {
  return await apiClient.get(`/posts/${postId}/comments/`);
},

addComment: async (postId, content) => {
  return await apiClient.post(`/posts/${postId}/comments/`, { content });
},

deleteComment: async (commentId) => {
  return await apiClient.delete(`/posts/comments/${commentId}/`);
}
```

### Task 2: Create TESTING.md

Create `docs/TESTING.md` with:

- How to start backend/frontend
- How to test each endpoint
- Common issues and fixes

**Commits:**

1. "Add like/comment to postsService"
2. "Create testing documentation"

---

## Week 5: Final Documentation & Fixes

### Task 1: Create API_REFERENCE.md

Document all endpoints:

- Auth: signup, login, refresh, me, search
- Posts: CRUD, likes, comments
- Friends: list, requests, send, respond, remove

### Task 2: Update Main README

- Quick start guide
- Project structure
- Feature list
- Team credits

### Task 3: Bug Fixes

Test all services work:

- apiClient handles errors properly
- 401 redirects to login
- All formatters work correctly

**Commits:**

1. "Create API reference"
2. "Update README"
3. "Fix bugs and edge cases"
