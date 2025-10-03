import React from 'react';
import { PortableText, stegaClean } from 'next-sanity';
import { createComponents } from '@/sanity/portableTextComponents';
import type { RichTextBlock } from '@/types/blocks';
import { getTextAlignClass, type TextAlignment } from '../../utils/sectionHelpers';
import { resolveAlignment } from './shared/alignmentUtils';

type RichTextProps = RichTextBlock & {
  inheritAlignment?: 'left' | 'center' | 'right';
};

const RichText = ({
  content,
  textAlign = 'inherit',
  isCallout = false,
  inheritAlignment,
}: RichTextProps) => {
  // Clean the values to remove Sanity's stega encoding
  const cleanTextAlign = stegaClean(textAlign) || 'inherit';
  const cleanIsCallout = stegaClean(isCallout) || false;

  // Determine the effective text alignment
  // Resolve alignment for both callouts and regular text
  const resolved = resolveAlignment(cleanTextAlign, inheritAlignment);
  const effectiveTextAlign: TextAlignment = resolved || 'center';
  if (!content) {
    return null;
  }

  // The portable text components now handle alignment directly

  // Create components with alignment context
  const alignedComponents = createComponents(effectiveTextAlign);

  const proseContent = (
    <div
      className={`prose prose-slate max-w-none text-text-subtle ${getTextAlignClass(effectiveTextAlign)}`}>
      <PortableText value={content} components={alignedComponents} />
    </div>
  );

  // If it's a callout, wrap in Card-style container
  if (cleanIsCallout) {
    return (
      <div className='bg-brand-white-dark rounded-tr-lg rounded-br-lg px-6 py-4 max-w-none border-l-4 border-brand-primary shadow-sm'>
        {proseContent}
      </div>
    );
  }

  return proseContent;
};

export default RichText;
