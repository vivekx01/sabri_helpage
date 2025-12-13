import React from 'react';
import { COLORS } from '../../constants/config';

const backgrounds = {
  white: '#ffffff',
  light: COLORS.BG_LIGHT_GRAY,
  pale: COLORS.PRIMARY_PALE,
};

const PageSection = ({ children, bg = 'white', className = '' }) => {
  const bgColor = backgrounds[bg] || backgrounds.white;
  return (
    <section className={`py-12 md:py-16 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="max-w-5xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default PageSection;
