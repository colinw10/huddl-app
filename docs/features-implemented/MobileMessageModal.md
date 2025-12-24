# Mobile MessageModal Improvements

## Overview

The MessageModal has been enhanced for mobile devices with a panel-toggling system, back navigation, and full viewport coverage to properly overlay the bottom navbar.

## Features

### Mobile View State

A `mobileView` state with two values controls which panel is visible:
- `'list'` - Shows conversation list
- `'chat'` - Shows active chat

```jsx
const [mobileView, setMobileView] = useState('list');
```

### Back Button Navigation

On mobile, a back arrow appears in the chat header to return to the conversation list:

```jsx
<button 
  className="chat-back-btn"
  onClick={() => setMobileView('list')}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
</button>
```

### Conversation Search/Filter

Users can search conversations by:
- Display name
- Username
- Message content

```jsx
const filteredConversations = conversations.filter((conv) => {
  if (!searchQuery.trim()) return true;
  
  const query = searchQuery.toLowerCase();
  if (conv.user.displayName?.toLowerCase().includes(query)) return true;
  if (conv.user.username?.toLowerCase().includes(query)) return true;
  
  const hasMatchingMessage = conv.messages?.some(msg => 
    msg.text?.toLowerCase().includes(query)
  );
  return hasMatchingMessage;
});
```

### Full Viewport Coverage

The overlay now uses `z-index: 9999` to ensure it covers the bottom navbar on mobile:

```scss
@media (max-width: 768px) {
  .message-modal-overlay {
    z-index: 9999 !important;
    padding: 0 !important;
  }

  .message-modal {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
}
```

## Implementation Details

### File Locations

| File | Description |
| ---- | ----------- |
| `MessageModal.jsx` | React component with mobile state logic |
| `styles/_responsive.scss` | Mobile-specific CSS including back button |
| `styles/_light-mode.scss` | Light mode styles for back button |

### CSS Classes

- `.message-conversations.show` - Visible conversation list
- `.message-chat.hide` - Hidden chat panel
- `.chat-back-btn` - Back arrow button (hidden on desktop)

### State Flow

1. Modal opens → `mobileView` defaults to `'list'`
2. User clicks conversation → `setMobileView('chat')` + `selectConversation(id)`
3. User clicks back button → `setMobileView('list')`

## Responsive Breakpoints

| Width | Behavior |
| ----- | -------- |
| > 768px | Desktop: side-by-side panels |
| ≤ 768px | Mobile: single panel with toggle |

## Light Mode

The back button has light mode styles for proper visibility:

```scss
[data-theme="light"] {
  .chat-back-btn {
    background: transparent !important;
    border: none !important;
    color: rgba(0, 0, 0, 0.6) !important;
    
    &:hover {
      color: rgba(0, 0, 0, 0.8) !important;
    }
  }
}
```

## Related Features

- [MessagingSystem.md](./MessagingSystem.md) - Core messaging architecture
- [UnifiedCloseButton.md](./UnifiedCloseButton.md) - Close button styling
