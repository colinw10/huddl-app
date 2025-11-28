# Modular Shell Plan - Team HUDDL

**Date:** November 28, 2025  
**Branch:** `pablo-modular-shell`  
**Author:** Pablo (UI Architect)

---

## Overview

This document outlines the complete plan for modularizing the HUDDL frontend, merging light/dark mode, and creating the final project shell that will be handed to the team.

---

## ⭐ The Three-Step Process

### Step 1: Modularize Everything First

**Goal:** Clean, organized structure before any merges happen.

| Task                          | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| Split components into folders | Each component gets its own folder with `.jsx` + `.scss`               |
| Split CSS into SCSS partials  | Global styles broken into `_variables`, `_mixins`, `_animations`, etc. |
| Clean structure               | Remove orphan files, consolidate duplicates                            |
| Consistent file names         | PascalCase for components, kebab-case for utilities                    |
| Placeholder logic + CSS       | Comment blocks for teammates to fill in                                |

**Why first?** Ensures the merge won't be messy. One source of truth.

---

### Step 2: Merge Light Mode + Dark Mode Branches

**Goal:** Unified theming system in one codebase.

| Before                       | After                                  |
| ---------------------------- | -------------------------------------- |
| Separate branches for themes | Single branch with CSS variable toggle |
| Duplicated styles            | Shared design tokens                   |
| Confusion for teammates      | Clear, unified system                  |

**Merge Strategy:**

1. Modularize this branch (`pablo-modular-shell`) first
2. Merge `light-mode` branch into this one
3. Resolve conflicts using the new SCSS architecture
4. Theme controlled by CSS variables + toggle component

**Why before shell?**

- Only ONE source of truth
- No duplicate work
- Unified design system
- No confusion for teammates
- Avoid rebuild/merge conflicts later

---

### Step 3: Create the Project Shell for the Team

**Goal:** Final skeleton with everything teammates need.

Deliverables:

- ✅ Full folder structure
- ✅ Placeholder components with comments
- ✅ Empty but documented SCSS files
- ✅ Design system with all tokens
- ✅ Unified light/dark theming
- ✅ Clear instructions for filling in components

---

## 📁 Target Folder Structure

```
frontend/src/
├── main.jsx                    # Entry point (imports main.scss)
├── App.jsx                     # Root component + routing
│
├── styles/                     # 🎨 GLOBAL SCSS ARCHITECTURE
│   ├── main.scss               # Single entry - imports all partials
│   ├── _variables.scss         # Design tokens, colors, spacing
│   ├── _mixins.scss            # Reusable SCSS mixins
│   ├── _reset.scss             # CSS reset / normalize
│   ├── _typography.scss        # Font families, sizes, weights
│   ├── _animations.scss        # Keyframes, animation utilities
│   ├── _utilities.scss         # Utility classes (.flex, .gap-md, etc.)
│   ├── _layout.scss            # App shell, main-content, containers
│   ├── _blobs.scss             # Background blob decorations
│   ├── _buttons.scss           # Button system
│   ├── _cards.scss             # Card system
│   ├── _glass.scss             # Glassmorphism utilities
│   └── _theme.scss             # Light/dark mode variables (empty for now)
│
├── components/
│   ├── layout/                 # 🏗️ LAYOUT COMPONENTS
│   │   ├── TopBar/
│   │   │   ├── TopBar.jsx
│   │   │   ├── TopBar.scss
│   │   │   ├── index.js
│   │   │   └── MessageModal/
│   │   │       ├── MessageModal.jsx
│   │   │       └── MessageModal.scss
│   │   ├── SideNav/
│   │   │   ├── SideNav.jsx
│   │   │   ├── SideNav.scss
│   │   │   └── index.js
│   │   └── BottomNav/
│   │       ├── BottomNav.jsx
│   │       ├── BottomNav.scss
│   │       └── index.js
│   │
│   ├── pages/                  # 📄 PAGE COMPONENTS
│   │   ├── Landing/
│   │   │   ├── Landing.jsx
│   │   │   ├── Landing.scss
│   │   │   └── index.js
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.scss
│   │   │   ├── index.js
│   │   │   └── components/     # Home-specific sub-components
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.scss
│   │   │   └── index.js
│   │   ├── Signup/
│   │   │   ├── Signup.jsx
│   │   │   ├── Signup.scss
│   │   │   └── index.js
│   │   ├── Profile/
│   │   │   ├── Profile.jsx
│   │   │   ├── Profile.scss
│   │   │   └── index.js
│   │   ├── Friends/
│   │   │   ├── Friends.jsx
│   │   │   ├── Friends.scss
│   │   │   └── index.js
│   │   └── About/
│   │       ├── About.jsx
│   │       ├── About.scss
│   │       └── index.js
│   │
│   └── ui/                     # 🧩 REUSABLE UI COMPONENTS
│       ├── ThemeToggle/
│       │   ├── ThemeToggle.jsx
│       │   ├── ThemeToggle.scss
│       │   └── index.js
│       ├── Button/
│       │   ├── Button.jsx
│       │   ├── Button.scss
│       │   └── index.js
│       ├── Card/
│       │   ├── Card.jsx
│       │   ├── Card.scss
│       │   └── index.js
│       ├── Input/
│       │   ├── Input.jsx
│       │   ├── Input.scss
│       │   └── index.js
│       └── Avatar/
│           ├── Avatar.jsx
│           ├── Avatar.scss
│           └── index.js
│
└── services/                   # 🔌 API + UTILITIES
    └── apiClient.js
```

