'use client';

import React from 'react';
import { stegaClean } from 'next-sanity';
import type { Card as CardType } from '@/sanity/types';
import CardContainer from '../UI/CardContainer';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';

// Import all block components that can be used in card content
import RichText from './RichText';
import Quote from './Quote';
import TwoColumnLayout from './TwoColumnLayout';
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

import type { SiteSettingsProps } from '@/types/shared';
import type { COMPANY_LINKS_QUERYResult } from '@/sanity/types';

interface CardProps extends Omit<CardType, '_type'> {
  _key?: string;
  className?: string;
  isGridChild?: boolean;
  documentId?: string;
  documentType?: string;
  fieldPathPrefix?: string;
  siteSettings?: SiteSettingsProps;
  companyLinks?: COMPANY_LINKS_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
}

const { projectId, dataset, stega } = client.config();
const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

const Card = (props: CardProps) => {
  const {
    imageType = 'none',
    image,
    layoutStyle = 'stacked',
    content,
    className = '',
    isGridChild = false,
    documentId,
    documentType,
    fieldPathPrefix,
    _key,
    siteSettings,
    companyLinks,
    alignment = 'center',
  } = props;

  const cleanImageType = stegaClean(imageType) || 'none';
  const cleanLayoutStyle = stegaClean(layoutStyle) || 'stacked';

  // Don't render empty cards
  if (!content || content.length === 0) {
    return null;
  }

  // Get field path for live editing
  const getFieldPath = (field: string) => (fieldPathPrefix ? `${fieldPathPrefix}.${field}` : field);

  // Render content blocks
  const renderContent = () => {
    if (!content) return null;

    return content.map((block, index) => {
      const blockPath = `${getFieldPath('content')}[_key=="${block._key}"]`;

      // Wrapper for Sanity live editing
      const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
        if (documentId && documentType) {
          return (
            <div
              data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
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
              <Divider alignment="center" useFixedWidth={true} />
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
              <SpotifyWidget {...block} />
            </BlockWrapper>
          );

        case 'bandcampWidget':
          return (
            <BlockWrapper key={block._key}>
              <BandcampWidget {...block} />
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
    });
  };

  // Banner Image - Stacked (only option for banner)
  if (cleanImageType === 'banner' && image?.asset?._ref) {
    return (
      <CardContainer className={`${className} flex flex-col`} isGridChild={isGridChild}>
        {/* Banner Image - Full width at top */}
        <div
          className="relative w-full h-48 min-h-[12rem] max-h-64 overflow-hidden"
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <UnifiedImage
            src={image}
            alt={image.alt || 'Card banner image'}
            mode="fill"
            sizeContext="card"
            objectFit="cover"
            generateSchema
            schemaContext="article"
            documentId={documentId}
            documentType={documentType}
            fieldPath={getFieldPath('image')}
          />
        </div>

        {/* Content - Center aligned */}
        <div className="flex flex-col gap-4 p-6 text-center items-center">{renderContent()}</div>
      </CardContainer>
    );
  }

  // Profile Image - Stacked
  if (cleanImageType === 'profile' && cleanLayoutStyle === 'stacked' && image?.asset?._ref) {
    return (
      <CardContainer
        className={`${className} flex flex-col text-center items-center`}
        isGridChild={isGridChild}>
        {/* Profile Image - Square frame at top center */}
        <div
          className="mb-6"
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            <UnifiedImage
              src={image}
              alt={image.alt || 'Profile image'}
              mode="fill"
              sizeContext="profile"
              objectFit="cover"
              generateSchema
              schemaContext="profile"
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Content - Center aligned */}
        <div className="flex flex-col gap-4 w-full">{renderContent()}</div>
      </CardContainer>
    );
  }

  // Profile Image - Row
  if (cleanImageType === 'profile' && cleanLayoutStyle === 'row' && image?.asset?._ref) {
    return (
      <CardContainer className={`${className} flex flex-row gap-6 items-start`} isGridChild={isGridChild}>
        {/* Profile Image - Left side square frame */}
        <div
          className="flex-shrink-0"
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
            <UnifiedImage
              src={image}
              alt={image.alt || 'Profile image'}
              mode="fill"
              sizeContext="profile"
              objectFit="cover"
              generateSchema
              schemaContext="profile"
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Content - Left aligned */}
        <div className="flex-1 flex flex-col gap-4 text-left">{renderContent()}</div>
      </CardContainer>
    );
  }

  // Icon - Stacked
  if (cleanImageType === 'icon' && cleanLayoutStyle === 'stacked' && image?.asset?._ref) {
    return (
      <CardContainer
        className={`${className} flex flex-col text-center items-center`}
        isGridChild={isGridChild}>
        {/* Icon - Circular frame at top center */}
        <div
          className="mb-6"
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className="relative w-20 h-20 rounded-full bg-brand-secondary/10 flex items-center justify-center overflow-hidden">
            <UnifiedImage
              src={image}
              alt={image.alt || 'Icon'}
              mode="sized"
              width={64}
              height={64}
              sizeContext="icon"
              objectFit="contain"
              className="w-16 h-16"
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Content - Center aligned */}
        <div className="flex flex-col gap-4 w-full">{renderContent()}</div>
      </CardContainer>
    );
  }

  // Icon - Row
  if (cleanImageType === 'icon' && cleanLayoutStyle === 'row' && image?.asset?._ref) {
    return (
      <CardContainer className={`${className} flex flex-row gap-6 items-start`} isGridChild={isGridChild}>
        {/* Icon - Circular frame on left */}
        <div
          className="flex-shrink-0"
          {...createSanityDataAttribute(documentId, documentType, getFieldPath('image'))}>
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-secondary/10 flex items-center justify-center overflow-hidden">
            <UnifiedImage
              src={image}
              alt={image.alt || 'Icon'}
              mode="sized"
              width={64}
              height={64}
              sizeContext="icon"
              objectFit="contain"
              className="w-12 h-12 md:w-16 md:h-16"
              documentId={documentId}
              documentType={documentType}
              fieldPath={getFieldPath('image')}
            />
          </div>
        </div>

        {/* Content - Left aligned */}
        <div className="flex-1 flex flex-col gap-4 text-left">{renderContent()}</div>
      </CardContainer>
    );
  }

  // No Image - Stacked
  if (cleanImageType === 'none' && cleanLayoutStyle === 'stacked') {
    return (
      <CardContainer
        className={`${className} flex flex-col text-center items-center`}
        isGridChild={isGridChild}>
        <div className="flex flex-col gap-4 w-full">{renderContent()}</div>
      </CardContainer>
    );
  }

  // No Image - Row
  if (cleanImageType === 'none' && cleanLayoutStyle === 'row') {
    return (
      <CardContainer className={`${className} flex flex-col text-left`} isGridChild={isGridChild}>
        <div className="flex flex-col gap-4 w-full">{renderContent()}</div>
      </CardContainer>
    );
  }

  // Fallback - render content only
  return (
    <CardContainer
      className={`${className} flex flex-col text-center items-center`}
      isGridChild={isGridChild}>
      <div className="flex flex-col gap-4 w-full">{renderContent()}</div>
    </CardContainer>
  );
};

export default Card;
