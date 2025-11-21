# 📘 HUDDL — Team Project README

### _(team-shell branch)_

This branch contains the **clean starter shell** for building HUDDL as a team.  
It includes the _basic folder structure_ and _placeholder components only_ so that functionality and backend work can begin **without depending on the final UI**.

The full UI will be merged later from Pablo's protected branch.

---

# 🚀 Project Overview

HUDDL is a social app with:

- User authentication
- Text + media posting
- A user timeline
- A friends feed
- Profile pages
- Analytics
- Top + bottom navigation
- Django backend API + React frontend

---

# 👥 Team Roles & Responsibilities

## 🧩 Pablo — UI Lead (Protected Branch)

**Will Do**

- Build final production UI in a private branch (`pablo-ui-architect`)
- Maintain all styling, layout, components, and animations
- Merge UI into team build at the final stage

**Protected Areas**

```
frontend/src/components/layout/
frontend/src/components/pages/Profile/
frontend/src/styles/
```

---

## 🧠 Colin — Backend + API Integration Lead

**Will Do**

- Create and maintain Django backend
- Define models, serializers, views
- Build and document REST API endpoints
- Handle user auth and tokens

**Safe Areas**

```
backend/
frontend/src/services/
frontend/src/utils/
```

---

## 🔧 Tito — State Management & Frontend Logic

**Will Do**

- Build logic for posting, media handling
- Feed fetching and timeline logic
- Global state management (Context or Zustand)
- Form handlers & error states

---

## 📱 Crystal — Friends Page & Feed Sync

**Will Do**

- Build Friends Feed page
- Implement friend post fetching
- Sync friend posts with main timeline

---

## 🎨 Natalia — Forms, Routing, and Auth UX

**Will Do**

- Login + Signup logic
- Client-side validation
- Protected route system
- Routing flow with React Router

---

# 🌳 Folder Structure (team-shell branch)

```
huddl-app/
│
├── backend/
│   ├── manage.py
│   ├── huddl/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── api/
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── urls.py
│       └── tests.py
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── services/
    │   ├── utils/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── TopBar.jsx
    │   │   │   └── BottomNav.jsx
    │   │   └── pages/
    │   │       ├── Home.jsx
    │   │       ├── Profile.jsx
    │   │       ├── Friends.jsx
    │   │       ├── Login.jsx
    │   │       └── Signup.jsx
    │   └── styles/
    │       └── App.css
```

---

# 🔧 Safe Files for Everyone

```
services/
utils/
backend/
frontend logic inside handlers
App.jsx routing
```

---

# 🔒 Protected Files — Pablo Only

```
All CSS
Component structure (.jsx layouts)
Animations
Profile UI
Blobs, gradients, and theme effects
```

---

# 🔄 Branch Relationship

- **team-shell** → team builds backend + logic
- **pablo-ui-architect** → Pablo builds final UI
- **Final merge** → Combine logic with UI

---

# 🧭 Workflow

1. Checkout team-shell
2. Create your own feature branch
3. Work ONLY inside your assigned files
4. Push PRs into team-shell
5. UI merges in at the end

---

# 🎯 Summary

- Team builds logic
- Pablo builds UI
- No one overwrites the UI
- Merge at the end
- Clean, professional workflow
