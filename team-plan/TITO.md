# Tito - Messaging & Infrastructure

## Role

Direct messaging system, notifications, and backend infrastructure support.

---

## Assigned Files

### Frontend - Messaging

| File                                               | Status | Description            |
| -------------------------------------------------- | ------ | ---------------------- |
| `src/components/ui/MessageModal/MessageModal.jsx`  | ←      | Direct messaging modal |
| `src/components/ui/MessageModal/MessageModal.scss` | ←      | Modal styles           |
| `src/components/ui/MessageModal/index.js`          | ←      | Barrel export          |

### Backend - API (Messages & Notifications)

| File                         | Status | Description                               |
| ---------------------------- | ------ | ----------------------------------------- |
| `backend/api/models.py`      | ←      | Message, Notification models              |
| `backend/api/serializers.py` | ←      | MessageSerializer, NotificationSerializer |
| `backend/api/views.py`       | ←      | MessageViewSet, NotificationViewSet       |
| `backend/api/urls.py`        | ←      | /api/messages/, /api/notifications/       |

### Backend - Config (with Pablo)

| File                        | Status | Description        |
| --------------------------- | ------ | ------------------ |
| `backend/huddl/settings.py` | ←      | CORS configuration |

---

## Tasks

### Week 1

- [ ] Configure CORS in settings.py (with Pablo):
  - Install django-cors-headers
  - Add to INSTALLED_APPS
  - Add CorsMiddleware (FIRST in list)
  - Set CORS_ALLOWED_ORIGINS
- [ ] Test frontend can reach backend

### Week 2

- [ ] Create Message model:
  - sender (ForeignKey to User)
  - recipient (ForeignKey to User)
  - content (TextField)
  - is_read (Boolean)
  - created_at
- [ ] Create Notification model:
  - user (ForeignKey)
  - type (friend_request, message, like, etc.)
  - content (TextField)
  - is_read (Boolean)
  - created_at
- [ ] Run migrations
- [ ] Create serializers
- [ ] Create MessageViewSet:
  - list() - Messages in conversation
  - create() - Send message
  - conversations() - All user conversations
- [ ] Create NotificationViewSet:
  - list() - User notifications
  - mark_read() - Mark as read

### Week 3

- [ ] Implement MessageModal.jsx:
  - Conversation list sidebar
  - Message thread display
  - New message input
  - Real-time feel (polling or optimistic updates)
- [ ] Style with Pablo's SCSS
- [ ] Integrate with Friends list (message a friend)

### Week 4-5

- [ ] Add notification badges (stretch)
- [ ] Polish modal animations
- [ ] Bug fixes and testing

---

## API Endpoints

```
GET    /api/messages/              → List messages in conversation
POST   /api/messages/              → Send new message
GET    /api/messages/conversations/→ List all conversations

GET    /api/notifications/         → List notifications
POST   /api/notifications/:id/mark_read/ → Mark as read
```

---

## Using Pablo's Styles (Important!)

Pablo has already created a complete styling system. **You don't need to write colors, spacing, or effects from scratch.** Just import and use them.

### Step 1: Add Imports to Your SCSS File

At the **top** of `MessageModal.scss`, add:

```scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;
```

**Note:** Your path is shorter (`../../` instead of `../../../`) because MessageModal is in `ui/` not `pages/`.

### Step 2: Use the Design System

```scss
// Example for MessageModal.scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.message-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  
  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }
  
  &__content {
    @include glass-card;              // Glassmorphism effect (one line!)
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 90vw;
    max-height: 80vh;
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border);
  }
  
  &__title {
    color: var(--text-primary);
    font-size: var(--font-size-lg);
  }
  
  &__close {
    @include button-secondary;
    padding: var(--space-xs);
  }
  
  &__messages {
    overflow-y: auto;
    max-height: 400px;
    padding: var(--space-md) 0;
  }
  
  &__input-area {
    display: flex;
    gap: var(--space-sm);
    padding-top: var(--space-md);
    border-top: 1px solid var(--border);
  }
  
  &__input {
    flex: 1;
    padding: var(--space-sm) var(--space-md);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    
    &:focus {
      border-color: var(--primary);
      outline: none;
    }
  }
  
  &__send {
    @include button-primary;
  }
}

.message-bubble {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
  max-width: 80%;
  
  &--sent {
    background: var(--primary);
    color: white;
    margin-left: auto;
  }
  
  &--received {
    background: var(--surface);
    color: var(--text-primary);
  }
}
```

### Quick Reference

| What You Need | What to Write |
|---------------|---------------|
| Glass card effect | `@include glass-card;` |
| Primary button | `@include button-primary;` |
| Modal overlay | `backdrop-filter: blur(4px);` |
| Input background | `background: var(--surface);` |
| Border color | `border: 1px solid var(--border);` |
| Focus state | `border-color: var(--primary);` |

### Questions?

Check `frontend/src/styles/_variables.scss` for all available variables, or ask Pablo!

---

## Notes

- MessageModal is a shared UI component (can be opened from anywhere)
- CORS must be configured FIRST before any frontend API calls work
- Coordinate with Pablo on settings.py changes
- Consider WebSocket for real-time messaging (stretch goal)
