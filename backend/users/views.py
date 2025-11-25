from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # Temporarily disabled for testing:
    # permission_classes = [IsAuthenticated]
    
    # Override the create method to auto-assign logged-in user
    def perform_create(self, serializer):
        # Get the logged-in user (request.user)
        # Save the profile with that user attached
        serializer.save(user=self.request.user)