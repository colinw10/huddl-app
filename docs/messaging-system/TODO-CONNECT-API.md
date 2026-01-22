# Messaging System — TODO: Connect to Real API

## Current State

- ✅ Backend API is complete (models, views, endpoints)
- ✅ Frontend MessageContext exists with mock data
- ❌ Frontend does NOT call the backend API yet
- ❌ Mock data and real data are completely disconnected

---

## STEP 1: Create the Messages Service

Create this file: `frontend/src/services/messagesService.js`

```javascript
// 🔵 PABLO - Messaging System
// messagesService.js - API calls for direct messages

import apiClient from "./apiClient";

const messagesService = {
  // GET /api/messages/conversations/ - List all conversations
  getConversations: async () => {
    const response = await apiClient.get("/messages/conversations/");
    return response.data;
  },

  // GET /api/messages/conversation/?user_id=X - Get messages with specific user
  getConversation: async (userId) => {
    const response = await apiClient.get(
      `/messages/conversation/?user_id=${userId}`,
    );
    return response.data;
  },

  // POST /api/messages/ - Send a new message
  sendMessage: async (receiverId, content) => {
    const response = await apiClient.post("/messages/", {
      receiver_id: receiverId,
      content,
    });
    return response.data;
  },

  // PATCH /api/messages/{id}/read/ - Mark single message as read
  markAsRead: async (messageId) => {
    const response = await apiClient.patch(`/messages/${messageId}/read/`);
    return response.data;
  },

  // PATCH /api/messages/read_all/?user_id=X - Mark all from user as read
  markAllAsRead: async (userId) => {
    const response = await apiClient.patch(
      `/messages/read_all/?user_id=${userId}`,
    );
    return response.data;
  },
};

export default messagesService;
```

---

## STEP 2: Update MessageContext.jsx

Replace the entire file with this API-connected version:

```jsx
// 🔵 PABLO - UI Architect
// MessageContext.jsx - Shared state for messaging system (API-connected)

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import messagesService from "@services/messagesService";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  // 🔵 Modal visibility state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // 🔵 Conversations state - fetched from API
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔵 Currently selected conversation
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // 🔵 Fetch conversations when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchConversations();
    } else {
      setConversations([]);
    }
  }, [isAuthenticated, user]);

  // 🔵 Fetch all conversations from API
  const fetchConversations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await messagesService.getConversations();
      setConversations(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch conversations");
      console.error("Failed to fetch conversations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔵 Fetch messages for a specific conversation
  const fetchConversation = async (userId) => {
    try {
      const messages = await messagesService.getConversation(userId);
      setSelectedMessages(messages);
      setSelectedUserId(userId);
    } catch (err) {
      console.error("Failed to fetch conversation:", err);
    }
  };

  // 🔵 Open modal (optionally with a specific user to message)
  const openMessages = async (targetUser = null) => {
    setIsMessageModalOpen(true);

    if (targetUser) {
      await fetchConversation(targetUser.id);
    } else if (conversations.length > 0 && !selectedUserId) {
      // Default to first conversation
      await fetchConversation(conversations[0].user.id);
    }
  };

  const closeMessages = () => {
    setIsMessageModalOpen(false);
  };

  // 🔵 Select a conversation by user ID
  const selectConversation = async (userId) => {
    await fetchConversation(userId);
    // Mark messages as read when opening conversation
    await messagesService.markAllAsRead(userId);
    // Refresh conversation list to update unread counts
    fetchConversations();
  };

  // 🔵 Send a message to the selected user
  const sendMessage = async (text) => {
    if (!text.trim() || !selectedUserId) return;

    try {
      const newMessage = await messagesService.sendMessage(
        selectedUserId,
        text.trim(),
      );

      // Add new message to selected messages
      setSelectedMessages((prev) => [...prev, newMessage]);

      // Refresh conversations to update last message preview
      fetchConversations();

      return { success: true };
    } catch (err) {
      console.error("Failed to send message:", err);
      return {
        success: false,
        error: err.response?.data?.detail || "Failed to send",
      };
    }
  };

  // 🔵 Get the currently selected conversation object
  const getSelectedConversation = () => {
    return conversations.find((c) => c.user.id === selectedUserId) || null;
  };

  return (
    <MessageContext.Provider
      value={{
        // State
        isMessageModalOpen,
        isLoading,
        error,
        conversations,
        selectedUserId,
        selectedMessages,
        selectedConversation: getSelectedConversation(),

        // Actions
        openMessages,
        closeMessages,
        selectConversation,
        sendMessage,
        fetchConversations,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
}
```

---

## STEP 3: Create Test Data in Django Admin

### 3.1 Start the backend

```bash
cd backend
python manage.py runserver 8000
```

### 3.2 Open Django Admin

Go to: `http://localhost:8000/admin/`

Login with your superuser credentials.

### 3.3 Register Message model in admin (if not already)

Edit `backend/messages_app/admin.py`:

```python
from django.contrib import admin
from .models import Message

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'content', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['sender__username', 'receiver__username', 'content']
```

### 3.4 Create test messages

1. Click **"Messages"** in the admin sidebar
2. Click **"Add Message"**
3. Fill in:
   - **Sender:** Pick a user (e.g., `arthurb`)
   - **Receiver:** Pick your seed user (e.g., `pablopistola`)
   - **Content:** "Hey, are you coming to the meetup tonight?"
   - **Is read:** Leave unchecked
4. Click **Save**
5. Repeat to create a conversation thread

### Example test data to create:

| Sender       | Receiver     | Content                                    |
| ------------ | ------------ | ------------------------------------------ |
| arthurb      | pablopistola | Hey, are you coming to the meetup tonight? |
| pablopistola | arthurb      | Yes! I'll be there around 7                |
| arthurb      | pablopistola | Perfect, see you there!                    |
| nataliap     | pablopistola | That sounds great!                         |
| colinw       | pablopistola | Let's build something cool                 |

---

## STEP 4: Test the Connection

1. Start backend: `make b` (or `python manage.py runserver 8000`)
2. Start frontend: `make f` (or `npm run dev`)
3. Login as `pablopistola`
4. Open the messages modal
5. You should see conversations with `arthurb`, `nataliap`, `colinw`
6. Send a reply — it saves to the database
7. Login as `arthurb` in a different browser/incognito
8. You should see the reply you sent

---

## What Gets Removed

When you switch to the API version, DELETE these lines from `MessageContext.jsx`:

```jsx
// DELETE THIS ENTIRE BLOCK:
const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    user: { ... },
    messages: [ ... ],
    ...
  },
  // ... all the mock conversations
];
```

Also remove:

- `useState(INITIAL_CONVERSATIONS)` → becomes `useState([])`
- The old `sendMessage` that only updated local state

---

## Checklist

- [ ] Create `messagesService.js`
- [ ] Update `MessageContext.jsx` to use API
- [ ] Register Message in Django admin
- [ ] Create test messages in admin panel
- [ ] Test sending/receiving between users
- [ ] Delete mock data after confirming API works
