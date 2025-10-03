// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType, defineArrayMember } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export const twoColumnLayoutType = defineType({
  name: 'twoColumnLayout',
  title: '2 Column Layout',
  type: 'object',
  icon: ComponentIcon,
  description: 'Create a two-column layout with independently managed content in each column. On desktop, content displays side-by-side; on mobile, left column content appears before right column content in a vertical stack.',
  fields: [
    defineField({
      name: 'leftColumn',
      title: 'Left Column',
      type: 'array',
      description: 'Content for the left column (appears first on mobile)',
      of: [
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'blockList' }),
        defineArrayMember({ type: 'quote' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'imageGallery' }),
        defineArrayMember({ type: 'ctaButton' }),
        defineArrayMember({ type: 'ctaCalloutLink' }),
        defineArrayMember({ type: 'ctaBlogPost' }),
        defineArrayMember({ type: 'card' }),
        defineArrayMember({ type: 'youTubeVideo' }),
        defineArrayMember({ type: 'spotifyWidget' }),
        defineArrayMember({ type: 'bandcampWidget' }),
        defineArrayMember({ type: 'companyLinksBlock' }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Left column must contain at least one item'),
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column',
      type: 'array',
      description: 'Content for the right column (appears after left column on mobile)',
      of: [
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'blockList' }),
        defineArrayMember({ type: 'quote' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'imageGallery' }),
        defineArrayMember({ type: 'ctaButton' }),
        defineArrayMember({ type: 'ctaCalloutLink' }),
        defineArrayMember({ type: 'ctaBlogPost' }),
        defineArrayMember({ type: 'card' }),
        defineArrayMember({ type: 'youTubeVideo' }),
        defineArrayMember({ type: 'spotifyWidget' }),
        defineArrayMember({ type: 'bandcampWidget' }),
        defineArrayMember({ type: 'companyLinksBlock' }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Right column must contain at least one item'),
    }),
  ],
  preview: {
    select: {
      leftColumn: 'leftColumn',
      rightColumn: 'rightColumn',
    },
    prepare({ leftColumn, rightColumn }) {
      const leftCount = leftColumn?.length || 0;
      const rightCount = rightColumn?.length || 0;
      const title = '2 Column Layout';
      const subtitle = `Left: ${leftCount} item${leftCount !== 1 ? 's' : ''} • Right: ${rightCount} item${rightCount !== 1 ? 's' : ''}`;

      return {
        title,
        subtitle,
        media: ComponentIcon,
      };
    },
  },
});
