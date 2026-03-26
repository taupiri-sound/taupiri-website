import BlogList from '@/components/Blog/BlogList';
import { getAllBlogPosts, getBlogIndexPage } from '@/actions/blog';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/_blocks/Card';
import { closingCardSpacing } from '@/utils/spacingConstants';
import { getSeoMetaData, getCompanyLinks } from '@/actions';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl, getBaseUrl } from '@/lib/metadata';
import { normalizeClosingCardForCard } from '@/utils/closingCardHelpers';
import Breadcrumb from '@/components/UI/Breadcrumb';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';

export async function generateMetadata() {
  const [seoMetaData, blogIndexPage] = await Promise.all([getSeoMetaData(), getBlogIndexPage()]);

  if (!seoMetaData) {
    return {
      title: 'Blog | Taupiri Sound',
      description: 'Read our latest articles and insights',
    };
  }

  return generatePageMetadata({
    title: blogIndexPage?.title || 'Blog',
    description: blogIndexPage?.subtitle || seoMetaData.siteDescription || undefined,
    seoMetaData,
    canonicalUrl: generateCanonicalUrl('/blog'),
  });
}

export default async function BlogPage() {
  const [blogPosts, blogIndexPage, seoMetaData, companyLinks] = await Promise.all([
    getAllBlogPosts(),
    getBlogIndexPage(),
    getSeoMetaData(),
    getCompanyLinks(),
  ]);

  const baseUrl = getBaseUrl();

  // Generate breadcrumb data for structured data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: blogIndexPage?.title || 'Blog', url: `${baseUrl}/blog` },
  ];

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />

      {/* Page Hero */}
      <PageHero
        title={blogIndexPage?.title || 'Blog'}
        titleTeReo={blogIndexPage?.titleTeReo || null}
        subtTitle={blogIndexPage?.subtitle}
        documentId={blogIndexPage?._id}
        documentType={blogIndexPage?._type}
      />

      {/* Breadcrumb */}
      <Breadcrumb pageTitle={blogIndexPage?.title || 'Blog'} />

      <Container>
        {/* List of Blog Posts */}
        <div className={`${!blogIndexPage?.subtitle ? 'pt-16 md:pt-24' : ''}`}>
          <BlogList
            posts={blogPosts}
            noPostsText={
              blogIndexPage?.noArticlesMessage ||
              'No articles available at the moment. Check back soon!'
            }
          />
        </div>

        {/* Closing Card */}
        {blogIndexPage?.hasClosingCard && blogIndexPage?.closingCard && (
          <div className={closingCardSpacing}>
            <Card
              {...normalizeClosingCardForCard(blogIndexPage.closingCard)}
              documentId={blogIndexPage._id}
              documentType={blogIndexPage._type}
              fieldPathPrefix='closingCard'
              seoMetaData={seoMetaData || undefined}
              companyLinks={companyLinks}
            />
          </div>
        )}
      </Container>
    </>
  );
}
