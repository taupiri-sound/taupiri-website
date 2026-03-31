'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { stegaClean } from 'next-sanity';
import Image from 'next/image';
import type { ImageGroup } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import useIsVisible from '@/hooks/useIsVisible';
import ImageGalleryModal from '@/components/Modals/ImageGalleryModal';

interface ImageGroupProps extends ImageGroup {
  className?: string;
}

const ImageGroup = ({ images, size = 'full', duration = 5, className = '' }: ImageGroupProps) => {
  const cleanSize = stegaClean(size) || 'full';
  const durationMs = (stegaClean(duration) || 5) * 1000;

  const [containerRef, isVisible] = useIsVisible<HTMLElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validImages = (images || []).filter((item) => item.image?.asset?._ref);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  useEffect(() => {
    if (validImages.length <= 1 || !isVisible || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, durationMs);

    return () => clearInterval(interval);
  }, [durationMs, validImages.length, isVisible, isModalOpen]);

  if (validImages.length === 0) return null;

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-full md:w-1/2 mx-auto';
      case 'full':
      default:
        return 'w-full mx-auto';
    }
  };

  const sizeClasses = getSizeClasses(cleanSize);
  return (
    <>
      <figure ref={containerRef} className={`${sizeClasses} ${className}`}>
        <button
          className='relative aspect-[3/2] overflow-hidden rounded-lg w-full cursor-pointer block'
          onClick={() => setIsModalOpen(true)}
          aria-label={`Open image ${currentIndex + 1} of ${validImages.length} in fullscreen viewer`}>
          {validImages.map((item, index) => {
            const isCurrentImage = index === currentIndex;
            const isImageLoaded = loadedImages.has(index);

            const shouldShow = isCurrentImage && (index === 0 ? isImageLoaded : true);

            const imageUrl = item.image?.asset?._ref
              ? urlFor(item.image).width(1800).height(1200).url()
              : null;

            if (!imageUrl) return null;

            return (
              <div
                key={item._key}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  shouldShow ? 'opacity-100' : 'opacity-0'
                }`}>
                <Image
                  src={imageUrl}
                  alt={item.image?.alt || `Slideshow image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className='object-cover object-center'
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            );
          })}
        </button>
      </figure>
      <ImageGalleryModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        images={validImages}
        initialIndex={currentIndex}
      />
    </>
  );
};

export default ImageGroup;
