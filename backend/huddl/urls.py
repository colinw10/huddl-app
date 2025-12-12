"""
HUDDL Main URL Configuration

TODO: Set up the main URL router
- Import admin, path, include
- Create urlpatterns with:
  - admin/ -> admin.site.urls
  - api/auth/ -> users.urls
  - api/posts/ -> posts.urls  
  - api/friends/ -> friends.urls
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # TODO: Add API routes
    # path('api/auth/', include('users.urls')),
    # path('api/posts/', include('posts.urls')),
    # path('api/friends/', include('friends.urls')),
]
