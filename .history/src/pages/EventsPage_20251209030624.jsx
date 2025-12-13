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
          <div className="text-gray-700">Events This Year</div>
        </div>
        <div className="p-6 rounded-xl text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
          <div className="text-4xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>5K+</div>
          <div className="text-gray-700">Participants</div>
        </div>
        <div className="p-6 rounded-xl text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
          <div className="text-4xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>12</div>
          <div className="text-gray-700">Cities Covered</div>
        </div>
      </div>

      {/* Events List */}
      {loading && <div className="text-center py-12">Loading events...</div>}
      {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}
      
      <div className="space-y-8">
        {events && events.length > 0 ? events.slice(0, 4).map((event, i) => (
          <div key={event?._id || i} className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow" style={{ borderColor: COLORS.PRIMARY_PALE }}>
            <div className="md:flex">
              {/* Event Date */}
              <div className="md:w-1/5 text-white p-8 flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.PRIMARY }}>
                <div className="text-4xl font-bold">2{i}</div>
                <div className="text-xl uppercase">DEC</div>
                <div className="text-lg">2025</div>
                <div className="mt-4 text-sm bg-white px-3 py-1 rounded-full font-semibold" style={{ color: COLORS.PRIMARY }}>
                  {i === 1 ? 'Upcoming' : i === 2 ? 'Ongoing' : 'Registration Open'}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="md:w-4/5 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Health Camp #{i}</h3>
                <p className="text-gray-600 mb-6">
                  Join us for a comprehensive health check-up camp focusing on elderly care and mental health awareness. 
                  Free consultations, health screenings, and wellness workshops for all age groups.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {event.location && (
                    <div className="flex items-center gap-3">
                      <i className="fas fa-map-marker-alt" style={{ color: COLORS.PRIMARY }}></i>
                      <span className="text-gray-700">{event.location}</span>
                    </div>
                  )}
                  {event.time && (
                    <div className="flex items-center gap-3">
                      <i className="fas fa-clock" style={{ color: COLORS.PRIMARY }}></i>
                      <span className="text-gray-700">{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <i className="fas fa-users" style={{ color: COLORS.PRIMARY }}></i>
                    <span className="text-gray-700">Community Event</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-tag" style={{ color: COLORS.PRIMARY }}></i>
                    <span className="text-gray-700">Open to All</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {event.tags && event.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY_DARK }}>{tag}</span>
                  ))}
                  {(!event.tags || event.tags.length === 0) && (
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY_DARK }}>Event</span>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" className="flex items-center gap-2 justify-center">
                    <i className="fas fa-calendar-plus"></i>
                    Register Now
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <i className="fas fa-share-alt"></i>
                    Share Event
                  </Button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
                    <i className="fas fa-info-circle"></i>
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : !loading && <div className="text-center py-12 text-gray-600">No events available</div>}
      </div>

      {/* Past Events Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: COLORS.PRIMARY }}>Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="font-bold text-lg mb-2" style={{ color: COLORS.PRIMARY }}>Nov {15 + i}, 2025</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Youth Empowerment Workshop</h3>
              <p className="text-gray-600 text-sm mb-4">
                Skill development session for underprivileged youth in rural communities.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Delhi Center</span>
              </div>
              <Button variant="outline" className="w-full">View Photos</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 rounded-xl p-8 text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
        <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.PRIMARY }}>Stay Updated</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to get notified about upcoming events, volunteer opportunities, and community programs.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 outline-none" style={{ borderColor: COLORS.PRIMARY_PALE, '--tw-ring-color': COLORS.PRIMARY }}
          />
          <Button>Subscribe</Button>
        </div>
      </div>
      </div>
    </PageSection>
  </div>
  );
};

export default EventsPage;
