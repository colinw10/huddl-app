# Step 6: Test the Frontend

Final step — verify everything works end-to-end.

---

## 6.1 Start Both Servers

**Terminal 1 (Backend):**

```bash
cd backend
python manage.py runserver 8000
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

Or use your Makefile:

```bash
make b  # Terminal 1
make f  # Terminal 2
```

---

## 6.2 Login and Open Messages

1. Go to **http://localhost:5173** (or your frontend port)
2. Login as **pablopistola** (or your seed user)
3. Click the **Messages** icon to open the message modal

---

## 6.3 What You Should See

✅ **Conversation list** shows conversations with Arthur, Natalia, Colin (whoever you messaged in admin)

✅ **Unread badges** show count of unread messages

✅ **Click a conversation** → Messages load in the chat view

✅ **Most recent message preview** shows in conversation list

---

## 6.4 Test Sending a Message

1. Select a conversation (e.g., Arthur)
2. Type a message: "Testing the real API!"
3. Click Send (or press Enter)
4. Message should appear in the chat
5. Check Django Admin — the new message should be in the Messages list

---

## 6.5 Test Receiving a Message

1. Open Django Admin in another browser tab
2. Create a new message:
   - **Sender:** arthurb
   - **Receiver:** pablopistola
   - **Content:** "Got your message! API works!"
3. Go back to frontend
4. Refresh the page (or re-open messages modal)
5. You should see Arthur's new message

---

## 6.6 Test as Another User

1. Open an **Incognito/Private window**
2. Login as **arthurb**
3. Open messages — you should see the conversation with pablopistola
4. You should see the message you sent from pablopistola's account
5. Send a reply from Arthur
6. Go back to pablopistola's window and refresh — the reply should appear

---

## Troubleshooting

### "Failed to fetch conversations"

- Check browser console for errors
- Make sure backend is running on port 8000
- Make sure you're logged in (JWT token exists)
- Check CORS settings in Django

### Conversations list is empty

- Did you create messages in Django Admin?
- Are the usernames correct?
- Is the logged-in user the sender OR receiver of those messages?

### Messages don't appear in chat view

- Check `selectedMessages` in React DevTools
- Make sure `selectConversation` is being called
- Check Network tab for API calls

### Send doesn't work

- Check browser console for errors
- Check Network tab — is POST /messages/ returning 201?
- Make sure `selectedUserId` is set

---

## Success Checklist

- [ ] Conversation list loads from API
- [ ] Clicking conversation loads messages
- [ ] Unread count shows correctly
- [ ] Sending message saves to database
- [ ] New message appears in chat
- [ ] Messages marked as read when opening conversation
- [ ] Can test as multiple users

---

## You're Done! 🎉

The messaging system is now connected to the real API. No more mock data.

If you want to go further:

- Add real-time updates with WebSockets
- Add typing indicators
- Add message reactions
- Add image/file attachments
