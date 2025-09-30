// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType, defineArrayMember } from 'sanity';
import { commonContentBlocks } from './shared/sectionFactory';

export const privacyPolicyType = defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'hide',
      title: 'Hide Page',
      type: 'boolean',
      description:
        'Hide this page from the frontend. When hidden, the link will automatically be removed from the Footer and visiting the URL manually will show a not found error.',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The main title (H1) of the Privacy Policy page',
      validation: (Rule) => Rule.required().error('Page title is required'),
      initialValue: 'Privacy Policy',
    }),
    defineField({
      name: 'topText',
      title: 'Top Text',
      type: 'string',
      description: 'Optional text displayed at the top of the page. Can be used for last updated dates, notices, or any contextual information.',
    }),
    defineField({
      name: 'content',
      title: 'Privacy Policy Content',
      type: 'array',
      description: 'Build your Privacy Policy content using page sections and content blocks',
      of: [
        defineArrayMember({
          type: 'pageSection',
        }),
        ...commonContentBlocks,
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'list',
            },
          ],
        },
        // Improve the modal experience
        modal: { type: 'dialog' },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      hide: 'hide',
    },
    prepare({ title, hide }) {
      const titlePrefix = hide ? '🚫 ' : '';
      const statusSuffix = hide ? ' (Hidden)' : '';

      return {
        title: `${titlePrefix}${title || 'Privacy Policy'}${statusSuffix}`,
        subtitle: 'Legal Document',
      };
    },
  },
});
