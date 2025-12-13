import React from 'react';

const EventsPage = () => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#FF7F50] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#FF7F50] mb-6">Upcoming Events</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join us at our next gatherings, fundraisers, and community programs to make a difference together.
        </p>
        <div className="h-1 w-24 bg-[#FF7F50] mx-auto mt-6"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-[#FFF8F0] p-6 rounded-xl text-center">
          <div className="text-4xl font-bold text-[#FF7F50] mb-2">15+</div>
          <div className="text-gray-700">Events This Year</div>
        </div>
        <div className="bg-[#FFF8F0] p-6 rounded-xl text-center">
          <div className="text-4xl font-bold text-[#FF7F50] mb-2">5K+</div>
          <div className="text-gray-700">Participants</div>
        </div>
        <div className="bg-[#FFF8F0] p-6 rounded-xl text-center">
          <div className="text-4xl font-bold text-[#FF7F50] mb-2">12</div>
          <div className="text-gray-700">Cities Covered</div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg border border-[#FFE4D6] overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              {/* Event Date */}
              <div className="md:w-1/5 bg-[#FF7F50] text-white p-8 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">2{i}</div>
                <div className="text-xl uppercase">DEC</div>
                <div className="text-lg">2025</div>
                <div className="mt-4 text-sm bg-white text-[#FF7F50] px-3 py-1 rounded-full font-semibold">
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
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-[#FF7F50]"></i>
                    <span className="text-gray-700">Kolkata Community Center, West Bengal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock text-[#FF7F50]"></i>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-users text-[#FF7F50]"></i>
                    <span className="text-gray-700">Expected: 300+ Participants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-tag text-[#FF7F50]"></i>
                    <span className="text-gray-700">Free Entry</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Health</span>
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Elderly Care</span>
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Mental Health</span>
                  <span className="bg-[#FFF8F0] text-[#E67347] px-3 py-1 rounded-full text-sm">Community</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors flex items-center gap-2 justify-center">
                    <i className="fas fa-calendar-plus"></i>
                    Register Now
                  </button>
                  <button className="px-6 py-3 border border-[#FF7F50] text-[#FF7F50] font-semibold rounded-lg hover:bg-[#FFF8F0] transition-colors flex items-center gap-2 justify-center">
                    <i className="fas fa-share-alt"></i>
                    Share Event
                  </button>
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
        <h2 className="text-3xl font-bold text-[#FF7F50] mb-8 text-center">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-[#FFE4D6] p-6 hover:shadow-lg transition-shadow">
              <div className="text-[#FF7F50] font-bold text-lg mb-2">Nov {15 + i}, 2025</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Youth Empowerment Workshop</h3>
              <p className="text-gray-600 text-sm mb-4">
                Skill development session for underprivileged youth in rural communities.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Delhi Center</span>
              </div>
              <button className="w-full py-2 border border-[#FF7F50] text-[#FF7F50] font-medium rounded-lg hover:bg-[#FFF8F0] transition-colors">
                View Photos
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-[#FFF8F0] rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-[#FF7F50] mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to get notified about upcoming events, volunteer opportunities, and community programs.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none"
          />
          <button className="px-6 py-3 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default EventsPage;
