# Pablo's UI Files (Size: XL)

## Your Mission

Your UI is complete and working! Your job is NOT to code - it's to **document** what you built so the team understands how to integrate with it. Add usage comments to your component files explaining what data they expect and how they connect to the backend.

## What You're Doing

**Adding usage documentation only - NOT modifying implementation!**

For each of your ~75 component files, add a comment block at the top that explains:

- What the component does
- What data it expects (format, shape)
- What context/services it consumes
- Integration points with backend team's work

## Your Files (~75 total)

### Entry & Layout

- `frontend/src/App.jsx` - Main app component, routing
- `frontend/src/components/layout/TopBar/` - Top navigation bar (3 files + MessageModal with 8 SCSS partials)
- `frontend/src/components/layout/SideNav/` - Side navigation menu (3 files)

### Home Page System

- `frontend/src/components/pages/Home/` - Main feed page (3 files)
  - `Home.jsx`, `Home.scss`, `index.js`
  - `utils/groupPosts.js` - Utility for organizing posts
  - `components/DeleteConfirmModal/` - Confirmation dialog (3 files)
  - `components/MediaLightbox/` - Image viewer modal (2 files + 7 SCSS partials)
  - `components/TimelineRiverFeed/` - Main feed container (3 files)
  - `components/TimelineRiverRow/` - Individual feed rows (2 files + 11 SCSS partials)

### Profile Page System

- `frontend/src/components/pages/Profile/` - User profile page (3 files)
  - `Profile.jsx`, `Profile.scss`, `index.js`
  - `components/ComposerModal/` - Post creation modal (3 files)
  - `components/ProfileCard/` - User profile card with flip animation (5 subcomponents with flip system)
  - `components/TimelineRiver/` - Profile timeline view (3 files)

### Other Pages

- `frontend/src/components/pages/About/` - About page (3 files)
- `frontend/src/components/pages/Landing/` - Landing/marketing page (3 files)
- `frontend/src/components/pages/NotFound/` - 404 error page (3 files)

### Contexts

- `frontend/src/contexts/MessageContext.jsx` - Message system state (already built)

### Assets

- `frontend/src/assets/huddl-logo.svg` - Logo file

### Design System (DO NOT TOUCH - REFERENCE ONLY)

- `frontend/src/styles/` - All 13 global SCSS files
  - `main.scss` - Entry point
  - `_variables.scss` - CSS custom properties for colors, spacing, etc.
  - `_mixins.scss` - Reusable styles (glass-card, neon-glow, etc.)
  - `_animations.scss` - Keyframes and transitions
  - `_buttons.scss` - Button component styles
  - `_blobs.scss` - Animated background decorations
  - And more...

---

## Usage Comment Template

Add this to the top of each JSX component file:

```javascript
/**
 * COMPONENT USAGE (For Team Reference)
 *
 * Purpose: [Brief description of what this component does]
 *
 * Data Requirements:
 * - Consumes: [Which context/service it uses - e.g., "PostsContext via usePosts() hook"]
 * - Expects: [What data format it needs - e.g., "posts array from context"]
 * - Uses: [Any utilities or helper functions]
 *
 * Expected Data Format:
 * [Show the exact shape of data this component expects, e.g.:
 *  {
 *    id: number,
 *    author: { username: string, profile_picture: string },
 *    content: string,
 *    ...
 *  }
 * ]
 *
 * Integration Points:
 * - Used by: [What component renders this - e.g., "Home.jsx"]
 * - Renders: [What child components this renders - e.g., "TimelineRiverRow"]
 * - Calls: [What functions it calls - e.g., "PostsContext.createPost()"]
 *
 * Team Integration:
 * - [Name]: [What they need to build to support this component]
 * - [Name]: [What they need to ensure about data format]
 *
 * DO NOT MODIFY THIS FILE
 * This is Pablo's complete UI implementation. Your job is to build the
 * backend and contexts that provide data in the format this component expects.
 */
```

---

## Key Integration Points to Document

### For Home/Timeline Components

**What Colin needs to know:**

- TimelineRiverFeed expects posts array with specific format
- Posts must have `type` field ('thought', 'media', 'milestone') for column placement
- Posts must include nested author object (username, profile_picture)
- ComposerModal calls PostsContext.createPost() to add new posts

### For Profile Components

