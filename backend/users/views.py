from django.contrib.auth.models import User
from rest_framework import viewsets, status
# 🟡 NATALIA - Auth & Users Lead
# views.py - Authentication and user management endpoints

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
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


# ═══════════════════════════════════════════════════════════════════════
# 🔐 SIGNUP VIEW
# ═══════════════════════════════════════════════════════════════════════
@api_view(['POST'])
@permission_classes([AllowAny])  # Anyone can sign up (no auth required)
def signup(request):
    """
    Creates a new user account
    
    Frontend sends: POST /api/auth/signup/
    Body: { "username": "pablo", "display_name": "Pablo Cordero", "email": "pablo@test.com", "password": "pass123" }
    Returns: { "id": 1, "username": "pablo", "email": "pablo@test.com" }
    """
    # Get data from request
    username = request.data.get('username')
    display_name = request.data.get('display_name', '')
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Parse display name into first/last
    name_parts = display_name.strip().split(' ', 1) if display_name else ['', '']
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ''
    
    # Validate required fields
    if not username or not email or not password:
        return Response(
            {'error': 'Username, email, and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if username already exists
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already taken'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if email already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already registered'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create the user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,  # Django auto-hashes this!
        first_name=first_name,
        last_name=last_name
    )
    
    # Create a profile for the user
    Profile.objects.create(user=user)
    
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'message': 'Account created successfully!'
    }, status=status.HTTP_201_CREATED)


# ═══════════════════════════════════════════════════════════════════════
# 🔐 EMAIL LOGIN VIEW
# ═══════════════════════════════════════════════════════════════════════
@api_view(['POST'])
@permission_classes([AllowAny])  # Anyone can try to log in
def email_login(request):
    """
    Login with email and password, returns JWT tokens
    
    Frontend sends: POST /api/auth/login/
    Body: { "email": "pablo@huddl.com", "password": "test123" }
    Returns: { "access": "...", "refresh": "..." }
    """
    from .serializers import EmailLoginSerializer
    
    serializer = EmailLoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
    # Format errors for frontend - extract first error message
    errors = serializer.errors
    if 'non_field_errors' in errors:
        detail = errors['non_field_errors'][0]
    else:
        detail = list(errors.values())[0][0] if errors else 'Login failed'
    
    return Response({'detail': detail}, status=status.HTTP_401_UNAUTHORIZED)


# ═══════════════════════════════════════════════════════════════════════
# 👤 CURRENT USER VIEW
# ═══════════════════════════════════════════════════════════════════════
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Must be logged in
def current_user(request):
    """
    Returns the currently logged-in user's info
    
    Frontend sends: GET /api/auth/me/
    Headers: { "Authorization": "Bearer TOKEN123..." }
    Returns: { "id": 1, "username": "pablo", "email": "pablo@huddl.com", "profile": {...} }
    """
    user = request.user  # JWT middleware attaches this
    
    # Try to get user's profile
    try:
        profile = user.profile
        profile_data = ProfileSerializer(profile).data
    except Profile.DoesNotExist:
        profile_data = None
    
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'profile': profile_data
    })