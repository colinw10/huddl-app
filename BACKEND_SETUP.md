# HUDDL Backend – Quick Setup Guide

This backend uses **Django + Django REST Framework**.  
Follow these steps to get your backend running locally.

---

# 📁 Backend Structure

```
backend/
├── manage.py
├── db.sqlite3
├── huddl/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── venv/              ← (Python virtual environment folder)
```

---

# 🚀 1. Activate Virtual Environment

Navigate to backend folder:

```bash
cd backend
```

Create virtual environment (only once):

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate    # macOS / Linux
```

---

# 📦 2. Install Dependencies

```bash
pip install django djangorestframework
```

---

# 🛠️ 3. Run Migrations

```bash
python manage.py migrate
```

---

# ▶️ 4. Start Backend Server

```bash
python manage.py runserver
```

Backend runs at:

👉 http://127.0.0.1:8000

---

# 🌳 5. Backend Apps (To Be Created by Team)

We will create these apps:

```
users/
posts/
friends/
api/
```

Each app will follow:

```
models.py
views.py
serializers.py
urls.py
```

---

# 🔀 6. Branch Workflow

### ✅ Do:

- Create a feature branch for every backend task
- Work ONLY in your branch
- Push to your branch
- Open a PR into **team-shell**

### ❌ Don't:

- Push to main
- Modify frontend files
- Edit Pablo's UI branches

---

# 🧭 Quick Commands

```bash
# activate env
source venv/bin/activate

# run server
python manage.py runserver

# run migrations
python manage.py migrate

# create branch
git checkout -b yourname-backend-task
```

---
