# Step 4: Update Components That Use Messages

After changing the context, some components will break because the data shape changed. Here's how to fix them.

---

## Find Components That Use Messages

Search your codebase for:

```
useMessages
```

Common files that might use it:

- Message modal component
- Conversation list component
- Chat/message view component
- TopBar (if it shows unread count)
- Any "Message User" button

---

## Common Fixes

### Fix 1: `message.text` → `message.content`

**Before (mock data):**

```jsx
<p>{message.text}</p>
```

**After (API data):**

```jsx
<p>{message.content}</p>
```

---

### Fix 2: `message.sender === 'me'` → Compare IDs

**Before (mock data):**

```jsx
const isMe = message.sender === "me";
```

**After (API data):**

```jsx
const { user } = useAuth(); // Get current user
const isMe = message.sender.id === user.id;
```

---

### Fix 3: `conversation.user.displayName` → Build from parts

**Before (mock data):**

```jsx
<span>{conversation.user.displayName}</span>
```

**After (API data):**

```jsx
// Option A: Use the helper from context
const { getDisplayName } = useMessages();
<span>{getDisplayName(conversation.user)}</span>

// Option B: Inline
<span>
  {conversation.user.first_name} {conversation.user.last_name}
</span>

// Option C: Fallback to username
<span>
  {conversation.user.first_name
    ? `${conversation.user.first_name} ${conversation.user.last_name}`
    : conversation.user.username}
</span>
```

---

### Fix 4: `message.timestamp` → `message.created_at`

**Before (mock data):**

```jsx
<span>{message.timestamp.toLocaleTimeString()}</span>
```

**After (API data):**

```jsx
<span>{new Date(message.created_at).toLocaleTimeString()}</span>
```

---

### Fix 5: `conversation.id` → `conversation.user.id`

**Before (mock data):**

```jsx
<div key={conversation.id} onClick={() => selectConversation(conversation.id)}>
```

**After (API data):**

```jsx
<div key={conversation.user.id} onClick={() => selectConversation(conversation.user.id)}>
```

---

### Fix 6: `conversation.messages` → `selectedMessages`

The API doesn't return messages inside each conversation object. Messages are fetched separately.

**Before (mock data):**

```jsx
{conversation.messages.map(msg => ...)}
```

**After (API data):**

```jsx
const { selectedMessages } = useMessages();
{selectedMessages.map(msg => ...)}
```

---

### Fix 7: `conversation.lastMessageTime` → `conversation.last_message.created_at`

**Before (mock data):**

```jsx
<span>{conversation.lastMessageTime.toLocaleDateString()}</span>
```

**After (API data):**

```jsx
<span>
  {new Date(conversation.last_message.created_at).toLocaleDateString()}
</span>
```

---

## Context Value Changes

### Old (mock data):

```javascript
{
  conversations,              // Array with messages inside each
  selectedConversationId,     // String like 'conv-1'
  selectedConversation,       // Object with messages array
  sendMessage(text),          // Sync function
}
```

### New (API data):

```javascript
{
  conversations,              // Array WITHOUT messages (just last_message preview)
  selectedUserId,             // INTEGER user id
  selectedMessages,           // Separate array of messages for selected conversation
  selectedConversation,       // Object with last_message and unread_count
  sendMessage(text),          // ASYNC function - returns { success: true/false }
  isLoading,                  // NEW: true while fetching
  error,                      // NEW: error message if fetch failed
  getDisplayName(user),       // NEW: helper function
}
```

---

## Example: Updated Conversation List Component

```jsx
function ConversationList() {
  const {
    conversations,
    selectedUserId,
    selectConversation,
    isLoading,
    getDisplayName,
  } = useMessages();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="conversation-list">
      {conversations.map((conv) => (
        <div
          key={conv.user.id}
          className={`conversation-item ${conv.user.id === selectedUserId ? "active" : ""}`}
          onClick={() => selectConversation(conv.user.id)}
        >
          <div className="conv-avatar">
            {conv.user.username.slice(0, 2).toUpperCase()}
          </div>
          <div className="conv-info">
            <span className="conv-name">{getDisplayName(conv.user)}</span>
            <span className="conv-preview">{conv.last_message?.content}</span>
          </div>
          {conv.unread_count > 0 && (
            <span className="unread-badge">{conv.unread_count}</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Example: Updated Message View Component

```jsx
function MessageView() {
  const { selectedMessages, sendMessage } = useMessages();
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSend = async () => {
    const result = await sendMessage(text);
    if (result.success) {
      setText("");
    }
  };

  return (
    <div className="message-view">
      <div className="messages">
        {selectedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender.id === user.id ? "sent" : "received"}`}
          >
            <p>{msg.content}</p>
            <span className="time">
              {new Date(msg.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
```

---

## Next Step

Go to [STEP-5-CREATE-TEST-DATA.md](./STEP-5-CREATE-TEST-DATA.md)
