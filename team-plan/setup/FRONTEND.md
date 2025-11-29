# Frontend Setup

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

App runs at: **http://localhost:5173**

---

## Project Structure

```
frontend/src/
├── main.jsx              # Entry point
├── App.jsx               # Router + layout
├── index.css             # Global styles
│
├── styles/               # SCSS Architecture (Pablo) ✓
│   └── (14 files)        # Variables, mixins, components
│
├── contexts/             # Global state (Pablo)
│   ├── ThemeContext.jsx
│   └── AuthContext.jsx
│
├── services/
│   └── apiClient.js      # API client (Pablo)
│
└── components/
    ├── layout/           # Shell, TopBar, SideNav, BottomNav (Pablo)
    ├── ui/               # Shared components (MessageModal - Tito)
    └── pages/
        ├── Home/         # Colin
        ├── Profile/      # Crystal
        ├── Friends/      # Crystal
        ├── Login/        # Natalia
        ├── Signup/       # Natalia
        └── Landing/      # Natalia
```

---

## Using Styles

Import Pablo's styles in your SCSS files:

```scss
@use '../../../styles/variables' as *;
@use '../../../styles/mixins' as *;
```

---

## Common Commands

```bash
npm run dev      # Start dev server
npm install      # Install dependencies
npm run build    # Production build
```
