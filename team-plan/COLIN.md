# Colin - Home/Feed

## Role

Home page feed, post display, and posts backend API.

---

## Assigned Files

### Frontend - Home Page

| File                                                          | Status | Description             |
| ------------------------------------------------------------- | ------ | ----------------------- |
| `src/components/pages/Home/Home.jsx`                          | ←      | Main feed container     |
| `src/components/pages/Home/Home.scss`                         | ←      | Feed styles             |
| `src/components/pages/Home/index.js`                          | ←      | Barrel export           |
| `src/components/pages/Home/components/TimelineRiverFeed.jsx`  | ←      | 3-column river layout   |
| `src/components/pages/Home/components/TimelineRiverFeed.scss` | ←      | River feed styles       |
| `src/components/pages/Home/components/TimelineRiverRow.jsx`   | ←      | Individual post display |
| `src/components/pages/Home/components/TimelineRiverRow.scss`  | ←      | Row styles              |
| `src/components/pages/Home/components/index.js`               | ←      | Components barrel       |
| `src/components/pages/Home/utils/groupPosts.js`               | ←      | Post clustering by time |

### Backend - Posts API

| File                           | Status | Description                           |
| ------------------------------ | ------ | ------------------------------------- |
| `backend/posts/models.py`      | ←      | Post model (with post_type)           |
| `backend/posts/admin.py`       | ←      | Register Post in admin                |
| `backend/posts/serializers.py` | ←      | PostSerializer (like_count, is_liked) |
| `backend/posts/views.py`       | ←      | PostViewSet (feed, like, unlike)      |
| `backend/posts/urls.py`        | ←      | /api/posts/ routes                    |

---

## Tasks

### Week 1

- [ ] Register Post model in admin.py
- [ ] Verify Post model has all needed fields
- [ ] Create test posts via admin panel

### Week 2

- [ ] Create PostSerializer with:
  - author_username (from author.username)
  - like_count
  - is_liked (for current user)
  - post_type field
- [ ] Create PostViewSet with:
  - list() - Feed of all posts
  - create() - New post
  - retrieve() - Single post
  - destroy() - Delete own post
- [ ] Add like/unlike actions
- [ ] Set up posts/urls.py with router

### Week 3

- [ ] Implement Home.jsx feed container
- [ ] Implement TimelineRiverFeed component
- [ ] Implement TimelineRiverRow for post display
- [ ] Create groupPosts.js utility for clustering
- [ ] Connect to posts API

### Week 4-5

- [ ] Add real-time feed updates (stretch)
- [ ] Polish post cards and animations
- [ ] Bug fixes and testing

---

## API Endpoints

```
GET    /api/posts/           → List all posts (feed)
POST   /api/posts/           → Create new post
GET    /api/posts/:id/       → Get single post
DELETE /api/posts/:id/       → Delete post
POST   /api/posts/:id/like/  → Like a post
POST   /api/posts/:id/unlike/→ Unlike a post
```

---

## Using Pablo's Styles (Important!)

Pablo has already created a complete styling system. **You don't need to write colors, spacing, or effects from scratch.** Just import and use them.

### Step 1: Add Imports to Your SCSS File

At the **top** of any `.scss` file (like `Home.scss`), add:

```scss
@use "../../../styles/variables" as *;
@use "../../../styles/mixins" as *;
```

This gives you access to all the design system variables and mixins.

### Step 2: Use the Design System

```scss
// Example for Home.scss
@use "../../../styles/variables" as *;
@use "../../../styles/mixins" as *;

.home {
  padding: var(--space-lg); // Use spacing (24px)

  &__feed {
    display: flex;
    flex-direction: column;
    gap: var(--space-md); // Gap between posts (16px)
  }
}

.post-card {
  @include glass-card; // Glassmorphism effect (one line!)
  padding: var(--space-md);
  border-radius: var(--radius-lg);

  &__title {
    color: var(--text-primary); // Main text color
    font-size: var(--font-size-lg); // 18px
  }

  &__content {
    color: var(--text-secondary); // Muted text color
  }

  &__like-button {
    @include button-secondary; // Pre-styled button
  }
}
```

### Quick Reference

| What You Need     | What to Write                                           |
| ----------------- | ------------------------------------------------------- |
| Glass card effect | `@include glass-card;`                                  |
| Primary button    | `@include button-primary;`                              |
| Main text color   | `color: var(--text-primary);`                           |
| Muted text        | `color: var(--text-secondary);`                         |
| Padding/margin    | `var(--space-sm)`, `var(--space-md)`, `var(--space-lg)` |
| Rounded corners   | `border-radius: var(--radius-md);`                      |

### Questions?

Check `frontend/src/styles/_variables.scss` for all available variables, or ask Pablo!

---

## Notes

- Post types: 'text', 'image', 'link', 'event'
- TimelineRiver is a 3-column masonry-style layout
