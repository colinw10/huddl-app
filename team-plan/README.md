# Team Plan

Individual task files for each team member.

| Member  | File                       | Role                       |
| ------- | -------------------------- | -------------------------- |
| Pablo   | [PABLO.md](./PABLO.md)     | Architecture & Lead        |
| Colin   | [COLIN.md](./COLIN.md)     | Home/Feed                  |
| Natalia | [NATALIA.md](./NATALIA.md) | Auth & Landing             |
| Crystal | [CRYSTAL.md](./CRYSTAL.md) | Profile & Friends          |
| Tito    | [TITO.md](./TITO.md)       | Messaging & Infrastructure |

---

## Quick Reference

### Week 1 Priority

1. **Tito + Pablo**: CORS config (required for frontend-backend communication)
2. **Everyone**: Register models in admin, verify setup

### Shared Resources (Pablo owns, team uses)

- `src/styles/` - SCSS variables, mixins, components ✓
- `src/contexts/` - ThemeContext, AuthContext
- `src/services/apiClient.js` - Axios with auth headers
- `src/components/layout/` - Shell, TopBar, SideNav, BottomNav

### Import Styles Like This

```scss
@use "../../../styles/variables" as *;
@use "../../../styles/mixins" as *;
```

---

## Communication

- Questions? Slack Pablo
- Merge conflicts? Coordinate before pushing
- Stuck? Ask for help early!
