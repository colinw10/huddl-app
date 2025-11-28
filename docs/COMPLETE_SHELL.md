# Complete Shell Documentation

**Team HUDDL Frontend Architecture Guide**  
**Author:** Pablo (UI Architect)  
**Date:** November 28, 2025  
**Branch:** `pablo-modular-shell`

---

## Overview

This document explains the architecture, setup, and purpose of the HUDDL frontend project shell. It serves as the official team workflow guide for distributed development.

---

## Why We Modularized First

Before assigning tasks to teammates, we needed a **clean, organized codebase** that:

1. **Prevents merge conflicts** - Each component lives in its own folder
2. **Enables parallel work** - Teammates can work on isolated files
3. **Establishes conventions** - Consistent patterns everyone follows
4. **Creates a single source of truth** - One design system, one theming approach
5. **Makes onboarding easy** - New contributors know exactly where things go

---

## Folder Structure Strategy

Every component lives in its own folder with matching files:

```
ComponentName/
├── ComponentName.jsx    # React component logic
├── ComponentName.scss   # Component-specific styles
└── index.js             # Barrel export for clean imports
```

### Benefits:
- **Isolation** - Changes to one component don't affect others
- **Discoverability** - Easy to find all files related to a feature
- **Scalability** - Add more files (tests, utils) without restructuring

---

## Project Structure

```
frontend/src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root component + routing
│
├── styles/                     # 🎨 GLOBAL SCSS ARCHITECTURE
│   ├── main.scss               # Single entry - imports all partials
│   ├── _variables.scss         # Design tokens
│   ├── _mixins.scss            # Reusable Sass mixins
│   ├── _reset.scss             # CSS reset
│   ├── _typography.scss        # Font imports
│   ├── _theme.scss             # Light/dark mode (placeholder)
│   ├── _layout.scss            # App shell styles
│   ├── _blobs.scss             # Background decorations
│   ├── _buttons.scss           # Button system
│   ├── _cards.scss             # Card system
│   ├── _glass.scss             # Glassmorphism utilities
│   ├── _animations.scss        # Keyframes
│   └── _utilities.scss         # Helper classes
│
├── components/
│   ├── layout/                 # 🏗️ LAYOUT COMPONENTS
│   │   ├── TopBar/
│   │   ├── SideNav/
│   │   └── BottomNav/
│   │
│   ├── pages/                  # 📄 PAGE COMPONENTS
│   │   ├── Landing/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── Profile/
│   │   ├── Friends/
│   │   └── About/
│   │
│   └── ui/                     # 🧩 REUSABLE UI COMPONENTS
│       └── ThemeToggle/
│
└── services/                   # 🔌 API + UTILITIES
    └── apiClient.js
```

---

## Placeholder Logic & CSS

### JSX Placeholders

When creating new components, use this template:

```jsx
// 🔵 PABLO - UI Architect | 🟡 [TEAMMATE] - [RESPONSIBILITY]
// ComponentName.jsx - [Brief description]

import React from 'react';
import './ComponentName.scss';

function ComponentName() {
  // ============================================
  // STATE
  // [Teammate]: Add your state here
  // ============================================
  
  // ============================================
  // HANDLERS
  // [Teammate]: Add your event handlers here
  // ============================================
  
  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="component-name">
      {/* [Teammate]: Build your UI here */}
    </div>
  );
}

export default ComponentName;
```

### SCSS Placeholders

```scss
// ================================================
// COMPONENT NAME
// [Brief description of what this styles]
// ================================================
// 🔵 PABLO - UI Architect | 🟡 [TEAMMATE] - Styling
// ================================================

.component-name {
  // ============================================
  // LAYOUT
  // [Teammate]: Define structure here
  // ============================================
  
  // ============================================
  // TYPOGRAPHY
  // Use variables: var(--font-size-body), etc.
  // ============================================
  
  // ============================================
  // COLORS & EFFECTS
  // Use variables: var(--primary), var(--glow), etc.
  // ============================================
  
  // ============================================
  // RESPONSIVE
  // ============================================
  @media (max-width: 768px) {
    // Tablet styles
  }
  
  @media (max-width: 480px) {
    // Mobile styles
  }
}
```

