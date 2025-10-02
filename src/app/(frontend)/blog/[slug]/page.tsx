import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAdjacentBlogPosts } from '@/actions/blog';
import { getCompanyLinks, getSiteSettings } from '@/actions';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageBuilder from '@/components/PageBuilder';
import { FaUser, FaCalendar } from 'react-icons/fa6';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { urlFor } from '@/sanity/lib/image';
import type { PAGE_QUERYResult } from '@/sanity/types';
import { blogHeaderBottomSpacing, closingCardSpacing } from '@/utils/spacingConstants';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';
import {
  generateBlogPostSchema,
  getOrganizationDataFromSiteSettings,
  generateStructuredDataScript,
} from '@/lib/structuredData';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';
import { normalizeClosingCardForCard } from '@/utils/closingCardHelpers';
import BlogPostNavigation from '@/components/Blog/BlogPostNavigation';
import CTA from '@/components/UI/CTA';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatBlogDate(
  createdAt: string,
  overrideDate?: string | null,
  hasOverrideDate?: boolean | null
): string {
  const date = hasOverrideDate && overrideDate ? new Date(overrideDate) : new Date(createdAt);
  return date
    .toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [siteSettings, post] = await Promise.all([getSiteSettings(), getBlogPostBySlug(slug)]);

  if (!siteSettings) {
    return {
      title: 'Blog Post | Taupiri Sound',
      description: 'Read our latest article',
    };
  }

  if (!post) {
    return {
      title: 'Blog Post Not Found | Taupiri Sound',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  return generatePageMetadata({
    title: post.title || undefined,
    description: post.subtitle || siteSettings.siteDescription || undefined,
    siteSettings,
    image: post.mainImage?.asset?._ref ? post.mainImage : undefined, // Only pass image if it exists, otherwise use default
    canonicalUrl: generateCanonicalUrl(`/blog/${slug}`),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, companyLinks, siteSettings, adjacentPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getCompanyLinks(),
    getSiteSettings(),
    getAdjacentBlogPosts(slug),
  ]);

  if (!post) {
    notFound();
  }

  const formattedDate = formatBlogDate(post._createdAt, post.overrideDate, post.hasOverrideDate);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0717records.com';

  // Generate breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title || 'Blog Post', url: `${baseUrl}/blog/${slug}` },
  ];

  // Generate BlogPosting structured data
  let blogPostSchema;
  if (siteSettings) {
    const publishDate =
      post.hasOverrideDate && post.overrideDate ? post.overrideDate : post._createdAt;
    const modifiedDate = post._updatedAt;

    const organizationData = getOrganizationDataFromSiteSettings(siteSettings, baseUrl);

    blogPostSchema = generateBlogPostSchema({
      headline: post.title || 'Blog Post',
      description: post.subtitle || undefined,
      image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
      datePublished: publishDate,
      dateModified: modifiedDate,
      author: {
        name: post.author || siteSettings.siteTitle || 'Taupiri Sound',
        type: 'Person',
      },
      publisher: organizationData,
      url: `${baseUrl}/blog/${slug}`,
    });
  }

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {blogPostSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={generateStructuredDataScript(blogPostSchema)}
        />
      )}

      {/* Page Hero - No title, back to blog */}
      <PageHero
        heroImage={post.blogIndexHeroImage || '/images/hero-bg/hero-bg-option7-2.webp'}
        documentId={post._id}
        documentType={post._type}
        showBreadcrumb={true}
        breadcrumbPageTitle='Blog'
        breadcrumbClickable={true}
        breadcrumbHref='/blog'
      />

      <Container textAlign='left'>
        {/* Article Header */}
        <div className={`text-left ${blogHeaderBottomSpacing}`}>
          {/* Title */}
          <h1 className='mb-4 text-h1 font-bold text-gray-900 leading-tight'>{post.title}</h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className='mb-6 md:mb-8 text-body-2xl text-text-subtle leading-relaxed whitespace-pre-line'>
              {post.subtitle}
            </p>
          )}

          {/* Author and Date */}
          <div className='flex flex-wrap items-center gap-4'>
            {/* Author */}
            {post.author && (
              <div className='flex items-center text-text-subtle text-body-base'>
                <FaUser className='mr-2 text-brand-secondary' />
                <span>{post.author}</span>
              </div>
            )}

            {/* Date */}
            <div className='flex items-center text-text-subtle text-body-base'>
              <FaCalendar className='mr-2 text-brand-secondary' />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Horizontal line */}
          <hr className='border-t border-gray-200' />
        </div>

        {/* Main Image - displayed between horizontal line and content */}
        {post.mainImage && (
          <div className={`'w-full ${blogHeaderBottomSpacing}`}>
            <div className='relative w-full aspect-[16/9] overflow-hidden rounded-lg'>
              <UnifiedImage
                src={post.mainImage}
                alt={post.title || 'Blog post image'}
                mode='fill'
                sizeContext='hero'
                objectFit='cover'
                priority
                generateSchema
                schemaContext='blog'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
                className='rounded-lg'
              />
            </div>
          </div>
        )}

        {/* Article Content Container */}
        {post.content && (
          <div className='bg-white rounded-lg shadow-sm px-6 md:px-16 py-6 md:py-8'>
            <div className='text-left'>
              <PageBuilder
                content={post.content as NonNullable<PAGE_QUERYResult>['content']}
                documentId={post._id}
                documentType='blogPost'
                companyLinks={companyLinks}
                alignment='left'
              />
            </div>
          </div>
        )}

        {/* Prev & Next Links */}
        <BlogPostNavigation prevPost={adjacentPosts?.nextPost} nextPost={adjacentPosts?.prevPost} />

        <div className='flex justify-center mt-8'>
          <CTA href='/blog' variant='outline'>
            Back to blog
          </CTA>
        </div>

        {/* Closing Card */}
        {post.hasClosingCard && post.closingCard && (
          <div className={closingCardSpacing}>
            <Card
              {...normalizeClosingCardForCard(post.closingCard)}
              documentId={post._id}
              documentType={post._type}
              fieldPathPrefix='closingCard'
            />
          </div>
        )}
      </Container>
    </>
  );
}
