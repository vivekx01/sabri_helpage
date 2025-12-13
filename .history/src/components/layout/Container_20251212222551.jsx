import React from 'react';


const Container = ({ children, className = '', padding = 'p-8 lg:p-12', maxWidth = 'max-w-4xl' }) => {
  return (
    <div
      className={
        `${maxWidth} mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl ${padding} ${className}`
      }
      style={{
        background: 'linear-gradient(135deg, #fff 80%, #f8f9fa 100%)'
      }}
    >
      {children}
    </div>
  );
};

export default Container;
