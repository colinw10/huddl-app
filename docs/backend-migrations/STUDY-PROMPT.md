# Django Migrations Study Guide

Use this prompt with Claude to study migrations step by step.

---

## Copy This Prompt to Claude:

```
I'm learning Django migrations for a team project. I need you to teach me these concepts IN ORDER, one at a time. After each concept, quiz me with a simple question before moving on.

## CONCEPTS TO COVER (in this order):

### 1. What is a Database?
- Explain what a database is (like a spreadsheet with tables)
- PostgreSQL vs SQLite - what's the difference?
- What are tables, rows, and columns?

### 2. What is SQL?
- SQL = Structured Query Language
- Basic commands: CREATE TABLE, INSERT, SELECT
- Why we don't write SQL directly in Django

### 3. What is Django ORM?
- ORM = Object Relational Mapping
- How Python classes become database tables
- Why models.py is important

### 4. What is models.py?
- Show me a simple model example
- Explain fields: CharField, TextField, ForeignKey
- What does `class Post(models.Model)` mean?

### 5. What are Migrations?
- The problem: you change models.py, but database doesn't know
- Solution: migrations are "instructions" for the database
- Migration files are auto-generated, not written by hand

### 6. What is makemigrations?
- Command: `python manage.py makemigrations`
- What it does: reads models.py → creates migration file
- It does NOT touch the database yet!

### 7. What is migrate?
- Command: `python manage.py migrate`
- What it does: reads migration files → runs SQL on database
- This actually changes the database

### 8. The Full Flow
- Draw the flow: models.py → makemigrations → migrate → database
- What happens if you skip a step?
- Why order matters

### 9. Team Workflow
- Why one person should handle migrations
- What happens if two people run makemigrations at the same time?
- How to share database data (dumpdata/loaddata)

### 10. Structure vs Data (THE KEY CONFUSION!)
- Structure = table definitions (columns, types) → handled by migrations
- Data = actual rows (users, posts) → handled by dumpdata/loaddata
- Migrations do NOT touch your data
- Natalia doesn't need your users - she just creates empty tables
- You share data separately via JSON files

### 11. Natalia's Role
- Review migrations before they're applied
- Run migrations for the whole team
- Resolve migration conflicts
- She handles STRUCTURE, not DATA

---

## MY PROJECT CONTEXT:

I have a Django project with 3 apps:
- users/ (Natalia owns this) - has Profile model
- posts/ (Colin owns this) - has Post and Like models
- friends/ (Crystal owns this) - has Friend model

Natalia is responsible for running ALL migrations.

Start with Concept 1 and teach me step by step!
```

---

## How to Use This

1. Open a new Claude chat
2. Copy the prompt above
3. Claude will teach you one concept at a time
4. Answer the quiz questions to make sure you understand
5. Say "next" to move to the next concept

---

## Quick Reference Card

| Term               | Simple Definition                                            |
| ------------------ | ------------------------------------------------------------ |
| **Database**       | Organized storage for data (like Excel with multiple sheets) |
| **Table**          | One "sheet" in the database (users, posts, friends)          |
| **Row**            | One record (one specific user, one specific post)            |
| **Column**         | One field (username, email, created_at)                      |
| **SQL**            | Language for talking to databases                            |
| **ORM**            | Lets you use Python instead of SQL                           |
| **Model**          | Python class that becomes a database table                   |
| **Migration**      | Instructions to change the database structure                |
| **makemigrations** | Creates the instructions (doesn't run them)                  |
| **migrate**        | Runs the instructions (actually changes database)            |

---

## Common Commands Cheat Sheet

```bash
# Go to backend folder first
cd backend

# Create migration files from models.py changes
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate

# See migration status
python manage.py showmigrations

# Export data to JSON
python manage.py dumpdata users --indent 2 > users_data.json

# Import data from JSON
python manage.py loaddata users_data.json

# Open database shell (for advanced users)
python manage.py dbshell
```
