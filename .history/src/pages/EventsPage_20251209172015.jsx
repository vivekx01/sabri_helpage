import React from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';

const EventsPage = () => {
  const { data: events, loading, error } = useApi(api.getEvents, { status: 'published' }, []);
  
  return (
  <div className="min-h-screen bg-white">
    <PageHeader
      title="Upcoming Events"
      subtitle="Join us at our next gatherings, fundraisers, and community programs to make a difference together."
    />

    <PageSection bg="white">
      <div className="max-w-5xl mx-auto px-6">

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-xl text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
          <div className="text-4xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>15+</div>

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
                    <i className="fas fa-users" style={{ color: COLORS.PRIMARY }}></i>
