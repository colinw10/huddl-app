# Component Modularization Plan

> **Branch:** `pablo-modular-shell`  
> **Date:** November 28, 2025  
> **Status:** Ready to Execute

---

## 📊 Analysis Summary

| File                    | Lines | Issue                      | Priority  |
| ----------------------- | ----- | -------------------------- | --------- |
| `ProfileCard.jsx`       | 719   | Monolithic, mixed concerns | 🔴 High   |
| `ProfileCard.scss`      | 1673  | Massive stylesheet         | 🔴 High   |
| `TimelineRiverRow.jsx`  | 459   | Multiple responsibilities  | 🟡 Medium |
| `TimelineRiverRow.scss` | 1080  | Large stylesheet           | 🟡 Medium |
| `MessageModal.scss`     | 942   | Large but self-contained   | 🟢 Low    |

---

## 🎯 Phase 1: ProfileCard Modularization

### Current Structure

```
ProfileCard/
  ProfileCard.jsx      (719 lines - TOO BIG)
  ProfileCard.scss     (1673 lines - TOO BIG)
```

### Target Structure

```
ProfileCard/
  index.js                          # Barrel export
  ProfileCard.jsx                   # Main container (~100 lines)
  ProfileCard.scss                  # Base + imports only (~50 lines)
  components/
    ProfileCardFront/
      index.js
      ProfileCardFront.jsx          # Public profile view (~150 lines)
      ProfileCardFront.scss         # Header, avatar, bio, stats (~400 lines)
    ProfileCardBack/
      index.js
      ProfileCardBack.jsx           # Analytics container (~80 lines)
      ProfileCardBack.scss          # Analytics grid, cards (~300 lines)
    ActivityVisualization/
      index.js
      ActivityVisualization.jsx     # Wave/Heatmap toggle (~180 lines)
      ActivityVisualization.scss    # Wave, heatmap, legends (~400 lines)
    PostTypeBreakdown/
      index.js
      PostTypeBreakdown.jsx         # Donut chart (~100 lines)
      PostTypeBreakdown.scss        # Donut + legend (~150 lines)
    QuickSettings/
      index.js
      QuickSettings.jsx             # Settings buttons (~60 lines)
      QuickSettings.scss            # Settings grid (~150 lines)
```

### Component Responsibilities

| Component               | Responsibility                | Props Received                                     |
| ----------------------- | ----------------------------- | -------------------------------------------------- |
| `ProfileCard`           | State management, flip logic  | `isFlipped`, `setIsFlipped`, `posts`               |
| `ProfileCardFront`      | Public profile display        | `setIsFlipped`                                     |
| `ProfileCardBack`       | Analytics dashboard container | `setIsFlipped`, `posts`, `viewMode`, `setViewMode` |
| `ActivityVisualization` | Wave/heatmap charts           | `viewMode`, `posts`, `heatmapData`, `waveData`     |
| `PostTypeBreakdown`     | Content mix donut chart       | `postTypeData`                                     |
| `QuickSettings`         | Settings button grid          | None (static for now)                              |

---

## 🎯 Phase 2: TimelineRiverRow Modularization

### Current Structure

```
Home/components/
  TimelineRiverRow.jsx   (459 lines)
  TimelineRiverRow.scss  (1080 lines)
```

### Target Structure

```
Home/components/
  TimelineRiverRow/
    index.js                        # Barrel export
    TimelineRiverRow.jsx            # Container/orchestrator (~150 lines)
    TimelineRiverRow.scss           # Layout + imports (~100 lines)
    components/
      PostCard/
        index.js
        PostCard.jsx                # Individual post card (~120 lines)
        PostCard.scss               # Card styles, variants (~350 lines)
      CommentComposer/
        index.js
        CommentComposer.jsx         # Inline comment input (~60 lines)
        CommentComposer.scss        # Comment input styles (~150 lines)
      CarouselControls/
        index.js
        CarouselControls.jsx        # Mobile carousel nav (~40 lines)
        CarouselControls.scss       # Carousel buttons, dots (~130 lines)
```

---

## ⚠️ Risk Assessment

### 🔴 High Risk

