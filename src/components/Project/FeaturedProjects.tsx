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
  const animationRef = useRef<number | undefined>(undefined);
  const isUserInteracting = useRef<boolean>(false);

  // Configuration
  const SCROLL_SPEED = 40; // Pixels per second - adjust this to make it faster/slower

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !projects || projects.length === 0) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      // Pause animation if user is interacting
      if (isUserInteracting.current) {
        lastTime = currentTime;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      // Continuous smooth scrolling
      const scrollAmount = SCROLL_SPEED * deltaTime;
      container.scrollLeft += scrollAmount;

      // Handle infinite loop - reset when reaching 2/3 of the way through
      const scrollWidth = container.scrollWidth;
      const resetPoint = (scrollWidth / 3) * 2;

      if (container.scrollLeft >= resetPoint) {
        // Jump back to 1/3 position for seamless loop
        const offset = container.scrollLeft - resetPoint;
        container.scrollLeft = (scrollWidth / 3) + offset;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle touch/pointer start - pause animation
    const handleInteractionStart = () => {
      isUserInteracting.current = true;
    };

    // Handle touch/pointer end - resume animation after delay
    const handleInteractionEnd = () => {
      setTimeout(() => {
        isUserInteracting.current = false;
      }, 100);
    };

    // Add event listeners for touch and pointer events
    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });
    container.addEventListener('pointerdown', handleInteractionStart);
    container.addEventListener('pointerup', handleInteractionEnd);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('pointerdown', handleInteractionStart);
      container.removeEventListener('pointerup', handleInteractionEnd);
    };
  }, [projects, SCROLL_SPEED]);

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

  // Triple the projects for seamless infinite scroll
  const tripleProjects = [...projects, ...projects, ...projects];

  return (
    <div className='relative overflow-hidden'>
      <div
        ref={scrollContainerRef}
        className='flex overflow-x-scroll scrollbar-hide'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'auto',
          touchAction: 'pan-x',
        }}>
        {tripleProjects.map((project, index) => (
          <div
            key={`${project._id}-${index}`}
            className='flex-shrink-0 w-1/2 md:w-1/5'>
            <ProjectCard
              project={project}
              isOpen={openProjectId === project._id}
              onToggle={() => handleToggle(project._id)}
            />
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProjects;
