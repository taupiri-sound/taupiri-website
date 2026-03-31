/**
 * SINGLE SOURCE OF TRUTH for all icons used across the site.
 *
 * To add a new icon:
 *   1. Define the component below (SVG inline or react-icons import)
 *   2. Add an entry to ICON_REGISTRY with { value, title, component }
 *
 * Changes automatically flow to:
 *   - The UI (via getCardIcon / IconType)
 *   - Sanity Studio dropdowns (via ICON_OPTIONS, re-exported from iconOptions.ts)
 *   - TypeScript types (IconType is derived from the registry)
 */

import React from 'react';
import { FaFacebook, FaGuitar } from 'react-icons/fa';
import { HiDesktopComputer } from 'react-icons/hi';
import { FaCog } from 'react-icons/fa';
import { GrCloudSoftware } from 'react-icons/gr';

// ── Icon components ────────────────────────────────────────────────────────────

const AcousticsIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
    <path d='M19.07 4.93a10 10 0 0 1 0 14.14' />
    <path d='M15.54 8.46a5 5 0 0 1 0 7.07' />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
    <circle cx='12' cy='10' r='3' />
  </svg>
);

const MicIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
    <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
    <line x1='12' y1='19' x2='12' y2='23' />
    <line x1='8' y1='23' x2='16' y2='23' />
  </svg>
);

const EquipmentIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <line x1='4' y1='21' x2='4' y2='14' />
    <line x1='4' y1='10' x2='4' y2='3' />
    <line x1='12' y1='21' x2='12' y2='12' />
    <line x1='12' y1='8' x2='12' y2='3' />
    <line x1='20' y1='21' x2='20' y2='16' />
    <line x1='20' y1='12' x2='20' y2='3' />
    <line x1='1' y1='14' x2='7' y2='14' />
    <line x1='9' y1='8' x2='15' y2='8' />
    <line x1='17' y1='16' x2='23' y2='16' />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
    <polyline points='22,6 12,13 2,6' />
  </svg>
);

const FacebookIcon = () => <FaFacebook style={{ width: '100%', height: '100%' }} />;

const GuitarIcon = () => <FaGuitar style={{ width: '100%', height: '100%' }} />;

const CogIcon = () => <FaCog style={{ width: '100%', height: '100%' }} />;

const SoftwareIcon = () => <GrCloudSoftware style={{ width: '100%', height: '100%' }} />;

const SpeakerIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <rect x='4' y='2' width='16' height='20' rx='2' ry='2' />
    <circle cx='12' cy='14' r='4' />
    <circle cx='12' cy='14' r='1.5' />
    <circle cx='12' cy='6' r='1' />
  </svg>
);

const ComputerIcon = () => <HiDesktopComputer style={{ width: '100%', height: '100%' }} />;

// ── Registry ───────────────────────────────────────────────────────────────────
// This is the single source of truth. Add new icons here only.

const ICON_REGISTRY = [
  { value: 'acoustics' as const, title: 'Acoustics', component: AcousticsIcon },
  { value: 'location' as const, title: 'Location', component: LocationIcon },
  { value: 'mic' as const, title: 'Mic', component: MicIcon },
  { value: 'equipment' as const, title: 'Equipment', component: EquipmentIcon },
  { value: 'phone' as const, title: 'Phone', component: PhoneIcon },
  { value: 'email' as const, title: 'Email', component: EmailIcon },
  { value: 'facebook' as const, title: 'Facebook', component: FacebookIcon },
  { value: 'guitar' as const, title: 'Guitar', component: GuitarIcon },
  { value: 'speaker' as const, title: 'Speaker', component: SpeakerIcon },
  { value: 'computer' as const, title: 'Computer', component: ComputerIcon },
  { value: 'cog' as const, title: 'Cog', component: CogIcon },
  { value: 'software' as const, title: 'Software', component: SoftwareIcon },
];

// ── Derived exports (do not edit manually) ─────────────────────────────────────

export type IconType = (typeof ICON_REGISTRY)[number]['value'];

/** @deprecated Use IconType instead */
export type CardIconType = IconType;

/** For Sanity Studio dropdown lists — re-exported via iconOptions.ts */
export const ICON_OPTIONS = ICON_REGISTRY.map(({ value, title }) => ({ value, title }));

const ICON_MAP = Object.fromEntries(
  ICON_REGISTRY.map(({ value, component }) => [value, component]),
) as unknown as Record<IconType, React.FC>;

export const DEFAULT_ICON: IconType = 'acoustics';

export const getCardIcon = (selection?: string | null): React.FC =>
  ICON_MAP[selection as IconType] ?? ICON_MAP[DEFAULT_ICON];

export default ICON_MAP;
