# CSS Refactoring Plan - Phase One

**Date:** November 21, 2025  
**Branch:** pablo-ui-architect  
**Current State:** ~9,803 total lines (36 CSS files, 16 JSX files, 31 Python files)

## Motivation

The CSS has grown organically to ~3,000+ lines across 36 files with:

- Inconsistent naming patterns
- Duplicate glassmorphic/gradient styles repeated 10+ times
- Hardcoded clip-path values scattered everywhere
- Unclear file organization (Home.css + FeedAdditions.css overlap)
- Magic numbers and colors with no semantic meaning

**Goal:** Create a maintainable, scalable design system before the codebase grows 3-4x.

---

## Phase 1: Design Tokens & Variables

### 1.1 Create `/frontend/src/styles/tokens.css`

Extract all repeated values into CSS custom properties:

```css
:root {
  /* ============ COLOR PALETTE ============ */

  /* Primary Colors */
  --color-cyan: #1a73e7;
  --color-cyan-rgb: 26, 115, 231;

  --color-magenta: #dc08bc;
  --color-magenta-rgb: 220, 8, 188;

  --color-aqua: #1ae784;
  --color-aqua-rgb: 26, 231, 132;

  /* Neutral */
  --color-white: #f9f9f9;
  --color-black: #0a0a0a;

  /* ============ OPACITY LEVELS ============ */

  --opacity-glass-subtle: 0.04;
  --opacity-glass-light: 0.08;
  --opacity-glass-medium: 0.12;
  --opacity-glass-heavy: 0.15;

  --opacity-border-subtle: 0.1;
  --opacity-border-medium: 0.15;
  --opacity-border-strong: 0.2;

  --opacity-text-muted: 0.5;
  --opacity-text-secondary: 0.7;
  --opacity-text-primary: 0.9;

  /* ============ GLASSMORPHISM ============ */

  /* Backgrounds */
  --glass-bg-subtle: rgba(255, 255, 255, var(--opacity-glass-subtle));
  --glass-bg-light: rgba(255, 255, 255, var(--opacity-glass-light));
  --glass-bg-medium: rgba(255, 255, 255, var(--opacity-glass-medium));
  --glass-bg-heavy: rgba(255, 255, 255, var(--opacity-glass-heavy));

  /* Borders */
  --glass-border-subtle: rgba(255, 255, 255, var(--opacity-border-subtle));
  --glass-border-medium: rgba(255, 255, 255, var(--opacity-border-medium));
  --glass-border-strong: rgba(255, 255, 255, var(--opacity-border-strong));

  /* Blur */
  --glass-blur-sm: blur(10px);
  --glass-blur-md: blur(15px);
  --glass-blur-lg: blur(25px);

  /* ============ GRADIENTS ============ */

  /* Spectral (3-color) */
  --gradient-spectral: linear-gradient(
    135deg,
    rgba(var(--color-aqua-rgb), 0.8),
    rgba(var(--color-cyan-rgb), 0.8),
    rgba(var(--color-magenta-rgb), 0.8)
  );

  --gradient-spectral-subtle: linear-gradient(
    135deg,
    rgba(var(--color-aqua-rgb), 0.12),
    rgba(var(--color-cyan-rgb), 0.12),
    rgba(var(--color-magenta-rgb), 0.12)
  );

  /* Cyan-Magenta */
  --gradient-cyan-magenta: linear-gradient(
    135deg,
    rgba(var(--color-cyan-rgb), 0.2),
    rgba(var(--color-magenta-rgb), 0.2)
  );

  /* Aqua-Cyan */
  --gradient-aqua-cyan: linear-gradient(
    135deg,
    var(--color-aqua),
    var(--color-cyan)
  );

  /* ============ COSMIC BLACK HOLOGRAPHIC ============ */

  --holographic-bg: linear-gradient(145deg, #0a0a0a, #000000), radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.1),
      transparent 50%
    ), radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.5), transparent 50%),
    linear-gradient(45deg, rgba(138, 43, 226, 0.05), rgba(0, 212, 255, 0.05), rgba(138, 43, 226, 0.05));

  --holographic-bg-size: 100% 100%, 150% 150%, 150% 150%, 200% 200%;
  --holographic-bg-position: 0% 50%, 75% 75%, 75% 75%, 50% 50%;
  --holographic-bg-blend: overlay, multiply, overlay;

  /* ============ CLIP PATHS (CHAMFERED CORNERS) ============ */

  --clip-chamfer-xs: polygon(
    6px 0,
    100% 0,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%,
    0 6px
  );

  --clip-chamfer-sm: polygon(
    8px 0,
    100% 0,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    0 100%,
    0 8px
  );

  --clip-chamfer-md: polygon(
    14px 0,
    100% 0,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    0 100%,
    0 14px
  );

  /* ============ SHADOWS ============ */

  /* Depth shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.3);

  /* Glow shadows */
  --glow-cyan: 0 0 20px rgba(var(--color-cyan-rgb), 0.3);
  --glow-cyan-strong: 0 0 30px rgba(var(--color-cyan-rgb), 0.5);

  --glow-magenta: 0 0 20px rgba(var(--color-magenta-rgb), 0.3);
  --glow-magenta-strong: 0 0 30px rgba(var(--color-magenta-rgb), 0.5);

  --glow-aqua: 0 0 20px rgba(var(--color-aqua-rgb), 0.3);
  --glow-aqua-strong: 0 0 30px rgba(var(--color-aqua-rgb), 0.5);

  /* Inset shadows */
  --shadow-inset-light: inset 0 1px 2px rgba(255, 255, 255, 0.1);
  --shadow-inset-dark: inset 0 -1px 3px rgba(0, 0, 0, 0.3);

  /* ============ TYPOGRAPHY ============ */

  /* Font families */
  --font-display: "acme-gothic-extrawide", sans-serif;
  --font-body: "degular", sans-serif;
  --font-ui: "sweet-square-pro", sans-serif;

  /* Font sizes */
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 14px;
  --text-md: 15px;
  --text-lg: 16px;
  --text-xl: 18px;

  /* ============ SPACING ============ */

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;

  /* ============ TRANSITIONS ============ */

  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.4s ease;
  --transition-bouncy: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ============ BORDER RADIUS ============ */

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 50%;
}
```

