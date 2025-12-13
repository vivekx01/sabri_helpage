// src/components/sections/AboutSection.jsx
import React from 'react';
import { Play } from 'lucide-react';
import { IMAGE_URLS, PRIMARY_DARK, ACCENT_ORANGE } from '../../constants/config';

const AboutSection = () => (
    <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="grid grid-cols-2 gap-4 md:gap-6 order-last md:order-first">
                <div className="col-span-1 p-0 rounded-xl shadow-xl flex items-center justify-center h-32 sm:h-48 relative overflow-hidden">
                    <img src={IMAGE_URLS.CHILDREN_HAPPY} alt="Happy diverse children playing together" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-1 p-0 rounded-xl shadow-xl flex items-center justify-center h-32 sm:h-48 relative overflow-hidden">
                    <img src={IMAGE_URLS.KIDS_LEARNING} alt="Children learning in classroom environment" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 p-0 rounded-xl shadow-xl flex items-center justify-center h-32 sm:h-48 relative overflow-hidden">
                    <img src={IMAGE_URLS.COMMUNITY_SUPPORT} alt="Community food distribution and support" className="w-full h-full object-cover" />
                </div>
            </div>
            
            <div id="about" className='order-first md:order-last'>
                <p className={`font-bold uppercase tracking-widest mb-2 text-sm`} style={{ color: ACCENT_ORANGE }}>What We Stand For</p>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6`}>
                    Shaping Lives Through <br/> Compassionate Action.
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                    At Sabri Helpage, our mission is to make a positive and lasting impact on the lives of those in need. We are dedicated mostly to **mental health awareness, elderly care, and woman & children welfare**. Through unwavering commitment, collaboration, and the support of our global community, we strive to create a more equitable, sustainable, and compassionate world.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <a href="#" className={`text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition duration-300 shadow-lg`} style={{ backgroundColor: PRIMARY_DARK }}>
                        View More
                    </a>
                    <a href="#" className={`flex items-center text-gray-900 font-semibold transition duration-300`}>
                        <Play className={`w-6 h-6 mr-2`} style={{ color: ACCENT_ORANGE, fill: ACCENT_ORANGE }} /> Watch Video
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;