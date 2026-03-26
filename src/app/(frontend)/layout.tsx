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
import {
  getBusinessInfo,
  getHeader,
  getFooter,
  getSeoMetaData,
  getCompanyLinks,
  getLegalPagesVisibility,
} from '@/actions';
import { PageLoadProvider } from '@/contexts/PageLoadContext';
import { HeaderProvider } from '@/contexts/HeaderContext';
import { generateMetadata as generateDefaultMetadata } from '@/lib/metadata';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  getOrganizationDataFromSeoMetaData,
  getWebSiteDataFromSeoMetaData,
  getLocalBusinessDataFromSeoMetaData,
  generateStructuredDataScript,
} from '@/lib/structuredData';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata() {
  const [seoMetaData, businessInfo] = await Promise.all([getSeoMetaData(), getBusinessInfo()]);
  if (!seoMetaData) {
    const orgName = businessInfo?.organizationName || '';
    const orgDescription = businessInfo?.organizationDescription || '';
    return {
      title: orgDescription ? `${orgName} | ${orgDescription}` : orgName,
      description: `Welcome to ${orgName}`,
    };
  }

  return generateDefaultMetadata({
    seoMetaData,
    image: seoMetaData.defaultOgImage, // Set default OG image at layout level
  });
}

const FrontendLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [headerData, footerData, seoMetaData, companyLinksData, legalPagesVisibilityData, businessInfo] = await Promise.all([
    getHeader(),
    getFooter(),
    getSeoMetaData(),
    getCompanyLinks(),
    getLegalPagesVisibility(),
    getBusinessInfo(),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_CONFIG.PRODUCTION_DOMAIN;

  // Generate structured data if site settings are available
  let organizationSchema;
  let webSiteSchema;
  let localBusinessSchema;

  if (seoMetaData) {
    const organizationData = getOrganizationDataFromSeoMetaData(seoMetaData, baseUrl, businessInfo);
    const webSiteData = getWebSiteDataFromSeoMetaData(seoMetaData, baseUrl);
    const localBusinessData = getLocalBusinessDataFromSeoMetaData(seoMetaData, baseUrl, businessInfo);

    organizationSchema = generateOrganizationSchema(organizationData);
    webSiteSchema = generateWebSiteSchema(webSiteData);
    localBusinessSchema = generateLocalBusinessSchema(localBusinessData);
  }

  return (
    <PageLoadProvider>
      <HeaderProvider>
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
        {localBusinessSchema && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={generateStructuredDataScript(localBusinessSchema)}
          />
        )}

        <div className='min-h-screen flex flex-col'>
          <Header headerData={headerData} />
          <main id='main-content' className='flex-1'>
            {children}
          </main>
          <Footer
            footerData={footerData}
            companyLinksData={companyLinksData}
            legalPagesVisibilityData={legalPagesVisibilityData}
          />
          {(await draftMode()).isEnabled && (
            <>
              <SanityLive />
              <VisualEditingProvider />
              <DisableDraftMode />
            </>
          )}
        </div>
      </HeaderProvider>
    </PageLoadProvider>
  );
};

export default FrontendLayout;
