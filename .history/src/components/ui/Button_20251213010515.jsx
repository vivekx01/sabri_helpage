import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
