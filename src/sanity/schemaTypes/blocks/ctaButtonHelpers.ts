import { defineField } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { createLinkFieldSet } from '../shared/linkSystem';

interface CTAButtonOptions {
  includeAlignment?: boolean;
  includeVariant?: boolean;
  name?: string;
  title?: string;
  description?: string;
  groups?: Array<{
    name: string;
    title: string;
  }>;
}

export const createCTAButtonFields = (options: CTAButtonOptions = {}) => {
  const {
    includeAlignment = true,
    includeVariant = true,
    groups = [
      { name: 'content', title: 'Content' },
      { name: 'styling', title: 'Styling' },
      { name: 'link', title: 'Link' },
    ],
  } = options;

  const fields: ReturnType<typeof defineField>[] = [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      group: groups.length > 0 ? 'content' : undefined,
      description: 'The text that will appear on the button',
      validation: (Rule) => Rule.max(50),
    }),
  ];

  // Add variant field if requested
  if (includeVariant) {
    fields.push(
      defineField({
        name: 'variant',
        title: 'Button Style',
        type: 'string',
        group: groups.length > 0 ? 'styling' : undefined,
        options: {
          list: [
            { title: 'Filled (Default)', value: 'filled' },
            { title: 'Outline', value: 'outline' },
          ],
        },
        initialValue: 'filled',
        description: 'Choose the visual style of the button',
      })
    );
  }

  // Add alignment field if requested
  if (includeAlignment) {
    fields.push(
      defineField({
        name: 'alignment',
        title: 'Button Alignment',
        type: 'string',
        group: groups.length > 0 ? 'styling' : undefined,
        options: {
          list: [
            { title: 'Inherit (Default)', value: 'inherit' },
            { title: 'Left', value: 'left' },
            { title: 'Center', value: 'center' },
            { title: 'Right', value: 'right' },
          ],
        },
        initialValue: 'inherit',
        description: 'How the button should be aligned within its container',
      })
    );
  }

  // Add link fields using the unified link system
  const linkFields = createLinkFieldSet({
    group: groups.length > 0 ? 'link' : undefined,
  });
  fields.push(...linkFields);

  return fields;
};

export const createCTAButtonPreview = () => ({
  select: {
    text: 'text',
    variant: 'variant',
    linkType: 'linkType',
    internalTitle: 'internalLink.title',
    externalUrl: 'externalUrl',
    openInNewTab: 'openInNewTab',
  },
  prepare({
    text,
    variant,
    linkType,
    internalTitle,
    externalUrl,
    openInNewTab,
  }: {
    text?: string;
    variant?: string;
    linkType?: string;
    internalTitle?: string;
    externalUrl?: string;
    openInNewTab?: boolean;
  }) {
    const buttonText = text || 'Untitled Button';
    const style = variant === 'outline' ? 'Outline' : 'Filled';

    let linkInfo = 'No link';
    if (linkType === 'internal' && internalTitle) {
      const newTabIndicator = openInNewTab ? ' ↗' : '';
      linkInfo = `→ ${internalTitle}${newTabIndicator}`;
    } else if (linkType === 'external' && externalUrl) {
      try {
        const url = new URL(externalUrl);
        linkInfo = `→ ${url.hostname} ↗`;
      } catch {
        linkInfo = '→ External URL ↗';
      }
    }

    return {
      title: buttonText,
      subtitle: `${style} button • ${linkInfo}`,
      media: LinkIcon,
    };
  },
});
