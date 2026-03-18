import { staticSanityFetch, type FetchFn } from '@/sanity/lib/fetch';
import { HOME_PAGE_QUERY, PAGE_QUERY, ALL_PAGES_QUERY } from '@/sanity/lib/queries';
import type { HOME_PAGE_QUERYResult, PAGE_QUERYResult, ALL_PAGES_QUERYResult } from '@/sanity/types';

export async function getHomePage(fetchFn: FetchFn = staticSanityFetch): Promise<HOME_PAGE_QUERYResult | null> {
  const { data } = await fetchFn({
    query: HOME_PAGE_QUERY,
    tags: ['sanity', 'homePage'],
  });

  return data as HOME_PAGE_QUERYResult | null;
}

export async function getPageBySlug(slug: string, fetchFn: FetchFn = staticSanityFetch): Promise<PAGE_QUERYResult | null> {
  const { data } = await fetchFn({
    query: PAGE_QUERY,
    params: { slug },
    tags: ['sanity', 'page'],
  });

  return data as PAGE_QUERYResult | null;
}

export async function getAllPages(fetchFn: FetchFn = staticSanityFetch): Promise<ALL_PAGES_QUERYResult> {
  const { data } = await fetchFn({
    query: ALL_PAGES_QUERY,
    tags: ['sanity', 'page'],
  });

  return data as ALL_PAGES_QUERYResult;
}
