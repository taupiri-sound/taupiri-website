'use client';

import React from 'react';
import type {
  PAGE_QUERYResult,
  COMPANY_LINKS_QUERYResult,
} from '@/sanity/types';
import type { NestedBlock, BlockListBlock } from '@/types/blocks';
import type { SiteSettingsProps } from '@/types/shared';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';
import { useOptimistic } from 'react';
import { pageSectionTopSpacing, contentBlockBottomSpacing, subSectionTopSpacing } from '@/utils/spacingConstants';
import PageSection from './Layout/PageSection';
import SubSection from './Layout/SubSection';
import SubSubSection from './Layout/SubSubSection';
import RichText from './blocks/RichText';
import Quote from './blocks/Quote';
import TwoColumnLayout from './blocks/TwoColumnLayout';
import Card from './blocks/Card';
import CTAButton from './blocks/CTAButton';
import CTACalloutLinkComponent from './blocks/CTACalloutLink';
import CTABlogPost from './blocks/CTABlogPost';
import GridLayout from './blocks/GridLayout';
import ImageBlock from './blocks/Image';
import ImageGallery from './blocks/ImageGallery';
import YouTubeVideo from './blocks/YouTubeVideo';
import SpotifyWidget from './blocks/SpotifyWidget';
import BandcampWidget from './blocks/BandcampWidget';
import CompanyLinksBlock from './blocks/CompanyLinksBlock';
import BlockList from './blocks/BlockList';
import Divider from './UI/Divider';

// Shared interface for common props used across PageBuilder components
interface SharedPageBuilderProps {
  documentId: string;
  documentType: string;
  siteSettings?: SiteSettingsProps;
  companyLinks?: COMPANY_LINKS_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
}

type PageBuilderProps = SharedPageBuilderProps & {
  content: NonNullable<PAGE_QUERYResult>['content'];
  pathPrefix?: string;
};

