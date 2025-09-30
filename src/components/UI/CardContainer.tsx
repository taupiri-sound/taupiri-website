import { maxCardWidth } from '@/utils/spacingConstants';
import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  isGridChild?: boolean;
}

const CardContainer = ({ children, className = '', isGridChild = false }: CardContainerProps) => {
  return (
    <div
      className={`
        w-full 
        bg-card-gradient 
        border border-gray-200 
        rounded-lg 
        p-6 md:p-8 
        flex 
        flex-col 
        items-center 
        text-center 
        ${maxCardWidth} 
        ${!isGridChild ? 'mx-auto' : ''}
        ${className}
      `.trim()}>
      {children}
    </div>
  );
};

export default CardContainer;
