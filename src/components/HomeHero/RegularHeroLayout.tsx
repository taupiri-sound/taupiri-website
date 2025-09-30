import React from 'react';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroLogo from './HeroLogo';
import HeroCTA from './HeroCTA';
import { getTextColorClasses } from './heroUtils';

interface RegularHeroLayoutProps {
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  heroCallToActionList: NonNullable<HOME_PAGE_QUERYResult>['heroCallToActionList'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  documentId: string;
  documentType: string;
  showLogoBackColor?: boolean;
}

// Regular flexbox layout: content positioning with flexbox
const RegularHeroLayout = (props: RegularHeroLayoutProps) => {
  const {
    heroContentPosition,
    heroTextColor,
    heroTitle,
    heroSubtitle,
    enableFeaturedItems,
    showHeroLogo,
    heroCallToActionList,
    documentId,
    documentType,
    showLogoBackColor,
  } = props;

  // Extract position components
  const cleanPosition = stegaClean(
    heroContentPosition?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
      'center-center'
  );
  const [vertical, horizontal] = cleanPosition.split('-');

  // Map vertical position to justify-content classes
  const getVerticalAlignment = (vert: string) => {
    switch (vert) {
      case 'top':
        return 'justify-start';
      case 'bottom':
        return 'justify-end';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  // Map horizontal position to items and text alignment classes with mobile responsiveness
  const getHorizontalAlignment = (horiz: string) => {
    switch (horiz) {
      case 'left':
        return {
          items: 'items-center md:items-start', // center on mobile, left on desktop
          text: 'text-center md:text-left',
          content: 'items-center md:items-start',
        };
      case 'right':
        return {
          items: 'items-center md:items-end', // center on mobile, right on desktop
          text: 'text-center md:text-right',
          content: 'items-center md:items-end',
        };
      case 'center':
      default:
        return {
          items: 'items-center',
          text: 'text-center',
          content: 'items-center',
        };
    }
  };

  const verticalClasses = getVerticalAlignment(vertical);
  const horizontalConfig = getHorizontalAlignment(horizontal);

  const componentProps = {
    heroTitle,
    heroTextColor,
    enableFeaturedItems,
    showHeroLogo,
    heroCallToActionList,
    documentId,
    documentType,
    showLogoBackColor,
  };

  const heroSubtitleProps = {
    heroSubtitle,
    documentId,
    documentType,
    textAlignment: horizontal,
  };

  return (
    <div
      className={`
        w-full flex-1 flex flex-col ${verticalClasses} ${horizontalConfig.items}
        ${getTextColorClasses(heroTextColor)}
        px-4 sm:px-8 lg:px-12
      `}
      {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>
      {/* Content container with responsive alignment */}
      <div
        className={`flex flex-col ${horizontalConfig.content} ${horizontalConfig.text} gap-4 sm:gap-6 max-w-4xl w-full mt-6`}>
        {/* Logo - can shrink when needed */}
        <div className='flex-shrink min-h-0'>
          <HeroLogo {...componentProps} />
        </div>

        {/* Title - priority content */}
        <div className='flex-shrink-0'>
          <HeroTitle {...componentProps} />
        </div>

        {/* Subtitle - can grow/shrink as needed */}
        <div className='flex-shrink min-h-0'>
          <HeroSubtitle {...heroSubtitleProps} />
        </div>

        {/* CTA buttons - always visible, aligned with content */}
        <div className='flex-shrink-0'>
          <HeroCTA {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default RegularHeroLayout;