---

## Phase 2: Utility Classes

### 2.1 Create `/frontend/src/styles/utilities.css`

Extract common patterns into reusable classes:

```css
/* ============ GLASS CARDS ============ */

.glass-card {
  background: var(--glass-bg-light);
  backdrop-filter: var(--glass-blur-sm);
  -webkit-backdrop-filter: var(--glass-blur-sm);
  border: 1px solid var(--glass-border-medium);
  box-shadow: var(--shadow-md), var(--shadow-inset-light);
}

.glass-card-chamfered {
  background: var(--glass-bg-light);
  backdrop-filter: var(--glass-blur-sm);
  -webkit-backdrop-filter: var(--glass-blur-sm);
  border: 1px solid var(--glass-border-medium);
  clip-path: var(--clip-chamfer-md);
  box-shadow: var(--shadow-md), var(--shadow-inset-light);
}

.glass-input {
  background: var(--holographic-bg);
  background-size: var(--holographic-bg-size);
  background-position: var(--holographic-bg-position);
  background-blend-mode: var(--holographic-bg-blend);
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: var(--glass-blur-sm);
  -webkit-backdrop-filter: var(--glass-blur-sm);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8), var(--shadow-inset-light), var(
      --shadow-inset-dark
    );
}

/* ============ GLOWS ============ */

.glow-cyan {
  box-shadow: var(--glow-cyan);
}

.glow-cyan-strong {
  box-shadow: var(--glow-cyan-strong);
}

.glow-magenta {
  box-shadow: var(--glow-magenta);
}

.glow-aqua {
  box-shadow: var(--glow-aqua);
}

/* ============ BORDERS ============ */

.border-left-cyan {
  border-left: 3px solid rgba(var(--color-cyan-rgb), 0.6);
}

.border-left-magenta {
  border-left: 3px solid rgba(var(--color-magenta-rgb), 0.6);
}

.border-left-yellow {
  border-left: 3px solid rgba(255, 215, 0, 0.6);
}

/* ============ GRADIENTS ============ */

.bg-gradient-spectral {
  background: var(--gradient-spectral);
}

.bg-gradient-spectral-subtle {
  background: var(--gradient-spectral-subtle);
}

.text-gradient-aqua-cyan {
  background: var(--gradient-aqua-cyan);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ============ CHAMFERS ============ */

.chamfer-xs {
  clip-path: var(--clip-chamfer-xs);
  -webkit-clip-path: var(--clip-chamfer-xs);
}

.chamfer-sm {
  clip-path: var(--clip-chamfer-sm);
  -webkit-clip-path: var(--clip-chamfer-sm);
}

.chamfer-md {
  clip-path: var(--clip-chamfer-md);
  -webkit-clip-path: var(--clip-chamfer-md);
}
```

---

## Phase 3: Component Naming Audit

### Current Naming Issues:

