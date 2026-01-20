# Message for Natalia - Seed Data Setup

## Hey Natalia!

I already created a seed data file with test users, profiles, and posts: `backend/posts_and_users.json`

**But the team can't load it until YOU run migrations first!**

---

## YOUR JOB FIRST (Migration Manager)

You must do this BEFORE anyone else can load data:

```bash
cd backend
pipenv shell

# 1. Create migration files from everyone's models
python manage.py makemigrations

# 2. Apply migrations (creates the tables)
python manage.py migrate

# 3. COMMIT THE MIGRATION FILES!
git add */migrations/*.py
git commit -m "Added migrations"
git push
```

**Why?** `loaddata` needs tables to exist. `makemigrations` + `migrate` creates those tables. Without this, the team gets errors.

---

## THEN Tell the Team

After you've pushed migrations, tell everyone:

```bash
git pull
cd backend
pipenv shell
python manage.py migrate
python manage.py loaddata posts_and_users.json
```

That's it! Everyone will have the same test users and posts.

---

## If I Update the Data Later

I'll run:

```bash
python manage.py dumpdata auth.User users posts --indent 2 > posts_and_users.json
git add posts_and_users.json
git commit -m "Updated seed data"
git push
```

Then I'll let everyone know to pull and run `loaddata` again.

---

## What's in the File

- Test users with profiles
- Sample posts (thoughts, media, milestones)
- Engagement data (likes, comments, shares counts)

All ready to go! 🚀
