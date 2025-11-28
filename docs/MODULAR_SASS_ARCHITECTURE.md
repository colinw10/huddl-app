# Modular Sass Architecture

**Team HUDDL Style Guide**  
**Author:** Pablo (UI Architect)  
**Date:** November 28, 2025

---

## Overview

This document explains how HUDDL uses Sass and modular CSS according to industry conventions. It serves as the official style guide for Team HUDDL.

---

## Architecture Philosophy

Our Sass architecture follows the **7-1 Pattern** adapted for React:

- **Modular** - Each component has its own `.scss` file
- **DRY** - Shared styles live in partials
- **Scalable** - Easy to add new components
- **Maintainable** - Clear organization and naming

---

## Folder Structure

```
frontend/src/
├── styles/                     # Global SCSS
│   ├── main.scss               # Entry point (imports all partials)
│   ├── _variables.scss         # Design tokens
│   ├── _mixins.scss            # Reusable patterns
│   ├── _reset.scss             # CSS reset
│   ├── _typography.scss        # Font imports
│   ├── _theme.scss             # Light/dark mode
│   ├── _layout.scss            # App shell
│   ├── _blobs.scss             # Background decorations
│   ├── _buttons.scss           # Button system
│   ├── _cards.scss             # Card system
│   ├── _glass.scss             # Glassmorphism
│   ├── _animations.scss        # Keyframes
│   └── _utilities.scss         # Helper classes
│
└── components/
    └── ComponentName/
        ├── ComponentName.jsx
        └── ComponentName.scss  # Component-specific styles
```

---

## The Partials System

### Entry Point: `main.scss`

This is the single entry point that imports all partials in the correct order:

```scss
// Foundation (load first)
@import "variables";
@import "mixins";
@import "reset";
@import "typography";

// Theme
@import "theme";

// Layout
@import "layout";
@import "blobs";

// Components
@import "buttons";
@import "cards";
@import "glass";

// Utilities (load last)
@import "animations";
@import "utilities";
```

### Order Matters!

1. **Variables first** - Everything else depends on these
2. **Mixins second** - Can use variables
3. **Reset third** - Normalize browser defaults
4. **Typography fourth** - Font imports
5. **Theme fifth** - Can override variables
6. **Layout sixth** - App structure
7. **Components seventh** - UI patterns
8. **Utilities last** - Override anything if needed

---

## CSS Variables (Design Tokens)

All design values are stored as CSS custom properties in `_variables.scss`:

### Colors

```scss
:root {
  // Primary palette
  --primary: #7cc9ff;
  --secondary: #a783ff;
  --accent: #1ae784;

  // Brand colors
  --color-cyan: #1a73e7;
  --color-magenta: #dc08bc;
  --color-aqua: #1ae784;

  // Surfaces
  --surface: rgba(255, 255, 255, 0.02);
  --surface-hover: rgba(255, 255, 255, 0.06);
}
```

### Spacing

```scss
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}
```

### Typography

```scss
:root {
  --font-main: "degular", sans-serif;
  --font-display: "acme-gothic-extrawide", sans-serif;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-body: 0.95rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
}
```

---

## Mixins

Reusable patterns in `_mixins.scss`:

### Responsive Breakpoints

```scss
@mixin mobile {
  @media (max-width: 480px) {
    @content;
  }
}

@mixin tablet {
  @media (max-width: 768px) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: 1024px) {
    @content;
  }
}

// Usage
.component {
  padding: var(--space-lg);

  @include mobile {
    padding: var(--space-sm);
  }
}
```

### Glassmorphism

```scss
@mixin glass-effect($blur: 20px, $opacity: 0.02) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur($blur);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

// Usage
.card {
  @include glass-effect(15px, 0.04);
}
```

### Layout Helpers

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### Interactive States

```scss
@mixin hover-lift($distance: -2px) {
  transition: var(--transition);
  &:hover {
    transform: translateY($distance);
  }
}

@mixin active-scale($scale: 0.97) {
  &:active {
    transform: scale($scale);
  }
}
```

---

## Light/Dark Mode Theming

Themes are controlled by CSS variables that swap based on a data attribute:

```scss
// _theme.scss

// Default: Dark mode
:root {
  --bg-primary: #000711;
  --text-primary: rgba(255, 255, 255, 0.9);
  --surface: rgba(255, 255, 255, 0.02);
}

// Light mode overrides
[data-theme="light"] {
  --bg-primary: #f5f5f5;
  --text-primary: rgba(0, 0, 0, 0.9);
  --surface: rgba(0, 0, 0, 0.02);
}
```

Components just use variables - they don't know about themes:

```scss
.card {
  background: var(--surface);
  color: var(--text-primary);
}
```

---

## Naming Conventions

We use **BEM-inspired** naming with component prefixes:

### Pattern

```
.block
.block__element
.block--modifier
```

### Examples

```scss
// Block
.profile-card {
}

// Elements (children)
.profile-card__header {
}
.profile-card__avatar {
}
.profile-card__name {
}

// Modifiers (variations)
.profile-card--flipped {
}
.profile-card--compact {
}
```

### Component-Scoped Names

Each component uses its name as prefix to avoid conflicts:

```scss
// ProfileCard.scss
.profile-card {
}
.profile-card__header {
}

// TimelineRiver.scss
.timeline-river {
}
.timeline-river__row {
}
```

---

## Nesting Guidelines

### Do: Shallow Nesting (2-3 levels max)

```scss
.card {
  padding: var(--space-lg);

  &__header {
    display: flex;
  }

  &__title {
    font-size: var(--font-size-lg);
  }

  &:hover {
    transform: translateY(-2px);
  }
}
```

