# Crystal - Profile & Friends

## Role

Profile page, friends list, and friends backend API.

---

## Assigned Files

### Frontend - Profile Page

| File                                                                   | Status | Description            |
| ---------------------------------------------------------------------- | ------ | ---------------------- |
| `src/components/pages/Profile/Profile.jsx`                             | ←      | User profile container |
| `src/components/pages/Profile/Profile.scss`                            | ←      | Profile styles         |
| `src/components/pages/Profile/index.js`                                | ←      | Barrel export          |
| `src/components/pages/Profile/components/ProfileCard/ProfileCard.jsx`  | ←      | Flip card component    |
| `src/components/pages/Profile/components/ProfileCard/ProfileCard.scss` | ←      | Card styles            |
| `src/components/pages/Profile/components/ProfileCard/index.js`         | ←      | Barrel export          |

### Frontend - Friends Page

| File                                        | Status | Description             |
| ------------------------------------------- | ------ | ----------------------- |
| `src/components/pages/Friends/Friends.jsx`  | ←      | Friends list & requests |
| `src/components/pages/Friends/Friends.scss` | ←      | Friends styles          |
| `src/components/pages/Friends/index.js`     | ←      | Barrel export           |

### Backend - Friends API

| File                             | Status | Description                               |
| -------------------------------- | ------ | ----------------------------------------- |
| `backend/friends/models.py`      | ←      | FriendRequest, Friendship models          |
| `backend/friends/admin.py`       | ←      | Register models in admin                  |
| `backend/friends/serializers.py` | ←      | FriendRequestSerializer, FriendSerializer |
| `backend/friends/views.py`       | ←      | FriendViewSet endpoints                   |
| `backend/friends/urls.py`        | ←      | /api/friends/ routes                      |

---

## Tasks

### Week 1

- [ ] Create FriendRequest model:
  - from_user (ForeignKey)
  - to_user (ForeignKey)
  - status (pending/accepted/declined)
  - created_at
- [ ] Create Friendship model:
  - user1, user2 (ForeignKeys)
  - created_at
- [ ] Run migrations
- [ ] Register models in admin

### Week 2

- [ ] Create FriendRequestSerializer:
  - from_user (nested, read_only)
  - to_user (nested, read_only)
  - to_user_id (write_only)
  - status, created_at
- [ ] Create FriendSerializer (for list display)
- [ ] Create FriendViewSet with:
  - list() - My friends
  - requests() - Pending requests
  - send_request() - Send request
  - accept() - Accept request
  - decline() - Decline request
  - destroy() - Remove friend
- [ ] Set up friends/urls.py

### Week 3

- [ ] Implement Profile.jsx:
  - User info display
  - Avatar, bio, stats
  - Edit profile (if own profile)
- [ ] Implement ProfileCard flip component:
  - Front: avatar, name, quick stats
  - Back: bio, interests, actions
- [ ] Implement Friends.jsx:
  - Friends list
  - Pending requests section
  - Accept/decline buttons
  - Search/filter friends
- [ ] Style with Pablo's SCSS

### Week 4-5

- [ ] Add friend suggestions (stretch)
- [ ] Polish animations (card flip)
- [ ] Bug fixes and testing

---

## API Endpoints

```
GET    /api/friends/              → List my friends
GET    /api/friends/requests/     → List pending requests
POST   /api/friends/send_request/ → Send friend request
POST   /api/friends/:id/accept/   → Accept request
POST   /api/friends/:id/decline/  → Decline request
DELETE /api/friends/:id/          → Remove friend
```

---

## Using Pablo's Styles (Important!)

Pablo has already created a complete styling system. **You don't need to write colors, spacing, or effects from scratch.** Just import and use them.

### Step 1: Add Imports to Your SCSS File

At the **top** of any `.scss` file (like `Profile.scss` or `Friends.scss`), add:

```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;
```

This gives you access to all the design system variables and mixins.

### Step 2: Use the Design System

```scss
// Example for Profile.scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

.profile {
  padding: var(--space-lg);           // 24px padding
  
  &__header {
    display: flex;
    gap: var(--space-md);             // 16px gap
    margin-bottom: var(--space-xl);
  }
}

.profile-card {
  @include glass-card;                // Glassmorphism effect (one line!)
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  
  // For the flip effect
  perspective: 1000px;
  
  &__front, &__back {
    backface-visibility: hidden;
  }
  
  &__name {
    color: var(--text-primary);
    font-size: var(--font-size-xl);   // 24px
  }
  
  &__bio {
    color: var(--text-secondary);     // Muted text
  }
  
  &__action-button {
    @include button-primary;
  }
}

.friend-card {
  @include glass-card;
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  
  &__accept {
    @include button-primary;
  }
  
  &__decline {
    @include button-secondary;
  }
}
```

### Quick Reference

| What You Need | What to Write |
|---------------|---------------|
| Glass card effect | `@include glass-card;` |
| Primary button | `@include button-primary;` |
| Secondary button | `@include button-secondary;` |
| Main text color | `color: var(--text-primary);` |
| Muted text | `color: var(--text-secondary);` |
| Avatar border | `border: 2px solid var(--primary);` |
| Card padding | `padding: var(--space-lg);` |

### Questions?

Check `frontend/src/styles/_variables.scss` for all available variables, or ask Pablo!

---

## Notes

- ProfileCard has a flip animation (front/back) - ask Pablo for help with the CSS transform
- Prevent duplicate friend requests (unique_together)
- Friendship is bidirectional (both users are friends)
