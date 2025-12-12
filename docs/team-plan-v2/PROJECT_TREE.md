# HUDDL Frontend - Task Distribution

> **FRONTEND ONLY BRANCH**  
> Legend: 🔵 PABLO | 🟢 COLIN | 🟡 NATALIA | 🟣 CRYSTAL | 🟠 TITO

---

## Distribution Summary

| Person | Files | Lines | % |
|--------|-------|-------|---|
| Pablo | 1 | ~1034 | ~21% |
| Colin | 6 | ~978 | ~20% |
| Natalia | 7 | ~987 | ~20% |
| Crystal | 6 | ~995 | ~20% |
| Tito | 7 | ~867 | ~18% |

---

## File Assignments

```
frontend/src/components/
│
├── layout/
│   ├── Shell/
│   │   └── Shell.jsx                      🟢 COLIN
│   ├── SideNav/
│   │   └── SideNav.jsx                    🟡 NATALIA
│   └── TopBar/
│       ├── TopBar.jsx                     🟠 TITO
│       └── MessageModal/
│           └── MessageModal.jsx           🟣 CRYSTAL
│
├── ui/
│   ├── ThemeToggle/
│   │   └── ThemeToggle.jsx                🟠 TITO
│   ├── ProtectedRoute.jsx                 🟢 COLIN
│   └── MessageModal/
│       └── MessageModal.jsx               🟡 NATALIA
│
└── pages/
    ├── Landing/
    │   └── Landing.jsx                    🟠 TITO
    ├── Login/
    │   └── Login.jsx                      🟢 COLIN
    ├── Signup/
    │   └── Signup.jsx                     🟣 CRYSTAL
    ├── Home/
    │   ├── Home.jsx                       🟠 TITO
    │   └── components/
    │       ├── TimelineRiverRow/
    │       │   └── TimelineRiverRow.jsx   🔵 PABLO
    │       ├── TimelineRiverFeed/
    │       │   └── TimelineRiverFeed.jsx  🟠 TITO
    │       ├── MediaLightbox/
    │       │   └── MediaLightbox.jsx      🟢 COLIN
    │       └── DeleteConfirmModal/
    │           └── DeleteConfirmModal.jsx 🟡 NATALIA
    ├── Profile/
    │   ├── Profile.jsx                    🟠 TITO
    │   └── components/
    │       ├── TimelineRiver/
    │       │   └── TimelineRiver.jsx      🟢 COLIN
    │       ├── ComposerModal/
    │       │   └── ComposerModal.jsx      🟣 CRYSTAL
    │       └── ProfileCard/
    │           ├── ProfileCard.jsx        🟣 CRYSTAL
    │           └── components/
    │               ├── ActivityVisualization/
    │               │   └── ActivityVisualization.jsx  🟡 NATALIA
    │               ├── ProfileCardFront/
    │               │   └── ProfileCardFront.jsx       🟡 NATALIA
    │               ├── ProfileCardBack/
    │               │   └── ProfileCardBack.jsx        🟡 NATALIA
    │               ├── QuickSettings/
    │               │   └── QuickSettings.jsx          🟡 NATALIA
    │               └── PostTypeBreakdown/
    │                   └── PostTypeBreakdown.jsx      🟣 CRYSTAL
    ├── Friends/
    │   └── Friends.jsx                    🟣 CRYSTAL
    ├── About/
    │   └── About.jsx                      🟠 TITO
    └── NotFound/
        └── NotFound.jsx                   🟢 COLIN
```

---

## Per-Person Summary

### 🔵 PABLO (~21%)
- `TimelineRiverRow.jsx` (1034 lines)

### 🟢 COLIN (~20%)
- `TimelineRiver.jsx` (477)
- `Login.jsx` (198)
- `MediaLightbox.jsx` (162)
- `Shell.jsx` (71)
- `ProtectedRoute.jsx` (40)
- `NotFound.jsx` (30)

### 🟡 NATALIA (~20%)
- `ActivityVisualization.jsx` (288)
- `ProfileCardFront.jsx` (201)
- `SideNav.jsx` (159)
- `ProfileCardBack.jsx` (119)
- `MessageModal.jsx` (ui) (103)
- `QuickSettings.jsx` (61)
- `DeleteConfirmModal.jsx` (56)

### 🟣 CRYSTAL (~20%)
- `Friends.jsx` (228)
- `Signup.jsx` (227)
- `ProfileCard.jsx` (168)
- `MessageModal.jsx` (TopBar) (154)
- `ComposerModal.jsx` (147)
- `PostTypeBreakdown.jsx` (71)

### 🟠 TITO (~18%)
- `Home.jsx` (216)
- `Profile.jsx` (139)
- `Landing.jsx` (112)
- `About.jsx` (132)
- `ThemeToggle.jsx` (93)
- `TopBar.jsx` (92)
- `TimelineRiverFeed.jsx` (83)
