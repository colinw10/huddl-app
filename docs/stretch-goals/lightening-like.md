# Lightning/Emphasis Reaction Feature

## Overview

Added an alternative "emphasis" reaction (⚡ lightning bolt) that users can access by long-pressing the like button. The lightning icon uses the same color scheme as the heart - cyan for thoughts, purple for media, green for milestones.

## User Interaction

1. **Quick tap** on heart → Regular like (same as before)
2. **Hold 400ms** → Reaction picker appears to the right
3. **Select ⚡** → Post is liked with bolt icon displayed instead of heart
4. **Select ❤️** → Post is liked with heart icon (switches back from bolt)

When picker is open:
- Other action buttons fade out (opacity: 0) but maintain layout
- Only the current reaction icon and alternative option are visible
- Picker only shows the OTHER option (not the currently selected one)

---

## Files Changed

### New Files Created

#### 1. `frontend/src/components/pages/Home/components/TimelineRiverRow/components/ReactionPicker/ReactionPicker.jsx`
- New component for the reaction picker popup
- Shows only the alternative reaction option (not the current one)
- Props: `isOpen`, `onSelect`, `onClose`, `reactionColor`, `currentReaction`

#### 2. `frontend/src/components/pages/Home/components/TimelineRiverRow/components/ReactionPicker/ReactionPicker.scss`
- Minimal styling - no background container, just floating icons
- Positioned to the right of the heart icon
- Entrance animation (scale up from left)
- Hover effect with glow using `--reaction-color` CSS variable

#### 3. `frontend/src/components/pages/Home/components/TimelineRiverRow/components/ReactionPicker/index.js`
- Barrel export for the ReactionPicker component

---

### Modified Files

#### 4. `frontend/src/assets/icons/engagement.jsx`
**Added:** `BoltDynamicIcon` component

```jsx
export const BoltDynamicIcon = ({ 
  size = 18, 
  className = '', 
  filled = false, 
  fillColor, 
  strokeColor = 'rgba(201,168,255,0.5)', 
  ...props 
}) => (...)
```

- Works identically to `HeartDynamicIcon`
- Props: `size`, `filled`, `fillColor`, `strokeColor`
- Lightning bolt shape using polygon points

---

#### 5. `frontend/src/assets/icons/index.js`
**Added:** Export for `BoltDynamicIcon`

```js
export {
  HeartIcon,
  HeartFilledIcon,
  HeartDynamicIcon,
  CommentIcon,
  ShareIcon,
  BookmarkIcon,
  RepostIcon,
  BoltDynamicIcon,  // ← NEW
} from "./engagement";
```

---

#### 6. `frontend/src/components/pages/Home/components/TimelineRiverRow/components/PostCard/PostCard.jsx`

**Imports added:**
- `useRef` from React
- `BoltDynamicIcon` from icons
- `ReactionPicker` component

**State added:**
```jsx
const [showReactionPicker, setShowReactionPicker] = useState(false);
const [reactionType, setReactionType] = useState(post.reaction_type || 'like');
const longPressTimer = useRef(null);
const LONG_PRESS_DURATION = 400; // ms
```

**New handlers:**
- `handleReactionMouseDown` - Starts long-press timer
- `handleReactionMouseUp` - Quick tap = like, or cancel timer
- `handleReactionMouseLeave` - Cancel timer on mouse leave
- `handleReactionSelect` - Handle picker selection, update reaction type

**JSX changes:**
- Like button now uses `onMouseDown/onMouseUp/onTouchStart/onTouchEnd` instead of `onClick`
- Conditionally renders `HeartDynamicIcon` or `BoltDynamicIcon` based on `reactionType`
- Added `ReactionPicker` component inside the likes div
- Added `picker-open` class to `.river-post-actions` when picker is open

---

#### 7. `frontend/src/components/pages/Home/components/TimelineRiverRow/components/index.js`
**Added:** Export for ReactionPicker

```js
export { default as ReactionPicker } from "./ReactionPicker";
```

---

#### 8. `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_post-actions.scss`
**Added:** Picker-open state styles

```scss
.river-post-actions {
  /* ... existing styles ... */
  
  /* When reaction picker is open, fade other buttons */
  &.picker-open .river-action-btn {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }
  
  /* Keep likes visible */
  &.picker-open .river-post-likes {
    opacity: 1;
    pointer-events: auto;
  }
}
```

---

## Type-Based Colors

The reaction icons use these colors based on post type:

| Post Type | Color | Hex |
|-----------|-------|-----|
| Thoughts | Cyan | `#31fcfcff` |
| Media | Purple | `#ad7afeff` |
| Milestones | Green | `#0ce77dff` |

---

## TODO / Future Work

1. **Backend support** - Currently the reaction type is only stored in local component state. When backend is ready:
   - Add `reaction_type` field to Post model
   - Update `onLike` to accept reaction type parameter
   - Persist reaction type in database

2. **Look for this comment in PostCard.jsx:**
   ```jsx
   // TODO: When backend supports reaction types, pass selectedReaction to API
   ```

---

## Import Usage

```jsx
// Import the new icon
import { BoltDynamicIcon } from '@assets/icons';

// Use it
<BoltDynamicIcon 
  size={18} 
  filled={isActive} 
  fillColor="#31fcfcff" 
  strokeColor="rgba(201,168,255,0.5)" 
/>
```
