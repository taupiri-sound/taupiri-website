# SSG + On-Demand Revalidation Strategy (Next.js + Sanity)

This document describes the static site generation (SSG) and on-demand revalidation strategy used in this project. It is intended as a reference for replicating the same approach in other projects.

## Overview

The goal is a fully static website in production — all pages are pre-rendered and served from cache — while ensuring content changes made in Sanity CMS appear on the live site without a full rebuild.

This is achieved using:

- **Next.js tag-based caching** (`revalidateTag`) — data is cached indefinitely by tag
- **Sanity webhooks** — when content is published, a webhook fires and invalidates the relevant cache tags
- **Draft mode + `SanityLive`** — editors in Sanity Studio get real-time live preview without affecting the public cache
- **Environment-aware fetch** — development uses no caching (`revalidate: 0`), production uses indefinite caching with tags

---

## Architecture Flow

```
Public visitor request
  → Next.js serves cached static page (from Full Route Cache)
  → staticSanityFetch returns cached data (tagged with Sanity _type)

Content editor publishes in Sanity Studio
  → Sanity fires POST webhook → /api/revalidate
  → Webhook validates signature, reads _type from body
  → revalidateTag(_type) invalidates all cache entries for that document type
  → Next visitor request re-fetches fresh data from Sanity, re-caches it

Content editor in Presentation Tool (draft mode)
  → draftMode().isEnabled = true
  → SanityLive provides real-time updates (bypasses static cache)
  → VisualEditing enables click-to-edit overlay
```

---

## Required Environment Variables

```env
# Sanity project config (public)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-29

# Sanity API token for server-side fetching (secret)
SANITY_API_READ_TOKEN=your_read_token

# Shared secret between Sanity webhook config and your app (secret)
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

**Note:** `SANITY_API_READ_TOKEN` must be a token with at least **Viewer** permissions. `SANITY_WEBHOOK_SECRET` must match exactly what is configured in the Sanity webhook dashboard.

---

## Key Files and Their Roles

| File | Role |
|---|---|
| `src/sanity/env.ts` | Reads and validates env vars, throws if missing |
| `src/sanity/lib/token.ts` | Exports the API read token, throws if missing |
| `src/sanity/lib/client.ts` | Creates the base Sanity client (`useCdn: false`) |
| `src/sanity/lib/fetch.ts` | `staticSanityFetch` — environment-aware cached fetch |
| `src/sanity/lib/live.ts` | `sanityFetch` + `SanityLive` for draft mode live preview |
| `src/actions/` | Action functions — call `staticSanityFetch` with cache tags |
| `src/app/api/revalidate/route.ts` | Webhook endpoint — validates and triggers `revalidateTag` |
| `src/app/(frontend)/layout.tsx` | Detects draft mode, conditionally renders `SanityLive` |

---

## Implementation Details

### 1. Sanity Client (`src/sanity/lib/client.ts`)

```ts
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // CRITICAL: must be false for tag-based revalidation to work
  stega: { studioUrl: '/studio' }, // Only needed if using Presentation Tool
});
```

**Why `useCdn: false`?** The Sanity CDN does not support the `next.tags` fetch options that Next.js uses for cache tag tracking. Using the CDN bypasses tag-based revalidation entirely.

---

### 2. Environment-Aware Static Fetch (`src/sanity/lib/fetch.ts`)

```ts
import { client } from './client';
import { token } from './token';

const authenticatedClient = client.withConfig({ token, useCdn: false });

export interface SanityFetchOptions {
  query: string;
  params?: Record<string, unknown> | Promise<Record<string, unknown>>;
  tags?: string[];
}

