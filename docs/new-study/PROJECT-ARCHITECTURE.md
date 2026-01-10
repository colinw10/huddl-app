# NUMENEON System Architecture

How this entire application works as a connected system.

---

## 1. App Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         PROVIDER LAYER                              │   │
│  │  main.jsx wraps everything:                                         │   │
│  │  AuthProvider → PostsProvider → FriendsProvider → SearchProvider    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          CONTEXT LAYER                              │   │
│  │  AuthContext    - user, login(), logout(), isAuthenticated          │   │
│  │  PostsContext   - posts[], createPost(), likePost(), deletePost()   │   │
│  │  FriendsContext - friends[], sendRequest(), acceptRequest()         │   │
│  │  SearchContext  - isSearchOpen, openSearch(), closeSearch()         │   │
│  │  MessageContext - openMessages(), unreadCount                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         SERVICE LAYER                               │   │
│  │  postsService.js   - getAll(), create(), like(), delete()           │   │
│  │  friendsService.js - getFriends(), sendRequest(), accept()          │   │
│  │  apiClient.js      - Axios instance + JWT interceptors              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        COMPONENT LAYER                              │   │
│  │                                                                     │   │
│  │  Layout: TopBar, SideNav (always visible)                           │   │
│  │                                                                     │   │
│  │  Pages:                                                             │   │
│  │    Home.jsx → TimelineRiverFeed → TimelineRiverRow → PostCard       │   │
│  │    Profile.jsx → ProfileCard, TimelineRiver, ComposerModal          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │  HTTP (Axios)
                                     │  JWT in Authorization header
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (Django)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          URL ROUTING                                │   │
│  │  /api/auth/*   → users/urls.py   → users/views.py                   │   │
│  │  /api/posts/*  → posts/urls.py   → posts/views.py                   │   │
│  │  /api/friends/*→ friends/urls.py → friends/views.py                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                           VIEWS LAYER                               │   │
│  │  PostViewSet (ModelViewSet)                                         │   │
│  │    - list(), create(), retrieve(), update(), destroy() [auto]       │   │
│  │    - @action like(), share(), replies() [custom]                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        SERIALIZERS LAYER                            │   │
│  │  PostSerializer - converts Post model ↔ JSON                        │   │
│  │  Includes: author (nested), is_liked (computed), reply_count        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          MODELS LAYER                               │   │
│  │  Post: author(FK), content, type, media_url, parent(self-FK)        │   │
│  │  Like: user(FK), post(FK), unique_together                          │   │
│  │  Friendship: user1, user2                                           │   │
│  │  FriendRequest: from_user, to_user, status                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          DATABASE (SQLite)                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow Map: Creating a Post

Complete journey from user click to database and back:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 1: USER INPUT                                                       │
│ Component: ComposerModal.jsx or Home.jsx (inline composer)               │
│                                                                          │
│   User types in <textarea>                                               │
│   onChange → setContent(e.target.value)                                  │
│   State: content = "Hello world"                                         │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 2: FORM SUBMIT                                                      │
│ Component: ComposerModal.jsx                                             │
│                                                                          │
│   User clicks "Post" button                                              │
│   onClick → handleSubmit()                                               │
│                                                                          │
│   async function handleSubmit() {                                        │
│     const result = await createPost({                                    │
│       content: content,                                                  │
│       type: 'thoughts'                                                   │
│     });                                                                  │
│   }                                                                      │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 3: CONTEXT METHOD                                                   │
│ File: PostsContext.jsx                                                   │
│                                                                          │
│   const createPost = async (content) => {                                │
│     const newPost = await postsService.create(content);                  │
│     setPosts(prev => [newPost, ...prev]);  // Add to state               │
│     return { success: true };                                            │
│   };                                                                     │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 4: SERVICE LAYER                                                    │
│ File: postsService.js                                                    │
│                                                                          │
│   create: async (data) => {                                              │
│     const response = await apiClient.post('/posts/', data);              │
│     return response.data;                                                │
│   }                                                                      │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 5: API CLIENT                                                       │
│ File: apiClient.js                                                       │
│                                                                          │
│   // Interceptor automatically adds JWT token                            │
│   config.headers.Authorization = `Bearer ${token}`;                      │
│                                                                          │
│   // Sends: POST http://localhost:8000/api/posts/                        │
│   // Body: { content: "Hello world", type: "thoughts" }                  │
│   // Headers: Authorization: Bearer eyJ...                               │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                     ═══════════════════════════════
                              NETWORK
                     ═══════════════════════════════
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 6: DJANGO URL ROUTING                                               │
│ File: numeneon/urls.py → posts/urls.py                                   │
│                                                                          │
│   path('api/posts/', include('posts.urls'))                              │
│   router.register(r'', PostViewSet)  # '' means /api/posts/              │
│                                                                          │
│   POST /api/posts/ → PostViewSet.create()                                │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 7: VIEWSET CREATE                                                   │
│ File: posts/views.py                                                     │
│                                                                          │
│   class PostViewSet(viewsets.ModelViewSet):                              │
│       serializer_class = PostSerializer                                  │
│                                                                          │
│       def perform_create(self, serializer):                              │
│           serializer.save(author=self.request.user)  # Auto-set author   │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 8: SERIALIZER VALIDATION                                            │
│ File: posts/serializers.py                                               │
│                                                                          │
│   class PostSerializer(serializers.ModelSerializer):                     │
│       class Meta:                                                        │
│           model = Post                                                   │
│           fields = ['id', 'content', 'type', 'author', ...]              │
│                                                                          │
│   # Validates data, converts JSON → model fields                         │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 9: MODEL SAVE                                                       │
│ File: posts/models.py                                                    │
│                                                                          │
│   Post.objects.create(                                                   │
│     author=user,                                                         │
│     content="Hello world",                                               │
│     type="thoughts",                                                     │
│     created_at=auto_now_add                                              │
│   )                                                                      │
│                                                                          │
│   # SQL: INSERT INTO posts_post ...                                      │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 10: RESPONSE                                                        │
│                                                                          │
│   Backend returns 201 Created with JSON:                                 │
│   {                                                                      │
│     "id": 42,                                                            │
│     "content": "Hello world",                                            │
│     "type": "thoughts",                                                  │
│     "author": { "id": 1, "username": "pablo" },                          │
│     "created_at": "2026-01-10T...",                                      │
│     "likes_count": 0,                                                    │
│     "is_liked": false                                                    │
│   }                                                                      │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                     ═══════════════════════════════
                              NETWORK
                     ═══════════════════════════════
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 11: STATE UPDATE                                                    │
│ File: PostsContext.jsx                                                   │
│                                                                          │
│   setPosts(prev => [newPost, ...prev]);                                  │
│                                                                          │
│   // posts state: [newPost, ...oldPosts]                                 │
│   // This triggers React re-render                                       │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ STEP 12: UI UPDATE                                                       │
│ Component: TimelineRiverFeed.jsx → TimelineRiverRow.jsx → PostCard.jsx   │
│                                                                          │
│   React re-renders because posts changed                                 │
│   New post appears at top of feed                                        │
│   ComposerModal closes, textarea clears                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Prop Drilling Chart

### Home Page Component Tree

```
Home.jsx
│
│  STATE OWNED:
│  - showComposer (boolean)
│  - composerText (string)
│  - activeCommentPostId (number|null)
│  - commentText (string)
│
│  CONTEXT CONSUMED:
│  - const { posts, createPost, deletePost, updatePost } = usePosts()
│  - const { friends } = useFriends()
│
├── ComposerModal
│   └── Props: { isOpen, onClose, onSubmit }
│
└── TimelineRiverFeed
    │
    │  Props received from Home:
    │  - posts
    │  - activeCommentPostId
    │  - setActiveCommentPostId
    │  - commentText
    │  - setCommentText
    │  - onDeletePost
    │  - onUpdatePost
    │
    └── TimelineRiverRow (one per user+day group)
        │
        │  Props received:
        │  - rowData (user's posts for that day)
        │  - onCommentClick
        │  - activeCommentPostId
        │  - commentText, setCommentText
        │  - onDeletePost, onUpdatePost
        │
        │  CONTEXT CONSUMED DIRECTLY:
        │  - const { likePost, sharePost, fetchReplies } = usePosts()
        │  - const { user: currentUser } = useAuth()
        │
        └── PostCard (one per post)
            │
            │  Props received:
            │  - post
            │  - type ('thoughts'|'media'|'milestones')
            │  - user
            │  - currentUser
            │  - onUserClick
            │  - onLike (calls likePost)
            │  - onShare
            │  - onComment
            │  - onDelete
            │  - onExpandMedia
            │  - expandedThreadId
            │  - threadReplies
            │  - ... (thread-related props)
            │
            └── ThreadView (if expanded)
                └── Props: { replies, onReply, onDelete }
```

---

## 4. State Ownership Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         GLOBAL STATE (Contexts)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  AuthContext (SOURCE OF TRUTH: user session)                            │
│  ├── user: { id, username, email, profile }                             │
│  ├── isAuthenticated: boolean                                           │
│  ├── isLoading: boolean                                                 │
│  └── WRITERS: login(), signup(), logout()                               │
│      READERS: App, ProtectedRoute, TopBar, PostCard, Profile           │
│                                                                         │
│  PostsContext (SOURCE OF TRUTH: all posts)                              │
│  ├── posts: Post[]                                                      │
│  ├── isLoading: boolean                                                 │
│  ├── error: string|null                                                 │
│  └── WRITERS: createPost(), updatePost(), deletePost(), likePost()      │
│      READERS: Home, TimelineRiverFeed, TimelineRiverRow, Profile       │
│                                                                         │
│  FriendsContext (SOURCE OF TRUTH: friends list)                         │
│  ├── friends: User[]                                                    │
│  ├── pendingRequests: Request[]                                         │
│  └── WRITERS: sendRequest(), acceptRequest(), removeFriend()            │
│      READERS: Home (stories), Friends page, TopBar (count)             │
│                                                                         │
│  SearchContext (SOURCE OF TRUTH: search modal)                          │
│  ├── isSearchOpen: boolean                                              │
│  └── WRITERS: openSearch(), closeSearch()                               │
│      READERS: TopBar, SearchModal                                       │
│                                                                         │
│  MessageContext (SOURCE OF TRUTH: message modal)                        │
│  ├── isOpen: boolean                                                    │
│  ├── activeConversation: User|null                                      │
│  └── WRITERS: openMessages(), closeMessages()                           │
│      READERS: TopBar, MessageModal, PostCard                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        LOCAL STATE (Components)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Home.jsx                                                               │
│  ├── showComposer: boolean (is modal open?)                             │
│  ├── composerText: string (inline input value)                          │
│  ├── activeCommentPostId: number|null (which post's comment is open)    │
│  └── commentText: string (comment input value)                          │
│                                                                         │
│  TimelineRiverRow.jsx                                                   │
│  ├── expandedThreadId: number|null (which post's replies are showing)   │
│  ├── threadReplies: { [postId]: Reply[] } (cached replies)              │
│  ├── deckIndex: { thoughts: 0, media: 0, milestones: 0 } (carousel)     │
│  ├── editingPostId: number|null (inline edit mode)                      │
│  ├── deleteModalPostId: number|null (delete confirmation)               │
│  └── isMobile: boolean (responsive state)                               │
│                                                                         │
│  PostCard.jsx                                                           │
│  ├── isHeartAnimating: boolean (like animation)                         │
│  └── showRepostModal: boolean (share options modal)                     │
│                                                                         │
│  ComposerModal.jsx                                                      │
│  ├── content: string (post text)                                        │
│  ├── postType: 'thoughts'|'media'|'milestones'                          │
│  └── isSubmitting: boolean (loading state)                              │
│                                                                         │
│  Profile.jsx                                                            │
│  ├── userData: User (fetched profile data)                              │
│  └── userPosts: Post[] (this user's posts only)                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference: Who Calls What

| Action              | Component     | Context Method                 | Service Call                 | Backend Endpoint                |
| ------------------- | ------------- | ------------------------------ | ---------------------------- | ------------------------------- |
| Login               | Login.jsx     | AuthContext.login()            | apiClient.post               | POST /api/auth/login/           |
| Create Post         | ComposerModal | PostsContext.createPost()      | postsService.create()        | POST /api/posts/                |
| Like Post           | PostCard      | PostsContext.likePost()        | postsService.like()          | POST /api/posts/{id}/like/      |
| Delete Post         | PostCard      | PostsContext.deletePost()      | postsService.delete()        | DELETE /api/posts/{id}/         |
| Load Feed           | Home          | PostsContext.fetchPosts()      | postsService.getAll()        | GET /api/posts/                 |
| View Profile        | Profile       | PostsContext.fetchByUsername() | postsService.getByUsername() | GET /api/posts/?username=x      |
| Send Friend Request | Friends       | FriendsContext.sendRequest()   | friendsService.sendRequest() | POST /api/friends/request/{id}/ |
