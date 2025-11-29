# Pablo - Architecture & Lead

## Role

Full-stack architecture, layout system, theming, and team integration support.

---

## Assigned Files

### Frontend - Core Architecture

| File                            | Status | Description                    |
| ------------------------------- | ------ | ------------------------------ |
| `src/App.jsx`                   | ←      | Router + Shell integration     |
| `src/contexts/ThemeContext.jsx` | ←      | Dark/light mode toggle         |
| `src/contexts/AuthContext.jsx`  | ←      | User auth state                |
| `src/contexts/index.js`         | ←      | Barrel export                  |
| `src/services/apiClient.js`     | ←      | Axios client with interceptors |

### Frontend - Layout Components

| File                               | Status | Description                         |
| ---------------------------------- | ------ | ----------------------------------- |
| `src/components/layout/Shell/`     | ←      | Main layout wrapper                 |
| `src/components/layout/TopBar/`    | ←      | Header with logo, search, user menu |
| `src/components/layout/SideNav/`   | ←      | Desktop sidebar navigation          |
| `src/components/layout/BottomNav/` | ←      | Mobile bottom navigation            |

### Frontend - Styles (COMPLETE ✓)

| File                          | Status | Description                        |
| ----------------------------- | ------ | ---------------------------------- |
| `src/styles/main.scss`        | ✓      | Main entry point                   |
| `src/styles/_variables.scss`  | ✓      | Theme colors, spacing, breakpoints |
| `src/styles/_mixins.scss`     | ✓      | Reusable SCSS mixins               |
| `src/styles/_glass.scss`      | ✓      | Glassmorphism effects              |
| `src/styles/_blobs.scss`      | ✓      | Animated background blobs          |
| `src/styles/_buttons.scss`    | ✓      | Button styles                      |
| `src/styles/_cards.scss`      | ✓      | Card styles                        |
| `src/styles/_light-mode.scss` | ✓      | Light theme overrides              |
| `src/styles/_animations.scss` | ✓      | Keyframe animations                |
| `src/styles/_typography.scss` | ✓      | Font styles                        |
| `src/styles/_layout.scss`     | ✓      | Layout utilities                   |
| `src/styles/_reset.scss`      | ✓      | CSS reset                          |
| `src/styles/_theme.scss`      | ✓      | Theme setup                        |
| `src/styles/_utilities.scss`  | ✓      | Utility classes                    |

### Backend - Config

| File                        | Status | Description                  |
| --------------------------- | ------ | ---------------------------- |
| `backend/huddl/settings.py` | ←      | CORS + JWT setup (with Tito) |

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

---

## How the Styling System Works (For Team Reference)

I've created a complete SCSS design system in `frontend/src/styles/`. This includes:

- **Colors** - Primary, secondary, accent, text colors, backgrounds
- **Spacing** - Consistent padding/margin values (8px base system)
- **Glass effects** - The frosted glass look used throughout the app
- **Buttons** - Pre-styled button variants
- **Cards** - Pre-styled card components
- **Animations** - Keyframe animations for blobs, fades, etc.
- **Light/Dark mode** - Automatic theme switching

**Team members don't need to create these from scratch.** Just import and use them.

### Example: How to Use in Your SCSS File

```scss
// At the TOP of your .scss file, add these imports:
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

// Now you can use the design system:
.my-component {
  // Use CSS variables for colors
  background: var(--surface);        // Semi-transparent background
  color: var(--text-primary);        // Main text color
  border: 1px solid var(--border);   // Subtle border
  
  // Use spacing variables
  padding: var(--space-md);          // 16px padding
  margin-bottom: var(--space-lg);    // 24px margin
  border-radius: var(--radius-md);   // Rounded corners
  
  // Use mixins (pre-made style recipes)
  @include glass-card;               // Adds glassmorphism effect
}

.my-button {
  @include button-primary;           // Styled primary button
}

.my-secondary-button {
  @include button-secondary;         // Styled secondary button
}
```

### What's a Mixin?

A mixin is like a recipe - it's a reusable chunk of CSS. Instead of writing 10 lines of glass effect code every time, you just write `@include glass-card;` and it adds all those styles for you.

### What's a CSS Variable?

CSS variables (like `var(--primary)`) are named values. Instead of remembering `#7cc9ff` is our primary blue, you just use `var(--primary)`. If we ever change the color, it updates everywhere automatically.

### Available Colors (Most Common)

| Variable | What It's For |
|----------|---------------|
| `var(--primary)` | Primary brand color (blue) |
| `var(--secondary)` | Secondary color (purple) |
| `var(--accent)` | Accent/success color (green) |
| `var(--text-primary)` | Main text |
| `var(--text-secondary)` | Subtle/muted text |
| `var(--surface)` | Card/component backgrounds |
| `var(--border)` | Subtle borders |
| `var(--error)` | Error states (red) |

### Available Spacing

| Variable | Size |
|----------|------|
| `var(--space-xs)` | 4px |
| `var(--space-sm)` | 8px |
| `var(--space-md)` | 16px |
| `var(--space-lg)` | 24px |
| `var(--space-xl)` | 32px |

### Questions?

If you're not sure how to style something, just ask Pablo!
