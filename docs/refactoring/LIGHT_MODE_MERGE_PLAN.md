# Light Mode Merge Plan

> **Target Branch:** `pablo-modular-shell`  
> **Source Branch:** `light-mode` (verify actual name)  
> **Date:** November 28, 2025

---

## 🎯 Objective

Merge the light-mode branch into the modularized shell, then refactor the light mode code to fit our new SCSS architecture.

---

## 📋 Pre-Merge Checklist

### 1. Identify the Light Mode Branch

```bash
# List all branches
git branch -a

# Common names to look for:
# - light-mode
# - crystal-light-mode
# - feature/light-mode
# - theme-toggle
```

### 2. Inspect What's Coming

```bash
# See commits unique to light-mode
git log pablo-modular-shell..light-mode --oneline

# See files that will change
git diff pablo-modular-shell..light-mode --stat

# Preview merge conflicts
git merge light-mode --no-commit --no-ff
git merge --abort  # Cancel after inspecting
```

### 3. Backup Current State

```bash
git stash
# or
git branch backup-before-light-merge
```

---

## 🔀 Merge Process

### Step 1: Ensure Clean Working Directory

```bash
cd /Users/pablodcordero/code/my-stuff/huddl-app
git status  # Should be clean
```

### Step 2: Merge Light Mode

```bash
git merge light-mode -m "merge: integrate light-mode into modular shell"
```

### Step 3: Resolve Conflicts (Expected Areas)

Likely conflict files:

- `src/styles/*.scss` (if light-mode touched CSS)
- `App.jsx` or `App.css` (theme toggle logic)
- Any component that has theme-aware styles

**Resolution strategy:**

- Keep our new SCSS architecture
- Extract light-mode specific CSS into `_theme.scss`
- Preserve toggle logic but refactor to use our patterns

---

## 🔧 Post-Merge Refactoring

### Task 1: Consolidate Theme Variables

Move all light-mode colors into `_theme.scss`:

```scss
// frontend/src/styles/_theme.scss

// ============================================
// DARK THEME (DEFAULT)
// ============================================
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: rgba(255, 255, 255, 0.02);
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
  // ... etc
}

// ============================================
// LIGHT THEME
// ============================================
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: rgba(0, 0, 0, 0.1);
  // ... etc
}
```

### Task 2: Refactor Theme Toggle Component

Ensure toggle updates `document.documentElement.dataset.theme`:

```jsx
// ThemeToggle.jsx
const toggleTheme = () => {
  const current = document.documentElement.dataset.theme;
  const next = current === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
};
```

### Task 3: Update Components Using Theme

Replace any inline theme checks with CSS variable usage:

```scss
// BAD (before)
.card {
  background: var(--dark-bg);
  .light-mode & {
    background: var(--light-bg);
  }
}

// GOOD (after)
.card {
  background: var(--bg-primary); // Automatically switches with theme
}
```

### Task 4: Test Both Themes

Checklist:

- [ ] Landing page looks correct in both themes
- [ ] Login/Signup forms readable
- [ ] Profile card (front + back) styled correctly
- [ ] Timeline/River row cards visible
- [ ] Navigation (top + bottom + side) works
- [ ] Modals styled properly
- [ ] Scrollbars themed
- [ ] No FOUC (flash of unstyled content)

---

## 📁 Files to Focus On

| File              | Action Needed                      |
| ----------------- | ---------------------------------- |
| `_theme.scss`     | Add all light theme variables      |
| `_variables.scss` | Ensure using CSS custom properties |
| `ThemeToggle.jsx` | Verify toggle logic                |
| `App.jsx`         | Check theme initialization         |
| `main.scss`       | Verify import order                |

---

## ⚠️ Potential Issues

### 1. CSS Specificity Conflicts

If light-mode used `!important` or high-specificity selectors, we may need to refactor.

### 2. Hardcoded Colors

Search for hardcoded hex values that should be variables:

```bash
grep -r "#ffffff\|#000000\|rgb(" src/components --include="*.scss"
```

### 3. Theme State Persistence

Ensure theme choice is saved to localStorage and restored on page load.

---

## ✅ Success Criteria

1. **No visual regressions** - Both themes look as intended
2. **Clean console** - No errors or warnings
3. **Theme toggle works** - Instant switch, persists on reload
4. **Code is modular** - All theme code in `_theme.scss`
5. **No hardcoded colors** - All theme-aware colors use CSS variables

---

## 🏷️ Commit Message Template

```
merge: integrate light-mode into modular shell

- Merged light-mode branch into pablo-modular-shell
- Refactored theme code into _theme.scss
- All theme-aware colors now use CSS custom properties
- Theme toggle persists to localStorage
- Tested both themes across all major components
```

---

_This plan should be executed in the next session after committing current progress._
