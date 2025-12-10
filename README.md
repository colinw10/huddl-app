# huddl-app

## For the Team

This repo uses **Express analogies** throughout the Django backend to make learning easier for those of us coming from Node.js. All comments in the `backend/huddl/` folder compare Django concepts to Express equivalents (middleware, routing, config, etc.).

See **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** for setup instructions and a project structure breakdown.

## Project Structure

```
huddl-app/
├── backend/
│   ├── manage.py          # CLI tool (like "npm run" scripts)
│   ├── db.sqlite3         # Database file (like your .db or MongoDB data)
│   ├── venv/              # Virtual environment (like node_modules)
│   └── huddl/             # Main Django project folder
│       ├── settings.py    # Config file (like app.js setup + .env)
│       ├── urls.py        # Main router (like Express app.get/post)
│       ├── wsgi.py        # Production server entry (like server.listen())
│       ├── asgi.py        # Async server (like Socket.io setup)
│       └── __init__.py    # Package marker (no Express equivalent)
│
└── frontend/              # React app (TBD)
```

**Express → Django Quick Map:**

- `app.js` config → `settings.py`
- Route definitions → `urls.py`
- `app.use()` middleware → `MIDDLEWARE` array in settings
- Controllers → Views (coming when we build apps)
- Models → Models (Django ORM, like Mongoose/Sequelize)

## How Frontend & Backend Talk

```
User clicks "Post" button
    ↓
React (frontend) sends HTTP request
    ↓
Django (backend) receives request at /api/posts/
    ↓
Django saves to database
    ↓
Django sends response back
    ↓
React updates the UI
```

This is the same flow as Express + React. Django handles the backend API, React handles the UI.

## 🎨 Visual Identity & Theme System

Huddl features a **dual-theme design system** with distinct visual identities:

### Dark Mode (Default)

The primary experience - a **cyberpunk-inspired holographic UI**:

- **Color Palette**: Cyan (#4fffff), Purple (#c9a8ff), Green accent (#1ae784)
- **Holographic Elements**: Layered gradients, glowing accents, clip-path cut corners
- **Custom Iconography**:
  - Hexagon hub (Home) - represents the network center
  - Targeting reticle (Search) - precision finding
  - Connected nodes (Friends) - network graph visualization
  - Broadcast waves (Notifications) - signal pulses
  - Hexagon avatar frame (Profile) - consistent identity
- **Micro-interactions**: Energy-charge send button, gradient dividers, alternating hover colors
- **Depth System**: Layered backgrounds with ambient corner glows

### Light Mode (Toggle)

A clean, accessible alternative:

- Classic, universally-recognized icons
- High contrast for readability
- Familiar UI patterns for casual users

**Design Philosophy**: Dark mode is the "premium" immersive experience that showcases the app's unique identity. Light mode provides accessibility and familiarity. Users see the best of Huddl first, with the option to switch.

## Code Formatting

The frontend uses **Prettier** for consistent code formatting. After running `npm install` in the `frontend/` folder, VS Code will auto-format your code on save.

**Config:** `.prettierrc` enforces 2-space indentation, single quotes, and semicolons across the team.

---

## 🎯 Stretch Goals & Future Features

### Collaborative Thread Building

An innovative commenting system that goes beyond traditional linear threads:

**Concept:** Instead of simple reply chains, users can build "thought webs" where comments connect to multiple previous comments, creating a visual knowledge graph.

**Features:**

- **Quote & Connect**: Select text from any comment to build upon specific ideas
- **Visual Thread Connections**: Relationship lines show how ideas connect
- **Multi-parent Replies**: One comment can respond to multiple previous comments
- **Topic Clustering**: Related ideas automatically group together visually
- **Highlight Connections**: Hover over comments to see all related thoughts

**Why It's Innovative:**

- Facebook/Twitter use linear comment streams
- This creates a **conversation map** instead of a list
- Makes discussions more meaningful and easier to follow
- Helps surface the most important ideas and connections
- Encourages thoughtful responses rather than quick reactions

**Technical Implementation:**

- Text selection API to capture quoted content
- Graph data structure for comment relationships
- Visual indicators (borders, icons, animations) for connections
- Smart filtering to show/hide thread branches

This feature transforms social commenting from a stream into a collaborative knowledge-building tool.
