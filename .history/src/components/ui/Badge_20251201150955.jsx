import React from 'react';
import { COLORS } from '../../constants/config';

const tones = {
  primary: {
    backgroundColor: COLORS.PRIMARY_PALE,
    color: COLORS.PRIMARY_DARK,
    borderColor: COLORS.PRIMARY_PALE,
  },
  neutral: {
    backgroundColor: '#f2f2f2',
    color: COLORS.TEXT_GRAY,
    borderColor: '#e5e5e5',
  },
};

const Badge = ({ children, tone = 'primary', className = '' }) => {
  const t = tones[tone] || tones.primary;
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-full border ${className}`}
      style={{ backgroundColor: t.backgroundColor, color: t.color, borderColor: t.borderColor }}
    >
      {children}
    </span>
  );
};

export default Badge;
