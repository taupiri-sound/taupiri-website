'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { renderBlock } from '@/utils/blockRenderer';
import type { BaseCardProps } from './types';

interface CardNoImageProps extends BaseCardProps {
  layoutStyle: 'stacked' | 'row';
}

const CardNoImage = (props: CardNoImageProps) => {
  const {
    title,
    subtitle,
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
        <div className='flex flex-col gap-4 w-full'>
          {renderHeader()}
          {renderContent()}
        </div>
      </CardContainer>
    );
  }

  // Row layout
  return (
    <CardContainer className={`${className} flex flex-col text-left`} isGridChild={isGridChild}>
      <div className='flex flex-col gap-4 w-full'>
        {renderHeader()}
        {renderContent()}
      </div>
    </CardContainer>
  );
};

export default CardNoImage;
