# Crystal - Frontend Tasks

> **Your Role:** ~20% of frontend work (6 files, ~995 lines)

---

## 📁 YOUR FILES

| File | Lines |
|------|-------|
| `components/pages/Friends/Friends.jsx` | 228 |
| `components/pages/Signup/Signup.jsx` | 227 |
| `components/pages/Profile/components/ProfileCard/ProfileCard.jsx` | 168 |
| `components/layout/TopBar/MessageModal/MessageModal.jsx` | 154 |
| `components/pages/Profile/components/ComposerModal/ComposerModal.jsx` | 147 |
| `components/pages/Profile/components/ProfileCard/components/PostTypeBreakdown/PostTypeBreakdown.jsx` | 71 |

---

## Task 1: Friends.jsx

Friends list page with friend management.

**Requirements:**
- Fetch and display friends list
- Show friend requests (pending)
- Accept/reject request actions
- Add friend search
- Handle loading/empty states

**Example pattern:**
```jsx
const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  const handleAccept = async (requestId) => {
    // TODO: Call API to accept request
  };

  return (
    <div className="friends-page">
      {/* TODO: Render friends and requests */}
    </div>
  );
};
```

---

## Task 2: Signup.jsx

Signup form for new user registration.

**Requirements:**
- Controlled form inputs (username, email, password)
- Form validation
- Call signup API endpoint
- Handle errors
- Redirect to login on success

---

## Task 3: ProfileCard.jsx

Flippable profile card container.

**Requirements:**
- Handle flip animation state
- Render ProfileCardFront and ProfileCardBack
- Pass data to child components

---

## Task 4: MessageModal.jsx (TopBar)

Messaging modal accessed from TopBar.

**Requirements:**
- Show conversations list
- Message thread view
- Send new messages

---

## Task 5: ComposerModal.jsx

Modal for creating new posts.

**Requirements:**
- Post type selector (text, image, mood, activity)
- Content textarea
- Image upload option
- Submit to API

---

## Task 6: PostTypeBreakdown.jsx

Visual breakdown of post types on profile.

**Requirements:**
- Show percentage/count per post type
- Simple chart or visual display

---

## Testing

```bash
cd frontend && npm run dev
```

---

## 🎨 STYLING YOUR COMPONENTS

Each JSX file has a matching `.scss` file. Your SCSS files:
- `Friends.scss`
- `Signup.scss`
- `ProfileCard.scss`
- `MessageModal.scss` (in `/TopBar/`)
- `ComposerModal.scss`
- `PostTypeBreakdown.scss`

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

.signup-form {
  // TODO: @include glass-card;
  display: flex;
  flex-direction: column;
  // TODO: gap: $spacing-md;
  // TODO: background: $glass-bg;
  
  .submit-btn {
    // TODO: @include primary-button;
  }
}
```

**You change it to:**
```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;

.signup-form {
  @include glass-card;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  background: $glass-bg;
  
  .submit-btn {
    @include primary-button;
  }
}
```

### Tips
- Check `_variables.scss` to see available variables (`$spacing-md`, `$glass-bg`, etc.)
- Check `_mixins.scss` to see available mixins (`@include glass-card`, etc.)
- The path `../../../styles/` may vary — count your folder depth
