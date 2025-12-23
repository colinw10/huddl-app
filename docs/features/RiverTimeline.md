# River Timeline Feature

## Overview

The River Timeline is Numeneon's signature feed display that groups all posts by user into single expandable rows. This "space economy" design lets users quickly scan many people's activity while preserving the ability to deep-dive into any individual's content.

---

## 🌊 The "River" Concept

Imagine three parallel streams flowing down your feed:

| Left Stream     | Center Stream | Right Stream  |
| --------------- | ------------- | ------------- |
| 💭 Thoughts     | 🖼️ Media      | 🏆 Milestones |
| Text-only posts | Image/video   | Achievements  |

Each **row = one user**. Their posts flow through the three columns based on type.

---

## ✨ Key Design Principles

### 1. Space Economy

**Problem:** Traditional feeds show one post per row, creating infinite scroll fatigue.

**Solution:** Group all posts from the same user into a single row with carousel navigation.

```
Traditional Feed:          River Timeline:
┌─────────────────┐        ┌───────┬───────┬───────┐
│ User A - Post 1 │        │ UserA │ UserA │ UserA │
├─────────────────┤        │ ◀ 1/3 │ ◀ 2/5 │ ◀ 1/2 │ ← Carousel arrows
│ User B - Post 1 │        ├───────┼───────┼───────┤
├─────────────────┤        │ UserB │ UserB │ UserB │
│ User A - Post 2 │        │ ◀ 1/4 │ ◀ 1/3 │ ◀ 2/2 │
├─────────────────┤        └───────┴───────┴───────┘
│ User A - Post 3 │
└─────────────────┘
```

### 2. Content Type Separation

Each column has a distinct purpose:

- **Thoughts (left):** Quick text updates, reflections, quotes
- **Media (center):** Photos, videos, visual content
- **Milestones (right):** Achievements, life events, celebrations

### 3. Carousel Navigation

When a user has multiple posts of the same type, carousel arrows appear:

```jsx
// Arrows appear when posts.length > 1
{
  thoughts.length > 1 && (
    <>
      <button onClick={prevThought}>◀</button>
      <button onClick={nextThought}>▶</button>
    </>
  );
}
```

---

## 🔧 Technical Implementation

### Grouping Logic

Located in `frontend/src/components/pages/Home/utils/groupPosts.js`:

```javascript
export function groupPosts(posts = [], users = []) {
  const groups = {};

  posts.forEach((post) => {
    const userId = post.user_id || post.user?.id;

    // Group by USER ONLY (not by date)
    const key = `user-${userId}`;

    if (!groups[key]) {
      groups[key] = {
        userId,
        user: users.find((u) => u.id === userId),
        thoughts: [],
        media: [],
        milestones: [],
        latestDate: post.created_at,
      };
    }

    // Sort into appropriate column
    if (post.type === "thought") groups[key].thoughts.push(post);
    else if (post.type === "media") groups[key].media.push(post);
    else if (post.type === "milestone") groups[key].milestones.push(post);
  });

  return Object.values(groups);
}
```

### Why User-Only Grouping?

**Previous (broken):** Grouped by `date + userId`

- ❌ Same user appeared in multiple rows
- ❌ Carousel arrows never showed (only 1 post per row)
- ❌ Defeated the space economy purpose

**Current (correct):** Grouped by `userId` only

- ✅ Each user = exactly ONE row
- ✅ Carousel arrows work (3+ posts per type)
- ✅ True space economy achieved

### Data Requirements

For carousel arrows to appear, each user needs **3+ posts per type**:

```python
# seed_posts.py structure
POSTS_DATA = [
    # Each user gets 9 posts total:
    # - 3 thoughts  → enables thought carousel
    # - 3 media     → enables media carousel
    # - 3 milestones → enables milestone carousel
]
```

---

## 📊 Row Header Display

Each row shows the user's "last active" time instead of a specific date:

```jsx
<div className="timeline-row-header">
  <Avatar user={group.user} />
  <span className="username">{group.user.display_name}</span>
  <span className="last-active">
    Last active: {formatDate(group.latestDate)}
  </span>
</div>
```

---

## 🗂️ Component Structure

```
frontend/src/components/pages/Home/
├── Home.jsx                    # Main page
├── utils/
│   └── groupPosts.js           # Grouping logic
└── components/
    └── TimelineRiverFeed/
        ├── TimelineRiverFeed.jsx    # Renders grouped rows
        ├── TimelineRiverFeed.scss   # Styles
        ├── TimelineRow.jsx          # Single user row
        └── PostCard.jsx             # Individual post
```

---

## 🎯 Benefits

| Benefit              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Scan Speed**       | See 10 users at a glance vs scrolling through 30+ posts      |
| **Context Grouping** | All of a user's content together, not scattered              |
| **Type Discovery**   | Quickly see if someone posts thoughts vs media vs milestones |
| **Less Fatigue**     | Compact view reduces endless scrolling                       |
| **Carousel Depth**   | Click arrows to explore without leaving the row              |

---

## 🔗 Related Features

- **Wave Chart**: Shows engagement peaks across 52 weeks
- **Heatmap**: Shows posting frequency (requires posts spread across dates)
- **Profile Card**: Flip card with activity analytics

---

## 📝 Seed Data for Testing

The river timeline requires proper seed data to demonstrate all features:

```bash
cd backend
python seed_posts.py
```

This creates:

- 6 users with diverse profiles
- 9 posts per user (3 thoughts, 3 media, 3 milestones)
- Posts spread across 365 days (for heatmap/wave chart)
- Realistic engagement (likes: 2-50, comments: 0-12)

---

## Summary

The River Timeline transforms a traditional endless feed into a structured, scannable view where:

1. **One row = one user** (space economy)
2. **Three columns = three content types** (visual organization)
3. **Carousel arrows = deep exploration** (content depth without clutter)

This design respects users' time while preserving content richness.
