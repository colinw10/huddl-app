# Natalia - Frontend Tasks

> **Your Role:** ~20% of frontend work (7 files, ~987 lines)

---

## 📁 YOUR FILES

| File | Lines |
|------|-------|
| `components/pages/Profile/components/ProfileCard/components/ActivityVisualization/ActivityVisualization.jsx` | 288 |
| `components/pages/Profile/components/ProfileCard/components/ProfileCardFront/ProfileCardFront.jsx` | 201 |
| `components/layout/SideNav/SideNav.jsx` | 159 |
| `components/pages/Profile/components/ProfileCard/components/ProfileCardBack/ProfileCardBack.jsx` | 119 |
| `components/ui/MessageModal/MessageModal.jsx` | 103 |
| `components/pages/Profile/components/ProfileCard/components/QuickSettings/QuickSettings.jsx` | 61 |
| `components/pages/Home/components/DeleteConfirmModal/DeleteConfirmModal.jsx` | 56 |

---

## Task 1: ActivityVisualization.jsx

Visual display of user activity (posts over time).

**Requirements:**
- Show activity as a chart/graph
- Display post frequency data
- Handle empty state
- Animate on load

**Example pattern:**
```jsx
const ActivityVisualization = ({ posts }) => {
  const activityData = useMemo(() => {
    // TODO: Process posts into chart data
  }, [posts]);

  return (
    <div className="activity-viz">
      {/* TODO: Render visualization */}
    </div>
  );
};
```

---

## Task 2: ProfileCardFront.jsx

Front side of flippable profile card.

**Requirements:**
- Display avatar, username, bio
- Show stats (posts count, friends count)
- Flip trigger button

---

## Task 3: SideNav.jsx

Side navigation for desktop view.

**Requirements:**
- Navigation links (Home, Profile, Friends, About)
- Active state highlighting
- Message button
- Responsive behavior

---

## Task 4: ProfileCardBack.jsx

Back side of flippable profile card.

**Requirements:**
- Settings or additional info
- Flip back trigger

---

## Task 5: MessageModal.jsx (ui)

Modal for direct messaging.

**Requirements:**
- Message input textarea
- Send button
- Message history display

---

## Task 6: QuickSettings.jsx

Quick settings panel on profile card.

**Requirements:**
- Theme toggle
- Basic settings options

---

## Task 7: DeleteConfirmModal.jsx

Confirmation modal before deleting a post.

**Requirements:**
- Warning message
- Confirm/Cancel buttons
- Handle delete action

---

## Testing

```bash
cd frontend && npm run dev
```

---

## 🎨 STYLING YOUR COMPONENTS

Each JSX file has a matching `.scss` file. Your SCSS files:
- `ActivityVisualization.scss`
- `ProfileCardFront.scss`
- `SideNav.scss`
- `ProfileCardBack.scss`
- `MessageModal.scss` (in `/ui/`)
- `QuickSettings.scss`
- `DeleteConfirmModal.scss`

### How It Works

The **structure and layout CSS is already written**. You just plug in the global design system.

**Global styles location:** `frontend/src/styles/`
- `_variables.scss` - colors, spacing, fonts
- `_mixins.scss` - reusable patterns
- `_glass.scss` - glassmorphism effects
- `_buttons.scss` - button styles
- `_cards.scss` - card styles

### Example

**You'll see this (TODOs):**
```scss
// TODO: @use '../../../styles/variables' as *;
// TODO: @use '../../../styles/mixins' as *;

.side-nav {
  // TODO: @include glass-card;
  position: fixed;
  left: 0;
  width: 80px;
  // TODO: background: $glass-bg;
  // TODO: border-right: 1px solid $glass-border;
}
```

**You change it to:**
```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

.side-nav {
  @include glass-card;
  position: fixed;
  left: 0;
  width: 80px;
  background: $glass-bg;
  border-right: 1px solid $glass-border;
}
```

### Tips
- Check `_variables.scss` to see available variables (`$spacing-md`, `$glass-bg`, etc.)
- Check `_mixins.scss` to see available mixins (`@include glass-card`, etc.)
- The path `../../../styles/` may vary — count your folder depth
