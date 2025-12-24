# User Profile Navigation

## Overview

Users can click on any username or avatar throughout the app to navigate directly to that user's profile page.

## Implementation Details

### Route Configuration

```jsx
// App.jsx
<Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
<Route path="/profile/:username" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
```

- `/profile` → Your own profile
- `/profile/:username` → Another user's profile

### Home Feed (TimelineRiverRow.jsx)

**Clickable Elements:**

- User avatar (`.river-avatar`)
- Author name (`.river-author`)

**Click Handler:**

```jsx
const handleUserClick = (e, userId, username) => {
  e.stopPropagation();
  if (currentUser?.id === userId || currentUser?.username === username) {
    navigate("/profile");
  } else {
    navigate(`/profile/${username}`);
  }
};
```

**Usage:**

```jsx
<div
  className="river-avatar clickable-user"
  onClick={(e) => handleUserClick(e, user.id, user.username)}
  title={`View ${user.name}'s profile`}
>
```

### Profile Friends Feed (TimelineRiver.jsx)

**Clickable Elements:**

- Friend row header (avatar + name)

```jsx
<div
  className="friend-row-header clickable-friend"
  onClick={() => navigate(`/profile/${friend.username}`)}
  title={`View ${friend.username}'s profile`}
>
```

## Styling

### CSS Classes

```scss
.clickable-user {
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: drop-shadow(0 0 8px var(--cyan));
    transform: scale(1.05);
  }
}

.river-author.clickable-user:hover {
  background: linear-gradient(
    180deg,
    var(--cyan) 22%,
    rgba(79, 255, 255, 0.699) 100%
  );
  -webkit-background-clip: text;
}

.friend-row-header.clickable-friend {
  cursor: pointer;

  &:hover {
    background: rgba(79, 255, 255, 0.08);
    transform: translateX(4px);
  }
}
```

## Files Modified

| File                                                                                    | Changes                                                           |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `frontend/src/App.jsx`                                                                  | Added `/profile/:username` route                                  |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.jsx`   | Added `handleUserClick`, import `useNavigate`, clickable elements |
| `frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_post-card.scss` | Added `.clickable-user` styles                                    |
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.jsx`      | Added clickable friend headers                                    |
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.scss`     | Added `.clickable-friend` styles                                  |

## User Flow

1. User sees a post by "arthurb" in their Home feed
2. User clicks on "arthurb" username
3. App navigates to `/profile/arthurb`
4. Profile page loads showing arthurb's posts
5. User sees arthurb's timeline (no edit/delete buttons, no friends feed toggle)
