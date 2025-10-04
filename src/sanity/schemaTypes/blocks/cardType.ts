// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const cardType = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: DocumentIcon,
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'image', title: 'Image' },
    { name: 'layout', title: 'Layout' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Card Title',
      type: 'string',
      group: 'header',
      description: 'Optional title displayed at the top of the card',
    }),
    defineField({
      name: 'subtitle',
      title: 'Card Subtitle',
      type: 'string',
      group: 'header',
      description: 'Optional subtitle displayed below the title',
    }),
    defineField({
      name: 'imageType',
      title: 'Image Type',
      type: 'string',
      group: 'image',
      options: {
        list: [
          {
            title: 'No Image',
            value: 'none',
          },
          {
            title: 'Banner Image',
            value: 'banner',
          },
          {
            title: 'Profile Image',
            value: 'profile',
          },
          {
            title: 'Icon',
            value: 'icon',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description:
        'Choose the type of image for this card:\n\n• No Image: Card displays content only\n\n• Banner Image: Full-width image at the top of the card\n\n• Profile Image: Square image displayed prominently\n\n• Icon: Small circular icon image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
      description: 'Upload the image for this card',
      hidden: ({ parent }) => parent?.imageType === 'none',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { imageType?: string };
          if (parent?.imageType && parent.imageType !== 'none' && !value) {
            return 'Image is required when an image type is selected';
          }
          return true;
        }),
    }),
    defineField({
      name: 'layoutStyle',
      title: 'Layout Style',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {
            title: 'Stacked (Vertical)',
            value: 'stacked',
          },
          {
            title: 'Row (Horizontal)',
            value: 'row',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'stacked',
      description:
        'Choose how the card content is arranged:\n\n• Stacked: Image (if present) appears above content, arranged vertically\n\n• Row: Image (if present) appears beside content, arranged horizontally\n\nNote: This field is read-only when Banner image is selected (always uses Stacked layout).',
      readOnly: ({ parent }) => (parent as { imageType?: string })?.imageType === 'banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Card Content',
      type: 'array',
      group: 'content',
      description:
        'Add content blocks to your card. You can include text, images, buttons, quotes, and more.',
      of: [
        defineArrayMember({ type: 'divider' }),
        defineArrayMember({ type: 'twoColumnLayout' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'blockList' }),
        defineArrayMember({ type: 'quote' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'imageGallery' }),
        defineArrayMember({ type: 'ctaButton' }),
        defineArrayMember({ type: 'ctaCalloutLink' }),
        defineArrayMember({ type: 'ctaBlogPost' }),
        defineArrayMember({ type: 'youTubeVideo' }),
        defineArrayMember({ type: 'spotifyWidget' }),
        defineArrayMember({ type: 'bandcampWidget' }),
        defineArrayMember({ type: 'companyLinksBlock' }),
      ],
      validation: (Rule) => Rule.min(1).error('Card must have at least one content block'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      imageType: 'imageType',
      layoutStyle: 'layoutStyle',
      image: 'image',
      content: 'content',
    },
    prepare({ title, subtitle, imageType, layoutStyle, image, content }) {
      const imageTypeLabel =
        imageType === 'banner'
          ? 'Banner'
          : imageType === 'profile'
            ? 'Profile'
            : imageType === 'icon'
              ? 'Icon'
              : 'No Image';
      const layoutLabel =
        imageType === 'banner' ? 'Stacked' : layoutStyle === 'row' ? 'Row' : 'Stacked';
      const blockCount = Array.isArray(content) ? content.length : 0;

      const displayTitle = title || `Card: ${imageTypeLabel} • ${layoutLabel}`;
      const displaySubtitle = title
        ? `${imageTypeLabel} • ${layoutLabel} • ${blockCount} content block${blockCount !== 1 ? 's' : ''}`
        : `${blockCount} content block${blockCount !== 1 ? 's' : ''}`;

      return {
        title: displayTitle,
        subtitle: displaySubtitle,
        media: image || DocumentIcon,
      };
    },
  },
});