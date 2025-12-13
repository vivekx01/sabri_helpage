// src/components/SectionTitle.jsx
import React from 'react';
import { COLORS } from '../constants/config';

// Utility component for consistent section titling
const SectionTitle = ({ children, className = "" }) => (
        <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight text-center ${className}`}
            style={{ color: COLORS.TEXT_DARK }}
        >
            <span
                className="inline-block px-2 pb-1"
                style={{ borderBottom: `4px solid ${COLORS.PRIMARY}` }}
            >
                {children}
            </span>
        </h2>
);

export default SectionTitle;