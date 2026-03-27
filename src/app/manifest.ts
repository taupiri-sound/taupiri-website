import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getBusinessInfo } from '@/actions';

/**
 * Web App Manifest - Enables "Add to Home Screen" functionality
 *
 * This manifest allows users to install the Taupiri Sound website as a Progressive Web App (PWA)
 * on mobile devices, providing an app-like experience.
 *
 * PWA settings (name, colors, description) are centralized in SITE_CONFIG.PWA_MANIFEST
 * in constants.ts for easy maintenance. Update constants.ts to change PWA configuration.
 *
 * The icon is sourced dynamically from the Sanity favicon field in Business & Contact Info.
 * If no favicon is set, no icons are included in the manifest.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const businessInfo = await getBusinessInfo();
  const faviconUrl = businessInfo?.favicon?.asset?.url ?? null;

  return {
    name: SITE_CONFIG.PWA_MANIFEST.name,
    short_name: SITE_CONFIG.PWA_MANIFEST.shortName,
    description: SITE_CONFIG.PWA_MANIFEST.description,
    start_url: '/',
    display: 'standalone',
    background_color: SITE_CONFIG.PWA_MANIFEST.backgroundColor,
    theme_color: SITE_CONFIG.PWA_MANIFEST.themeColor,
    icons: faviconUrl
      ? [
          {
            src: faviconUrl,
            sizes: 'any',
            type: 'image/png',
            purpose: 'any',
          },
        ]
      : [],
  };
}
