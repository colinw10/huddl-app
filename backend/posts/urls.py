"""
===============================================================================
POSTS URLS
===============================================================================

File: backend/posts/urls.py
Assigned to: COLIN 🟢
Responsibility: URL routing for posts API

WHAT THIS DOES:
- Maps URLs to views
- Uses DRF Router for automatic URL generation

TODO:
1. Create DefaultRouter
2. Register PostViewSet
3. Export urlpatterns

===============================================================================
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

# TODO: Create router and register viewset
# router = DefaultRouter()
# router.register(r'', PostViewSet, basename='post')

# This creates:
# GET/POST     /posts/
# GET/PUT/DEL  /posts/:id/
# GET/POST     /posts/:id/replies/  (from @action)

urlpatterns = [
    # TODO: Include router.urls
    # path('', include(router.urls)),
]
