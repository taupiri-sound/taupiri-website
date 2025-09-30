import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { COLLAB_QUERY, COLLABS_SLUGS_QUERY, COLLABS_ALL_QUERY, COLLABS_SITEMAP_QUERY } from '@/sanity/lib/queries';

// Server-side function to get a single collaboration by slug
export async function getCollab(slug: string) {
  const { data: collab } = await sanityFetch({
    query: COLLAB_QUERY,
    params: { slug },
  });

  return collab;
}

// Server-side function to get all collaboration slugs (for static generation)
export async function getCollabSlugs() {
  const { data: slugs } = await sanityFetch({
    query: COLLABS_SLUGS_QUERY,
  });

  return slugs;
}

// Function for static generation - uses regular client to avoid draftMode issues
export async function getCollabSlugsForGeneration() {
  const slugs = await client.fetch(`*[_type == "collab" && defined(slug.current)]{ 
    "slug": slug.current
  }`);
  return slugs;
}

// Server-side function to get all collaborations
export async function getCollabs() {
  const { data: collabs } = await sanityFetch({
    query: COLLABS_ALL_QUERY,
  });

  return collabs;
}

// Server-side function to get all collaborations for sitemap
export async function getCollabsForSitemap() {
  const { data: collabs } = await sanityFetch({
    query: COLLABS_SITEMAP_QUERY,
  });

  return collabs;
}