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
  const cardAlignment = layoutStyle === 'stacked' ? 'left' : 'left';

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
      <div className='flex flex-col items-center max-w-full w-[30rem] mx-auto'>
        {/* Profile Image */}
        <div
          className='relative aspect-square w-full mb-2 rounded-lg overflow-hidden'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
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
        {/* Header and Content */}
        <CardContainer
          className={`${className} flex flex-col text-left items-start`}
          isGridChild={isGridChild}>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
          <div className='flex flex-col gap-4 w-full'>{renderContent()}</div>
        </CardContainer>
      </div>
    );
  }

  // Row Large layout
  if (layoutStyle === 'rowLarge') {
    return (
      <div className='flex flex-col lg:flex-row gap-0 md:gap-4 w-full'>
        {/* Profile Image */}
        <div className='w-full md:w-1/2'>
          <div
            className='relative aspect-square w-full rounded-lg overflow-hidden'
            {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
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
        {/* Header and Content */}
        {/* <div className='flex flex-col w-full text-left items-start p-4 md:p-8'>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
          <div className='flex flex-col gap-4 w-full text-center md:text-left'>
            {renderContent()}
          </div>
        </div> */}
        <CardContainer
          className={`${className} flex flex-col text-left items-start justify-center p-8 w-1/2`}
          isGridChild={isGridChild}
          noPadding
          noMaxWidth>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
          <div className='flex flex-col gap-4 w-full text-center md:text-left'>
            {renderContent()}
          </div>
        </CardContainer>
        {/* <CardContainer
          className={`${className} flex flex-col text-center md:text-left items-center md:items-start p-8`}
          isGridChild={isGridChild}
          noPadding
          noMaxWidth>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
          <div className='flex flex-col gap-4 w-full text-center md:text-left'>
            {renderContent()}
          </div>
        </CardContainer> */}
      </div>
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
