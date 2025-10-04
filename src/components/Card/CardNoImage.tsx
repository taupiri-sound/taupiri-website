'use client';

import React from 'react';
import CardContainer from '../UI/CardContainer';
import { renderBlock } from '@/utils/blockRenderer';
import CardHeader from './CardHeader';
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
    <CardContainer className={`${className} flex flex-col text-left`} isGridChild={isGridChild}>
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
};

export default CardNoImage;
