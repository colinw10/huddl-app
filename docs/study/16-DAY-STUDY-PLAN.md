# 🎯 16-DAY NUMENEON MASTERY PLAN

**Start:** January 4, 2026  
**Deadline:** January 20, 2026  
**Graduation:** January 24, 2026

---

## 📊 THE NUMBERS

- **Total Files in Project:** ~100 files
- **Must-Know Files:** 20 files (12 frontend + 8 backend)
- **That's only 20% of codebase!**
- **Daily Goal:** ~1.25 files/day
- **Final 4 Days:** Practice explaining flows out loud

---

## 🗓️ DAILY SCHEDULE

### WEEK 1: FRONTEND FOUNDATION

#### Day 1 (Jan 4): Entry Layer

**Files:** main.jsx, App.jsx (already completed ✅)

**Learn:**

- How React app initializes
- Provider nesting order matters
- Route definitions and protected routes

**Interview Question:** "How does your app start up?"

---

#### Day 2 (Jan 5): Infrastructure - Auth

**Files:** apiClient.js, AuthContext.jsx (already completed ✅)

**Learn:**

- Axios interceptors for JWT tokens
- How tokens get attached to requests
- Login/logout flow
- localStorage for token persistence

**Interview Question:** "How do you handle authentication?"

---

#### Day 3 (Jan 6): Infrastructure - Posts API

**Files:** postsService.js ⏳

**Learn:**

- Service layer pattern
- Async/await with API calls
- Error handling
- Same pattern as friendsService

**Interview Question:** "Walk me through your API architecture"

**Study Note:** Use this template:

```javascript
// 📁 FILE: postsService.js
// 🎯 PURPOSE: All posts-related API calls
// ⬆️ IMPORTS: apiClient from apiClient.js
// ⬇️ EXPORTS: postsService object with methods
// 🔗 CONNECTS TO: PostsContext.jsx calls these

// Study each method:
// - What it does
// - What it sends (params)
// - What it returns (response.data)
```

---

#### Day 4 (Jan 7): State Management - Posts

**Files:** PostsContext.jsx

**Learn:**

- Context API pattern
- useState for posts array
- useEffect for fetching on mount
- How contexts call services
- Optimistic updates

**Interview Question:** "How do you manage application state?"

---

#### Day 5 (Jan 8): State Management - Friends

**Files:** FriendsContext.jsx

**Learn:**

- Same pattern as PostsContext
- Managing friends + pendingRequests arrays
- How two contexts can share AuthContext

**Interview Question:** "What's your state management strategy?"

---

#### Day 6 (Jan 9): UI Flow - Home Page

**Files:** Home.jsx

**Learn:**

- How pages consume contexts
- useEffect dependencies
- Component composition

**Interview Question:** "Explain your component hierarchy"

---

#### Day 7 (Jan 10): UI Flow - Timeline Feed

**Files:** TimelineRiverFeed.jsx

**Learn:**

- How posts get grouped
- 3-column layout logic
- Mapping over posts array
- Vite path aliases in action (@assets, @contexts)

**Interview Question:** "Walk me through your main feed feature"

---

### WEEK 2: BACKEND & ADVANCED FRONTEND

#### Day 8 (Jan 11): UI Flow - Individual Posts

**Files:** TimelineRiverRow.jsx

**Learn:**

- Individual post rendering
- Like/comment/share actions
- Modular sub-components (PostCard, ThreadView, SmartDeck)
- Event handlers

**Interview Question:** "How do user interactions work?"

---

#### Day 9 (Jan 12): UI Flow - Profile Page

**Files:** Profile.jsx

**Learn:**

- Dynamic routing (/profile/:username)
- useParams hook
- Filtering posts by user
- ProfileCard component integration

**Interview Question:** "How do you handle dynamic routes?"

---

#### Day 10 (Jan 13): Post Creation

**Files:** ComposerModal.jsx

**Learn:**

- Modal patterns (createPortal)
- Form state management
- Calling context methods
- Closing modal after success

**Interview Question:** "Explain the full flow of creating a post"

---

#### Day 11 (Jan 14): Django Configuration

**Files:** settings.py, urls.py (main)

**Learn:**

- REST framework settings
- CORS configuration
- Installed apps
- URL routing to apps
- Static/media files

**Interview Question:** "How is your backend configured?"

---

#### Day 12 (Jan 15): Posts Backend - Models

**Files:** posts/models.py

**Learn:**

- Django model fields
- Relationships (ForeignKey, ManyToMany)
- Post types (thoughts, media, milestones)
- Engagement metrics (likes_count, reply_count)

**Interview Question:** "Describe your database schema"

---

#### Day 13 (Jan 16): Posts Backend - Serializers & Views

**Files:** posts/serializers.py, posts/views.py

**Learn:**

- Model ↔ JSON conversion
- Nested serializers (author data)
- ViewSet CRUD operations
- Custom actions (@action decorator)
- Permissions

**Interview Question:** "How do your API endpoints work?"

---

#### Day 14 (Jan 17): Auth Backend

**Files:** users/views.py

**Learn:**

- JWT token generation
- User signup flow
- Login validation
- Password hashing (Django handles it)

**Interview Question:** "Walk me through user authentication"

---

#### Day 15 (Jan 18): Friends Backend

**Files:** posts/urls.py, friends/models.py

**Learn:**

- URL → ViewSet routing
- Router registration
- Friendship model patterns
- FriendRequest workflow

**Interview Question:** "Explain the friends system"

---

#### Day 16 (Jan 19): Integration Review

**No new files - Review everything**

**Activities:**

1. Re-read MustKnow.txt
2. Look at file connections diagram
3. Identify any gaps
4. Review confusing sections

---

