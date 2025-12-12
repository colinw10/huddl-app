# Tito - Frontend Tasks

> **Your Role:** ~18% of frontend work (7 files, ~867 lines)

---

## 📁 YOUR FILES

| File | Lines |
|------|-------|
| `components/pages/Home/Home.jsx` | 216 |
| `components/pages/Profile/Profile.jsx` | 139 |
| `components/pages/About/About.jsx` | 132 |
| `components/pages/Landing/Landing.jsx` | 112 |
| `components/ui/ThemeToggle/ThemeToggle.jsx` | 93 |
| `components/layout/TopBar/TopBar.jsx` | 92 |
| `components/pages/Home/components/TimelineRiverFeed/TimelineRiverFeed.jsx` | 83 |

---

## Task 1: Home.jsx

Main home/feed page.

**Requirements:**
- Fetch all posts from API
- Render TimelineRiverFeed with posts
- Handle loading state
- Pull to refresh

**Example pattern:**
```jsx
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch posts
  }, []);

  return (
    <div className="home-page">
      {/* TODO: Render feed */}
    </div>
  );
};
```

---

## Task 2: Profile.jsx

User profile page container.

**Requirements:**
- Fetch user data
- Render ProfileCard
- Render TimelineRiver with user's posts
- Handle own profile vs other user's profile

---

## Task 3: About.jsx

About page with app info.

**Requirements:**
- App description
- Team credits
- Links to socials/repo

---

## Task 4: Landing.jsx

Landing page for unauthenticated users.

**Requirements:**
- Hero section
- Call-to-action buttons (Login, Signup)
- Feature highlights

---

## Task 5: ThemeToggle.jsx

Toggle button for dark/light mode.

**Requirements:**
- Read theme from localStorage/context
- Toggle theme on click
- Update localStorage and document theme

---

## Task 6: TopBar.jsx

Top navigation bar.

**Requirements:**
- App logo/title
- Message icon (opens MessageModal)
- User avatar/menu

---

## Task 7: TimelineRiverFeed.jsx

Feed component that renders list of posts.

**Requirements:**
- Accept posts array as prop
- Map and render TimelineRiverRow for each post
- Handle empty state

---

## Testing

```bash
cd frontend && npm run dev
```

---

## 🎨 STYLING YOUR COMPONENTS

Each JSX file has a matching `.scss` file. Your SCSS files:
- `Home.scss`
- `Profile.scss`
- `Landing.scss`
- `About.scss`
- `ThemeToggle.scss`
- `TopBar.scss`
- `TimelineRiverFeed.scss`

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

.home-page {
  display: flex;
  flex-direction: column;
  // TODO: padding: $spacing-lg;
  // TODO: background: $page-bg;
  
  .feed-container {
    // TODO: @include glass-card;
    // TODO: gap: $spacing-md;
  }
}
```

**You change it to:**
```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

.home-page {
  display: flex;
  flex-direction: column;
  padding: $spacing-lg;
  background: $page-bg;
  
  .feed-container {
    @include glass-card;
    gap: $spacing-md;
  }
}
```

### Tips
- Check `_variables.scss` to see available variables (`$spacing-md`, `$glass-bg`, etc.)
- Check `_mixins.scss` to see available mixins (`@include glass-card`, etc.)
- The path `../../../styles/` may vary — count your folder depth
