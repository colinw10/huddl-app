# 🚀 HUDDL Quick Start Guide

> **READ THIS FIRST!** This will get you up and running in 2 minutes.

---

## ⚡ TL;DR - Just Run These

```bash
# Terminal 1 - Backend
make b

# Terminal 2 - Frontend
make f
```

That's it! Backend runs at `http://localhost:8000`, Frontend at `http://localhost:5173`

---

## 📋 What is `make`?

We have a **Makefile** with shortcuts so you don't have to remember long commands.

| Command               | What it does                               |
| --------------------- | ------------------------------------------ |
| `make b`              | Start backend server                       |
| `make f`              | Start frontend server                      |
| `make migrate`        | Apply database changes                     |
| `make makemigrations` | Create migration files after model changes |
| `make seed`           | Add test data to database                  |
| `make users`          | List all users in database                 |
| `make posts`          | List all posts in database                 |
| `make shell`          | Open Django interactive shell              |
| `make test`           | Run all tests                              |

### How to use:

```bash
cd ~/code/my-stuff/huddl-app   # Go to project root
make b                          # Run a command
```

> ⚠️ **Always type `make` before the shortcut!**  
> ✅ `make b`  
> ❌ `b`

---

## 🔧 First Time Setup

If you just cloned the repo:

```bash
# 1. Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

# 2. Frontend setup
cd ../frontend
npm install

# 3. Go back to root and run
cd ..
make b  # Terminal 1
make f  # Terminal 2 (new tab)
```

---

## 🧪 Creating a Test User

```bash
make testuser
# Creates: test@test.com / password123
```

Or in Django shell:

```bash
make shell
>>> from users.models import User
>>> User.objects.create_user(username='test', email='test@test.com', password='password123')
```

---

## 📁 Project Structure (Your Files)

```
huddl-app/
├── Makefile              ← Your shortcuts live here
├── backend/
│   ├── posts/            ← Colin's domain
│   ├── users/            ← Natalia's domain
│   └── friends/          ← Crystal's domain
└── frontend/
    ├── src/services/     ← API calls (Tito + team)
    └── src/contexts/     ← State management (team)
```

---

## 🆘 Common Issues

### "command not found: make"

```bash
# macOS - make is built in, but if missing:
xcode-select --install
```

### "No module named 'django'"

```bash
cd backend
source venv/bin/activate  # Activate virtual environment first!
```

### "CORS error in browser"

Backend might not be running. Check `make b` is active.

### "Connection refused"

Make sure both servers are running (`make b` AND `make f`)

---

## 🔗 Quick Links

- Backend API: http://localhost:8000/api/
- Frontend: http://localhost:5173
- Admin Panel: http://localhost:8000/admin/

---

**Questions? Ask in Slack!** 💬
