import React from 'react';
import { COLORS } from '../../constants/config';

const PageHeader = ({ title, subtitle, eyebrow, variant = 'primary', imageUrl }) => {
  const isPrimary = variant === 'primary';
  const styles = isPrimary
    ? { backgroundColor: COLORS.PRIMARY, color: 'white' }
    : imageUrl
      ? { backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }
      : { backgroundColor: COLORS.BG_LIGHT_GRAY, color: COLORS.TEXT_DARK };

  return (
    <header className="py-14 md:py-20" style={styles}>
      <div className="max-w-6xl mx-auto px-6">
        {eyebrow && (
          <div className="text-xs uppercase tracking-wider font-bold opacity-90 mb-2" style={{ color: isPrimary ? COLORS.PRIMARY_PALE : COLORS.TEXT_GRAY }}>
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: 'inherit' }}>{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl max-w-3xl opacity-95" style={{ color: isPrimary ? COLORS.PRIMARY_PALE : COLORS.TEXT_GRAY }}>
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
