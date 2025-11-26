"""
settings.py - Django's config file (like Express app.js config section)

Configures database, middleware, installed apps, security, and environment vars.
Express equivalent: where you set up app.use(), db connection, env vars, cors, etc.
"""

from pathlib import Path

# Root directory path (like __dirname in Node)
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key for encryption/hashing (like JWT_SECRET in Express)
# TODO: Move to .env file for production
SECRET_KEY = 'django-insecure-tl6jpad%y3%v%xria!-k=ez-=0h7wqz$ub=&a2*ka9veckq3p8'

# Debug mode - shows detailed errors (like NODE_ENV === 'development')
DEBUG = True

ALLOWED_HOSTS = []  # Whitelist of domains (like CORS origins)

# INSTALLED_APPS - Django apps/plugins (like Express middleware & route modules)
# Add your custom apps here (e.g., 'api', 'users', 'posts')
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',  # Serves static files (like express.static())
    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',  # JWT authentication
    # Custom apps
    'users',
    'posts',
    'friends',
    'api',
]

# MIDDLEWARE - Request/response pipeline (exactly like Express app.use() chain)
# Executes top-to-bottom on requests, bottom-to-top on responses
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',      # Security headers (helmet in Express)
    'django.contrib.sessions.middleware.SessionMiddleware',  # Session handling (express-session)
    'django.middleware.common.CommonMiddleware',           # Common HTTP features
    'django.middleware.csrf.CsrfViewMiddleware',           # CSRF protection (csurf in Express)
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Attaches user to request
    'django.contrib.messages.middleware.MessageMiddleware',     # Flash messages
    'django.middleware.clickjacking.XFrameOptionsMiddleware',   # X-Frame-Options header
]

# ROOT_URLCONF - Main routes file (like app.use('/api', routes) in Express)
ROOT_URLCONF = 'huddl.urls'

# TEMPLATES - HTML templating config (we'll use React instead, so ignore this)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI server config (like http.createServer() in Node)
WSGI_APPLICATION = 'huddl.wsgi.application'

# DATABASE - Connection config (PostgreSQL)
# Connects to your local Postgres server
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Use PostgreSQL
        'NAME': 'huddl_pablo_dev',  # Your personal database
        'USER': 'pablodcordero',  # Your Mac username
        'PASSWORD': '',  # No password set
        'HOST': 'localhost',  # Database on your computer
        'PORT': '5432',  # Default Postgres port
    }
}

# Password validation rules (like bcrypt + validation middleware)
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Localization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files URL (like app.use('/static', express.static('public')))
STATIC_URL = 'static/'

# Default ID field type for models (like MongoDB ObjectId or auto-increment in SQL)
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'