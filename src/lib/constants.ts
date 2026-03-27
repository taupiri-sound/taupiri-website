// Site configuration constants
// This file centralizes all site-specific configuration values
// Update these values when setting up a new project

export const SITE_CONFIG = {
  // Production domain - update this for your new project
  // IMPORTANT: Always use HTTPS (not HTTP) and no trailing slash for SEO consistency
  PRODUCTION_DOMAIN: process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com',
} as const;

// Type-safe access to configuration values
export type SiteConfig = typeof SITE_CONFIG;
