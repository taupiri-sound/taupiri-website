import React from 'react';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  documentId?: string;
  documentType?: string;
  fieldPathPrefix?: string;
}

const CardHeader = ({ title, subtitle, documentId, documentType, fieldPathPrefix }: CardHeaderProps) => {
  // Get field path for live editing
  const getFieldPath = (field: string) => (fieldPathPrefix ? `${fieldPathPrefix}.${field}` : field);

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

export default CardHeader;
