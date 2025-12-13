import React from 'react';
import React from 'react';
import { GALLERY_IMAGES } from '../constants/config';

const GalleryPage = () => {
    return (
        <section className="py-0 md:py-24 bg-gray-100">
            <div className="py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sabri Helpage In Action</h1>
                        <p className="text-lg text-gray-600">A visual journey of our work and impact across communities.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {GALLERY_IMAGES.map((img, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                                <img
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://via.placeholder.com/400x300?text=Gallery+Image`;
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
                   
