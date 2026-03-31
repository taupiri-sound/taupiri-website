import { urlFor } from '@/sanity/lib/image';
import type { SEO_META_DATA_QUERYResult, BUSINESS_INFO_QUERYResult, COMPANY_LINKS_QUERYResult } from '@/sanity/types';
import type { ImageObjectData } from '@/lib/imageUtils';

export interface OrganisationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: string;
  sameAs?: string[];
}

export interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string;
  priceRange?: string;
  image?: string;
  logo?: string;
  areaServed?: ReadonlyArray<{
    readonly type: string;
    readonly name: string;
  }>;
  sameAs?: readonly string[];
}

export interface WebSiteData {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export interface BlogPostData {
  headline: string;
  description?: string;
  image?: string | ImageObjectData;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    type?: string;
  };
  publisher: OrganisationData;
  url: string;
}

export interface ArticleData {
  headline: string;
  description?: string;
  image?: string | ImageObjectData;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    type?: string;
  };
  publisher: OrganisationData;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateImageObjectSchema(data: ImageObjectData) {
  return {
    '@type': 'ImageObject',
    url: data.url,
    ...(data.width && { width: data.width }),
    ...(data.height && { height: data.height }),
    ...(data.alt && { description: data.alt }),
    ...(data.caption && { caption: data.caption }),
  };
}

export function generateOrganisationSchema(data: OrganisationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
    ...(data.email && { email: `mailto:${data.email}` }),
    ...(data.telephone && { telephone: data.telephone }),
    ...(data.address && { address: data.address }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
  };
}

export function generateLocalBusinessSchema(data: LocalBusinessData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    email: `mailto:${data.email}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      postalCode: data.address.postalCode,
      addressRegion: data.address.addressRegion,
      addressCountry: data.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    ...(data.openingHours && { openingHours: data.openingHours }),
    ...(data.priceRange && { priceRange: data.priceRange }),
    ...(data.image && { image: data.image }),
    ...(data.logo && { logo: data.logo }),
    ...(data.areaServed &&
      data.areaServed.length > 0 && {
        areaServed: data.areaServed.map(area => ({
          '@type': area.type,
          name: area.name,
        })),
      }),
    ...(data.sameAs && data.sameAs.length > 0 && { sameAs: data.sameAs }),
  };
}

export function generateWebSiteSchema(data: WebSiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
    ...(data.potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: data.potentialAction.target,
        'query-input': data.potentialAction.queryInput,
      },
    }),
  };
}

export function generateBlogPostSchema(data: BlogPostData) {
  const imageSchema = data.image
    ? typeof data.image === 'string'
      ? data.image
      : generateImageObjectSchema(data.image)
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    ...(data.description && { description: data.description }),
    ...(imageSchema && { image: imageSchema }),
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': data.author.type || 'Person',
      name: data.author.name,
    },
    publisher: generateOrganisationSchema(data.publisher),
    url: data.url,
  };
}

export function generateArticleSchema(data: ArticleData) {
  const imageSchema = data.image
    ? typeof data.image === 'string'
      ? data.image
      : generateImageObjectSchema(data.image)
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    ...(data.description && { description: data.description }),
    ...(imageSchema && { image: imageSchema }),
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': data.author.type || 'Person',
      name: data.author.name,
    },
    publisher: generateOrganisationSchema(data.publisher),
    url: data.url,
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getOrganisationDataFromSeoMetaData(
  seoMetaData: SEO_META_DATA_QUERYResult,
  baseUrl: string,
  businessInfo?: BUSINESS_INFO_QUERYResult
): OrganisationData {
  return {
    name: seoMetaData?.siteTitle || businessInfo?.organisationName || '',
    url: baseUrl,
    ...(businessInfo?.email?.value && { email: businessInfo.email.value }),
    ...(businessInfo?.phone?.value && { telephone: businessInfo.phone.value }),
    ...(businessInfo?.address?.value && { address: businessInfo.address.value }),
    ...(seoMetaData?.siteDescription && { description: seoMetaData.siteDescription }),
    ...(seoMetaData?.defaultOgImage && {
      logo: urlFor(seoMetaData.defaultOgImage).width(512).height(512).url(),
    }),
  };
}

export function getWebSiteDataFromSeoMetaData(
  seoMetaData: SEO_META_DATA_QUERYResult,
  baseUrl: string
): WebSiteData {
  return {
    name: seoMetaData?.siteTitle || '',
    url: baseUrl,
    ...(seoMetaData?.siteDescription && { description: seoMetaData.siteDescription }),
  };
}

/**
 * Generates LocalBusiness structured data from site settings and Sanity businessInfo.
 *
 * Business-specific data (location, hours, service areas) is managed in the
 * "Business & Contact Info" singleton in Sanity Studio.
 */
export function getLocalBusinessDataFromSeoMetaData(
  seoMetaData: SEO_META_DATA_QUERYResult,
  baseUrl: string,
  businessInfo?: BUSINESS_INFO_QUERYResult,
  companyLinksData?: COMPANY_LINKS_QUERYResult | null
): LocalBusinessData {
  const socialUrls =
    companyLinksData?._type === 'companyLinks'
      ? (companyLinksData.companyLinks?.socialLinksArray
          ?.map((link) => link.url)
          .filter((url): url is string => !!url) ?? [])
      : [];

  const loc = businessInfo?.businessLocation;
  const priceRange = businessInfo?.priceRange;

  return {
    name: seoMetaData?.siteTitle || businessInfo?.organisationName || '',
    description: seoMetaData?.siteDescription || businessInfo?.organisationDescription || '',
    url: baseUrl,
    telephone: businessInfo?.phone?.value || '',
    email: businessInfo?.email?.value || '',
    address: {
      streetAddress: loc?.streetAddress || '',
      addressLocality: loc?.addressLocality || '',
      postalCode: loc?.postalCode || '',
      addressRegion: loc?.addressRegion || '',
      addressCountry: loc?.addressCountry || '',
    },
    geo: {
      latitude: parseFloat(loc?.latitude || '0'),
      longitude: parseFloat(loc?.longitude || '0'),
    },
    ...(businessInfo?.businessHours && { openingHours: businessInfo.businessHours }),
    ...(priceRange && priceRange !== '' && { priceRange }),
    ...(seoMetaData?.defaultOgImage && {
      image: urlFor(seoMetaData.defaultOgImage).width(1200).height(630).url(),
    }),
    ...(seoMetaData?.defaultOgImage && {
      logo: urlFor(seoMetaData.defaultOgImage).width(512).height(512).url(),
    }),
    areaServed: (businessInfo?.serviceAreas ?? [])
      .filter((a): a is { _key: string; type: string; name: string } => !!a.type && !!a.name),
    sameAs: socialUrls,
  };
}

export function generateStructuredDataScript(schema: object) {
  return {
    __html: JSON.stringify(schema),
  };
}
