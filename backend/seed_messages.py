from django.contrib.auth.models import User
from messages_app.models import Message

# Get users
me = User.objects.get(username='pabloPistola')
arthur = User.objects.get(username='arthurb')
natalia = User.objects.get(username='nataliap')
colin = User.objects.get(username='colinw')
crystal = User.objects.get(username='crystalr')
tito = User.objects.get(username='titod')

# Conversation 1: Arthur
Message.objects.create(sender=arthur, receiver=me, content="Knock-knock")
Message.objects.create(sender=me, receiver=arthur, content="nobody's home")
Message.objects.create(sender=arthur, receiver=me, content="Damn")

# Conversation 2: Natalia
Message.objects.create(sender=natalia, receiver=me, content="I don't know how I feel about this")
Message.objects.create(sender=me, receiver=natalia, content="I don't feel anything")

# Conversation 3: Colin
Message.objects.create(sender=colin, receiver=me, content="What do you think?")
Message.objects.create(sender=me, receiver=colin, content="You don't wanna know")

# Conversation 4: Crystal
Message.objects.create(sender=crystal, receiver=me, content="So, I think I have some typo's")
Message.objects.create(sender=me, receiver=crystal, content="I have dyslexia")

# Conversation 5: Tito
Message.objects.create(sender=tito, receiver=me, content="Yo!")
Message.objects.create(sender=me, receiver=tito, content="You're alive!")

print("✅ Created 11 messages across 5 conversations")
