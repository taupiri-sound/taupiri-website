'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';
import { renderBlock } from '@/utils/blockRenderer';
import CardHeader from './CardHeader';
import type { BaseCardProps, CardImage, CardLayoutStyle } from './types';

interface CardProfileProps extends BaseCardProps {
  image: CardImage;
  layoutStyle: CardLayoutStyle;
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
    createDataAttributeConfig,
  } = props;

  // Get field path for live editing
  const getFieldPath = (field: string) => (fieldPathPrefix ? `${fieldPathPrefix}.${field}` : field);

  // Determine alignment based on layout style
  const cardAlignment = layoutStyle === 'stacked' ? 'center' : 'left';

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
        alignment: cardAlignment,
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
        {/* Profile Image - Portrait aspect ratio at top center */}
        <div
          className='mb-6 w-full'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className='relative aspect-square w-full rounded-lg overflow-hidden'>
            <UnifiedImage
              src={image}
              alt={image.alt || 'Profile image'}
              mode='fill'
              sizeContext='full'
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
        <CardHeader
          title={title}
          subtitle={subtitle}
          documentId={documentId}
          documentType={documentType}
          fieldPathPrefix={fieldPathPrefix}
        />
        <div className='flex flex-col gap-4 w-full'>{renderContent()}</div>
      </CardContainer>
    );
  }

  // Row Large layout - Full width, image takes ~1/3, stacks on mobile
  if (layoutStyle === 'rowLarge') {
    return (
      <CardContainer
        className={`${className} flex flex-col md:flex-row gap-6 items-start text-left`}
        isGridChild={isGridChild}
        noMaxWidth={true}>
        {/* Profile Image - Portrait aspect ratio, ~1/3 width on desktop, full width stacked on mobile */}
        <div
          className='w-full md:w-1/2 flex-shrink-0'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className='relative aspect-square w-full rounded-lg overflow-hidden'>
            <UnifiedImage
              src={image}
              alt={image.alt || 'Profile image'}
              mode='fill'
              sizeContext='full'
              objectFit='cover'
              generateSchema
              schemaContext='profile'
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Header and Content - Left aligned, takes remaining width */}
        <div className='flex-1 flex flex-col'>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
          <div className='flex flex-col items-start gap-4 w-full'>{renderContent()}</div>
        </div>
      </CardContainer>
    );
  }

  // Row Small layout - Fixed width with maxCardWidth, same layout on all screens
  if (layoutStyle === 'rowSmall') {
    return (
      <CardContainer
        className={`${className} flex flex-row gap-6 items-start`}
        isGridChild={isGridChild}>
        {/* Profile Image - Portrait aspect ratio with fixed width */}
        <div
          className='flex-shrink-0'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className='relative aspect-[3/4] w-50 rounded-lg overflow-hidden'>
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
        <div className='flex-1 flex flex-col text-left'>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
          <div className='flex flex-col items-start gap-4 w-full'>{renderContent()}</div>
        </div>
      </CardContainer>
    );
  }

  // Default Row layout (for backwards compatibility)
  return (
    <CardContainer
      className={`${className} flex flex-row gap-6 items-start`}
      isGridChild={isGridChild}>
      {/* Profile Image - Left side square frame */}
      <div
        className='flex-shrink-0'
        {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
        <div className='relative w-24 h-24 md:w-42 md:h-42 rounded-lg overflow-hidden'>
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
      <div className='flex-1 flex flex-col text-left'>
        <CardHeader
          title={title}
          subtitle={subtitle}
          documentId={documentId}
          documentType={documentType}
          fieldPathPrefix={fieldPathPrefix}
        />
        <div className='flex flex-col items-start gap-4 w-full'>{renderContent()}</div>
      </div>
    </CardContainer>
  );
};

export default CardProfile;
