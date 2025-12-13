import React from 'react';
import BackButton from '../components/shared/BackButton';
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { COLORS } from '../constants/config';

const CSRSummitPage = ({ onNavigate }) => {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Annual CSR & ESG Summit 2025</h1>
            <p className="text-xl mb-6">A gathering of corporate leaders, non-profit pioneers, and social innovators.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>March 20-21, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>New Delhi Convention Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Summit</h2>
            <p className="text-gray-700 leading-relaxed">The Annual CSR & ESG Summit brings together corporate CSR teams, sustainability leaders, and community organizations to share best practices, forge partnerships, and scale impact.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Should Attend</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• CSR & Sustainability Leaders</li>
              <li>• Social Enterprise Founders</li>
              <li>• NGO Program Heads</li>
              <li>• Policy Makers & Researchers</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Summit Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Star className="h-8 w-8 mx-auto mb-2" style={{ color: COLORS.ACCENT_ORANGE }} />
              <p className="font-semibold">Expert Keynotes</p>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-2" style={{ color: COLORS.ACCENT_ORANGE }} />
              <p className="font-semibold">Interactive Workshops</p>
            </div>
            <div>
              <Star className="h-8 w-8 mx-auto mb-2" style={{ color: COLORS.ACCENT_ORANGE }} />
              <p className="font-semibold">Partnership Marketplace</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Register Now</h2>
          <p className="text-gray-700 mb-6">Seats are limited — register early to secure your spot and benefit from early-bird pricing.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition duration-200"
            style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
          >
            <span>Register for Summit</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CSRSummitPage;
