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
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Events & Workshops" subtitle="Join our upcoming and past events to make a difference!" />
      <PageSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticEvents.map((event, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <div className="mb-2 text-xs font-semibold uppercase" style={{ color: COLORS.PRIMARY }}>{event.status}</div>
              <div className="font-bold text-lg mb-2" style={{ color: COLORS.PRIMARY }}>{event.date}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              <Button variant="primary" className="w-full">Learn More</Button>
            </div>
          ))}
        </div>
      </PageSection>
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
  );
}
