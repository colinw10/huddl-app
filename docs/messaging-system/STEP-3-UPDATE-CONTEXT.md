# Step 3: Update MessageContext.jsx

This is the big change. You're replacing mock data with real API calls.

---

## BEFORE YOU START

1. ✅ You created `messagesService.js` (Step 2)
2. ✅ Backend is running (`make b`)
3. ✅ You have test messages in Django admin (or will create after)

---

## What to Delete

Open `frontend/src/contexts/MessageContext.jsx` and DELETE this entire block (around lines 14-87):

```javascript
// 🔵 MOCK DATA - In production, this would come from an API
// DELETE EVERYTHING FROM HERE...
const INITIAL_CONVERSATIONS = [
  {
    id: "conv-1",
    user: {
      id: 1,
      username: "arthurb",
      displayName: "Arthur Bernier",
      avatar: null,
    },
    messages: [
      {
        id: "m1",
        text: "Hey! Are you coming to the meetup tonight?",
        sender: "them",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "m2",
        text: "Yes! I'll be there around 7",
        sender: "me",
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
    lastMessageTime: new Date(Date.now() - 3500000),
  },
  // ... all other mock conversations ...
];
// ...TO HERE (delete all of INITIAL_CONVERSATIONS)
```

---

## What to Add

### 1. Add imports at the top

```javascript
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import messagesService from "@services/messagesService";
```

### 2. Replace the entire MessageProvider function

```javascript
export function MessageProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  // 🔵 Modal visibility state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // 🔵 Conversations state - fetched from API (starts empty, NOT mock data)
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
      setSelectedUserId(null);
      setSelectedMessages([]);
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
    try {
      await messagesService.markAllAsRead(userId);
      // Refresh conversation list to update unread counts
      fetchConversations();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // 🔵 Send a message to the selected user
  const sendMessage = async (text) => {
    if (!text.trim() || !selectedUserId) return { success: false };

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

  // 🔵 Helper: Get display name from user object
  const getDisplayName = (userObj) => {
    if (!userObj) return "Unknown";
    if (userObj.first_name && userObj.last_name) {
      return `${userObj.first_name} ${userObj.last_name}`;
    }
    return userObj.username;
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

        // Helpers
        getDisplayName,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
```

---

## Complete File After Changes

Your `MessageContext.jsx` should look like this:

```javascript
// 🔵 PABLO - UI Architect
// MessageContext.jsx - Shared state for messaging system (API-connected)

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import messagesService from "@services/messagesService";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  // ... (paste the entire MessageProvider from above)
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

## Next Step

Go to [STEP-4-UPDATE-COMPONENTS.md](./STEP-4-UPDATE-COMPONENTS.md)
