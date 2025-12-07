# 🟡 NATALIA - Auth & Users Lead
# urls.py - URL routing for authentication endpoints

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.email_login, name='login'),  # Custom email login

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # ☝️ Creates route: /api/auth/token/refresh/
    # When called: runs JWT library's built-in token refresh view
    # What it does: gives new access token when old one expires
    # Frontend sends: POST with {"refresh": "TOKEN456..."}
    # Returns: {"access": "NEWTOKEN789..."}
    # NOTE: .as_view() converts the class into a function Django can call

    path('me/', views.current_user, name='current_user'),
     # ☝️ Creates route: /api/auth/me/
    # When called: runs views.current_user function (we'll write this)
    # What it does: returns info about logged-in user
    # Frontend sends: GET with Authorization header "Bearer TOKEN123..."
    # Returns: {"id": 1, "username": "pablo", "email": "pablo@huddl.com", "profile": {...}}
    # Django checks JWT token to know WHO is logged in
]
