// Site configuration constants
// This file centralizes all site-specific configuration values
// Update these values when setting up a new project

export const SITE_CONFIG = {
  // Production domain - update this for your new project
  // IMPORTANT: Always use HTTPS (not HTTP) and no trailing slash for SEO consistency
  PRODUCTION_DOMAIN: process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com',

  // Contact information - single source of truth for all company contact details
  ORGANISATION_EMAIL: {
    value: 'lance@taupirisound.co.nz',
    link: 'mailto:lance@taupirisound.co.nz',
  },
  ORGANISATION_PHONE: { value: '+64 21 311 903', link: 'tel:+6421311903' },
  ORGANISATION_ADDRESS: {
    value: 'Topview Road, Taupiri 3792, New Zealand',
    link: 'https://maps.app.goo.gl/AXFyaZad32c1c2sx6',
  },

  // Business Location Details - Used for LocalBusiness structured data (SEO)
  // Update these values if the studio relocates or business details change
  BUSINESS_LOCATION: {
    streetAddress: 'Topview Road',
    addressLocality: 'Taupiri',
    postalCode: '3792',
    addressRegion: 'Waikato',
    addressCountry: 'NZ',
    // GPS coordinates from Google Maps - used for local SEO and map integration
    latitude: -37.5940869,
    longitude: 175.2095489,
    // ISO 3166-2 region code for Waikato, New Zealand
    regionCode: 'NZ-WKO',
  },

  // Business Hours - Used for LocalBusiness structured data
  BUSINESS_HOURS: 'By Appointment Only',

  // Price Range - Used for LocalBusiness structured data
  // Leave as empty string ('') to omit from schema if pricing varies
  // Valid values: '$', '$$', '$$$', '$$$$' or descriptive text
  PRICE_RANGE: '',

  // Service Areas - Geographic areas served by the business
  // Used for LocalBusiness structured data to improve local/regional SEO
  // Add or remove cities/regions as needed
  SERVICE_AREAS: [
    { type: 'Country', name: 'New Zealand' },
    { type: 'State', name: 'Waikato' },
    { type: 'City', name: 'Hamilton' },
    { type: 'City', name: 'Auckland' },
  ],

  // Social Media Profiles - Used for LocalBusiness structured data
  // Add additional social media URLs as they become available
  SOCIAL_MEDIA_PROFILES: ['https://www.facebook.com/taupirisound/'],

} as const;

// Type-safe access to configuration values
export type SiteConfig = typeof SITE_CONFIG;
