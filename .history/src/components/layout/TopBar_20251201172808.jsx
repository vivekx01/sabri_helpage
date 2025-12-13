import React from 'react';
import { COLORS } from '../../constants/config';

const TopBar = ({ title }) => (
  <div className="text-white py-4 px-6" style={{ backgroundColor: COLORS.PRIMARY }}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  </div>
);

export default TopBar;
