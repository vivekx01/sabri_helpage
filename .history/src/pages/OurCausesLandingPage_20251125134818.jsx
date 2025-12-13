import React from 'react';
import { Heart, Zap, BookOpen, ArrowRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const OurCausesLandingPage = ({ onNavigate }) => {
  const causes = [
    {
      icon: Heart,
      title: 'Mental Health Support',
      description: 'Breaking the stigma around mental health through counseling, awareness, and support groups.',
      color: 'from-blue-100 to-purple-100',
      buttonColor: 'text-blue-600'
    },
    {
      icon: Zap,
      title: 'Elderly Care',
      description: 'Providing compassionate care, medical support, and social engagement for senior citizens.',
      color: 'from-orange-100 to-amber-100',
      buttonColor: 'text-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Girl Child Education',
      description: 'Empowering girls through scholarships, mentorship, and life skills training.',
      color: 'from-pink-100 to-red-100',
      buttonColor: 'text-pink-600'
    }
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Our Causes</h1>
          <p className="text-xl text-gray-600">Discover the areas where we're creating meaningful change</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => {
            const Icon = cause.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                <div className={`h-32 bg-gradient-to-br ${cause.color}`} />
                <div className="p-8">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg mb-4" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
                    <Icon className={`h-7 w-7 ${cause.buttonColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{cause.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{cause.description}</p>
                  <button
                    onClick={() => {
                      if (index === 0) onNavigate('mental-health');
                      else if (index === 1) onNavigate('elderly-care');
                      else onNavigate('girl-education');
                    }}
                    className="inline-flex items-center space-x-2 font-semibold transition duration-200"
                    style={{ color: COLORS.ACCENT_ORANGE }}
                  >
                    <span>Explore Program</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why These Causes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-lg font-semibold text-orange-600 mb-2">1. Mental Health</p>
              <p className="text-gray-700">Mental health is fundamental to overall wellbeing, yet it remains one of the most stigmatized and under-resourced areas in developing nations.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-600 mb-2">2. Elderly Care</p>
              <p className="text-gray-700">Our aging population deserves dignity, care, and social connection. Yet many face isolation, neglect, and inadequate healthcare.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-600 mb-2">3. Girl Education</p>
              <p className="text-gray-700">Education is the foundation of empowerment. Millions of girls still lack access to quality education and mentorship.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Our Causes</h2>
          <p className="text-gray-600 mb-8">Your contribution can make a real difference in people's lives</p>
          <button
            onClick={() => onNavigate('donate')}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition duration-200"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            <span>Donate Now</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurCausesLandingPage;
