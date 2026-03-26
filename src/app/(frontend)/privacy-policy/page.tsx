import React from 'react';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import {
  getPrivacyPolicy,
  getSeoMetaData,
  getCompanyLinks,
  getContactFormSettings,
  getClients,
  getAllProjects,
} from '@/actions';
import Container from '@/components/Layout/Container';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl, getBaseUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  getOrganizationDataFromSeoMetaData,
  generateStructuredDataScript,
} from '@/lib/structuredData';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';
import Breadcrumb from '@/components/UI/Breadcrumb';

export async function generateMetadata() {
  const [seoMetaData, privacyData] = await Promise.all([getSeoMetaData(), getPrivacyPolicy()]);

  if (!seoMetaData) {
    return {
      title: 'Privacy Policy | Taupiri Sound',
      description: 'Privacy policy for our website and how we handle your data',
    };
  }

  const title = privacyData?.title || 'Privacy Policy';

  return generatePageMetadata({
    title,
    description:
      seoMetaData.siteDescription || 'Privacy policy for our website and how we handle your data',
    seoMetaData,
    canonicalUrl: generateCanonicalUrl('/privacy-policy'),
  });
}

const PrivacyPolicyPage = async () => {
  const [
    privacyData,
    seoMetaData,
    companyLinks,
    contactFormSettings,
    clientsData,
    allProjectsData,
  ] = await Promise.all([
    getPrivacyPolicy(),
    getSeoMetaData(),
    getCompanyLinks(),
    getContactFormSettings(),
    getClients(),
    getAllProjects(),
  ]);

  // If the page is hidden or doesn't exist, show 404
  if (!privacyData || privacyData.hide) {
    notFound();
  }

  const baseUrl = getBaseUrl();

  // Generate breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: privacyData.title || 'Privacy Policy', url: `${baseUrl}/privacy-policy` },
  ];

  // Generate Article structured data
  let articleSchema;
  if (seoMetaData && privacyData._updatedAt) {
    const organizationData = getOrganizationDataFromSeoMetaData(seoMetaData, baseUrl);

    articleSchema = generateArticleSchema({
      headline: privacyData.title || 'Privacy Policy',
      description: seoMetaData.siteDescription || undefined,
      datePublished: privacyData._updatedAt,
      dateModified: privacyData._updatedAt,
      author: {
        name: seoMetaData.siteTitle || 'Taupiri Sound',
        type: 'Organization',
      },
      publisher: organizationData,
      url: `${baseUrl}/privacy-policy`,
    });
  }

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {articleSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={generateStructuredDataScript(articleSchema)}
        />
      )}

      {/* Page Hero */}
      <PageHero
        title={privacyData.title || 'Privacy Policy'}
        titleTeReo={privacyData.titleTeReo || null}
        documentId={privacyData._id}
        documentType={privacyData._type}
      />

      {/* Breadcrumb */}
      <Breadcrumb pageTitle={privacyData.title || 'Privacy Policy'} />

      <Container textAlign='left'>
        {/* Page Content */}
        {privacyData.topText && <p className='font-bold mb-8'>{privacyData.topText}</p>}
        {privacyData.content && (
          <PageBuilder
            content={privacyData.content}
            documentId={privacyData._id}
            documentType={privacyData._type}
            seoMetaData={seoMetaData || undefined}
            companyLinks={companyLinks}
            clientsData={clientsData}
            allProjectsData={allProjectsData}
            contactFormSettings={contactFormSettings}
            alignment='left'
          />
        )}
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
