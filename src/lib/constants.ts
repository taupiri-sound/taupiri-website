// Site configuration constants
// This file centralizes all site-specific configuration values
// Update these values when setting up a new project

export const SITE_CONFIG = {
  // Production domain - update this for your new project
  PRODUCTION_DOMAIN: 'http://taupirisound.co.nz/',

  // Maintenance Mode - Enable to show placeholder page instead of full site
  // When true: All routes redirect to maintenance page (except /studio)
  // When false: Site operates normally
  MAINTENANCE_MODE_ENABLED: false,

  // Organization information
  ORGANIZATION_NAME: 'Taupiri Sound',
  ORGANIZATION_DESCRIPTION:
    "Taupiri Sound is a recording studio based in the countryside of northern Waikato. For over a decade we have worked on countless projects from educational resources to some of Aotearoa's best artists.",

  // Contact information - single source of truth for all company contact details
  ORGANIZATION_EMAIL: {
    value: 'lance@taupirisound.co.nz',
    link: 'mailto:lance@taupirisound.co.nz',
  },
  ORGANIZATION_PHONE: { value: '+64 21 311 903', link: 'tel:+6421311903' },
  ORGANIZATION_ADDRESS: {
    value: 'Topview Road, Taupiri 3792, New Zealand',
    link: 'https://maps.app.goo.gl/AXFyaZad32c1c2sx6',
  },
} as const;

// Type-safe access to configuration values
export type SiteConfig = typeof SITE_CONFIG;
