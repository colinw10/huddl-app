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
# Each user has 9+ posts (3 of each type minimum)
# Posts spread across 350 days for wave chart / heatmap coverage
# Realistic engagement: likes (2-50), comments (0-12)
# ============================================================================

# Helper function to generate random engagement numbers
def random_engagement():
    """
    Returns a dict with randomized likes, comments, and shares.
    
    Syntax breakdown:
        random.randint(a, b)  →  returns random integer where a <= result <= b
    """
    return {
        'likes': random.randint(2, 50),      # 2 to 50 likes
        'comments': random.randint(0, 12),   # 0 to 12 comments  
        'shares': random.randint(0, 8),      # 0 to 8 shares
    }

# Reusable media URLs - Tech, Martial Arts, Physics, Natural Phenomena
MEDIA_URLS = {
    # ═══════════════════════════════════════════════════════════════════
    # AURORA / NORTHERN LIGHTS - Rare & Majestic
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
    # CYBERPUNK / NEON - High Art Aesthetic
    # ═══════════════════════════════════════════════════════════════════
    'tokyo_rain': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200',         # Rainy Tokyo alley, Blade Runner mood
    'neon_alley': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',            # Hong Kong neon canyon
    'osaka_nights': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200',       # Dotonbori sensory overload
    'seoul_glow': 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200',         # Korean neon reflections
    'shanghai_fog': 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=1200',       # Pudong through mist
    'akihabara': 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200',          # Electric Town sensory assault
    
    # ═══════════════════════════════════════════════════════════════════
    # TECH / PHYSICS - The Beautiful Machine
    # ═══════════════════════════════════════════════════════════════════
    'lhc_tunnel': 'https://cds.cern.ch/images/CERN-PHOTO-201802-030-3/file?size=large',          # CERN particle accelerator
    'server_cathedral': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',      # Data center infinity
    'fiber_optic': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200',           # Light through glass
    'motherboard_macro': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',  # Circuit city landscape
    'tesla_coil': 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1200',         # Controlled lightning
    'laser_lab': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',          # Quantum optics setup
    
    # ═══════════════════════════════════════════════════════════════════
    # NATURAL POWER - Earth's Violence Made Beautiful
    # ═══════════════════════════════════════════════════════════════════
    'lightning_strike': 'https://images.unsplash.com/photo-1461511540115-9d4129be6767?w=1200',   # Pure electricity
    'volcano_lava': 'https://images.unsplash.com/photo-1562889676-9eb5b643e71e?w=1200',          # Molten earth
    'storm_cell': 'https://images.unsplash.com/photo-1527482937786-6f498d7e86c9?w=1200',         # Supercell structure
    'bioluminescence': 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200',    # Glowing waves
    
    # ═══════════════════════════════════════════════════════════════════
    # MARTIAL ARTS / DISCIPLINE - Form as Art
    # ═══════════════════════════════════════════════════════════════════
    'dojo_light': 'https://www.shaolin.org.gr/images/uploads/the_changing_landscape_of_kung_fu_in_modern_china.jpg',  # Outdoor dojo training
    'meditation_mist': 'https://images.stockcake.com/public/4/7/f/47f1eda0-8c36-44c2-a6ea-026399df7342_large/cyberpunk-samurai-zen-stockcake.jpg',
    'wudang_mountains': 'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=1200',   # Misty Chinese peaks
    'bamboo_forest': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200',      # Infinite green
}


