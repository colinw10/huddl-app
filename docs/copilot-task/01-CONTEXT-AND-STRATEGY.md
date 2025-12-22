markdown# NUMENEON TEAM REBUILD - Part 1: Context & Strategy

## HOW TO USE THESE FILES

This is Part 1 of 5. Read these files in order:

1. `01-CONTEXT-AND-STRATEGY.md` ← YOU ARE HERE
2. `02-PSEUDOCODE-EXAMPLES.md` - All 11 example templates
3. `03-BACKEND-INSTRUCTIONS.md` - Backend pseudocode tasks
4. `04-FRONTEND-INSTRUCTIONS.md` - Frontend pseudocode tasks
5. `05-TEAM-PLAN-FILES.md` - Team markdown file templates

---

## BACKGROUND & CONTEXT

I (Pablo) built a complete working prototype of NUMENEON (formerly HUDDL), a cyberpunk-themed social media app with React + Django. Now my 5-person bootcamp team will REBUILD portions of the codebase together as a learning exercise.

**Project Stack:**

- Frontend: React 18+, Vite, React Router DOM, Vanilla CSS/SCSS
- Backend: Django 4.x, Django REST Framework, SQLite (dev), JWT auth
- Current state: Fully functional prototype with real API connections

**Team (T-Shirt Sizing):**

- **Pablo (XL):** UI architect, designed entire system, professional artist background
- **Natalia (L):** Backend + Frontend, migration management
- **Colin (M):** Team lead, backend + frontend
- **Crystal (M):** Backend + frontend
- **Tito (S):** Infrastructure, utilities

---

## THE STRATEGY (REVISED)

### Original Plan:

Team rebuilds everything from pseudocode shells

### Revised Plan (More Realistic):

**Pablo's UI stays intact** - team rebuilds backend + state management layer

**Why the change:**

- Pablo's UI includes 75+ files with sophisticated animations (scan lines, 3D flips, glassmorphic effects)
- Even Pablo used AI tools to orchestrate this visual complexity
- Expecting bootcamp students to replicate sophisticated styling from pseudocode = unrealistic
- Learning value is in architecture, backend, state management - not replicating artist-level UI work

---

## BRANCH STRUCTURE

Create TWO branches from main:

1. **`team-shell-frontend` branch:**

   - Delete the entire `backend/` folder
   - Keep `frontend/` folder with all files
   - Add pseudocode to frontend files as instructed

2. **`team-shell-backend` branch:**
   - Delete the entire `frontend/` folder
   - Keep `backend/` folder with all files
   - Add pseudocode to backend files as instructed

These branches will be used to create separate repos in January.

---

## FILE VALIDATION (Already Completed)

- ✅ 148 files validated - almost all paths correct
- ❌ 1 incorrect path - `backend/users/admin.py` doesn't exist (removed)
- 📝 7 missing files added - 5 `index.js` for Pablo, 2 `__init__.py` for Natalia
- 🤝 ~27 shared/config files identified as "do not touch"

---

## FILE CATEGORIES & ASSIGNMENTS

### CATEGORY 1: KEEP INTACT (Pablo's UI - Add Usage Comments Only)

**All of Pablo's component files (~75 files):**

**Layout Components:**

- `frontend/src/App.jsx`
- All files in `frontend/src/components/layout/TopBar/` (including MessageModal with 8 SCSS partials)
- All files in `frontend/src/components/layout/SideNav/`

**Home Page System:**

- All files in `frontend/src/components/pages/Home/` including:
  - `Home.jsx`, `Home.scss`, `index.js`
  - `utils/groupPosts.js`
  - `components/DeleteConfirmModal/` (all files)
  - `components/MediaLightbox/` (all files + 7 SCSS partials)
  - `components/TimelineRiverFeed/` (all files)
  - `components/TimelineRiverRow/` (all files + 11 SCSS partials)

**Profile Page System:**

- All files in `frontend/src/components/pages/Profile/` including all subcomponents

**Other Pages:**

- `frontend/src/components/pages/About/` (all files)
- `frontend/src/components/pages/Landing/` (all files)
- `frontend/src/components/pages/NotFound/` (all files)

**Contexts:**

- `frontend/src/contexts/MessageContext.jsx`

**Global Design System (DO NOT TOUCH - 13 files):**

- All files in `frontend/src/styles/`

**What to do:** Keep implementation 100% intact, add brief USAGE comment block at top

---

### CATEGORY 2: ADD FULL PSEUDOCODE (Team Rebuilds These)

**NATALIA (L - 21 files total):**

Backend (11 files):

- `backend/users/models.py`, `views.py`, `serializers.py`, `urls.py`, `apps.py`
- `backend/users/__init__.py`
- `backend/users/management/__init__.py`, `commands/__init__.py`, `commands/create_test_user.py`
- `backend/users/migrations/0001_initial.py`, `__init__.py`

Frontend (10 files):

