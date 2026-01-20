# Backend Project Structure for Migrations Study

```
backend/
├── manage.py                    # 🔧 CLI tool - run commands like makemigrations, migrate
├── db.sqlite3                   # 📦 SQLite database file (local dev only)
├── Pipfile                      # 📋 Python dependencies (like package.json)
├── posts_and_users.json         # 🌱 Seed data for database
├── seed_posts.py                # 🌱 Script to load seed data
│
├── numeneon/                    # ⚙️ PROJECT CONFIG (like Express app setup)
│   ├── __init__.py              # Makes this a Python package
│   ├── settings.py              # 🔑 Database config, installed apps, middleware
│   ├── urls.py                  # 🛤️ Main URL router (like Express router index)
│   ├── asgi.py                  # Server config (async)
│   └── wsgi.py                  # Server config (sync)
│
├── users/                       # 👤 NATALIA'S APP - Authentication & Users
│   ├── __init__.py
│   ├── apps.py                  # App configuration
│   ├── models.py                # 📊 DEFINES DATABASE TABLES (Profile model)
│   ├── views.py                 # API endpoint logic
│   ├── serializers.py           # Data validation/formatting
│   ├── urls.py                  # URL routes for users
│   ├── management/              # Custom CLI commands
│   │   └── commands/
│   │       └── create_test_user.py
│   └── migrations/              # 📁 DATABASE CHANGE HISTORY
│       ├── __init__.py
│       └── 0001_initial.py      # First migration - creates Profile table
│
├── posts/                       # 📝 COLIN'S APP - Posts
│   ├── __init__.py
│   ├── admin.py                 # Django admin config
│   ├── apps.py
│   ├── models.py                # 📊 DEFINES DATABASE TABLES (Post, Like models)
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   └── migrations/              # 📁 DATABASE CHANGE HISTORY
│       ├── __init__.py
│       ├── 0001_initial.py      # Creates Post table
│       ├── 0002_post_parent.py  # Adds parent field (for replies)
│       ├── 0003_post_comment_count_post_likes_count_and_more.py  # Adds engagement fields
│       └── 0004_like.py         # Creates Like table
│
└── friends/                     # 🤝 CRYSTAL'S APP - Friendships
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py                # 📊 DEFINES DATABASE TABLES (Friend model)
    ├── views.py
    ├── serializers.py
    ├── urls.py
    └── migrations/              # 📁 DATABASE CHANGE HISTORY
        ├── __init__.py
        └── 0001_initial.py      # Creates Friend table
```

---

## Key Files for Migrations

| File              | What It Does                                          |
| ----------------- | ----------------------------------------------------- |
| `models.py`       | **Define** what tables/columns you want               |
| `migrations/*.py` | **Auto-generated** instructions to build those tables |
| `manage.py`       | **Run** the migration commands                        |
| `settings.py`     | **Configure** which database to use                   |

---

## The Flow

```
models.py (Python code)
    ↓ makemigrations
migrations/*.py (instructions)
    ↓ migrate
Database (actual tables in PostgreSQL/SQLite)
```
