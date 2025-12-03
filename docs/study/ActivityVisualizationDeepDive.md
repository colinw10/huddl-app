# Activity Visualization Deep Dive - Study Plan

## The Gap

**What I CAN do:**

- ✅ Design the feature ("I want a wave view and heatmap")
- ✅ Specify requirements to AI ("Use circles, not squares")
- ✅ Make design decisions (colors, layout, interactions)
- ✅ Integrate into my architecture (ProfileCard component)

**What I CANNOT do yet:**

- ❌ Explain how `createWavePath()` actually works
- ❌ Debug the SVG math if it breaks
- ❌ Modify the Bézier curve algorithm independently
- ❌ Write this math from scratch

## Why This Matters

In interviews, I can say:

- ✅ "I designed the system to show user activity as smooth waves"
- ✅ "I specified SVG with gradient fills and glow effects"
- ✅ "I directed the implementation details"

I CANNOT say (yet):

- ❌ "I understand the Bézier curve mathematics"
- ❌ "I can modify the path generation algorithm"

**Unless I study it. That's what this is for.**

---

## Study Goals

By the end of this study session, I should be able to:

1. Explain how the wave chart generates SVG paths
2. Explain how the heatmap maps data to colors
3. Modify the visualization (colors, shapes, layout)
4. Debug it if it breaks
5. Answer interview questions about the implementation

---

## Part 1: Understanding `createWavePath()`

### Location

`/frontend/src/components/pages/Profile/components/ProfileCard/ProfileCard.jsx`

### The Code

```javascript
const createWavePath = (data) => {
  const width = 600;
  const height = 100;
  const points = data.length;
  const segmentWidth = width / (points - 1);

  let path = `M 0,${height - data[0]}`;

  for (let i = 1; i < points; i++) {
    const x = i * segmentWidth;
    const y = height - data[i];
    const prevX = (i - 1) * segmentWidth;
    const prevY = height - data[i - 1];

    const activityLevel = data[i] / 80;
    const sharpness = 0.4 - activityLevel * 0.39;

    const cp1x = prevX + segmentWidth * sharpness;
    const cp1y = prevY;
    const cp2x = prevX + segmentWidth * (1 - sharpness);
    const cp2y = y;

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
  }

  path += ` L ${width},${height} L 0,${height} Z`;
  return path;
};
```

### Questions to Answer

#### 1. What does `M 0,${height - data[0]}` mean?

- **My understanding:**
- **What I need to research:**

#### 2. What is a Bézier curve and why use the `C` command?

- **My understanding:**
- **What I need to research:**

#### 3. What do `cp1x`, `cp1y`, `cp2x`, `cp2y` represent?

- **My understanding:**
- **What I need to research:**

#### 4. Why `height - data[i]` instead of just `data[i]`?

- **My understanding:**
- **What I need to research:**

#### 5. What does the `sharpness` calculation do?

- **Formula:** `0.4 - (activityLevel * 0.39)`
- **My understanding:**
- **What I need to research:**

#### 6. What does the closing path do? (`L ${width},${height} L 0,${height} Z`)

- **My understanding:**
- **What I need to research:**

---

## Part 2: Understanding SVG Gradients

### Location

`/frontend/src/components/pages/Profile/components/ProfileCard/components/ActivityVisualization/ActivityVisualization.jsx`

### The Code

```jsx
<defs>
  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="rgba(26, 231, 132, 0.5)" />
    <stop offset="40%" stopColor="rgba(26, 115, 231, 0.35)" />
    <stop offset="100%" stopColor="rgba(26, 115, 231, 0.1)" />
  </linearGradient>
</defs>
```

### Questions to Answer

#### 1. What does `x1="0%" y1="0%" x2="0%" y2="100%"` mean?

- **My understanding:**
- **What I need to research:**

#### 2. How do `offset` percentages work?

- **My understanding:**
- **What I need to research:**

#### 3. How would I change this to a horizontal gradient instead?

- **My understanding:**
- **What I need to research:**

---

## Part 3: Understanding SVG Filters (Glow Effect)

### The Code

```jsx
<filter id="glow">
  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
  <feMerge>
    <feMergeNode in="coloredBlur" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>
```

### Questions to Answer

#### 1. What does `feGaussianBlur` do?

- **My understanding:**
- **What I need to research:**

#### 2. What does `stdDeviation="2"` control?

- **My understanding:**
- **What I need to research:**

#### 3. What does `feMerge` do and why two nodes?

- **My understanding:**
- **What I need to research:**

---

