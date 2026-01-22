# Avatar Design Pattern

## Status: RESOLVED ✅

This is **not an inconsistency** — it's intentional design.

## The Pattern

| Context           | Avatar Type             | Why                                    |
| ----------------- | ----------------------- | -------------------------------------- |
| **Feed/Timeline** | `<UserIcon>` silhouette | Uniform look, eye follows content flow |
| **Friends page**  | Initials ("JD")         | Need to distinguish individuals        |
| **Messages**      | Initials ("JD")         | Need to tell conversations apart       |

## The Rule

- **Content-focused views** → Silhouette (visual rhythm matters)
- **People-focused views** → Initials (identification matters)

## Implementation

### getInitials Helper

Already exists in Home.jsx. Use this wherever you need initials:

```jsx
const getInitials = (firstName, lastName, username) => {
  if (firstName && lastName)
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName.slice(0, 2).toUpperCase();
  return username.slice(0, 2).toUpperCase();
};
```

### For Silhouette (Feed, Posts)

```jsx
import { UserIcon } from "@assets/icons";

<div className="avatar">
  <UserIcon size={24} />
</div>;
```

### For Initials (Friends, Messages)

```jsx
<div className="avatar">
  {getInitials(user.first_name, user.last_name, user.username)}
</div>
```

## API Requirements

The backend just needs to return:

- `username`
- `first_name`
- `last_name`

No avatar URL needed — initials are calculated on frontend.

## For Messaging System

Use **initials** for:

- Conversation list (who are you chatting with?)
- Message headers (who sent this?)

The API already returns `sender` and `receiver` objects with `username`, `first_name`, `last_name` — that's all you need.

## Future Enhancement (Optional)

If you ever want actual profile pictures:

1. Let users upload images to a service (Cloudinary, S3, etc.)
2. Store URL in `Profile.avatar` field (already exists in backend)
3. Create one `<Avatar>` component that shows image OR falls back to initials/silhouette
4. Use that component everywhere
