"""
===============================================================================
FRIENDS URLS
===============================================================================

File: backend/friends/urls.py
Assigned to: CRYSTAL 🟣
Responsibility: URL routing for friends API

ROUTES TO CREATE:
- GET    /friends/                    → friend_list view
- GET    /friends/pending/            → pending_requests view
- POST   /friends/request/            → send_request view
- POST   /friends/accept/<id>/        → accept_request view
- POST   /friends/decline/<id>/       → decline_request view
- DELETE /friends/remove/<id>/        → remove_friend view

===============================================================================
"""

from django.urls import path
from . import views

urlpatterns = [
    # TODO: Add URL patterns
    # path('', views.friend_list, name='friend-list'),
    # path('pending/', views.pending_requests, name='pending-requests'),
    # path('request/', views.send_request, name='send-request'),
    # path('accept/<int:request_id>/', views.accept_request, name='accept-request'),
    # path('decline/<int:request_id>/', views.decline_request, name='decline-request'),
    # path('remove/<int:user_id>/', views.remove_friend, name='remove-friend'),
]
