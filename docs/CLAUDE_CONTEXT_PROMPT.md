# HUDDL Project - Claude Context Prompt

## WHO I AM

**Pablo** - 45-year-old career changer, 6 months into General Assembly's 9-month Software Engineering Immersive.

**Background:**

- 3rd degree black belt (Okinawan Goju Ryu)
- Realist artist
- Spatial sequence synesthesia (strong visual-spatial thinking)

**Learning Style:**

- Hands-on, step-by-step code tracing
- Pattern recognition over memorization
- Learn by TRACING actual code, not theoretical explanations
- Orchestrated a 36,366-line React capstone using AI tools

---

## THE PROJECT: HUDDL

**What:** Full-stack social media app (Django + React)  
**Team:** 5-person bootcamp project  
**My Role:** UI Lead  
**Timeline:** ~9 weeks until presentation

### Team Roles:

| Person         | Role                                             |
| -------------- | ------------------------------------------------ |
| Colin (Lead)   | Posts & Feed backend                             |
| Natalia        | Authentication                                   |
| Crystal        | Friends system                                   |
| Tito           | Utils, API client                                |
| **Pablo (Me)** | UI Lead - all styling, components, visual design |

### Tech Stack:

- **Frontend:** React 18+, Vite, React Router DOM
- **Backend:** Django 4.x, Django REST Framework, SQLite
- **Styling:** Vanilla CSS with custom design system (holographic/glassmorphic)

---

## CURRENT STATUS

| Area               | Status                               |
| ------------------ | ------------------------------------ |
| UI Components      | ✅ Complete                          |
| Design System      | ✅ Complete                          |
| Frontend Routing   | ✅ Working                           |
| Light Mode Theme   | ✅ Complete (on `light-mode` branch) |
| Backend Connection | ❌ Not started                       |
| Django Models      | ❌ Empty scaffolds                   |

### Active Branches:

| Branch               | Purpose                    |
| -------------------- | -------------------------- |
| `main`               | Production-ready           |
| `team-shell`         | Minimal scaffold for team  |
| `pablo-ui-architect` | My complete UI (protected) |
| `light-mode`         | Theme experimentation      |

---

## BRAND COLORS

```
Cyan:    #1a73e7
Magenta: #dc08bc
Aqua:    #1ae784
Gold:    #ffd700
```

---

## PROJECT STRUCTURE

```
huddl-app/
├── backend/           # Django + DRF (mostly empty)
│   ├── huddl/         # Project settings
│   ├── posts/, users/, friends/  # Django apps
│   └── manage.py
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/   # TopBar, SideNav, BottomNav
│   │   │   ├── pages/    # Home, Profile, Login, etc.
│   │   │   └── ui/       # Reusable components
│   │   ├── styles/       # design-const.css, utilities.css, light-mode.css
│   │   └── App.jsx, main.jsx
└── docs/
```

### Key Components:

- **Home:** Stories carousel, Composer, TimelineRiverFeed
- **Profile:** Flippable ProfileCard with analytics
- **Navigation:** Responsive SideNav (sidebar → bottom bar on mobile)
- **Light Mode:** Complete theme override (~1000 lines CSS)

---

## APPLICATION FLOW & COMPONENT HIERARCHY

### 🔴 Entry Point: How React Starts

```
index.html
    └── <div id="root">
            └── main.jsx (React mounts here)
                    └── App.jsx (Router wraps everything)
```

**File:** `main.jsx`

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> // 🔴 Everything starts here
  </StrictMode>
);
```

### 🟡 Orchestrator: App.jsx (Router)

```
App.jsx
├── BrowserRouter (enables URL routing)
└── AppContent
    ├── TopBar (header - hidden on auth/landing pages)
    ├── Blobs (background decoration)
    ├── Routes (decides which page to show)
    │   ├── "/" → Landing
    │   ├── "/home" → Home
    │   ├── "/login" → Login
    │   ├── "/signup" → SignUp
    │   ├── "/profile" → Profile
    │   ├── "/friends" → Friends
    │   └── "/about" → About
    └── SideNav (navigation - hidden on auth/landing pages)
