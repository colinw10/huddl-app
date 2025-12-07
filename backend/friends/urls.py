# 🟣 CRYSTAL - Friends System Lead
# urls.py - URL routing for friends API endpoints

from django.urls import path
from . import views

urlpatterns = [
    # GET all friends
    path('', views.friend_list, name='friend_list'),

    # GET pending friend requests
    path('requests/', views.pending_requests, name='pending_requests'),

    # POST --> send a friend request
    # <int:user_id> = placeholder for the user you're sending the request to
    # Same pattern as <int:pk>
    path('request/<int:user_id>/', views.send_request, name='send_request'),

    # POST accept a friend request
    # Note: This uses request_id, not user_id
    # Why? You're accepting a specific request, not a user
    # /api/friends/accept/12/ → "Accept friend request #12"
    path('accept/<int:request_id>/', views.accept_request, name='accept_request'),

    # POST decline a friend request
    # /api/friends/decline/12/ → "Decline friend request #12"
    path('decline/<int:request_id>/', views.decline_request, name='decline_request'),

    # DELETE remove a friend
    path('remove/<int:user_id>/', views.remove_friend, name='remove_friend'),
]