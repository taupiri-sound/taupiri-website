import React from 'react';
import Heading from '../Typography/Heading';
import Breadcrumb from '../UI/Breadcrumb';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { heroBottomSpacing } from '@/utils/spacingConstants';

interface PageHeroProps {
  title?: string | null;
  heroImage?: unknown | string;
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  className?: string;
  documentId?: string;
  documentType?: string;
  // Breadcrumb props
  showBreadcrumb?: boolean;
  breadcrumbPageTitle?: string;
  breadcrumbClickable?: boolean;
  breadcrumbHref?: string;
}

const PageHero = ({
  title = null,
  documentId,
  documentType,
  showBreadcrumb = false,
  breadcrumbPageTitle,
  breadcrumbClickable = false,
  breadcrumbHref,
}: PageHeroProps) => {
  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroImage')}>
      <section
        data-hero
        className={`h-48 md:h-72 bg-brand-secondary flex items-center justify-center overflow-hidden px-5 ${heroBottomSpacing}`}>
        {title && (
          <Heading level='h1' className='text-h2 md:text-h1 font-bold text-brand-white'>
            {title}
          </Heading>
        )}
      </section>
      {showBreadcrumb && breadcrumbPageTitle && (
        <Breadcrumb
          pageTitle={breadcrumbPageTitle}
          pageTitleClickable={breadcrumbClickable}
          pageTitleHref={breadcrumbHref}
        />
      )}
    </div>
  );
};

export default PageHero;
