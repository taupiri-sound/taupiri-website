// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { createOptionalLinkFieldSet } from './shared/linkSystem';
import { createCTAListField } from './shared/ctaListType';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'content',
      title: 'Sections',
    },
  ],
  fields: [
    // Hero Section Fields
    defineField({
      name: 'heroStyle',
      type: 'string',
      title: 'Hero Style',
      description: 'Choose the hero section style',
      group: 'hero',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Background Images', value: 'background-images' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'heroBackgroundImages',
      type: 'array',
      title: 'Background Images',
      description: 'Add one or more background images that will cycle in the hero section. Images can be reordered by dragging.',
      options: {
        sortable: true,
      },
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
            }),
          ],
        },
      ],
      group: 'hero',
      hidden: ({ document }) => document?.heroStyle !== 'background-images',
      validation: (Rule) =>
        Rule.custom((images, context) => {
          const document = context.document;
          if (document?.heroStyle === 'background-images' && (!images || images.length === 0)) {
            return 'Please add at least one background image when Background Images hero style is selected';
          }
          return true;
        }),
    }),
    defineField({
      name: 'heroImageTransitionDuration',
      type: 'number',
      title: 'Image Transition Duration (seconds)',
      description: 'How long each background image displays before transitioning to the next (only applies when multiple images are added). Minimum: 2 seconds, Maximum: 30 seconds.',
      group: 'hero',
      initialValue: 4,
      hidden: ({ document }) => document?.heroStyle !== 'background-images',
      validation: (Rule) =>
        Rule.min(2)
          .max(30)
          .required()
          .error('Duration must be between 2 and 30 seconds'),
    }),
    defineField({
      name: 'heroTextColor',
      type: 'string',
      title: 'Text Color',
      description: '⚠️ IMPORTANT: When using Background Images style, carefully consider the chosen text color against ALL selected background images to ensure text remains readable across all images in the carousel.',
      group: 'hero',
      options: {
        list: [
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
      },
      initialValue: 'black',
    }),
    defineField({
      name: 'enableFeaturedItems',
      type: 'boolean',
      title: 'Enable Featured Items',
      description:
        'Display featured images/posters in the hero section. Perfect for highlighting event posters, announcements, or promotional banners as the first thing visitors see.',
      group: 'hero',
      initialValue: false,
    }),
    defineField({
      name: 'heroContentPosition',
      type: 'string',
      title: 'Content Position',
      description:
        'Choose where to position the hero content over the image. Note: On mobile devices, content is always centered horizontally - only the vertical positioning (top/center/bottom) is applied. Full positioning applies on desktop and larger screens.',
      group: 'hero',
      options: {
        list: [
          { title: 'Top Left', value: 'top-left' },
          { title: 'Top Center', value: 'top-center' },
          { title: 'Top Right', value: 'top-right' },
          { title: 'Center Left', value: 'center-left' },
          { title: 'Center Center', value: 'center-center' },
          { title: 'Center Right', value: 'center-right' },
          { title: 'Bottom Left', value: 'bottom-left' },
          { title: 'Bottom Center', value: 'bottom-center' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'center-center',
      hidden: ({ document }) => !!document?.enableFeaturedItems,
    }),
    defineField({
      name: 'showHeroLogo',
      type: 'boolean',
      title: 'Show Logo',
      description: 'Display the 07:17 Records logo above the hero content',
      group: 'hero',
      initialValue: true,
    }),
    defineField({
      name: 'featuredImages',
      type: 'array',
      title: 'Featured Images',
      description:
        'Add promotional images, event posters, or banners to showcase in the hero. These images will be prominently displayed to grab visitor attention.',
      group: 'hero',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
            }),
            ...createOptionalLinkFieldSet({
              linkTypeConfig: {
                initialValue: 'none',
                description: 'Make this image clickable by adding a link (optional)'
              },
              internalLinkConfig: {
                description: 'Select a page to link to when the image is clicked',
              },
              externalUrlConfig: {
                description: 'Enter external URL to link to when the image is clicked',
              },
              openInNewTabConfig: {
                description: 'Open link in new tab (recommended for external links)',
              },
            }),
          ],
        },
      ],
      hidden: ({ document }) => !document?.enableFeaturedItems,
      validation: (Rule) =>
        Rule.custom((images, context) => {
          const document = context.document;
          if (document?.enableFeaturedItems && (!images || images.length === 0)) {
            return 'Please add at least one featured image when featured items are enabled';
          }
          return true;
        }),
    }),
    defineField({
      name: 'heroTitle',
      type: 'string',
      title: 'Hero Title',
      description: 'Main heading for the hero section',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'blockContent',
      title: 'Hero Subtitle',
      description: 'Rich text subtitle for the hero section (formatting, links, and styling allowed)',
      group: 'hero',
      hidden: ({ document }) => !!document?.enableFeaturedItems,
    }),
    defineField({
      name: 'heroFeaturedItemsSubtitle',
      type: 'text',
      title: 'Hero Subtitle (for Featured Items)',
      description: 'Plain text subtitle displayed below featured items when featured items are enabled',
      group: 'hero',
      hidden: ({ document }) => !document?.enableFeaturedItems,
    }),
    createCTAListField({
      name: 'heroCallToActionList',
      title: 'Call to Action Buttons',
      description: 'Add one or multiple call-to-action buttons to the hero section. Leave empty if no CTAs are needed.',
      group: 'hero',
    }),
    defineField({
      name: 'hideScrollIndicator',
      type: 'boolean',
      title: 'Hide Scroll Indicator',
      description: 'Turn this switch ON to hide the scroll indicator arrow. By default (OFF), the scroll indicator is visible to guide users to scroll down.',
      group: 'hero',
      initialValue: false,
    }),

    // Page Content Fields
    defineField({
      name: 'content',
      type: 'pageBuilder',
      title: 'Sections',
      description:
        'Build your page by adding sections. Each section can contain different types of content blocks.',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Site homepage content',
      };
    },
  },
});
