# Card User Headers

## Overview

All timeline cards now display the user's avatar and username **inside** the card itself. This provides consistent visual identity across all feed types, ensuring users always know whose content they're viewing as they scroll.

## Design Rationale

**Problem:** As users scroll through long feeds, they may lose track of whose profile they're viewing or whose post they're looking at.

**Solution:** Place a compact user header (avatar + username) at the top of every card, inside the card container.

## Implementation

### Card Structure

```jsx
<div className="river-card text-card">
  {/* User header inside card */}
  <div className="river-card-author">
    <div className="friend-avatar">{getInitials(user)}</div>
    <span className="friend-name">{user.username}</span>
  </div>
  <div className="river-card-content">
    <p className="river-post-text">{post.content}</p>
    <span className="river-timestamp">{formatDate(post.created_at)}</span>
  </div>
  {/* Actions, comments, etc. */}
</div>
```

### Styling

```scss
.river-card-author {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.friend-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cyan), var(--magenta));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--bg-base);
}

.friend-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}
```

## Card Types with User Headers

### 1. Home Feed Cards (TimelineRiverRow.jsx)

- Shows post author's avatar and username
- Clickable to navigate to author's profile
- Uses `.clickable-user` class for hover effects

### 2. Friends Feed Cards (TimelineRiver.jsx)

- Shows friend's avatar and username
- Clickable to navigate to friend's profile
- Uses `.river-card-author.clickable-friend` class

### 3. My Timeline Carousel Cards (TimelineRiver.jsx)

- Shows profile owner's avatar and username
- Not clickable (already on their profile)
- Applied to all three types: thoughts, media, milestones

### 4. My Timeline River Continuation (TimelineRiver.jsx)

- Shows profile owner's avatar and username
- Posts beyond the first 12 in each category
- Consistent with carousel cards above

### 5. All Posts Section (Profile.jsx)

- Shows profile owner's avatar and username
- Chronological list of all posts
- Same styling as timeline cards

## Helper Function

Each component uses a `getInitials` helper:

```jsx
const getInitials = (user) => {
  if (!user) return "??";
  const first = user.first_name?.[0] || "";
  const last = user.last_name?.[0] || "";
  if (first && last) return `${first}${last}`.toUpperCase();
  if (first) return first.toUpperCase();
  if (user.username) return user.username.slice(0, 2).toUpperCase();
  return "??";
};
```

## Files Modified

| File                                                                                  | Changes                                                   |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.jsx` | Added user header to Home feed cards                      |
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.jsx`    | Added user header to My Timeline and Friends Feed cards   |
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.scss`   | Added `.river-card-author` and `.clickable-friend` styles |
| `frontend/src/components/pages/Profile/Profile.jsx`                                   | Added user header to All Posts section cards              |
| `frontend/src/components/pages/Profile/Profile.scss`                                  | Uses TimelineRiver styles for All Posts                   |

## Visual Consistency

All cards now follow the same structure:

```
┌────────────────────────────────┐
│ [Avatar] Username              │  ← User header
├────────────────────────────────┤
│                                │
│ Card content                   │
│ (text, media, milestone)       │
│                                │
│ Timestamp                      │
├────────────────────────────────┤
│ [Like] [Comment] [Share] ...   │  ← Actions
└────────────────────────────────┘
```

## Related Features

- [UserProfileNavigation.md](./UserProfileNavigation.md) - Click handling for navigation
- [MobileCategoryTabs.md](./MobileCategoryTabs.md) - Mobile category switching
- [TimelineCarousel.md](./TimelineCarousel.md) - Carousel navigation within cards
