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
import { itemListType } from './blocks/itemListType';
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
import { textImageType } from './blocks/textImageType';
import { ctaButtonType } from './blocks/ctaButtonType';
import { ctaCalloutLinkType } from './blocks/ctaCalloutLinkType';
import { ctaEmailButtonType } from './blocks/ctaEmailButtonType';
import { embeddedCtaButtonType } from './blocks/embeddedCtaButtonType';
import { embeddedCtaEmailButtonType } from './blocks/embeddedCtaEmailButtonType';
import { homeHeroCtaButtonType } from './blocks/homeHeroCtaButtonType';
import { ctaEventsType } from './blocks/ctaEventsType';
import { ctaBlogPostType } from './blocks/ctaBlogPostType';
import { collabBlockType } from './blocks/collabBlockType';
import { favouriteBlockType } from './blocks/favouriteBlockType';
import { companyLinksBlockType } from './blocks/companyLinksBlockType';
import { blockListType } from './blocks/blockListType';
import { siteSettingsType } from './siteSettingsType';
import { companyLinksType } from './companyLinksType';
import { eventType } from './eventType';
import { eventsIndexPageType } from './eventsIndexPageType';
import { collabType } from './collabType';
import { collabPageSectionType } from './collabPageSectionType';
import { favouritesType } from './favouritesType';
import { favouritesIndexPageType } from './favouritesIndexPageType';
import { companyLinksArrayType, collabLinksArrayType } from './shared/socialLinksArrayType';
import { sideContentBlockType, sideContentType } from './shared/sideContentBlockType';
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
    eventType,
    eventsIndexPageType,
    collabType,
    favouritesType,
    favouritesIndexPageType,
    termsAndConditionsType,
    privacyPolicyType,
    blockContentType,
    // Objects
    headerType,
    footerType,
    pageBuilderType,
    pageSectionType,
    collabPageSectionType,
    subSectionType,
    subSubSectionType,
    dividerType,
    itemListType,
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
    textImageType,
    ctaButtonType,
    ctaCalloutLinkType,
    ctaEmailButtonType,
    embeddedCtaButtonType,
    embeddedCtaEmailButtonType,
    homeHeroCtaButtonType,
    ctaEventsType,
    ctaBlogPostType,
    collabBlockType,
    favouriteBlockType,
    companyLinksBlockType,
    blockListType,
    // Shared Components
    companyLinksArrayType,
    collabLinksArrayType,
    sideContentBlockType,
    sideContentType,
    ctaListType,
    // Navigation Components
    navLinkType,
    verticalNavLinkType,
    verticalNavDividerType,
    navSectionType,
  ],
};
