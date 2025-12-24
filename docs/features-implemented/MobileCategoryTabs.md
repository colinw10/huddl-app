# Mobile Category Tabs

## Overview

On mobile devices (≤768px), the profile timeline's three-column layout transforms into a tab-based navigation system, allowing users to switch between Thoughts, Media, and Milestones categories.

## Design

### Tab Appearance

- Three tabs displayed horizontally
- Icons with optional labels (labels hidden on very small screens)
- Active tab has glowing border matching column color
- Glass-style background

### Color Coding

| Tab        | Icon        | Active Color                    | Description   |
| ---------- | ----------- | ------------------------------- | ------------- |
| Thoughts   | Chat bubble | Blue `rgba(77, 171, 247, 1)`    | Text posts    |
| Media      | Image icon  | Magenta `rgba(233, 78, 200, 1)` | Photos/videos |
| Milestones | Checkmark   | Gold `rgba(255, 215, 0, 1)`     | Achievements  |

## Implementation

### State Management

```jsx
const [mobileCategory, setMobileCategory] = useState("thoughts");
```

### JSX Structure

```jsx
<div className="mobile-category-tabs">
  <button
    className={`mobile-category-tab ${
      mobileCategory === "thoughts" ? "active" : ""
    }`}
    onClick={() => setMobileCategory("thoughts")}
  >
    <svg>...</svg>
    <span>Thoughts</span>
  </button>
  {/* Similar for media and milestones */}
</div>
```

### Column Visibility

CSS classes control which column is shown:

```scss
.river-streams.mobile-show-thoughts .left-stream {
  display: flex;
}

.river-streams.mobile-show-media .center-stream {
  display: flex;
}

.river-streams.mobile-show-milestones .right-stream {
  display: flex;
}
```

## CSS Location

`frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.scss`

### Desktop (Hidden)

```scss
.mobile-category-tabs {
  display: none;
}
```

### Mobile (≤768px)

```scss
@media (max-width: 768px) {
  .mobile-category-tabs {
    display: flex;
    gap: 8px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    border: 1px solid var(--border-subtle);
    margin-bottom: var(--space-lg);
  }

  .mobile-category-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 12px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
    color: var(--text-muted);
    /* ... */
  }

  .mobile-category-tab.active {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--border-default);
    color: var(--text-primary);
  }
}
```

## Label Visibility

On very small screens (< 375px), tab labels are hidden to save space:

```scss
.mobile-category-tab span {
  display: none;
}

@media (min-width: 375px) {
  .mobile-category-tab span {
    display: inline;
  }
}
```

## Light Mode

Full light mode support with adjusted colors:

```scss
[data-theme="light"] {
  .mobile-category-tabs {
    background: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .mobile-category-tab:nth-child(1).active {
    border-color: rgba(26, 91, 199, 0.4);
    color: #1a5bc7;
  }
  /* Similar for media (pink) and milestones (gold) */
}
```

## Replaces Previous System

Previously, mobile showed all columns stacked vertically with inline labels. The new tab system:

- Saves vertical space
- Provides clearer navigation
- Matches common mobile UI patterns
- Keeps the Home feed inline-label pattern for differentiation

## Related Features

- [TimelineCarousel.md](./TimelineCarousel.md) - Carousel within each category
