# Unified Close Button System

## Overview

A unified `.close-btn-glow` CSS class provides consistent X close buttons across all modals and overlays in NUMENEON with glowing effects and smooth animations.

## Design

### Dark Mode

- **Color**: Crimson `rgba(255, 77, 109, 0.8)`
- **Glow**: Red drop-shadow filter
- **Hover**: 90° rotation, intensified glow
- **Size**: 36x36px button, 26x26px SVG icon

### Light Mode

- **Color**: Deeper red `rgba(200, 30, 60, 0.8)` for visibility
- **Glow**: Subtle red drop-shadow
- **Fix**: `pointer-events: auto !important` ensures clickability
- **Fix**: `z-index: 10 !important` ensures visibility above content

## Implementation

### CSS Location

**Base styles:** `frontend/src/styles/_buttons.scss` (lines 173-215)

```scss
.close-btn-glow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  color: rgba(255, 77, 109, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 26px;
    height: 26px;
    filter: drop-shadow(0 0 4px rgba(255, 77, 109, 0.4));
  }
  
  &:hover {
    color: #ff4d6d;
    
    svg {
      filter: drop-shadow(0 0 10px rgba(255, 77, 109, 0.8))
              drop-shadow(0 0 20px rgba(255, 77, 109, 0.5));
      transform: rotate(90deg);
    }
  }
}
```

**Light mode override:** `frontend/src/styles/_light-mode.scss`

```scss
[data-theme="light"] {
  .close-btn-glow {
    color: rgba(200, 30, 60, 0.8) !important;
    z-index: 10 !important;
    pointer-events: auto !important;
    
    &:hover {
      color: #c81e3c !important;
    }
  }
}
```

### Usage in JSX

```jsx
<button className="close-btn-glow" onClick={onClose}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
</button>
```

## Components Using This Class

| Component         | File Location                                           |
| ----------------- | ------------------------------------------------------- |
| MessageModal      | `layout/TopBar/MessageModal/MessageModal.jsx`           |
| SearchModal       | `layout/TopBar/SearchModal/SearchModal.jsx`             |
| ComposerModal     | `pages/Profile/components/ComposerModal/ComposerModal.jsx` |
| MediaLightbox     | `pages/Home/components/MediaLightbox/MediaLightbox.jsx` |
| TimelineRiver     | `pages/Profile/components/TimelineRiver/TimelineRiver.jsx` |

## Migration Notes

Previously each modal had its own close button styles (e.g., `.message-modal-close`, `.media-lightbox-close`). These have been removed and replaced with the unified class.

### Files Updated

- Removed `.message-modal-close` from `_header.scss`
- Removed `.media-lightbox-close` from `_image.scss`
- Removed `.composer-close-btn` styles
- Added positioning context in each component where needed

## Accessibility

- Uses semantic `<button>` element
- Has visible focus state (inherits from base button styles)
- Color contrast meets WCAG AA standards in both themes
- Animation respects `prefers-reduced-motion` (inherits from global)
