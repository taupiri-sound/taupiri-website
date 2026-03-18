import { client } from './client';
import { token } from './token';

const authenticatedClient = client.withConfig({ token, useCdn: false });

export interface SanityFetchOptions {
  query: string;
  params?: Record<string, unknown> | Promise<Record<string, unknown>>;
  tags?: string[];
}

export type FetchFn = (options: SanityFetchOptions) => Promise<{ data: unknown }>;

export async function staticSanityFetch<T = unknown>(
  options: SanityFetchOptions
): Promise<{ data: T }> {
  const { query, params = {}, tags = ['sanity'] } = options;

  const isDev = process.env.NODE_ENV === 'development';

  const data = await authenticatedClient.fetch<T>(query, await params, {
    next: isDev
      ? { revalidate: 0 }            // Dev: fresh on every request
      : { tags, revalidate: false }, // Prod: cache indefinitely, invalidate via webhook
  });

  return { data };
}
