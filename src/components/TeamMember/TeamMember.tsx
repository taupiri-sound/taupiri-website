'use client';

import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import PortableTextWrapper from '@/components/UI/PortableTextWrapper';
import { createComponents } from '@/sanity/portableTextComponents';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import ProfilePlaceholder from './ProfilePlaceholder';
import type { TEAM_MEMBERS_QUERYResult } from '@/sanity/types';

type TeamMember = NonNullable<TEAM_MEMBERS_QUERYResult>[number];

interface TeamMemberProps {
  member: TeamMember;
  layout:
    | 'primary-detailed-single'
    | 'primary-detailed-multiple'
    | 'primary-condensed'
    | 'secondary-detailed-single'
    | 'secondary-detailed-multiple'
    | 'secondary-condensed';
}

const TeamMember = ({ member, layout }: TeamMemberProps) => {
  const { name, role, profilePicture, description } = member;

  // Get field path for live editing
  const getFieldPath = (field: string) => `${field}`;

  // Determine styling based on layout
  const isPrimary = layout.startsWith('primary');
  const isDetailed = layout.includes('detailed');
  const isSingleSecondary = layout === 'secondary-detailed-single';

  // Card container styling - only for primary members
  const containerClass = isPrimary
    ? `bg-brand-white-dark p-0 md:p-10 rounded-lg shadow-sm overflow-hidden ${layout === 'primary-condensed' || layout === 'primary-detailed-multiple' ? '' : 'flex lg:flex-row lg:gap-6 lg:items-center'}`
    : '';

  // Layout classes
  const layoutClass = isSingleSecondary
    ? 'flex flex-col sm:flex-row gap-6 items-start'
    : 'flex flex-col';

  // Alignment classes
  const alignmentClass =
    isPrimary || !isSingleSecondary
      ? 'items-center text-center'
      : 'items-center text-center sm:items-start sm:text-left';

  // Content wrapper padding - only for primary (card-style)
  const contentPaddingClass = isPrimary
    ? `mt-6 ${layout === 'primary-condensed' || layout === 'primary-detailed-multiple' ? 'px-6' : 'lg:mt-0 px-6'} pb-6 md:pb-0`
    : `${isSingleSecondary ? '' : 'mt-4'} px-2 sm:px-0`;

  // Photo size classes
  const photoSizeClass =
    layout === 'secondary-condensed'
      ? 'w-48 h-48 md:w-full md:h-auto aspect-square rounded-lg'
      : isPrimary
        ? `${layout === 'primary-condensed' || layout === 'primary-detailed-multiple' ? '' : 'md:w-1/2 md:self-start mx-auto'} w-full aspect-square md:rounded-lg`
        : isSingleSecondary
          ? 'w-48 h-48 flex-shrink-0 rounded-lg mx-auto'
          : 'w-48 h-48 md:w-full md:h-auto aspect-square rounded-lg';

  // Render rich text components with appropriate alignment
  const textAlignment = isPrimary || !isSingleSecondary ? 'center' : 'left';
  const components = createComponents(textAlignment);

  return (
    <div className={`${containerClass} ${layoutClass} ${alignmentClass}`}>
      {/* Profile Picture */}
      <div
        className={`relative ${photoSizeClass} overflow-hidden flex-shrink-0 md:max-h-[calc(80svh-5rem)] md:max-w-[calc(80svh-5rem)]`}
        {...createSanityDataAttribute(member._id, member._type, getFieldPath('profilePicture'))}>
        {profilePicture?.asset ? (
          <UnifiedImage
            src={profilePicture}
            alt={profilePicture.alt || `${name} profile picture`}
            mode='fill'
            sizeContext='full'
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
          <p
            className={`${isPrimary ? 'text-h3 md:text-h5 lg:text-h4' : 'text-h5'} mb-1`}
            {...createSanityDataAttribute(member._id, member._type, getFieldPath('name'))}>
            {name}
          </p>
        )}

        {/* Role */}
        {role && (
          <p
            className={`text-subtle ${isPrimary ? 'text-body-xl' : 'text-body-lg'}`}
            {...createSanityDataAttribute(member._id, member._type, getFieldPath('role'))}>
            {role}
          </p>
        )}

        {/* Description - only for detailed views */}
        {isDetailed && description && description.length > 0 && (
          <div
            className={`${isPrimary ? 'mt-4' : 'mt-1'}`}
            {...createSanityDataAttribute(member._id, member._type, getFieldPath('description'))}>
            <PortableTextWrapper
              value={description}
              components={components}
              className='text-body-base'
              dataAttributes={createSanityDataAttribute(
                member._id,
                member._type,
                getFieldPath('description')
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
