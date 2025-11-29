# Pablo - Architecture & Lead

## Role
Full-stack architecture, layout system, theming, and team integration support.

---

## Assigned Files

### Frontend - Core Architecture
| File | Status | Description |
|------|--------|-------------|
| `src/App.jsx` | ← | Router + Shell integration |
| `src/contexts/ThemeContext.jsx` | ← | Dark/light mode toggle |
| `src/contexts/AuthContext.jsx` | ← | User auth state |
| `src/contexts/index.js` | ← | Barrel export |
| `src/services/apiClient.js` | ← | Axios client with interceptors |

### Frontend - Layout Components
| File | Status | Description |
|------|--------|-------------|
| `src/components/layout/Shell/` | ← | Main layout wrapper |
| `src/components/layout/TopBar/` | ← | Header with logo, search, user menu |
| `src/components/layout/SideNav/` | ← | Desktop sidebar navigation |
| `src/components/layout/BottomNav/` | ← | Mobile bottom navigation |

### Frontend - Styles (COMPLETE ✓)
| File | Status | Description |
|------|--------|-------------|
| `src/styles/main.scss` | ✓ | Main entry point |
| `src/styles/_variables.scss` | ✓ | Theme colors, spacing, breakpoints |
| `src/styles/_mixins.scss` | ✓ | Reusable SCSS mixins |
| `src/styles/_glass.scss` | ✓ | Glassmorphism effects |
| `src/styles/_blobs.scss` | ✓ | Animated background blobs |
| `src/styles/_buttons.scss` | ✓ | Button styles |
| `src/styles/_cards.scss` | ✓ | Card styles |
| `src/styles/_light-mode.scss` | ✓ | Light theme overrides |
| `src/styles/_animations.scss` | ✓ | Keyframe animations |
| `src/styles/_typography.scss` | ✓ | Font styles |
| `src/styles/_layout.scss` | ✓ | Layout utilities |
| `src/styles/_reset.scss` | ✓ | CSS reset |
| `src/styles/_theme.scss` | ✓ | Theme setup |
| `src/styles/_utilities.scss` | ✓ | Utility classes |

### Backend - Config
| File | Status | Description |
|------|--------|-------------|
| `backend/huddl/settings.py` | ← | CORS + JWT setup (with Tito) |

---

## Tasks

### Week 1
- [x] Create SCSS architecture (variables, mixins, glass, blobs)
- [x] Set up styles folder with all partials
- [ ] Configure CORS in settings.py (with Tito)
- [ ] Configure JWT authentication

### Week 2
- [ ] Implement Shell layout wrapper
- [ ] Implement TopBar component
- [ ] Implement SideNav (desktop)
- [ ] Implement BottomNav (mobile)
- [ ] Create ThemeContext with localStorage persistence
- [ ] Create AuthContext with token handling
- [ ] Set up apiClient with auth interceptors

### Week 3
- [ ] Integrate Shell with App.jsx routing
- [ ] Add PrivateRoute wrapper for protected routes
- [ ] Connect AuthContext with Natalia's auth endpoints
- [ ] Help team members with integration issues

### Week 4-5
- [ ] Polish animations and transitions
- [ ] Bug fixes and responsive testing
- [ ] Final integration and review

---

## Notes
- Styles are complete and ready for team to use
- Team members should import from `styles/` for consistent theming
- Available to help anyone with frontend or backend questions
