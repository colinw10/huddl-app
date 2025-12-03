# Activity Visualization Feature

## Overview

The Activity Visualization component provides users with visual analytics of their posting activity over time, rendered on the back of the profile flip card.

## Visual Components

### Wave View

- **Smooth area chart** showing activity trends over 52 weeks
- **Three stacked layers** with gradient fills:
  - High activity wave (top layer)
  - Medium activity wave (middle layer)
  - Low activity wave (bottom layer)
- **Dynamic peak detection** displaying optimal posting time (e.g., "Peak Sat 7PM")
- **Interactive toggle buttons** to switch between Wave and Grid views

### Grid/Heatmap View

- **GitHub-style contribution calendar** showing 52 weeks of activity
- **Color-coded intensity levels**:
  - Light gray = low/no activity
  - Light blue = low-medium activity
  - Medium cyan = medium-high activity
  - Bright cyan = high activity
- **Grid layout**: Days of week (Y-axis) × Weeks/Months (X-axis)
- **Consistent toggle interface** matching Wave view

## Top Stats Cards

Both views display the same analytics header:

1. **Profile Views** - Total profile impressions (2.4K)
2. **Engagement Rate** - User interaction percentage (89%)
3. **Avg. Likes/Post** - Average likes per post (156)
4. **Growth This Week** - Weekly growth metric (+23%)

## Technical Implementation

### Data Source

All activity data comes from YOUR Django backend - no external APIs required.

**Example API endpoint:**

```javascript
// In ActivityVisualization.jsx
const response = await apiClient.get("/api/user/activity");
```

**Expected Django response:**

```json
{
  "daily_posts": [
    { "date": "2024-01-01", "count": 3 },
    { "date": "2024-01-02", "count": 7 }
  ],
  "weekly_summary": [...],
  "peak_time": "Sat 7PM"
}
```

### Rendering

Activity visualization happens **client-side in the browser** using JavaScript charting libraries. This is NOT a 3rd party API - it's a visualization library rendering YOUR data.

**Current implementation uses:**

- Custom SVG path generation for wave charts
- Seeded random number generator for consistent demo data
- Pure React/JavaScript (no external charting dependencies in current version)

**Could be enhanced with libraries like:**

- **Recharts** - Simple React charting library
  ```javascript
  import { AreaChart, Area } from "recharts";
  ```
- **D3.js** - Advanced custom visualizations
  ```javascript
  import * as d3 from "d3";
  ```
- **React Calendar Heatmap** - GitHub-style contribution grids
  ```javascript
  import CalendarHeatmap from "react-calendar-heatmap";
  ```

### Component Structure

```
ActivityVisualization.jsx
├── View mode toggle (Wave/Grid)
├── Peak time badge
├── Wave chart (SVG paths)
│   ├── High activity layer
│   ├── Medium activity layer
│   └── Low activity layer
└── Heatmap grid (52 weeks × 7 days)
```

### Data Flow

1. **User posts content** → Django saves to database
2. **React component mounts** → Requests `/api/user/activity`
3. **Django returns activity metrics** → JSON response
4. **Visualization library renders** → Charts appear in browser
5. **User toggles view** → Re-renders with different visualization

## Key Features

### No External Dependencies

- ✅ Data comes from YOUR Django backend
- ✅ Visualization happens in the browser
- ✅ No HTTP requests to external services
- ✅ All activity data belongs to YOUR users

### Privacy-Focused

- Activity analytics only visible on **profile card back** (private view)
- Not exposed to other users
- Personal insights dashboard

### Performance

- Data generated once per component mount
- Memoized calculations prevent unnecessary re-renders
- Lightweight SVG rendering

## Future Enhancements

### Potential Features

- Export activity data as CSV/JSON
- Configurable date ranges (last 30 days, 6 months, all time)
- Activity streaks and milestones
- Drill-down into specific days/weeks
- Compare activity across different post types

### If External Data Needed (Future)

Only necessary if adding features like:

- **GitHub integration**: Pull actual GitHub contributions
  ```javascript
  fetch("https://api.github.com/users/username/events");
  ```
- **Industry benchmarks**: Compare engagement to platform averages
  ```javascript
  fetch("https://analytics-api.com/social-media-benchmarks");
  ```

But for core HUDDL user activity visualization: **No 3rd party APIs required.**

## Component Files

- `/frontend/src/components/pages/Profile/components/ProfileCard/components/ActivityVisualization/`
  - `ActivityVisualization.jsx` - Main component
  - `ActivityVisualization.scss` - Styles
- Parent: `ProfileCardBack.jsx`
- Data generation: `ProfileCard.jsx` (seeded random for demo)

## Summary

This is a **visualization library** rendering **your own data**, not a 3rd party API integration. The component transforms user activity data from your Django backend into beautiful, interactive charts - all processed client-side in the browser.
