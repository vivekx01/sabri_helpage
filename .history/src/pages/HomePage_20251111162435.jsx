// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import StatsSection from '../components/sections/StatsSection';
import CausesSection from '../components/sections/CausesSection';
import DonateCallOutSection from '../componentS/sections/DonateCallOutSection';
import SocioFareSection from '../components/sections/SocioFareSection';
import NewsSection from '../components/sections/NewsSection';

const HomePage = ({ onDonateClick, onReadMoreClick, onCauseClick }) => {
    return (
        <>
            <HeroSection onReadMoreClick={onReadMoreClick} onDonateClick={onDonateClick} />
            <AboutSection />
            <StatsSection />
            <CausesSection onDonateClick={onDonateClick} onCauseClick={onCauseClick} />
            <DonateCalloutSection onDonateClick={onDonateClick} />
            <SocioFareSection />
            <NewsSection />
        </>
    );
};

export default HomePage;