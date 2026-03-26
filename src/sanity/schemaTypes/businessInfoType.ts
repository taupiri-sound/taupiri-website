// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineType, defineField } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons';

export const businessInfoType = defineType({
  name: 'businessInfo',
  title: 'Business & Contact Info',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'organizationName',
      type: 'string',
      title: 'Organisation Name',
      description: 'The name of your organisation (e.g., "Taupiri Sound")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organizationDescription',
      type: 'text',
      title: 'Organisation Description',
      description:
        'A brief description of your organisation. Used in structured data and as a fallback for SEO metadata.',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Business & Contact Info',
      };
    },
  },
});
