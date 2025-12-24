# Messaging System

## Overview

Direct messaging capability from anywhere in the app. Users can start conversations from post action icons, friend lists, or the dedicated messages page.

## Architecture

### MessageContext (Central State)

Location: `frontend/src/contexts/MessageContext.jsx`

**State Management:**

```jsx
const [messages, setMessages] = useState([]); // All messages
const [conversations, setConversations] = useState([]); // Conversation list
const [activeConversation, setActiveConversation] = useState(null);
```

**Key Functions:**

- `startConversation(userId, username)` - Initiate a new DM
- `sendMessage(conversationId, content)` - Send a message
- `getConversation(userId)` - Get/create conversation with user
- `getUnreadCount()` - Get total unread count

### Entry Points

#### 1. Post Action Icons

Users can click the message icon on any post to DM the author.

```jsx
// TimelineRiverRow.jsx
<button
  className="action-icon message-icon"
  onClick={() => startConversation(user.id, user.username)}
  title={`Message ${user.name}`}
>
  💬
</button>
```

#### 2. Friends List

Each friend card has a message option.

#### 3. Messages Page

Dedicated page for viewing all conversations.

## Data Structure

### Conversation Object

```javascript
{
  id: "conv_123",
  participants: [
    { id: 1, username: "you", name: "Your Name" },
    { id: 2, username: "friend", name: "Friend Name" }
  ],
  lastMessage: {
    content: "Hey!",
    timestamp: "2025-01-15T10:30:00Z",
    senderId: 2
  },
  unreadCount: 1
}
```

### Message Object

```javascript
{
  id: "msg_456",
  conversationId: "conv_123",
  senderId: 2,
  content: "Hey! How are you?",
  timestamp: "2025-01-15T10:30:00Z",
  read: false
}
```

## UI Components

### Messages Page

- Conversation list sidebar
- Active conversation view
- Message composer
- Real-time message display

### Notification Badge

Shows unread message count in navigation.

## Files Involved

| File                                       | Purpose                      |
| ------------------------------------------ | ---------------------------- |
| `frontend/src/contexts/MessageContext.jsx` | Central messaging state      |
| `frontend/src/contexts/index.js`           | Exports MessageContext       |
| `frontend/src/components/pages/Messages/`  | Messages page components     |
| Action icons in post rows                  | Entry point for starting DMs |

## User Flow

1. **From Post**: User sees a post by "arthurb" → clicks message icon → conversation opens
2. **From Friends**: User views friends list → clicks message button → conversation opens
3. **From Messages**: User goes to /messages → sees all conversations → continues chat

## Styling

Messages follow the neon aesthetic:

- Cyan accents for own messages
- Magenta accents for received messages
- Glassmorphism message bubbles
- Glow effects on hover

## Future Enhancements

- [ ] Real-time updates via WebSocket
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] Message reactions
- [ ] Image/media attachments
- [ ] Group conversations
