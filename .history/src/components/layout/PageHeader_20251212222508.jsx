import React from 'react';
import { COLORS } from '../../constants/config';

const PageHeader = ({ title, subtitle, eyebrow }) => {
  return (
    <div className="w-full flex justify-center mt-8 mb-8">
      <div
        className="rounded-2xl shadow-md border border-gray-200 px-8 py-8 max-w-4xl w-full text-center"
        style={{ background: COLORS.ACCENT_ORANGE }}
      >
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-widest mb-3 text-white opacity-80">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
          {title}
        </h1>
        {subtitle && <p className="text-lg text-white/90">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
