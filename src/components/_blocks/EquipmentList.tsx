'use client';

import React from 'react';
import type { EQUIPMENT_LIST_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { getCardIcon } from '@/components/Card/CardIcons';
import { stegaClean } from 'next-sanity';
import { useState } from 'react';

interface EquipmentListProps {
  className?: string;
  equipmentListData?: EQUIPMENT_LIST_QUERYResult | null;
}

const EquipmentList = ({ className = '', equipmentListData }: EquipmentListProps) => {
  const documentId = equipmentListData?._id || 'equipmentListSingleton';
  const documentType = 'equipmentListSingleton';
  const categories = equipmentListData?.categories || [];
  const [hoveredItemKey, setHoveredItemKey] = useState<string | null>(null);

  if (!equipmentListData || categories.length === 0) {
    return null;
  }

  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 gap-4 text-left ${className}`.trim()}>
      {categories.map((category, categoryIndex) => {
        const categoryPath = `categories[${categoryIndex}]`;
        const IconComponent = getCardIcon(stegaClean(category.icon));

        return (
          <div
            key={category._key}
            className='break-inside-avoid mb-4 bg-brand-white-dark rounded-xl shadow-sm overflow-hidden'>

            {/* Accent bar */}
            <div className='h-1 w-full bg-subtle' />

            {/* Card header */}
            <div className='flex items-center gap-3 px-5 pt-4 pb-3'>
              <div
                className='flex-shrink-0 w-8 h-8 rounded-full bg-subtle/20 flex items-center justify-center text-subtle'
                {...createSanityDataAttribute(documentId, documentType, `${categoryPath}.icon`)}>
                <div className='w-4 h-4'>
                  {React.createElement(IconComponent)}
                </div>
              </div>
              <p
                className='text-h6 font-semibold text-brand-primary'
                {...createSanityDataAttribute(documentId, documentType, `${categoryPath}.name`)}>
                {category.name}
              </p>
            </div>

            {/* Divider */}
            <div className='mx-5 border-t border-brand-primary/10' />

            {/* Items */}
            <ul className='px-5 py-4 space-y-2'>
              {category.items?.map((item, itemIndex) => {
                const itemPath = `${categoryPath}.items[${itemIndex}]`;
                const isHovered = hoveredItemKey === item._key;

                return (
                  <li
                    key={item._key}
                    className='relative flex items-start gap-2.5'
                    onMouseEnter={() => item.isTemporarilyUnavailable && setHoveredItemKey(item._key)}
                    onMouseLeave={() => setHoveredItemKey(null)}
                    onTouchStart={() => item.isTemporarilyUnavailable && setHoveredItemKey(item._key)}>
                    <div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-subtle mt-[0.4rem]' />
                    <span
                      className={`text-body-sm ${item.isTemporarilyUnavailable ? 'line-through text-subtle cursor-help' : 'text-brand-primary/80'}`}
                      {...createSanityDataAttribute(documentId, documentType, `${itemPath}.name`)}>
                      {item.name}
                    </span>

                    {/* Tooltip for unavailable items */}
                    {item.isTemporarilyUnavailable && item.unavailableReason && isHovered && (
                      <div className='absolute z-50 left-0 bottom-full mb-2 px-3 py-2 bg-brand-secondary text-brand-white text-body-sm rounded-md shadow-xl max-w-xs whitespace-normal pointer-events-none text-left'>
                        <div className='relative'>
                          <div className='absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-secondary' />
                          <p
                            {...createSanityDataAttribute(documentId, documentType, `${itemPath}.unavailableReason`)}>
                            {item.unavailableReason}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

          </div>
        );
      })}
    </div>
  );
};

export default EquipmentList;
