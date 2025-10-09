'use client';

import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import PortableTextWrapper from '@/components/UI/PortableTextWrapper';
import { createComponents } from '@/sanity/portableTextComponents';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import ProfilePlaceholder from './ProfilePlaceholder';
import type { TEAM_MEMBERS_QUERYResult } from '@/sanity/types';
import type { DataAttributeConfig } from '@/components/Card/types';

type TeamMember = NonNullable<TEAM_MEMBERS_QUERYResult>[number];

interface TeamMemberProps {
  member: TeamMember;
  layout: 'primary-detailed' | 'primary-condensed' | 'secondary-detailed-single' | 'secondary-detailed-multiple' | 'secondary-condensed';
  createDataAttributeConfig?: DataAttributeConfig;
}

const TeamMember = ({ member, layout, createDataAttributeConfig }: TeamMemberProps) => {
  const { name, role, profilePicture, description } = member;

  // Get field path for live editing
  const getFieldPath = (field: string) => `${field}`;

  // Determine styling based on layout
  const isPrimary = layout.startsWith('primary');
  const isDetailed = layout.includes('detailed');
  const isSingleSecondary = layout === 'secondary-detailed-single';
  const isCondensed = layout.includes('condensed');

  // Card container styling - only for primary members
  const containerClass = isPrimary
    ? 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'
    : '';

  // Layout classes
  const layoutClass = isSingleSecondary
    ? 'flex flex-row gap-6 items-start'
    : 'flex flex-col';

  // Alignment classes
  const alignmentClass = isPrimary || !isSingleSecondary
    ? 'items-center text-center'
    : 'items-start text-left';

  // Content wrapper padding - only for primary (card-style)
  const contentPaddingClass = isPrimary ? 'p-6' : '';

  // Photo size classes
  const photoSizeClass = layout === 'secondary-condensed'
    ? 'w-24 h-24 md:w-32 md:h-32'
    : isPrimary
      ? 'w-full aspect-square'
      : isSingleSecondary
        ? 'w-48 h-48 flex-shrink-0'
        : 'w-full aspect-square';

  // Render rich text components with appropriate alignment
  const textAlignment = isPrimary || !isSingleSecondary ? 'center' : 'left';
  const components = createComponents(textAlignment);

  return (
    <div className={`${containerClass} ${layoutClass} ${alignmentClass}`}>
      {/* Profile Picture */}
      <div
        className={`relative ${photoSizeClass} rounded-lg overflow-hidden flex-shrink-0`}
        {...createSanityDataAttribute(member._id, member._type, getFieldPath('profilePicture'))}>
        {profilePicture?.asset ? (
          <UnifiedImage
            src={profilePicture}
            alt={profilePicture.alt || `${name} profile picture`}
            mode='fill'
            sizeContext='profile'
            objectFit='cover'
            generateSchema
            schemaContext='profile'
            documentId={member._id}
            documentType={member._type}
            fieldPath={getFieldPath('profilePicture')}
          />
        ) : (
          <ProfilePlaceholder />
        )}
      </div>

      {/* Content */}
      <div className={`${contentPaddingClass} ${isSingleSecondary ? 'flex-1' : 'w-full'}`}>
        {/* Name */}
        {name && (
          <h3
            className='text-h4 font-semibold mb-1'
            {...createSanityDataAttribute(member._id, member._type, getFieldPath('name'))}>
            {name}
          </h3>
        )}

        {/* Role */}
        {role && (
          <p
            className='text-body-sm text-gray-600 dark:text-gray-400 mb-3'
            {...createSanityDataAttribute(member._id, member._type, getFieldPath('role'))}>
            {role}
          </p>
        )}

        {/* Description - only for detailed views */}
        {isDetailed && description && description.length > 0 && (
          <div
            className='mt-4'
            {...createSanityDataAttribute(member._id, member._type, getFieldPath('description'))}>
            <PortableTextWrapper
              value={description}
              components={components}
              className='text-body-base'
              dataAttributes={createSanityDataAttribute(member._id, member._type, getFieldPath('description'))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
