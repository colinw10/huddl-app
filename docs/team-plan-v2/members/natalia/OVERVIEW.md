# Natalia - Auth & Users Lead

## Your Role

You're responsible for the **authentication system** - how users sign up, log in, and stay logged in. The backend models are already set up (User from Django + our Profile model), and the auth endpoints exist (signup, login, token refresh, current user). Your main job is to build the frontend service that talks to these endpoints, create the ProtectedRoute component that blocks unauthenticated users, and wire up the Login/Signup forms to actually authenticate. You'll also handle profile editing later. The UI is done - you're adding the logic that makes it work.

## Files You Own

### Backend (`backend/users/`)

| File             | Status   | Description                      |
| ---------------- | -------- | -------------------------------- |
| `models.py`      | ✅ Done  | Profile model exists             |
| `serializers.py` | ✅ Done  | User/Profile serializers exist   |
| `views.py`       | ✅ Done  | signup, current_user views exist |
| `urls.py`        | ✅ Done  | Auth routes configured           |
| `admin.py`       | ❌ Build | Register Profile in Django admin |

### Frontend (Create new + add logic)

| File                                 | Status       | Description                       |
| ------------------------------------ | ------------ | --------------------------------- |
| `services/authService.js`            | ❌ Create    | API calls for login/signup/logout |
| `components/auth/ProtectedRoute.jsx` | ❌ Create    | Redirect if not logged in         |
| `Login.jsx`                          | ❌ Add logic | Connect form to authService       |
| `Signup.jsx`                         | ❌ Add logic | Connect form to authService       |
| `Profile.jsx`                        | ❌ Add logic | Load/edit user profile            |

## Week-by-Week Tasks

See `TASKS.md` in this folder for detailed weekly breakdown.

## Key Endpoints (Already Built)

```
POST   /api/auth/signup/        → Create new user
POST   /api/auth/login/         → Get JWT tokens
POST   /api/auth/token/refresh/ → Refresh access token
GET    /api/auth/me/            → Get current user info
```

## What You'll Add

```
PUT    /api/auth/profile/update/ → Update bio/avatar (Week 5)
GET    /api/auth/search/?q=      → Search users (Week 4)
```

## Dependencies

- Tito's apiClient.js for making authenticated requests
- Tito's CORS config for frontend to reach backend
