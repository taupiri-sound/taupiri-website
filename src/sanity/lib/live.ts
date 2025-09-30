// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { client } from './client';

// For next-sanity v11+, create a wrapper that matches the expected API
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}) {
  const data = await client.fetch<QueryResponse>(query, params, {
    next: { revalidate: 0 }, // Disable caching for draft mode compatibility
  });

  return { data };
}

// Create a placeholder SanityLive component for v11+
// In v11+, live updates work differently and may not require this component
export const SanityLive = () => null;
