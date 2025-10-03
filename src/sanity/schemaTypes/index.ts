import { type SchemaTypeDefinition } from 'sanity';


import { blockContentType } from './blockContentType';
import { pageType } from './pageType';
import { homePageType } from './homePageType';
import { headerType } from './headerType';
import { footerType } from './footerType';
import { pageBuilderType } from './pageBuilderType';
import { pageSectionType } from './pageSectionType';
import { subSectionType } from './subSectionType';
import { subSubSectionType } from './subSubSectionType';
import { dividerType } from './blocks/dividerType';
import { richTextType } from './blocks/richTextType';
import { cardType } from './blocks/cardType';
import { gridLayoutType } from './blocks/gridLayoutType';
import { iconType } from './blocks/iconType';
import { imageType } from './blocks/imageType';
import { imageGalleryType } from './blocks/imageGalleryType';
import { youTubeVideoType } from './blocks/youTubeVideoType';
import { spotifyWidgetType } from './blocks/spotifyWidgetType';
import { bandcampWidgetType } from './blocks/bandcampWidgetType';
import { quoteType } from './blocks/quoteType';
import { twoColumnLayoutType } from './blocks/twoColumnLayoutType';
import { ctaButtonType } from './blocks/ctaButtonType';
import { ctaCalloutLinkType } from './blocks/ctaCalloutLinkType';
import { embeddedCtaButtonType } from './blocks/embeddedCtaButtonType';
import { homeHeroCtaButtonType } from './blocks/homeHeroCtaButtonType';
import { ctaBlogPostType } from './blocks/ctaBlogPostType';
import { companyLinksBlockType } from './blocks/companyLinksBlockType';
import { blockListType } from './blocks/blockListType';
import { siteSettingsType } from './siteSettingsType';
import { companyLinksType } from './companyLinksType';
import { companyLinksArrayType } from './shared/socialLinksArrayType';
import { ctaListType } from './shared/ctaListType';
import { navLinkType } from './navigation/navLinkType';
import { verticalNavLinkType } from './navigation/verticalNavLinkType';
import { verticalNavDividerType } from './navigation/verticalNavDividerType';
import { navSectionType } from './navigation/navSectionType';
import { blogIndexPageType } from './blogIndexPageType';
import { blogPostType } from './blogPostType';
import { termsAndConditionsType } from './termsAndConditionsType';
import { privacyPolicyType } from './privacyPolicyType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    siteSettingsType,
    companyLinksType,
    homePageType,
    pageType,
    blogIndexPageType,
    blogPostType,
    termsAndConditionsType,
    privacyPolicyType,
    blockContentType,
    // Objects
    headerType,
    footerType,
    pageBuilderType,
    pageSectionType,
    subSectionType,
    subSubSectionType,
    dividerType,
    richTextType,
    cardType,
    gridLayoutType,
    iconType,
    imageType,
    imageGalleryType,
    youTubeVideoType,
    spotifyWidgetType,
    bandcampWidgetType,
    quoteType,
    twoColumnLayoutType,
    ctaButtonType,
    ctaCalloutLinkType,
    embeddedCtaButtonType,
    homeHeroCtaButtonType,
    ctaBlogPostType,
    companyLinksBlockType,
    blockListType,
    // Shared Components
    companyLinksArrayType,
    ctaListType,
    // Navigation Components
    navLinkType,
    verticalNavLinkType,
    verticalNavDividerType,
    navSectionType,
  ],
};
