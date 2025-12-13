import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { IMAGE_URLS, COLORS } from '../constants/config';

const MentalHealthPage = ({ onNavigate }) => {

  const ResponsiveImage = ({ src, alt, className, fallbackText }) => (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/1200x600?text=' + fallbackText; }}
      />
    </div>
  );

  return (
    <section className="py-0 bg-white">
      <PageHeader title="Mental Health" subtitle="Awareness, support, and care" />
      <div className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back button removed per request */}
        <ResponsiveImage 
          src={IMAGE_URLS.MENTAL_HEALTH}
          alt="Mental Health Support"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Mental+Health"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Mental Health</h1>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed font-semibold">
          Sabri Helpage thinks that mental health is an important part of being healthy. We are dedicated to putting mental health in the spotlight with care and purpose at a time when emotional problems are often hidden by fear, stigma, or a lack of understanding. Our work is based on <strong>awareness, connection, and real human support</strong>. This makes sure that people, especially young people, feel safe, heard, and understood.
        </p>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ color: COLORS.ACCENT_ORANGE }}>Our Programs for Mental Health</h2>
        
        {/* Pillar 1: Getting the word out (Awareness) */}
        <div className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">1. Getting the Word Out (Awareness)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            We work hard to teach people in our communities about <strong>mental health</strong>, dispel myths, and encourage open conversations. We help people understand how important <strong>emotional health</strong> is and lower the stigma around it through talks, campaigns, and interactive sessions.
          </p>
        </div>

        {/* Pillar 2: College Student Program */}
        <div className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">2. Program for the Mental Health of College Students</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            We run structured mental health programs in colleges because we know that <strong>stress, anxiety, and emotional pressure are rising among young adults</strong>. These include awareness sessions, expressive activities, safe-space discussions, and <strong>early emotional screening</strong> to help students figure out what their mental health needs are and how to deal with them.
          </p>
        </div>
        
        {/* Pillar 3: Making a network of people who will help you (Support) */}
        <div className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">3. Making a Network of People Who Will Help You (Support Pathways)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
            <li>
              <strong>Podcast Conversations:</strong> Sharing real-life stories, advice, and expert opinions to connect with young people and help them become more emotionally strong.
            </li>
            <li>
              <strong>One-on-one interactions:</strong> Giving people personalized help so they can talk about their problems and get kind advice on how to improve their health.
            </li>
          </ul>
        </div>
        
        <p className="text-lg text-gray-700 mb-10 leading-relaxed italic">
          Sabri Helpage's goal is to build a society that is more emotionally aware and supportive by putting <strong>mental health</strong> at the centre of everything we do. We want people to feel safe asking for help, being themselves, and growing with dignity and strength.
        </p>

        <div className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
          <h3 className="text-2xl font-bold mb-3 text-white">Need Confidential Support?</h3>
          <p className="text-lg text-white mb-4">You are not alone. Reach out to our dedicated team today.</p>
          <a 
            href="mailto:info@sabrihelpage.org"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100"
          >
            Contact Our Team
          </a>
        </div>
      </div>
      </div>
    </section>
  );
};

export default MentalHealthPage;
