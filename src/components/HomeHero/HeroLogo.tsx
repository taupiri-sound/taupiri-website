import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { stegaClean } from 'next-sanity';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';

interface HeroLogoProps {
  heroLogoDisplay: NonNullable<HOME_PAGE_QUERYResult>['heroLogoDisplay'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  documentId: string;
  documentType: string;
  showLogoBackColor?: boolean;
}

const HeroLogo = ({
  heroLogoDisplay,
  heroTextColor,
  documentId,
  documentType,
  showLogoBackColor = false,
}: HeroLogoProps) => {
  const cleanLogoDisplay = stegaClean(heroLogoDisplay) || 'with-text';

  // Don't render anything if 'none' is selected
  if (cleanLogoDisplay === 'none') return null;

  // Enhanced responsive logo sizing with better mobile scaling
  const logoSize = 'w-32 min-w-24 max-w-48 sm:w-40 md:w-48 lg:w-56 xl:w-64';

  // Determine logo source based on logo display type and text color
  const getLogoSrc = () => {
    const textColor = stegaClean(heroTextColor);

    if (cleanLogoDisplay === 'logo-only') {
      // Logo only version - currently same file for both colors
      // Future: Could be '/images/logos/logo-only-white.png' or '/images/logos/logo-only-black.png'
      return '/images/logos/logo-only.png';
    }

    // Logo with text version
    return textColor === 'white'
      ? '/images/logos/logo-white.png'
      : '/images/logos/logo-black.png';
  };

  const logoSrc = getLogoSrc();

  return (
    <div
      className='flex justify-center items-center relative'
      {...createSanityDataAttribute(documentId, documentType, 'heroLogoDisplay')}>
      <UnifiedImage
        src={logoSrc}
        alt='Taupiri Sound Logo'
        mode='sized'
        width={500}
        height={500}
        sizeContext='hero'
        objectFit='contain'
        className={`${logoSize} h-auto object-contain relative z-10 drop-shadow-lg drop-shadow-black/40`}
        priority
        sizes='(max-width: 768px) 320px, (max-width: 1024px) 384px, 512px'
      />
      {showLogoBackColor && (
        <>
          <div className='absolute top-1/2 left-1/2 w-60 h-60 md:w-70 md:h-70 lg:w-[20vw] lg:h-[20vw] rounded-full bg-gradient-to-br from-[#ffea00]/20 to-[#ffea00]/10 transform -translate-y-1/2 -translate-x-1/2 blur-md -z-10' />
          <div className='absolute top-1/2 left-1/2 w-40 h-40 md:w-50 md:h-50 lg:w-[15vw] lg:h-[15vw] rounded-full bg-gradient-to-br from-[#ffea00]/30 to-[#ffea00]/20 transform -translate-y-1/2 -translate-x-1/2 blur-sm -z-10' />
        </>
      )}
    </div>
  );
};

export default HeroLogo;
