#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'huddl.settings')
django.setup()

from django.contrib.auth.models import User
from posts.models import Post

# Get users
users = {u.username: u for u in User.objects.all()}
print('Users:', list(users.keys()))

# Mock posts data - from frontend
mock_posts = [
    {'author': 'pabloPistola', 'content': 'Just finished an amazing workout session! Feeling pumped.', 'type': 'thoughts'},
    {'author': 'pabloPistola', 'content': 'Check out this amazing northern lights view!', 'type': 'media', 'media_url': 'https://ustoa.com/blog/wp-content/uploads/2019/07/northern-lights2-1024x678.jpg'},
    {'author': 'pabloPistola', 'content': 'Shipped HuddL v1.0! From concept to production in 2 weeks. Dreams become reality when you stop waiting.', 'type': 'milestones'},
    {'author': 'arthurb', 'content': 'Finally completed my first marathon! 26.2 miles of pure determination.', 'type': 'milestones'},
    {'author': 'nataliap', 'content': 'New PR on deadlifts today! Hard work pays off.', 'type': 'milestones'},
    {'author': 'colinw', 'content': 'Looking for running partners in the downtown area. Hit me up!', 'type': 'thoughts'},
    {'author': 'tito', 'content': 'Yoga session at sunset was exactly what I needed today.', 'type': 'media', 'media_url': 'https://publish.purewow.net/wp-content/uploads/sites/2/2021/03/advanced-yoga-poses-visvamitrasana.jpg'},
    {'author': 'crystalr', 'content': 'Finally hit my goal of running a sub-20 minute 5K!', 'type': 'milestones'},
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
