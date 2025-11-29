# Backend Setup

## Quick Start

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
```

Server runs at: **http://localhost:8000**

---

## Project Structure

```
backend/
├── manage.py
├── db.sqlite3
│
├── huddl/                # Config (Pablo + Tito)
│   ├── settings.py       # CORS, JWT, database
│   └── urls.py           # Main router
│
├── api/                  # Messages & Notifications (Tito)
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── posts/                # Posts (Colin)
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── users/                # Auth (Natalia)
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
└── friends/              # Friends (Crystal)
    ├── models.py
    ├── serializers.py
    ├── views.py
    └── urls.py
```

---

## Creating a Virtual Environment (first time only)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
pip freeze > requirements.txt
```

---

## Common Commands

```bash
source venv/bin/activate           # Activate env
python3 manage.py runserver        # Start server
python3 manage.py migrate          # Apply migrations
python3 manage.py makemigrations   # Create migrations
python3 manage.py createsuperuser  # Create admin user
```

---

## Admin Panel

1. Create superuser: `python3 manage.py createsuperuser`
2. Go to: http://localhost:8000/admin
3. Login and manage data
