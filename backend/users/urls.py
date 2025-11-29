"""
=============================================================================
USERS APP - URL ROUTING
=============================================================================

File: backend/users/urls.py
Assigned to: NATALIA
Responsibility: Auth and profile URL patterns

TODO:
- [ ] POST /api/users/signup/ - Registration
- [ ] POST /api/users/login/ - Authentication
- [ ] POST /api/users/token/refresh/ - JWT refresh
- [ ] GET/PUT /api/users/me/ - Current user
- [ ] GET /api/users/{id}/ - Public profile

Status: PLACEHOLDER
=============================================================================
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
# TODO: Natalia - Register UserViewSet
# router.register(r'', views.UserViewSet, basename='user')

urlpatterns = [
    # Auth endpoints
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', views.current_user, name='current_user'),
    
    # User profiles
    path('', include(router.urls)),
]
