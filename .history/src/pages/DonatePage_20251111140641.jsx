// src/pages/DonatePage.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ACCENT_ORANGE } from '../constants/config';

// Placeholder/Stub Component
const DonatePage = ({ onBack }) => (
    <div className="min-h-screen p-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Support Our Mission</h1>
        <p className="text-xl text-gray-700 mb-12">
            This is the **Donate Page**. Use this space for payment forms and donation options.
        </p>
        <button 
            onClick={onBack}
            className={`font-semibold text-lg transition duration-300 hover:underline flex items-center justify-center mx-auto`} 
            style={{ color: ACCENT_ORANGE }}
        >
            <ArrowRight className="w-5 h-5 inline mr-2 transform rotate-180" /> Back to Home
        </button>
    </div>
);

export default DonatePage;