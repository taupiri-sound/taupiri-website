'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';
import { renderBlock } from '@/utils/blockRenderer';
import type { BaseCardProps, CardImage } from './types';

interface CardBannerProps extends BaseCardProps {
  image: CardImage;
}

const CardBanner = (props: CardBannerProps) => {
  const {
    title,
    subtitle,
    image,
    content,
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

  return (
    <CardContainer className={`${className} flex flex-col`} isGridChild={isGridChild}>
      {/* Banner Image - Full width at top */}
      <div
        className='relative w-full h-48 min-h-[12rem] max-h-64 overflow-hidden'
        {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
        <UnifiedImage
          src={image}
          alt={image.alt || 'Card banner image'}
          mode='fill'
          sizeContext='card'
          objectFit='cover'
          generateSchema
          schemaContext='article'
          documentId={documentId}
          documentType={documentType}
          fieldPath={getFieldPath('image')}
        />
      </div>

      {/* Content - Center aligned */}
      <div className='flex flex-col gap-4 p-6 text-center items-center'>
        {renderHeader()}
        {renderContent()}
      </div>
    </CardContainer>
  );
};

export default CardBanner;
