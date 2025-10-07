import React from 'react';
import Heading from '../Typography/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface PageHeroProps {
  title?: string | null;
  documentId?: string;
  documentType?: string;
}

const PageHero = ({ title = null, documentId, documentType }: PageHeroProps) => {
  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroImage')}>
      <section
        data-hero
        className='h-44 md:h-72 bg-brand-secondary flex items-center justify-center overflow-hidden px-5'>
        {title && (
          <Heading level='h1' className='text-h2 md:text-h1 font-bold text-brand-white mt-16'>
            {title}
          </Heading>
        )}
      </section>
    </div>
  );
};

export default PageHero;
