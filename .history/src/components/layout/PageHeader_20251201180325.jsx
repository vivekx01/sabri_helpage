import React from 'react';
import { COLORS } from '../../constants/config';

const PageHeader = ({ title, subtitle, eyebrow, variant = 'primary', imageUrl }) => {
  const isPrimary = variant === 'primary';
  const innerStyles = isPrimary
    ? { backgroundColor: COLORS.PRIMARY, color: 'white' }
    : imageUrl
      ? { backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }
      : { backgroundColor: COLORS.BG_LIGHT_GRAY, color: COLORS.TEXT_DARK };

  return (
    <div className="py-10 md:py-16">
      <div
        className="max-w-5xl mx-auto px-6 py-10 md:py-14 rounded-2xl"
        style={innerStyles}
      >
        {eyebrow && (
          <div className="text-xs uppercase tracking-wider font-bold opacity-90 mb-3" style={{ color: isPrimary ? COLORS.PRIMARY_PALE : COLORS.TEXT_GRAY }}>
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'inherit' }}>{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl max-w-3xl opacity-95" style={{ color: isPrimary ? COLORS.PRIMARY_PALE : COLORS.TEXT_GRAY }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
