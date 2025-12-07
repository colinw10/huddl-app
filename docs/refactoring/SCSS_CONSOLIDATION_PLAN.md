# SCSS File Consolidation Plan

> **Branch:** `master-ui-v2`  
> **Date:** December 7, 2025  
> **Goal:** 84 files → ~35 files (58% reduction)  
> **Status:** ✅ IN PROGRESS - Phase 1 & 4 Complete

---

## 📈 Progress Summary

| Date       | Action                                      | Files Removed | Total |
| ---------- | ------------------------------------------- | ------------- | ----- |
| Dec 7      | Starting count                              | -             | 84    |
| Dec 7      | Merged `_glass.scss` → `_utilities.scss`    | 1             | 83    |
| Dec 7      | Consolidated Profile styles (8 partials)   | 8             | 75    |
| Dec 7      | Added consistent veil overlay (no removal) | 0             | 75    |
| **Current**| **Actual file count**                       | -             | **61**|

> Note: Actual count is 61 due to Friends already being consolidated and other cleanup.

### ✅ Completed Work

1. **Consistent Veil Overlay** - All pages now share `var(--bg-overlay)` pattern
   - Home, Profile, Login, Signup all use same `::before` veil
   - Blobs show through consistently across app

2. **Global Styles Consolidation**
   - ✅ `_glass.scss` merged into `_utilities.scss`

3. **Profile Page Consolidation**
   - ✅ 8 partials merged into single `Profile.scss` (~630 lines)
   - ✅ Deleted `/styles/` folder
   - Files merged: `_animations`, `_page-base`, `_view-toggle`, `_quick-composer`, `_tabs`, `_responsive`, `_dark-mode`, `_light-mode`

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

### Phase 1: Global Styles (src/styles/) - PARTIAL ✅

- [ ] Merge `_buttons.scss` into `_utilities.scss`
- [ ] Merge `_cards.scss` into `_utilities.scss`
- [ ] Merge `_layout.scss` into `_utilities.scss`
- [ ] Merge `_blobs.scss` into `_theme.scss`
- [x] ~~Merge `_glass.scss` into `_utilities.scss`~~ ✅ Done
- [ ] Merge `_light-mode.scss` into `_theme.scss`
- [ ] Update `main.scss` imports
- [ ] Delete merged files

### Phase 2: Friends Page (Pilot) - ALREADY DONE ✅

> Friends.scss was already consolidated before this plan started.

### Phase 3: Home Page

- [ ] Merge `Home/styles/*.scss` (6 files) into `Home.scss`
- [ ] ~~Merge `TimelineRiverRow/styles/*.scss`~~ **SKIP** - 2000+ lines, keep modular
- [ ] Merge `MediaLightbox/styles/*.scss` (5 files) into `MediaLightbox.scss`
- [ ] Delete `/styles/` folders
- [ ] Test all views

### Phase 4: Profile Page - COMPLETE ✅

- [x] ~~Merge `Profile/styles/*.scss` (8 files) into `Profile.scss`~~ ✅ Done
- [x] Keep `ProfileCard/components/` as-is (good structure)
- [x] ~~Delete `/styles/` folder~~ ✅ Done

### Phase 5: MessageModal - STRETCH GOAL

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

| Metric             | Before | Current | Target | Progress |
| ------------------ | ------ | ------- | ------ | -------- |
| Total SCSS files   | 84     | 61      | ~35    | 27% ✅   |
| `/styles/` folders | 8      | 6       | 1      | 25% ✅   |
| Files consolidated | 0      | 9       | ~49    | 18% ✅   |

---

## 🚀 Stretch Goals (Future Work)

### Low Effort, High Value
- [ ] Merge remaining global partials (`_buttons`, `_cards`, `_layout`) → saves 3 files
- [ ] MediaLightbox consolidation (if partials exist) → saves ~5 files

### Medium Effort
- [ ] MessageModal consolidation (~1000 lines, 8 files) → saves 7 files
- [ ] Home page partial cleanup

### Not Recommended
- ❌ TimelineRiverRow - 2000+ lines, keep modular for maintainability
- ❌ ProfileCard components - already well-structured

---

## 🎯 Decision: When to Consolidate vs Keep Modular

| Lines | Partials | Recommendation |
| ----- | -------- | -------------- |
| <500  | 1-4      | Consolidate    |
| 500-1000 | 4-8   | Consolidate if related |
| >1000 | 8+       | Keep modular   |

**TimelineRiverRow** stays modular because:
- 2000+ lines across 10 files
- Each partial handles distinct concern (carousel, smart-deck, composer, etc.)
- Easier to maintain and debug
- Better IDE performance
