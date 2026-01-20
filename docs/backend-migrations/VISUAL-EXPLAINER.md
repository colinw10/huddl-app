# Migrations Visual Explainer

## The Big Picture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         YOUR BRAIN                                   │
│                    "I want a Post table"                            │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        models.py (Python)                           │
│                                                                     │
│   class Post(models.Model):                                         │
│       content = models.TextField()                                  │
│       author = models.ForeignKey(User)                              │
│       created_at = models.DateTimeField()                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 │  python manage.py makemigrations
                                 │  (Django reads your models)
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  migrations/0001_initial.py                         │
│                  (Auto-generated instructions)                      │
│                                                                     │
│   operations = [                                                    │
│       migrations.CreateModel(                                       │
│           name='Post',                                              │
│           fields=[                                                  │
│               ('id', models.BigAutoField(...)),                     │
│               ('content', models.TextField(...)),                   │
│               ...                                                   │
│           ]                                                         │
│       )                                                             │
│   ]                                                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 │  python manage.py migrate
                                 │  (Django runs the instructions)
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                              │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │                    posts_post TABLE                      │      │
│   ├──────────┬─────────────┬───────────┬────────────────────┤      │
│   │    id    │   content   │  author   │    created_at      │      │
│   ├──────────┼─────────────┼───────────┼────────────────────┤      │
│   │    1     │  "Hello!"   │     3     │  2025-01-18 10:00  │      │
│   │    2     │  "Hi back"  │     5     │  2025-01-18 10:05  │      │
│   └──────────┴─────────────┴───────────┴────────────────────┘      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## What Each Step Does

### Step 1: You Write models.py

```python
# posts/models.py
class Post(models.Model):
    content = models.TextField()
```

- This is just Python code
- Database doesn't know about it yet
- Nothing happens to the database

### Step 2: makemigrations

```bash
python manage.py makemigrations
```

- Django **reads** your models.py
- Django **compares** to existing migrations
- Django **creates** a new migration file
- **Still nothing happens to database!**

### Step 3: migrate

```bash
python manage.py migrate
```

- Django **reads** migration files
- Django **translates** to SQL commands
- Django **runs** SQL on the database
- **NOW the database changes!**

---

## Why Two Steps?

Think of it like construction:

| Step | Migration Equivalent | Construction Equivalent     |
| ---- | -------------------- | --------------------------- |
| 1    | Write models.py      | Architect draws blueprints  |
| 2    | makemigrations       | Blueprints get approved     |
| 3    | migrate              | Construction crew builds it |

You don't want the crew building while the blueprints are still changing!

---

## Team Scenario

```
                    MONDAY

Colin's Computer                    Crystal's Computer
┌────────────────────┐             ┌────────────────────┐
│ Changes Post model │             │ Changes Friend     │
│ (adds likes field) │             │ (adds status)      │
│                    │             │                    │
│ Commits models.py  │             │ Commits models.py  │
│ (NO makemigrations)│             │ (NO makemigrations)│
└────────────────────┘             └────────────────────┘
         │                                   │
         └───────────────┬───────────────────┘
                         │
                         ▼
                    TUESDAY

            Natalia's Computer
            ┌────────────────────┐
            │ Pulls both changes │
            │                    │
            │ Runs:              │
            │ makemigrations     │
            │                    │
            │ Creates:           │
            │ 0002_add_likes.py  │
            │ 0002_add_status.py │
            │                    │
            │ Runs:              │
            │ migrate            │
            │                    │
            │ Commits migrations │
            └────────────────────┘
                         │
                         ▼
            Everyone pulls & runs migrate
            ✅ All databases match!
```

---

## The Problem Without Coordination

```
                    ❌ BAD: Both Run makemigrations

Colin's Computer                    Crystal's Computer
┌────────────────────┐             ┌────────────────────┐
│ Changes Post model │             │ Changes Friend     │
│ makemigrations     │             │ makemigrations     │
│                    │             │                    │
│ Creates:           │             │ Creates:           │
│ 0002_add_likes.py  │             │ 0002_add_status.py │
└────────────────────┘             └────────────────────┘
         │                                   │
         └───────────────┬───────────────────┘
                         │
                         ▼
                    💥 CONFLICT!

            Both created a file called 0002_*
            Git doesn't know which is "really" 0002
            Database gets confused about order
```

---

## Sharing Data (dumpdata/loaddata)

```
Pablo's Database                    Everyone Else's Database
┌────────────────────┐             ┌────────────────────┐
│ users_profile      │             │ users_profile      │
│ ┌────┬───────────┐ │             │ ┌────┬───────────┐ │
│ │ id │ username  │ │             │ │ id │ username  │ │
│ ├────┼───────────┤ │             │ ├────┼───────────┤ │
│ │ 1  │ pablo     │ │  dumpdata   │ │    │ (empty)   │ │
│ │ 2  │ natalia   │ │ ─────────►  │ │    │           │ │
│ │ 3  │ colin     │ │             │ │    │           │ │
│ └────┴───────────┘ │   JSON      │ └────┴───────────┘ │
└────────────────────┘   file      └────────────────────┘
                          │
                          │
                          ▼
                    ┌─────────────────────┐
                    │ users_data.json     │
                    │                     │
                    │ [                   │
                    │   {"id": 1,         │
                    │    "username":      │
                    │    "pablo"},        │
                    │   ...               │
                    │ ]                   │
                    └─────────────────────┘
                          │
                          │  loaddata
                          ▼
                    ┌────────────────────┐
                    │ users_profile      │
                    │ ┌────┬───────────┐ │
                    │ │ id │ username  │ │
                    │ ├────┼───────────┤ │
                    │ │ 1  │ pablo     │ │  ✅ Same data!
                    │ │ 2  │ natalia   │ │
                    │ │ 3  │ colin     │ │
                    │ └────┴───────────┘ │
                    └────────────────────┘
```
