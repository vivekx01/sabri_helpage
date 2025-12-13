// src/components/sections/SocioFareSection.jsx
import React from 'react';
import { Star } from 'lucide-react';
import SectionTitle from '../SectionTitle';
import { COLORS, IMAGE_URLS } from '../../constants/config';

const SocioFareSection = () => (
    <section id="sociofare" className="py-20 md:py-28 relative" style={{ backgroundColor: COLORS.PRIMARY }}>
        <div className="absolute inset-0">
            <img src={IMAGE_URLS.AWARDS_BACKGROUND} alt="Awards ceremony background" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionTitle className="mb-8 text-white">
                The SocioFare Awards
            </SectionTitle>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
                Recognizing excellence in social service and community development. Join us in celebrating the changemakers who are transforming lives and communities.
            </p>
            <div className="flex justify-center">
                <div className={`text-white p-8 rounded-2xl shadow-2xl max-w-md`} style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
                    <Star className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Excellence in Service</h3>
                    <p className="text-gray-100">Recognizing outstanding contributions to community welfare and social development.</p>
                </div>
            </div>
        </div>
    </section>
);

export default SocioFareSection;