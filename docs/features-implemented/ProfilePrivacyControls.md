# Profile Privacy Controls

## Overview

When viewing another user's profile, certain interactive elements are hidden to maintain privacy and prevent unauthorized actions.

## Implementation Details

### Detection Logic (Profile.jsx)

```jsx
const { username: profileUsername } = useParams();
const isOwnProfile =
  !profileUsername || profileUsername === currentUser?.username;
```

- **Own Profile**: URL is `/profile` OR `/profile/{yourUsername}`
- **Other's Profile**: URL is `/profile/{otherUsername}`

### Profile User Lookup

When viewing another user's profile, we need their data:

```jsx
const profileUser = useMemo(() => {
  if (isOwnProfile) return currentUser;

  // Try to find from friends list
  const friend = friends.find((f) => f.username === profileUsername);
  if (friend) return friend;

  // Try to find from post authors
  const postWithUser = posts.find((p) => p.user?.username === profileUsername);
  if (postWithUser) return postWithUser.user;

  return { username: profileUsername, name: profileUsername };
}, [isOwnProfile, currentUser, profileUsername, friends, posts]);
```

## Conditional UI Elements

### Elements Shown Only on Own Profile

| Element             | Component         | Purpose              |
| ------------------- | ----------------- | -------------------- |
| Post Composer       | `<PostComposer>`  | Write new posts      |
| Friends Feed Toggle | View mode buttons | Switch between views |
| Edit Button         | TimelineRiver row | Edit existing posts  |
| Delete Button       | TimelineRiver row | Delete posts         |

### Code Examples

**Profile.jsx - Composer:**

```jsx
{
  isOwnProfile && <PostComposer user={currentUser} />;
}
```

**Profile.jsx - View Toggle:**

```jsx
{
  isOwnProfile && (
    <div className="profile-view-toggle">
      <button onClick={() => setViewMode("timeline")}>My Timeline</button>
      <button onClick={() => setViewMode("friends")}>Friends Feed</button>
    </div>
  );
}
```

**TimelineRiver.jsx - Action Buttons:**

```jsx
{
  isOwnProfile && (
    <div className="post-actions">
      <button onClick={(e) => handleEdit(e, post)}>✎</button>
      <button onClick={(e) => handleDelete(e, post.id)}>✕</button>
    </div>
  );
}
```

### Prop Passing

```jsx
// Profile.jsx
<TimelineRiver
  posts={postsToDisplay}
  currentUser={profileUser}
  isOwnProfile={isOwnProfile}
  // ... other props
/>
```

## Profile Header

Shows whose profile is being viewed:

```jsx
{
  !isOwnProfile && profileUser && (
    <div className="profile-header-label">
      {profileUser.name || profileUser.username}'s Profile
    </div>
  );
}
```

## Files Modified

| File                                                                               | Changes                                                                              |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `frontend/src/components/pages/Profile/Profile.jsx`                                | Added `useParams`, `isOwnProfile` logic, conditional rendering, `profileUser` lookup |
| `frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.jsx` | Added `isOwnProfile` prop, conditional edit/delete buttons                           |
| `frontend/src/components/pages/Profile/Profile.scss`                               | Added `.profile-header-label` styles                                                 |

## Visible Elements on Other Profiles

When viewing someone else's profile:

✅ **Visible:**

- Profile picture and bio
- Activity Heatmap
- Engagement Wave Chart
- Timeline posts (read-only)
- Like/comment interaction icons

❌ **Hidden:**

- Post composer
- Friends Feed toggle
- Edit post buttons
- Delete post buttons
- Settings/preferences

## Security Notes

- Privacy is enforced at the UI level
- Backend API should also validate ownership before allowing edit/delete operations
- Users cannot access private data through URL manipulation alone