---

## 🎨 SCSS Architecture

### Entry Point: `main.scss`

```scss
// ================================================
// HUDDL MAIN STYLESHEET
// Single entry point - imports all partials
// ================================================

// Foundation
@import "variables";
@import "mixins";
@import "reset";
@import "typography";

// Theme (light/dark mode support - merged later)
@import "theme";

// Base Styles
@import "layout";
@import "blobs";

// Component Systems
@import "buttons";
@import "cards";
@import "glass";

// Utilities (animations, helpers)
@import "animations";
@import "utilities";
```

### Partial: `_variables.scss`

Contains ALL design tokens - colors, spacing, typography, shadows, etc.  
_(Migrated from current `design-const.css`)_

### Partial: `_theme.scss`

```scss
// ================================================
// THEME VARIABLES
// Light/Dark mode support
// ================================================

// NOTE: This file is intentionally minimal.
// Full theme implementation will be added when
// light-mode branch is merged into this branch.

// Default: Dark mode (current app state)
:root {
  // Theme will be controlled by CSS variables
  // that get swapped based on data-theme attribute
}

// Light mode overrides (placeholder for merge)
// [data-theme="light"] {
//   // Light mode variables go here after merge
// }
```

---

## 📋 Implementation Checklist

### Phase 1: Install & Setup SCSS

- [ ] Install `sass` as dev dependency
- [ ] Create `/styles/main.scss` entry point
- [ ] Create SCSS partials structure
- [ ] Update `index.css` → `main.scss` import in `main.jsx`

### Phase 2: Migrate Global Styles

- [ ] Migrate `design-const.css` → `_variables.scss`
- [ ] Migrate `utilities.css` → `_utilities.scss` + `_buttons.scss` + `_cards.scss`
- [ ] Migrate `App.css` → `_layout.scss`
- [ ] Migrate `Blobs.css` → `_blobs.scss`
- [ ] Migrate `BackButton.css` → `_buttons.scss`
- [ ] Migrate `Logo.css` → `_typography.scss` or dedicated partial
- [ ] Leave `theme.css` → `_theme.scss` (empty, ready for merge)

### Phase 3: Modularize Components

- [ ] Ensure each component folder has matching `.scss`
- [ ] Convert all component `.css` files to `.scss`
- [ ] Add `index.js` barrel exports to each folder
- [ ] Update imports in `App.jsx` and components

### Phase 4: Add Placeholders & Comments

- [ ] Add placeholder comments in empty SCSS files
- [ ] Add teammate assignment comments in JSX files
- [ ] Document expected props/structure in components

### Phase 5: Documentation

- [ ] Write "Complete Shell" documentation
- [ ] Write "Modular Sass Architecture" guide
- [ ] Update TASKS.md files for team members

---

## 🔀 Merge Strategy (Step 2)

After modularization is complete:

```bash
# Make sure modular-shell is committed
git add .
git commit -m "feat: modularize frontend with SCSS architecture"

# Merge light-mode branch
git merge light-mode

# Resolve conflicts using new SCSS structure
# Theme variables go in _theme.scss
# Component overrides stay in component .scss files
```

---

## 👥 Team Handoff (Step 3)

Once merged, teammates receive:

1. **Clear folder structure** - Know exactly where their code goes
2. **Placeholder files** - Just fill in the blanks
3. **Design tokens** - Use `var(--color-cyan)` not `#1a73e7`
4. **Component templates** - Props documented, structure ready
5. **Style guide** - How to write SCSS in this project

---

## ⚠️ Critical Notes

1. **Don't break existing styles** - All migrations must be 1:1 visual match
2. **Keep `_theme.scss` minimal** - Full theming comes from merge
3. **Test after each migration** - Run dev server, check all pages
4. **Commit often** - Small, atomic commits for easy rollback

---

## 📝 One-Sentence Summary

> **Modularize first → Merge light/dark → THEN build the final shell you hand to the team.**
