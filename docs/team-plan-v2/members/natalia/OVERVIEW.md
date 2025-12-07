# Natalia - Auth & Users Lead

## Your Role

You're responsible for the **authentication system** - how users sign up, log in, and stay logged in. The backend models are already set up (User from Django + our Profile model), and the auth endpoints exist (signup, login, token refresh, current user). Your main job is to build the frontend service that talks to these endpoints, create the ProtectedRoute component that blocks unauthenticated users, and wire up the Login/Signup forms to actually authenticate. You'll also handle profile editing later. The UI is done - you're adding the logic that makes it work.

## Files You Own

### Backend (`backend/users/`)

All files have starter code with TODO comments. Follow the comments!

| File             | Status       | Description              |
| ---------------- | ------------ | ------------------------ |
| `models.py`      | ✅ Done      | Profile model exists     |
| `serializers.py` | 📝 Implement | User/Profile serializers |
| `views.py`       | 📝 Implement | signup, me endpoints     |
| `urls.py`        | 📝 Implement | Auth routes              |
| `admin.py`       | ✅ Done      | Already configured       |

### Frontend (`src/contexts/` and pages)

All files have starter code with TODO comments. Follow the comments!

| File              | Status       | Description                     |
| ----------------- | ------------ | ------------------------------- |
| `AuthContext.jsx` | 📝 Implement | Auth state, login/signup/logout |
| `Login.jsx`       | 📝 Implement | Connect form to AuthContext     |
| `Signup.jsx`      | 📝 Implement | Connect form to AuthContext     |

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
