# Tito - Infrastructure & Utils Lead

## Your Role

You're the **infrastructure backbone** - you build the foundation that everyone else's code runs on. Your most critical task is configuring CORS so the frontend can talk to the backend (without this, nothing works). You'll also create the API client that handles authentication tokens automatically, plus utility functions that the whole team uses. Think of yourself as building the roads that let all the cars (features) drive around.

## Files You Own

### Backend

| File                | Status      | Description                   |
| ------------------- | ----------- | ----------------------------- |
| `huddl/settings.py` | 🔧 Add CORS | CORS configuration (CRITICAL) |
| `api/urls.py`       | ❌ Build    | General API routing           |

### Frontend (`src/services/`)

| File              | Status    | Description                        |
| ----------------- | --------- | ---------------------------------- |
| `apiClient.js`    | ❌ Create | Base HTTP client with auth headers |
| `postsService.js` | ❌ Create | Posts API wrapper                  |

### Frontend (`src/utils/`)

| File            | Status    | Description                          |
| --------------- | --------- | ------------------------------------ |
| `formatters.js` | ❌ Create | Date, number, text formatting        |
| `validators.js` | ❌ Create | Email, username, password validation |

## Week-by-Week Tasks

See `TASKS.md` in this folder for detailed weekly breakdown.

## CRITICAL: CORS Configuration

Add to `backend/huddl/settings.py`:

```python
# At top of MIDDLEWARE list:
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST BE FIRST
    # ... rest of middleware
]

# At bottom of file:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React dev server
]
```

Also install the package:

```bash
pip install django-cors-headers
```

And add to INSTALLED_APPS:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ...
]
```

## apiClient.js Structure

Your API client should:

1. Store base URL (`http://localhost:8000/api`)
2. Automatically add `Authorization: Bearer <token>` header
3. Handle 401 errors by redirecting to login
4. Provide `get`, `post`, `put`, `delete` methods

## Dependencies

- Nothing! You're the first piece everyone else needs.

## Why Your Work Matters

- **Without CORS:** Frontend gets blocked, no one can test
- **Without apiClient:** Every team member writes duplicate fetch code
- **Without validators:** Forms accept garbage data
