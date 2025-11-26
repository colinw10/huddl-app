from django.shortcuts import render, 
from rest_framework import viewsets, permissions
# Import tools for building ViewSets and handling permissions
from .models import Post
 # Import the Post model (database table)
from .serializers import PostSerializer
# Import the PostSerializer (controls JSON output)
# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
  # A ModelViewSet gives full CRUD: list, retrieve, create, update, delete
    queryset = Post.objects.all().order_by('_created_at')
     # This is the list of posts returned; sorted newest-first
    serializer_class = PostSerializer
    # Tells DRF to use PostSerializer for JSON input/output
    permission_classes = [permissions.IsAuthenticated]
    # Only logged-in users can access these endpoints
    def perform_create(self, serializer):  # This function runs automatically when creating a new Post
      serializer.save(author=self.request.user)
      # When a post is created, set the author to the logged-in user.”
       # Saves the post AND assigns the current logged-in user as the author

#ModelViewSet comes from:

'''
from rest_framework import viewsets


And it automatically provides:

list (GET /posts/)

retrieve (GET /posts/12/)

create (POST /posts/)

update (PUT/PATCH)

delete (DELETE)

So you don’t write those by hand.
'''