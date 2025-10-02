import React from 'react';
import { stegaClean } from 'next-sanity';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import Heading from '../Typography/Heading/Heading';
import { getTextColorClasses } from './heroUtils';

interface HeroTitleProps {
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  documentId: string;
  documentType: string;
}

const HeroTitle = ({
  heroTitle,
  heroTextColor,
  documentId,
  documentType,
}: HeroTitleProps) => {
  if (!heroTitle) return null;

  // Enhanced responsive title sizing
  const titleClasses = `
    /* Mobile: Start smaller and scale up, allowing for shrinking when needed */
    text-h5 min-[380px]:text-h4 min-[480px]:text-h3 sm:text-h2 md:text-h1
    /* Allow text to scale down if content is too long */
    leading-tight sm:leading-normal
    font-bold ${getTextColorClasses(heroTextColor)}
  `.trim();

  return (
    <Heading
      level='h1'
      showMargin={false}
      className={titleClasses}
      {...createSanityDataAttribute(documentId, documentType, 'heroTitle')}>
      {stegaClean(heroTitle)}
    </Heading>
  );
};

export default HeroTitle;
