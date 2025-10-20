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
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const isUserInteracting = useRef<boolean>(false);
  const translateX = useRef<number>(0);

  // Configuration
  const SCROLL_SPEED = 40; // Pixels per second - adjust this to make it faster/slower

  useEffect(() => {
    const container = scrollContainerRef.current;
    const innerContainer = innerContainerRef.current;
    if (!container || !innerContainer || !projects || projects.length === 0) return;

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

      // Continuous smooth scrolling using CSS transform
      const scrollAmount = SCROLL_SPEED * deltaTime;
      translateX.current -= scrollAmount;

      // Handle infinite loop - reset when reaching 1/3 of the way through
      const itemWidth = innerContainer.offsetWidth / 3;

      if (Math.abs(translateX.current) >= itemWidth) {
        // Jump back to start position for seamless loop
        translateX.current += itemWidth;
      }

      innerContainer.style.transform = `translate3d(${translateX.current}px, 0, 0)`;

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
    <div
      ref={scrollContainerRef}
      className='relative overflow-hidden'
      style={{
        touchAction: 'pan-x',
      }}>
      <div
        ref={innerContainerRef}
        className='flex'
        style={{
          willChange: 'transform',
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
    </div>
  );
};

export default FeaturedProjects;