### Don't: Deep Nesting

```scss
// ❌ BAD - Too deep
.card {
  .header {
    .title {
      .icon {
        svg {
          path {
            fill: red;
          }
        }
      }
    }
  }
}
```

---

## Placeholder SCSS Rules

When creating new component styles, use this template:

```scss
// ================================================
// COMPONENT NAME
// Brief description of what this component does
// ================================================
// 🔵 PABLO - UI Architect | 🟡 [TEAMMATE] - Styling
// ================================================

.component-name {
  // ============================================
  // BASE LAYOUT
  // Define the component's structure
  // ============================================
  display: flex;
  flex-direction: column;

  // ============================================
  // SPACING
  // Use spacing variables
  // ============================================
  padding: var(--space-lg);
  gap: var(--space-md);

  // ============================================
  // VISUAL STYLE
  // Colors, borders, effects
  // ============================================
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);

  // ============================================
  // TYPOGRAPHY
  // Font styles for text content
  // ============================================
  font-family: var(--font-main);
  font-size: var(--font-size-body);
  color: var(--text-primary);

  // ============================================
  // INTERACTIVE STATES
  // Hover, focus, active
  // ============================================
  transition: var(--transition);

  &:hover {
    background: var(--surface-hover);
    box-shadow: var(--glow);
  }

  // ============================================
  // CHILD ELEMENTS
  // Nested components
  // ============================================
  &__header {
    @include flex-between;
  }

  &__content {
    flex: 1;
  }

  // ============================================
  // MODIFIERS
  // Variations of the component
  // ============================================
  &--active {
    border-color: var(--primary);
  }

  &--compact {
    padding: var(--space-sm);
  }

  // ============================================
  // RESPONSIVE
  // Mobile-first adjustments
  // ============================================
  @include tablet {
    padding: var(--space-md);
  }

  @include mobile {
    padding: var(--space-sm);
  }
}
```

---

## Importing Global Styles

### In Components

Component SCSS files can use global variables and mixins automatically because `main.scss` loads them first:

```scss
// ProfileCard.scss
.profile-card {
  // These work because _variables.scss is loaded globally
  background: var(--surface);
  padding: var(--space-lg);

  // Mixins work too
  @include glass-effect;
  @include hover-lift;
}
```

### No Need to @import in Components

Since we use Vite with Sass, all partials are available globally. Don't do this:

```scss
// ❌ DON'T DO THIS
@import "../../styles/variables";
@import "../../styles/mixins";

.component {
}
```

Just write your styles - variables and mixins are already available.

---

## Design System Reference

### Color Palette

| Token             | Value     | Usage                  |
| ----------------- | --------- | ---------------------- |
| `--primary`       | `#7cc9ff` | Primary actions, links |
| `--secondary`     | `#a783ff` | Secondary actions      |
| `--accent`        | `#1ae784` | Success, highlights    |
| `--color-cyan`    | `#1a73e7` | Brand cyan             |
| `--color-magenta` | `#dc08bc` | Brand magenta          |
| `--color-aqua`    | `#1ae784` | Brand aqua             |

### Spacing Scale

| Token        | Value  | Usage           |
| ------------ | ------ | --------------- |
| `--space-xs` | `4px`  | Tiny gaps       |
| `--space-sm` | `8px`  | Small gaps      |
| `--space-md` | `16px` | Default spacing |
| `--space-lg` | `24px` | Section spacing |
| `--space-xl` | `32px` | Large spacing   |

### Border Radius

| Token           | Value   | Usage           |
| --------------- | ------- | --------------- |
| `--radius-sm`   | `6px`   | Subtle rounding |
| `--radius`      | `18px`  | Default cards   |
| `--radius-lg`   | `24px`  | Large cards     |
| `--radius-full` | `999px` | Pills, circles  |

### Shadows & Glows

| Token           | Usage             |
| --------------- | ----------------- |
| `--glow`        | Subtle hover glow |
| `--glow-strong` | Prominent glow    |
| `--shadow-sm`   | Subtle depth      |
| `--shadow-md`   | Card shadows      |
| `--shadow-lg`   | Elevated elements |

---

## Best Practices

### ✅ Do

- Use CSS variables for all values
- Keep nesting shallow (2-3 levels)
- Use mixins for repeated patterns
- Follow BEM naming conventions
- Add responsive styles with mixins
- Comment sections clearly

### ❌ Don't

- Hardcode colors, sizes, or spacing
- Nest more than 3 levels deep
- Use `!important` (fix specificity instead)
- Create styles outside component folders
- Duplicate patterns that should be mixins

---

## Quick Reference Card

```scss
// Colors
var(--primary)          // Main brand color
var(--surface)          // Card backgrounds
var(--border)           // Borders

// Spacing
var(--space-sm)         // 8px
var(--space-md)         // 16px
var(--space-lg)         // 24px

// Typography
var(--font-main)        // Body font
var(--font-size-body)   // Default text size

// Effects
var(--glow)             // Hover glow
var(--transition)       // Default transition
var(--radius)           // Default border-radius

// Mixins
@include mobile {
} // < 480px
@include tablet {
} // < 768px
@include glass-effect; // Glassmorphism
@include hover-lift; // Lift on hover
@include flex-center; // Center content
```

---

## Summary

> **Use variables. Use mixins. Keep it modular.**

Follow these patterns and the entire app will look consistent, even with multiple teammates working on different components.

Questions? Ask Pablo (UI Architect).
