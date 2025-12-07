# CSS Architecture Refactor - TODO

## 🎯 Goal

Achieve 9-10/10 CSS architecture by converting hardcoded colors to theme-aware semantic variables. Components should automatically adapt to dark/light mode without needing `_light-mode.scss` overrides.

## 📊 Progress So Far

- **`_light-mode.scss`**: 571 lines (down from 1203) - **52% reduction**
- **`!important` count**: ~110 (down from 289) - **62% reduction**
- **Commits**: 5a8456f, 644f2c0, de5394f, 1a6224c

## ✅ Completed

### Semantic Variables Added (`_variables.scss`)

```scss
// These change automatically with [data-theme="light"]
--bg-base, --bg-card, --bg-card-solid, --bg-card-hover
--bg-glass, --bg-glass-hover, --bg-input, --bg-overlay
--text-primary, --text-secondary, --text-muted, --text-placeholder
--border-default, --border-strong, --border-subtle, --border-focus
--shadow-card, --shadow-card-hover, --shadow-focus
--surface, --surface-hover, --glow, --glow-strong
```

### Components Converted

- ✅ `SideNav.scss` - Light mode uses semantic variables
- ✅ `BottomNav.scss` - Light mode uses semantic variables
- ✅ `TopBar.scss` - Core elements converted
- ✅ `TimelineRiver.scss` (Profile) - Fully converted
- ✅ `_cards.scss` - Uses semantic variables

### Partial Conversions

- 🔄 `TimelineRiverRow.scss` - Modal, buttons, avatars converted (18 rgba values remain)
- 🔄 `Home.scss` - story-name, composer-section converted

## 🔴 TODO - Files to Convert

### High Priority (Most Visible)

1. **`TimelineRiverRow.scss`** (1873 lines)
   - ~18 remaining `rgba(255, 255, 255, ...)` values
   - Focus on: `.river-content`, `.river-post-body`, action buttons
2. **`Home.scss`**

   - Story cards, composer section
   - Feed container backgrounds

3. **`MediaLightbox.scss`**
   - Modal backgrounds, text colors
   - Comment section

### Medium Priority

4. **`Profile.scss`** / **`ProfileCard.scss`**
   - Avatar containers, stat displays
5. **`Landing.scss`** / **`Login.scss`**

   - Auth forms, hero sections

6. **`MessageModal.scss`**
   - Chat UI elements

### Lower Priority

7. **`Friends.scss`**
8. **`About.scss`**

## 📋 Conversion Pattern

### Before (hardcoded):

```scss
.my-element {
  background: rgba(15, 20, 30, 0.95);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### After (semantic):

```scss
.my-element {
  background: var(--bg-card-solid);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}
```

Then remove corresponding override from `_light-mode.scss`.

## ⚠️ IMPORTANT - Preserve These!

- **Hexagonal clip-paths** on carousel buttons, story cards
- **Cyberpunk cut-corner clip-paths** on cards
- **Gradient borders** (spectral/neon effects)
- **Dark signature composers** (they stay dark in light mode intentionally)

## 🧹 Cleanup After Conversion

Once components use semantic variables, remove their overrides from `_light-mode.scss`. The goal is to minimize `_light-mode.scss` to only:

1. Legacy variable aliases (bridge for unconverted components)
2. Signature dark elements (composers that stay dark)
3. Special cases that truly need different treatment

## 📚 Variable Reference

| Semantic Variable  | Dark Mode                   | Light Mode                 |
| ------------------ | --------------------------- | -------------------------- |
| `--bg-base`        | `#0a0a0f`                   | `#f5f5f7`                  |
| `--bg-card`        | `rgba(15, 15, 25, 0.9)`     | `#ffffff`                  |
| `--bg-glass`       | `rgba(255, 255, 255, 0.04)` | `rgba(255, 255, 255, 0.8)` |
| `--text-primary`   | `#ffffff`                   | `#000000`                  |
| `--text-secondary` | `rgba(255, 255, 255, 0.65)` | `rgba(0, 0, 0, 0.65)`      |
| `--text-muted`     | `rgba(255, 255, 255, 0.45)` | `rgba(0, 0, 0, 0.45)`      |
| `--border-default` | `rgba(255, 255, 255, 0.1)`  | `rgba(0, 0, 0, 0.1)`       |

