# huddl-app

## For the Team

This repo uses **Express analogies** throughout the Django backend to make learning easier for those of us coming from Node.js. All comments in the `backend/huddl/` folder compare Django concepts to Express equivalents (middleware, routing, config, etc.).

See **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** for setup instructions and a project structure breakdown.

## Project Structure

```
huddl-app/
├── backend/
│   ├── manage.py          # CLI tool (like "npm run" scripts)
│   ├── db.sqlite3         # Database file (like your .db or MongoDB data)
│   ├── venv/              # Virtual environment (like node_modules)
│   └── huddl/             # Main Django project folder
│       ├── settings.py    # Config file (like app.js setup + .env)
│       ├── urls.py        # Main router (like Express app.get/post)
│       ├── wsgi.py        # Production server entry (like server.listen())
│       ├── asgi.py        # Async server (like Socket.io setup)
│       └── __init__.py    # Package marker (no Express equivalent)
│
└── frontend/              # React app (TBD)
```

**Express → Django Quick Map:**

- `app.js` config → `settings.py`
- Route definitions → `urls.py`
- `app.use()` middleware → `MIDDLEWARE` array in settings
- Controllers → Views (coming when we build apps)
- Models → Models (Django ORM, like Mongoose/Sequelize)

## How Frontend & Backend Talk

```
User clicks "Post" button
    ↓
React (frontend) sends HTTP request
    ↓
Django (backend) receives request at /api/posts/
    ↓
Django saves to database
    ↓
Django sends response back
    ↓
React updates the UI
```

This is the same flow as Express + React. Django handles the backend API, React handles the UI.

## Code Formatting

The frontend uses **Prettier** for consistent code formatting. After running `npm install` in the `frontend/` folder, VS Code will auto-format your code on save.

**Config:** `.prettierrc` enforces 2-space indentation, single quotes, and semicolons across the team.