**What Colin + Natalia need to know:**

- ProfileCard expects user object with username, bio, profile_picture
- TimelineRiver (on profile) filters posts by author
- ComposerModal on profile defaults to current user

### For Friends Page

**What Crystal needs to know:**

- (Crystal is building this page herself - no documentation needed from you)

### For TopBar/Nav Components

**What team needs to know:**

- TopBar uses AuthContext.logout() for logout button
- TopBar uses ThemeContext.toggleTheme() for theme switch
- MessageModal uses MessageContext for messages (mock data for now)
- NotificationModal will use FriendsContext for friend requests (mock data for now)

---

## Example: Documented TimelineRiverFeed.jsx

```javascript
/**
 * COMPONENT USAGE (For Team Reference)
 *
 * Purpose: Main feed component that displays posts in a 3-column "river" layout
 * - Left column: 'thought' posts (text-only)
 * - Center column: 'media' posts (with images)
 * - Right column: 'milestone' posts (achievements)
 *
 * Data Requirements:
 * - Consumes: PostsContext via usePosts() hook
 * - Expects: posts array from context
 * - Uses: groupPosts utility (organizes posts by user+date)
 *
 * Expected Data Format (from backend):
 * {
 *   id: number,
 *   author: { id: number, username: string, profile_picture: string },
 *   type: 'thought' | 'media' | 'milestone',
 *   content: string,
 *   image: string | null,
 *   created_at: ISO timestamp string (e.g., "2024-12-19T10:00:00Z"),
 *   parent: number | null
 * }
 *
 * Integration Points:
 * - Used by: Home.jsx (main feed page)
 * - Renders: TimelineRiverRow components for each user/date group
 * - Calls: PostsContext.fetchPosts() on component mount
 *
 * Team Integration:
 * - Colin: Build PostsContext to provide the posts array in above format
 * - Colin: Build postsService to fetch from /api/posts/
 * - Colin: Ensure backend /api/posts/ returns posts matching above format
 * - Natalia: Ensure author data includes id, username, profile_picture
 *
 * DO NOT MODIFY THIS FILE
 * This is Pablo's complete UI implementation. Your job is to build the
 * backend and contexts that provide data in the format this component expects.
 */

import { usePosts } from "../../../contexts/PostsContext";
import { groupPosts } from "../utils/groupPosts";
import TimelineRiverRow from "../TimelineRiverRow";
import "./TimelineRiverFeed.scss";

// ... Pablo's complete implementation (DO NOT MODIFY) ...
```

---

## Your Task Checklist

- [ ] Add usage comments to all Home page components
- [ ] Add usage comments to all Profile page components
- [ ] Add usage comments to TopBar and SideNav components
- [ ] Add usage comments to About, Landing, NotFound pages
- [ ] Add usage comments to App.jsx
- [ ] Document MessageContext.jsx integration points
- [ ] Keep ALL implementation code unchanged
- [ ] Focus on data format expectations and integration points

---

## Design System Documentation

Your global styles are the team's design foundation. Make sure they know:

**Variables Available** (`_variables.scss`):

- Colors: `--bg-primary`, `--text-primary`, `--color-accent`, etc.
- Spacing: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, etc.
- Typography: `--font-main`, `--font-title`, `--font-size-body`, etc.
- Theme switching: CSS variables change automatically based on `data-theme='light'` or `data-theme='dark'`

**Mixins Available** (`_mixins.scss`):

- `@include glass-card` - Glassmorphic card background
- `@include neon-glow($color)` - Cyberpunk glow effect
- `@include fade-in($duration)` - Fade in animation
- Many more...

**Pre-built Button Classes** (`_buttons.scss`):

- `.btn-primary` - Main action button
- `.btn-secondary` - Secondary action button
- `.btn-danger` - Destructive action button
- All buttons theme-aware (adapt to light/dark mode)

**Team Usage:**

- Natalia: Use these for Login/Signup styling
- Crystal: Use these for Friends page styling
- Tito: Use these for ThemeToggle styling

---

## Important Reminders

1. **Don't modify your implementation** - just add documentation
2. **Be specific about data formats** - team needs exact field names and types
3. **Highlight critical integration points** - where your UI calls context functions
4. **Note column logic** - post type determines Timeline River column
5. **Reference design system** - so team knows what's available for their components
