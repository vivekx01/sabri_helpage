import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import api from '../services/api';
import { useApi } from '../hooks/useApi';

// Fallback images in case API fails
const GALLERY_IMAGES = [
  { 
    id: 1,
    url: '/images/gallery/community-outreach.jpg',
    caption: 'Community Support Outreach Program',
    category: 'Community'
  },
  { 
    id: 2,
    url: '/images/gallery/elderly-care.jpg',
    caption: 'Elderly Care Home Visit',
    category: 'Elderly Care'
  },
  { 
    id: 3,
    url: '/images/gallery/education.jpg',
    caption: 'Girl Child Education Initiative',
    category: 'Education'
  },
  { 
    id: 4,
    url: '/images/gallery/volunteer-meeting.jpg',
    caption: 'Annual Volunteer Meeting',
    category: 'Volunteers'
  },
  { 
    id: 5,
    url: '/images/gallery/mental-health.jpg',
    caption: 'Mental Health Workshop',
    category: 'Health'
  },
  { 
    id: 6,
    url: '/images/gallery/food-drive.jpg',
    caption: 'Food Distribution Drive',
    category: 'Community'
  },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [images, setImages] = useState(GALLERY_IMAGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const { data: galleryData } = useApi(api.getGallery, {}, []);

  useEffect(() => {
    if (galleryData && galleryData.length > 0) {
      setImages(galleryData);
    }
  }, [galleryData]);

  // Get unique categories from images
  const categories = ['All', ...new Set(images.map(img => img.category))];
  
  // Filter images by selected category
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  // Handle image error
  const handleImageError = (e, fallbackText) => {
    if (e.target) {
      e.target.onerror = null;
      e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(fallbackText)}`;
    }
  };

  return (
    <section className="py-0 bg-white">
      <PageHeader 
        title="Our Gallery" 
        subtitle="Capturing moments of impact and transformation"
        bgImage="/images/gallery/gallery-header.jpg"
      />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category 
                    ? 'text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? COLORS.PRIMARY : 'transparent'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary"></div>
              <p className="mt-2 text-gray-600">Loading gallery...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12 text-red-600">
              Failed to load gallery. Please try again later.
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((img) => (
                  <div 
                    key={img.id} 
                    className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => handleImageError(e, img.caption)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-700">{img.caption}</p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full" style={{ backgroundColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY }}>
                        {img.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No images found in this category.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;