// src/components/sections/CausesSection.jsx
import React from 'react';
import SectionTitle from '../SectionTitle';
import CauseCard from '../ui/CauseCard';
import { COLORS } from '../../constants/config';

const CausesSection = ({ onDonateClick, onCauseClick }) => {
    return (
        <section id="causes" className="py-20 md:py-28" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle className="mb-14">
                    Even a Small Donation Can <br /> Benefit Many People.
                </SectionTitle>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {CAUSES_DATA.map((cause) => (
                        <CauseCard 
                            key={cause.id}
                            {...cause}
                            onReadMore={() => onCauseClick(cause.id)}
                            onDonate={onDonateClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CausesSection;