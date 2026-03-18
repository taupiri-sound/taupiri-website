import { staticSanityFetch, type FetchFn } from '@/sanity/lib/fetch';
import { HEADER_QUERY, FOOTER_QUERY, SITE_SETTINGS_QUERY, COMPANY_LINKS_QUERY, CONTACT_FORM_SETTINGS_QUERY, LEGAL_PAGES_VISIBILITY_QUERY, CLIENTS_QUERY, EQUIPMENT_LIST_QUERY, TEAM_MEMBERS_QUERY, ALL_PROJECTS_QUERY, FEATURED_PROJECTS_QUERY } from '@/sanity/lib/queries';
import type { FOOTER_QUERYResult, HEADER_QUERYResult, SITE_SETTINGS_QUERYResult, COMPANY_LINKS_QUERYResult, CONTACT_FORM_SETTINGS_QUERYResult, LEGAL_PAGES_VISIBILITY_QUERYResult, CLIENTS_QUERYResult, EQUIPMENT_LIST_QUERYResult, TEAM_MEMBERS_QUERYResult, ALL_PROJECTS_QUERYResult, FEATURED_PROJECTS_QUERYResult } from '@/sanity/types';

// Header actions
export async function getHeader(fetchFn: FetchFn = staticSanityFetch): Promise<HEADER_QUERYResult | null> {
  const { data } = await fetchFn({
    query: HEADER_QUERY,
    tags: ['sanity', 'header'],
  });

  return data as HEADER_QUERYResult | null;
}

// Footer actions
export async function getFooter(fetchFn: FetchFn = staticSanityFetch): Promise<FOOTER_QUERYResult | null> {
  const { data } = await fetchFn({
    query: FOOTER_QUERY,
    tags: ['sanity', 'footer'],
  });

  return data as FOOTER_QUERYResult | null;
}

// Site Settings actions
export async function getSiteSettings(fetchFn: FetchFn = staticSanityFetch): Promise<SITE_SETTINGS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: SITE_SETTINGS_QUERY,
    tags: ['sanity', 'siteSettings'],
  });

  return data as SITE_SETTINGS_QUERYResult | null;
}

// Company Links actions
export async function getCompanyLinks(fetchFn: FetchFn = staticSanityFetch): Promise<COMPANY_LINKS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: COMPANY_LINKS_QUERY,
    tags: ['sanity', 'companyLinks'],
  });

  return data as COMPANY_LINKS_QUERYResult | null;
}

// Contact Form Settings actions
export async function getContactFormSettings(fetchFn: FetchFn = staticSanityFetch): Promise<CONTACT_FORM_SETTINGS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: CONTACT_FORM_SETTINGS_QUERY,
    tags: ['sanity', 'contactFormSettings'],
  });

  return data as CONTACT_FORM_SETTINGS_QUERYResult | null;
}

// Legal Pages Visibility actions
export async function getLegalPagesVisibility(fetchFn: FetchFn = staticSanityFetch): Promise<LEGAL_PAGES_VISIBILITY_QUERYResult | null> {
  const { data } = await fetchFn({
    query: LEGAL_PAGES_VISIBILITY_QUERY,
    tags: ['sanity', 'termsAndConditions', 'privacyPolicy'],
  });

  return data as LEGAL_PAGES_VISIBILITY_QUERYResult | null;
}

// Clients actions
export async function getClients(fetchFn: FetchFn = staticSanityFetch): Promise<CLIENTS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: CLIENTS_QUERY,
    tags: ['sanity', 'clients'],
  });

  return data as CLIENTS_QUERYResult | null;
}

// Equipment List actions
export async function getEquipmentList(fetchFn: FetchFn = staticSanityFetch): Promise<EQUIPMENT_LIST_QUERYResult | null> {
  const { data } = await fetchFn({
    query: EQUIPMENT_LIST_QUERY,
    tags: ['sanity', 'equipmentListSingleton'],
  });

  return data as EQUIPMENT_LIST_QUERYResult | null;
}

// Team Members actions
export async function getTeamMembers(fetchFn: FetchFn = staticSanityFetch): Promise<TEAM_MEMBERS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: TEAM_MEMBERS_QUERY,
    tags: ['sanity', 'teamMember'],
  });

  return data as TEAM_MEMBERS_QUERYResult | null;
}

// Projects actions
export async function getAllProjects(fetchFn: FetchFn = staticSanityFetch): Promise<ALL_PROJECTS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: ALL_PROJECTS_QUERY,
    tags: ['sanity', 'project'],
  });

  return data as ALL_PROJECTS_QUERYResult | null;
}

export async function getFeaturedProjects(projectIds: string[], fetchFn: FetchFn = staticSanityFetch): Promise<FEATURED_PROJECTS_QUERYResult | null> {
  const { data } = await fetchFn({
    query: FEATURED_PROJECTS_QUERY,
    params: { projectIds },
    tags: ['sanity', 'project'],
  });

  return data as FEATURED_PROJECTS_QUERYResult | null;
}
