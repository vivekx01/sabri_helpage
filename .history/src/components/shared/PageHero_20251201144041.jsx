// src/components/shared/PageHero.jsx
import React from 'react';
import { COLORS } from '../../constants/config';

const PageHero = ({ title, subtitle, children }) => (
  <section className="relative py-12 md:py-16" style={{ backgroundColor: COLORS.PRIMARY }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-white/90 text-center max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
    <div className="pointer-events-none absolute inset-0 opacity-15"></div>
  </section>
);

export default PageHero;
