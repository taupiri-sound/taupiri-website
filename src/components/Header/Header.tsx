'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import UnifiedImage from '@/components/UI/UnifiedImage';
import type { HEADER_QUERYResult } from '@/sanity/types';
import HorizontalNav from './HorizontalNav';
import MenuButton from './MenuButton';
import VerticalNav from './VerticalNav/VerticalNav';
import SkipLink from '@/components/UI/SkipLink';

interface HeaderProps {
  headerData: HEADER_QUERYResult | null;
}

const Header = ({ headerData }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Handle scroll for header background opacity fade
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade in background over first xxpx of scroll
      const opacity = Math.min(scrollY / 30, 1);
      setHeaderOpacity(opacity);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      <header
        className='fixed top-0 left-0 right-0 w-full px-4 md:px-8 h-18 md:h-20 flex items-center justify-between gap-8 z-50 transition-all duration-300'
        style={{
          backgroundColor: `rgba(67, 12, 8, ${headerOpacity})`, // bg-brand-secondary (#430c08) with variable opacity
        }}>
        {/* Black gradient overlay - visible when header is transparent, fades out when header background appears */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-black to-transparent pointer-events-none transition-opacity duration-300 -z-10'
          style={{
            opacity: 1 - headerOpacity, // Inverse of header opacity - visible when transparent, hidden when opaque
          }}
        />

        {/* Logo */}
        <Link href='/#home' className='flex items-center gap-2'>
          <UnifiedImage
            src='/images/logos/logo-white.png'
            alt='Taupiri Sound Logo'
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

        {/* Hamburger Menu Button */}
        <MenuButton
          variant='hamburger'
          isMenuOpen={isMenuOpen}
          onClick={toggleMenu}
          ariaControls='mobile-navigation-menu'
        />
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
