import React from 'react';
import { IMAGE_URLS, COLORS } from '../constants/config';

const ElderlyCarePage = ({ onNavigate }) => {

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
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button removed per request */}
        <ResponsiveImage 
          src={IMAGE_URLS.ELDERLY_CARE}
          alt="Elderly Care"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Elderly+Care"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Elderly Care</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed font-semibold" style={{ color: '#3B82F6' }}>
          Sabri Helpage is a caring support system for older people, reaching out to those who are often ignored and unheard. It was started with the idea that every older person deserves care, respect, and emotional security. We work hard to improve the quality of life for these people. We make sure that age never gets in the way of health, comfort, or hope by providing thoughtful help and caring service.
        </p>

        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          Sabri Helpage has created a support system that touches on every important part of the lives of seniors because we understand the problems they face, such as health issues, limited mobility, loneliness, and money problems. Our programs are more than just services; we are acts of kindness, respect, and humanity.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ color: COLORS.ACCENT_ORANGE }}>The Most Important Services We Offer to Seniors</h2>
        
        <div className="space-y-8 mb-10">
          {/* Service Block 1: Full Eye Care */}
          <div className="p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Full Eye Care</h3>
            <p className="text-lg text-gray-700">
              Regular eye exams, early detection of vision problems, and full support for needed surgeries all help seniors get their vision back, feel more confident, and be more independent.
            </p>
          </div>

          {/* Service Block 2: Important Medication Help */}
          <div className="p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Important Medication Help</h3>
            <p className="text-lg text-gray-700">
              Helping older people get the medicines they need to manage chronic illnesses, which will improve their daily lives and keep their health stable in the long term.
            </p>
          </div>

          {/* Service Block 3: Nourishing Food Programs */}
          <div className="p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Nourishing Food Programs</h3>
            <p className="text-lg text-gray-700">
              Giving seniors balanced nutritional support to make sure they get the vitamins and minerals they need for strength, immunity, and general health.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-10 leading-relaxed italic">
          Sabri Helpage gives older people the tools they need to live with dignity, comfort, and a renewed sense of belonging through these important programs. Every life we touch is a sign of our commitment to creating a world where kindness is a way of life and where our elders are respected, supported, and loved.
        </p>
        
        <div className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
          <h3 className="text-2xl font-bold mb-3 text-white">Support Our Elders</h3>
          <p className="text-lg text-white mb-4">Your donation helps us provide essential care, medication, and companionship.</p>
          <button 
            onClick={() => onNavigate('donate')}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100"
          >
            Donate Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default ElderlyCarePage;


