
import React, { useEffect, useState } from 'react';
import api from '../services/api.mjs';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

// ...existing imports...

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.getPageContent('gallery').then((data) => {
            setImages(data?.images || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <PageHeader title="Gallery" subtitle="Moments from our work" />
            <div className="py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sabri Helpage In Action</h1>
                    <p className="text-lg text-gray-600">A visual journey of our work and impact across communities.</p>
                </div>
                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
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
                    ))}
                </div>
                )}
            </div>
            </div>
        </section>
    );
};

export default GalleryPage;
                   
