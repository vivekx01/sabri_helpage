import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

// Use all images from public folder for a static grid
const EVENT_IMAGES = [
  '/elderlyCareImg.jpg',
  '/event1.jpg',
  '/event2.jpg',
  '/event3.jpg',
  '/event4.jpg',
  '/event5.jpg',
  '/event6.jpg',
  '/event7.jpg',
  '/event8.jpg',
  '/event9.jpg',
  '/event10.jpg',
  '/events1.jpg',
  '/events2.jpg',
  '/girlChildEducation.jpg',
  '/HeroSection.jpg',
  '/MentalHealth.jpg',
  '/NGO India _ Charity in India _ Elderly or senior care, non – profit organisation – sabri helpage.jpg',
  '/WaterFilteration.jpg',
  '/websiteLogo.jpg',
  '/vite.svg',
];

const EventsPage = () => (
  <div className="min-h-screen bg-white">
    <PageHeader
      title="Events Gallery"
      subtitle="Snapshots from our events and programs."
    />
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {EVENT_IMAGES.map((img, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <img
              src={img}
              alt={`Event ${idx + 1}`}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/400x300?text=Event+${idx + 1}`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EventsPage;
