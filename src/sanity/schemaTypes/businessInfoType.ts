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
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact Information' },
    { name: 'location', title: 'Business Location' },
    { name: 'businessDetails', title: 'Business Details' },
  ],
  fields: [
    // ── General ──────────────────────────────────────────────────────────────
    defineField({
      name: 'organisationName',
      type: 'string',
      title: 'Organisation Name',
      description: 'The name of your organisation (e.g., "Taupiri Sound")',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organisationDescription',
      type: 'text',
      title: 'Organisation Description',
      description:
        'A brief description of your organisation. Used in structured data and as a fallback for SEO metadata.',
      rows: 3,
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description:
        'Custom favicon (browser tab icon). For best results, upload a square PNG image at least 512x512 pixels with a transparent background. SVG files also work well. If not set, no favicon is used.',
      group: 'general',
    }),

    // ── Contact Information ───────────────────────────────────────────────────
    defineField({
      name: 'email',
      type: 'object',
      title: 'Email',
      group: 'contact',
      description: 'Primary contact email address for the organisation.',
      fields: [
        defineField({
          name: 'value',
          type: 'string',
          title: 'Display Value',
          description: 'The email address as displayed to visitors, e.g. lance@taupirisound.co.nz',
        }),
        defineField({
          name: 'link',
          type: 'string',
          title: 'Email Link',
          description:
            'Full mailto: link used for clickable email buttons, e.g. mailto:lance@taupirisound.co.nz',
        }),
      ],
    }),
    defineField({
      name: 'phone',
      type: 'object',
      title: 'Phone',
      group: 'contact',
      description: 'Primary contact phone number for the organisation.',
      fields: [
        defineField({
          name: 'value',
          type: 'string',
          title: 'Display Value',
          description: 'The phone number as displayed to visitors, e.g. +64 21 311 903',
        }),
        defineField({
          name: 'link',
          type: 'string',
          title: 'Phone Link',
          description:
            'Full tel: link used for clickable call buttons (no spaces or dashes), e.g. tel:+6421311903',
        }),
      ],
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Address',
      group: 'contact',
      description: 'Physical address of the organisation.',
      fields: [
        defineField({
          name: 'value',
          type: 'string',
          title: 'Display Value',
          description:
            'The address as displayed to visitors, e.g. Topview Road, Taupiri 3792, New Zealand',
        }),
        defineField({
          name: 'link',
          type: 'string',
          title: 'Map Link',
          description:
            'Google Maps (or other map) URL for this address, used for clickable map links.',
        }),
      ],
    }),

    // ── Business Location ─────────────────────────────────────────────────────
    defineField({
      name: 'businessLocation',
      type: 'object',
      title: 'Location Details',
      group: 'location',
      description:
        'Structured address and GPS data used in LocalBusiness schema markup for local SEO. Update these if the studio relocates.',
      fields: [
        defineField({
          name: 'streetAddress',
          type: 'string',
          title: 'Street Address',
          description: 'Street name and number only, e.g. Topview Road',
        }),
        defineField({
          name: 'addressLocality',
          type: 'string',
          title: 'City / Town',
          description: 'City or town name, e.g. Taupiri',
        }),
        defineField({
          name: 'postalCode',
          type: 'string',
          title: 'Postal Code',
          description: 'Postal / ZIP code, e.g. 3792',
        }),
        defineField({
          name: 'addressRegion',
          type: 'string',
          title: 'Region',
          description: 'State, province, or region name, e.g. Waikato',
        }),
        defineField({
          name: 'addressCountry',
          type: 'string',
          title: 'Country Code',
          description: 'ISO 3166-1 alpha-2 two-letter country code, e.g. NZ for New Zealand',
        }),
        defineField({
          name: 'latitude',
          type: 'string',
          title: 'Latitude',
          description:
            'GPS latitude coordinate from Google Maps (decimal degrees), e.g. -37.5940869',
        }),
        defineField({
          name: 'longitude',
          type: 'string',
          title: 'Longitude',
          description:
            'GPS longitude coordinate from Google Maps (decimal degrees), e.g. 175.2095489',
        }),
        defineField({
          name: 'regionCode',
          type: 'string',
          title: 'Region Code',
          description:
            'ISO 3166-2 subdivision code for the region, e.g. NZ-WKO for Waikato, New Zealand',
        }),
      ],
    }),

    // ── Business Details ──────────────────────────────────────────────────────
    defineField({
      name: 'businessHours',
      type: 'string',
      title: 'Business Hours',
      group: 'businessDetails',
      description:
        'Hours of operation. Used in LocalBusiness structured data for SEO. e.g. "By Appointment Only" or "Mon–Fri 9am–5pm".',
    }),
    defineField({
      name: 'priceRange',
      type: 'string',
      title: 'Price Range',
      group: 'businessDetails',
      description:
        'Optional price range indicator used in LocalBusiness structured data. Leave empty to omit. Valid values: $, $$, $$$, $$$$ or descriptive text.',
    }),
    defineField({
      name: 'serviceAreas',
      type: 'array',
      title: 'Service Areas',
      group: 'businessDetails',
      description:
        'Geographic areas this business serves. Used in LocalBusiness structured data to improve local/regional SEO. Add, remove, or drag to reorder.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              type: 'string',
              title: 'Area Type',
              description: 'The geographic type of this area, e.g. Country, State, City',
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
              description: 'The name of the area, e.g. New Zealand, Waikato, Hamilton',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'type' },
          },
        },
      ],
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
