'use client';

import React, { useState } from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { HeartIcon } from '@sanity/icons';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';
import FavouriteModal from '../Modals/FavouriteModal';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

type FavouriteData = FAVOURITES_ALL_QUERYResult[0];

interface FavouriteItemProps {
  favourite: FavouriteData;
  rowSize?: 'small' | 'large';
}

const FavouriteItem: React.FC<FavouriteItemProps> = ({ favourite, rowSize = 'large' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageAlt = favourite.profileImage?.alt || `${favourite.name} profile image`;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='group cursor-pointer w-full transition-all duration-200 focus:outline-none'
        tabIndex={0}
        role='button'
        aria-label={`View details for ${favourite.name}`}>
        <div className='text-center space-y-3'>
          {/* Profile Image */}
          <div
            {...createSanityDataAttribute(favourite._id, 'favourites', 'profileImage')}
            className='mx-auto relative w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary transition-transform duration-200 group-hover:scale-105'>
            <UnifiedImage
              src={favourite.profileImage}
              alt={imageAlt}
              mode='fill'
              sizeContext='profile'
              objectFit='cover'
              sizes={
                rowSize === 'small'
                  ? '(max-width: 768px) 120px, 160px'
                  : '(max-width: 768px) 150px, 200px'
              }
              fallback={
                <div className='w-full h-full flex items-center justify-center'>
                  <HeartIcon className='text-white text-body-3xl md:text-body-4xl' />
                </div>
              }
            />
          </div>

          {/* Name */}
          <div
            {...createSanityDataAttribute(favourite._id, 'favourites', 'name')}
            className='text-h6 font-bold text-gray-900 transition-colors duration-200 group-hover:underline'>
            {favourite.name}
          </div>

          {/* Category */}
          {favourite.category && (
            <div
              {...createSanityDataAttribute(favourite._id, 'favourites', 'category')}
              className='text-body-base font-medium text-brand-secondary'>
              {favourite.category}
            </div>
          )}
        </div>
      </button>

      {/* SEO-only content - visually hidden but accessible to search engines */}
      {favourite.description && (
        <div className='sr-only'>
          <h3>{favourite.name} - Description</h3>
          <p {...createSanityDataAttribute(favourite._id, 'favourites', 'description')}>
            {favourite.description}
          </p>
          {favourite.link && favourite.linkLabel && (
            <p>
              <a
                href={favourite.link}
                {...createSanityDataAttribute(favourite._id, 'favourites', 'link')}>
                {favourite.linkLabel}
              </a>
            </p>
          )}
        </div>
      )}

      <FavouriteModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        favourite={favourite}
      />
    </>
  );
};

export default FavouriteItem;
