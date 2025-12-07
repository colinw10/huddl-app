# =============================================================================
# USERS APP - URLS
# =============================================================================
#
# File: backend/users/urls.py
# Assigned to: NATALIA
# Responsibility: Route /api/auth/ endpoints
#
# TODO:
# - [ ] Import views (signup, me)
# - [ ] Import JWT views from simplejwt
# - [ ] Set up URL patterns for auth endpoints
#
# Status: PLACEHOLDER
# =============================================================================

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# TODO: Natalia - Import your views
# from .views import signup, me

urlpatterns = [
    # JWT endpoints (provided by simplejwt)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # TODO: Natalia - Add your endpoints
    # path('signup/', signup, name='signup'),
    # path('me/', me, name='me'),
]
