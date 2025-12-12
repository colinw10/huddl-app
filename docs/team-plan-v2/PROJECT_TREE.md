# HUDDL Backend - Responsibility Matrix

> **Legend:**  
> 🟢 COLIN | 🟡 NATALIA | 🟣 CRYSTAL | 🟠 TITO | 🔵 PABLO  
> ✅ = Done | ❌ = TODO (needs implementation)

```
backend/
├── manage.py                          ✅ (auto-generated)
├── db.sqlite3                         ✅ (auto-generated)
│
├── huddl/                             # Project config
│   ├── settings.py                    🟡 NATALIA ❌ TODO
│   ├── urls.py                        🟠 TITO ❌ TODO
│   └── wsgi.py / asgi.py              ✅ (auto-generated)
│
├── posts/
│   ├── models.py                      🟢 COLIN ❌ TODO
│   ├── serializers.py                 🟡 NATALIA ❌ TODO
│   ├── views.py                       🟣 CRYSTAL ❌ TODO
│   ├── urls.py                        🟠 TITO ❌ TODO
│   ├── admin.py                       🔵 PABLO ❌ TODO
│   └── migrations/                    ✅ (auto-generated)
│
├── users/
│   ├── models.py                      🟡 NATALIA ❌ TODO
│   ├── serializers.py                 🟢 COLIN ❌ TODO
│   ├── views.py                       🔵 PABLO ❌ TODO
│   ├── urls.py                        🟣 CRYSTAL ❌ TODO
│   └── migrations/                    ✅ (auto-generated)
│
└── friends/
    ├── models.py                      🟣 CRYSTAL ❌ TODO
    ├── serializers.py                 🔵 PABLO ❌ TODO
    ├── views.py                       🟢 COLIN ❌ TODO
    ├── urls.py                        🟡 NATALIA ❌ TODO
    ├── admin.py                       🟠 TITO ❌ TODO
    └── migrations/                    ✅ (auto-generated)
```

---

## Summary by Person

### 🟢 Colin - ~22%

| File | What to do |
|------|-----------|
| `posts/models.py` | Create Post model |
| `users/serializers.py` | UserSerializer, SignupSerializer |
| `friends/views.py` | Friend request endpoints |

### 🟡 Natalia - ~22%

| File | What to do |
|------|-----------|
| `huddl/settings.py` | Configure CORS, JWT, installed apps |
| `posts/serializers.py` | Create PostSerializer |
| `users/models.py` | Create Profile model |
| `friends/urls.py` | Set up routing |

### 🟣 Crystal - ~22%

| File | What to do |
|------|-----------|
| `posts/views.py` | Create PostViewSet with CRUD |
| `users/urls.py` | Wire up auth routes |
| `friends/models.py` | Friendship + FriendRequest models |

### 🟠 Tito - ~17%

| File | What to do |
|------|-----------|
| `huddl/urls.py` | Wire up all app routes |
| `posts/urls.py` | Set up posts router |
| `friends/admin.py` | Register Friend models |

### 🔵 Pablo - ~22%

| File | What to do |
|------|-----------|
| `posts/admin.py` | Register Post model |
| `users/views.py` | signup, login, me endpoints |
| `friends/serializers.py` | Create serializers |

---

## Quick Start

```bash
cd backend
python manage.py migrate
python manage.py runserver
```
