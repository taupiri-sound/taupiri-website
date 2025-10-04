'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';
import { renderBlock } from '@/utils/blockRenderer';
import type { BaseCardProps, CardImage } from './types';

interface CardProfileProps extends BaseCardProps {
  image: CardImage;
  layoutStyle: 'stacked' | 'row';
}

const CardProfile = (props: CardProfileProps) => {
  const {
    title,
    subtitle,
    image,
    content,
    layoutStyle,
    className = '',
    isGridChild = false,
    documentId,
    documentType,
    fieldPathPrefix,
    siteSettings,
    companyLinks,
    alignment = 'center',
    createDataAttributeConfig,
  } = props;

  // Get field path for live editing
  const getFieldPath = (field: string) => (fieldPathPrefix ? `${fieldPathPrefix}.${field}` : field);

  // Render card header (title and subtitle)
  const renderHeader = () => {
    if (!title && !subtitle) return null;

    return (
      <div className='mb-6 text-center'>
        {title && (
          <p
            className='text-h3 font-bold mb-2'
            {...createSanityDataAttribute(documentId, documentType, getFieldPath('title'))}>
            {title}
          </p>
        )}
        {subtitle && (
          <p
            className='text-body-lg text-[#b8956a]'
            {...createSanityDataAttribute(documentId, documentType, getFieldPath('subtitle'))}>
            {subtitle}
          </p>
        )}
      </div>
    );
  };

  // Render content blocks using shared block renderer
  const renderContent = () => {
    if (!content) return null;

    return content.map((block) => {
      const typedBlock = block as { _key: string };
      const blockPath = `${getFieldPath('content')}[_key=="${typedBlock._key}"]`;

      return renderBlock(block, {
        documentId,
        documentType,
        blockPath,
        siteSettings,
        companyLinks,
        alignment,
        config: createDataAttributeConfig,
      });
    });
  };

  // Stacked layout
  if (layoutStyle === 'stacked') {
    return (
      <CardContainer
        className={`${className} flex flex-col text-center items-center`}
        isGridChild={isGridChild}>
        {/* Profile Image - Square frame at top center */}
        <div
          className='mb-6'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className='relative w-32 h-32 rounded-lg overflow-hidden'>
            <UnifiedImage
              src={image}
              alt={image.alt || 'Profile image'}
              mode='fill'
              sizeContext='profile'
              objectFit='cover'
              generateSchema
              schemaContext='profile'
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Header and Content - Center aligned */}
        <div className='flex flex-col gap-4 w-full'>
          {renderHeader()}
          {renderContent()}
        </div>
      </CardContainer>
    );
  }

  // Row layout
  return (
    <CardContainer
      className={`${className} flex flex-row gap-6 items-start`}
      isGridChild={isGridChild}>
      {/* Profile Image - Left side square frame */}
      <div
        className='flex-shrink-0'
        {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
        <div className='relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden'>
          <UnifiedImage
            src={image}
            alt={image.alt || 'Profile image'}
            mode='fill'
            sizeContext='profile'
            objectFit='cover'
            generateSchema
            schemaContext='profile'
            documentId={documentId}
            documentType={documentType}
            fieldPath={getFieldPath('image')}
          />
        </div>
      </div>

      {/* Header and Content - Left aligned */}
      <div className='flex-1 flex flex-col gap-4 text-left'>
        {renderHeader()}
        {renderContent()}
      </div>
    </CardContainer>
  );
};

export default CardProfile;
