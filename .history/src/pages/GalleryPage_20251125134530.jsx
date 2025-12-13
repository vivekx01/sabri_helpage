import React from 'react';
import { ChevronRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const GALLERY_IMAGES = [
    { url: 'event1.jpg', caption: "Community Support Outreach Program" },
    { url: 'event2.jpg', caption: "Elderly Care Home Visit" },
    { url: 'event3.jpg', caption: "Girl Child Education Initiative" },
    { url: 'event4.jpg', caption: "Annual Volunteer Meeting" },
    { url: 'event5.jpg', caption: "Mental Health Workshop" },
    { url: 'event6.jpg', caption: "Food Distribution Drive" },
];

const GalleryPage = ({ onNavigate }) => {
    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BackButton onClick={() => onNavigate('home')} />
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sabri Helpage In Action</h1>
                    <p className="text-lg text-gray-600">A visual journey of our work and impact across communities.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_IMAGES.map((img, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <img
                                src={img.url}
                                alt={img.caption}
                                className="w-full h-64 object-cover"
                                onError={(e) => { 
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/400x300?text=${img.caption}`;
                                }}
                            />
                            <div className="p-4">
                                <p className="text-sm font-medium text-gray-700">{img.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryPage;
