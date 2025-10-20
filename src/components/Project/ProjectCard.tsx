'use client';

import React, { useState } from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import type { ALL_PROJECTS_QUERYResult } from '@/sanity/types';

type Project = NonNullable<ALL_PROJECTS_QUERYResult>[number];

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const ProjectCard = ({ project, isOpen, onToggle, className = '' }: ProjectCardProps) => {
  const { name, description, link, linkLabel, image } = project;
  const [isHovered, setIsHovered] = useState(false);

  const hasLink = !!link;
  const displayLinkLabel = linkLabel || 'More info';

  /**
   * Get Sanity field path for live editing
   */
  const getFieldPath = (field: string): string => field;

  /**
   * Handle card interaction
   * For desktop: hover shows overlay
   * For mobile: tap toggles overlay
   */
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    // On touchscreens, toggle the overlay
    if ('touches' in e || window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      onToggle();
    }
  };

  // Show overlay on hover (desktop) or when open (mobile)
  const showOverlay = isHovered || isOpen;

  return (
    <div
      className={`relative aspect-square overflow-hidden group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      {...createSanityDataAttribute(project._id, project._type, '')}>
      {/* Project Image */}
      <div className='relative w-full h-full'>
        <UnifiedImage
          src={image}
          alt={image?.alt || `${name} project image`}
          mode='fill'
          sizeContext='gallery'
          objectFit='cover'
          generateSchema
          schemaContext='gallery'
          documentId={project._id}
          documentType={project._type}
          fieldPath={getFieldPath('image')}
        />
      </div>

      {/* Overlay with Project Info */}
      <div
        className={`absolute inset-0 bg-brand-black bg-opacity-80 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}>
        {/* Project Name */}
        {name && (
          <h3
            className='text-h5 text-brand-white-dark text-center mb-2'
            {...createSanityDataAttribute(project._id, project._type, getFieldPath('name'))}>
            {name}
          </h3>
        )}

        {/* Project Description */}
        {description && (
          <p
            className='text-body-base text-brand-white-dark text-center mb-4'
            {...createSanityDataAttribute(project._id, project._type, getFieldPath('description'))}>
            {description}
          </p>
        )}

        {/* Link Button - Only if link exists */}
        {hasLink && (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-brand-white-dark rounded-md hover:bg-brand-secondary transition-colors duration-200 text-body-base font-medium'
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
            {...createSanityDataAttribute(project._id, project._type, getFieldPath('link'))}>
            {displayLinkLabel}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
