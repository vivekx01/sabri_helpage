import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const SociofarePage = () => (
  <section className="py-0 bg-white">
    <PageHeader title="Sociofare" subtitle="Celebrating social impact leaders" />
    <div className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Main Content */}
        <div className="prose max-w-none text-gray-700 leading-relaxed mb-16 text-justify rounded-2xl p-8 shadow-sm border bg-[#f9e6e4]" style={{ borderColor: '#f9e6e4' }}>
          <p className="text-lg mb-6">
            Sabri Helpage takes immense pride in dedicating the nursing house where wellness dedication and unwavering support has unfitted to what developed and made a lasting impact on society. These individuals work quietly behind the actions, driven only exceptionally full by compassion and purpose, to shine a light on their remarkable contributions and express our heartfelt gratitude for their continued efforts in making the world a better, kinder place for all.
          </p>
          <p className="text-lg">
            Their actions inspire resilience, and a spirit of unity in our communities.
          </p>
        </div>

        {/* Minimal Content Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-12">
          <div className="p-8 rounded-2xl border bg-[#f9e6e4]" style={{ borderColor: '#f9e6e4' }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              The SocioFare is a movement dedicated to recognizing and celebrating selfless individuals who devote their lives to the service of others.
            </p>
          </div>
          <div className="p-8 rounded-2xl border bg-[#f9e6e4]" style={{ borderColor: '#f9e6e4' }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>Join Us</h3>
            <p className="text-gray-700 leading-relaxed">
              Be part of this celebration of real-life heroes who illuminate the path for others through their compassion and service.
            </p>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div className="p-8 rounded-2xl border hover:shadow-md transition-shadow" style={{ backgroundColor: '#f9e6e4', borderColor: '#f9e6e4' }}>
            <div className="flex items-center gap-3 mb-4">
              <i className="fas fa-bullseye text-2xl" style={{ color: COLORS.PRIMARY }}></i>
              <h3 className="text-2xl font-bold" style={{ color: COLORS.PRIMARY }}>Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The SocioFare is a movement dedicated to recognizing and celebrating selfless individuals who devote their lives to the service of others.
            </p>
          </div>
          <div className="p-8 rounded-2xl border hover:shadow-md transition-shadow" style={{ backgroundColor: '#f9e6e4', borderColor: '#f9e6e4' }}>
            <div className="flex items-center gap-3 mb-4">
              <i className="fas fa-hands-helping text-2xl" style={{ color: COLORS.PRIMARY }}></i>
              <h3 className="text-2xl font-bold" style={{ color: COLORS.PRIMARY }}>Join Us</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Be part of this celebration of real-life heroes who illuminate the path for others through their compassion and service.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-20 rounded-2xl p-10 md:p-12 text-white" style={{ backgroundColor: COLORS.PRIMARY }}>
          <h3 className="text-3xl font-bold mb-4">Nominate a Hero</h3>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: COLORS.PRIMARY_PALE }}>
            Know someone making a difference? Nominate them for the SocioFare Awards and help us recognize their incredible work.
          </p>
          <button className="bg-white px-8 py-3 rounded-lg font-semibold transition-colors" style={{ color: COLORS.PRIMARY }}>
            Submit Nomination
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default SociofarePage;
