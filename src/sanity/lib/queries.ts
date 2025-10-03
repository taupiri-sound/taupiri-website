import { defineQuery } from 'next-sanity';


// Reusable internal link dereferencing with href computation and section anchor support
const internalLinkProjection = `{
  _id,
  _type,
  title,
  slug,
  "pageType": _type,
  "href": select(
    _type == "homePage" => "/",
    _type == "blogIndexPage" => "/blog",
    _type == "blogPost" => "/blog/" + slug.current,
    _type == "termsAndConditions" => "/terms-and-conditions",
    _type == "privacyPolicy" => "/privacy-policy",
    "/" + slug.current
  )
}`;

// Enhanced link projection that includes section anchors
const fullLinkProjection = `
  ...,
  internalLink->${internalLinkProjection},
  "computedHref": select(
    linkType == "external" => externalUrl,
    linkType == "internal" && defined(pageSectionId) && pageSectionId != "" =>
      coalesce(internalLink->${internalLinkProjection}.href, "/") + "#" + pageSectionId,
    linkType == "internal" =>
      coalesce(internalLink->${internalLinkProjection}.href, "/"),
    "/"
  )
`;

// Closing card projection that properly expands CTA data
const closingCardProjection = `{
  ...,
  ctaList[]{
    _type,
    _key,
    _type == "embeddedCtaButton" => {${fullLinkProjection}},
    _type == "embeddedCtaEmailButton" => {...}
  }
}`;

// Single content block projection that recursively handles nested content
// Add new block types here and they'll work at all nesting levels automatically
const contentProjection = `
  ...,
  image{
    asset,
    alt,
    hotspot,
    crop
  },
  _type == "pageSection" => {
    ...,
    anchorId,
    topText
  },
  _type == "subSection" => {
    ...,
    anchorId
  },
  _type == "subSubSection" => {
    ...,
    anchorId
  },
  _type == "ctaButton" => {${fullLinkProjection}},
  _type == "ctaCalloutLink" => {${fullLinkProjection}},
  _type == "ctaCard" => {${fullLinkProjection}},
  _type == "card" => {
    ...,
    ctaList[]{
      _type,
      _key,
      _type == "embeddedCtaButton" => {${fullLinkProjection}},
      _type == "embeddedCtaEmailButton" => {...}
    }
  },
  _type == "gridLayout" => {
    ...,
    content[]{
      ...,
      _type == "card" => {
        ...,
        ctaList[]{
          _type,
          _key,
          _type == "embeddedCtaButton" => {${fullLinkProjection}},
          _type == "embeddedCtaEmailButton" => {...}
        }
      },
      _type == "richText" => {...},
      _type == "imageBlock" => {
        ...,
        image{
          asset,
          alt,
          hotspot,
          crop
        }
      },
      _type == "youTubeVideo" => {...},
      _type == "spotifyWidget" => {...},
      _type == "bandcampWidget" => {...}
    }
  },
  _type == "ctaBlogPost" => {
    ...,
    blogPost->{
      _id,
      _createdAt,
      title,
      slug,
      subtitle,
      author,
      mainImage{
        asset,
        alt,
        hotspot,
        crop
      },
      hasOverrideDate,
      overrideDate
    }
  }
`;

// Recursive content structure with 4 levels of nesting
// This is the complete content pattern that can be reused across queries
const recursiveContent = `content[]{${contentProjection},
  "content": content[]{${contentProjection},
    "content": content[]{${contentProjection},
      "content": content[]{${contentProjection}
      }
    }
  }
}`;


