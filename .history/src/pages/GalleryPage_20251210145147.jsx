import React from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const GalleryPage = ({ onNavigate }) => {
    const { data: events, loading, error } = useApi(api.getEvents, { status: 'published' }, []);
    
    const galleryImages = events ? events.flatMap(event => 
        (event.images || []).map(img => ({
            url: img,
            caption: event.title
        }))
    ) : [];

    return (
        <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <PageHeader title="Gallery" subtitle="Moments from our work" />
            <div className="py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sabri Helpage In Action</h1>
                    <p className="text-lg text-gray-600">A visual journey of our work and impact across communities.</p>
                </div>
                
                {loading && <div className="text-center py-12">Loading gallery...</div>}
                {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages && galleryImages.length > 0 ? galleryImages.map((img, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <img
                                src={img.url}
                                alt={img.caption}
                                className="w-full h-64 object-cover"
                                onError={(e) => { 
                                    e.target.onerror = null;
                                    e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(img.caption)}`;
                                }}
                            />
                            <div className="p-4">
                                <p className="text-sm font-medium text-gray-700">{img.caption}</p>
                            </div>
                        </div>
                    )) : !loading && <div className="col-span-full text-center py-12 text-gray-600">No gallery images available</div>}
                </div>
            </div>
            </div>
        </section>
    );
};

import React from 'react';

// List of image filenames from public folder
const imageFiles = [
    'elderlyCareImg.jpg', 'event1.jpg', 'event10.jpg', 'event2.jpg', 'event3.jpg', 'event4.jpg', 'event5.jpg', 'event6.jpg', 'event7.jpg', 'event8.jpg', 'event9.jpg', 'events1.jpg', 'events2.jpg', 'girlChildEducation.jpg', 'HeroSection.jpg', 'MentalHealth.jpg', 'NGO India _ Charity in India _ Elderly or senior care, non – profit organisation – sabri helpage.jpg', 'WaterFilteration.jpg', 'websiteLogo.jpg', 'vite.svg'
];

const GalleryPage = () => {
    return (
        <section className="min-h-screen bg-white py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {imageFiles.map((file, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden shadow-md bg-gray-50 flex flex-col items-center">
                            <img src={`/${file}`} alt={file} className="w-full h-64 object-cover" />
                            <div className="p-2 text-xs text-gray-600 truncate w-full text-center">{file}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryPage;
                   
