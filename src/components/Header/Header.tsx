'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import UnifiedImage from '@/components/UI/UnifiedImage';
import type { HEADER_QUERYResult } from '@/sanity/types';
import HorizontalNav from './HorizontalNav';
import MenuButton from './MenuButton';
import VerticalNav from './VerticalNav/VerticalNav';
import MenuCallout from './MenuCallout';
import SkipLink from '@/components/UI/SkipLink';

interface HeaderProps {
  headerData: HEADER_QUERYResult | null;
}

const Header = ({ headerData }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [calloutHasShown, setCalloutHasShown] = useState(false);

  const toggleMenu = () => {
    // If callout is currently visible and we're opening the menu, mark it as shown
    if (!isMenuOpen && !calloutHasShown) {
      setCalloutHasShown(true);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  /* 
    HEADER HEIGHT DEFINITION:
    -> look for "h-18 md:h-20" or similar in the header className below
    
    ⚠️ IMPORTANT: If these heights are changed, update the corresponding values in:
    src/components/HomeHero/styles.module.css
    and in the vertical nav
  */
  return (
    <>
      <SkipLink href='#main-content'>Skip to main content</SkipLink>
      <header className='w-full px-4 md:px-8 h-18 md:h-20 flex items-center justify-between gap-8 sticky top-0 z-50 bg-white shadow-md'>
        {/* Logo */}
        <Link href='/#home' className='flex items-center gap-2'>
          <UnifiedImage
            src='/images/logo-text-black.png'
            alt='07:17 Records Logo'
            mode='sized'
            width={200}
            height={125}
            sizeContext='logo'
            objectFit='contain'
            className='w-[160px] md:w-[180px] h-auto'
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='flex-grow flex justify-end'>
          <HorizontalNav navLinks={headerData?.horizontalNav || null} />
        </div>

        {/* Hamburger Menu Button with Callout */}
        <div className='relative'>
          <MenuButton
            variant='hamburger'
            isMenuOpen={isMenuOpen}
            onClick={toggleMenu}
            ariaControls='mobile-navigation-menu'
          />

          {/* Menu Callout - only show when menu is closed and hasn't shown before */}
          {!isMenuOpen && !calloutHasShown && headerData?.hamburgerCallout?.enabled && (
            <MenuCallout
              text={headerData.hamburgerCallout.text || undefined}
              hideDelay={(headerData.hamburgerCallout.hideDelay || 5) * 1000}
              onHide={() => setCalloutHasShown(true)}
            />
          )}
        </div>
      </header>

      {/* Vertical Menu */}
      <VerticalNav
        isMenuOpen={isMenuOpen}
        onClose={closeMenu}
        navLinks={headerData?.verticalNav || null}
        navCtas={headerData?.verticalNavCtas || null}
      />
    </>
  );
};

export default Header;
