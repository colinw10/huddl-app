# Step 1: Understand the Data Shape Differences

Before removing mock data, you MUST understand how the mock data differs from the API data. If you don't map them correctly, your components will break.

---

## Mock Data Shape (current)

```javascript
// MOCK conversation object
{
  id: 'conv-1',                    // STRING id like 'conv-1'
  user: {
    id: 1,
    username: 'arthurb',
    displayName: 'Arthur Bernier', // displayName (camelCase)
    avatar: null,
  },
  messages: [
    {
      id: 'm1',
      text: 'Hey!',                // "text" field
      sender: 'them',              // 'them' or 'me' (string)
      timestamp: new Date(),       // JavaScript Date object
    },
  ],
  lastMessageTime: new Date(),     // JavaScript Date object
}
```

## API Data Shape (from backend)

```javascript
// API conversation object (from /messages/conversations/)
{
  user: {
    id: 1,
    username: 'arthurb',
    first_name: 'Arthur',          // first_name (snake_case)
    last_name: 'Bernier',          // last_name (snake_case)
    // NO displayName!
    // NO avatar!
  },
  last_message: {
    id: 5,                         // INTEGER id
    sender: { id: 1, username: 'arthurb', ... },  // OBJECT, not string!
    receiver: { id: 2, username: 'pablopistola', ... },
    content: 'Hey!',               // "content" field, NOT "text"
    is_read: false,
    created_at: '2026-01-22T10:30:00Z',  // ISO STRING, not Date
  },
  unread_count: 2,
}

// API message object (from /messages/conversation/?user_id=X)
{
  id: 5,                           // INTEGER id
  sender: { id: 1, username: 'arthurb', ... },
  receiver: { id: 2, username: 'pablopistola', ... },
  content: 'Hey!',                 // "content" NOT "text"
  is_read: false,
  created_at: '2026-01-22T10:30:00Z',
}
```

---

## Key Differences to Watch

| Mock Data                  | API Data                             | Action Needed                     |
| -------------------------- | ------------------------------------ | --------------------------------- |
| `id: 'conv-1'` (string)    | No conversation id                   | Use `user.id` as identifier       |
| `user.displayName`         | `user.first_name` + `user.last_name` | Create displayName from parts     |
| `user.avatar`              | Not returned                         | Add fallback or remove            |
| `message.text`             | `message.content`                    | Rename in components              |
| `message.sender: 'them'`   | `message.sender: { id, username }`   | Compare sender.id to current user |
| `message.timestamp` (Date) | `message.created_at` (string)        | Parse with `new Date()`           |
| `lastMessageTime` (Date)   | `last_message.created_at` (string)   | Parse with `new Date()`           |

---

## Components That Will Break If You Don't Fix This

Any component using `useMessages()` that accesses:

- `conversation.id` → Change to `conversation.user.id`
- `conversation.user.displayName` → Create from `first_name + last_name`
- `message.text` → Change to `message.content`
- `message.sender === 'me'` → Change to `message.sender.id === currentUser.id`
- `message.timestamp` → Change to `new Date(message.created_at)`

---

## Next Step

Go to [STEP-2-CREATE-SERVICE.md](./STEP-2-CREATE-SERVICE.md)
