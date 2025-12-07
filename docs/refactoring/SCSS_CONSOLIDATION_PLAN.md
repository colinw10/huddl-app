# SCSS File Consolidation Plan

> **Branch:** `master-ui-v2`  
> **Date:** December 7, 2025  
> **Goal:** 84 files → ~35 files (58% reduction)  
> **Status:** NOT STARTED - Planning phase

---

## ⚠️ Consolidation Approach

**DO NOT:**
- Delete partials before verifying merged file works
- Make changes without testing both dark AND light mode
- Skip visual verification of all card variants

**DO:**
1. Create consolidated file (keep partials)
2. Test in browser - both themes
3. Verify all variants render correctly
4. Only THEN delete partials
5. Commit after each successful phase

---

## 📊 Current State

| Area                         | Files  | Lines (approx) |
| ---------------------------- | ------ | -------------- |
| `src/styles/`                | 14     | ~2,500         |
| `Home/` page & components    | 16     | ~3,500         |
| `Profile/` page & components | 15     | ~3,000         |
| `Friends/`                   | 9      | ~800           |
| `MessageModal/`              | 9      | ~1,200         |
| `Landing/Login/Signup/About` | 4      | ~2,000         |
| Layout components            | 3      | ~600           |
| UI components                | 1      | ~150           |
| **Total**                    | **84** | **~14,000**    |

---

## 🎯 Target Structure

### Global Styles (`src/styles/`) - 8 files

```
src/styles/
├── main.scss              # Entry point (imports all)
├── _variables.scss        # Design tokens, CSS custom properties
├── _mixins.scss           # Sass functions & mixins
├── _reset.scss            # CSS reset/normalize
├── _typography.scss       # Font faces, text styles
├── _animations.scss       # Global @keyframes
├── _utilities.scss        # Helper classes (merge: _buttons, _cards, _layout)
└── _theme.scss            # Theme logic (merge: _light-mode, _blobs, _glass)
```

**Merges:**

- `_buttons.scss` + `_cards.scss` + `_layout.scss` → `_utilities.scss`
- `_light-mode.scss` + `_blobs.scss` + `_glass.scss` → `_theme.scss`

### Component Styles - 1 file per component

```
src/components/
├── layout/
│   ├── TopBar/
│   │   └── TopBar.scss           # Merge MessageModal styles into here
│   └── SideNav/
│       └── SideNav.scss
│
├── pages/
│   ├── Home/
│   │   ├── Home.scss             # Merge 6 partials
│   │   └── components/
│   │       ├── TimelineRiverRow/
│   │       │   └── TimelineRiverRow.scss  # Merge 10 partials
│   │       └── MediaLightbox/
│   │           └── MediaLightbox.scss     # Merge 5 partials
│   │
│   ├── Profile/
│   │   ├── Profile.scss          # Merge 7 partials
│   │   └── components/
│   │       ├── ProfileCard/
│   │       │   └── ProfileCard.scss       # Keep modular (already split well)
│   │       ├── ComposerModal/
│   │       │   └── ComposerModal.scss
│   │       └── TimelineRiver/
│   │           └── TimelineRiver.scss
│   │
│   ├── Friends/
│   │   └── Friends.scss          # Merge 8 partials into 1
│   │
│   ├── Landing/
│   │   └── Landing.scss
│   ├── Login/
│   │   └── Login.scss
│   ├── Signup/
│   │   └── Signup.scss
│   └── About/
│       └── About.scss
│
└── ui/
    └── ThemeToggle/
        └── ThemeToggle.scss
```

---

## 📋 Consolidation Checklist

### Phase 1: Global Styles (src/styles/)

- [ ] Merge `_buttons.scss` into `_utilities.scss`
- [ ] Merge `_cards.scss` into `_utilities.scss`
- [ ] Merge `_layout.scss` into `_utilities.scss`
- [ ] Merge `_blobs.scss` into `_theme.scss`
- [ ] Merge `_glass.scss` into `_theme.scss`
- [ ] Merge `_light-mode.scss` into `_theme.scss`
- [ ] Update `main.scss` imports
- [ ] Delete merged files

### Phase 2: Friends Page (Pilot)

- [ ] Merge `_scan-effects.scss` into `Friends.scss`
- [ ] Merge `_header.scss` into `Friends.scss`
- [ ] Merge `_tabs.scss` into `Friends.scss`
- [ ] Merge `_grid.scss` into `Friends.scss`
- [ ] Merge `_friend-card.scss` into `Friends.scss`
- [ ] Merge `_actions.scss` into `Friends.scss`
- [ ] Merge `_responsive.scss` into `Friends.scss`
- [ ] Merge `_light-mode.scss` into `Friends.scss`
- [ ] Delete `/styles/` folder
- [ ] Test dark + light mode

### Phase 3: Home Page

- [ ] Merge `Home/styles/*.scss` (6 files) into `Home.scss`
- [ ] Merge `TimelineRiverRow/styles/*.scss` (10 files) into `TimelineRiverRow.scss`
- [ ] Merge `MediaLightbox/styles/*.scss` (5 files) into `MediaLightbox.scss`
- [ ] Delete `/styles/` folders
- [ ] Test all views

### Phase 4: Profile Page

- [ ] Merge `Profile/styles/*.scss` (7 files) into `Profile.scss`
- [ ] Keep `ProfileCard/components/` as-is (good structure)
- [ ] Delete `/styles/` folder

### Phase 5: MessageModal

- [ ] Merge all `MessageModal/styles/*.scss` (8 files) into `MessageModal.scss`
- [ ] OR merge into `TopBar.scss` if small enough
- [ ] Delete `/styles/` folder

### Phase 6: Cleanup

- [ ] Run full visual test (all pages, both themes)
- [ ] Remove any orphaned imports
- [ ] Update documentation

---

## 🔧 Merge Pattern

### Organizing merged files:

```scss
// ==============================================
// COMPONENT NAME
// Description of component
// ==============================================

// ----------------------------
// BASE STYLES
// ----------------------------
.component { ... }

// ----------------------------
// HEADER
// ----------------------------
.component-header { ... }

// ----------------------------
// CARDS / ITEMS
// ----------------------------
.component-card { ... }

// ----------------------------
// ACTIONS
// ----------------------------
.btn-action { ... }

// ----------------------------
// RESPONSIVE
// ----------------------------
@media (max-width: 768px) { ... }

// ----------------------------
// LIGHT MODE
// ----------------------------
[data-theme="light"] {
  .component { ... }
}
```

---

## ⚠️ Important Notes

1. **Keep imports working** - Update any `@use` or `@import` statements
2. **Preserve order** - Keep responsive/light-mode at the end
3. **Test after each phase** - Don't merge everything at once
4. **Commit frequently** - One commit per phase minimum

---

## 📊 Expected Results

| Metric             | Before | After | Improvement |
| ------------------ | ------ | ----- | ----------- |
| Total SCSS files   | 84     | ~35   | -58%        |
| `/styles/` folders | 8      | 1     | -87%        |
| Max nesting depth  | 4      | 2     | Better DX   |
| Import statements  | ~70    | ~15   | -78%        |

---

## 🚀 Starting Point

**Phase 2 (Friends)** is the best pilot because:

- Self-contained page
- 8 small partials = manageable
- Good test case for pattern
- Low risk if something breaks
