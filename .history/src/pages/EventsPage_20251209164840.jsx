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
  // Removed broken/duplicate JSX before main return
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
              <div className="min-h-screen bg-gray-50">
