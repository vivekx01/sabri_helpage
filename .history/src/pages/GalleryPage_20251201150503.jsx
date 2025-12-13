import React from 'react';
import api from '../services/api';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';

const GalleryPage = ({ onNavigate }) => {
    const { data: events, loading, error } = useApi(api.getEvents, { status: 'published' }, []);
    
    const galleryImages = events ? events.flatMap(event => 
        (event.images || []).map(img => ({
            url: img,
            caption: event.title
        }))
    ) : [];
        const BackButton = ({ onClick }) => (
      <button 
        onClick={onClick} 
        className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
                style={{ color: COLORS.PRIMARY }}
      >
        <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        Back
      </button>
    );

    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BackButton onClick={() => onNavigate('home')} />
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
        </section>
    );
};

export default GalleryPage;
                   
