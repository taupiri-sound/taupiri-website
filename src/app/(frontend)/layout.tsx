import React from 'react';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import DisableDraftMode from '@/components/DisableDraftMode';
import NavigationScroll from '@/components/NavigationScroll';
import PageReadyTrigger from '@/components/PageReadyTrigger';
import { VisualEditingProvider } from '@/components/VisualEditingProvider';
import { getHeader, getFooter, getSiteSettings, getCompanyLinks, getLegalPagesVisibility } from '@/actions';
import { SiteDataProvider } from '@/contexts/SiteDataContext';
import { PageLoadProvider } from '@/contexts/PageLoadContext';
import { generateMetadata as generateDefaultMetadata } from '@/lib/metadata';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  getOrganizationDataFromSiteSettings,
  getWebSiteDataFromSiteSettings,
  generateStructuredDataScript,
} from '@/lib/structuredData';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  if (!siteSettings) {
    return {
      title: `${SITE_CONFIG.ORGANIZATION_NAME} | ${SITE_CONFIG.ORGANIZATION_DESCRIPTION}`,
      description: `Welcome to ${SITE_CONFIG.ORGANIZATION_NAME}`,
    };
  }

  return generateDefaultMetadata({
    siteSettings,
    image: siteSettings.defaultOgImage, // Set default OG image at layout level
  });
}

const FrontendLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const headerData = await getHeader();
  const footerData = await getFooter();
  const siteSettingsData = await getSiteSettings();
  const companyLinksData = await getCompanyLinks();
  const legalPagesVisibilityData = await getLegalPagesVisibility();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.PRODUCTION_DOMAIN;

  // Generate structured data if site settings are available
  let organizationSchema;
  let webSiteSchema;

  if (siteSettingsData) {
    const organizationData = getOrganizationDataFromSiteSettings(siteSettingsData, baseUrl);
    const webSiteData = getWebSiteDataFromSiteSettings(siteSettingsData, baseUrl);

    organizationSchema = generateOrganizationSchema(organizationData);
    webSiteSchema = generateWebSiteSchema(webSiteData);
  }

  return (
    <PageLoadProvider>
      <SiteDataProvider companyEmail={siteSettingsData?.companyEmail || undefined}>
        <NavigationScroll />
        <PageReadyTrigger />

        {/* Structured Data */}
        {organizationSchema && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={generateStructuredDataScript(organizationSchema)}
          />
        )}
        {webSiteSchema && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={generateStructuredDataScript(webSiteSchema)}
          />
        )}

        <div className='min-h-screen flex flex-col'>
          <Header headerData={headerData} />
          <main id='main-content' className='flex-1'>
            {children}
          </main>
          <Footer
            footerData={footerData}
            siteSettingsData={siteSettingsData}
            companyLinksData={companyLinksData}
            legalPagesVisibilityData={legalPagesVisibilityData}
          />
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditingProvider />
              <DisableDraftMode />
            </>
          )}
        </div>
      </SiteDataProvider>
    </PageLoadProvider>
  );
};

export default FrontendLayout;
