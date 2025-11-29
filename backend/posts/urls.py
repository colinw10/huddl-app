"""
=============================================================================
POSTS APP - URL ROUTING
=============================================================================

File: backend/posts/urls.py
Assigned to: COLIN
Responsibility: Define URL patterns for posts API

TODO:
- [ ] Register PostViewSet with router
- [ ] Endpoints will be:
      - GET/POST /api/posts/
      - GET/PUT/DELETE /api/posts/{id}/
      - GET /api/posts/feed/
      - POST /api/posts/{id}/like/

Status: PLACEHOLDER
=============================================================================
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# TODO: Colin - Register viewset
# router.register(r'', views.PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
]

