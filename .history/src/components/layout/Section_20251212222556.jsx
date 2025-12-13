import React from 'react';

const Section = ({ children, className = '', bgColor = 'bg-white/80', fullWidth = false }) => {
  return (
    <section className={`py-20 ${bgColor} ${!fullWidth ? 'px-2 sm:px-4' : ''} ${className}`}>
      <div className={`${!fullWidth ? 'max-w-4xl mx-auto' : 'w-full'}`}>
        <div className={!fullWidth ? 'px-0 sm:px-4 lg:px-8' : ''}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
