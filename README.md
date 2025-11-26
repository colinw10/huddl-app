# HUDDL Team Project

**Due:** January 24, 2026  
**Branch:** `team-shell`

> **Note:** Hey, Equipo. These are suggested tasks and assignments. If anyone wants to swap roles, take on different work, or has ideas to improve the workflow, let's discuss it! I'm also willing to help anyone in any area if necessary, so... feel free.

---

## Quick Start

```bash
# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
# → http://localhost:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Team Roles

| Person      | Role              | Main Files                                                        |
| ----------- | ----------------- | ----------------------------------------------------------------- |
| **Colin**   | Posts API         | `backend/posts/`, connects to Home feed                           |
| **Natalia** | Auth & Users      | `backend/users/`, `frontend/src/services/authService.js`          |
| **Crystal** | Friends System    | `backend/friends/`, `frontend/src/components/pages/Friends/`      |
| **Tito**    | Infrastructure    | `backend/huddl/settings.py`, `frontend/src/services/apiClient.js` |
| **Pablo**   | Full-stack + Lead | Backend auth, frontend architecture, integration                  |

---

## Week 1 Tasks (This Week)

| Person      | Task                                       | File to Create/Edit          |
| ----------- | ------------------------------------------ | ---------------------------- |
| **Tito**    | CORS config (with Pablo)                   | `backend/huddl/settings.py`  |
| **Pablo**   | JWT auth setup + help Tito                 | `backend/huddl/settings.py`  |
| **Colin**   | Register Post in admin + start serializer  | `backend/posts/admin.py`     |
| **Natalia** | Register Profile in admin + auth views     | `backend/users/admin.py`     |
| **Crystal** | Create Friendship model                    | `backend/friends/models.py`  |

**⚠️ Tito + Pablo go first!** Without CORS, frontend can't reach backend.

**Need help?** Slack Pablo — happy to pair on backend or frontend stuff.

---

## Current Project Tree

```
huddl-app/
├── backend/
│   ├── huddl/
│   │   ├── settings.py      ← TITO + PABLO: CORS + JWT
│   │   └── urls.py          ✓ Done
│   ├── posts/
│   │   ├── models.py        ✓ Post model exists
│   │   ├── admin.py         ← COLIN: Register Post
│   │   ├── serializers.py   ○ Week 2
│   │   ├── views.py         ○ Week 2
│   │   └── urls.py          ○ Week 2
│   ├── users/
│   │   ├── models.py        ✓ Profile model exists
│   │   ├── admin.py         ← NATALIA: Register Profile
│   │   ├── serializers.py   ○ Week 2
│   │   ├── views.py         ○ Week 2
│   │   └── urls.py          ○ Week 2
│   └── friends/
│       ├── models.py        ← CRYSTAL: Create Friendship
│       ├── admin.py         ○ Week 2
│       ├── serializers.py   ○ Week 2
│       ├── views.py         ○ Week 2
│       └── urls.py          ○ Week 2
│
└── frontend/
    └── src/
        ├── App.jsx                    ✓ Router setup
        ├── main.jsx                   ✓ Entry point
        ├── context/
        │   └── AuthContext.jsx        ○ Week 2 (Pablo)
        ├── services/                  ○ Week 2 (Natalia + Colin)
        ├── utils/                     ○ Week 2 (Tito + Pablo)
        └── components/
            ├── layout/
            │   ├── TopBar/            ✓ Structure ready
            │   ├── SideNav/           ✓ Structure ready
            │   └── BottomNav/         ✓ Structure ready
            └── pages/
                ├── Home/              ○ Week 2 (Colin)
                ├── Profile/           ○ Week 2 (Pablo)
                ├── Friends/           ○ Week 2 (Crystal)
                ├── Login/             ○ Week 2 (Natalia)
                └── Signup/            ○ Week 2 (Natalia)
```

**Legend:** ✓ Done | ← This week | ○ Future

---

## 5-Week Roadmap

| Week  | Focus             | Goal                                   |
| ----- | ----------------- | -------------------------------------- |
| **1** | Setup             | CORS, models in admin, project running |
| **2** | API               | Serializers, views, basic endpoints    |
| **3** | Frontend Services | apiClient, authService, connect forms  |
| **4** | Features          | Likes, comments, friend requests       |
| **5** | Polish            | Bug fixes, testing, final integration  |

---

## Documentation

- **Backend details:** See `BACKEND_README.md`
- **Frontend details:** See `FRONTEND_README.md`

---

## Branch Rules (Suggested)

1. Create feature branch from `team-shell`
2. Try to work on your assigned files to avoid conflicts
3. Push and create PR when ready
4. Let's coordinate on shared files to avoid merge conflicts
