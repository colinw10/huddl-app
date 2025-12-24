# Timeline Carousel System

## Overview

Posts in the timeline are presented as interactive card "decks" that can be navigated horizontally using arrows or indicator dots.

## Concept

Each row in the timeline represents a time window with multiple posts stacked as a carousel/deck:

```
[ ← ] [ Card 1 of 5 ] [ → ]
        • • ● • •
```

## Components

### TimelineRiverRow

The main carousel container handling deck navigation.

**State:**

```jsx
const [currentCard, setCurrentCard] = useState(0);
```

**Navigation:**

```jsx
const nextCard = () => setCurrentCard((prev) => (prev + 1) % totalCards);
const prevCard = () =>
  setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards);
```

### Navigation Arrows

```jsx
<button className="deck-nav deck-prev" onClick={prevCard}>‹</button>
<div className="deck-card">{/* Current post */}</div>
<button className="deck-nav deck-next" onClick={nextCard}>›</button>
```

### Indicator Dots

```jsx
<div className="deck-indicators">
  {posts.map((_, index) => (
    <span
      key={index}
      className={`dot ${index === currentCard ? "active" : ""}`}
      onClick={() => setCurrentCard(index)}
    />
  ))}
</div>
```

## Visual Design

### Card Stack Effect

Cards appear stacked with subtle offset:

```scss
.deck-card {
  position: relative;

  &::before {
    // Shadow card behind
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    right: -4px;
    bottom: -4px;
    background: rgba(79, 255, 255, 0.1);
    border-radius: inherit;
    z-index: -1;
  }
}
```

### Active Indicator

```scss
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;

  &.active {
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan);
  }
}
```

### Navigation Arrows

```scss
.deck-nav {
  background: transparent;
  border: 1px solid rgba(79, 255, 255, 0.3);
  color: var(--cyan);
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    background: rgba(79, 255, 255, 0.1);
    box-shadow: 0 0 12px rgba(79, 255, 255, 0.3);
  }
}
```

## Keyboard Navigation

```jsx
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === "ArrowRight") nextCard();
  };
  // Only if this row is focused
  if (isActive) {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }
}, [isActive]);
```

## Time Batching

Posts can be grouped into time windows:

- Same day
- 3-day windows
- Weekly batches

```jsx
const groupPostsByTimeWindow = (posts, windowDays = 3) => {
  // Group posts that fall within windowDays of each other
  // Returns array of post groups for carousel display
};
```

## Files Involved

| File                   | Purpose                 |
| ---------------------- | ----------------------- |
| `TimelineRiverRow.jsx` | Main carousel component |
| `_post-card.scss`      | Deck styling            |
| `_indicators.scss`     | Dot navigation styles   |

## Interaction States

| State          | Visual                       |
| -------------- | ---------------------------- |
| Hover on arrow | Glow effect                  |
| Click dot      | Smooth transition to card    |
| Active card    | Full opacity                 |
| Inactive card  | Reduced opacity (if visible) |

## Accessibility

- Arrow buttons have `aria-label`
- Current position announced: "Card 2 of 5"
- Dots are keyboard navigable
- Respects `prefers-reduced-motion`
