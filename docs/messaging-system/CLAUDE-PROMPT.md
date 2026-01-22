# Claude Prompt: Help Me Wire Up the Messaging System

Copy and paste this to Claude when you're ready to implement:

---

## PROMPT START

I need your help connecting my messaging backend API to my React frontend. **Read this entire prompt carefully before doing anything.**

---

### PROJECT STRUCTURE

```
frontend/
  src/
    contexts/
      index.js           ← Barrel export for all contexts
      MessageContext.jsx ← HAS MOCK DATA - needs to be updated
      AuthContext.jsx    ← Already exists, provides useAuth()
    services/
      apiClient.js       ← Axios instance with JWT auth
      postsService.js    ← Example service pattern
      friendsService.js  ← Example service pattern
      (messagesService.js) ← DOES NOT EXIST YET - need to create

backend/
  messages_app/
    models.py       ← Message model (done)
    views.py        ← API endpoints (done)
    serializers.py  ← JSON conversion (done)
    urls.py         ← Routes (done)
```

---

### IMPORT ALIASES (vite.config.js)

My project uses these aliases. USE THEM in imports:
- `@contexts` → `./src/contexts`
- `@services` → `./src/services`
- `@components` → `./src/components`
- `@assets` → `./src/assets`

Example imports:
```javascript
import { useAuth } from '@contexts';           // NOT './AuthContext'
import messagesService from '@services/messagesService';
```

---

### CONTEXTS BARREL EXPORT (contexts/index.js)

Current exports:
```javascript
export { AuthProvider, useAuth } from "./AuthContext";
export { ThemeProvider, useTheme } from "./ThemeContext";
export { MessageProvider, useMessages } from "./MessageContext";  // ← This one needs updating
export { PostsProvider, usePosts } from "./PostsContext";
export { FriendsProvider, useFriends } from "./FriendsContext";
export { SearchProvider, useSearch } from "./SearchContext";
export { SideNavProvider, useSideNav } from "./SideNavContext";
```

**DO NOT change index.js** — the exports `MessageProvider` and `useMessages` stay the same. Only the internals of `MessageContext.jsx` change.

---

### INSTRUCTIONAL FILES

I have step-by-step files in `docs/messaging-system/`:

1. `STEP-1-DATA-SHAPES.md` — **READ THIS FIRST** — Shows mock data vs API data differences
2. `STEP-2-CREATE-SERVICE.md` — Code for `messagesService.js` to create
3. `STEP-3-UPDATE-CONTEXT.md` — How to update `MessageContext.jsx`
4. `STEP-4-UPDATE-COMPONENTS.md` — How to fix components after data shape changes
5. `STEP-5-CREATE-TEST-DATA.md` — How to create test messages in Django admin
6. `STEP-6-TEST-FRONTEND.md` — How to test everything

---

### WHAT I NEED YOU TO DO

1. **Read `STEP-1-DATA-SHAPES.md`** first — understand what will break
2. **Help me create `messagesService.js`** in `frontend/src/services/`
3. **Help me update `MessageContext.jsx`** — remove mock data, add API calls
4. **Tell me what imports to add/remove** — be explicit about every change
5. **Warn me about component breakage** — tell me what properties changed
6. **Go step by step** — don't do everything at once

---

### CRITICAL RULES

- **DO NOT** change `contexts/index.js` — exports stay the same
- **DO** use `@services` and `@contexts` aliases in imports
- **DO** use `useAuth()` to get the current user (for comparing sender IDs)
- **DO** keep the same export names: `MessageProvider`, `useMessages`
- **DO** tell me exactly what lines to delete before adding new code

---

### START HERE

Read `STEP-1-DATA-SHAPES.md` and explain to me:
1. What properties in my mock data won't exist in API data?
2. What properties in API data are named differently?
3. Which components might break and why?

Then we'll move to Step 2.

---

## PROMPT END

---

## Tips for Using This Prompt

- Make sure Claude has access to your workspace/files
- If Claude can't read the files, paste the content of each step file when needed
- Go step by step — don't rush to the end
- Test after each major change before moving to the next step
- If something breaks, share the error with Claude
