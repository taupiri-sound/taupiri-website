// Site configuration constants
// This file centralizes all site-specific configuration values
// Update these values when setting up a new project

export const SITE_CONFIG = {
  // Production domain - update this for your new project
  PRODUCTION_DOMAIN: 'http://taupirisound.co.nz/',

  // Organization information
  ORGANIZATION_NAME: 'Taupriri Sound',
  ORGANIZATION_DESCRIPTION:
    "Taupiri Sound is a recording studio based in the countryside of northern Waikato. For over a decade we have worked on countless projects from educational resources to some of Aotearoa's best artists.",

  // Contact information
  ORGANIZATION_EMAIL: 'lance@taupirisound.co.nz',
} as const;

// Type-safe access to configuration values
export type SiteConfig = typeof SITE_CONFIG;
