import React from 'react';
import Link from 'next/link';

type BaseCTAProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'filled' | 'outline-light' | 'outline-dark';
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

const getVariantStyles = (variant: 'filled' | 'outline-light' | 'outline-dark' = 'filled') => {
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

  if (props.as === 'button') {
    const { onClick, type = 'button', disabled } = restProps as ButtonCTAProps;
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName}>
        {children}
      </button>
    );
  }

  // Default to link behavior
  const { href, target, rel } = restProps as LinkCTAProps;

  // Use Next.js Link for internal links, regular anchor for external links or when target="_blank"
  const isExternal =
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const shouldUseAnchor = isExternal || target === '_blank';

  if (shouldUseAnchor) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default CTA;
