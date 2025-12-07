# =============================================================================
# POSTS APP - URLS
# =============================================================================
#
# File: backend/posts/urls.py
# Assigned to: COLIN
# Responsibility: Route /api/posts/ endpoints
#
# TODO:
# - [ ] Import DefaultRouter from rest_framework
# - [ ] Import PostViewSet from views
# - [ ] Register PostViewSet with router
# - [ ] Export urlpatterns
#
# Status: PLACEHOLDER
# =============================================================================

from django.urls import path, include
from rest_framework.routers import DefaultRouter
# TODO: Colin - Import your viewset
# from .views import PostViewSet

router = DefaultRouter()
# TODO: Colin - Register your viewset
# router.register(r'', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
]
