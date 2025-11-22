# Utils Layer

**Owner:** Tito (State Management & Frontend Logic)  
**Status:** EMPTY - needs implementation

## Purpose
Create utility/helper functions for data transformation, validation, and common operations. Keep functions pure (no side effects).

## Required Files

### 1. `validators.js` - Form Validation
**Owner:** Natalia  
**TODO:**
- `validateEmail(email)` - Check if email is valid format
- `validatePassword(password)` - Check password strength (min 8 chars, etc.)
- `validateUsername(username)` - Check username (alphanumeric, 3-20 chars)
- `validatePasswordMatch(password, confirmPassword)` - Check if passwords match
- Export all as named functions

### 2. `formatters.js` - Data Formatting
**Owner:** Tito  
**TODO:**
- `formatDate(dateString)` - Convert ISO date to "2 hours ago", "3 days ago", etc.
- `formatNumber(num)` - Convert 1000 to "1K", 1000000 to "1M"
- `truncateText(text, maxLength)` - Cut text and add "..."
- `formatUsername(username)` - Add @ prefix if needed
- Export all as named functions

### 3. `storage.js` - LocalStorage Helpers
**Owner:** Colin  
**TODO:**
- `saveToStorage(key, value)` - Save data to localStorage (JSON.stringify)
- `getFromStorage(key)` - Get data from localStorage (JSON.parse)
- `removeFromStorage(key)` - Remove item from localStorage
- `clearStorage()` - Clear all localStorage
- Export all as named functions

### 4. `constants.js` - App Constants
**Owner:** Anyone  
**TODO:**
- `API_BASE_URL` - Backend API URL
- `TOKEN_KEY` - localStorage key for auth token
- `POST_TYPES` - Enum for post types (text, media, etc.)
- `FRIEND_STATUS` - Enum for friend statuses (pending, accepted, etc.)
- Export all as named exports

### 5. `helpers.js` - Misc Utilities
**Owner:** Tito  
**TODO:**
- `debounce(func, delay)` - Debounce function calls
- `generateId()` - Generate unique IDs for client-side
- `isEmptyObject(obj)` - Check if object has no keys
- `sortByDate(array, key)` - Sort array of objects by date property
- Export all as named functions

## Usage Example

```javascript
// In a component
import { formatDate, formatNumber } from '../utils/formatters';
import { validateEmail } from '../utils/validators';

const formattedDate = formatDate(post.createdAt); // "2 hours ago"
const formattedLikes = formatNumber(post.likes); // "1.2K"
const isValid = validateEmail(email); // true/false
```

## Important Rules
- **DO NOT modify UI components when adding utils**
- Keep all functions pure (no side effects)
- Add JSDoc comments to all functions
- Export as named exports (not default)
- Write unit tests for complex functions (optional)