---

## 🔄 Phase 2: File Structure Refactoring

### ✅ Completed - rgba(255,255,255) Conversion (Dec 3, 2025)

Converted ~118 hardcoded `rgba(255,255,255,...)` values to semantic variables:

| File                       | Before | After | Converted |
| -------------------------- | ------ | ----- | --------- |
| MediaLightbox.scss         | 28     | 9     | 19        |
| ActivityVisualization.scss | 27     | 1     | 26        |
| ComposerModal.scss         | 26     | 5     | 21        |
| Home.scss                  | 25     | 16    | 9         |
| MessageModal.scss          | 25     | 10    | 15        |
| Profile.scss               | 22     | 12    | 10        |
| ProfileCard.scss           | 9      | 2     | 7         |
| Landing.scss               | 8      | 6     | 2         |
| Login.scss                 | 14     | 9     | 5         |
| TimelineRiverFeed.scss     | 3      | 1     | 2         |
| BottomNav.scss             | 5      | 3     | 2         |

**Also added:** Black holographic inputs for Login/Signup forms in light mode (`_light-mode.scss`)

### ✅ Completed - Component Folder Organization (Dec 3, 2025)

Moved loose files into proper component folders:

| Component            | Status                                                              |
| -------------------- | ------------------------------------------------------------------- |
| `TimelineRiverFeed/` | ✅ Created folder with `TimelineRiverFeed.jsx`, `.scss`, `index.js` |
| `TimelineRiverRow/`  | ✅ Created folder with `TimelineRiverRow.jsx`, `.scss`, `index.js`  |

Import paths updated in:

- `TimelineRiverFeed.jsx` → `../../utils/groupPosts`, `../TimelineRiverRow`
- `TimelineRiverRow.jsx` → `../MediaLightbox/MediaLightbox`

### ✅ Completed - Reusable Mixins (Dec 3, 2025)

Added new mixins to `_mixins.scss`:

**Auth Form Mixins:**

- `@include auth-animations` - Keyframes for auth pages
- `@include auth-back-button` - Back button styling
- `@include auth-container` - Full page wrapper
- `@include auth-card` - Holographic card container
- `@include auth-input` - Holographic form input
- `@include auth-submit-button` - Blob-shaped submit button

**Signature Pattern Mixins:**

- `@include holographic-card-bg($animate)` - Cosmic black background
- `@include cyberpunk-input` - Dark input with cyan accents
- `@include glass-card-chamfered($corner-size)` - Cut-corner glass card
- `@include spectral-border` - Animated gradient border
- `@include hover-glow-spectral` - Rainbow glow on hover
- `@include depth-shadow-3d` - Top light rim 3D effect

---

## 📁 Current Architecture

```
components/
├── layout/
│   ├── TopBar/
│   │   ├── TopBar.jsx, .scss
│   │   └── MessageModal/
│   ├── SideNav/
│   └── BottomNav/
├── pages/
│   ├── Home/
│   │   ├── Home.jsx, .scss
│   │   └── components/
│   │       ├── TimelineRiverFeed/  ✅
│   │       ├── TimelineRiverRow/   ✅
│   │       ├── MediaLightbox/
│   │       └── utils/
│   ├── Profile/
│   │   └── components/
│   │       ├── ProfileCard/
│   │       │   └── components/ (ActivityVisualization, etc.)
│   │       ├── ComposerModal/
│   │       └── TimelineRiver/
│   ├── Login/
│   ├── Signup/
│   └── Landing/
└── ui/
    └── ThemeToggle/
```

---

_Last updated: December 3, 2025_
_Branch: master-ui_
