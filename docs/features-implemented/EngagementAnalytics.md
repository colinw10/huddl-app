# Engagement Analytics System

## Overview

Visual representations of user activity and engagement through heatmaps and wave charts.

## Components

### 1. Activity Heatmap

GitHub-style contribution grid showing daily activity levels.

**Location:** Profile page, above timeline

**Visual Design:**

```
         Mon  Tue  Wed  Thu  Fri  Sat  Sun
Week 1   [▓]  [ ]  [░]  [▓]  [█]  [░]  [ ]
Week 2   [░]  [▓]  [▓]  [▓]  [▓]  [█]  [▓]
...
```

**Activity Levels:**
| Level | Range | Color | CSS Class |
|-------|-------|-------|-----------|
| Empty | 0 | Transparent | `level-0` |
| Low | 1-400 | `rgba(79, 255, 255, 0.2)` | `level-1` |
| Medium | 401-800 | `rgba(79, 255, 255, 0.4)` | `level-2` |
| High | 801-1500 | `rgba(79, 255, 255, 0.7)` | `level-3` |
| Maximum | 1500+ | `var(--cyan)` | `level-4` |

**Data Generation:**

```javascript
const ENGAGEMENT_TIERS = {
  low: { min: 200, max: 400 },
  medium: { min: 400, max: 800 },
  high: { min: 800, max: 1500 },
};

const generateEngagement = () => {
  // 50% chance of low activity
  // 35% chance of medium activity
  // 15% chance of high activity
};
```

### 2. Engagement Wave Chart

Real-time wave visualization showing engagement patterns over time.

**Visual Design:**

- Smooth bezier curve
- Gradient fill from cyan to magenta
- Animated "wave" motion
- Time axis at bottom

**Data Points:**

- 24 data points representing hourly engagement
- Peaks during active hours
- Valleys during quiet periods

**CSS Animation:**

```scss
.wave-line {
  animation: wave-flow 3s ease-in-out infinite;
}

@keyframes wave-flow {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
}
```

## Implementation

### Heatmap Component

```jsx
const ActivityHeatmap = ({ userData }) => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Generate 365 days of activity data
    const data = generateYearActivity(userData);
    setActivityData(data);
  }, [userData]);

  return (
    <div className="heatmap-grid">
      {activityData.map((week, i) => (
        <div key={i} className="heatmap-week">
          {week.map((day, j) => (
            <div
              key={j}
              className={`heatmap-cell level-${day.level}`}
              title={`${day.date}: ${day.count} interactions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
```

### Wave Chart Component

```jsx
const EngagementWave = ({ data }) => {
  const points = data
    .map(
      (val, i) =>
        `${i * (width / data.length)},${height - (val * height) / maxVal}`
    )
    .join(" L ");

  return (
    <svg className="wave-chart">
      <path d={`M 0,${height} L ${points} L ${width},${height} Z`} />
    </svg>
  );
};
```

## Data Sources

### Current (Mock Data)

- Random generation based on engagement tiers
- Date-seeded for consistency
- Analytics timestamp uses live `Date.now()`

### Future (Real Data)

- Post creation timestamps
- Like/comment activity
- Login frequency
- Time spent in app

## Styling

### Heatmap Cells

```scss
.heatmap-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin: 1px;

  &.level-4 {
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan);
  }
}
```

### Wave Chart

```scss
.wave-chart {
  fill: linear-gradient(
    to bottom,
    rgba(79, 255, 255, 0.3),
    rgba(255, 79, 180, 0.1)
  );
  stroke: var(--cyan);
  stroke-width: 2px;
}
```

## Files Involved

| File                      | Purpose                     |
| ------------------------- | --------------------------- |
| `ProfileActivityHeatmap/` | Heatmap component           |
| `EngagementWave/`         | Wave chart component        |
| `Profile.jsx`             | Integration in profile page |
| Related SCSS files        | Visual styling              |

## Accessibility

- Tooltips show exact values on hover
- Color-blind friendly palette option
- Screen reader announces activity levels
- High contrast mode support

## Configuration

```javascript
// Analytics configuration
const ANALYTICS_CONFIG = {
  heatmapWeeks: 52, // Show 1 year
  waveDataPoints: 24, // Hourly for 1 day
  refreshInterval: 60000, // Update every minute
  useRealtime: true, // Use Date.now() vs mock date
};
```
