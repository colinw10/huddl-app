# Collapsible Cards (Pill Collapse System)

## Overview

A space-management feature that allows users to collapse postcards into minimal pills, creating focus space for content they want to prioritize.

---

## Status

| Aspect     | Status  |
| ---------- | ------- |
| Priority   | MEDIUM  |
| Complexity | Low     |
| Status     | 📋 Spec |

---

## Core Concept

**One pattern, two contexts:**

| Context          | Collapse Action       | Result                                    |
| ---------------- | --------------------- | ----------------------------------------- |
| **Single card**  | Click collapse icon   | Card → pill (hover to preview/expand)     |
| **Friend's row** | "Collapse all" on row | Entire row → single pill with friend name |

---

## User Interaction

### Single Card Collapse

1. **Hover** card → collapse icon appears (left side)
2. **Click** collapse icon → card animates to pill
3. **Hover** pill → shows preview tooltip (title/snippet)
4. **Click** pill → expands back to full card

### Friend Row Collapse (Friends Feed)

1. **Click** "collapse row" button → entire row becomes one pill
2. Pill shows friend's avatar + name
3. **Click** pill → expands full row back

---

## Visual Design

### Collapsed Pill

```
┌──────────────────┐
│  [🖼] Card Title  │   ← 48px height, rounded pill
└──────────────────┘
```

### Desktop Layout

```
┌─────────────────────────────────────────────────────┐
│ [Pill 1] [Pill 2]                                   │  ← Collapsed pills
│                                                     │
│ ┌─────────────────────┐  ┌─────────────────────┐   │
│ │   Expanded Card 1   │  │   Expanded Card 2   │   │  ← Focused cards
│ │                     │  │                     │   │
│ └─────────────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Mobile Layout

```
┌───────────────────────┐
│ [Pill] [Pill] [Pill]  │  ← Pills wrap horizontally
├───────────────────────┤
│ ┌───────────────────┐ │
│ │  Expanded Card    │ │
│ └───────────────────┘ │
└───────────────────────┘
```

---

## Technical Approach

### State Management

- **Session-only persistence** (React state, no localStorage)
- State resets on page refresh (fresh experience each visit)

### CSS Classes

```scss
.postcard.collapsed           // Pill state
.card-collapse-btn            // Collapse trigger icon
.card-pill-label              // Content shown in pill
.collapsed-cards-container    // Container for pills
.friend-row.collapsed         // Entire row collapsed
```

### Accessibility

- `aria-label="Collapse card"` / `aria-label="Expand card"`
- `aria-expanded="true/false"` on cards
- Keyboard: Tab to collapse button, Enter to toggle
- Screen reader: Announces "Card collapsed" / "Card expanded"

---

## Implementation Contexts

### 1. Profile Page - TimelineRiver (Own Posts)

- Individual postcards can be collapsed
- Pills appear above/beside expanded cards
- Location: `RiverTimelineView.jsx`

### 2. Profile Page - Friends Feed (RiverFeedView)

- Individual cards can collapse
- **Additionally:** Entire friend row can collapse to single pill
- Location: `RiverFeedView.jsx`

### 3. Home Page - TimelineRiverRow

- Individual postcards can be collapsed
- Location: `TimelineRiverRow.jsx`

---

## Mobile Considerations

Following existing pattern from `RiverTimelineView.scss`:

- Collapse button always visible (no hover on mobile)
- Pills use smaller touch targets (min 44px for accessibility)
- Collapsed container uses `flex-wrap` for multiple pills

---

## Files To Create/Modify

### New Files

- None (integrated into existing components)

### Modified Files

**Components:**

- `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverTimelineView/RiverTimelineView.jsx`
- `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverFeedView/RiverFeedView.jsx`
- `frontend/src/components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.jsx`

**Styles:**

- `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverTimelineView/RiverTimelineView.scss`
- `frontend/src/components/pages/Profile/components/TimelineRiver/components/RiverFeedView/RiverFeedView.scss`
- `frontend/src/components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.scss`

**Icons (if new icon needed):**

- `frontend/src/assets/icons/actions.jsx` (add CollapseIcon)

---

## Future Enhancements (v2)

- Optional "Expand All" / "Collapse All" controls
- Optional localStorage persistence (user preference in settings)
- Drag-to-reorder collapsed pills