- `frontend/src/contexts/AuthContext.jsx`
- `frontend/src/components/pages/Login/` (Login.jsx, Login.scss, index.js)
- `frontend/src/components/pages/Signup/` (Signup.jsx, Signup.scss, index.js)
- `frontend/src/components/ui/ProtectedRoute.jsx`

**Special:** Migration management

---

**COLIN (M - 9 files total):**

Backend (7 files):

- `backend/posts/models.py`, `views.py`, `serializers.py`, `urls.py`, `apps.py`
- `backend/posts/__init__.py`, `admin.py`

Frontend (2 files):

- `frontend/src/contexts/PostsContext.jsx`
- `frontend/src/services/postsService.js`

---

**CRYSTAL (M - 12 files total):**

Backend (7 files):

- `backend/friends/models.py`, `views.py`, `serializers.py`, `urls.py`, `apps.py`
- `backend/friends/__init__.py`, `admin.py`

Frontend (5 files):

- `frontend/src/contexts/FriendsContext.jsx`
- `frontend/src/services/friendsService.js`
- `frontend/src/components/pages/Friends/` (Friends.jsx, Friends.scss, index.js)

---

**TITO (S - 6 files total):**

- `frontend/src/main.jsx`
- `frontend/src/services/apiClient.js`
- `frontend/src/contexts/ThemeContext.jsx`
- `frontend/src/components/ui/ThemeToggle/` (ThemeToggle.jsx, ThemeToggle.scss, index.js)

---

### CATEGORY 3: COLLABORATIVE FILES

- `backend/huddl/urls.py` - Each backend person adds their `include()` line
- `frontend/src/contexts/index.js` - Each context owner adds their export

---

### CATEGORY 4: SHARED FILES (~27 files - DO NOT TOUCH)

Backend Config: `manage.py`, `db.sqlite3`, `seed_posts.py`, `huddl/settings.py`, etc.
Frontend Config: `eslint.config.js`, `vite.config.js`, `package.json`, `index.html`
Global Styles: All 13 files in `frontend/src/styles/`

---

## PSEUDOCODE STYLE GUIDELINES

### Core Principle: "What + Why, Not How"

Every pseudocode TODO should:

1. State WHAT to build (the functionality)
2. Explain WHY it matters (integration context)
3. Show EXPECTED OUTPUT (data format for integration)
4. Give LEARNING PROMPTS ("Think about...")
5. NOT dictate HOW (they figure out implementation)

### Template:

```
// TODO: [What to build]
//
// [Why it matters / how it fits in the app]
//
// [Expected input/output format if relevant]
//
// Think about:
// - [Question that makes them reason about edge cases]
// - [Question about design decisions]
//
// Hint: [Gentle nudge toward React/Django feature, NOT exact code]
```

---

## MIGRATION WORKFLOW CLARIFICATION

- **Colin & Crystal:** Run `makemigrations` for their own apps
- **Natalia:** Reviews migration files, runs central `migrate` command
- Natalia is the gatekeeper, not the sole creator

---

## groupPosts.js DECISION

This file stays in Pablo's domain with full implementation intact.
Add a USAGE/reference comment explaining what it does.
It's NOT pseudocode - team just needs to understand its purpose.

---

## PLACEHOLDER COMPONENTS (Team Awareness)

Some UI components exist as placeholders with no backend:

| Component           | Location                       | Status      | Notes                                         |
| ------------------- | ------------------------------ | ----------- | --------------------------------------------- |
| **Engagement Ring** | ProfileCardFront.jsx (L78-101) | Placeholder | Decorative SVG animation only                 |
| **Share Button**    | TimelineRiverRow.jsx           | ✅ COMPLETE | Backend endpoint + frontend sharePost() wired |
| **Bookmark Button** | TimelineRiverRow.jsx           | Placeholder | No backend yet                                |

See `docs/stretch-goals/` for implementation plans.

---

## RECENT IMPLEMENTATION NOTES

**TimelineRiverFeed.jsx:**

- `useMemo` was REMOVED from post grouping logic for fresh renders
- Grouping now happens directly without memoization caching

**Home.jsx & Profile.jsx Inline Composers:**

- Both pages have inline quick-post composers with triangle submit button
- Triangle button is positioned INSIDE the input wrapper
- Cmd/Ctrl + Enter keyboard shortcut also submits
- Both call PostsContext `createPost()` directly

**ActivityVisualization.scss - Responsive Toggle Buttons (commit a7a57d8):**

- Wave/Heatmap toggle buttons now scale properly on all mobile sizes
- Breakpoints added: 600px, 480px, 375px (supports iPhone 6+)
- Toggle buttons: Reduced padding, min-width/height, icon sizes for small screens
- Activity header: Added `flex-wrap: wrap` for narrow viewports
- Activity meta: Hidden on screens ≤480px to prioritize toggle visibility
- Wave chart container: Responsive padding/border-radius adjustments
- CSS Location: `frontend/src/components/pages/Profile/components/ProfileCard/components/ActivityVisualization/ActivityVisualization.scss`

---

**NEXT:** Read `02-PSEUDOCODE-EXAMPLES.md` for all 11 example templates
