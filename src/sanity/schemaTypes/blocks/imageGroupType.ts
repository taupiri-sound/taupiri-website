// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

import { defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons';

export const imageGroupType = defineType({
  name: 'imageGroup',
  title: 'Image Group (Slideshow)',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imageGroupItem',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description:
                    'Describes the image for SEO and screen readers. Highly recommended.',
                },
              ],
              validation: (Rule) => Rule.required().error('An image is required'),
            }),
          ],
          preview: {
            select: {
              image: 'image',
              alt: 'image.alt',
            },
            prepare({ image, alt }) {
              return {
                title: alt || 'Image',
                media: image,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(2).error('Add at least 2 images for the slideshow'),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Small (50% on desktop)', value: 'small' },
        ],
      },
      initialValue: 'full',
      description: 'On mobile, the slideshow will be full width regardless of this setting',
    }),
    defineField({
      name: 'duration',
      title: 'Slide Duration (seconds)',
      type: 'number',
      description: 'How long each image is shown before transitioning to the next',
      initialValue: 5,
      validation: (Rule) => Rule.min(2).max(30),
    }),
  ],
  preview: {
    select: {
      images: 'images',
      size: 'size',
    },
    prepare({ images, size }) {
      const count = images?.length || 0;
      const firstImage = images?.[0]?.image;
      return {
        title: `Image Group (${count} image${count !== 1 ? 's' : ''})`,
        subtitle: size === 'small' ? 'Small' : 'Full Width',
        media: firstImage || ImagesIcon,
      };
    },
  },
});
