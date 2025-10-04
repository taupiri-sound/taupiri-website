import React from 'react';
import { createDataAttribute } from 'next-sanity';
import type {
  COMPANY_LINKS_QUERYResult,
  RichText as RichTextType,
  Quote as QuoteType,
  TwoColumnLayout as TwoColumnLayoutType,
  CtaButton as CtaButtonType,
  CtaCalloutLink as CtaCalloutLinkType,
  CtaBlogPost as CtaBlogPostType,
  ImageBlock as ImageBlockType,
  ImageGallery as ImageGalleryType,
  YouTubeVideo as YouTubeVideoType,
  SpotifyWidget as SpotifyWidgetType,
  BandcampWidget as BandcampWidgetType,
  CompanyLinksBlock as CompanyLinksBlockType,
  BlockList as BlockListType,
  Divider as DividerType,
} from '@/sanity/types';
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

// Add _key to block types (added by Sanity when blocks are in arrays)
type WithKey<T> = T & { _key: string };

// Union type of all possible block types with _key
type BlockType =
  | WithKey<RichTextType>
  | WithKey<QuoteType>
  | WithKey<TwoColumnLayoutType>
  | WithKey<CtaButtonType>
  | WithKey<CtaCalloutLinkType>
  | WithKey<CtaBlogPostType>
  | WithKey<ImageBlockType>
  | WithKey<ImageGalleryType>
  | WithKey<YouTubeVideoType>
  | WithKey<SpotifyWidgetType>
  | WithKey<BandcampWidgetType>
  | WithKey<CompanyLinksBlockType>
  | WithKey<BlockListType>
  | WithKey<DividerType>;

/**
 * Shared block rendering logic used by both PageBuilder and Card components.
 * This eliminates duplication and ensures consistent block rendering across the app.
 */
export const renderBlock = (block: unknown, options: RenderBlockOptions): React.ReactNode => {
  const {
    documentId,
    documentType,
    blockPath,
    siteSettings,
    companyLinks,
    alignment = 'center',
    config,
  } = options;

  // Type narrow to BlockType
  const typedBlock = block as BlockType;

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

  switch (typedBlock._type) {
    case 'divider': {
      const dividerBlock = typedBlock as WithKey<DividerType>;
      return (
        <BlockWrapper key={dividerBlock._key}>
          <Divider alignment='center' useFixedWidth={true} />
        </BlockWrapper>
      );
    }

    case 'richText': {
      const richTextBlock = typedBlock as WithKey<RichTextType>;
      return (
        <BlockWrapper key={richTextBlock._key}>
          <RichText {...richTextBlock} inheritAlignment={alignment} />
        </BlockWrapper>
      );
    }

    case 'quote': {
      const quoteBlock = typedBlock as WithKey<QuoteType>;
      return (
        <BlockWrapper key={quoteBlock._key}>
          <Quote {...quoteBlock} inheritAlignment={alignment} />
        </BlockWrapper>
      );
    }

    case 'twoColumnLayout': {
      const twoColBlock = typedBlock as WithKey<TwoColumnLayoutType>;
      return (
        <BlockWrapper key={twoColBlock._key}>
          <TwoColumnLayout
            {...twoColBlock}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
            siteSettings={siteSettings}
            companyLinks={companyLinks}
            alignment={alignment}
          />
        </BlockWrapper>
      );
    }

    case 'ctaButton': {
      const ctaButtonBlock = typedBlock as WithKey<CtaButtonType>;
      return (
        <BlockWrapper key={ctaButtonBlock._key}>
          <CTAButton {...ctaButtonBlock} inheritAlignment={alignment} />
        </BlockWrapper>
      );
    }

    case 'ctaCalloutLink': {
      const ctaCalloutBlock = typedBlock as WithKey<CtaCalloutLinkType>;
      return (
        <BlockWrapper key={ctaCalloutBlock._key}>
          <CTACalloutLinkComponent {...ctaCalloutBlock} />
        </BlockWrapper>
      );
    }

    case 'ctaBlogPost': {
      const ctaBlogPostBlock = typedBlock as WithKey<CtaBlogPostType>;
      return (
        <BlockWrapper key={ctaBlogPostBlock._key}>
          <CTABlogPost {...ctaBlogPostBlock} />
        </BlockWrapper>
      );
    }

    case 'imageBlock': {
      const imageBlockBlock = typedBlock as WithKey<ImageBlockType>;
      return (
        <BlockWrapper key={imageBlockBlock._key}>
          <ImageBlock
            {...imageBlockBlock}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );
    }

    case 'imageGallery': {
      const imageGalleryBlock = typedBlock as WithKey<ImageGalleryType>;
      return (
        <BlockWrapper key={imageGalleryBlock._key}>
          <ImageGallery
            {...imageGalleryBlock}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );
    }

    case 'youTubeVideo': {
      const youTubeBlock = typedBlock as WithKey<YouTubeVideoType>;
      return (
        <BlockWrapper key={youTubeBlock._key}>
          <YouTubeVideo {...youTubeBlock} />
        </BlockWrapper>
      );
    }

    case 'spotifyWidget': {
      const spotifyBlock = typedBlock as WithKey<SpotifyWidgetType>;
      return (
        <BlockWrapper key={spotifyBlock._key}>
          <SpotifyWidget
            {...spotifyBlock}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );
    }

    case 'bandcampWidget': {
      const bandcampBlock = typedBlock as WithKey<BandcampWidgetType>;
      return (
        <BlockWrapper key={bandcampBlock._key}>
          <BandcampWidget
            {...bandcampBlock}
            documentId={documentId}
            documentType={documentType}
            pathPrefix={blockPath}
          />
        </BlockWrapper>
      );
    }

    case 'companyLinksBlock': {
      const companyLinksBlockBlock = typedBlock as WithKey<CompanyLinksBlockType>;
      return (
        <BlockWrapper key={companyLinksBlockBlock._key}>
          <CompanyLinksBlock {...companyLinksBlockBlock} companyLinks={companyLinks?.companyLinks || null} />
        </BlockWrapper>
      );
    }

    case 'blockList': {
      const blockListBlock = typedBlock as WithKey<BlockListType>;
      return (
        <BlockWrapper key={blockListBlock._key}>
          <BlockList
            {...blockListBlock}
            documentId={documentId}
            documentType={documentType}
            fieldPathPrefix={blockPath}
          />
        </BlockWrapper>
      );
    }

    default:
      return null;
  }
};
