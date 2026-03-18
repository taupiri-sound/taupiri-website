import { staticSanityFetch, type FetchFn } from '@/sanity/lib/fetch';
import {
  BLOG_POSTS_QUERY,
  BLOG_INDEX_PAGE_QUERY,
  BLOG_POST_QUERY,
  ALL_BLOG_POSTS_SLUGS_QUERY,
  ADJACENT_BLOG_POSTS_QUERY,
} from '@/sanity/lib/queries';
import type {
  BLOG_POSTS_QUERYResult,
  BLOG_INDEX_PAGE_QUERYResult,
  BLOG_POST_QUERYResult,
  ALL_BLOG_POSTS_SLUGS_QUERYResult,
  ADJACENT_BLOG_POSTS_QUERYResult,
} from '@/sanity/types';

export async function getAllBlogPosts(fetchFn: FetchFn = staticSanityFetch): Promise<BLOG_POSTS_QUERYResult> {
  const { data } = await fetchFn({
    query: BLOG_POSTS_QUERY,
    tags: ['sanity', 'blogPost'],
  });

  return data as BLOG_POSTS_QUERYResult;
}

export async function getBlogIndexPage(fetchFn: FetchFn = staticSanityFetch): Promise<BLOG_INDEX_PAGE_QUERYResult | null> {
  const { data } = await fetchFn({
    query: BLOG_INDEX_PAGE_QUERY,
    tags: ['sanity', 'blogIndexPage'],
  });

  return data as BLOG_INDEX_PAGE_QUERYResult | null;
}

export async function getBlogPostBySlug(slug: string, fetchFn: FetchFn = staticSanityFetch): Promise<BLOG_POST_QUERYResult | null> {
  const { data } = await fetchFn({
    query: BLOG_POST_QUERY,
    params: { slug },
    tags: ['sanity', 'blogPost'],
  });

  return data as BLOG_POST_QUERYResult | null;
}

export async function getAllBlogPostsForSitemap(fetchFn: FetchFn = staticSanityFetch): Promise<ALL_BLOG_POSTS_SLUGS_QUERYResult> {
  const { data } = await fetchFn({
    query: ALL_BLOG_POSTS_SLUGS_QUERY,
    tags: ['sanity', 'blogPost'],
  });

  return data as ALL_BLOG_POSTS_SLUGS_QUERYResult;
}

export async function getAdjacentBlogPosts(slug: string, fetchFn: FetchFn = staticSanityFetch): Promise<ADJACENT_BLOG_POSTS_QUERYResult> {
  const { data } = await fetchFn({
    query: ADJACENT_BLOG_POSTS_QUERY,
    params: { slug },
    tags: ['sanity', 'blogPost'],
  });

  return data as ADJACENT_BLOG_POSTS_QUERYResult;
}
