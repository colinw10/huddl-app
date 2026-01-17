# Collapsible Cards - Files Reference

## Overview

This document lists all files involved in the Collapsible Cards (Pill Collapse) feature for reference when porting to other projects.

---

## Implementation Status

| Component                        | Status         |
| -------------------------------- | -------------- |
| Home Page - TimelineRiverRow     | ✅ Implemented |
| Profile Page - RiverTimelineView | 🔲 Pending     |
| Profile Page - RiverFeedView     | 🔲 Pending     |

---

## Feature Spec

- `docs/stretch-goals/CollapsibleCards.md`

---

## ✅ COMPLETED: Home Page Implementation

### Files Changed

#### 1. `frontend/src/components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.jsx`

**Changes made:**

- Added `collapsedDecks` state (Set of deck types)
- Added `handleCollapseDeck(type)` handler
- Added `handleExpandDeck(type)` handler
- Added collapsed pills container at top of row
- Pass `isCollapsed`, `onCollapse`, `onExpand` props to SmartDeck

```jsx
// State added
const [collapsedDecks, setCollapsedDecks] = useState(new Set());

// Handlers added
const handleCollapseDeck = (type) => {
  setCollapsedDecks((prev) => new Set([...prev, type]));
};

const handleExpandDeck = (type) => {
  setCollapsedDecks((prev) => {
    const next = new Set(prev);
    next.delete(type);
    return next;
  });
};
```

---

#### 2. `frontend/src/components/pages/Home/components/TimelineRiverRow/components/SmartDeck/SmartDeck.jsx`

**Changes made:**

- Added `isCollapsed`, `onCollapse`, `onExpand` props
- Added collapsed pill render when `isCollapsed={true}`
- Added collapse button in header

```jsx
// New props
((isCollapsed = false), onCollapse, onExpand);

// Collapsed pill view
if (isCollapsed) {
  return (
    <button
      className={`smart-deck-pill smart-deck-pill--${type}`}
      onClick={() => onExpand?.(type)}
      aria-label={`Expand ${config.label} (${totalCards})`}
    >
      <span className="smart-deck-pill-icon">{typeIcons[type]}</span>
      <span className="smart-deck-pill-label">{config.label}</span>
      <span className="smart-deck-pill-count">{totalCards}</span>
    </button>
  );
}

// Collapse button in header
<button
  className="smart-deck-collapse-btn"
  onClick={(e) => {
    e.stopPropagation();
    onCollapse?.(type);
  }}
  aria-label={`Collapse ${config.label}`}
>
  <ChevronLeftIcon size={14} />
</button>;
```

---

#### 3. `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_base.scss`

**Changes made:**

- Added `.collapsed-decks-container` styles

```scss
/* Collapsed decks container - pills at top */
.collapsed-decks-container {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-sm);
}
```

---

#### 4. `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_smart-deck.scss`

**Changes made:**

- Added `.smart-deck-collapse-btn` styles
- Added `.smart-deck-pill` styles
- Added type-specific pill colors
- Added mobile responsive rules

```scss
/* Collapse button in header */
.smart-deck-collapse-btn {
  position: absolute;
  right: 8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.25s ease;
}

.smart-deck-header:hover .smart-deck-collapse-btn {
  opacity: 0.8;
}

/* Collapsed pill */
.smart-deck-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  height: 40px;
  border-radius: 20px;
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Type-specific pill colors */
.smart-deck-pill--thoughts {
  border-color: rgba(79, 255, 255, 0.4);
}
.smart-deck-pill--media {
  border-color: rgba(167, 131, 255, 0.4);
}
.smart-deck-pill--milestones {
  border-color: rgba(26, 231, 132, 0.4);
}

/* Mobile: Always show collapse button */
@media (max-width: 768px) {
  .smart-deck-collapse-btn {
    opacity: 0.7;
  }
}
```

---

## 🔲 PENDING: Profile Page Implementation

### Files To Modify

#### 1. `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverTimelineView/RiverTimelineView.jsx`

**Purpose:** Profile page - own posts timeline  
**Changes needed:**

- Follow same pattern as TimelineRiverRow.jsx
- Add `collapsedDecks` state
- Add collapse/expand handlers
- Pass props to RiverSmartDeck (or create similar component)

---

#### 2. `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverFeedView/RiverFeedView.jsx`

**Purpose:** Profile page - friends feed view  
**Changes needed:**

- Add `collapsedDecks` state (per-user basis)
- Add `collapsedRows` state (Set of friend user IDs) for row-level collapse
- Add handlers for deck collapse AND row collapse
- Render collapsed friend row as single pill with avatar

---

#### 3. `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverTimelineView/RiverTimelineView.scss`

**Add styles for:** (copy from Home page \_smart-deck.scss)

- `.smart-deck-collapse-btn`
- `.smart-deck-pill` and type variants
- `.collapsed-decks-container`

---

#### 4. `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverFeedView/RiverFeedView.scss`

**Add styles for:**

```scss
/* Collapsed friend row - shows as single pill */
.friend-row.collapsed {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  height: auto;
  min-height: 56px;
  border-radius: 28px;
  cursor: pointer;

  .friend-avatar {
    width: 40px;
    height: 40px;
  }

  .friend-name {
    font-size: 14px;
    font-weight: 500;
  }

  .river-streams {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}

.friend-row-collapse-btn {
  /* Similar to smart-deck-collapse-btn */
}
```