| Risk                              | Mitigation                                                              |
| --------------------------------- | ----------------------------------------------------------------------- |
| **Broken imports after refactor** | Create barrel `index.js` files first; update parent imports immediately |
| **Lost CSS specificity**          | Maintain same class names; test visual output after each component      |
| **Props drilling complexity**     | Document prop flow; consider context if >3 levels deep                  |
| **Animation/transition breaks**   | Test flip animation after ProfileCard split                             |

### 🟡 Medium Risk

| Risk                              | Mitigation                                     |
| --------------------------------- | ---------------------------------------------- |
| **Circular dependencies**         | Keep data flow unidirectional (parent → child) |
| **Duplicate code in split files** | Extract shared utils/hooks to separate files   |
| **SCSS variable scope issues**    | Import `_variables.scss` in each new SCSS file |
| **Mobile responsiveness changes** | Test at 320px, 480px, 768px breakpoints        |

### 🟢 Low Risk

| Risk                     | Mitigation                                                      |
| ------------------------ | --------------------------------------------------------------- |
| **Increased file count** | Worth it for maintainability; barrel exports keep imports clean |
| **Build time increase**  | Negligible with Vite's fast HMR                                 |

---

## 🧹 Dead Code to Remove

### ProfileCard.jsx

- [ ] Unused `seededRandom` if not called
- [ ] Check for commented-out code blocks
- [ ] Verify all imported hooks are used

### TimelineRiverRow.jsx

- [ ] Remove any `console.log` statements
- [ ] Check for unused state variables
- [ ] Verify `touchStartX`/`touchEndX` are needed

### SCSS Files

- [ ] Remove `Profile-backup.scss` (1367 lines of dead weight)
- [ ] Check for commented-out style blocks
- [ ] Remove duplicate selectors

---

## 📋 Execution Checklist

### Pre-Flight

- [ ] Git status clean on `pablo-modular-shell`
- [ ] App runs without errors (`npm run dev`)
- [ ] Note current visual appearance for comparison

### Phase 1: ProfileCard

1. [ ] Create folder structure
2. [ ] Extract `QuickSettings` (simplest, least dependencies)
3. [ ] Extract `PostTypeBreakdown`
4. [ ] Extract `ActivityVisualization`
5. [ ] Extract `ProfileCardFront`
6. [ ] Extract `ProfileCardBack`
7. [ ] Update `ProfileCard.jsx` as container
8. [ ] Split SCSS files accordingly
9. [ ] Test flip animation
10. [ ] Commit: `refactor: modularize ProfileCard into subcomponents`

### Phase 2: TimelineRiverRow

1. [ ] Create folder structure
2. [ ] Extract `CommentComposer`
3. [ ] Extract `PostCard`
4. [ ] Extract `CarouselControls`
5. [ ] Update `TimelineRiverRow.jsx` as container
6. [ ] Split SCSS files
7. [ ] Test mobile carousel
8. [ ] Commit: `refactor: modularize TimelineRiverRow into subcomponents`

### Post-Flight

- [ ] Delete `Profile-backup.scss`
- [ ] Run full app test
- [ ] Visual regression check
- [ ] Final commit

---

## 📁 Import Patterns

### Before (Monolithic)

```jsx
import ProfileCard from "./components/ProfileCard/ProfileCard";
```

### After (Modular with Barrel)

```jsx
// ProfileCard/index.js exports default
import ProfileCard from "./components/ProfileCard";

// Or named exports if needed
import { ProfileCard, ProfileCardFront } from "./components/ProfileCard";
```

### SCSS Import Pattern

```scss
// ProfileCard.scss (entry point)
@import "../../styles/variables";
@import "../../styles/mixins";

@import "./components/ProfileCardFront/ProfileCardFront";
@import "./components/ProfileCardBack/ProfileCardBack";
// ... etc
```

---

## ✅ Success Criteria

1. **No visual changes** - App looks identical before/after
2. **No console errors** - Clean developer tools
3. **Flip animation works** - ProfileCard flips smoothly
4. **Mobile carousel works** - Swipe navigation functional
5. **File sizes reduced** - No single JSX >200 lines, no SCSS >400 lines
6. **Clean imports** - All imports resolve correctly
7. **Dead code removed** - No backup files, no console.logs

---

_This plan will be executed incrementally with commits after each component extraction._
