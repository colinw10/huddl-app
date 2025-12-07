# =============================================================================
# FRIENDS APP - URLS
# =============================================================================
#
# File: backend/friends/urls.py
# Assigned to: CRYSTAL
# Responsibility: Route /api/friends/ endpoints
#
# TODO:
# - [ ] Import DefaultRouter from rest_framework
# - [ ] Import FriendViewSet from views
# - [ ] Register FriendViewSet with router
# - [ ] Export urlpatterns
#
# Status: PLACEHOLDER
# =============================================================================

from django.urls import path, include
from rest_framework.routers import DefaultRouter
# TODO: Crystal - Import your viewset
# from .views import FriendViewSet

router = DefaultRouter()
# TODO: Crystal - Register your viewset
# router.register(r'', FriendViewSet, basename='friend')

urlpatterns = [
    path('', include(router.urls)),
]
