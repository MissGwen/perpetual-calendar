---
name: new-component
description: Scaffold a new React component under src/components following this project's conventions — kebab-case filename, named export, a typed Props interface, the cn() helper for class names, and a colocated Vitest test. Use whenever the user asks to create, add, or generate a new UI component.
allowed-tools: Read, Glob, Grep, Write, Edit, Bash
---

# new-component

When asked to create a new component, mirror the conventions already used across
`src/components` (see `calendar/date-cell.tsx`, `layout/header.tsx`). Do not invent new
patterns.

## Conventions

1. **Location & file naming** — files are **kebab-case**; every component lives under an
   area folder, never loose in `components/`:
   - `ui/` — shadcn/ui primitives (owned by the shadcn CLI; don't hand-write here)
   - `<feature>/` — feature components, e.g. `calendar/`
   - `layout/` — app shell (header, footers, players, …)
   - Single component → `src/components/<area>/<name>.tsx`, e.g. `calendar/date-cell.tsx`

2. **Barrel** — each area folder exposes one `index.ts` re-exporting its **public**
   components. The file is kebab-case, the export stays PascalCase:

   ```ts
   export { Calendar } from './calendar';
   export { DateDetail } from './date-detail';
   ```

   Keep private sub-components (only used inside the folder) out of the barrel.

3. **Export** — always a **named** export, never `export default`:

   ```tsx
   export function <Name>(props: <Name>Props) { ... }
   ```

4. **Props** — a typed interface named `<Name>Props`, declared above the component.

5. **Class names** — compose with `cn()` (clsx + tailwind-merge) from `@/lib/utils`,
   using the `condition && 'classes'` pattern for conditional styles:

   ```tsx
   className={cn('base classes', isActive && 'active classes')}
   ```

6. **Server vs Client**
   - Presentational / server-data only → leave it a Server Component (no directive);
     make it `async` if it awaits data.
   - Uses state, effects, or handlers (`useState`, `onClick`, …) → add `'use client'`
     as the first line.
   - Needs **both** server data and interactivity → split it: a Server Component fetches
     and passes props to a `<Name>Client` child
     (see `layout/header.tsx` → `layout/header-client.tsx`).

7. **Tests** — colocate a Vitest test next to the component: `<name>.test.tsx`.
   Run with `pnpm run test:run`.

8. **Imports** — `@/*` is aliased to `src/*` (e.g. `@/lib/utils`, `@/lib/auth`,
   `@/types/calendar`, `@/constants/explanations`); use sibling-relative imports
   (`./date-cell`) only within the same folder.

9. **Comments** — match the surrounding density; mixed Chinese/English is fine.

## Template (client-interactive, presentational)

```tsx
'use client';

import { cn } from '@/lib/utils';

interface GreetingProps {
  name: string;
  highlighted?: boolean;
}

export function Greeting({ name, highlighted }: GreetingProps) {
  return <div className={cn('rounded-xl p-2', highlighted && 'bg-primary/10')}>Hello, {name}</div>;
}
```

## Before finishing — checklist

- [ ] File is kebab-case under the right area folder (`<area>/<name>.tsx`)
- [ ] Named export + `<Name>Props` interface
- [ ] `cn()` from `@/lib/utils` used for any conditional class names
- [ ] `'use client'` present **iff** the component uses state / effects / handlers
- [ ] Colocated `<name>.test.tsx` added
- [ ] Area `index.ts` barrel re-exports it (if it's public)

> If the component uses Next.js-specific APIs, first check `AGENTS.md` — this project pins
> a Next.js version with breaking changes, and its guide lives in `node_modules/next/dist/docs/`.
