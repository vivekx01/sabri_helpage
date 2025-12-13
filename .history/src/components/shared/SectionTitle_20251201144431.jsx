import React from 'react';
import { COLORS } from '../../constants/config';

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center ${className}`} style={{ color: COLORS.TEXT_DARK }}>
    <span className="inline-block px-2 pb-1" style={{ borderBottom: `4px solid ${COLORS.PRIMARY}` }}>
      {children}
    </span>
  </h2>
);

export default SectionTitle;
