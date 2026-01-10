# NUMENEON Project Context Prompt

Copy and paste this entire prompt to restore full context in a new conversation.

---

## Who I Am

I'm Pablo, a 45-year-old career changer graduating from General Assembly's Software Engineering Immersive bootcamp on **February 4th, 2026**. I'm UI Lead/Co-Lead on my capstone project NUMENEON. I have about **2 weeks to rebuild and submit the project**.

Background: 3rd-degree black belt in Okinawan Goju Ryu karate, former professional realist artist, synesthesia (influences my visual-spatial approach to design). I use AI tools for implementation, then study the codebase to understand it for interviews.

---

## The Project: NUMENEON

A cyberpunk-themed social media platform built with **Django REST Framework (backend)** and **React + Vite (frontend)** with JWT authentication.

### Unique Feature: River Timeline
A 3-column feed layout where:
- **Left column:** 'thoughts' posts (text-only)
- **Center column:** 'media' posts (with images)
- **Right column:** 'milestones' posts (achievements)

Posts are grouped by user + date into "rows" - each user gets their own horizontal lane in the feed.

---

## Team Structure

| Name | Role | Task Size | Responsibilities |
|------|------|-----------|------------------|
| **Colin** | Repo Czar / Backend Lead | M | Posts system (models, views, serializers, PostsContext, postsService) |
| **Natalia** | Auth + Migrations | L | User/Profile models, auth endpoints, AuthContext, Login/Signup pages, ProtectedRoute, ALL database migrations |
| **Crystal** | Friends System | M | Friendship model, friends API, FriendsContext, Friends page UI |
| **Tito** | Infrastructure | S | apiClient.js (axios + JWT), ThemeContext, ThemeToggle, main.jsx (provider wrapping) |
| **Pablo (me)** | UI Lead | XL | All UI components, design system, App.jsx, routing, rebuilding JSX from pseudocode |

---

## Git Workflow (Finalized)

Colin's repo has both `main` and `dev` branches. The team workflow:

1. Colin creates `dev` branch from main (already has my shell architecture merged)
2. Everyone clones Colin's repo
3. `git checkout dev`
4. `git checkout -b my-feature` (branch off dev)
5. Do work, commit
6. `git push origin my-feature`
7. Open PR from feature branch to Colin's `dev`
8. Colin reviews and merges
9. When sprint done, Colin merges `dev` → `main`

**Before starting next feature:**
```
git checkout dev
git pull origin dev
```
This syncs local dev with Colin's dev (which now has everyone's merged work).

**Key points:**
- Never work directly in `dev` - it's just for syncing and branching
- Feature branches keep everyone's work separate
- Colin merges one PR at a time, handles conflicts during merge
- Local `dev` must be synced before creating new feature branches

---

## Project Architecture

### Frontend Structure
```
frontend/src/
├── main.jsx                    # Entry point, wraps all providers
├── App.jsx                     # Routes + layout
├── contexts/
│   ├── AuthContext.jsx         # Natalia
│   ├── PostsContext.jsx        # Colin
│   ├── FriendsContext.jsx      # Crystal
│   ├── ThemeContext.jsx        # Tito
│   └── MessageContext.jsx      # Pablo
├── services/
│   ├── apiClient.js            # Tito - axios + JWT interceptors
│   ├── authService.js          # Natalia
│   ├── postsService.js         # Colin
│   └── friendsService.js       # Crystal
└── components/
    ├── layout/
    │   ├── TopBar/
    │   └── SideNav/
    └── pages/
        ├── Home/
        │   └── components/
        │       ├── TimelineRiverFeed/
        │       └── TimelineRiverRow/
        │           └── components/
        │               ├── PostCard/
        │               ├── SmartDeck/
        │               ├── ThreadView/
        │               └── RepostModal/
        ├── Profile/
        │   └── components/
        │       ├── ProfileCard/
        │       ├── TimelineRiver/
        │       └── ComposerModal/
        ├── Friends/            # Crystal
        ├── Login/              # Natalia
        ├── Signup/             # Natalia
        └── Landing/
```

### Backend Structure
```
backend/
├── numeneon/
│   ├── settings.py
│   └── urls.py
├── users/                      # Natalia
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── posts/                      # Colin
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
└── friends/                    # Crystal
    ├── models.py
    ├── views.py
    ├── serializers.py
    └── urls.py
```

---

## Post Data Format (Critical for Colin)

Pablo's UI expects this exact format:
```javascript
{
  id: number,
  author: {
    id: number,
    username: string,
    profile_picture: string
  },
  type: 'thoughts' | 'media' | 'milestones',
  content: string,
  media_url: string | null,     // NOT 'image'!
  parent: number | null,
  parent_id: number | null,
  created_at: "ISO timestamp",
  likes_count: number,
  reply_count: number,          // NOT 'comment_count'!
  shares_count: number,
  is_liked: boolean
}
```

---

## Vite Path Aliases (Configured by Pablo)

```javascript
'@': './src'
'@components': './src/components'
'@contexts': './src/contexts'
'@services': './src/services'
'@assets': './src/assets'
'@styles': './src/styles'
'@layout': './src/components/layout'
'@pages': './src/components/pages'
'@ui': './src/components/ui'
```

---

## Provider Nesting Order (main.jsx)

```jsx
<ThemeProvider>        {/* Tito - outermost */}
  <AuthProvider>       {/* Natalia */}
    <PostsProvider>    {/* Colin */}
      <FriendsProvider> {/* Crystal */}
        <MessageProvider> {/* Pablo */}
          <App />
        </MessageProvider>
      </FriendsProvider>
    </PostsProvider>
  </AuthProvider>
</ThemeProvider>
```

---

## My Study Plan

18 must-know files over 2 weeks:
- **Week 1:** Frontend (main.jsx, App.jsx, apiClient, contexts, services, Home, TimelineRiverFeed, TimelineRiverRow, PostCard, Profile, ComposerModal)
- **Week 2:** Backend (settings.py, urls.py, posts/models, posts/views, posts/serializers, users/views) + review

---

## Current Status

- Backend and frontend shell architectures are done
- PRs merged to Colin's main
- Colin creating `dev` branch (can do from GitHub UI)
- Team ready to fork/clone and start feature branches
- I need to rebuild my JSX from pseudocode (same as team, for legitimate git history)
- Also studying my own codebase for technical interviews

---

## What I Need Help With

This chat is primarily for:
1. **Git flow questions** - coordinating team, explaining commands, troubleshooting
2. **Team coordination** - helping me communicate with teammates
3. **Studying my codebase** - understanding what AI helped me build
4. **Interview prep** - explaining architectural decisions

---

## Communication Style

Be direct. Explain things step by step when I ask. Don't overcomplicate. If I curse, it's frustration - just cut through the confusion and give me clarity.

---