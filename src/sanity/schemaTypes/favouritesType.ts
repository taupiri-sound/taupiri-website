// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons';

export const favouritesType = defineType({
  name: 'favourites',
  title: 'Favourite',
  type: 'document',
  icon: HeartIcon,
  description: 'A favourite band or artist with basic information and links',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of this favourite band or artist',
      validation: (Rule) =>
        Rule.required().min(1).max(100).error('Name is required and must be under 100 characters'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category or classification (e.g., music genre, record label, organization type, etc.) - optional',
      validation: (Rule) => Rule.max(50).error('Category must be under 50 characters'),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Profile image for the favourite (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Helps explain what the image is for SEO and screen readers. Highly recommended to provide something that describes the image; if not provided, the system will try to come up with something.',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls ordering on the Favourites Index page and when auto is selected for the Favourite Block (lower numbers appear first)',
      initialValue: 100,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .max(9999)
          .error('Display order must be a whole number between 0 and 9999'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of this favourite (optional)',
      rows: 3,
      validation: (Rule) => Rule.max(500).error('Description must be under 500 characters'),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'External link (website, social media, etc.) - optional',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      description:
        'Text to display on the link button (will default to "More Info" if not provided)',
      initialValue: 'More Info',
      validation: (Rule) => Rule.max(50).error('Link label must be under 50 characters'),
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
    {
      title: 'Recent First',
      name: 'recentFirst',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: '_createdAt', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'profileImage',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      const orderText = order !== undefined ? ` (#${order})` : '';

      return {
        title: title || 'Untitled Favourite',
        subtitle: `${subtitle || 'No category'}${orderText}`,
        media: media || HeartIcon,
      };
    },
  },
});