```

### 🟢 Page Components (Workers)

Each page is in its own folder with CSS and sub-components:

```
src/components/pages/
├── Home/
│   ├── Home.jsx              # 🟢 Main feed page
│   ├── Home.css
│   ├── utils/
│   │   └── groupPosts.js     # 🔵 Groups posts by date/user
│   └── components/
│       ├── TimelineRiverFeed.jsx   # 🟢 Renders grouped posts
│       ├── TimelineRiverRow.jsx    # 🟢 Single row (3 columns)
│       └── MediaLightbox/          # 🟢 Expanded media view
│
├── Profile/
│   ├── Profile.jsx           # 🟢 Profile page
│   ├── Profile.css
│   └── components/
│       ├── ProfileCard/      # 🟢 Flippable card with stats
│       ├── ComposerModal/    # 🟢 Create post modal
│       └── TimelineRiver/    # 🟢 User's posts in 3 columns
│
├── Login/
│   ├── Login.jsx             # 🟢 Login form
│   └── Login.css
│
├── Signup/
│   ├── Signup.jsx            # 🟢 Registration form
│   └── Signup.css
│
└── [Landing, Friends, About] # Similar structure
```

### 🔵 Layout Components (Persistent UI)

```
src/components/layout/
├── TopBar/
│   ├── TopBar.jsx            # 🔵 Header with logo, search, actions
│   └── TopBar.css
├── SideNav/
│   ├── SideNav.jsx           # 🔵 Responsive nav (sidebar ↔ bottom)
│   └── SideNav.css
└── BottomNav/
    └── BottomNav.jsx         # 🔵 Mobile bottom navigation
```

### 🎨 Styles (Design System)

```
src/styles/
├── design-const.css    # Design tokens (colors, spacing, fonts)
├── utilities.css       # Reusable classes (.glass-panel, .btn-primary)
├── App.css             # Global app styles
├── Blobs.css           # Background blob animations
├── Buttons.css         # Button variants
├── Logo.css            # Logo styling
├── theme.css           # Theme variables
└── light-mode.css      # Light theme overrides (~1000 lines)
```

---

## DATA FLOW: Home Page Example

### Flow: User loads `/home`

```
1. 🔴 URL: /home
   │
2. 🟡 App.jsx matches route → renders <Home />
   │
3. 🟢 Home.jsx
   │   ├── useState: mockPosts (hardcoded data)
   │   ├── useState: activeCommentPostId, commentText
   │   │
   │   └── Returns JSX:
   │       ├── Composer section (click to open modal)
   │       ├── Stories carousel
   │       └── <TimelineRiverFeed posts={mockPosts} />
   │
4. 🟢 TimelineRiverFeed.jsx
   │   ├── Receives: posts prop
   │   ├── Calls: groupPostsByUserAndDay(posts) 🔵
   │   ├── Calls: sortGroupedPosts(grouped) 🔵
   │   │
   │   └── Maps over grouped data:
   │       └── <TimelineRiverRow rowData={data} />
   │
5. 🟢 TimelineRiverRow.jsx
   │   ├── Receives: rowData = { user, thoughts[], media[], milestones[] }
   │   ├── Renders 3 columns (or carousel on mobile)
   │   │
   │   └── For each post → renderPostCard(post, type)
   │
6. 🎨 CSS applies styling from Home.css, TimelineRiverRow.css
```

### Flow: User clicks on media → Lightbox opens

```
1. User clicks media card
   │
2. 🟢 TimelineRiverRow.jsx
   │   └── setExpandedMediaPost(post)  // useState updates
   │
3. Component re-renders with expandedMediaPost !== null
   │
4. 🟢 <MediaLightbox post={expandedMediaPost} onClose={...} />
   │
5. 🎨 MediaLightbox.css styles the overlay
```

---

## DATA FLOW: Profile Page Example

### Flow: User loads `/profile`

```
1. 🔴 URL: /profile
   │
2. 🟡 App.jsx matches route → renders <Profile />
   │
3. 🟢 Profile.jsx
   │   ├── useState: activeView ('timeline' | 'grid' | 'analytics')
   │   ├── useState: showComposer (boolean)
   │   │
   │   └── Returns JSX:
   │       ├── <ProfileCard /> (flippable)
   │       ├── View toggle buttons
   │       └── <TimelineRiver /> or grid view
   │
