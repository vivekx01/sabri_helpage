import React from 'react';

const PageSection = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default PageSection;
