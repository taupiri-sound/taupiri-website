'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import HeroImages from './HeroImages';
import DefaultHeroBackground from './DefaultHeroBackground';
import RegularHeroLayout from './RegularHeroLayout';
import ScrollIndicator from './ScrollIndicator';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import { stegaClean } from 'next-sanity';
import { homeHeroBottomSpacing } from '@/utils/spacingConstants';

interface HeroProps {
  heroStyle: NonNullable<HOME_PAGE_QUERYResult>['heroStyle'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  heroLogoDisplay: NonNullable<HOME_PAGE_QUERYResult>['heroLogoDisplay'];
  heroBackgroundImages: NonNullable<HOME_PAGE_QUERYResult>['heroBackgroundImages'];
  heroImageTransitionDuration: NonNullable<HOME_PAGE_QUERYResult>['heroImageTransitionDuration'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  heroCallToActionList: NonNullable<HOME_PAGE_QUERYResult>['heroCallToActionList'];
  hideScrollIndicator: NonNullable<HOME_PAGE_QUERYResult>['hideScrollIndicator'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  documentId: string;
  documentType: string;
}

const Hero = ({
  heroStyle,
  heroTextColor,
  heroLogoDisplay,
  heroBackgroundImages,
  heroImageTransitionDuration,
  heroTitle,
  heroSubtitle,
  heroCallToActionList,
  hideScrollIndicator,
  heroContentPosition,
  documentId,
  documentType,
}: HeroProps) => {
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [shouldUseGradientTransition, setShouldUseGradientTransition] = useState(true);

  const handleFirstImageLoaded = () => {
    setFirstImageLoaded(true);
    // Always use gradient transition since we're always fading in
    setShouldUseGradientTransition(true);
  };

  // Convert Sanity image array to HeroImages component format and filter valid images
  const validBackgroundImages =
    heroBackgroundImages?.filter((image) => image && image.asset && image.asset._ref) || [];

  const images = validBackgroundImages.map((image, index) => ({
    imageUrl: urlFor(image).width(1920).height(1080).url(),
    altText: image.alt || `Hero background image ${index + 1}`,
  }));

  // Determine hero style - default to 'default' if not provided, clean any stega characters
  const currentHeroStyle = stegaClean(heroStyle) || 'default';

  // Get background color based on text color for better contrast
  const heroBackgroundColor = stegaClean(heroTextColor) === 'white' ? 'bg-black' : 'bg-white';

  return (
    <section
      id='home'
      data-hero
      className={`relative ${styles['hero-height']} flex flex-col ${homeHeroBottomSpacing} ${
        currentHeroStyle === 'background-images' ? heroBackgroundColor : ''
      }`}>
      {/* Z-index hierarchy: Background (z-10) → Gradient (z-20) → Content (z-[25]) → Header (z-30) → Mobile menu (z-40) */}

      {/* Hero Style Click-to-Edit Wrapper */}
      <div
        {...createSanityDataAttribute(documentId, documentType, 'heroStyle')}
        className='absolute inset-0 pointer-events-none z-0'
      />

      {/* Text Color Click-to-Edit Wrapper */}
      <div
        {...createSanityDataAttribute(documentId, documentType, 'heroTextColor')}
        className='absolute inset-0 pointer-events-none z-0'
      />

      {/* Background Images Hero Style */}
      {currentHeroStyle === 'background-images' && (
        <>
          {images.length > 0 && (
            <HeroImages
              images={images}
              duration={(heroImageTransitionDuration || 4) * 1000}
              onFirstImageLoaded={handleFirstImageLoaded}
            />
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent z-20 ${
              shouldUseGradientTransition ? 'transition-opacity duration-1000 ease-in-out' : ''
            } ${firstImageLoaded || images.length === 0 ? 'opacity-90' : 'opacity-0'}`}
          />
        </>
      )}

      {/* Default Hero Style */}
      {currentHeroStyle === 'default' && (
        <div className='absolute inset-0 z-10 pointer-events-none'>
          <DefaultHeroBackground />
        </div>
      )}

      {/* Top padding for spacing from header - matches bottom */}
      {/* <div className='flex-shrink-0 h-16' /> */}

      {/* Main content area - grows to fill available space */}
      <div className='flex-1 flex flex-col relative z-[25] min-h-0'>
        <RegularHeroLayout
          heroTextColor={heroTextColor}
          heroLogoDisplay={heroLogoDisplay}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          heroCallToActionList={heroCallToActionList}
          heroContentPosition={heroContentPosition}
          documentId={documentId}
          documentType={documentType}
          showLogoBackColor={currentHeroStyle === 'default'}
        />
      </div>

      {/* Bottom padding with scroll indicator - matches top */}
      <div className='flex-shrink-0 flex flex-col items-center justify-center h-16'>
        {!stegaClean(hideScrollIndicator) && (
          <div className='block'>
            <ScrollIndicator />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
