import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  size?: 'thin' | 'medium' | 'wide';
  color?: 'light' | 'dark';
  className?: string;
}

const Divider = ({ size = 'medium', color = 'dark', className = '' }: DividerProps) => {
  // Map size + color combinations to CSS classes
  const getVariantClass = () => {
    const variant = `${size}-${color}`;
    switch (variant) {
      case 'thin-light':
        return styles.thinLight;
      case 'thin-dark':
        return styles.thinDark;
      case 'medium-light':
        return styles.mediumLight;
      case 'medium-dark':
        return styles.mediumDark;
      case 'wide-light':
        return styles.wideLight;
      case 'wide-dark':
        return styles.wideDark;
      default:
        return styles.mediumDark; // Default fallback
    }
  };

  return <div className={`${getVariantClass()} ${className}`.trim()}></div>;
};

export default Divider;
