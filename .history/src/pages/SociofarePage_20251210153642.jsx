import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

// Sociofare Page Component with Improved UI (replacing existing page)
const SociofarePage = () => {
  const [cfg, setCfg] = useState(null);
  useEffect(() => {
    let mounted = true;
    api.getConfig().then((res) => {
      const data = res?.data || res;
      if (mounted) setCfg(data);
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  const texts = cfg?.texts;
  const getText = (key, fallback) => (texts && typeof texts.get === 'function' && texts.get(key)) || fallback;

  return (
    <section className="py-0 bg-white">
      <PageHeader title="Sociofare" subtitle="Celebrating social impact leaders" />
      <div className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
      {/* Main Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mb-16 text-justify bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: COLORS.PRIMARY_PALE }}>
        <p className="text-lg mb-6">
          Sabri Helpage takes immense pride in dedicating the nursing house where wellness dedication and unwavering support has unfitted to what developed and made a lasting impact on society. These individuals work quietly behind the actions, driven only exceptionally full by compassion and purpose, to shine a light on their remarkable contributions and express our heartfelt gratitude for their continued efforts in making the world a better, kinder place for all.
        </p>
        <p className="text-lg">
          Their actions inspire resilience, and a spirit of unity in our communities.
        </p>
      </div>

      {/* Events Section */}
      <div className="rounded-2xl p-8 mb-12 border" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
        <h3 className="text-3xl font-bold text-center" style={{ color: COLORS.PRIMARY }}>{getText('sociofareCalendarTitle','Events Calendar')}</h3>
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border" style={{ borderColor: COLORS.PRIMARY_PALE }}>
            <select className="w-full p-3 border rounded-lg focus:ring-2 outline-none bg-white" style={{ borderColor: COLORS.PRIMARY_PALE, '--tw-ring-color': COLORS.PRIMARY }}>
              <option>All Months</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <div className="text-center mb-4">
                <div className="text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: COLORS.PRIMARY }}>
                  <span className="font-bold text-lg">{i*10}</span>
                </div>
                <div className="font-semibold mt-2" style={{ color: COLORS.PRIMARY }}>MAR 2025</div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 text-center mb-3">{getText('sociofareEventTitle',`Award Ceremony #${i}`)}</h4>
              <p className="text-gray-600 text-sm text-center">{getText('sociofareEventDesc','Celebrating community heroes and their impactful work')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Cards */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        <div className="p-8 rounded-2xl border hover:shadow-md transition-shadow" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-bullseye text-2xl" style={{ color: COLORS.PRIMARY }}></i>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.PRIMARY }}>{getText('sociofareMissionTitle','Our Mission')}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {getText('sociofareMissionBody','The SocioFare is a movement dedicated to recognizing and celebrating selfless individuals who devote their lives to the service of others.')}
          </p>
        </div>
        <div className="p-8 rounded-2xl border hover:shadow-md transition-shadow" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-hands-helping text-2xl" style={{ color: COLORS.PRIMARY }}></i>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.PRIMARY }}>{getText('sociofareJoinTitle','Join Us')}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {getText('sociofareJoinBody','Be part of this celebration of real-life heroes who illuminate the path for others through their compassion and service.')}
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 md:mt-20 rounded-2xl p-10 md:p-12 text-white" style={{ backgroundColor: COLORS.PRIMARY }}>
        <h3 className="text-3xl font-bold mb-4">{getText('sociofareCtaTitle','Nominate a Hero')}</h3>
        <p className="mb-6 max-w-2xl mx-auto" style={{ color: COLORS.PRIMARY_PALE }}>
          {getText('sociofareCtaBody','Know someone making a difference? Nominate them for the SocioFare Awards and help us recognize their incredible work.')}
        </p>
        <button className="bg-white px-8 py-3 rounded-lg font-semibold transition-colors" style={{ color: COLORS.PRIMARY }}>
          Submit Nomination
        </button>
      </div>
        </div>
      </div>
    </section>
  );
};

export default SociofarePage;
