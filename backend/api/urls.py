"""
=============================================================================
API APP - URLS
=============================================================================

File: backend/api/urls.py
Assigned to: TITO
Responsibility: URL routes for messaging and notifications

TODO:
- [ ] Set up DefaultRouter for ViewSets
- [ ] Routes to implement:
      - GET /messages/ - List messages in conversation
      - POST /messages/ - Send new message
      - GET /messages/conversations/ - List all conversations
      - GET /notifications/ - List notifications
      - POST /notifications/<id>/mark_read/ - Mark as read
- [ ] Register routers with urlpatterns

Status: PLACEHOLDER
=============================================================================
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet, NotificationViewSet

# TODO: Tito - Set up router
router = DefaultRouter()
# router.register(r'messages', MessageViewSet, basename='message')
# router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    # TODO: Tito - Uncomment when ViewSets are ready
    # path('', include(router.urls)),
]
