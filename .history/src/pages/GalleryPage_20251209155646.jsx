import React from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const GalleryPage = ({ onNavigate }) => {
    // Use all images from public as gallery
    const galleryImages = [
      '/event1.jpg','/event2.jpg','/event3.jpg','/event4.jpg','/event5.jpg','/event6.jpg','/event7.jpg','/event8.jpg','/event9.jpg','/event10.jpg',
      '/elderlyCareImg.jpg','/girlChildEducation.jpg','/HeroSection.jpg','/MentalHealth.jpg','/WaterFilteration.jpg','/websiteLogo.jpg','/NGO India _ Charity in India _ Elderly or senior care, non – profit organisation – sabri helpage.jpg','/events1.jpg','/events2.jpg'
    ];

    return (
        <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <PageHeader title="Gallery" subtitle="Moments from our work" />
            <div className="py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sabri Helpage In Action</h1>
                    <p className="text-lg text-gray-600">A visual journey of our work and impact across communities.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((url, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <img
                                src={url}
                                alt={url.split('/').pop()}
                                className="w-full h-64 object-cover"
                                onError={(e) => { 
                                    e.target.onerror = null;
                                    e.target.src = `https://via.placeholder.com/400x300?text=Image`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
};

export default GalleryPage;
                   
