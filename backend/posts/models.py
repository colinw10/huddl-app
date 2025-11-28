# 🟢 COLIN - Posts Backend Lead
# models.py - Database structure for posts

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Creates a new database table called "posts"
class Post(models.Model):
    # Links post to the user that created it
    # ForeignKey = many posts can belong to one user
    # on_delete=CASCADE = if user deleted, delete their posts too
    # related_name='posts' = lets you do user.posts.all()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    # The actual text content of the post
    # TextField = can hold long text (like paragraphs)
    # max_length = 500 characters max (from your spec)
    # blank=False = this field is REQUIRED (can't be empty)
    content = models.TextField(max_length=500, blank=False)

    # Type of post (thoughts, media, or milestones)
    # CharField = short text field
    # max_length = 20 chars (enough for "milestones")
    # choices = only these 3 options allowed
    # default 'thoughts' if not specified
    POST_TYPES = [
        # 'lowercase' = Database value (gets saved)
        # 'Uppercase' = Display name (what humans see in admin/forms)
        ('thoughts', 'Thoughts'),
        ('media', 'Media'),
        ('milestones', 'Milestones'),
    ]
    type = models.CharField(max_length=20, choices=POST_TYPES, default='thoughts')

    # Optional URL to photo/video (for media posts)
    # URLField = validates it's a proper URL
    # blank=True, null=True = this field is OPTIONAL
    media_url = models.URLField(max_length=500, blank=True, null=True)

    # Timestamps - track when post was created and last updated
    # auto_now_add=True = set to NOW when post first created (never changes)
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now=True = update to NOW every time post is saved
    updated_at = models.DateTimeField(auto_now=True)

    # String representation = how post displays in admin panel
    # Shows first 50 chars of content with author's name
    def __str__(self):
        return f"{self.author.username}: {self.content[:50]}"
    
    # Meta options - configure how posts behave
    class Meta:
        # Order posts newest first (- means descending)
        ordering = ['-created_at']
