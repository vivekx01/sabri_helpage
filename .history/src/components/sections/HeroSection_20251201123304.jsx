// src/components/sections/HeroSection.jsx
import React from 'react';
import { IMAGE_URLS, COLORS } from '../../constants/config';
import { useConfig } from '../../context/ConfigContext';

const HeroSection = ({ onReadMoreClick, onDonateClick }) => {
    const { config } = useConfig();
    const cfg = config?.data || config || {};
    const bg = (cfg?.heroImages && cfg.heroImages[0]) || IMAGE_URLS.HERO;
    const heroTitle = (cfg?.texts && typeof cfg.texts.get === 'function' && cfg.texts.get('heroTitle')) || 'Serving society for more than a decade.';
    const heroTagline = (cfg?.texts && typeof cfg.texts.get === 'function' && cfg.texts.get('heroTagline')) || 'सर्वे भवन्तु सुखिन:';
    const heroCtaText = (cfg?.texts && typeof cfg.texts.get === 'function' && cfg.texts.get('heroCtaText')) || 'Read More';
    return (
        <section id="home" className={`relative -mt-2 min-h-[calc(100vh-90px)] flex items-center justify-center text-white text-center overflow-hidden`} style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
            <div className="absolute inset-0">
                <img 
                    src={bg}
                    alt="Community hands together showing unity and support" 
                    className="w-full h-full object-cover filter grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)' }}></div>
            </div>
            
            <div className="relative z-10 p-4 max-w-5xl mx-auto">
                <p className={`text-base font-semibold mb-3 uppercase tracking-widest`} style={{ color: COLORS.ACCENT_ORANGE }}>Sabri Helpage</p>
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight tracking-tight" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
                    {heroTitle}
                </h1>
                <p className="text-lg italic text-gray-300 mb-6">
                    {heroTagline}
                </p>
                <p className="text-sm sm:text-md text-gray-200 mb-8 max-w-2xl mx-auto">
                    Sabri Helpage is a dream pursued by our Founder Aarti BR Singh, a psychoanalyst and an entrepreneur. It is founded on the principles of equality, altruism, and voluntary work spirit to promote human and global development.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button 
                        onClick={onReadMoreClick}
                        className={`text-white px-8 py-3 rounded-full text-md font-bold transition duration-300 shadow-xl hover:brightness-110`}
                        style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
                    >
                        {heroCtaText}
                    </button>
                    <button onClick={onDonateClick} className={`bg-white text-gray-900 px-8 py-3 rounded-full text-md font-bold hover:bg-gray-200 transition duration-300 shadow-xl`}>
                        Support Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;