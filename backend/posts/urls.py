from django.urls import path
from . import views

urlpatterns = [
    # GET all posts, POST new post
    path('', views.post_list, name='post_list'),
    
    # GET one, PUT, DELETE
    # <int:pk> = placeholder for post ID (must be a number)
    path('<int:pk>/', views.post_detail, name='post_detail'),
]