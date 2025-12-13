import React from 'react';
import { COLORS } from '../../constants/config';

const variants = {
  primary: {
    backgroundColor: COLORS.PRIMARY,
    color: '#fff',
    border: '1px solid ' + COLORS.PRIMARY,
  },
  outline: {
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    border: '1px solid ' + COLORS.PRIMARY,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    border: '1px solid transparent',
  },
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const style = variants[variant] || variants.primary;
  return (
    <button
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
