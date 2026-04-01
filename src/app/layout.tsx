import React from 'react';
import { Saira_Condensed, Chau_Philomene_One } from 'next/font/google';
import Script from 'next/script';
import '@/app/globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { getBusinessInfo } from '@/actions';

const sairaCondensed = Saira_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const chauPhilomeneOne = Chau_Philomene_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-chau',
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  // Use consistent baseUrl - will use NEXT_PUBLIC_BASE_URL if set, otherwise SITE_CONFIG.PRODUCTION_DOMAIN
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_CONFIG.PRODUCTION_DOMAIN;

  // Only show robots meta tag if:
  // 1. NOT in production (always hide), OR
  // 2. In production AND maintenance mode is OFF
  const shouldHideFromRobots = !isProd || process.env.MAINTENANCE_MODE_ENABLED === 'true';

  const businessInfo = await getBusinessInfo();

  const faviconUrl = businessInfo?.favicon?.asset?.url ?? null;

  // Basic organisation structured data
  const organisationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessInfo?.organisationName || '',
    url: baseUrl,
    description: businessInfo?.organisationDescription || '',
  };

  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {shouldHideFromRobots && <meta name='robots' content='noindex, nofollow' />}

        {/* Dynamic icons from Sanity - only rendered when a favicon file is uploaded */}
        {faviconUrl && <link rel='icon' href={faviconUrl} />}
        {faviconUrl && <link rel='apple-touch-icon' href={faviconUrl} />}

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
            __html: JSON.stringify(organisationSchema).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body
        className={`${sairaCondensed.className} ${chauPhilomeneOne.variable} text-body-base text-body bg-brand-white`}>
        {children}
        {isProd && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy='afterInteractive'
            />
            <Script id='ga4-init' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
