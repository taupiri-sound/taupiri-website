import React from 'react';
import Link from 'next/link';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';

type BaseCTAProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'filled' | 'outline-light' | 'outline-dark' | 'text-link';
};

type LinkCTAProps = BaseCTAProps & {
  as?: 'link';
  href: string;
  target?: string;
  rel?: string;
};

type ButtonCTAProps = BaseCTAProps & {
  as: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

type CTAProps = LinkCTAProps | ButtonCTAProps;

const getVariantStyles = (
  variant: 'filled' | 'outline-light' | 'outline-dark' | 'text-link' = 'filled'
) => {
  // Text link variant - no padding/borders, just text styling with chevron
  if (variant === 'text-link') {
    return 'inline-flex items-center gap-2 text-body-lg font-semibold hover:text-brand-primary transition-colors duration-200 cursor-pointer group';
  }

  // Note that the min-h-[56px] is so that regular buttons become the same height as the CTA Email Button, which needs more internal space because of the icon.
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 min-h-[56px] font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  if (variant === 'outline-light') {
    // Outline button on light background - dark border and text
    return `${baseStyles} border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-brand-white focus:ring-brand-primary`;
  }

  if (variant === 'outline-dark') {
    // Outline button on dark background - light border and text
    return `${baseStyles} border-2 border-brand-white text-brand-white bg-transparent hover:bg-brand-white hover:text-brand-primary focus:ring-brand-white`;
  }

  // Default to filled variant with brand gradient
  return `${baseStyles} bg-brand-gradient-subtle text-brand-white focus:ring-brand-primary hover:scale-105`;
};

const CTA = (props: CTAProps) => {
  const { children, className = '', variant = 'filled', ...restProps } = props;
  const combinedClassName = `${getVariantStyles(variant)} ${className}`.trim();

  // Determine if this is an external link for text-link variant
  let isExternal = false;
  if (props.as !== 'button') {
    const { href } = restProps as LinkCTAProps;
    isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  }

  // For text-link variant, wrap content with appropriate icon
  const content =
    variant === 'text-link' ? (
      <>
        {children}
        {isExternal ? (
          <FiExternalLink className='transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 text-xl' strokeWidth={2.5} />
        ) : (
          <FiChevronRight className='transition-transform duration-200 group-hover:translate-x-1 text-xl' strokeWidth={3} />
        )}
      </>
    ) : (
      children
    );

  if (props.as === 'button') {
    const { onClick, type = 'button', disabled } = restProps as ButtonCTAProps;
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName}>
        {content}
      </button>
    );
  }

  // Default to link behavior
  const { href, target, rel } = restProps as LinkCTAProps;

  // Use Next.js Link for internal links, regular anchor for external links or when target="_blank"
  const shouldUseAnchor = isExternal || target === '_blank';

  if (shouldUseAnchor) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {content}
    </Link>
  );
};

export default CTA;
