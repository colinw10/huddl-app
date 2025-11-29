# HUDDL

**Due:** January 24, 2026  
**Branch:** `team-shell`

---

## Quick Start

```bash
# Backend (Terminal 1)
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
# → http://localhost:8000

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Team

| Person      | Area              | See Tasks                              |
| ----------- | ----------------- | -------------------------------------- |
| **Pablo**   | Architecture      | [team-plan/PABLO.md](team-plan/PABLO.md) |
| **Colin**   | Home/Feed         | [team-plan/COLIN.md](team-plan/COLIN.md) |
| **Natalia** | Auth & Landing    | [team-plan/NATALIA.md](team-plan/NATALIA.md) |
| **Crystal** | Profile & Friends | [team-plan/CRYSTAL.md](team-plan/CRYSTAL.md) |
| **Tito**    | Messaging         | [team-plan/TITO.md](team-plan/TITO.md) |

---

## Documentation

| Doc | Description |
|-----|-------------|
| [team-plan/](team-plan/) | Individual task files |
| [team-plan/setup/FRONTEND.md](team-plan/setup/FRONTEND.md) | Frontend setup & structure |
| [team-plan/setup/BACKEND.md](team-plan/setup/BACKEND.md) | Backend setup & structure |

---

## Workflow

1. Pull latest from `team-shell`
2. Create your feature branch: `git checkout -b yourname-feature`
3. Work on your assigned files
4. Push and create PR into `team-shell`

**Need help?** Ask Pablo