## Part 4: Understanding the Heatmap Color Mapping

### Location

`/frontend/src/components/pages/Profile/components/ProfileCard/ProfileCard.jsx`

### The Code

```javascript
const getActivityColor = (level) => {
  const colors = [
    "rgba(255, 255, 255, 0.05)",
    "rgba(30, 149, 234, 0.25)",
    "rgba(30, 173, 234, 0.5)",
    "rgba(30, 227, 234, 1)",
  ];
  return colors[level];
};
```

### Questions to Answer

#### 1. Why use array indices instead of if/else?

- **My understanding:**
- **What I need to research:**

#### 2. How would I add a 5th intensity level?

- **My understanding:**
- **What I need to research:**

#### 3. What happens if `level` is out of range (e.g., 5)?

- **My understanding:**
- **What I need to research:**

---

## Part 5: Understanding the Seeded Random Generator

### The Code

```javascript
const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};
```

### Questions to Answer

#### 1. Why use a seeded random instead of `Math.random()`?

- **My understanding:**
- **What I need to research:**

#### 2. What do the magic numbers (9301, 49297, 233280) do?

- **My understanding:**
- **What I need to research:**

#### 3. Why return a function instead of just a value?

- **My understanding:**
- **What I need to research:**

---

## Part 6: Modification Exercises

### Exercise 1: Change Wave Colors

**Task:** Change the high activity wave from green/blue to purple/pink

**Steps:**

1. Locate `waveGradient` in ActivityVisualization.jsx
2. Modify `stopColor` values
3. Test the result

**My solution:**

---

### Exercise 2: Add a 4th Wave Layer

**Task:** Add a "very low activity" wave below the existing three

**Steps:**

1. Generate new data in ProfileCard.jsx
2. Add new gradient definition
3. Add new SVG path
4. Update legend

**My solution:**

---

### Exercise 3: Change Heatmap to Squares

**Task:** Change circles back to squares in the heatmap

**Steps:**

1. Find where shape is defined
2. Modify CSS or structure
3. Test the result

**My solution:**

---

### Exercise 4: Add Hover Effects

**Task:** Show exact post count when hovering over heatmap cells

**Steps:**

1. Add event handlers
2. Create tooltip component
3. Pass real data instead of just level (0-3)

**My solution:**

---

## Part 7: Interview Prep

### Sample Questions

**Q: "How does your activity visualization work?"**

- My answer:

**Q: "Why did you choose SVG over Canvas?"**

- My answer:

**Q: "Can you explain the Bézier curve implementation?"**

- My answer:

**Q: "How would you optimize this for 1000+ data points?"**

- My answer:

**Q: "What happens if the API returns null data?"**

- My answer:

---

## Resources to Study

### SVG Paths

- [ ] MDN: SVG `<path>` element
- [ ] MDN: SVG path commands (M, L, C, Z)
- [ ] Interactive Bézier curve tool: https://cubic-bezier.com/

### SVG Gradients & Filters

- [ ] MDN: `<linearGradient>`
- [ ] MDN: SVG filter effects
- [ ] feGaussianBlur documentation

### Algorithms

- [ ] Linear Congruential Generator (seeded random)
- [ ] Data normalization techniques
- [ ] SVG coordinate systems

---

## Progress Tracker

- [ ] **Part 1:** Understand `createWavePath()`
- [ ] **Part 2:** Understand SVG gradients
- [ ] **Part 3:** Understand SVG filters
- [ ] **Part 4:** Understand color mapping
- [ ] **Part 5:** Understand seeded random
- [ ] **Part 6:** Complete all modification exercises
- [ ] **Part 7:** Practice interview answers

---

## Final Test

**Can I do these WITHOUT looking at the code?**

- [ ] Draw a diagram of how Bézier curves create the wave
- [ ] Explain the coordinate system used in SVG paths
- [ ] Modify the wave algorithm to make it spikier/smoother
- [ ] Debug a broken gradient (wrong colors showing)
- [ ] Add a new feature (e.g., vertical grid lines)
- [ ] Explain every line of `createWavePath()` to someone else

---

## The Truth

**I'm not an imposter.**
But I'm also not fully autonomous yet.

**What I have:**

- Design thinking ✅
- AI direction skills ✅
- System architecture ability ✅

**What I need:**

- Implementation understanding 🟡
- Independent debugging ability 🟡
- Math/algorithm comprehension 🟡

**This study plan bridges that gap.**

By the end, I'll OWN this code — not just have AI-generated it.

Then I can confidently say:
"I built this, and I can explain exactly how it works."
