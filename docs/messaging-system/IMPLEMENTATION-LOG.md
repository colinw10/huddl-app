# Messaging System Implementation Log

## Status: ✅ COMPLETE (Jan 22, 2026)

This document records what was done during the messaging system implementation, including problems encountered and solutions.

---

## What We Built

### Backend (restored from main branch)

- `messages_app/models.py` - Message model
- `messages_app/views.py` - API endpoints
- `messages_app/serializers.py` - Data serialization
- `messages_app/urls.py` - Route definitions
- `messages_app/admin.py` - Admin panel registration

### Frontend (new/modified)

- `services/messagesService.js` - API calls to backend
- `contexts/MessageContext.jsx` - Updated to use real API instead of mock data
- `MessageModal/styles/_conversations.scss` - Unread badge styling

---

## Problems Encountered & Solutions

### 1. Backend files missing on feature branch

**Problem:** The `messages_app` folder on `feature/messaging-system` only had `__pycache__/` and `migrations/` — no actual Python files.

**Discovery:** The `__pycache__` folder had compiled `.pyc` files, meaning the source files existed at some point.

**Solution:** Checked `main` branch — files existed there. Restored with:

```bash
git checkout main -- backend/messages_app/models.py backend/messages_app/serializers.py backend/messages_app/views.py backend/messages_app/urls.py backend/messages_app/admin.py backend/messages_app/__init__.py backend/messages_app/apps.py
```

---

### 2. App not registered in Django

**Problem:** Running `makemigrations messages_app` returned:

```
No installed app with label 'messages_app'.
```

**Solution:** Added `'messages_app'` to `INSTALLED_APPS` in `backend/numeneon/settings.py`

---

### 3. API endpoint returning 404

**Problem:** Frontend calls to `/api/messages/conversations/` returned:

```
Not Found: /api/messages/conversations/
[22/Jan/2026] "GET /api/messages/conversations/ HTTP/1.1" 404
```

**Solution:** The messages URLs weren't included in the main `urls.py`. Added:

```python
path('api/messages/', include('messages_app.urls')),
```

---

### 4. Syntax error in messagesService.js

**Problem:** Line 26 had a semicolon instead of a comma after the `getConversations` function:

```javascript
getConversations: async () => {
  // ...
};  // ← WRONG: semicolon

getConversation: async (userId) => {
```

**Solution:** Changed `;` to `,` (object methods need commas between them)

---

### 5. Duplicate conversations

**Problem:** Each user appeared twice in the conversation list.

**Cause:** The seed script (`seed_messages.py`) ran twice, creating duplicate messages.

**Solution:** Cleared all messages and re-seeded:

```python
Message.objects.all().delete()
exec(open('seed_messages.py').read())
```

---

### 6. Unread badge not visible

**Problem:** The unread count badge existed in JSX but wasn't showing.

**Causes:**

1. No CSS for `.unread-badge` class
2. No CSS for `.conversation-meta` container
3. Badge was too close to time text

**Solution:** Added styles to `_conversations.scss`:

```scss
.conversation-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.unread-badge {
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff3366, #ff0055);
  /* ... full styling with glow animation */
}
```

---

### 7. Collapse icons missing on category tabs

**Problem:** On the Profile page, only Milestones showed the collapse/expand icon (−/+). Thoughts and Media tabs didn't show them.

**Cause:** The collapse icon uses `position: absolute` but the parent `.river-label` didn't have `position: relative`.

**Solution:** Added to `.river-label` in `TimelineRiver.scss`:

```scss
.river-label {
  position: relative; /* For absolute positioned collapse icon */
  padding-right: 36px; /* Space for collapse icon */
  /* ... rest of styles */
}
```

---

## Test Data Created

Located in `backend/seed_messages.py`. Creates 16 messages across 5 conversations:

| User         | Messages                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------- |
| **arthurb**  | "Knock-knock" / "nobody's home" / "Damn" / "You still there?"                             |
| **nataliap** | "I don't know how I feel about this" / "I don't feel anything" / "Hello??" / "Answer me!" |
| **colinw**   | "What do you think?" / "You don't wanna know" / "Bro?"                                    |
| **crystalr** | "So, I think I have some typo's" / "I have dyslexia"                                      |
| **titod**    | "Yo!" / "You're alive!" / "Miss you!"                                                     |

**Unread messages** (sent TO pabloPistola, is_read=False):

- Arthur: 1
- Natalia: 2
- Colin: 1
- Crystal: 1
- Tito: 1

---

## Avatar Design Decision

During implementation, we discovered the app had two avatar approaches:

- **Silhouette (`<UserIcon>`)** - used in Feed/Timeline
- **Initials ("JD")** - used in Friends page

**Decision:** This is intentional, not inconsistency:

- **Content-focused views** → Silhouette (visual rhythm)
- **People-focused views** → Initials (identification)

For messaging: Use **initials** since you need to tell conversations apart.

See: `docs/avatar-inconsistency/README.md`

---

## Files Modified

### Backend

- `numeneon/settings.py` - Added messages_app to INSTALLED_APPS
- `numeneon/urls.py` - Added /api/messages/ route
- `messages_app/*` - Restored from main branch

### Frontend

- `services/messagesService.js` - NEW: API service
- `contexts/MessageContext.jsx` - Replaced mock data with API calls
- `MessageModal/styles/_conversations.scss` - Added unread badge + meta styling
- `TimelineRiver/TimelineRiver.scss` - Fixed collapse icon positioning
