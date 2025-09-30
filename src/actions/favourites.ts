import { sanityFetch } from '@/sanity/lib/live';
import { FAVOURITES_ALL_QUERY, FAVOURITES_INDEX_PAGE_QUERY } from '@/sanity/lib/queries';
import type { FAVOURITES_ALL_QUERYResult, FAVOURITES_INDEX_PAGE_QUERYResult } from '@/sanity/types';

export async function getFavourites() {
  const { data } = await sanityFetch<FAVOURITES_ALL_QUERYResult>({
    query: FAVOURITES_ALL_QUERY,
  });
  return data;
}

export async function getAllFavourites() {
  const { data } = await sanityFetch<FAVOURITES_ALL_QUERYResult>({
    query: FAVOURITES_ALL_QUERY,
  });
  return data;
}

export async function getFavouritesIndexPage() {
  const { data } = await sanityFetch<FAVOURITES_INDEX_PAGE_QUERYResult | null>({
    query: FAVOURITES_INDEX_PAGE_QUERY,
  });
  return data;
}