import React from 'react';
import { Chau_Philomene_One } from 'next/font/google';
import '@/app/globals.css';
import { SITE_CONFIG } from '@/lib/constants';

const chauPhilomeneOne = Chau_Philomene_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.PRODUCTION_DOMAIN;

  // Basic organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.ORGANIZATION_NAME,
    url: baseUrl,
    description: SITE_CONFIG.ORGANIZATION_DESCRIPTION,
  };

  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {!isProd && <meta name='robots' content='noindex, nofollow' />}

        {/* Resource hints for performance */}
        <link rel='dns-prefetch' href='//cdn.sanity.io' />
        <link rel='preconnect' href='https://cdn.sanity.io' crossOrigin='anonymous' />

        {/* Critical CSS inline for faster LCP - Simplified for maintainability */}
        {/*
          ⚠️  IMPORTANT: Only essential layout styles are duplicated from src/app/globals.css
          ⚠️  When changing these critical values, update BOTH:
          ⚠️  1. This inline critical CSS (for performance)
          ⚠️  2. The corresponding styles in src/app/globals.css (for consistency)
          ⚠️
          ⚠️  DUPLICATED STYLES: header positioning, main padding, scroll padding, brand colors
        */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical layout-only styles - KEEP IN SYNC with globals.css */
            html {
              scroll-padding-top: 5rem; 
            }

            @media (min-width: 768px) {
              html {
                scroll-padding-top: 6rem; 
              }
            }

            body { margin: 0; padding: 0; }

            /* Essential brand colors for immediate render */
            :root {
              --color-brand-primary: #900000;
              --color-brand-secondary: #430c08;
            }
          `,
          }}
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${chauPhilomeneOne.className} text-body-base text-subtle bg-gray-50`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
