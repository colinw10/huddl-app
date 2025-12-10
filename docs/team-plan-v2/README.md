# HUDDL Team Plan v2

> ⚡ **New here?** Start with the **[QUICKSTART Guide](./QUICKSTART.md)** to get running in 2 minutes!

## Project Overview

**Due Date:** January 24, 2026  
**Time Remaining:** ~8 weeks  
**Team Size:** 5 members

## Team Structure

| Member      | Role                   | Primary Domain                                  |
| ----------- | ---------------------- | ----------------------------------------------- |
| **Pablo**   | UI Architect & Lead    | Frontend design, styling, component structure   |
| **Colin**   | Posts Backend Lead     | Posts API, CRUD operations, feed logic          |
| **Natalia** | Auth & Users Lead      | Authentication, user profiles, protected routes |
| **Crystal** | Friends System Lead    | Friends/connections, social features            |
| **Tito**    | Infrastructure & Utils | API client, services layer, utilities, config   |

## Quick Links

- ⚡ **[QUICKSTART Guide](./QUICKSTART.md)** - Get running fast!
- [Project Tree with Responsibilities](./PROJECT_TREE.md)
- [Individual Task Folders](./members/)
  - [Colin's Tasks](./members/colin/)
  - [Natalia's Tasks](./members/natalia/)
  - [Crystal's Tasks](./members/crystal/)
  - [Tito's Tasks](./members/tito/)
  - [Pablo's Tasks](./members/pablo/)

## Current Project Status

### ✅ Completed

- Django project structure with all apps registered
- User/Profile models with migrations
- Post model with migrations
- JWT authentication setup (simplejwt installed)
- Auth endpoints (signup, login, token refresh, current user)
- Full frontend UI structure (Landing, Login, Signup, Home, Profile, Friends)
- Design system (CSS tokens, utilities, theme)
- Timeline River feed architecture

### 🔧 In Progress

- Frontend-to-backend connection (CORS needed)
- Frontend service layer (apiClient, postsService, etc.)

### ❌ Not Started

- Posts API endpoints (views, serializers, urls)
- Friends model and API
- Error handling in frontend
- Auth flow wiring (forms → API calls)

## Development Workflow

1. Each member works on their assigned files
2. Create feature branch from `team-shell`
3. Make changes and test locally
4. Push and create PR
5. Get review before merging

## Running the Project

### Backend

```bash
cd backend
python3 manage.py runserver
# Runs at http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```
