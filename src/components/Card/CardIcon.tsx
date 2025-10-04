'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';
import { renderBlock } from '@/utils/blockRenderer';
import CardHeader from './CardHeader';
import type { BaseCardProps, CardImage } from './types';

interface CardIconProps extends BaseCardProps {
  image: CardImage;
  layoutStyle: 'stacked' | 'row';
}

const CardIcon = (props: CardIconProps) => {
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
        {/* Icon - Circular frame at top center */}
        <div
          className='mb-6'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className='relative w-20 h-20 rounded-full bg-brand-secondary/10 flex items-center justify-center overflow-hidden'>
            <UnifiedImage
              src={image}
              alt={image.alt || 'Icon'}
              mode='sized'
              width={64}
              height={64}
              sizeContext='icon'
              objectFit='contain'
              className='w-16 h-16'
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Header and Content - Center aligned */}
        <div className='flex flex-col gap-4 w-full'>
          <CardHeader
            title={title}
            subtitle={subtitle}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={fieldPathPrefix}
          />
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
      {/* Icon - Circular frame on left */}
      <div
        className='flex-shrink-0'
        {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
        <div className='relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-secondary/10 flex items-center justify-center overflow-hidden'>
          <UnifiedImage
            src={image}
            alt={image.alt || 'Icon'}
            mode='sized'
            width={64}
            height={64}
            sizeContext='icon'
            objectFit='contain'
            className='w-12 h-12 md:w-16 md:h-16'
            documentId={documentId}
            documentType={documentType}
            fieldPath={getFieldPath('image')}
          />
        </div>
      </div>

      {/* Header and Content - Left aligned */}
      <div className='flex-1 flex flex-col gap-4 text-left'>
        <CardHeader
          title={title}
          subtitle={subtitle}
          documentId={documentId}
          documentType={documentType}
          fieldPathPrefix={fieldPathPrefix}
        />
        {renderContent()}
      </div>
    </CardContainer>
  );
};

export default CardIcon;