4. 🟢 ProfileCard.jsx
   │   ├── useState: isFlipped (boolean)
   │   ├── Front: Avatar, name, bio, stats
   │   └── Back: Analytics charts
   │
5. 🎨 CSS handles flip animation via transform: rotateY(180deg)
```

---

## KEY PATTERNS TO UNDERSTAND

### Pattern 1: Conditional Rendering

```jsx
{
  condition && <Component />;
} // Renders if condition is true
{
  condition ? <A /> : <B />;
} // Renders A or B based on condition
```

### Pattern 2: Props Flow Down

```jsx
// Parent passes data
<TimelineRiverFeed posts={mockPosts} />;

// Child receives via props
function TimelineRiverFeed({ posts }) {
  // Use posts here
}
```

### Pattern 3: State Lifts Up

```jsx
// Parent owns state
const [activeId, setActiveId] = useState(null);

// Parent passes setter to child
<Child onSelect={setActiveId} />

// Child calls parent's setter
<button onClick={() => onSelect(id)}>Select</button>
```

### Pattern 4: useEffect for Side Effects

```jsx
useEffect(() => {
  // Runs after render
  // Good for: API calls, subscriptions, timers
}, [dependency]); // Re-runs when dependency changes
```

---

## FUTURE: Service Layer (Not Built Yet)

When backend connects, add:

```
src/services/
├── apiClient.js       # Base HTTP client (Tito)
├── authService.js     # Login, signup, logout (Natalia)
├── postsService.js    # CRUD for posts (Colin)
└── friendsService.js  # Friend requests (Crystal)
```

**Pattern:**

```jsx
// Service handles API call
export const getPosts = async () => {
  const response = await apiClient.get("/api/posts/");
  return response.data;
};

// Component uses service
useEffect(() => {
  getPosts().then(setPosts);
}, []);
```

---

## TEAM PROTECTION STRATEGY

### Pablo OWNS (no modifications without approval):

- All `.css` files
- Component JSX structure
- `src/styles/*`, `src/components/layout/*`

### Teammates CAN:

- ✅ Add logic inside components (useState, handlers)
- ✅ Create service layer (`src/services/`)
- ✅ Build backend (Django apps)
- ✅ Pass props to components

### Teammates CANNOT:

- ❌ Modify JSX structure
- ❌ Add inline styles
- ❌ Create/modify CSS files
- ❌ Touch `pablo-ui-architect` branch

---

## HOW TO HELP ME

### Communication Preferences:

- Show code with inline comments FIRST, then explain
- Use color-coding: 🔴 Entry → 🟡 Orchestrator → 🟢 Worker → 🔵 Utility
- One step at a time with pauses
- Keep explanations SHORT and actionable
- Encourage when I doubt myself

### What I Need to Hear:

- ✅ "You're not a fraud - you orchestrated this"
- ✅ "Using AI is modern development"
- ✅ "Reverse-engineering is harder than writing from scratch"
- ✅ "Syntax clicks through repetition, not studying"

### What NOT to Say:

- ❌ Long theoretical explanations without code
- ❌ "You should have learned this first"
- ❌ "Just memorize the syntax"

---

## RECENT WORK (Update Each Session)

- Light mode CSS complete (~1000 lines)
- MediaLightbox styled for light mode
- Carousel buttons (mobile + desktop) styled
- Date headers styled
- Light Mode Integration plan documented
- Vectra Lee mock data fixed (3 post types)

---

## 9-WEEK LEARNING PLAN

| Weeks | Focus                                        |
| ----- | -------------------------------------------- |
| 1-3   | Django learning (class), backend scaffolding |
| 4-6   | Connect frontend to backend, debug           |
| 7-8   | Polish features, deep-dive code tracing      |
| 9     | Presentation prep, demo practice             |

---

## SUCCESS METRICS (Week 9)

**Must be able to:**

1. Demo working full-stack app
2. Explain component hierarchy
3. Trace data flow: user action → backend → UI
4. Justify architectural decisions
5. Handle technical interview questions

**Don't need to:**

- Explain every `&&` operator
- Memorize React docs
- Write code from scratch in interviews

---

_Paste this prompt to onboard a new Claude session with full project context._
