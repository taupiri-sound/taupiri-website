'use client';

import React from 'react';
import { stegaClean } from 'next-sanity';
import type { Card as CardType } from '@/sanity/types';
import { client } from '@/sanity/lib/client';
import CardNoImage from '../Card/CardNoImage';
import CardBanner from '../Card/CardBanner';
import CardProfile from '../Card/CardProfile';
import CardIcon from '../Card/CardIcon';

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
    title,
    subtitle,
    imageType = 'none',
    image,
    layoutStyle = 'stacked',
    content,
    className = '',
    isGridChild = false,
    documentId,
    documentType,
    fieldPathPrefix,
    siteSettings,
    companyLinks,
    alignment = 'center',
  } = props;

  const cleanTitle = stegaClean(title);
  const cleanSubtitle = stegaClean(subtitle);
  const cleanImageType = stegaClean(imageType) || 'none';

  // Always use 'stacked' for banner images, regardless of stored value
  const rawLayoutStyle = stegaClean(layoutStyle) || 'stacked';
  const cleanLayoutStyle = cleanImageType === 'banner' ? 'stacked' : rawLayoutStyle;

  // Don't render empty cards
  if (!content || content.length === 0) {
    return null;
  }

  // Common props for all card components
  const commonProps = {
    title: cleanTitle,
    subtitle: cleanSubtitle,
    content,
    className,
    isGridChild,
    documentId,
    documentType,
    fieldPathPrefix,
    siteSettings,
    companyLinks,
    alignment,
    createDataAttributeConfig,
  };

  // Banner Image - Stacked (only option for banner)
  if (cleanImageType === 'banner' && image?.asset?._ref) {
    return <CardBanner {...commonProps} image={image} />;
  }

  // Profile Image
  if (cleanImageType === 'profile' && image?.asset?._ref) {
    return <CardProfile {...commonProps} image={image} layoutStyle={cleanLayoutStyle} />;
  }

  // Icon
  if (cleanImageType === 'icon' && image?.asset?._ref) {
    return <CardIcon {...commonProps} image={image} layoutStyle={cleanLayoutStyle} />;
  }

  // No Image
  return <CardNoImage {...commonProps} layoutStyle={cleanLayoutStyle} />;
};

export default Card;
