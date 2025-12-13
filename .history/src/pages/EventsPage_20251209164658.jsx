import React from 'react';
import api from '../services/api.mjs';
import { useApi } from '../hooks/useApi';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';

const EventsPage = () => {
  const staticEvents = [
    {
      date: '02 DEC 2025',
      status: 'Upcoming',
      title: 'Community Health Camp',
      description: 'Join us for a comprehensive health check-up camp focusing on elderly care and mental health awareness.',
      image: '/event1.jpg',
    },
    {
      date: '10 DEC 2025',
      status: 'Ongoing',
      title: 'Fundraiser Gala',
      description: 'Support our mission at the annual gala with music, food, and inspiring stories.',
      image: '/event2.jpg',
    },
    {
      date: '18 DEC 2025',
      status: 'Registration Open',
      title: 'Volunteer Drive',
      description: 'Sign up to volunteer and make a direct impact in your community.',
      image: '/event3.jpg',
    },
    {
      date: '25 DEC 2025',
      status: 'Completed',
      title: 'Winter Relief Distribution',
      description: 'Help us distribute blankets and supplies to those in need during winter.',
      image: '/event4.jpg',
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Upcoming Events"
        subtitle="Join us at our next gatherings, fundraisers, and community programs to make a difference together."
      />
      <PageSection bg="white">
        <div className="max-w-5xl mx-auto px-6">
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
          <div className="space-y-8">
            {staticEvents.map((event, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow" style={{ borderColor: COLORS.PRIMARY_PALE }}>
                <div className="md:flex">
                  <div className="md:w-1/5 text-white p-8 flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.PRIMARY }}>
                    <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded-full mb-4" />
                    <div className="text-xl font-bold">{event.date}</div>
                    <div className="mt-4 text-sm bg-white px-3 py-1 rounded-full font-semibold" style={{ color: COLORS.PRIMARY }}>
                      {event.status}
                    </div>
                  </div>
                  <div className="md:w-4/5 p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
                    <p className="text-gray-600 mb-6">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </div>
  );

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
