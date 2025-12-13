import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { COLORS } from '../constants/config';

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
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#FF7F50] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{getText('sociofareHeader','The SocioFare Awards')}</h1>
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-[#FF7F50] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{getText('sociofareTitle','The SocioFare Awards')}</h1>
        <p className="text-xl md:text-2xl text-[#FFE4D6] max-w-4xl mx-auto leading-relaxed">
          {getText('sociofareSubtitle','Celebrating the Real Life Heroes who are creating impactful change')}
        </p>
        <div className="h-1 w-32 bg-white mx-auto mt-8 opacity-50"></div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Main Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mb-16 text-justify bg-white rounded-2xl p-8 shadow-sm border border-[#FFE4D6]">
        <p className="text-lg mb-6">
          Sabri Helpage takes immense pride in dedicating the nursing house where wellness dedication and unwavering support has unfitted to what developed and made a lasting impact on society. These individuals work quietly behind the actions, driven only exceptionally full by compassion and purpose, to shine a light on their remarkable contributions and express our heartfelt gratitude for their continued efforts in making the world a better, kinder place for all.
        </p>
        <p className="text-lg">
          Their actions inspire resilience, and a spirit of unity in our communities.
        </p>
      </div>

      {/* Events Section */}
      <div className="bg-[#FFF8F0] rounded-2xl p-8 mb-12 border border-[#FFE4D6]">
        <h3 className="text-3xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }} mb-8 text-center>{getText('sociofareCalendarTitle','Events Calendar')}</h3>
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#FFE4D6]">
            <select className="w-full p-3 border border-[#FFE4D6] rounded-lg focus:ring-2 focus:ring-[#FF7F50] outline-none bg-white">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[#FFE4D6] hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="bg-[#FF7F50] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-bold text-lg">{i*10}</span>
                </div>
                <div className="text-[#FF7F50] font-semibold mt-2">MAR 2025</div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 text-center mb-3">{getText('sociofareEventTitle',`Award Ceremony #${i}`)}</h4>
              <p className="text-gray-600 text-sm text-center">{getText('sociofareEventDesc','Celebrating community heroes and their impactful work')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#FFF8F0] p-8 rounded-2xl border border-[#FFE4D6] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-bullseye text-2xl text-[#FF7F50]"></i>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }}>{getText('sociofareMissionTitle','Our Mission')}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {getText('sociofareMissionBody','The SocioFare is a movement dedicated to recognizing and celebrating selfless individuals who devote their lives to the service of others.')}
          </p>
        </div>
        <div className="bg-[#FFF8F0] p-8 rounded-2xl border border-[#FFE4D6] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-hands-helping text-2xl text-[#FF7F50]"></i>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.ACCENT_ORANGE }}>{getText('sociofareJoinTitle','Join Us')}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {getText('sociofareJoinBody','Be part of this celebration of real-life heroes who illuminate the path for others through their compassion and service.')}
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 bg-[#FF7F50] rounded-2xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">{getText('sociofareCtaTitle','Nominate a Hero')}</h3>
        <p className="text-[#FFE4D6] mb-6 max-w-2xl mx-auto">
          {getText('sociofareCtaBody','Know someone making a difference? Nominate them for the SocioFare Awards and help us recognize their incredible work.')}
        </p>
        <button className="bg-white text-[#FF7F50] px-8 py-3 rounded-lg font-semibold hover:bg-[#FFF8F0] transition-colors">
          Submit Nomination
        </button>
      </div>
    </div>
  </div>
  );
};

export default SociofarePage;
