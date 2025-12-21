#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'huddl.settings')
django.setup()

from django.contrib.auth.models import User
from posts.models import Post

# Create friend users if they don't exist
friend_users = [
    {'username': 'alexr', 'email': 'alex@test.com', 'first_name': 'Alex', 'last_name': 'Rodriguez'},
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
# MOCK POSTS DATA
# ============================================================================
# Frontend file: src/components/pages/Profile/components/ProfileCard/ProfileCard.jsx
#
# HOW THIS DATA AFFECTS ANALYTICS:
# 
# WAVE CHART (engagement over 52 weeks):
#   - Uses: likes_count, comment_count, shares_count
#   - Liking posts via API increments likes_count → changes wave height
#
# HEATMAP (posting frequency calendar):
#   - Uses: created_at timestamps
#   - Creating posts with varied dates → fills in the activity grid
#
# POST TYPE BREAKDOWN (pie chart):
#   - Uses: type field ('thoughts', 'media', 'milestones')
#   - Distribution of post types → changes percentage breakdown
#
# To see interesting analytics, modify posts below with:
#   - Varied 'created_at' dates (spread across weeks)
#   - Initial 'likes_count', 'comment_count', 'shares_count' values
# ============================================================================
mock_posts = [
    {'author': 'pabloPistola', 'content': 'Just finished an amazing workout session! Feeling pumped.', 'type': 'thoughts'},
    {'author': 'pabloPistola', 'content': 'Check out this amazing northern lights view!', 'type': 'media', 'media_url': 'https://ustoa.com/blog/wp-content/uploads/2019/07/northern-lights2-1024x678.jpg'},
    {'author': 'pabloPistola', 'content': 'Shipped NUMENEON v1.0! From concept to production in 2 weeks. Dreams become reality when you stop waiting.', 'type': 'milestones'},
    {'author': 'arthurb', 'content': 'Finally completed my first marathon! 26.2 miles of pure determination.', 'type': 'milestones'},
    {'author': 'arthurb', 'content': 'Visited the Large Hadron Collider today. Mind = blown. The scale of human ambition never ceases to amaze me.', 'type': 'media', 'media_url': 'https://cds.cern.ch/images/CERN-PHOTO-201802-030-3/file?size=large'},
    {'author': 'arthurb', 'content': 'Physics is just applied curiosity. Change my mind.', 'type': 'thoughts'},
    {'author': 'nataliap', 'content': 'New PR on deadlifts today! Hard work pays off.', 'type': 'milestones'},
    {'author': 'nataliap', 'content': 'Morning gym sessions hit different when you actually wake up on time.', 'type': 'thoughts'},
    {'author': 'colinw', 'content': 'Looking for running partners in the downtown area. Hit me up!', 'type': 'thoughts'},
    {'author': 'colinw', 'content': 'Trail running in the mountains this weekend. Nature is the best gym.', 'type': 'media', 'media_url': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'},
    {'author': 'crystalr', 'content': 'Finally hit my goal of running a sub-20 minute 5K!', 'type': 'milestones'},
    {'author': 'crystalr', 'content': 'Rest days are just as important as training days. Your body needs recovery.', 'type': 'thoughts'},
    {'author': 'alexr', 'content': 'Just wrapped up a 3-hour coding session. Brain = fried but made huge progress on the app.', 'type': 'thoughts'},
    {'author': 'alexr', 'content': 'Coffee is not a want, its a need. Third cup and counting.', 'type': 'thoughts'},
    {'author': 'alexr', 'content': 'Caught this insane sunset from the rooftop last night.', 'type': 'media', 'media_url': 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800'},
    {'author': 'alexr', 'content': '100 days of coding streak! Consistency > intensity.', 'type': 'milestones'},
]

print('Creating posts...')
for p in mock_posts:
    username = p['author']
    if username in users:
        post = Post.objects.create(
            author=users[username],
            content=p['content'],
            type=p.get('type', 'thoughts'),
            media_url=p.get('media_url', None),
        )
        print(f'  Created: {username} - {p["content"][:30]}...')
    else:
        print(f'  SKIPPED (user not found): {username}')

print(f'\nTotal posts in database: {Post.objects.count()}')
