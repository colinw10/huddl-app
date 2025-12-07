# HUDDL Team Plan v2

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

- [Project Tree with Responsibilities](./PROJECT_TREE.md)
- [Individual Task Folders](./members/)
  - [Colin's Tasks](./members/colin/)
  - [Natalia's Tasks](./members/natalia/)
  - [Crystal's Tasks](./members/crystal/)
  - [Tito's Tasks](./members/tito/)
  - [Pablo's Tasks](./members/pablo/)

## Current Project Status

### ✅ Completed (Pablo)

- Django project structure with all apps registered
- JWT authentication setup (simplejwt installed)
- Full frontend UI structure (Landing, Login, Signup, Home, Profile, Friends)
- Design system (SCSS tokens, utilities, theme) ✅
- All page styles (Home.scss, Profile.scss, Login.scss, etc.) ✅
- ThemeContext (dark/light mode) ✅

### 🎯 Team Tasks

Each file has starter code with TODO comments. Follow the comments to implement!

| Member      | Backend Files                                                  | Frontend Files                                                    |
| ----------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Colin**   | `posts/models.py`, `views.py`, `serializers.py`, `urls.py`     | `postsService.js`, `PostsContext.jsx`, `Home.jsx`                 |
| **Natalia** | `users/views.py`, `serializers.py`, `urls.py`                  | `AuthContext.jsx`, `Login.jsx`, `Signup.jsx`                      |
| **Crystal** | `friends/models.py`, `views.py`, `serializers.py`, `urls.py`   | `friendsService.js`, `FriendsContext.jsx`, `Profile.jsx`, `Friends.jsx` |
| **Tito**    | CORS config in `settings.py`                                   | `apiClient.js`, `MessageContext.jsx`                              |

### 📝 How To Complete Your Tasks

1. Open your assigned files (they have `Status: PLACEHOLDER`)
2. Read the TODO comments - they tell you exactly what to do
3. Uncomment the code and fill in the implementation
4. Test that it works
5. The SCSS styles are already done - just use the CSS classes!

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
