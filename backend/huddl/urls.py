"""
urls.py - Main router (like Express app.js route definitions)

Define all URL patterns here. Think of this as:
  app.get('/admin', adminRoutes)
  app.use('/api/users', userRoutes)

Examples:
  path('api/users/', views.user_list)           # Like app.get('/api/users', userList)
  path('api/users/<int:id>/', views.user_detail) # Route params (like '/users/:id')
  path('api/', include('app.urls'))             # Include app routes (like app.use())
"""
from django.contrib import admin
from django.urls import path, include

# URL patterns - route definitions (like Express app.get/post/etc.)
urlpatterns = [
    path('admin/', admin.site.urls),  # Built-in admin panel at /admin
    # API endpoints
    path('api/users/', include('users.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/friends/', include('friends.urls')),
    path('api/', include('api.urls')),
]
