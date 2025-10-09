'use client';

import React from 'react';
import { TeamMemberList as TeamMemberListComponent } from '@/components/TeamMember';
import type { TEAM_MEMBERS_QUERYResult } from '@/sanity/types';
import type { DataAttributeConfig } from '@/components/Card/types';

interface TeamMemberListProps {
  category: 'primary' | 'secondary';
  displayStyle: 'detailed' | 'condensed';
  teamMembers?: TEAM_MEMBERS_QUERYResult;
  createDataAttributeConfig: DataAttributeConfig;
}

const TeamMemberList = ({ category, displayStyle, teamMembers, createDataAttributeConfig }: TeamMemberListProps) => {
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <TeamMemberListComponent
      category={category}
      displayStyle={displayStyle}
      teamMembers={teamMembers}
      createDataAttributeConfig={createDataAttributeConfig}
    />
  );
};

export default TeamMemberList;
