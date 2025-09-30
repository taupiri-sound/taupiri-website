// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType, defineField } from 'sanity';
import { ControlsIcon } from '@sanity/icons';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'The main title/brand name of your website (e.g., "07:17 Records")',
      initialValue: '07:17 Records',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultPageTitle',
      type: 'string',
      title: 'Default Page Title',
      description: 'The default page title used for the home page and when no specific page title is available (e.g., "Thank You For Creating")',
      initialValue: 'Thank You For Creating',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      type: 'text',
      title: 'Site Description',
      description: 'Brief description of the website used for the home page and when a page specific description cannot be found for other pages. This is important for SEO and will appear in search engine results.',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoKeywords',
      type: 'text',
      title: 'SEO Keywords',
      description: 'Keywords relevant to your website separated by commas. These help search engines understand what your site is about and improve your SEO ranking.',
      rows: 2,
      placeholder: 'music, records, vinyl, independent artists, collaborations',
    }),
    defineField({
      name: 'defaultOgImage',
      type: 'image',
      title: 'Default OG Image',
      description: 'The default Open Graph image used for social media sharing. This will be displayed when your website is shared on social platforms like Facebook, Twitter, etc. Recommended size: 1200 × 630 px. This image will be used for the home page and most other pages, except when there is a page-specific image available (e.g., a blog post or collaboration).',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'companyEmail',
      type: 'string',
      title: 'Company Email',
      description: 'Primary contact email for your company',
      validation: (Rule) => Rule.email(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
