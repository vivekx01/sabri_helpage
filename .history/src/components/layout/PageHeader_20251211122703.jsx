import React from 'react';
import { COLORS } from '../../constants/config';

const PageHeader = ({ title, subtitle, eyebrow }) => {
  return (
    <div className="text-center py-10">
      {eyebrow && <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.PRIMARY }}>{eyebrow}</p>}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: COLORS.ACCENT_ORANGE }}>{title}</h1>
      {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
