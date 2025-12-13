import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';

// Static event data using public images
const EVENTS = [
  {
    title: 'Elderly Care Camp',
    date: '2023-10-12',
    description: 'A special camp for elderly care and support.',
    image: '/elderlyCareImg.jpg',
    location: 'Delhi Center',
    time: '10:00 AM',
    tags: ['Care', 'Elderly'],
  },
  {
    title: 'Girl Child Education Drive',
    date: '2023-09-05',
    description: 'Promoting education for the girl child in rural areas.',
    image: '/girlChildEducation.jpg',
    location: 'Lucknow',
    time: '11:00 AM',
    tags: ['Education', 'Girls'],
  },
  {
    title: 'Mental Health Awareness',
    date: '2023-08-20',
    description: 'Spreading awareness about mental health and well-being.',
    image: '/MentalHealth.jpg',
    location: 'Kanpur',
    time: '2:00 PM',
    tags: ['Health', 'Awareness'],
  },
  {
    title: 'Water Filtration Project',
    date: '2023-07-15',
    description: 'Providing clean water through filtration systems.',
    image: '/WaterFilteration.jpg',
    location: 'Agra',
    time: '9:00 AM',
    tags: ['Water', 'Cleanliness'],
  },
  {
    title: 'Annual Fundraiser',
    date: '2023-06-10',
    description: 'Our biggest fundraising event of the year.',
    image: '/event1.jpg',
    location: 'Delhi Center',
    time: '6:00 PM',
    tags: ['Fundraiser'],
  },
  {
    title: 'Community Outreach',
    date: '2023-05-22',
    description: 'Engaging with the community for better impact.',
    image: '/event2.jpg',
    location: 'Lucknow',
    time: '3:00 PM',
    tags: ['Community'],
  },
  {
    title: 'Sociofare Event',
    date: '2023-04-18',
    description: 'A gathering to promote social welfare initiatives.',
    image: '/event3.jpg',
    location: 'Kanpur',
    time: '1:00 PM',
    tags: ['Sociofare'],
  },
  {
    title: 'Health Checkup Camp',
    date: '2023-03-12',
    description: 'Free health checkups for the underprivileged.',
    image: '/event4.jpg',
    location: 'Agra',
    time: '10:00 AM',
    tags: ['Health'],
  },
  {
    title: 'Winter Relief Drive',
    date: '2023-01-25',
    description: 'Distributing blankets and warm clothes.',
    image: '/event5.jpg',
    location: 'Delhi Center',
    time: '8:00 AM',
    tags: ['Relief'],
  },
  {
    title: 'Website Launch',
    date: '2022-12-01',
    description: 'Launch of the new Sabri Helpage website.',
    image: '/websiteLogo.jpg',
    location: 'Online',
    time: '12:00 PM',
    tags: ['Website'],
  },
  {
    title: 'NGO Awareness',
    date: '2022-11-10',
    description: 'Raising awareness about our NGO and its mission.',
    image: '/NGO India _ Charity in India _ Elderly or senior care, non – profit organisation – sabri helpage.jpg',
    location: 'Delhi Center',
    time: '4:00 PM',
    tags: ['Awareness'],
  },
  {
    title: 'Events Recap 1',
    date: '2022-10-15',
    description: 'Highlights from our recent events.',
    image: '/events1.jpg',
    location: 'Lucknow',
    time: '5:00 PM',
    tags: ['Recap'],
  },
  {
    title: 'Events Recap 2',
    date: '2022-09-20',
    description: 'More moments from our journey.',
    image: '/events2.jpg',
    location: 'Kanpur',
    time: '7:00 PM',
    tags: ['Recap'],
  },
];

const EventsPage = () => {
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
        <div className="space-y-8">
          {EVENTS.slice(0, 4).map((event, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="md:flex">
                {/* Event Image/Date */}
                <div className="md:w-1/5 text-white p-0 flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.PRIMARY }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover md:h-full"
                    onError={(e) => { 
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/200x200?text=${encodeURIComponent(event.title)}`;
                    }}
                  />
                  <div className="mt-2 text-sm bg-white px-3 py-1 rounded-full font-semibold" style={{ color: COLORS.PRIMARY }}>
                    {event.date ? new Date(event.date).toLocaleDateString() : ''}
                  </div>
                </div>
                {/* Event Details */}
                <div className="md:w-4/5 p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
                  <p className="text-gray-600 mb-6">{event.description}</p>
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
          ))}
        </div>

        {/* Past Events Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: COLORS.PRIMARY }}>Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.slice(4).map((event, i) => (
              <div key={i} className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow" style={{ borderColor: COLORS.PRIMARY_PALE }}>
                <div className="font-bold text-lg mb-2" style={{ color: COLORS.PRIMARY }}>{event.date ? new Date(event.date).toLocaleDateString() : ''}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover mb-3"
                  onError={(e) => { 
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/200x200?text=${encodeURIComponent(event.title)}`;
                  }}
                />
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{event.location}</span>
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
