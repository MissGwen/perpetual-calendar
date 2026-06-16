---
name: new-route
description: Scaffold a new App Router route under src/app following this project's conventions — a server-first page, optional loading/error/not-found, SEO metadata, or a typed route handler (API endpoint). Use whenever the user asks to add a new page, screen, route, or API endpoint.
allowed-tools: Read, Glob, Grep, Write, Edit, Bash
---

# new-route

Scaffold routes the way `src/app` already does (see `app/page.tsx`, `app/layout.tsx`,
`app/api/ai-analysis/route.ts`). This project pins a Next.js version with breaking
changes — **before using any Next.js API, read the matching guide in
`node_modules/next/dist/docs/`** (App Router lives under `01-app/`).

## Conventions

1. **Location** — one folder per URL segment under `src/app`, kebab-case:
   - Page → `src/app/<segment>/page.tsx`
   - Nested page → `src/app/<segment>/<child>/page.tsx`
   - Dynamic segment → `src/app/<segment>/[id]/page.tsx`
   - Route handler (API) → `src/app/api/<segment>/route.ts`
   - Organize without touching the URL → route group `src/app/(group)/…`

2. **Server-first** — `page.tsx` / `layout.tsx` are **Server Components** by default
   (no `'use client'`). Fetch data directly with `async`/`await`. Push interactivity into
   a `'use client'` child and pass server data down as props
   (mirror `components/layout/header.tsx` → `header-client.tsx`).

3. **Metadata** — export `metadata` (static) or `generateMetadata` (dynamic) from a
   page/layout for SEO, matching the style in `app/layout.tsx`.

4. **Colocate special files only when the route needs them** — don't scaffold empty ones:
   - `loading.tsx` — Suspense fallback
   - `error.tsx` — error boundary (must be `'use client'`, props `{ error, reset }`)
   - `not-found.tsx` — 404 UI

5. **Route handlers** — export named HTTP methods (`GET`, `POST`, …) from `route.ts`,
   typed `(req: Request)`. Read secrets via `@/env` (never `process.env` directly), reach
   integrations through `@/lib/*` (`@/lib/db/*`, `@/lib/ai/*`, `@/lib/auth`), and return a
   `Response`. See `app/api/ai-analysis/route.ts`.

6. **Imports** — `@/*` → `src/*`. Shared logic from `@/lib/*`, types from `@/types/*`,
   static data from `@/constants/*`.

## Page template (server component)

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '…',
  description: '…',
};

export default async function <Name>Page() {
  return <main className="container mx-auto px-4 py-8">…</main>;
}
```

## Route handler template

```ts
import { env } from '@/env';

export async function GET(req: Request) {
  return Response.json({ ok: true });
}
```

## Before finishing — checklist

- [ ] Folder/segment is kebab-case under `src/app`
- [ ] `page.tsx` stays a Server Component unless it genuinely needs interactivity
- [ ] `metadata` / `generateMetadata` exported for pages
- [ ] Secrets read through `@/env`, integrations via `@/lib/*` — never `process.env`
- [ ] `loading` / `error` / `not-found` added only where the route actually needs them
- [ ] Checked `node_modules/next/dist/docs/` for any Next.js API used
