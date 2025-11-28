from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register the ViewSet
# DefaultRouter auto-generates all CRUD routes for a ViewSet
# This replaces writing each path() manually
router = DefaultRouter()
# Register the PostViewSet at the root ('')
# basename='post' creates names like 'post-list', 'post-detail'
router.register(r'', views.PostViewSet, basename='post')

urlpatterns = [
     # include(router.urls) adds all the auto-generated routes:
    # GET    /api/posts/      → list all posts
    # POST   /api/posts/      → create new post
    # GET    /api/posts/3/    → get post #3
    # PUT    /api/posts/3/    → update post #3
    # DELETE /api/posts/3/    → delete post #3
    path('', include(router.urls)),
]
# ═══════════════════════════════════════════════════════════════════════
# 💡 WHY THIS IS BETTER THAN MANUAL PATHS
# ═══════════════════════════════════════════════════════════════════════
# OLD WAY (function-based):
#   path('', views.post_list, name='post_list'),
#   path('<int:pk>/', views.post_detail, name='post_detail'),
#   → Requires writing post_list() and post_detail() functions manually
#   → More code, more repetition
#
# NEW WAY (ViewSet + Router):
#   → One class (PostViewSet) handles all 5 actions
#   → Router generates all routes automatically
#   → Less code, easier to maintain
#   → Industry standard for Django REST Framework