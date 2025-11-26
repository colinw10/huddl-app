# Natalia - Weekly Tasks

> **Note:** Auth backend is partially complete! The endpoints exist (signup, login, token refresh, me). Your main job is creating the frontend service and connecting the forms.

---

## Week 1: Review What Exists

### Task 1: Verify Backend Auth Works

Test the existing endpoints:

```bash
# Signup
curl -X POST http://127.0.0.1:8000/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

You should get JWT tokens back from login.

### Task 2: Register Profile in Admin

Open `backend/users/admin.py`:

```python
from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'bio', 'created_at']
    search_fields = ['user__username', 'bio']
```

**Commits:**

1. "Verify auth endpoints working"
2. "Register Profile in admin"

---

## Week 2: Auth Service & Login Connection

### Task 1: Create authService.js

Create `frontend/src/services/authService.js`:

```javascript
const API_URL = "http://localhost:8000/api/auth";

export const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.access) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        return { success: true, data };
      }

      return { success: false, error: data };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      return response.ok
        ? { success: true, data }
        : { success: false, error: data };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.ok ? await response.json() : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  getToken: () => localStorage.getItem("token"),
};
```

### Task 2: Connect Login.jsx

Update the `handleSubmit` function in `Login.jsx`:

```javascript
import { authService } from "../../../services/authService";

// In handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const result = await authService.login(formData.email, formData.password);

    if (result.success) {
      navigate("/home");
    } else {
      setErrors({ submit: result.error.detail || "Login failed" });
    }
  } catch {
    setErrors({ submit: "Login failed. Please try again." });
  } finally {
    setIsLoading(false);
  }
};
```

**Commits:**

1. "Create authService with login/signup/logout"
2. "Connect Login page to auth API"

---

## Week 3: Protected Routes & Signup

### Task 1: Create ProtectedRoute Component

Create `frontend/src/components/auth/ProtectedRoute.jsx`:

```javascript
import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";

function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

### Task 2: Update App.jsx with Protected Routes

Wrap protected pages:

```javascript
import ProtectedRoute from "./components/auth/ProtectedRoute";

// In Routes:
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>;
```

### Task 3: Connect Signup.jsx

Similar to Login, connect the signup form to `authService.signup()`.

### Task 4: Add Logout to TopBar

```javascript
import { authService } from "../../../services/authService";

const handleLogout = () => {
  authService.logout();
  navigate("/login");
};
```

**Commits:**

1. "Create ProtectedRoute component"
2. "Wrap protected pages"
3. "Connect Signup to auth API"
4. "Add logout to TopBar"

---

## Week 4: User Search

### Task 1: Add Search Endpoint

Add to `backend/users/views.py`:

```python
from django.db.models import Q

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_users(request):
    query = request.GET.get('q', '').strip()

    if len(query) < 2:
        return Response({'error': 'Query too short'}, status=400)

    users = User.objects.filter(
        Q(username__icontains=query)
    ).exclude(id=request.user.id)[:10]

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
```

### Task 2: Update URLs

Add to `backend/users/urls.py`:

```python
path('search/', views.search_users, name='search_users'),
```

### Task 3: Create userService.js

Create `frontend/src/services/userService.js`:

```javascript
import { apiClient } from "./apiClient";

export const userService = {
  searchUsers: async (query) => {
    return await apiClient.get(`/auth/search/?q=${encodeURIComponent(query)}`);
  },
};
```

**Commits:**

1. "Add user search endpoint"
2. "Create userService"

---

## Week 5: Profile Editing

### Task 1: Add Profile Update Endpoint

Add to `backend/users/views.py`:

```python
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile = request.user.profile

    bio = request.data.get('bio')
    if bio is not None:
        profile.bio = bio

    profile.save()
    return Response(UserSerializer(request.user).data)
```

Add to urls:

```python
path('profile/update/', views.update_profile, name='update_profile'),
```

### Task 2: Connect Profile.jsx

Add edit functionality to Profile page:

- "Edit Profile" button
- Modal with bio textarea
- Save to API

### Task 3: Test Full Auth Flow

1. Signup with new account
2. Login with credentials
3. Access protected routes
4. Edit profile
5. Logout

**Commits:**

1. "Add profile update endpoint"
2. "Connect profile editing"
3. "Test complete auth flow"
