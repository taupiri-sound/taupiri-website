'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import type { FEATURED_PROJECTS_QUERYResult } from '@/sanity/types';

interface FeaturedProjectsProps {
  projects: FEATURED_PROJECTS_QUERYResult;
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [duplicatedProjects, setDuplicatedProjects] = useState<
    NonNullable<FEATURED_PROJECTS_QUERYResult>
  >([]);

  // Configuration
  const VISIBLE_DESKTOP = 5; // Fully visible images on desktop
  const VISIBLE_MOBILE = 2; // Fully visible images on mobile
  const PAUSE_DURATION = 2000; // Pause duration in ms when image becomes fully visible
  const SCROLL_SPEED = 0.5; // Pixels per frame

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    // Duplicate projects if needed to fill the viewport
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const visibleCount = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;
    const totalNeeded = visibleCount + 2; // +2 for partial images on sides

    let workingProjects = [...projects];

    // Duplicate until we have enough items
    while (workingProjects.length < totalNeeded) {
      workingProjects = [...workingProjects, ...projects];
    }

    // Add extra duplicates for seamless looping
    workingProjects = [...workingProjects, ...projects, ...projects];

    setDuplicatedProjects(workingProjects);
  }, [projects]);

  useEffect(() => {
    if (!scrollContainerRef.current || duplicatedProjects.length === 0) return;

    const container = scrollContainerRef.current;
    let animationFrame: number;
    let lastScrollTime = Date.now();
    let isPaused = false;
    let pauseTimeout: NodeJS.Timeout;

    const animate = () => {
      if (!container) return;

      const now = Date.now();
      const delta = now - lastScrollTime;

      if (!isPaused) {
        // Scroll smoothly with easing (parabolic profile)
        const scrollAmount = SCROLL_SPEED * delta * 0.016; // Normalize to ~60fps
        container.scrollLeft += scrollAmount;

        // Check if we need to loop back
        const maxScroll = container.scrollWidth - container.clientWidth;
        const oneThirdScroll = container.scrollWidth / 3;

        if (container.scrollLeft >= oneThirdScroll * 2) {
          // Reset to one-third position for seamless loop
          container.scrollLeft = oneThirdScroll;
        }

        // Check if an image is now fully visible (crossing into view)
        const imageWidth = container.clientWidth / (window.innerWidth < 768 ? VISIBLE_MOBILE : VISIBLE_DESKTOP);
        const scrollPosition = container.scrollLeft % imageWidth;

        // Pause when image becomes fully visible (scrollPosition crosses 0)
        if (scrollPosition < SCROLL_SPEED * delta * 0.016) {
          isPaused = true;
          pauseTimeout = setTimeout(() => {
            isPaused = false;
          }, PAUSE_DURATION);
        }
      }

      lastScrollTime = now;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(pauseTimeout);
    };
  }, [duplicatedProjects]);

  if (!projects || projects.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-body-base text-subtle'>No featured projects available.</p>
      </div>
    );
  }

  const handleToggle = (projectId: string) => {
    setOpenProjectId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className='relative overflow-hidden'>
      <div
        ref={scrollContainerRef}
        className='flex overflow-x-hidden scroll-smooth'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
        {/* Hide scrollbar for all browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {duplicatedProjects.map((project, index) => (
          <div
            key={`${project._id}-${index}`}
            className='flex-shrink-0 w-1/2 md:w-1/5'
            style={{ minWidth: '20%' }}>
            <ProjectCard
              project={project}
              isOpen={openProjectId === project._id}
              onToggle={() => handleToggle(project._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
