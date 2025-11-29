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

## Notes

- Use Pablo's styles: `@use '../../styles/variables' as *;`
- MessageModal is a shared UI component (can be opened from anywhere)
- CORS must be configured FIRST before any frontend API calls work
- Coordinate with Pablo on settings.py changes
- Consider WebSocket for real-time messaging (stretch goal)
