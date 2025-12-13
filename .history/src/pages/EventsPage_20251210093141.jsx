
import React, { useEffect, useState } from 'react';
import api from '../services/api.mjs';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const EventsPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('events').then((data) => {
      setImages(data?.images || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Events Gallery"
        subtitle="Snapshots from our events and programs."
      />
      <div className="max-w-5xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <img
                  src={img.url}
                  alt={img.caption || `Event ${idx + 1}`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/400x300?text=Event+${idx + 1}`;
                  }}
                />
                {img.caption && (
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-700">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
