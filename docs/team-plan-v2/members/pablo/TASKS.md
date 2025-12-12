# Pablo - Frontend Tasks

> **Your Role:** ~21% of frontend work (1 file, ~1034 lines)

---

## 📁 YOUR FILES

| File | Lines |
|------|-------|
| `components/pages/Home/components/TimelineRiverRow/TimelineRiverRow.jsx` | 1034 |

---

## Task 1: TimelineRiverRow.jsx

Individual post row in the timeline feed. The most complex component.

**Requirements:**
- Display post content based on type (text, image, mood, activity)
- Author info (avatar, username)
- Timestamp formatting
- Like/comment interactions
- Edit/delete for own posts
- Image gallery for image posts
- Expandable content for long posts
- Comment thread view
- Reply functionality
- Responsive design

**Example pattern:**
```jsx
const TimelineRiverRow = ({ post, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  const isOwner = user?.id === post.author.id;

  return (
    <article className="timeline-row">
      {/* TODO: Post header with author info */}
      {/* TODO: Post content by type */}
      {/* TODO: Post actions (like, comment, share) */}
      {/* TODO: Comments section */}
    </article>
  );
};
```

---

## Testing

```bash
cd frontend && npm run dev
```

---

## 🎨 STYLING YOUR COMPONENTS

Each JSX file has a matching `.scss` file. Your SCSS files:
- `TimelineRiverRow.scss`
- `TimelineRiverRow/styles/` (partials: `_base.scss`, `_post-card.scss`, `_composer.scss`, etc.)

### How It Works

The **structure and layout CSS is already written**. You just plug in the global design system.

**Global styles location:** `frontend/src/styles/`
- `_variables.scss` - colors, spacing, fonts
- `_mixins.scss` - reusable patterns
- `_glass.scss` - glassmorphism effects
- `_buttons.scss` - button styles
- `_cards.scss` - card styles

### Example

**You'll see this (TODOs):**
```scss
// TODO: @use '../../../../styles/variables' as *;
// TODO: @use '../../../../styles/mixins' as *;

.timeline-row {
  // TODO: @include glass-card;
  display: flex;
  flex-direction: column;
  // TODO: padding: $spacing-md;
  // TODO: background: $glass-bg;
  
  .post-content {
    // TODO: color: $text-primary;
  }
}
```

**You change it to:**
```scss
@use '../../../../styles/variables' as *;
@use '../../../../styles/mixins' as *;

.timeline-row {
  @include glass-card;
  display: flex;
  flex-direction: column;
  padding: $spacing-md;
  background: $glass-bg;
  
  .post-content {
    color: $text-primary;
  }
}
```

### Tips
- Check `_variables.scss` to see available variables (`$spacing-md`, `$glass-bg`, etc.)
- Check `_mixins.scss` to see available mixins (`@include glass-card`, etc.)
- The path `../../../../styles/` may vary — count your folder depth