mock_posts = [
    # ========== pabloPistola (9 posts) ==========
    # THOUGHTS (3)
    {'author': 'pabloPistola', 'content':'Kata: choreographed violence against nobody. Weirdly grounding. Don\'t question it.', 
     'type': 'thoughts', 'days_ago': 3, **random_engagement()},
    {'author': 'pabloPistola', 'content': 'The work exists before the work. You\'re just waiting for the pressure to crack you open.', 
     'type': 'thoughts', 'days_ago': 45, **random_engagement()},
    {'author': 'pabloPistola', 'content':'2am code works better. Hypothesis: the part of my brain that writes good code hates being awake.', 
     'type': 'thoughts', 'days_ago': 120, **random_engagement()},
    # MEDIA (3)
    {'author': 'pabloPistola', 'content': 'Aurora over Iceland. Solar wind hitting magnetosphere. Violence so beautiful you forget it could kill satellites.', 
     'type': 'media', 'days_ago': 15, 'media_url': MEDIA_URLS['aurora_reflection'], **random_engagement()},
    {'author': 'pabloPistola', 'content': 'Tokyo rain. Neon bleeds into puddles. Blade Runner was a documentary.', 
     'type': 'media', 'days_ago': 89, 'media_url': MEDIA_URLS['tokyo_rain'], **random_engagement()},
    {'author': 'pabloPistola', 'content': 'Outdoor dojo. Musashi trained in the woods because rent was too high. Respect the grind.', 
     'type': 'media', 'days_ago': 200, 'media_url': MEDIA_URLS['dojo_light'], **random_engagement()},
    # MILESTONES (3)
    {'author': 'pabloPistola', 'content': 'NUMENEON v1.0 out. Two weeks. Don\'t ask about week two. We don\'t talk about week two.', 
     'type': 'milestones', 'days_ago': 7, **random_engagement()},
    {'author': 'pabloPistola', 'content': 'Midpoint and GA reached. Imposter syndrome upgraded from suspicion to certainty.', 
     'type': 'milestones', 'days_ago': 150, **random_engagement()},
    {'author': 'pabloPistola', 'content': 'Push, pull, merge. Lather, rinse, repeat', 
     'type': 'milestones', 'days_ago': 280, **random_engagement()},

    # ========== arthurb (9 posts) ==========
    # THOUGHTS (3)
    {'author': 'arthurb', 'content': 'Physics is just applied curiosity. Change my mind.', 
     'type': 'thoughts', 'days_ago': 10, **random_engagement()},
    {'author': 'arthurb', 'content': 'Quantum entanglement: where two particles stay connected no matter the distance. Unlike my WiFi which dies if I walk to the kitchen.', 
     'type': 'thoughts', 'days_ago': 67, **random_engagement()},
    {'author': 'arthurb', 'content': 'The universe has read my questions and left me on seen for 14 billion years.', 
     'type': 'thoughts', 'days_ago': 190, **random_engagement()},
    # MEDIA (3)
    {'author': 'arthurb', 'content': 'CERN tunnel. 27km of humanity asking "what if we go faster?" Love that energy.', 
     'type': 'media', 'days_ago': 25, 'media_url': MEDIA_URLS['lhc_tunnel'], **random_engagement()},
    {'author': 'arthurb', 'content': 'Tesla coil. Controlled chaos. My thesis in physical form.', 
     'type': 'media', 'days_ago': 100, 'media_url': MEDIA_URLS['tesla_coil'], **random_engagement()},
    {'author': 'arthurb', 'content':'Pillars of Creation. Star nursery. We\'re all made of dead star stuff. Weirdly comforting.' , 
     'type': 'media', 'days_ago': 230, 'media_url': MEDIA_URLS['nebula_pillars'], **random_engagement()},
    # MILESTONES (3)
    {'author': 'arthurb', 'content': 'Finished a 26.2 miles marathon. Why. Who approved this decision.', 
     'type': 'milestones', 'days_ago': 5, **random_engagement()},
    {'author': 'arthurb', 'content': 'Published my first research paper on quantum computing! Peer review was intense.', 
     'type': 'milestones', 'days_ago': 140, **random_engagement()},
    {'author': 'arthurb', 'content': 'Got accepted to the physics conference in Geneva!', 
     'type': 'milestones', 'days_ago': 300, **random_engagement()},

    # ========== nataliap (9 posts) ==========
    # THOUGHTS (3)
    {'author': 'nataliap', 'content': 'Beat the bread to the oven. Personal victory.', 
     'type': 'thoughts', 'days_ago': 2, **random_engagement()},
    {'author': 'nataliap', 'content': 'Backend work is just ctrl+F and disappointment.', 
     'type': 'thoughts', 'days_ago': 55, **random_engagement()},
    {'author': 'nataliap', 'content':'makemigrations. migrate. No errors. I don\'t trust it.' , 
     'type': 'thoughts', 'days_ago': 175, **random_engagement()},
    # MEDIA (3)
    {'author': 'nataliap', 'content':'Server cathedral. Infinite rows of blinking lights. Our prayers are HTTP requests.', 
     'type': 'media', 'days_ago': 20, 'media_url': MEDIA_URLS['server_cathedral'], **random_engagement()},
    {'author': 'nataliap', 'content':'Pure electricity. Nature debugging itself.' , 
     'type': 'media', 'days_ago': 88, 'media_url': MEDIA_URLS['lightning_strike'], **random_engagement()},
    {'author': 'nataliap', 'content': 'Circuit board macro. A city for electrons. Better zoning than most real cities.', 
     'type': 'media', 'days_ago': 210, 'media_url': MEDIA_URLS['motherboard_macro'], **random_engagement()},
    # MILESTONES (3)
    {'author': 'nataliap', 'content': 'Caramel hit 338°F exactly. Evidence that I should be taken seriously.', 
     'type': 'milestones', 'days_ago': 8, **random_engagement()},
    {'author': 'nataliap', 'content':'JWTs verified. Middleware gatekeeping. Finally, professional paranoia.' , 
     'type': 'milestones', 'days_ago': 95, **random_engagement()},
    {'author': 'nataliap', 'content':'A year of consistency. Muscles exist now. Motivation still missing.' , 
     'type': 'milestones', 'days_ago': 320, **random_engagement()},

    # ========== colinw (9 posts) ==========
    # THOUGHTS (3)
    {'author': 'colinw', 'content':'Anyone downtown want to argue about shows neither of us finished?' , 
     'type': 'thoughts', 'days_ago': 4, **random_engagement()},
    {'author': 'colinw', 'content': 'Management insight: The best code is the code someone else can fix at 2am.', 
     'type': 'thoughts', 'days_ago': 60, **random_engagement()},
    {'author': 'colinw', 'content': 'Simple solutions work. But they don\'t have to look like they gave up.', 
     'type': 'thoughts', 'days_ago': 165, **random_engagement()},
    # MEDIA (3)
    {'author': 'colinw', 'content': 'Eclipse corona. The universe flexing. We are very small and that\'s fine.' , 
     'type': 'media', 'days_ago': 18, 'media_url': MEDIA_URLS['eclipse_corona'], **random_engagement()},
    {'author': 'colinw', 'content': 'Cyberpunk samurai meditation. Inner peace has a neon glow now.', 
     'type': 'media', 'days_ago': 110, 'media_url': MEDIA_URLS['meditation_mist'], **random_engagement()},
    {'author': 'colinw', 'content':'Wudang mountains. Where martial arts got philosophical. Mist optional but recommended.' , 
     'type': 'media', 'days_ago': 245, 'media_url': MEDIA_URLS['wudang_mountains'], **random_engagement()},
    # MILESTONES (3)
    {'author': 'colinw', 'content': 'Promoted to team lead! Co-lead secured.', 
     'type': 'milestones', 'days_ago': 12, **random_engagement()},
    {'author': 'colinw', 'content': 'First half-marathon complete! 13.1 miles down.', 
     'type': 'milestones', 'days_ago': 130, **random_engagement()},
    {'author': 'colinw', 'content': 'Witnessed a seagull steal a whole burrito. Respect. Fear. Mostly fear.', 
     'type': 'milestones', 'days_ago': 290, **random_engagement()},

    # ========== crystalr (9 posts) ==========
    # THOUGHTS (3)
    {'author': 'crystalr', 'content': 'Rest day. Body said no. I said fair. We have an understanding.', 
     'type': 'thoughts', 'days_ago': 1, **random_engagement()},
    {'author': 'crystalr', 'content': 'Moved a div 2 pixels left. Stared at it for 20 minutes. Moved it back.', 
     'type': 'thoughts', 'days_ago': 70, **random_engagement()},
    {'author': 'crystalr', 'content': 'Copilot assisted. So did caffeine, spite, and a chair I didn\'t build. We all have dependencies.', 
     'type': 'thoughts', 'days_ago': 185, **random_engagement()},
    # MEDIA (3)
    {'author': 'crystalr', 'content': 'Osaka at night. Sensory overload as a design philosophy. Approved.', 
     'type': 'media', 'days_ago': 22, 'media_url': MEDIA_URLS['osaka_nights'], **random_engagement()},
    {'author': 'crystalr', 'content': 'Seoul neon reflections. Every surface is a screen if you believe hard enough.' , 
     'type': 'media', 'days_ago': 95, 'media_url': MEDIA_URLS['seoul_glow'], **random_engagement()},
    {'author': 'crystalr', 'content': 'Fiber optics. Light trapped in glass, running errands. Relatable.', 
     'type': 'media', 'days_ago': 220, 'media_url': MEDIA_URLS['fiber_optic'], **random_engagement()},
    # MILESTONES (3)
    {'author': 'crystalr', 'content': 'Broke 20 minutes. Legs wanted to quit at 19. Outvoted.', 
     'type': 'milestones', 'days_ago': 6, **random_engagement()},
    {'author': 'crystalr', 'content': 'Friend requests working. Accept, decline, block. Simpler than real life honestly.', 
     'type': 'milestones', 'days_ago': 105, **random_engagement()},
    {'author': 'crystalr', 'content':'Month 1: Hello World. Month 6: deployed an app. Growth is just accumulated confusion.', 
     'type': 'milestones', 'days_ago': 340, **random_engagement()},

    # ========== titod (9 posts) ==========
    # THOUGHTS (3)
    {'author': 'titod', 'content': 'Brain left after hour 2. Fingers kept typing. We\'ll see what I wrote tomorrow.', 
     'type': 'thoughts', 'days_ago': 0, **random_engagement()},
    {'author': 'titod', 'content': 'Three coffees in. Jittery but functional. Exactly like my code.', 
     'type': 'thoughts', 'days_ago': 50, **random_engagement()},
    {'author': 'titod', 'content': 'Debugging is just leaving angry comments for someone who can\'t defend themselves. Me. It\'s me.', 
     'type': 'thoughts', 'days_ago': 155, **random_engagement()},
    # MEDIA (3)
    {'author': 'titod', 'content': 'Rare pink aurora. Solar storm hit different that night. Worth the frostbite.', 
     'type': 'media', 'days_ago': 14, 'media_url': MEDIA_URLS['aurora_pink'], **random_engagement()},
    {'author': 'titod', 'content': 'Milky Way arch. Billions of suns. Our problems: microscopic. Perspective acquired.', 
     'type': 'media', 'days_ago': 80, 'media_url': MEDIA_URLS['milky_way_arch'], **random_engagement()},
    {'author': 'titod', 'content':'Bamboo forest. Infinite green. Wind sounds like the earth breathing.', 
     'type': 'media', 'days_ago': 260, 'media_url': MEDIA_URLS['bamboo_forest'], **random_engagement()},
    # MILESTONES (3)
    {'author': 'titod', 'content': '100 days of code. Half of those were README edits. Streak is a streak.', 
     'type': 'milestones', 'days_ago': 9, **random_engagement()},
    {'author': 'titod', 'content': 'First client. Got paid to code. Accidentally a business now. Concerning.', 
     'type': 'milestones', 'days_ago': 125, **random_engagement()},
    {'author': 'titod', 'content': 'Full-stack app done. Frontend talks to backend. Nobody more surprised than me.', 
     'type': 'milestones', 'days_ago': 310, **random_engagement()},
]

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