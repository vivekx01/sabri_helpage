// src/components/SectionTitle.jsx
import React from 'react';

// Utility component for consistent section titling
const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-4xl md:text-5xl font-extrabold leading-tight text-center text-gray-900 ${className}`}>
        {children}
    </h2>
);

export default SectionTitle;