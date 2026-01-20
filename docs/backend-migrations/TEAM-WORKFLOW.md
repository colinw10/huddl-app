# Who Does What - Team Workflow

## Models (Database Structure)

| Person      | Their Models File   | What They Define                |
| ----------- | ------------------- | ------------------------------- |
| **Natalia** | `users/models.py`   | Profile (bio, avatar, location) |
| **Colin**   | `posts/models.py`   | Post, Like                      |
| **Crystal** | `friends/models.py` | Friendship                      |
| **Pablo**   | ❌ None             | Frontend only - no backend work |

---

## The Complete Flow (IN ORDER!)

```
STEP 1: MODELS (Everyone writes their own)
──────────────────────────────────────────
Natalia  → users/models.py   (Profile)
Colin    → posts/models.py   (Post, Like)
Crystal  → friends/models.py (Friendship)
Pablo    → Nothing (frontend only)

         │
         ▼

STEP 2: MIGRATIONS (Natalia ONLY - must happen FIRST!)
──────────────────────────────────────────────────────
Natalia pulls everyone's model changes
Natalia runs: makemigrations    ← Creates migration files
Natalia runs: migrate           ← Creates database tables
Natalia commits migration files ← Shares with team
Natalia pushes to git

⚠️ NO ONE CAN LOADDATA UNTIL THIS STEP IS DONE!

         │
         ▼

STEP 3: EVERYONE APPLIES MIGRATIONS
───────────────────────────────────
Everyone pulls (gets migration files)
Everyone runs: migrate (creates tables in THEIR database)

         │
         ▼

STEP 4: LOAD SEED DATA
─────────────────────
Everyone runs: loaddata posts_and_users.json
Now everyone has the same users, profiles, posts!
```

---

## Why Natalia Must Go First

`loaddata` puts DATA into TABLES.

But tables don't exist until migrations run!

```
Without migrations:  loaddata → ERROR "table doesn't exist"
With migrations:     loaddata → SUCCESS ✅
```

---

## Pablo's Role (Frontend Only)

**You don't touch:**

- ❌ `models.py` files
- ❌ `migrations/` folder
- ❌ `makemigrations` command
- ❌ Creating backend data

**You DO:**

- ✅ Run `migrate` after pulling (to get table structure)
- ✅ Run `loaddata` (to get shared test data)
- ✅ Build frontend UI components

---

## How Test Data Gets Shared

### Option 1: Use Existing Seed File

Your project already has `posts_and_users.json`!

```bash
cd backend
python manage.py loaddata posts_and_users.json
```

### Option 2: Someone Shares New Data

```bash
# Natalia (or whoever has data) runs:
python manage.py dumpdata users auth.User --indent 2 > users_data.json
git add users_data.json
git commit -m "Added test users"
git push

# Everyone else runs:
git pull
python manage.py loaddata users_data.json
```

---

## Summary Table

| Task               | Natalia  | Colin    | Crystal         | Pablo  |
| ------------------ | -------- | -------- | --------------- | ------ |
| Write models.py    | ✅ users | ✅ posts | ✅ friends      | ❌     |
| Run makemigrations | ✅ ALL   | ❌       | ❌              | ❌     |
| Run migrate        | ✅       | ✅       | ✅              | ✅     |
| Create test data   | ✅ users | ✅ posts | ✅ friends      | ❌     |
| Run dumpdata       | ✅       | ✅       | ✅              | ❌     |
| Run loaddata       | ✅       | ✅       | ✅              | ✅     |
| Frontend UI        | ❌       | ❌       | ✅ Friends page | ✅ ALL |

---

## Your Daily Workflow (Pablo)

```bash
# 1. Pull latest code
git pull

# 2. Apply any new migrations (structure changes)
cd backend
python manage.py migrate

# 3. Load shared test data (if new JSON files)
python manage.py loaddata posts_and_users.json

# 4. Start backend server
python manage.py runserver

# 5. In another terminal, start frontend
cd frontend
npm run dev

# 6. Build your UI components!
```

You never need to worry about models or migrations - just `migrate` and `loaddata` to stay in sync! 🎨