type BlockRendererProps = SharedPageBuilderProps & {
  blocks: NestedBlock[];
  pathPrefix: string;
  nestingLevel?: number;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

// Universal block renderer that can handle any block type at any nesting level
const BlockRenderer = ({
  blocks,
  documentId,
  documentType,
  pathPrefix,
  nestingLevel = 1,
  siteSettings,
  companyLinks,
  alignment = 'center',
}: BlockRendererProps) => {
  if (!Array.isArray(blocks)) {
    return null;
  }

  // Filter out hidden sections for spacing calculations
  const visibleBlocks = blocks.filter((block) => {
    if (block._type === 'pageSection' || block._type === 'subSection' || block._type === 'subSubSection') {
      const sectionBlock = block as { hideSection?: boolean };
      return !sectionBlock.hideSection;
    }
    return true;
  });

  return (
    <>
      {blocks.map((block) => {
        // Check if this section should be hidden from frontend but preserve for click-to-edit
        const isHiddenSection = (block._type === 'pageSection' || block._type === 'subSection' || block._type === 'subSubSection') && 
          (block as { hideSection?: boolean }).hideSection;
        
        // If hidden, render an invisible div that maintains click-to-edit functionality
        // but excludes content from screen readers, SEO crawlers, and page inspection
        if (isHiddenSection) {
          const blockPath = `${pathPrefix}[_key=="${block._key}"]`;
          return (
            <div
              key={block._key}
              className="hidden"
              aria-hidden="true"
              role="presentation"
              style={{ display: 'none' }}
              data-noindex="true"
              data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: blockPath,
              }).toString()}>
              {/* Hidden section - completely excluded from accessibility tree and SEO */}
            </div>
          );
        }

        // Find position in visible blocks for spacing calculations
        const visibleIndex = visibleBlocks.findIndex(b => b._key === block._key);
        const blockPath = `${pathPrefix}[_key=="${block._key}"]`;

        const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
          const isLastBlock = visibleIndex === visibleBlocks.length - 1;
          const hasSiblingBefore = visibleIndex > 0;
          
          let marginClass = '';
          
          if (block._type === 'pageSection') {
            // SPACE_B: PageSection that comes after orphaned content blocks
            const previousBlock = hasSiblingBefore ? visibleBlocks[visibleIndex - 1] : null;
            const hasOrphanedContentBefore = previousBlock &&
              previousBlock._type !== 'pageSection' &&
              previousBlock._type !== 'subSection' &&
              previousBlock._type !== 'subSubSection';
            
            if (hasOrphanedContentBefore) {
              marginClass = pageSectionTopSpacing;
            }
          } else if (block._type === 'subSection' || block._type === 'subSubSection') {
            // SPACE_H: SubSection/SubSubSection with sibling before it (top spacing)
            if (hasSiblingBefore) {
              marginClass = subSectionTopSpacing;
            }
            
            // Add bottom spacing if the next block is a content block (not a section)
            if (!isLastBlock) {
              const nextBlock = visibleBlocks[visibleIndex + 1];
              const nextBlockIsContentBlock = nextBlock && 
                nextBlock._type !== 'pageSection' && 
                nextBlock._type !== 'subSection' && 
                nextBlock._type !== 'subSubSection';
              
              if (nextBlockIsContentBlock) {
                marginClass = marginClass 
                  ? `${marginClass} ${contentBlockBottomSpacing}`
                  : contentBlockBottomSpacing;
              }
            }
          } else {
            // SPACE_G: Content blocks that aren't sections
            // Don't add spacing if this is the last block (PageSection bottom padding handles it)
            if (!isLastBlock) {
              marginClass = contentBlockBottomSpacing;
            }
          }

          return (
            <div
              className={marginClass}
              data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: blockPath,
              }).toString()}>
              {children}
            </div>
          );
        };

        // Handle nested content for blocks that support it
        const renderNestedContent = (nestedBlocks?: unknown[]) => {
          if (!nestedBlocks || !Array.isArray(nestedBlocks)) {
            return null;
          }
          return (
            <BlockRenderer
              blocks={nestedBlocks as NestedBlock[]}
              documentId={documentId}
              documentType={documentType}
              pathPrefix={`${blockPath}.content`}
              nestingLevel={nestingLevel + 1}
              siteSettings={siteSettings}
              companyLinks={companyLinks}
              alignment={alignment}
            />
          );
        };

        // Determine if this PageSection should have bottom padding
        const shouldApplyBottomPadding = (() => {
          if (block._type !== 'pageSection') return true;
          
          const isLastVisibleBlock = visibleIndex === visibleBlocks.length - 1;
          if (!isLastVisibleBlock) return true;
          
          // This is the last visible PageSection, check if there are orphaned content blocks after it
          const hasOrphanedContentAfter = visibleBlocks
            .slice(visibleIndex + 1)
            .some(afterBlock => 
              afterBlock._type !== 'pageSection' && 
              afterBlock._type !== 'subSection' && 
              afterBlock._type !== 'subSubSection'
            );
          
          // Apply padding if there are orphaned content blocks after this section
          return hasOrphanedContentAfter;
        })();

        // IMPORTANT: All block types should be wrapped in BlockWrapper to enable Sanity Live Editing.
        // BlockWrapper provides the necessary data-sanity attributes for visual editing in Sanity Studio.
        // Only skip BlockWrapper if the block component handles its own Sanity data attributes internally.
        switch (block._type) {
          case 'pageSection':
            return (
              <BlockWrapper key={block._key}>
                <PageSection
                  title={block.title!} // Required field
                  subtitle={block.subtitle}
                  topText={(block as { topText?: string }).topText}
                  anchorId={block.anchorId}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  subtitlePath={`${blockPath}.subtitle`}
                  topTextPath={`${blockPath}.topText`}
                  inheritAlignment={alignment}
                  textAlign={(block as { textAlign?: string }).textAlign}
                  shouldApplyBottomPadding={shouldApplyBottomPadding}
                  useCompactGap={(block as { useCompactGap?: boolean }).useCompactGap}>
                  {renderNestedContent(block.content)}
                </PageSection>
              </BlockWrapper>
            );

          case 'subSection':
            return (
              <BlockWrapper key={block._key}>
                <SubSection
                  title={block.title!} // Required field
                  anchorId={block.anchorId}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  inheritAlignment={alignment}
                  textAlign={(block as { textAlign?: string }).textAlign}>
                  {renderNestedContent(block.content)}
                </SubSection>
              </BlockWrapper>
            );

          case 'subSubSection':
            return (
              <BlockWrapper key={block._key}>
                <SubSubSection
                  title={block.title!} // Required field
                  anchorId={block.anchorId}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  inheritAlignment={alignment}
                  textAlign={(block as { textAlign?: string }).textAlign}>
                  {renderNestedContent(block.content)}
                </SubSubSection>
              </BlockWrapper>
            );

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

          case 'card':
            return (
              <BlockWrapper key={block._key}>
                <Card {...block} documentId={documentId} documentType={documentType} fieldPathPrefix={blockPath} />
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

          case 'gridLayout':
            return (
              <BlockWrapper key={block._key}>
                <GridLayout {...block} documentId={documentId} documentType={documentType} fieldPathPrefix={blockPath} />
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
                <CompanyLinksBlock companyLinks={companyLinks?.companyLinks || null} />
              </BlockWrapper>
            );

          case 'blockList':
            return (
              <BlockWrapper key={block._key}>
                <BlockList
                  {...(block as BlockListBlock)}
                  documentId={documentId}
                  documentType={documentType}
                  fieldPathPrefix={blockPath}
                />
              </BlockWrapper>
            );

          default: {
            // Handle unknown block types gracefully
            const unknownBlock = block as { _key: string; _type: string };
            return (
              <BlockWrapper key={unknownBlock._key}>
                <div>Block type &quot;{unknownBlock._type}&quot; not found</div>
              </BlockWrapper>
            );
          }
        }
      })}
    </>
  );
};

const PageBuilder = ({
  content,
  documentId,
  documentType,
  pathPrefix = 'content',
  siteSettings,
  companyLinks,
  alignment = 'center',
}: PageBuilderProps) => {
  const [sections] = useOptimistic<NonNullable<PAGE_QUERYResult>['content']>(content);

  if (!Array.isArray(sections)) {
    return null;
  }

  return (
    <div
      data-page-builder
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: pathPrefix,
      }).toString()}>
      <BlockRenderer
        blocks={sections as NestedBlock[]}
        documentId={documentId}
        documentType={documentType}
        pathPrefix={pathPrefix}
        siteSettings={siteSettings}
        companyLinks={companyLinks}
        alignment={alignment}
      />
    </div>
  );
};

export default PageBuilder;
