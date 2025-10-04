import React from 'react';
import { createDataAttribute } from 'next-sanity';
import type { COMPANY_LINKS_QUERYResult } from '@/sanity/types';
import type { SiteSettingsProps } from '@/types/shared';

// Import all block components
import RichText from '@/components/blocks/RichText';
import Quote from '@/components/blocks/Quote';
import TwoColumnLayout from '@/components/blocks/TwoColumnLayout';
import CTAButton from '@/components/blocks/CTAButton';
import CTACalloutLinkComponent from '@/components/blocks/CTACalloutLink';
import CTABlogPost from '@/components/blocks/CTABlogPost';
import ImageBlock from '@/components/blocks/Image';
import ImageGallery from '@/components/blocks/ImageGallery';
import YouTubeVideo from '@/components/blocks/YouTubeVideo';
import SpotifyWidget from '@/components/blocks/SpotifyWidget';
import BandcampWidget from '@/components/blocks/BandcampWidget';
import CompanyLinksBlock from '@/components/blocks/CompanyLinksBlock';
import BlockList from '@/components/blocks/BlockList';
import Divider from '@/components/UI/Divider';

interface RenderBlockConfig {
  projectId?: string;
  dataset?: string;
  baseUrl?: string;
}

interface RenderBlockOptions {
  documentId?: string;
  documentType?: string;
  blockPath: string;
  siteSettings?: SiteSettingsProps;
  companyLinks?: COMPANY_LINKS_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
  config?: RenderBlockConfig;
}

/**
 * Shared block rendering logic used by both PageBuilder and Card components.
 * This eliminates duplication and ensures consistent block rendering across the app.
 */
export const renderBlock = (block: any, options: RenderBlockOptions): React.ReactNode => {
  const {
    documentId,
    documentType,
    blockPath,
    siteSettings,
    companyLinks,
    alignment = 'center',
    config,
  } = options;

  // Wrapper for Sanity live editing
  const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
    if (documentId && documentType && config) {
      return (
        <div
          data-sanity={createDataAttribute({
            ...config,
            id: documentId,
            type: documentType,
            path: blockPath,
          }).toString()}>
          {children}
        </div>
      );
    }
    return <div>{children}</div>;
  };

  switch (block._type) {
    case 'divider':
      return (
        <BlockWrapper key={block._key}>
          <Divider alignment='center' useFixedWidth={true} />
        </BlockWrapper>
      );

    case 'richText':
      return (
        <BlockWrapper key={block._key}>
          <RichText {...block} inheritAlignment={alignment} />
        </BlockWrapper>
      );

    case 'quote':
      return (
        <BlockWrapper key={block._key}>
          <Quote {...block} inheritAlignment={alignment} />
        </BlockWrapper>
      );

    case 'twoColumnLayout':
      return (
        <BlockWrapper key={block._key}>
          <TwoColumnLayout
            {...block}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
            siteSettings={siteSettings}
            companyLinks={companyLinks}
            alignment={alignment}
          />
        </BlockWrapper>
      );

    case 'ctaButton':
      return (
        <BlockWrapper key={block._key}>
          <CTAButton {...block} inheritAlignment={alignment} />
        </BlockWrapper>
      );

    case 'ctaCalloutLink':
      return (
        <BlockWrapper key={block._key}>
          <CTACalloutLinkComponent {...block} />
        </BlockWrapper>
      );

    case 'ctaBlogPost':
      return (
        <BlockWrapper key={block._key}>
          <CTABlogPost {...block} />
        </BlockWrapper>
      );

    case 'imageBlock':
      return (
        <BlockWrapper key={block._key}>
          <ImageBlock
            {...block}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );

    case 'imageGallery':
      return (
        <BlockWrapper key={block._key}>
          <ImageGallery
            {...block}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );

    case 'youTubeVideo':
      return (
        <BlockWrapper key={block._key}>
          <YouTubeVideo {...block} />
        </BlockWrapper>
      );

    case 'spotifyWidget':
      return (
        <BlockWrapper key={block._key}>
          <SpotifyWidget
            {...block}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );

    case 'bandcampWidget':
      return (
        <BlockWrapper key={block._key}>
          <BandcampWidget
            {...block}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );

    case 'companyLinksBlock':
      return (
        <BlockWrapper key={block._key}>
          <CompanyLinksBlock {...block} companyLinks={companyLinks?.companyLinks || null} />
        </BlockWrapper>
      );

    case 'blockList':
      return (
        <BlockWrapper key={block._key}>
          <BlockList
            {...block}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={blockPath}
          />
        </BlockWrapper>
      );

    default:
      return null;
  }
};
