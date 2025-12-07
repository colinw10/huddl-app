# 🔵 PABLO - Test User Setup
# Run with: python manage.py create_test_user

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import Profile


class Command(BaseCommand):
    help = 'Creates a test user for development'

    def handle(self, *args, **options):
        # Test user credentials
        username = 'pabloPistola'
        email = 'pablo@huddl.com'
        password = 'test123'

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            self.stdout.write(self.style.WARNING(f'User "{username}" already exists!'))
        else:
            # Create the user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name='Pablo',
                last_name='Cordero'
            )
            self.stdout.write(self.style.SUCCESS(f'Created user: {username}'))

        # Create or update profile
        profile, created = Profile.objects.get_or_create(
            user=user,
            defaults={
                'bio': 'you buy it, you break it',
                'location': 'Brooklyn, NY',
                'website': 'https://github.com/Cordero080',
            }
        )
        
        if not created:
            profile.bio = 'you buy it, you break it'
            profile.location = 'Brooklyn, NY'
            profile.website = 'https://github.com/Cordero080'
            profile.save()
            self.stdout.write(self.style.SUCCESS('Updated profile'))
        else:
            self.stdout.write(self.style.SUCCESS('Created profile'))

        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 50))
        self.stdout.write(self.style.SUCCESS('TEST USER READY!'))
        self.stdout.write(self.style.SUCCESS('=' * 50))
        self.stdout.write(f'  Username: {username}')
        self.stdout.write(f'  Email: {email}')
        self.stdout.write(f'  Password: {password}')
        self.stdout.write('')
        self.stdout.write('Login at: POST /api/auth/login/')
        self.stdout.write('Body: {"username": "pabloPistola", "password": "test123"}')
        self.stdout.write('')
