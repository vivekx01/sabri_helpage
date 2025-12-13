import React from 'react';

const GALLERY_IMAGES = [
    { url: 'https://via.placeholder.com/400x300?text=Community+Outreach', caption: "Community Support Outreach Program" },
    { url: 'https://via.placeholder.com/400x300?text=Elderly+Care', caption: "Elderly Care Home Visit" },
    { url: 'https://via.placeholder.com/400x300?text=Education', caption: "Girl Child Education Initiative" },
    { url: 'https://via.placeholder.com/400x300?text=Volunteer+Meeting', caption: "Annual Volunteer Meeting" },
    { url: 'https://via.placeholder.com/400x300?text=Mental+Health', caption: "Mental Health Workshop" },
    { url: 'https://via.placeholder.com/400x300?text=Food+Drive', caption: "Food Distribution Drive" },
];

const GalleryPage = ({ onNavigate }) => {
    const BackButton = ({ onClick }) => (
      <button 
        onClick={onClick} 
        className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
        style={{ color: '#FF7A42' }}
      >
        <svg className="w-5 h-5 rotate-180 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        Back
      </button>
    );

    return (
        <section className="py-16 md:py-24 bg-[#FFF8F0]">
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
                                    e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(img.caption)}`;
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
