# Timeline Carousel

## Overview

Posts in TimelineRiverRow are presented as interactive card decks navigable with arrows or dots. Each category (Thoughts, Media, Milestones) has its own carousel with max 12 posts per deck.

## Location

`frontend/src/components/pages/Home/components/TimelineRiverRow/`

## Row Chunking (Overflow Handling)

When a user has more than 12 posts in any category, they get multiple rows:

```jsx
const CAROUSEL_LIMIT = 12;

const chunkPostsIntoRows = (posts) => {
  if (posts.length <= CAROUSEL_LIMIT) return [posts];

  const rows = [];
  const remainder = posts.length % CAROUSEL_LIMIT;

  // Newest posts in first chunk (remainder), older in subsequent chunks
  if (remainder > 0) {
    rows.push(posts.slice(0, remainder)); // e.g., 3 newest
    for (let i = remainder; i < posts.length; i += CAROUSEL_LIMIT) {
      rows.push(posts.slice(i, i + CAROUSEL_LIMIT)); // 12 older
    }
  }
  return rows;
};
```

**Example:** User posts 15 thoughts in one day:

- Row 1: 3 newest thoughts
- Row 2: 12 older thoughts

## Sorting Behavior

- **Feed Level:** Users sorted by most recent post (any category)
- **Within Deck:** Posts sorted newest first
- **Millisecond Precision:** Even fractionally newer posts go to top

See [FeedSortingAlgorithms.md](../stretch-goals/FeedSortingAlgorithms.md) for future sorting options.

## Navigation

```jsx
const [currentCard, setCurrentCard] = useState(0);

const nextCard = () => setCurrentCard((prev) => (prev + 1) % totalCards);
const prevCard = () =>
  setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards);
```

## UI Elements

```jsx
<button className="deck-nav deck-prev" onClick={prevCard}>‹</button>
<div className="deck-card">{/* Current post */}</div>
<button className="deck-nav deck-next" onClick={nextCard}>›</button>

<div className="deck-indicators">
  {posts.map((_, index) => (
    <span
      className={`dot ${index === currentCard ? 'active' : ''}`}
      onClick={() => setCurrentCard(index)}
    />
  ))}
</div>
```

## Visual Design

- Cards appear stacked with subtle offset (shadow card behind)
- Active indicator dot glows cyan
- Navigation arrows glow on hover

## Keyboard Navigation

- **ArrowLeft** - Previous card
- **ArrowRight** - Next card
