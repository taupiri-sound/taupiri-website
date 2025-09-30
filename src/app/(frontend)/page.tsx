import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage, getSiteSettings, getCompanyLinks } from '@/actions';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Container from '@/components/Layout/Container';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  if (!siteSettings) {
    return {
      title: 'Taupiri Sound | Something here...',
      description:
        "Taupiri Sound is a recording studio based in the countryside of northern Waikato. For over a decade we have worked on countless projects from educational resources to some of Aotearoa's best artists.",
    };
  }

  return generatePageMetadata({
    siteSettings,
    canonicalUrl: generateCanonicalUrl('/'),
  });
}

const Page = async () => {
  const [page, siteSettings, companyLinks] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getCompanyLinks(),
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
        showHeroLogo={page.showHeroLogo}
        heroBackgroundImages={page.heroBackgroundImages}
        heroImageTransitionDuration={page.heroImageTransitionDuration}
        heroTitle={page.heroTitle}
        heroSubtitle={page.heroSubtitle}
        heroFeaturedItemsSubtitle={page.heroFeaturedItemsSubtitle}
        heroCallToActionList={page.heroCallToActionList}
        hideScrollIndicator={page.hideScrollIndicator}
        heroContentPosition={page.heroContentPosition}
        enableFeaturedItems={page.enableFeaturedItems}
        featuredImages={page.featuredImages}
        documentId={page._id}
        documentType={page._type}
      />

      {/* Additional Page Builder Content */}
      {page.content && (
        <Container>
          <PageBuilder
            content={page.content as NonNullable<PAGE_QUERYResult>['content']}
            documentId={page._id}
            documentType={page._type}
            siteSettings={
              siteSettings
                ? {
                    companyEmail: siteSettings.companyEmail || undefined,
                  }
                : undefined
            }
            companyLinks={companyLinks}
            alignment='center'
          />
        </Container>
      )}
    </>
  );
};

export default Page;
