# =============================================================================
# MAKEFILE - Command Shortcuts for HUDDL App
# =============================================================================
# 
# WHAT IS A MAKEFILE?
# A Makefile is a simple text file that stores shortcuts for terminal commands.
# The `make` command is built into macOS (and Linux). When you type `make <name>`,
# it looks for a file called "Makefile" in your current folder, finds the 
# matching shortcut name, and runs the command underneath it.
#
# HOW TO USE:
# 1. Open terminal
# 2. Navigate to this folder: cd ~/code/my-stuff/huddl-app
# 3. Type: make <shortcut>
#
# EXAMPLES:
#   make b          → starts the backend server
#   make f          → starts the frontend server
#   make migrate    → applies database migrations
#   make users      → lists all users in database
#
# NOTE: You MUST type "make" before every shortcut. The shortcut alone won't work.
#       ✅ Correct: make b
#       ❌ Wrong:   b
#
# IMPORTANT: The indentation before commands MUST be a TAB, not spaces!
# =============================================================================


# -----------------------------------------------------------------------------
# SERVER COMMANDS - Start your development servers
# -----------------------------------------------------------------------------

b:  # Start backend (Django) server at http://localhost:8000
	cd backend && python manage.py runserver 8000

f:  # Start frontend (Vite/React) server at http://localhost:5173
	cd frontend && npm run dev


# -----------------------------------------------------------------------------
# DATABASE COMMANDS - Manage your Django database
# -----------------------------------------------------------------------------

migrate:  # Apply pending database migrations (run after changing models)
	cd backend && python manage.py migrate

makemigrations:  # Create new migration files after changing models
	cd backend && python manage.py makemigrations

seed:  # Populate database with test data
	cd backend && python seed_posts.py

shell:  # Open Django interactive shell (to query database manually)
	cd backend && python manage.py shell

dbshell:  # Open SQLite shell (raw SQL queries)
	cd backend && sqlite3 db.sqlite3


# -----------------------------------------------------------------------------
# USER MANAGEMENT - Create and manage users
# -----------------------------------------------------------------------------

superuser:  # Create an admin user for Django admin panel
	cd backend && python manage.py createsuperuser

users:  # List all users in database
	cd backend && python manage.py shell -c "from django.contrib.auth.models import User; [print(f'ID: {u.id}, Username: {u.username}, Email: {u.email}') for u in User.objects.all()]"


# -----------------------------------------------------------------------------
# GIT COMMANDS - Version control shortcuts
# -----------------------------------------------------------------------------

status:  # Check git status
	git status

push:  # Push current branch to origin
	git push origin $$(git branch --show-current)

pull:  # Pull latest changes from origin
	git pull origin $$(git branch --show-current)


# -----------------------------------------------------------------------------
# INSTALL & SETUP - Install dependencies
# -----------------------------------------------------------------------------

install-frontend:  # Install frontend npm packages
	cd frontend && npm install

install-backend:  # Install backend Python packages
	cd backend && pip install -r requirements.txt

install:  # Install both frontend and backend dependencies
	cd frontend && npm install
	cd backend && pip install -r requirements.txt


# -----------------------------------------------------------------------------
# TESTING - Run tests
# -----------------------------------------------------------------------------

test:  # Run Django tests
	cd backend && python manage.py test


# -----------------------------------------------------------------------------
# CLEANUP - Remove generated files
# -----------------------------------------------------------------------------

clean:  # Remove Python cache files
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