export async function staticSanityFetch<T = unknown>(
  options: SanityFetchOptions
): Promise<{ data: T }> {
  const { query, params = {}, tags = ['sanity'] } = options;

  const isDev = process.env.NODE_ENV === 'development';

  const data = await authenticatedClient.fetch<T>(query, await params, {
    next: isDev
      ? { revalidate: 0 }           // Dev: no cache, fresh data on every request
      : { tags, revalidate: false }, // Prod: cache indefinitely, invalidate via webhook
  });

  return { data };
}
```

**Key points:**
- In **development**, `revalidate: 0` means every request fetches fresh data from Sanity — no stale content when iterating locally.
- In **production**, `revalidate: false` means data is cached indefinitely. It will only be refreshed when `revalidateTag()` is called by the webhook.
- The authenticated client uses a server-only `token` so private/draft content can be fetched securely.

---

### 3. Token Setup (`src/sanity/lib/token.ts`)

```ts
export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}
```

This throws at startup (not at runtime) so a missing token fails fast rather than silently serving no content.

---

### 4. Live Preview Setup (`src/sanity/lib/live.ts`)

```ts
import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { token } from './token';

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0, // Always fetch fresh in live/draft mode
  },
});
```

`sanityFetch` from `defineLive` is the live-preview equivalent of `staticSanityFetch`. Action functions can accept either as a parameter so the same function works in both static and live contexts.

---

### 5. Action Functions Pattern (`src/actions/`)

Every action function follows the same pattern — it calls `staticSanityFetch` with a query and cache tags. Optionally, it accepts a `fetchFn` parameter so it can be called with `sanityFetch` in live preview contexts.

```ts
import { staticSanityFetch, type FetchFn } from '@/sanity/lib/fetch';
import { HEADER_QUERY } from '@/sanity/lib/queries';
import type { HEADER_QUERY_RESULT } from '@/sanity/types';

export async function getHeader(
  fetchFn: FetchFn = staticSanityFetch
): Promise<HEADER_QUERY_RESULT | null> {
  const { data } = await fetchFn({
    query: HEADER_QUERY,
    tags: ['sanity', 'header'], // Tag with document _type
  });

  return data as HEADER_QUERY_RESULT | null;
}
```

**Tag convention:**
- Always include `'sanity'` as a catch-all tag (lets you invalidate ALL Sanity data at once if needed)
- Always include the Sanity document `_type` as a specific tag (e.g., `'header'`, `'blogPost'`, `'page'`)
- The webhook uses the `_type` from the published document to call `revalidateTag(_type)`, which then invalidates only the relevant cached data

---

### 6. Webhook Endpoint (`src/app/api/revalidate/route.ts`)

```ts
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Missing SANITY_WEBHOOK_SECRET' }, { status: 500 });
  }

  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      _id: string;
      slug?: { current?: string };
    }>(req, WEBHOOK_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'No document type in body' }, { status: 400 });
    }

    // Invalidate all cached data tagged with this document type
    revalidateTag(body._type);

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      id: body._id,
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error processing webhook', error: String(err) },
      { status: 500 }
    );
  }
}
```

**How it works:**
1. Sanity sends a `POST` request to `/api/revalidate` when a document is created, updated, or deleted
2. `parseBody` from `next-sanity/webhook` validates the HMAC signature and parses the body
3. If the signature is valid, `revalidateTag(body._type)` is called
4. Next.js invalidates all cache entries tagged with that `_type`
5. The next request for any page that depends on that data will re-fetch from Sanity and re-cache

**No manual updates needed:** Because every action function tags with its document `_type`, and the webhook revalidates by `_type`, new document types are automatically handled without changing the webhook handler.

---

### 7. Frontend Layout — Draft Mode Detection (`src/app/(frontend)/layout.tsx`)

```tsx
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';

