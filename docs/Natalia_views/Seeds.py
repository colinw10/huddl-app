#!/usr/bin/env python
import os
import django
import random
from datetime import datetime, timedelta  # NEW: For date manipulation
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'numeneon.settings')
django.setup()
from django.contrib.auth.models import User
from posts.models import Post
# Clear existing posts for fresh seed data
print('Clearing existing posts...')
Post.objects.all().delete()  # NEW: Removes ALL posts from database
# Create friend users if they don't exist
friend_users = [
    {'username': 'pabloPistola', 'email': 'pablo@test.com', 'first_name': 'Pablo', 'last_name': 'Cordero'},
    {'username': 'titod', 'email': 'tito@test.com', 'first_name': 'Tito', 'last_name': 'Del Valle'},
    {'username': 'arthurb', 'email': 'arthur@test.com', 'first_name': 'Arthur', 'last_name': 'Brown'},
    {'username': 'nataliap', 'email': 'natalia@test.com', 'first_name': 'Natalia', 'last_name': 'Perez'},
    {'username': 'colinw', 'email': 'colin@test.com', 'first_name': 'Colin', 'last_name': 'Wang'},
    {'username': 'crystalr', 'email': 'crystal@test.com', 'first_name': 'Crystal', 'last_name': 'Rivera'},
]
print('Creating friend users...')
for u in friend_users:
    user, created = User.objects.get_or_create(
        username=u['username'],
        defaults={
            'email': u['email'],
            'first_name': u['first_name'],
            'last_name': u['last_name'],
        }
    )
    if created:
        user.set_password('test123')
        user.save()
        print(f'  Created user: {u["username"]}')
    else:
        print(f'  User exists: {u["username"]}')
# Get users
users = {u.username: u for u in User.objects.all()}
print('Users:', list(users.keys()))
# ============================================================================
# MOCK POSTS DATA - EXPANDED FOR ANALYTICS
# ============================================================================
# Each user has 20+ posts for dense heatmap coverage
# Posts spread across 365 days with clusters for wave peaks
# BOOSTED engagement for maximum heatmap visibility!
# This creates visible waves and brightly lit heatmaps!
# ============================================================================
# Helper functions for engagement - MASSIVELY BOOSTED for visible heatmap
def high_engagement():
    """High activity posts - creates bright wave peaks"""
    return {
        'likes': random.randint(800, 1500),
        'comments': random.randint(150, 300),
        'shares': random.randint(100, 200),
    }
def medium_engagement():
    """Medium activity - still quite visible"""
    return {
        'likes': random.randint(400, 800),
        'comments': random.randint(80, 150),
        'shares': random.randint(50, 100),
    }
def low_engagement():
    """Lower activity - but still lights up heatmap"""
    return {
        'likes': random.randint(200, 400),
        'comments': random.randint(40, 80),
        'shares': random.randint(25, 50),
    }
def random_engagement():
    """Mix of engagement levels - more high engagement for visibility"""
    choice = random.random()
    if choice < 0.40:  # 40% high
        return high_engagement()
    elif choice < 0.75:  # 35% medium
        return medium_engagement()
    else:  # 25% low
        return low_engagement()
# Reusable media URLs - Tech, Martial Arts, Physics, Natural Phenomena
MEDIA_URLS = {
    # ═══════════════════════════════════════════════════════════════════
    # AURORA / NORTHERN LIGHTS
    # ═══════════════════════════════════════════════════════════════════
    'aurora_reflection': 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1200',  # Mirror lake reflection, Iceland
    'aurora_pink': 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1200',        # Rare pink/magenta aurora
    'aurora_cabin': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',       # Lonely cabin under green curtains
    'aurora_mountain': 'https://images.unsplash.com/photo-1494243762909-b498c7e440a9?w=1200',    # Aurora over jagged peaks
    'aurora_spiral': 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200',      # Spiral corona overhead
    'aurora_red': 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?w=1200',         # Rare blood-red aurora
    # ═══════════════════════════════════════════════════════════════════
    # COSMIC / CELESTIAL - The Sublime
    # ═══════════════════════════════════════════════════════════════════
    'nebula_pillars': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200',     # Pillars of Creation vibes
    'milky_way_arch': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',     # Perfect arch over mountains
    'eclipse_corona': 'https://images.unsplash.com/photo-1503416997304-7f8bf166c121?w=1200',     # Solar corona detail
    'supermoon': 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=1200',          # Massive moon on horizon
    'comet_trail': 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200',        # Long exposure comet
    # ═══════════════════════════════════════════════════════════════════
    # CYBERPUNK / NEON - Aesthetic
    #
print('Creating posts...')
for p in mock_posts:
    username = p['author']
    if username in users:
        # Step 1: Create the post with basic fields
        post = Post.objects.create(
            author=users[username],
            content=p['content'],
            type=p.get('type', 'thoughts'),
            media_url=p.get('media_url', None),
            # Set engagement counts from our mock data
            likes_count=p.get('likes', 0),       # NEW: Uses 'likes' from dict, defaults to 0
            comment_count=p.get('comments', 0),  # NEW: Uses 'comments' from dict
            shares_count=p.get('shares', 0),     # NEW: Uses 'shares' from dict
        )
        # Step 2: Override created_at timestamp for analytics spread
        # We do this AFTER create() because auto_now_add fields can't be set during creation
        days_ago = p.get('days_ago', 0)  # Get days_ago, default to 0 (today)
        post.created_at = datetime.now() - timedelta(days=days_ago)
        #                 ^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^^^^
        #                 |                |
        #                 |                timedelta(days=5) = a duration of 5 days
        #                 Current date/time
        #
        # Example: If today is Dec 23 and days_ago=10:
        #          datetime.now() = Dec 23, 2024 14:30:00
        #          timedelta(days=10) = 10 days
        #          Result: Dec 13, 2024 14:30:00
        post.save()  # NEW: Must call save() to persist the created_at change
        print(f'  Created: {username} - {p["content"][:40]}... (days_ago: {days_ago})')
    else:
        print(f'  SKIPPED (user not found): {username}')
print(f'\nTotal posts in database: {Post.objects.count()}')
print('Done!')
