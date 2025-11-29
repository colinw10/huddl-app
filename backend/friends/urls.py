"""
=============================================================================
FRIENDS APP - URLS
=============================================================================

File: backend/friends/urls.py
Assigned to: CRYSTAL
Responsibility: Friend request and friendship URL routes

TODO:
- [ ] Set up DefaultRouter for FriendViewSet
- [ ] Routes to implement:
      - GET /friends/ - List user's friends
      - GET /friends/requests/ - List pending requests
      - POST /friends/send_request/ - Send friend request
      - POST /friends/<id>/accept/ - Accept request
      - POST /friends/<id>/decline/ - Decline request
      - DELETE /friends/<id>/ - Remove friend
- [ ] Register router with urlpatterns

Status: PLACEHOLDER
=============================================================================
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendViewSet

# TODO: Crystal - Set up router
router = DefaultRouter()
# router.register(r'', FriendViewSet, basename='friend')

urlpatterns = [
    # TODO: Crystal - Uncomment when ViewSet is ready
    # path('', include(router.urls)),
]