---

## Summary Table

| File Path                 | Type | Status     |
| ------------------------- | ---- | ---------- |
| `TimelineRiverRow.jsx`    | JSX  | ✅ Done    |
| `SmartDeck.jsx`           | JSX  | ✅ Done    |
| `styles/_base.scss`       | SCSS | ✅ Done    |
| `styles/_smart-deck.scss` | SCSS | ✅ Done    |
| `RiverTimelineView.jsx`   | JSX  | ✅ Done    |
| `RiverFeedView.jsx`       | JSX  | ✅ Done    |
| `RiverTimelineView.scss`  | SCSS | ✅ Done    |
| `RiverFeedView.scss`      | SCSS | ✅ Done    |

---

## Commit 5bf7ccc - All Files Changed (Jan 17, 2026)

### Key Changes Summary

1. **Removed `_variables.scss` from TimelineRiverRow** - DELETED (was redundant)
   - Only ONE `_variables.scss` now exists: `frontend/src/styles/_variables.scss`
   - The deleted file was at: `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_variables.scss`

2. **Fixed Home feed card widths** - Cards now fill their column widths properly for 2 and 3 categories

3. **Per-friend collapsed state** - Each friend row in RiverFeedView has independent collapse state

---

### HOME PAGE - TimelineRiverRow (Main Component)

| File | Purpose |
|------|---------|
| `frontend/src/components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.jsx` | Main row component - manages `collapsedDecks` state, tabs row, content row |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/components/SmartDeck/SmartDeck.jsx` | SmartDeckContent component - renders card + navigation |

### HOME PAGE - Styles

| File | Purpose |
|------|---------|
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_base.scss` | **Core layout** - tabs row, content row, flex/grid rules, `.post--compact` (width constraints removed) |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_smart-deck.scss` | **Card deck styles** - `.smart-deck-content`, `.smart-deck-card-container`, nav buttons, type-specific colors |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_responsive.scss` | **Desktop grid rules** - `.timeline-river-row--expanded-3 .timeline-river-row__content` grid layout |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_post-card.scss` | Card styling - chamfered corners, hover effects |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_post-media.scss` | Media image display - max-height increased to 500px |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_composer.scss` | Comment composer styles |

### PROFILE PAGE - TimelineRiver

| File | Purpose |
|------|---------|
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.jsx` | Parent component - manages view mode, deck indices |
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.scss` | Main timeline styles, imports shared styles from Home |
| `frontend/src/components/pages/Profile/Profile.scss` | Profile page container styles |

### PROFILE PAGE - Sub-components

| File | Purpose |
|------|---------|
| `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverTimelineView/RiverTimelineView.jsx` | User's own posts view - collapsible decks |
| `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverTimelineView/RiverTimelineView.scss` | Timeline view specific styles |
| `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverFeedView/RiverFeedView.jsx` | **Friends feed** - per-friend collapsed state using `friendCollapsedDecks` Map |
| `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverFeedView/RiverFeedView.scss` | Friends feed styles - `.river-labels`, column layouts |
| `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverPostActions/RiverPostActions.jsx` | Post action buttons |
| `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverComposer/RiverComposer.jsx` | Comment composer component |

### DOCUMENTATION

| File | Purpose |
|------|---------|
| `docs/stretch-goals/CollapsibleCards.md` | Feature specification |
| `docs/stretch-goals/README.md` | Index |
| `docs/stretch-goals/completed_need_add/collapsible-cards-files.md` | This file - implementation reference |

---

## Where To Look For What

### Card Width Issues (why cards don't fill columns)
1. **First check:** `_base.scss` - look for `.post--compact`, `.post--single` width rules
2. **Then check:** `_responsive.scss` - grid template columns for different screen sizes
3. **Then check:** `_smart-deck.scss` - `.smart-deck-content`, `.smart-deck-card-container` width

### Tab/Header Styling
- `_base.scss` - `.deck-tab`, `.deck-tab--thoughts`, `.deck-tab--media`, `.deck-tab--milestones`

### Carousel Navigation (dots, arrows)
- `_smart-deck.scss` - `.smart-deck-nav`, `.smart-deck-nav-btn`, `.smart-deck-dot`

### Collapse/Expand Behavior
- **Home:** `TimelineRiverRow.jsx` - `collapsedDecks` state, `handleCollapseDeck`, `handleExpandDeck`
- **Profile Friends:** `RiverFeedView.jsx` - `friendCollapsedDecks` Map (per-friend state)

### Type-Specific Colors
- `_smart-deck.scss` - `.smart-deck-content--thoughts`, `.smart-deck-content--media`, `.smart-deck-content--milestones`
- `_base.scss` - `.deck-tab--thoughts`, `.deck-tab--media`, `.deck-tab--milestones`

---

## IMPORTANT: Variables Location

**There is now only ONE `_variables.scss`:**
```
frontend/src/styles/_variables.scss
```

The file that was previously at:
```
frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_variables.scss
```
**HAS BEEN DELETED** - it was redundant and causing confusion.

All CSS variables are defined in the global `_variables.scss` and available throughout the app.
