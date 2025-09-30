// Pages actions
export { getHomePage, getPageBySlug, getAllPages } from './pages';

// Blog actions
export { getAllBlogPosts, getBlogIndexPage, getBlogPostBySlug, getAllBlogPostsForSitemap } from './blog';

// Site data actions
export { getHeader, getFooter, getSiteSettings, getCompanyLinks, getLegalPagesVisibility } from './siteData';

// Legal actions
export { getTermsAndConditions, getPrivacyPolicy } from './legal';

// Types
export type {
  HOME_PAGE_QUERYResult,
  PAGE_QUERYResult,
} from './types';
