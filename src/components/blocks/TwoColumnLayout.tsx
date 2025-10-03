'use client';

import React from 'react';
import type { NestedBlock, BlockListBlock } from '@/types/blocks';
import type { SiteSettingsProps } from '@/types/shared';
import type { COMPANY_LINKS_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';
import { contentBlockBottomSpacing } from '@/utils/spacingConstants';

// Import all block components
import RichText from './RichText';
import Quote from './Quote';
import Card from './Card';
import CTAButton from './CTAButton';
import CTACalloutLinkComponent from './CTACalloutLink';
import CTABlogPost from './CTABlogPost';
import ImageBlock from './Image';
import ImageGallery from './ImageGallery';
import YouTubeVideo from './YouTubeVideo';
import SpotifyWidget from './SpotifyWidget';
import BandcampWidget from './BandcampWidget';
import CompanyLinksBlock from './CompanyLinksBlock';
import BlockList from './BlockList';
import Divider from '../UI/Divider';

interface TwoColumnLayoutProps extends Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  leftColumn?: NestedBlock[];
  rightColumn?: NestedBlock[];
  className?: string;
  pathPrefix?: string;
  siteSettings?: SiteSettingsProps;
  companyLinks?: COMPANY_LINKS_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn = [],
  rightColumn = [],
  className = '',
  documentId,
  documentType,
  pathPrefix,
  siteSettings,
  companyLinks,
  alignment = 'center',
}) => {
  // Don't render if both columns are empty
  if (!leftColumn?.length && !rightColumn?.length) {
    return null;
  }

  // Render a single block within a column
  const renderBlock = (block: NestedBlock, columnPath: string, isLastInColumn: boolean) => {
    const blockPath = `${columnPath}[_key=="${block._key}"]`;
    const marginClass = !isLastInColumn ? contentBlockBottomSpacing : '';

    const blockElement = (() => {
      switch (block._type) {
        case 'divider':
          return <Divider />;

        case 'richText':
          return (
            <RichText
              {...block}
              inheritAlignment={alignment}
            />
          );

        case 'blockList':
          return (
            <BlockList
              {...(block as BlockListBlock)}
              documentId={documentId}
              documentType={documentType}
              fieldPathPrefix={blockPath}
            />
          );

        case 'quote':
          return <Quote {...block} inheritAlignment={alignment} />;

        case 'imageBlock':
          return (
            <ImageBlock
              {...block}
              documentId={documentId}
              documentType={documentType}
              pathPrefix={blockPath}
            />
          );

        case 'imageGallery':
          return (
            <ImageGallery
              {...block}
              documentId={documentId}
              documentType={documentType}
              pathPrefix={blockPath}
            />
          );

        case 'ctaButton':
          return <CTAButton {...block} />;

        case 'ctaCalloutLink':
          return <CTACalloutLinkComponent {...block} />;

        case 'ctaBlogPost':
          return <CTABlogPost {...block} />;

        case 'card':
          return <Card {...block} />;

        case 'youTubeVideo':
          return <YouTubeVideo {...block} />;

        case 'spotifyWidget':
          return <SpotifyWidget {...block} />;

        case 'bandcampWidget':
          return <BandcampWidget {...block} />;

        case 'companyLinksBlock':
          return companyLinks ? (
            <CompanyLinksBlock
              companyLinks={companyLinks.companyLinks || null}
            />
          ) : null;

        default:
          return null;
      }
    })();

    if (!blockElement) return null;

    return (
      <div
        key={block._key}
        className={marginClass}
        {...createSanityDataAttribute(documentId, documentType, blockPath)}>
        {blockElement}
      </div>
    );
  };

  // Create data attributes for Sanity live editing
  const leftColumnDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, `${pathPrefix}.leftColumn`)
    : {};
  const rightColumnDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, `${pathPrefix}.rightColumn`)
    : {};

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${className}`.trim()}>
      {/* Left Column */}
      <div {...leftColumnDataAttribute}>
        {leftColumn.map((block, index) =>
          renderBlock(block, `${pathPrefix}.leftColumn`, index === leftColumn.length - 1)
        )}
      </div>

      {/* Right Column */}
      <div {...rightColumnDataAttribute}>
        {rightColumn.map((block, index) =>
          renderBlock(block, `${pathPrefix}.rightColumn`, index === rightColumn.length - 1)
        )}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
