'use client';

import React from 'react';
import ProjectListComponent from '@/components/Project/ProjectList';
import type { ALL_PROJECTS_QUERYResult } from '@/sanity/types';

interface ProjectListProps {
  projects?: ALL_PROJECTS_QUERYResult;
}

const ProjectList = ({ projects }: ProjectListProps) => {
  // Debug logging
  console.log('[ProjectList Block] Received projects:', projects);
  console.log('[ProjectList Block] Projects length:', projects?.length);

  if (!projects || projects.length === 0) {
    console.log('[ProjectList Block] No projects - returning null');
    return null;
  }

  console.log('[ProjectList Block] Rendering ProjectListComponent with', projects.length, 'projects');
  return <ProjectListComponent projects={projects} />;
};

export default ProjectList;