### FINAL STRETCH: FLOW PRACTICE

#### Day 17 (Jan 20): Practice Day 1

**Flow:** Creating a Post

**Trace these files in order:**

1. ComposerModal.jsx (user clicks "Post")
2. PostsContext.jsx (createPost function)
3. postsService.js (create method)
4. apiClient.js (axios POST request)
5. Backend urls.py → views.py (PostViewSet.create)
6. Back to PostsContext (state updates)
7. TimelineRiverFeed re-renders

**Practice:** Explain this out loud WITHOUT looking at code

---

#### Days 18-19: Practice More Flows

**Suggested flows:**

- User Login (Login.jsx → AuthContext → Backend → Token storage)
- Loading Feed (Home.jsx → PostsContext → Backend → Display)
- Liking a Post (TimelineRiverRow → PostsContext → Backend → Update)
- User Profile (Profile.jsx → FriendsContext → Backend → Display)

---

#### Day 20 (Jan 23): Mock Interview

**Practice answering:**

1. "Walk me through your architecture"
2. "How does authentication work?"
3. "Explain how a post gets created"
4. "What technologies did you use and why?"
5. "What was the most challenging part?"
6. "How would you scale this?"

---

## 🎤 INTERVIEW PREP CHEAT SHEET

### Opening Statement

```
"NUMENEON is a cyberpunk-themed social media platform I built for
my capstone. It's a full-stack React and Django application with
JWT authentication, real-time features, and a modular component
architecture. I focused on clean separation of concerns - Context
API for state, service layer for API calls, and reusable UI components."
```

### Architecture Overview

```
"The frontend uses React 18 with Vite for building. I chose Context
API over Redux because it's simpler for our scale. Three main contexts
manage auth, posts, and friends. Each context uses a service layer
that wraps Axios for API calls. The backend is Django REST Framework
with three apps: users for auth, posts for content, friends for
relationships. JWT tokens handle authentication."
```

### Key Technical Decisions

**Q: Why Vite over Create React App?**

```
"Faster dev server, better HMR, built-in support for path aliases.
I configured @assets, @components, @contexts aliases to keep imports
clean and prevent broken paths during refactoring."
```

**Q: Why Context API?**

```
"Three clear state domains with minimal overlap. Context API provides
what we need without Redux boilerplate. If we needed time-travel
debugging or complex middleware, I'd reconsider."
```

**Q: Why separate service layer?**

```
"Keeps API logic out of components. If endpoints change, I update
one service file instead of many components. Also makes testing easier."
```

### Challenging Problems Solved

**Problem 1: Token Refresh**

```
"Implemented Axios interceptors in apiClient.js. When a request fails
with 401, the interceptor attempts token refresh before retrying the
original request. Prevents user from being logged out unexpectedly."
```

**Problem 2: Optimistic Updates**

```
"When user likes a post, I immediately update the UI before backend
responds. If request fails, I revert the change. Makes the app feel
instant while staying in sync with backend."
```

**Problem 3: Component Reusability**

```
"TimelineRiverRow works on both Home feed and Profile pages. Uses
same component with different data source. ProfileCard has modular
subcomponents (ActivityVisualization, PostTypeBreakdown) that could
be reused elsewhere."
```

---

## ✅ COMPLETION CHECKLIST

### Week 1 (Days 1-7)

- [ ] Day 1: main.jsx, App.jsx
- [ ] Day 2: apiClient.js, AuthContext.jsx
- [ ] Day 3: postsService.js
- [ ] Day 4: PostsContext.jsx
- [ ] Day 5: FriendsContext.jsx
- [ ] Day 6: Home.jsx
- [ ] Day 7: TimelineRiverFeed.jsx

### Week 2 (Days 8-14)

- [ ] Day 8: TimelineRiverRow.jsx
- [ ] Day 9: Profile.jsx
- [ ] Day 10: ComposerModal.jsx
- [ ] Day 11: settings.py, urls.py
- [ ] Day 12: posts/models.py
- [ ] Day 13: posts/serializers.py, posts/views.py
- [ ] Day 14: users/views.py

### Week 3 (Days 15-20)

- [ ] Day 15: posts/urls.py, friends/models.py
- [ ] Day 16: Integration review
- [ ] Day 17: Practice "Creating a Post" flow
- [ ] Day 18: Practice "User Login" flow
- [ ] Day 19: Practice "Loading Feed" flow
- [ ] Day 20: Mock interview with a friend

---

## 🚨 IF YOU'RE RUNNING SHORT ON TIME

### Priority 1 (Absolute Must-Know - 10 files)

1. apiClient.js (how frontend talks to backend)
2. AuthContext.jsx (authentication)
3. PostsContext.jsx (state management)
4. postsService.js (API calls)
5. Home.jsx (main UI)
6. TimelineRiverFeed.jsx (displaying posts)
7. settings.py (Django config)
8. posts/models.py (database)
9. posts/views.py (API endpoints)
10. posts/serializers.py (JSON conversion)

### Priority 2 (Important - 5 files)

11. App.jsx (routing)
12. main.jsx (app entry)
13. Profile.jsx (profile page)
14. ComposerModal.jsx (creating posts)
15. users/views.py (auth endpoints)

### Priority 3 (Nice to Know - 5 files)

16. FriendsContext.jsx
17. TimelineRiverRow.jsx
18. urls.py (main)
19. posts/urls.py
20. friends/models.py

---

## 💪 YOU GOT THIS!

**Remember:**

- You BUILT this entire frontend
- You already KNOW the patterns
- This is just organizing knowledge you have
- Focus on explaining, not memorizing
- 20 files out of 100+ = totally doable!

**Graduation is in 20 days. You've come so far. Finish strong! 🚀**
