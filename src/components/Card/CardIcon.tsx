'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';
import { renderBlock } from '@/utils/blockRenderer';
import CardHeader from './CardHeader';
import type { BaseCardProps, CardImage, CardLayoutStyle } from './types';

interface CardIconProps extends BaseCardProps {
  image: CardImage;
  layoutStyle: CardLayoutStyle;
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
    createDataAttributeConfig,
  } = props;

  // Get field path for live editing
  const getFieldPath = (field: string) => (fieldPathPrefix ? `${fieldPathPrefix}.${field}` : field);

  // Determine alignment based on layout style
  // Note: rowLarge and rowSmall are treated as 'row' for Icon cards
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
          className='mb-2'
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <UnifiedImage
            src={image}
            alt={image.alt || 'Icon'}
            mode='sized'
            width={100}
            height={100}
            sizeContext='profile'
            objectFit='contain'
            className='w-10 h-10'
            documentId={documentId}
            documentType={documentType}
            fieldPath={getFieldPath('image')}
          />
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

  // Row layout
  return (
    <CardContainer
      className={`${className} flex flex-row gap-6 items-start`}
      isGridChild={isGridChild}>
      {/* Icon - Circular frame on left */}
      <div
        className='flex-shrink-0'
        {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
        <UnifiedImage
          src={image}
          alt={image.alt || 'Icon'}
          mode='sized'
          width={100}
          height={100}
          sizeContext='profile'
          objectFit='contain'
          className='w-16 h-16 md:w-18 md:h-18'
          documentId={documentId}
          documentType={documentType}
          fieldPath={getFieldPath('image')}
        />
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

export default CardIcon;
