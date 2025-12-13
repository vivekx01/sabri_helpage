
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
                   
