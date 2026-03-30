// AI Helper: This is a Sanity CMS schema definition. It defines the structure and validation rules for content types.
// When modifying, ensure all fields have appropriate validation, titles, and descriptions for content editors.
// Follow the existing patterns in other schema files for consistency.

// Shared icon options list — used by Card and Equipment Category icon fields.
// When adding a new icon, also update CardIconType and ICON_MAP in src/components/Card/CardIcons.tsx.
export const ICON_OPTIONS = [
  { title: 'Acoustics', value: 'acoustics' },
  { title: 'Location', value: 'location' },
  { title: 'Live Room', value: 'liveRoom' },
  { title: 'Equipment', value: 'equipment' },
  { title: 'Phone', value: 'phone' },
  { title: 'Email', value: 'email' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'Guitar', value: 'guitar' },
  { title: 'Speaker', value: 'speaker' },
] as const;
