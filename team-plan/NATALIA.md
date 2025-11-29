# Natalia - Auth & Landing

## Role
Authentication pages, landing page, and users backend API.

---

## Assigned Files

### Frontend - Auth Pages
| File | Status | Description |
|------|--------|-------------|
| `src/components/pages/Login/Login.jsx` | ← | Login form with validation |
| `src/components/pages/Login/Login.scss` | ← | Login styles |
| `src/components/pages/Login/index.js` | ← | Barrel export |
| `src/components/pages/Signup/Signup.jsx` | ← | Registration form |
| `src/components/pages/Signup/Signup.scss` | ← | Signup styles |
| `src/components/pages/Signup/index.js` | ← | Barrel export |
| `src/components/pages/Landing/Landing.jsx` | ← | Hero, features, CTAs |
| `src/components/pages/Landing/Landing.scss` | ← | Landing styles |
| `src/components/pages/Landing/index.js` | ← | Barrel export |

### Backend - Users API
| File | Status | Description |
|------|--------|-------------|
| `backend/users/models.py` | ✓ | Profile model exists |
| `backend/users/admin.py` | ← | Register Profile in admin |
| `backend/users/serializers.py` | ← | UserSerializer, SignupSerializer, LoginSerializer |
| `backend/users/views.py` | ← | signup, login, current_user endpoints |
| `backend/users/urls.py` | ← | /api/auth/ routes + token refresh |

---

## Tasks

### Week 1
- [ ] Register Profile model in admin.py
- [ ] Verify Profile model fields
- [ ] Create test user via admin panel

### Week 2
- [ ] Create UserSerializer (id, username, email, avatar)
- [ ] Create SignupSerializer with validation:
  - username (unique check)
  - email (unique check, format)
  - password (min length)
  - password_confirm (match)
- [ ] Create LoginSerializer (username/email, password)
- [ ] Create signup view (POST /api/auth/signup/)
- [ ] Create login view (returns JWT tokens)
- [ ] Create current_user view (GET /api/auth/me/)
- [ ] Set up users/urls.py with token refresh

### Week 3
- [ ] Implement Login.jsx form:
  - Username/email input
  - Password input
  - Error display
  - Submit → call API → store token → redirect
- [ ] Implement Signup.jsx form:
  - Username, email, password, confirm
  - Validation feedback
  - Submit → call API → auto-login
- [ ] Implement Landing.jsx:
  - Hero section with CTA
  - Features overview
  - Login/Signup buttons
- [ ] Style all pages with Pablo's SCSS

### Week 4-5
- [ ] Add "forgot password" (stretch)
- [ ] Polish forms and error handling
- [ ] Bug fixes and testing

---

## API Endpoints

```
POST   /api/auth/signup/        → Create new user
POST   /api/auth/login/         → Get JWT tokens
POST   /api/auth/token/refresh/ → Refresh access token
GET    /api/auth/me/            → Current user info
```

---

## Notes
- Use Pablo's styles: `@use '../../../styles/variables' as *;`
- JWT tokens: access (short-lived) + refresh (long-lived)
- Store tokens in localStorage
- Coordinate with Pablo on AuthContext integration
