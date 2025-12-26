# River Timeline Feature

## Overview

The River Timeline is Numeneon's signature feed display that groups all posts by user into single rows with carousel navigation. This "space economy" design lets users quickly scan many people's activity while preserving the ability to deep-dive into any individual's content.

---

## 🌊 The "River" Concept

Imagine three parallel streams flowing down your feed:

| Left Stream     | Center Stream | Right Stream  |
| --------------- | ------------- | ------------- |
| 💭 Thoughts     | 🖼️ Media      | 🏆 Milestones |
| Text-only posts | Image/video   | Achievements  |

Each **row = one user**. Their posts flow through the three columns based on type. Rows are sorted by **most recent activity** — whoever posted most recently appears at the top.

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

- **Thoughts (cyan/left):** Quick text updates, reflections, quotes
- **Media (purple/center):** Photos, videos, visual content
- **Milestones (green/right):** Achievements, life events, celebrations

### 3. Performance Limit (MAX_POSTS_PER_TYPE = 12)

To keep the carousel navigable:

- Maximum **12 posts per type** per user in the feed carousel
- Prevents excessive clicking (12 is the upper limit of "quick browse")
- Users can see **all posts** on the Profile page's "All Posts" section

### 4. Carousel Navigation

Chamfered nav buttons with neon glow effects, dimmed by default until hovered:

```jsx
// Arrows appear when posts.length > 1
{
  posts.length > 1 && (
    <div className="smart-deck-nav">
      <button className="smart-deck-nav-btn" onClick={prevCard}>
        ◀
      </button>
      <div className="smart-deck-dots">{/* position indicators */}</div>
      <button className="smart-deck-nav-btn" onClick={nextCard}>
        ▶
      </button>
    </div>
  );
}
```

---

## 🔧 Technical Implementation

### Grouping Logic

Located in `frontend/src/components/pages/Home/utils/groupPosts.js`:

```javascript
// Maximum posts per type in carousel (prevents excessive clicking)
const MAX_POSTS_PER_TYPE = 12;

export const groupPostsByUserAndDay = (posts, options = {}) => {
  const maxPosts = options.maxPostsPerType ?? MAX_POSTS_PER_TYPE;
  const grouped = {}; // Keyed by userId only (not date!)

  posts.forEach((post) => {
    const authorObj = typeof post.author === "object" ? post.author : null;
    const userId = post.userId || (authorObj ? authorObj.id : post.author);

    if (!grouped[userId]) {
      grouped[userId] = {
        user: { id: userId, name: authorObj?.username /* ... */ },
        thoughts: [],
        media: [],
        milestones: [],
        mostRecentDate: postDate,
        totalCounts: { thoughts: 0, media: 0, milestones: 0 }, // Track total before cap
      };
    }

    // Add post to category (capped at maxPosts)
    const type = post.type || "thoughts";
    grouped[userId].totalCounts[type]++; // Track total
    if (grouped[userId][type].length < maxPosts) {
      grouped[userId][type].push(post);
    }
  });

  return grouped;
};

export const sortGroupedPosts = (grouped) => {
  // Sort by most recent post timestamp (newest first)
  return Object.values(grouped).sort(
    (a, b) => b.mostRecentTimestamp - a.mostRecentTimestamp
  );
};
```

### Why User-Only Grouping?

**Previous (broken):** Grouped by `date + userId`

- ❌ Same user appeared in multiple rows
- ❌ Carousel arrows never showed (only 1 post per row)
- ❌ Defeated the space economy purpose

**Current (correct):** Grouped by `userId` only

- ✅ Each user = exactly ONE row
- ✅ Carousel arrows work (2+ posts per type)
- ✅ True space economy achieved
- ✅ Most active users bubble to top

### Why Recency Sorting (Not Date-Based Filtering)?

There's **no arbitrary time cutoff** (like "show only posts from last 3 days"). Instead:

- All posts are grouped and sorted by **most recent timestamp**
- Fresh content naturally rises to top
- Old content doesn't disappear, just ranks lower
- No confusion about "where did my friend's posts go?"

---

## 📱 Profile Page Integration

The Profile page uses River Timeline differently:

```
┌─────────────────────────────────┐
│      Profile Card (header)       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│   River Timeline (carousel)      │
│   [Thoughts] [Media] [Milestones]│
│    max 12 per type, arrows       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        All Posts Section         │
│  Chronological list (unlimited)  │
│  ┌─────────────────────────────┐│
│  │ Post (newest)               ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ Post                        ││
│  └─────────────────────────────┘│
│         ... (scroll)             │
└─────────────────────────────────┘
```

- **River Timeline:** Quick category preview (max 12 per type)
- **All Posts:** Full chronological feed for deep exploration

---

## 🗂️ Component Structure

```
frontend/src/components/pages/Home/
├── Home.jsx                    # Main page
├── utils/
│   └── groupPosts.js           # Grouping logic (MAX_POSTS=12)
└── components/
    ├── TimelineRiverFeed/
    │   └── TimelineRiverFeed.jsx    # Renders grouped rows
    └── TimelineRiverRow/
        ├── TimelineRiverRow.jsx     # Single user row with smart decks
        └── styles/
            ├── _smart-deck.scss     # Chamfered nav buttons
            ├── _carousel.scss       # Mobile carousel
            └── _responsive.scss     # Responsive breakpoints

frontend/src/components/pages/Profile/
├── Profile.jsx                      # Profile page with All Posts section
└── components/
    └── TimelineRiver/
        └── TimelineRiver.jsx        # Profile-specific timeline
```

---

## 🎯 Why This Design is Efficient

| Benefit               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **Scan Speed**        | See 10 users at a glance vs scrolling through 30+ posts      |
| **Context Grouping**  | All of a user's content together, not scattered              |
| **Type Discovery**    | Quickly see if someone posts thoughts vs media vs milestones |
| **Less Fatigue**      | Compact view reduces endless scrolling                       |
| **Carousel Depth**    | Click arrows to explore without leaving the row              |
| **Capped at 12**      | Carousel never becomes tedious (12 clicks max per type)      |
| **Profile Deep Dive** | Full posts list available on Profile page when needed        |
| **Fresh Content**     | Recency sorting keeps active users visible                   |

---

## 🎨 Visual Design

### Carousel Buttons

- **Chamfered corners** (not hexagonal)
- **Dimmed by default** (opacity: 0.5)
- **Neon glow on hover** (type-specific colors)
- **Smooth transitions** (0.3s cubic-bezier)

### Dot Indicators

- **Square with rounded corners** (8px default, 24px active)
- **Gradient fill when active** (matches type color)
- **Neon box-shadow glow**

### Type Colors

| Type       | Color            | Glow                     |
| ---------- | ---------------- | ------------------------ |
| Thoughts   | Cyan (#4fffff)   | rgba(79, 255, 255, 0.6)  |
| Media      | Purple (#c9a8ff) | rgba(201, 168, 255, 0.6) |
| Milestones | Green (#1ae784)  | rgba(26, 231, 132, 0.6)  |

---

## 🔗 Related Features

- **Activity Visualization:** Wave chart and heatmap on Profile Card
- **Profile Card:** Flip card with analytics on back
- **All Posts Section:** Chronological feed below River Timeline on Profile

---

## Summary

The River Timeline transforms a traditional endless feed into a structured, scannable view where:

1. **One row = one user** (space economy)
2. **Three columns = three content types** (visual organization)
3. **Max 12 per carousel** (prevents navigation fatigue)
4. **Recency sorted** (fresh content rises naturally)
5. **Profile has full list** (deep exploration available)

This design respects users' time while preserving content richness.