---

## Unified Design System

### Using Design Tokens

**Never hardcode values.** Always use CSS variables:

```scss
// ❌ BAD
.button {
  background: #7cc9ff;
  padding: 16px;
  border-radius: 18px;
}

// ✅ GOOD
.button {
  background: var(--primary);
  padding: var(--space-md);
  border-radius: var(--radius);
}
```

### Available Tokens

| Category | Examples |
|----------|----------|
| Colors | `--primary`, `--secondary`, `--accent`, `--color-cyan`, `--color-magenta` |
| Surfaces | `--surface`, `--surface-hover`, `--surface-active` |
| Borders | `--border`, `--border-hover`, `--border-active` |
| Spacing | `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl` |
| Radius | `--radius-sm`, `--radius`, `--radius-lg`, `--radius-full` |
| Typography | `--font-main`, `--font-display`, `--font-size-body` |
| Effects | `--glow`, `--glow-strong`, `--shadow-md` |
| Transitions | `--transition`, `--transition-slow` |

---

## Light/Dark Mode

The theming system is ready for the light mode merge. After merging:

- Theme controlled by `[data-theme="light"]` or `[data-theme="dark"]`
- Variables automatically swap based on theme
- Components don't need to know about themes - they just use variables

---

## Distributed Teamwork

### How Tasks Are Assigned

1. Each teammate gets **specific components** to work on
2. Components are **isolated** - no stepping on each other's code
3. Styles use the **shared design system** for consistency
4. The architect (Pablo) handles **integration and layout decisions**

### Teammate Workflow

1. **Pull the latest** from the shell branch
2. **Find your component** in the structure
3. **Fill in the placeholders** following the patterns
4. **Use design tokens** - never hardcode values
5. **Test locally** before committing
6. **Commit often** with clear messages

---

## How to Fill In Components

### Step 1: Understand the Component

Read the comment header to understand:
- What the component does
- Who owns which part (UI vs API logic)

### Step 2: Add Your State

```jsx
// ============================================
// STATE
// ============================================
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
```

### Step 3: Add Your Handlers

```jsx
// ============================================
// HANDLERS
// ============================================
const handleSubmit = async (e) => {
  e.preventDefault();
  // Your logic here
};
```

### Step 4: Build Your UI

```jsx
return (
  <div className="component-name">
    <h1>Your Content</h1>
  </div>
);
```

### Step 5: Style It

Use the SCSS file with design tokens:

```scss
.component-name {
  background: var(--surface);
  padding: var(--space-lg);
  border-radius: var(--radius);
}
```

---

## Architect Integration

After teammates complete their components, the architect (Pablo) will:

1. **Review and merge** pull requests
2. **Integrate AuthContext** and global state
3. **Finalize layout decisions** (spacing, alignment)
4. **Ensure design consistency** across all components
5. **Handle routing and navigation** logic
6. **Optimize and refactor** as needed

---

## Quick Reference

### Import Patterns

```jsx
// Layout components
import TopBar from './components/layout/TopBar';

// Page components
import Home from './components/pages/Home';

// UI components
import Button from './components/ui/Button';
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProfileCard.jsx` |
| Styles | Match component | `ProfileCard.scss` |
| Utilities | camelCase | `groupPosts.js` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS.js` |

### Git Workflow

```bash
# Pull latest
git pull origin pablo-modular-shell

# Create feature branch
git checkout -b feature/my-component

# Work, commit often
git add .
git commit -m "feat: add profile card layout"

# Push and create PR
git push origin feature/my-component
```

---

## Summary

> **The shell provides structure. You provide the content.**

Follow the patterns, use the design tokens, and the final product will be cohesive and maintainable.

Questions? Ask Pablo (UI Architect).
