// src/components/sections/DonateCalloutSection.jsx
import React from 'react';
import SectionTitle from '../SectionTitle';
import { COLORS } from '../../constants/config';

const DonateCallOutSection = ({ onDonateClick }) => (
    <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionTitle className="mb-8">
                Your Support Can Make <br /> a Real Difference.
            </SectionTitle>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
                Join us in our mission to create lasting change. Every contribution, no matter how small, helps us reach more people and create more impact.
            </p>
            <button 
                onClick={onDonateClick}
                className={`text-white px-12 py-4 rounded-full text-lg font-bold transition duration-300 shadow-xl hover:brightness-110`}
                style={{ backgroundColor: COLORS.PRIMARY }}
            >
                Donate Now
            </button>
        </div>
    </section>
);

export default DonateCallOutSection;