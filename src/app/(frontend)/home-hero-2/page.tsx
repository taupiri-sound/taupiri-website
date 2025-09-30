import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Container from '@/components/Layout/Container';

const Page = async () => {
  const [page, siteSettings, events, collabs, favourites, companyLinks] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getAllEvents(),
    getCollabs(),
    getFavourites(),
    getCompanyLinks(),
  ]);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        heroStyle='background-images'
        heroTextColor='white'
        showHeroLogo={true}
        heroBackgroundImages={page.heroBackgroundImages}
        heroImageTransitionDuration={4}
        heroTitle='Demo Hero 2 - Multi-Image Background'
        heroSubtitle={[
          {
            _type: 'block',
            _key: 'demo-subtitle',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'demo-span',
                text: 'Showcasing the multi-image carousel with white text on dynamic backgrounds',
                marks: []
              }
            ]
          }
        ]}
        heroFeaturedItemsSubtitle={null}
        heroCallToActionList={page.heroCallToActionList}
        hideScrollIndicator={page.hideScrollIndicator}
        heroContentPosition='center-center'
        enableFeaturedItems={false}
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
            events={events}
            collabs={collabs}
            favourites={favourites}
            companyLinks={companyLinks}
            alignment='center'
          />
        </Container>
      )}
    </>
  );
};

export default Page;
