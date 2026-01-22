# Avatar Question - RESOLVED

## Claude Asked:

> "Does your User or Profile model have an avatar field? If so, we could add it to the serializer in one line. If not, initials are the way to go."

## My Answer:

Yes, Profile has an avatar field but it's empty — I'm not using images.

I'm using **context-dependent avatars**:

| Context       | Avatar Type               | Why                               |
| ------------- | ------------------------- | --------------------------------- |
| Feed/Timeline | Silhouette (`<UserIcon>`) | Uniform look, eye follows content |
| Friends page  | Initials ("JD")           | Need to distinguish individuals   |
| Messages      | Initials ("JD")           | Need to tell conversations apart  |

For messaging, the API returning `username`, `first_name`, `last_name` is enough for me to calculate initials on the frontend. No need to add avatar to the serializer.

## The getInitials Helper

```jsx
const getInitials = (firstName, lastName, username) => {
  if (firstName && lastName)
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName.slice(0, 2).toUpperCase();
  return username.slice(0, 2).toUpperCase();
};
```

Use this in messaging components to show initials for conversation partners.

Consider:

- Code simplicity
- Visual appeal
- User experience (can users tell people apart?)
- Maintainability

What do you recommend and why?
