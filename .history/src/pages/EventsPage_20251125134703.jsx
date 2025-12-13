import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Mail } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const EventsPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const upcomingEvents = [
    { date: 'Jan 15, 2024', title: 'Mental Health Awareness Workshop', location: 'New Delhi', time: '10:00 AM - 1:00 PM' },
    { date: 'Jan 22, 2024', title: 'Elderly Care Volunteer Drive', location: 'Mumbai', time: '9:00 AM - 5:00 PM' },
    { date: 'Feb 5, 2024', title: 'Girl Child Education Summit', location: 'Bangalore', time: '2:00 PM - 6:00 PM' }
  ];

  const pastEvents = [
    { date: 'Dec 10, 2023', title: 'Annual Volunteer Appreciation Gala', attendance: '500+ attendees' },
    { date: 'Nov 28, 2023', title: 'Winter Food Distribution Drive', attendance: '2000+ beneficiaries' },
    { date: 'Nov 15, 2023', title: 'Mental Health Week Campaigns', attendance: '5000+ reached' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Our Events</h1>
          <p className="text-xl text-gray-600">Join us for workshops, volunteer opportunities, and community events</p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">DATE</p>
                    <p className="text-lg font-bold text-gray-900">{event.date}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-gray-500">EVENT</p>
                    <p className="text-lg font-semibold text-gray-900">{event.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 flex items-center space-x-1"><MapPin className="h-4 w-4" /> <span>{event.location}</span></p>
                    <p className="text-sm text-gray-700 flex items-center space-x-1 mt-1"><Clock className="h-4 w-4" /> <span>{event.time}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <p className="text-sm font-semibold text-gray-500 mb-2">{event.date}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{event.title}</h3>
                <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                  <span>{event.attendance}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-6">Get notified about upcoming events, workshops, and volunteer opportunities.</p>
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 text-white font-semibold rounded-r-lg hover:shadow-lg transition duration-200 flex items-center space-x-2"
              style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
            >
              <Mail className="h-5 w-5" />
              <span>Subscribe</span>
            </button>
          </form>
          {submitted && <p className="text-green-600 text-sm mt-3 font-semibold">✓ Thank you! Check your email to confirm.</p>}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
