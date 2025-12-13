import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { COLORS } from '../constants/config';

const SociofarePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  
  // Static text fallback
  const getText = (key, fallback) => fallback;

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <PageHeader 
        title="SocioFare Awards"
        subtitle="Celebrating the unsung heroes of our community"
      />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-16 text-center bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-lg mb-6">
            Sabri Helpage takes immense pride in dedicating the nursing house where wellness dedication and unwavering support has unfitted to what developed and made a lasting impact on society. These individuals work quietly behind the actions, driven only exceptionally full by compassion and purpose, to shine a light on their remarkable contributions and express our heartfelt gratitude for their continued efforts in making the world a better, kinder place for all.
          </p>
          <p className="text-lg">
            Their actions inspire resilience, and a spirit of unity in our communities.
          </p>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{getText('sociofareCalendarTitle','Upcoming Events')}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for our upcoming award ceremonies and community events celebrating local heroes.
            </p>
          </div>

          {/* Month Selector */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>All Months</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-3">
                    <div className="text-2xl font-bold text-primary">{i*10}</div>
                  </div>
                  <div className="font-semibold text-primary">MAR 2025</div>
                </div>
                <h4 className="text-xl font-bold text-center text-gray-900 mb-3">
                  {getText('sociofareEventTitle',`Award Ceremony #${i}`)}
                </h4>
                <p className="text-gray-600 text-sm text-center">
                  {getText('sociofareEventDesc','Celebrating community heroes and their impactful work')}
                </p>
                <div className="mt-4 text-center">
                  <button className="text-primary hover:text-primary-dark text-sm font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: getText('sociofareMissionTitle', 'Our Mission'),
              description: getText('sociofareMissionBody', 'The SocioFare is a movement dedicated to recognizing and celebrating selfless individuals who devote their lives to the service of others.')
            },
            {
              icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: getText('sociofareJoinTitle', 'Join Us'),
              description: getText('sociofareJoinBody', 'Be part of this celebration of real-life heroes who illuminate the path for others through their compassion and service.')
            }
          ].map((card, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-20 rounded-2xl p-10 md:p-12 text-white bg-primary">
          <h3 className="text-3xl font-bold mb-4">{getText('sociofareCtaTitle','Nominate a Hero')}</h3>
          <p className="mb-6 max-w-2xl mx-auto text-primary-pale">
            {getText('sociofareCtaBody','Know someone making a difference? Nominate them for the SocioFare Awards and help us recognize their incredible work.')}
          </p>
          <button className="bg-white px-8 py-3 rounded-lg font-semibold text-primary hover:bg-gray-50 transition-colors">
            Submit Nomination
          </button>
        </div>
      </div>
    </div>
  );
};

export default SociofarePage;