import React, { useState } from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

// Static event images grouped by year
const EVENT_IMAGES = {
  '2025': [
    '/event10.jpg',
    '/event9.jpg',
    '/event8.jpg',
  ],
  '2024': [
    '/event7.jpg',
    '/event6.jpg',
    '/event5.jpg',
  ],
  '2023': [
    '/event4.jpg',
    '/event3.jpg',
    '/event2.jpg',
    '/event1.jpg',
    '/elderlyCareImg.jpg',
    '/girlChildEducation.jpg',
    '/MentalHealth.jpg',
    '/WaterFilteration.jpg',
  ],
  '2022': [
    '/websiteLogo.jpg',
    '/NGO India _ Charity in India _ Elderly or senior care, non – profit organisation – sabri helpage.jpg',
    '/events1.jpg',
    '/events2.jpg',
  ],
};

import React, { useState } from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const EventsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const years = Object.keys(EVENT_IMAGES).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Events Gallery"
        subtitle="Browse event memories by year"
      />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2 rounded-full font-bold text-lg transition-all duration-200 border-2 ${selectedYear === year ? 'bg-[#b34034] text-white border-[#b34034]' : 'bg-white text-[#b34034] border-[#b34034] hover:bg-[#b34034] hover:text-white'}`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {EVENT_IMAGES[selectedYear].map((img, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <img
                src={img}
                alt={img.split('/').pop()}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/400x300?text=Event`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
