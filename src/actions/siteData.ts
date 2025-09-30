import { sanityFetch } from '@/sanity/lib/live';
import { HEADER_QUERY, FOOTER_QUERY, SITE_SETTINGS_QUERY, COMPANY_LINKS_QUERY, LEGAL_PAGES_VISIBILITY_QUERY } from '@/sanity/lib/queries';
import type { FOOTER_QUERYResult, HEADER_QUERYResult, SITE_SETTINGS_QUERYResult, COMPANY_LINKS_QUERYResult, LEGAL_PAGES_VISIBILITY_QUERYResult } from '@/sanity/types';

// Header actions
export async function getHeader(): Promise<HEADER_QUERYResult | null> {
  const { data } = await sanityFetch<HEADER_QUERYResult | null>({
    query: HEADER_QUERY,
  });

  return data;
}

// Footer actions
export async function getFooter(): Promise<FOOTER_QUERYResult | null> {
  const { data } = await sanityFetch<FOOTER_QUERYResult | null>({
    query: FOOTER_QUERY,
  });

  return data;
}

// Site Settings actions
export async function getSiteSettings(): Promise<SITE_SETTINGS_QUERYResult | null> {
  const { data } = await sanityFetch<SITE_SETTINGS_QUERYResult | null>({
    query: SITE_SETTINGS_QUERY,
  });

  return data;
}

// Company Links actions
export async function getCompanyLinks(): Promise<COMPANY_LINKS_QUERYResult | null> {
  const { data } = await sanityFetch<COMPANY_LINKS_QUERYResult | null>({
    query: COMPANY_LINKS_QUERY,
  });

  return data;
}

// Legal Pages Visibility actions
export async function getLegalPagesVisibility(): Promise<LEGAL_PAGES_VISIBILITY_QUERYResult | null> {
  const { data } = await sanityFetch<LEGAL_PAGES_VISIBILITY_QUERYResult | null>({
    query: LEGAL_PAGES_VISIBILITY_QUERY,
  });

  return data;
}
