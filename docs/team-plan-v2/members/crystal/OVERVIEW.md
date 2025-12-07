# Crystal - Friends System Lead

## Your Role

You're building the **friends/social connection system** - how users find and connect with each other. This is a fresh start since the friends app is currently empty. You'll create the Friendship model, build the API endpoints for sending/accepting friend requests, and connect it to the Friends page on the frontend. You're also responsible for the About page (a simple static page). The Friends UI exists but needs your logic to show real data and handle friend actions.

## Files You Own

### Backend (`backend/friends/`)

All files have starter code with TODO comments. Follow the comments!

| File             | Status       | Description                  |
| ---------------- | ------------ | ---------------------------- |
| `models.py`      | 📝 Implement | Friendship model             |
| `serializers.py` | 📝 Implement | Friendship serializers       |
| `views.py`       | 📝 Implement | Friend request endpoints     |
| `urls.py`        | 📝 Implement | Friends routes               |
| `admin.py`       | ✅ Done      | Already configured           |

### Frontend (`src/services/`, `src/contexts/`, pages)

All files have starter code with TODO comments. Follow the comments!

| File                  | Status       | Description                      |
| --------------------- | ------------ | -------------------------------- |
| `friendsService.js`   | 📝 Implement | API calls for friends            |
| `FriendsContext.jsx`  | 📝 Implement | Global friends state management  |
| `Friends.jsx`         | 📝 Implement | Display friends, handle requests |
| `Profile.jsx`         | 📝 Implement | User profile page                |

## Week-by-Week Tasks

See `TASKS.md` in this folder for detailed weekly breakdown.

## Key Endpoints You'll Build

```
GET    /api/friends/              → Get user's accepted friends
GET    /api/friends/requests/     → Get pending friend requests
POST   /api/friends/send/         → Send friend request
POST   /api/friends/respond/:id/  → Accept or reject request
DELETE /api/friends/remove/:id/   → Remove friend
```

## Friendship Model Structure

```python
class Friendship(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    user = ForeignKey(User)      # Person who sent request
    friend = ForeignKey(User)    # Person receiving request
    status = CharField(choices)  # pending, accepted, rejected
    created_at = DateTimeField()
```

## Dependencies

- Natalia's auth for knowing who the current user is
- Natalia's user search for finding people to add
- Tito's apiClient for making requests
