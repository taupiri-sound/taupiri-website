'use client';

import React from 'react';
import TeamMember from './TeamMember';
import { maxCardWidth } from '@/utils/spacingConstants';
import type { TEAM_MEMBERS_QUERYResult } from '@/sanity/types';

interface TeamMemberListProps {
  category: 'primary' | 'secondary';
  displayStyle: 'detailed' | 'condensed';
  teamMembers: TEAM_MEMBERS_QUERYResult;
}

const TeamMemberList = ({ category, displayStyle, teamMembers }: TeamMemberListProps) => {
  // Filter team members by category
  const filteredMembers = teamMembers?.filter((member) => member.category === category) || [];

  if (filteredMembers.length === 0) {
    return null;
  }

  const isPrimary = category === 'primary';
  const isDetailed = displayStyle === 'detailed';
  const isSingleMember = filteredMembers.length === 1;

  // Determine layout type for each member
  const getLayoutType = () => {
    if (isPrimary) {
      return isDetailed ? 'primary-detailed' : 'primary-condensed';
    } else {
      // Secondary
      if (displayStyle === 'condensed') {
        return 'secondary-condensed';
      }
      // Secondary detailed
      return isSingleMember ? 'secondary-detailed-single' : 'secondary-detailed-multiple';
    }
  };

  const layoutType = getLayoutType();

  // Container classes based on layout
  const getContainerClasses = () => {
    if (isPrimary) {
      // Primary: 2 per row on desktop, 1 on mobile, center last row if odd
      if (isSingleMember) {
        return `flex justify-center ${displayStyle === 'condensed' ? maxCardWidth : ''} mx-auto`;
      }
      return 'flex flex-wrap justify-center gap-6 md:gap-8';
    } else {
      // Secondary
      if (displayStyle === 'condensed') {
        // Condensed: Grid of photos with name/role underneath
        return 'flex flex-wrap justify-center gap-6 lg:gap-8';
      } else {
        // Secondary detailed
        if (isSingleMember) {
          // Single: Use maxCardWidth and row layout
          return `${maxCardWidth} mx-auto`;
        }
        // Multiple: 3 per row on desktop, 1 on mobile, center last row
        return 'flex flex-wrap justify-center gap-6 lg:gap-8';
      }
    }
  };

  // Individual member wrapper classes
  const getMemberWrapperClasses = () => {
    if (isPrimary) {
      if (isSingleMember) {
        return 'w-full';
      }
      // Primary: 2 per row on desktop
      return 'w-full md:w-[calc(50%-1.5rem)]';
    } else {
      // Secondary
      if (displayStyle === 'condensed') {
        // Condensed: Flexible grid
        return 'w-1/2 md:w-[calc(50%-1*1.5rem)] lg:w-[calc(33.333%-2*2rem)]';
      } else {
        if (isSingleMember) {
          return 'w-full';
        }
        // Multiple detailed: 3 per row on desktop
        return 'w-full md:w-[calc(50%-1*1.5rem)] lg:w-[calc(33.333%-2*2rem)]';
      }
    }
  };

  return (
    <div className={getContainerClasses()}>
      {filteredMembers.map((member) => (
        <div key={member._id} className={getMemberWrapperClasses()}>
          <TeamMember
            member={member}
            layout={
              layoutType as
                | 'primary-detailed'
                | 'primary-condensed'
                | 'secondary-detailed-single'
                | 'secondary-detailed-multiple'
                | 'secondary-condensed'
            }
          />
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
