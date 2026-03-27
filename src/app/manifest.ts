import type { MetadataRoute } from 'next';
import { getBusinessInfo } from '@/actions';

/**
 * Web App Manifest - Enables "Add to Home Screen" functionality
 *
 * This manifest allows users to install the Taupiri Sound website as a Progressive Web App (PWA)
 * on mobile devices, providing an app-like experience.
 *
 * PWA name and description are sourced from Business & Contact Info in Sanity.
 * Theme and background colors are hard-coded to match brand colors in globals.css.
 *
 * The icon is sourced dynamically from the Sanity favicon field in Business & Contact Info.
 * If no favicon is set, no icons are included in the manifest.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const businessInfo = await getBusinessInfo();
  const faviconUrl = businessInfo?.favicon?.asset?.url ?? null;
  const name = businessInfo?.organisationName ?? '';
  const description = businessInfo?.organisationDescription ?? '';

  return {
    name,
    short_name: name,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#430c08', // --color-brand-secondary
    theme_color: '#900000', // --color-brand-primary
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
