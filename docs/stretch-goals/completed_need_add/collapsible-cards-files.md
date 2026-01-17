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
| `RiverTimelineView.jsx`   | JSX  | 🔲 Pending |
| `RiverFeedView.jsx`       | JSX  | 🔲 Pending |
| `RiverTimelineView.scss`  | SCSS | 🔲 Pending |
| `RiverFeedView.scss`      | SCSS | 🔲 Pending |