| Current Name              | Used In              | Proposed Rename           | Reasoning                                      |
| ------------------------- | -------------------- | ------------------------- | ---------------------------------------------- |
| `river-post-card`         | TimelineRiverRow.css | `post-card`               | "River" is implementation detail, not semantic |
| `feed-post`               | Home.css             | **DELETE**                | Duplicate of river-post-card                   |
| `composer-input`          | FeedAdditions.css    | Keep                      | Makes sense                                    |
| `comment-input`           | TimelineRiverRow.css | Keep                      | Makes sense                                    |
| `story-card`              | Home.css             | Keep                      | Clear & semantic                               |
| `inline-comment-composer` | TimelineRiverRow.css | `comment-composer`        | "inline" is redundant                          |
| `river-avatar`            | TimelineRiverRow.css | `avatar` or `user-avatar` | Too specific                                   |
| `river-author`            | TimelineRiverRow.css | `post-author`             | Clearer                                        |
| `river-post-content`      | TimelineRiverRow.css | `post-content`            | Shorter                                        |
| `river-post-likes`        | TimelineRiverRow.css | `post-likes`              | Shorter                                        |
| `river-action-btn`        | TimelineRiverRow.css | `post-action-btn`         | Clearer                                        |

---

## Phase 4: File Consolidation Plan

### Current Structure (messy):

```
src/styles/
  App.css
  BackButton.css
  Blobs.css
  Buttons.css
  Logo.css

src/components/pages/Home/
  Home.css (526 lines)
  FeedAdditions.css (489 lines)
  components/
    TimelineRiverRow.css (548 lines)
    TimelineRiverFeed.css (minimal)

src/components/pages/Profile/
  Profile.css (large)
  Profile-backup.css (DELETE THIS)
  components/
    ProfileCard/ProfileCard.css
    TimelineRiver/TimelineRiver.css
    ComposerModal/ComposerModal.css
```

### Proposed Structure (organized):

```
src/styles/
  tokens.css          ← NEW: All design tokens
  utilities.css       ← NEW: Reusable utility classes
  App.css             ← Keep: Global app styles
  Blobs.css           ← Keep: Background blob animations

src/styles/components/  ← NEW FOLDER
  avatar.css          ← Extracted: All avatar styles
  buttons.css         ← Consolidated from Buttons.css
  cards.css           ← NEW: Glass cards, post cards, story cards
  inputs.css          ← NEW: All input/textarea styles
  modals.css          ← NEW: Modal overlays & containers

src/components/pages/Home/
  Home.css            ← SLIM DOWN: Only page-level layout
  components/
    TimelineRiverRow.css  ← REFACTOR: Use utilities

src/components/pages/Profile/
  Profile.css         ← SLIM DOWN: Only page-level layout
  components/
    ProfileCard/ProfileCard.css    ← Keep
    TimelineRiver/TimelineRiver.css ← Keep
    ComposerModal/ComposerModal.css ← Keep
```

---

## Phase 5: Refactoring Checklist

### Week 1: Foundation

- [ ] Create `tokens.css` with all variables
- [ ] Create `utilities.css` with common patterns
- [ ] Update `index.css` or `App.jsx` to import new files
- [ ] Test: Ensure app still looks identical

### Week 2: Component Cleanup

- [ ] Refactor `TimelineRiverRow.css`:

  - [ ] Replace hardcoded values with tokens
  - [ ] Rename `river-*` classes to `post-*`
  - [ ] Extract duplicate styles to utilities
  - [ ] Update JSX classNames

- [ ] Merge `Home.css` + `FeedAdditions.css`:

  - [ ] Move shared styles to utilities
  - [ ] Keep only page-specific layout in Home.css
  - [ ] Delete FeedAdditions.css

- [ ] Delete `Profile-backup.css`

### Week 3: Polish

- [ ] Create `src/styles/components/` folder
- [ ] Extract avatar, button, card, input styles
- [ ] Update all imports across project
- [ ] Run visual regression tests
- [ ] Document new system in README

---

## Success Metrics

**Before:**

- 36 CSS files, ~3,000+ lines
- Duplicate glassmorphic styles: 10+ instances
- Hardcoded clip-paths: 15+ instances
- Inconsistent naming: 50+ classes

**After:**

- ~20 CSS files, ~2,000 lines (33% reduction)
- 1 source of truth for design tokens
- Reusable utility classes
- Consistent, semantic naming
- New features use existing utilities (faster development)

---

## Risk Mitigation

1. **Visual Regression:** Take screenshots before/after each phase
2. **Git Strategy:** Create refactor branch, small commits per file
3. **Rollback Plan:** Each phase is independently revertible
4. **Testing:** Manual QA on all pages after each phase

---

## Next Steps

1. Get approval for this plan
2. Create feature branch: `refactor/css-phase-one`
3. Start with Phase 1 (tokens.css)
4. Progress through phases with PRs
5. Document final system in `docs/design-system.md`
