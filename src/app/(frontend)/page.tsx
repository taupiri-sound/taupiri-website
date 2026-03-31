import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import {
  getHomePage,
  getSeoMetaData,
  getCompanyLinks,
  getContactFormSettings,
  getClients,
  getEquipmentList,
  getTeamMembers,
  getAllProjects,
  getBusinessInfo,
} from '@/actions';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Container from '@/components/Layout/Container';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';

export async function generateMetadata() {
  const seoMetaData = await getSeoMetaData();
  if (!seoMetaData) {
    return {
      title: '',
      description: '',
    };
  }

  return generatePageMetadata({
    seoMetaData,
    canonicalUrl: generateCanonicalUrl('/'),
  });
}

const Page = async () => {
  const [
    page,
    seoMetaData,
    companyLinks,
    contactFormSettings,
    clientsData,
    equipmentListData,
    teamMembersData,
    allProjectsData,
    businessInfo,
  ] = await Promise.all([
    getHomePage(),
    getSeoMetaData(),
    getCompanyLinks(),
    getContactFormSettings(),
    getClients(),
    getEquipmentList(),
    getTeamMembers(),
    getAllProjects(),
    getBusinessInfo(),
  ]);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        heroStyle={page.heroStyle}
        heroTextColor={page.heroTextColor}
        heroLogoDisplay={page.heroLogoDisplay}
        heroBackgroundImages={page.heroBackgroundImages}
        heroImageTransitionDuration={page.heroImageTransitionDuration}
        h1Title={page.h1Title}
        heroTitle={page.heroTitle}
        heroCallToActionList={page.heroCallToActionList}
        hideScrollIndicator={page.hideScrollIndicator}
        heroContentPosition={page.heroContentPosition}
        documentId={page._id}
        documentType={page._type}
        businessName={businessInfo?.organisationName || ''}
      />

      {/* Additional Page Builder Content */}
      {page.content && (
        <Container>
          <PageBuilder
            content={page.content as NonNullable<PAGE_QUERYResult>['content']}
            documentId={page._id}
            documentType={page._type}
            seoMetaData={seoMetaData || undefined}
            companyLinks={companyLinks}
            clientsData={clientsData}
            equipmentListData={equipmentListData}
            teamMembersData={teamMembersData}
            allProjectsData={allProjectsData}
            contactFormSettings={contactFormSettings}
            alignment='center'
          />
        </Container>
      )}
    </>
  );
};

export default Page;
