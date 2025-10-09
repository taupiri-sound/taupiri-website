import { maxCardWidth } from '@/utils/spacingConstants';
import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  isGridChild?: boolean;
  noPadding?: boolean;
  noMaxWidth?: boolean;
}

const CardContainer = ({
  children,
  className = '',
  isGridChild = false,
  noPadding = false,
  noMaxWidth = false,
}: CardContainerProps) => {
  return (
    <div
      className={`
        w-full
        bg-brand-white-dark
        shadow-sm
        rounded-lg
        ${noPadding ? '' : 'p-6'}
        flex
        flex-col
        items-center
        text-center
        ${noMaxWidth ? '' : maxCardWidth}
        ${!isGridChild && !noMaxWidth ? 'mx-auto' : ''}
        ${className}
      `.trim()}>
      {children}
    </div>
  );
};

export default CardContainer;
