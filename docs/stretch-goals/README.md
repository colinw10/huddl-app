# Stretch Goals Overview

This folder contains documentation for features planned for future development phases.

---

## Quick Reference

| File                                                         | Priority | Status      | Description                              |
| ------------------------------------------------------------ | -------- | ----------- | ---------------------------------------- |
| [Posts.md](Posts.md)                                         | HIGH     | Partial     | Social features (some completed ✅)      |
| [FeedSortingAlgorithms.md](FeedSortingAlgorithms.md)         | MEDIUM   | 📋 Future   | Hot/trending, friend priority, toggles   |
| [CollapsibleCards.md](CollapsibleCards.md)                   | MEDIUM   | 📋 Spec     | Pill collapse system for card focus      |
| [EngagementRing.md](EngagementRing.md)                       | LOW      | Placeholder | Profile avatar progress ring             |
| [AdvancedAnalytics.md](AdvancedAnalytics.md)                 | LOW      | Future      | HUDDL Score, virality, best posting time |
| [ProfileCardFeatures.md](../features/ProfileCardFeatures.md) | MEDIUM   | Partial     | ProfileCard analytics & stats            |
| [MySpaceEasterEgg.md](MySpaceEasterEgg.md)                   | LOW      | Future      | Fun throwback feature                    |

---

## Status Legend

- **✅ Completed** - Feature is implemented and working
- **🔄 Partial** - Some aspects implemented, others pending
- **📦 Placeholder** - UI exists but no backend
- **📋 Future** - Planned but not started

---

## Recently Completed

These features from stretch goals are now live:

- ✅ Like/unlike posts (`POST /api/posts/:id/like/`)
- ✅ Reply to posts (threaded with `parent` field)
- ✅ View posts by user (Profile TimelineRiver)
- ✅ Share count tracking (backend field ready)

---

## Current Placeholders

Components that exist in UI but need backend:

1. **Engagement Ring** - SVG ring on avatar, shows decorative animation only
2. **Share Button** - Icon exists, endpoint exists, frontend action not wired
3. **Bookmark Button** - Icon exists, no backend yet

---

## Priority Order for Implementation

1. **HIGH** - Core user experience (Posts interactions)
2. **MEDIUM** - Profile completeness & analytics
3. **LOW** - Nice-to-have, polish, easter eggs
