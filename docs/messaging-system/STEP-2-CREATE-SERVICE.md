# Step 2: Create the Messages Service

This file talks to your backend API. Create it FIRST before touching MessageContext.

---

## Create: `frontend/src/services/messagesService.js`

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

## Verify Import Works

After creating, check that this import works in any file:

```javascript
import messagesService from "@services/messagesService";
```

If `@services` alias doesn't work, use relative path:

```javascript
import messagesService from "./messagesService";
```

---

## Test the Service (Optional)

You can test in browser console:

```javascript
// In browser dev tools after logging in:
const response = await fetch(
  "http://localhost:8000/api/messages/conversations/",
  {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  },
);
const data = await response.json();
console.log(data);
```

If you see `[]` (empty array), that's correct — you have no messages yet.

---

## Next Step

Go to [STEP-3-UPDATE-CONTEXT.md](./STEP-3-UPDATE-CONTEXT.md)
