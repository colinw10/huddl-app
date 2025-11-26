"""
HUDDL Main URL Configuration
This is the ENTRY POINT for all API requests
"""
from django.contrib import admin
# What: Imports Django's built-in admin panel
# Why: So we can access http://127.0.0.1:8000/admin to create test data

from django.urls import path, include
# What: Imports two functions:
#   path() - creates a URL route
#   include() - forwards requests to another URL file
# Why: We need these to define routes

urlpatterns = [
# What: A Python list that holds ALL the URL routes
# Why: Django reads this list to know "when someone visits URL X, do Y"

    # Django Admin Panel (the UI where you create test data)
    path('admin/', admin.site.urls),
    # What: Creates route: http://127.0.0.1:8000/admin/
    # Does: Shows Django admin panel
    # Example: Visit http://127.0.0.1:8000/admin → see login screen

    # API Routes - these forward requests to app-specific URL files
    path('api/auth/', include('users.urls')),
    # What: Creates route: http://127.0.0.1:8000/api/auth/
    # Does: Forwards ALL requests starting with /api/auth/ to the file users/urls.py

    path('api/posts/', include('posts.urls')),
    # What: Creates route: http://127.0.0.1:8000/api/posts/
    # Does: Forwards ALL requests starting with /api/posts/ to posts/urls.py

    path('api/friends/', include('friends.urls')),
    # What: Creates route: http://127.0.0.1:8000/api/friends/
    # Does: Forwards ALL requests starting with /api/friends/ to friends/urls.py

    path('api/', include('api.urls')),
    # What: Creates route: http://127.0.0.1:8000/api/
    # Does: Forwards ALL requests starting with /api/ to api/urls.py
]