export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  subtitle,
  slug,
  ${recursiveContent},
  heroImage{
    asset,
    alt,
    hotspot,
    crop
  },
  hasClosingCard,
  closingCard${closingCardProjection}
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "homePage"][0]{
  _id,
  _type,
  heroStyle,
  heroTextColor,
  heroLogoDisplay,
  heroBackgroundImages[]{
    asset,
    alt,
    hotspot,
    crop
  },
  heroImageTransitionDuration,
  h1Title,
  heroTitle[]{
    ...,
    children[]{
      ...,
      marks[]
    }
  },
  heroCallToActionList[]{
    _type,
    _key,
    _type == "embeddedCtaButton" => {${fullLinkProjection}},
    _type == "embeddedCtaEmailButton" => {...}
  },
  hideScrollIndicator,
  heroContentPosition,
  ${recursiveContent}
}`);

export const HEADER_QUERY = defineQuery(`*[_id == "header"][0]{
  _id,
  _type,
  horizontalNav[]{${fullLinkProjection}},
  verticalNav[]{
    _type,
    hideSection,
    hideOnDesktop,
    heading,
    links[]{${fullLinkProjection}}
  },
  verticalNavCtas[]{
    _type,
    _key,
    _type == "embeddedCtaButton" => {${fullLinkProjection}},
    _type == "embeddedCtaEmailButton" => {...}
  }
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  _id,
  _type,
  siteTitle,
  defaultPageTitle,
  siteDescription,
  seoKeywords,
  defaultOgImage{
    asset,
    alt,
    hotspot,
    crop
  },
  companyEmail
}`);

export const COMPANY_LINKS_QUERY = defineQuery(`*[_id == "companyLinks"][0]{
  _id,
  _type,
  companyLinks{
    _type,
    socialLinksArray[]{
      _key,
      platform,
      url,
      customTitle,
      hideFromFooter
    }
  }
}`);

// Blog Post Queries
export const BLOG_POSTS_QUERY = defineQuery(`*[_type == "blogPost"]|order(coalesce(overrideDate, _createdAt) desc){
  _id,
  _createdAt,
  title,
  slug,
  subtitle,
  author,
  mainImage{
    asset,
    alt,
    hotspot,
    crop
  },
  hasOverrideDate,
  overrideDate,
  hasClosingCard,
  closingCard${closingCardProjection}
}`);

export const BLOG_INDEX_PAGE_QUERY = defineQuery(`*[_id == "blogIndexPage"][0]{
  _id,
  _type,
  title,
  heroImage{
    asset,
    alt,
    hotspot,
    crop
  },
  subtitle,
  noArticlesMessage,
  hasClosingCard,
  closingCard${closingCardProjection}
}`);

export const BLOG_POST_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  subtitle,
  author,
  mainImage{
    asset,
    alt,
    hotspot,
    crop
  },
  hasOverrideDate,
  overrideDate,
  ${recursiveContent},
  hasClosingCard,
  closingCard${closingCardProjection},
  "blogIndexHeroImage": *[_id == "blogIndexPage"][0].heroImage{
    asset,
    alt,
    hotspot,
    crop
  }
}`);

export const ADJACENT_BLOG_POSTS_QUERY = defineQuery(`{
  "currentPost": *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    hasOverrideDate,
    overrideDate,
    _createdAt
  },
  "prevPost": *[_type == "blogPost" && coalesce(overrideDate, _createdAt) > coalesce(*[_type == "blogPost" && slug.current == $slug][0].overrideDate, *[_type == "blogPost" && slug.current == $slug][0]._createdAt)]|order(coalesce(overrideDate, _createdAt) asc)[0]{
    _id,
    title,
    slug
  },
  "nextPost": *[_type == "blogPost" && coalesce(overrideDate, _createdAt) < coalesce(*[_type == "blogPost" && slug.current == $slug][0].overrideDate, *[_type == "blogPost" && slug.current == $slug][0]._createdAt)]|order(coalesce(overrideDate, _createdAt) desc)[0]{
    _id,
    title,
    slug
  }
}`);

// Side content projection for sidebar sections
const sideContentProjection = `sideContent[]{
  _type,
  _key,
  style,
  title,
  richText,
  ctaBlocks[]{
    _type,
    _key,
    _type == "embeddedCtaButton" => {${fullLinkProjection}},
    _type == "embeddedCtaEmailButton" => {...}
  }
}`;

export const FOOTER_QUERY = defineQuery(`*[_type == "footer" && _id == "footer"][0]{
  _id,
  _type,
  footerMessages[]{
    _key,
    title,
    message
  },
  copyrightText
}`);

// Sitemap queries
export const ALL_PAGES_QUERY = defineQuery(`*[_type == "page" && defined(slug.current)]{
  _id,
  _updatedAt,
  title,
  slug
}`);

export const ALL_BLOG_POSTS_SLUGS_QUERY = defineQuery(`*[_type == "blogPost" && defined(slug.current)]{
  _id,
  _updatedAt,
  title,
  slug
}`);

// Legal document queries
export const TERMS_AND_CONDITIONS_QUERY = defineQuery(`*[_id == "termsAndConditions"][0]{
  _id,
  _type,
  _updatedAt,
  hide,
  title,
  topText,
  ${recursiveContent}
}`);

export const PRIVACY_POLICY_QUERY = defineQuery(`*[_id == "privacyPolicy"][0]{
  _id,
  _type,
  _updatedAt,
  hide,
  title,
  topText,
  ${recursiveContent}
}`);

// Legal pages visibility query for footer
export const LEGAL_PAGES_VISIBILITY_QUERY = defineQuery(`{
  "termsAndConditions": *[_id == "termsAndConditions"][0]{_id, hide},
  "privacyPolicy": *[_id == "privacyPolicy"][0]{_id, hide}
}`);
