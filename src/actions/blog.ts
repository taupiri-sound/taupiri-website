import { sanityFetch } from '@/sanity/lib/live';
import { BLOG_POSTS_QUERY, BLOG_INDEX_PAGE_QUERY, BLOG_POST_QUERY, ALL_BLOG_POSTS_SLUGS_QUERY, ADJACENT_BLOG_POSTS_QUERY } from '@/sanity/lib/queries';
import type {
  BLOG_POSTS_QUERYResult,
  BLOG_INDEX_PAGE_QUERYResult,
  BLOG_POST_QUERYResult,
  ALL_BLOG_POSTS_SLUGS_QUERYResult,
  ADJACENT_BLOG_POSTS_QUERYResult
} from '@/sanity/types';

// Server-side function using live queries (for use in server components)
export async function getAllBlogPosts() {
  const { data: posts } = await sanityFetch<BLOG_POSTS_QUERYResult>({
    query: BLOG_POSTS_QUERY,
  });

  return posts;
}

// Server-side function to get blog index page data
export async function getBlogIndexPage() {
  const { data: page } = await sanityFetch<BLOG_INDEX_PAGE_QUERYResult | null>({
    query: BLOG_INDEX_PAGE_QUERY,
  });

  return page;
}

// Server-side function to get a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const { data: post } = await sanityFetch<BLOG_POST_QUERYResult | null>({
    query: BLOG_POST_QUERY,
    params: { slug },
  });

  return post;
}

// Server-side function to get all blog posts for sitemap
export async function getAllBlogPostsForSitemap() {
  const { data: posts } = await sanityFetch<ALL_BLOG_POSTS_SLUGS_QUERYResult>({
    query: ALL_BLOG_POSTS_SLUGS_QUERY,
  });

  return posts;
}

// Server-side function to get adjacent blog posts (prev/next)
export async function getAdjacentBlogPosts(slug: string) {
  const { data } = await sanityFetch<ADJACENT_BLOG_POSTS_QUERYResult>({
    query: ADJACENT_BLOG_POSTS_QUERY,
    params: { slug },
  });

  return data;
}