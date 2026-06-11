---
name: new-component
description: Scaffold a new React component under src/components following this project's conventions — named export, a typed Props interface, the cn() helper for class names, and a colocated Vitest test. Use whenever the user asks to create, add, or generate a new UI component.
allowed-tools: Read, Glob, Grep, Write, Edit, Bash
---

# new-component

When asked to create a new component, mirror the conventions already used across
`src/components` (see `DateCell.tsx`, `header/Header.tsx`). Do not invent new patterns.

## Conventions

1. **Location**
   - Single file → `src/components/<Name>.tsx`
   - Multi-part component → folder `src/components/<name>/` with a barrel `index.ts`:
     ```ts
     export { <Name> } from './<Name>';
     ```

2. **Export** — always a **named** export, never `export default`:

   ```tsx
   export function <Name>(props: <Name>Props) { ... }
   ```

3. **Props** — a typed interface named `<Name>Props`, declared above the component.

4. **Class names** — compose with `cn()` (clsx + tailwind-merge) from `@/src/utils/cn`,
   using the `condition && 'classes'` pattern for conditional styles:

   ```tsx
   className={cn('base classes', isActive && 'active classes')}
   ```

5. **Server vs Client**
   - Presentational / server-data only → leave it a Server Component (no directive);
     make it `async` if it awaits data.
   - Uses state, effects, or handlers (`useState`, `onClick`, …) → add `'use client'`
     as the first line.
   - Needs **both** server data and interactivity → split it: a Server Component fetches
     and passes props to a `<Name>Client` child
     (see `header/Header.tsx` → `header/HeaderClient.tsx`).

6. **Tests** — colocate a Vitest test next to the component: `<Name>.test.tsx`.
   Run with `pnpm run test:run`.

7. **Imports** — `@/*` is aliased to the project root (e.g. `@/src/lib/auth`);
   short relative imports (`../utils/cn`) are also fine within `src`.

8. **Comments** — match the surrounding density; mixed Chinese/English is fine.

## Template (client-interactive, presentational)

```tsx
'use client';

import { cn } from '@/src/utils/cn';

interface GreetingProps {
  name: string;
  highlighted?: boolean;
}

export function Greeting({ name, highlighted }: GreetingProps) {
  return <div className={cn('rounded-xl p-2', highlighted && 'bg-primary/10')}>Hello, {name}</div>;
}
```

## Before finishing — checklist

- [ ] Named export + `<Name>Props` interface
- [ ] `cn()` used for any conditional class names
- [ ] `'use client'` present **iff** the component uses state / effects / handlers
- [ ] Colocated `<Name>.test.tsx` added
- [ ] Folder component? `index.ts` barrel re-exports it

> If the component uses Next.js-specific APIs, first check `AGENTS.md` — this project pins
> a Next.js version with breaking changes, and its guide lives in `node_modules/next/dist/docs/`.
