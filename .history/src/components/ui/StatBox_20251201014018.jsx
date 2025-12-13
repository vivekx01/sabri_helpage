// src/components/ui/StatBox.jsx
import React from 'react';
import { COLORS } from '../../constants/config';

const StatBox = ({ value, label }) => (
    <div className={`text-center p-4 sm:p-6 text-white rounded-xl shadow-inner border-b-4 border-white`} style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
        <span className="text-3xl sm:text-4xl font-extrabold">{value}</span>
        <p className="text-xs text-gray-300 mt-1">{label}</p>
    </div>
);

export default StatBox;