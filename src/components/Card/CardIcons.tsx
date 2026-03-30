import React from 'react';

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

const LiveRoomIcon = () => (
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

export type CardIconType = 'acoustics' | 'location' | 'liveRoom' | 'equipment';

const ICON_MAP: Record<CardIconType, React.FC> = {
  acoustics: AcousticsIcon,
  location: LocationIcon,
  liveRoom: LiveRoomIcon,
  equipment: EquipmentIcon,
};

export const DEFAULT_ICON: CardIconType = 'acoustics';

export const getCardIcon = (selection?: string | null): React.FC => {
  const key = selection as CardIconType;
  return ICON_MAP[key] ?? ICON_MAP[DEFAULT_ICON];
};

export default ICON_MAP;
