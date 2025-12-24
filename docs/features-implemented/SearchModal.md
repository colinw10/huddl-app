# Search Modal

## Overview

A global search modal accessible from the TopBar that allows users to search for other users and posts throughout the application.

## Features

### Search Targets

1. **Users** - Search by:
   - Username
   - First name
   - Last name
   - Display name

2. **Posts** - Search by:
   - Post content
   - Author username

### Filter Tabs

- **All** - Shows both users and posts
- **Users (count)** - Shows only user results
- **Posts (count)** - Shows only post results (limited to 10)

### Actions

**User Results:**
- Click row → Navigate to `/profile/:username`
- Click message icon → Open DM with that user

**Post Results:**
- Click row → Navigate to post author's profile

## Implementation

### Component Location

```
frontend/src/components/layout/TopBar/SearchModal/
├── SearchModal.jsx
├── SearchModal.scss
└── index.js
```

### Integration with TopBar

```jsx
// TopBar.jsx
const [isSearchOpen, setIsSearchOpen] = useState(false);

<div 
  className="icon-placeholder icon-search" 
  onClick={() => setIsSearchOpen(true)}
>
  {/* Targeting reticle icon */}
</div>

<SearchModal 
  isOpen={isSearchOpen} 
  onClose={() => setIsSearchOpen(false)} 
/>
```

### Data Sources

```jsx
const { posts } = usePosts();
const { friends } = useFriends();
const { openMessages } = useMessages();
```

The search combines:
1. Friends from FriendsContext
2. Post authors extracted from PostsContext

### Search Logic

```jsx
const filteredUsers = query ? allUsers.filter(user => 
  user.username?.toLowerCase().includes(query) ||
  user.first_name?.toLowerCase().includes(query) ||
  user.last_name?.toLowerCase().includes(query) ||
  user.displayName?.toLowerCase().includes(query)
) : [];

const filteredPosts = query ? posts.filter(post =>
  post.content?.toLowerCase().includes(query) ||
  post.author?.username?.toLowerCase().includes(query)
).slice(0, 10) : []; // Limit to 10 posts
```

## Styling

### Design Pattern

Reuses MessageModal design patterns:
- Blurred overlay backdrop
- Cyberpunk search input with clip-path
- Glowing scrollbar
- Gradient accent lines

### Color Accents

- **Users**: Cyan/green gradient avatars
- **Posts**: Pink/magenta gradient avatars
- **Tabs**: Pink accent when active

### Responsive

| Width | Behavior |
| ----- | -------- |
| > 768px | Centered modal with padding |
| ≤ 768px | Near-full width modal |
| ≤ 480px | Full screen modal |

## Keyboard Navigation

- **Escape** - Close modal and clear search
- Focus automatically moves to search input when modal opens

## Light Mode

The modal has full light mode support with adjusted backgrounds, borders, and text colors.

## Related Features

- [MessagingSystem.md](./MessagingSystem.md) - Message icon opens DM
- [UserProfileNavigation.md](./UserProfileNavigation.md) - User clicks navigate to profile
