# Stretch Goals - Feed Sorting Algorithms

Alternative feed sorting options beyond the current reverse-chronological approach.

---

## Current Implementation ✅

### Reverse Chronological (Live Now)

**How it works:**

- Posts sorted by `created_at` timestamp, newest first
- Most recent post (even by milliseconds) goes to top
- User's River Row position determined by their most recent post across any category
- If 13+ posts overflow into multiple rows, newest chunk appears first

**Code Location:** `frontend/src/components/pages/Home/utils/groupPosts.js`

```javascript
// Current: Sort by most recent post timestamp
const sortGroupedPosts = (grouped) => {
  return [...grouped].sort((a, b) => new Date(b.date) - new Date(a.date));
};
```

**Pros:**

- Transparent - users understand why they see what they see
- No "algorithmic anxiety" about being buried
- Real-time feel - new posts appear immediately
- Users control their feed by who they follow

**Cons:**

- Power users can "flood" the feed
- Miss important posts if you don't check often
- Less "engagement optimized"

---

## Future Options 📋

### 1. Hot/Trending Sort

**Description:** Combines recency with engagement velocity

**Algorithm:**

```
hotScore = (likes + comments*2 + shares*3) / hoursAgo^1.5
```

**Use Case:** Surface posts gaining traction quickly

**Backend Needs:**

- Real-time engagement counts
- Timestamp of last engagement
- Score calculation endpoint

---

### 2. Friend Priority Sort

**Description:** Boost posts from close friends

**Algorithm:**

- Track interaction frequency between users
- Weight posts from users you engage with most
- "Close Friends" manual list option

**Backend Needs:**

- Interaction tracking table
- Friendship strength score
- User preference settings

---

### 3. Category Weighting

**Description:** Prioritize certain post types

**Options:**

- Milestones always appear first (celebrate achievements)
- Media posts boosted (visual content priority)
- User-configurable weights

**Implementation:**

```javascript
const categoryWeight = {
  milestones: 1.5,
  media: 1.2,
  thoughts: 1.0,
};
```

---

### 4. Smart/Algorithmic Feed

**Description:** ML-based personalization (like Instagram/Facebook)

**Signals:**

- Who you interact with most
- Post engagement rates
- Content type preferences
- Time-of-day patterns
- Relationship strength

**Complexity:** HIGH - requires significant backend infrastructure

---

### 5. Hybrid Toggle

**Description:** Let users switch between modes

**UI Mock:**

```
[Chronological ▼]
├── Latest (current)
├── Hot Today
├── Friends First
└── Milestones
```

**Implementation:**

- Dropdown in timeline header
- Save preference to user settings
- Apply different sort function based on selection

---

## Recommendation

For MVP: **Keep chronological** (current implementation)

For v2.0: Add **Hot/Trending** as an option

For v3.0: Consider **Hybrid Toggle** to give users control

---

## Industry Reference

| Platform     | Default          | Options                           |
| ------------ | ---------------- | --------------------------------- |
| Twitter/X    | Algorithmic      | "Following" tab for chronological |
| Instagram    | Algorithmic      | "Following" for chronological     |
| Facebook     | "Top Posts"      | "Most Recent" toggle              |
| Reddit       | "Hot"            | New, Top, Rising, Controversial   |
| Mastodon     | Chronological    | None (by design)                  |
| TikTok       | Pure algorithmic | None                              |
| **NUMENEON** | Chronological    | Future: Toggle options            |

---

## Related Files

- [TimelineCarousel.md](../features-implemented/TimelineCarousel.md) - Current deck navigation
- [AdvancedAnalytics.md](AdvancedAnalytics.md) - Engagement metrics that could feed algorithms
- `frontend/src/components/pages/Home/utils/groupPosts.js` - Sorting logic
