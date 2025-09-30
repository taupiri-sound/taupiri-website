import { NextResponse } from 'next/server';
import { getAllPages, getAllBlogPostsForSitemap, getTermsAndConditions, getPrivacyPolicy } from '@/actions';
import { SITE_CONFIG } from '@/lib/constants';
import type { ALL_PAGES_QUERYResult, ALL_BLOG_POSTS_SLUGS_QUERYResult } from '@/sanity/types';

// ISR: Cache for 1 hour, but allow immediate updates via webhook
export const revalidate = 3600;

type SitemapUrl = {
  url: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
};

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_CONFIG.PRODUCTION_DOMAIN;

  // Fetch all content from Sanity
  const [pages, blogPosts, termsAndConditions, privacyPolicy] = await Promise.all([
    getAllPages(),
    getAllBlogPostsForSitemap(),
    getTermsAndConditions(),
    getPrivacyPolicy(),
  ]);

  const staticPages: SitemapUrl[] = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/blog', changefreq: 'daily', priority: '0.9' },
  ];

  // Add legal pages if they exist and are not hidden
  const legalPages: SitemapUrl[] = [];

  if (termsAndConditions && !termsAndConditions.hide) {
    legalPages.push({
      url: '/terms-and-conditions',
      lastmod: termsAndConditions._updatedAt,
      changefreq: 'monthly',
      priority: '0.5'
    });
  }

  if (privacyPolicy && !privacyPolicy.hide) {
    legalPages.push({
      url: '/privacy-policy',
      lastmod: privacyPolicy._updatedAt,
      changefreq: 'monthly',
      priority: '0.5'
    });
  }

  const dynamicUrls: SitemapUrl[] = [
    // Blog posts
    ...(blogPosts || []).map((post: ALL_BLOG_POSTS_SLUGS_QUERYResult[number]) => ({
      url: `/blog/${post.slug?.current}`,
      lastmod: post._updatedAt,
      changefreq: 'monthly',
      priority: '0.7'
    })),
    // Dynamic pages
    ...(pages || []).map((page: ALL_PAGES_QUERYResult[number]) => ({
      url: `/${page.slug?.current}`,
      lastmod: page._updatedAt,
      changefreq: 'monthly',
      priority: '0.6'
    })),
  ];

  const allUrls = [...staticPages, ...legalPages, ...dynamicUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}