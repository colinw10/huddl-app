# Colin - Frontend Tasks

> **Your Role:** ~20% of frontend work (6 files, ~978 lines)

---

## 📁 YOUR FILES

| File | Lines |
|------|-------|
| `components/pages/Profile/components/TimelineRiver/TimelineRiver.jsx` | 477 |
| `components/pages/Login/Login.jsx` | 198 |
| `components/pages/Home/components/MediaLightbox/MediaLightbox.jsx` | 162 |
| `components/layout/Shell/Shell.jsx` | 71 |
| `components/ui/ProtectedRoute.jsx` | 40 |
| `components/pages/NotFound/NotFound.jsx` | 30 |

---

## Task 1: TimelineRiver.jsx

Scrollable timeline showing user's posts in chronological order.

**Requirements:**
- Fetch user's posts from API
- Display posts as cards in a vertical river/feed
- Handle loading and empty states
- Add scroll-based animations

**Example pattern:**
```jsx
const TimelineRiver = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch posts for userId
  }, [userId]);

  return (
    <div className="timeline-river">
      {/* TODO: Map through posts */}
    </div>
  );
};
```

---

## Task 2: Login.jsx

Login form with email/password authentication.

**Requirements:**
- Controlled form inputs
- Form validation
- Call login API endpoint
- Store tokens and redirect on success
- Show error messages

**Example pattern:**
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  // TODO: Call API, handle response
};
```

---

## Task 3: MediaLightbox.jsx

Modal to display images/media in fullscreen.

**Requirements:**
- Overlay with dark background
- Display image at full size
- Close on click outside or escape key
- Navigation arrows if multiple images

---

## Task 4: Shell.jsx

Main layout wrapper for authenticated pages.

**Requirements:**
- Include SideNav, TopBar
- Main content area with proper spacing
- Handle responsive behavior

---

## Task 5: ProtectedRoute.jsx

Route wrapper that redirects unauthenticated users.

**Requirements:**
- Check auth state from context
- Redirect to login if not authenticated
- Show loading while checking auth

---

## Task 6: NotFound.jsx

404 page for invalid routes.

**Requirements:**
- Friendly message
- Link back to home

---

## Testing

```bash
cd frontend && npm run dev
```

---

## 🎨 STYLING YOUR COMPONENTS

Each JSX file has a matching `.scss` file. Your SCSS files:
- `TimelineRiver.scss`
- `Login.scss`
- `MediaLightbox.scss` (+ partials in `/styles/`)
- `Shell.scss`
- `NotFound.scss`

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
// TODO: @use '../../../styles/variables' as *;
// TODO: @use '../../../styles/mixins' as *;

.login-form {
  // TODO: @include glass-card;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // TODO: padding: $spacing-lg;
  // TODO: background: $glass-bg;
}
```

**You change it to:**
```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

.login-form {
  @include glass-card;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: $spacing-lg;
  background: $glass-bg;
}
```

### Tips
- Check `_variables.scss` to see available variables (`$spacing-md`, `$glass-bg`, etc.)
- Check `_mixins.scss` to see available mixins (`@include glass-card`, etc.)
- The path `../../../styles/` may vary — count your folder depth
