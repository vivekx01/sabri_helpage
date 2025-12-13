import React from 'react';

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center text-gray-900 ${className}`}>
    {children}
  </h2>
);

export default SectionTitle;
