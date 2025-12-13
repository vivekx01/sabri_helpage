// PageHeader.jsx
import React from 'react';
import { COLORS } from '../../constants/config';

const PageHeader = ({ title, subtitle, eyebrow }) => {
  return (
    <div className="py-16 md:py-24" style={{ backgroundColor: COLORS.PRIMARY }}>
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.PRIMARY_PALE }}>
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl" style={{ color: COLORS.PRIMARY_PALE }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;