const FrontendLayout = async ({ children }) => {
  // Fetch global data (header, footer, etc.) using staticSanityFetch via action functions
  const [headerData, footerData, ...] = await Promise.all([
    getHeader(),
    getFooter(),
    // ...
  ]);

  // Only render live preview tools when editor is in draft mode
  const draftModeSlot = (await draftMode()).isEnabled ? (
    <>
      <SanityLive />       {/* Enables real-time content updates */}
      <VisualEditingProvider />  {/* Enables click-to-edit overlay */}
      <DisableDraftMode />  {/* UI button to exit draft mode */}
    </>
  ) : null;

  return (
    <BaseLayout ... draftModeSlot={draftModeSlot}>
      {children}
    </BaseLayout>
  );
};
```

**Why check `draftMode()` in the layout?**
- `draftMode()` causes Next.js to opt the layout out of static caching — but only when enabled
- Public visitors (`draftMode().isEnabled = false`) still get statically cached pages
- Sanity editors with draft mode enabled get real-time updates via `SanityLive`
- `SanityLive` must be rendered in the component tree for live updates to work — the layout is the correct place since it wraps all pages

---

## Sanity Webhook Configuration

In the Sanity dashboard, configure a webhook with these settings:

| Setting | Value |
|---|---|
| **Name** | On-demand revalidation (or any label) |
| **URL** | `https://your-domain.com/api/revalidate` |
| **Dataset** | `production` (or your dataset name) |
| **Trigger on** | Create, Update, Delete |
| **Filter** | *(leave empty to trigger for all document types)* |
| **Projection** | `{ _type, _id, slug }` |
| **HTTP method** | POST |
| **HTTP Headers** | None required (signature is in body) |
| **Secret** | The value of your `SANITY_WEBHOOK_SECRET` env var |
| **API version** | `2021-03-25` or later |

The `Projection` field controls what data is sent in the webhook body. At minimum you need `_type` and `_id`. The `slug` is useful if you want to do path-based revalidation in future.

---

## Adding a New Document Type

When you add a new Sanity document type and want it to participate in on-demand revalidation:

1. **Create the action function** with the correct tags:
   ```ts
   export async function getMyNewData(fetchFn: FetchFn = staticSanityFetch) {
     const { data } = await fetchFn({
       query: MY_NEW_QUERY,
       tags: ['sanity', 'myNewDocumentType'], // _type must match Sanity schema name
     });
     return data as MY_NEW_QUERY_RESULT | null;
   }
   ```

2. **No webhook changes needed** — the webhook handler automatically calls `revalidateTag(body._type)` for whatever `_type` it receives.

3. **Verify the tag matches the schema `_type`** — this is the link between the Sanity document and the cache invalidation. If the tag doesn't match the `_type`, the cache will never be invalidated for that document.

---

## Development vs Production Behaviour

| Behaviour | Development | Production |
|---|---|---|
| Cache strategy | `revalidate: 0` (no cache) | `revalidate: false` (indefinite) |
| Content freshness | Fresh on every request | Served from cache until webhook fires |
| Webhook needed? | No | Yes |
| Draft mode | Works (uses `sanityFetch`) | Works (uses `sanityFetch`) |
| CDN usage | No (`useCdn: false`) | No (`useCdn: false`) |

---

## Common Mistakes to Avoid

- **`useCdn: true` on the Sanity client** — breaks tag-based revalidation. Always use `useCdn: false`.
- **Missing or mismatched `SANITY_WEBHOOK_SECRET`** — the webhook will always return 401 and revalidation will never happen.
- **Forgetting to tag action functions** — without tags, `revalidateTag()` has nothing to invalidate.
- **Mismatched tag vs `_type`** — if you tag with `'blog-post'` but the Sanity schema `_type` is `'blogPost'`, the cache will never revalidate for that type.
- **Using `revalidate: 0` or `cache: 'no-store'` in production** — bypasses the caching entirely, making every page request hit Sanity directly. Use `revalidate: false` with tags instead.
- **Calling `draftMode()` or `cookies()` in a page that should be statically cached** — these opt the page into dynamic rendering. Keep them in the layout (conditionally) and out of page files.

---

## Package Dependencies

```json
{
  "next": "^15.x",
  "next-sanity": "^9.x",
  "@sanity/client": "^6.x"
}
```

The `next-sanity` package provides:
- `createClient` / `createSanityClient` wrappers
- `parseBody` for webhook signature validation
- `defineLive` for live preview (`SanityLive`, `sanityFetch`)
- `stegaClean` for string comparisons in live preview contexts
