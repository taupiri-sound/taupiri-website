import React from 'react';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import {
  getTermsAndConditions,
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
  getOrganisationDataFromSeoMetaData,
  generateStructuredDataScript,
} from '@/lib/structuredData';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';
import Breadcrumb from '@/components/UI/Breadcrumb';

export async function generateMetadata() {
  const [seoMetaData, termsData] = await Promise.all([getSeoMetaData(), getTermsAndConditions()]);

  if (!seoMetaData) {
    return {
      title: 'Terms & Conditions | Taupiri Sound',
      description: 'Terms and conditions for using our website and services',
    };
  }

  const title = termsData?.title || 'Terms & Conditions';

  return generatePageMetadata({
    title,
    description:
      seoMetaData.siteDescription || 'Terms and conditions for using our website and services',
    seoMetaData,
    canonicalUrl: generateCanonicalUrl('/terms-and-conditions'),
  });
}

const TermsAndConditionsPage = async () => {
  const [termsData, seoMetaData, companyLinks, contactFormSettings, clientsData, allProjectsData] =
    await Promise.all([
      getTermsAndConditions(),
      getSeoMetaData(),
      getCompanyLinks(),
      getContactFormSettings(),
      getClients(),
      getAllProjects(),
    ]);

  // If the page is hidden or doesn't exist, show 404
  if (!termsData || termsData.hide) {
    notFound();
  }

  const baseUrl = getBaseUrl();

  // Generate breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: termsData.title || 'Terms & Conditions', url: `${baseUrl}/terms-and-conditions` },
  ];

  // Generate Article structured data
  let articleSchema;
  if (seoMetaData && termsData._updatedAt) {
    const organisationData = getOrganisationDataFromSeoMetaData(seoMetaData, baseUrl);

    articleSchema = generateArticleSchema({
      headline: termsData.title || 'Terms & Conditions',
      description: seoMetaData.siteDescription || undefined,
      datePublished: termsData._updatedAt,
      dateModified: termsData._updatedAt,
      author: {
        name: seoMetaData.siteTitle || 'Taupiri Sound',
        type: 'Organization',
      },
      publisher: organisationData,
      url: `${baseUrl}/terms-and-conditions`,
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
        title={termsData.title || 'Terms & Conditions'}
        titleTeReo={termsData.titleTeReo || null}
        documentId={termsData._id}
        documentType={termsData._type}
      />

      {/* Breadcrumb */}
      <Breadcrumb pageTitle={termsData.title || 'Terms & Conditions'} />

      <Container textAlign='left'>
        {/* Page Content */}
        {termsData.topText && <p className='font-bold mb-8'>{termsData.topText}</p>}
        {termsData.content && (
          <PageBuilder
            content={termsData.content}
            documentId={termsData._id}
            documentType={termsData._type}
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

export default TermsAndConditionsPage;
