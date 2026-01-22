# Step 5: Create Test Data in Django Admin

Now that your frontend is connected to the API, you need real messages in the database.

---

## 5.1 Register Message Model in Admin

Edit `backend/messages_app/admin.py`:

```python
from django.contrib import admin
from .models import Message

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'sender', 'receiver', 'content_preview', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at', 'sender', 'receiver']
    search_fields = ['sender__username', 'receiver__username', 'content']
    ordering = ['-created_at']

    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'
```

---

## 5.2 Start Backend & Open Admin

```bash
cd backend
python manage.py runserver 8000
```

Go to: **http://localhost:8000/admin/**

Login with your superuser credentials.

---

## 5.3 Find Your Users

1. Click **"Users"** in the admin sidebar
2. Note the usernames you have (e.g., `pablopistola`, `arthurb`, `nataliap`)
3. You'll use these when creating messages

---

## 5.4 Create Test Messages

1. Click **"Messages"** in the admin sidebar
2. Click **"Add Message"** (top right)
3. Fill in the form:

### Example Conversation: Arthur → You

| Field    | Value                                      |
| -------- | ------------------------------------------ |
| Sender   | arthurb                                    |
| Receiver | pablopistola                               |
| Content  | Hey! Are you coming to the meetup tonight? |
| Is read  | ☐ (unchecked)                              |

Click **Save and add another**

| Field    | Value                       |
| -------- | --------------------------- |
| Sender   | pablopistola                |
| Receiver | arthurb                     |
| Content  | Yes! I'll be there around 7 |
| Is read  | ☑ (checked)                 |

Click **Save and add another**

| Field    | Value                   |
| -------- | ----------------------- |
| Sender   | arthurb                 |
| Receiver | pablopistola            |
| Content  | Perfect, see you there! |
| Is read  | ☐ (unchecked)           |

Click **Save**

---

### Example Conversation: Natalia → You

| Sender   | Receiver     | Content            | Is read |
| -------- | ------------ | ------------------ | ------- |
| nataliap | pablopistola | That sounds great! | ☐       |

---

### Example Conversation: Colin → You

| Sender       | Receiver     | Content                             | Is read |
| ------------ | ------------ | ----------------------------------- | ------- |
| colinw       | pablopistola | Let's build something cool          | ☐       |
| pablopistola | colinw       | I'm in! What did you have in mind?  | ☑       |
| colinw       | pablopistola | A social network with neon vibes 🔮 | ☐       |

---

## 5.5 Verify in Admin

After creating messages:

1. Go to **Messages** list in admin
2. You should see all messages listed
3. Use filters on the right to view by sender/receiver

---

## 5.6 Test the API Directly

Before testing in the frontend, verify the API works:

```bash
# Get a token first (login)
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com", "password": "yourpassword"}'

# Copy the access token, then:
curl http://localhost:8000/api/messages/conversations/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

You should see JSON with your conversations.

---

## Next Step

Go to [STEP-6-TEST-FRONTEND.md](./STEP-6-TEST-FRONTEND.md)
