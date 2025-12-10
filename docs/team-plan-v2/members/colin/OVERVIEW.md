# Colin - Posts Backend Lead

## Your Role

You're in charge of the **Posts system** - the heart of the app where users create and view content. Your job is to build the backend API that handles creating, reading, updating, and deleting posts, plus connecting it to the Home feed on the frontend. The Post model already exists with the structure we need (content, type, media_url, timestamps), so you'll be building the API layer on top of it. You'll also add likes and comments in later weeks. Pablo has the UI ready - you just need to make the data flow.

## Files You Own

### Backend (`backend/posts/`)

| File             | Status   | Description                            |
| ---------------- | -------- | -------------------------------------- |
| `models.py`      | ✅ Done  | Post model already created             |
| `serializers.py` | ❌ Build | Convert Post objects to JSON           |
| `views.py`       | ❌ Build | API endpoints (GET, POST, PUT, DELETE) |
| `urls.py`        | ❌ Build | Route definitions                      |
| `admin.py`       | ❌ Build | Register Post in Django admin          |

### Frontend (Logic only - don't touch CSS)

| File                | Your Part                                    |
| ------------------- | -------------------------------------------- |
| `Home.jsx`          | Connect to posts API, pass real data to feed |
| `ComposerModal.jsx` | Wire up post creation to API                 |

## Week-by-Week Tasks

See `TASKS.md` in this folder for detailed weekly breakdown.

## Key Endpoints You'll Build

```
GET    /api/posts/           → Get all posts (feed)
POST   /api/posts/           → Create new post
GET    /api/posts/:id/       → Get single post
PUT    /api/posts/:id/       → Update post
DELETE /api/posts/:id/       → Delete post
GET    /api/posts/user/:id/  → Get user's posts
POST   /api/posts/:id/like/  → Toggle like (Week 4)
```

## Dependencies

- Wait for Tito's CORS config before testing frontend connection
- Natalia's auth must work for protected endpoints
