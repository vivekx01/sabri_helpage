import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { COLORS } from '../constants/config';

// Improved Causes Page Component (replacing existing page)
const OurCausesLandingPage = ({ onNavigate }) => {
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
  <div className="min-h-screen bg-white text-gray-800 font-sans" style={{ selectionColor: COLORS.ACCENT_ORANGE }}>
    {/* Cause 1: Mental Health */}
    <div className="bg-[#FFF7ED] border-y border-orange-100">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
           <div className="inline-block px-3 py-1 bg-white border border-orange-200 text-[#C2410C] text-xs font-bold uppercase rounded-full mb-4">
            Awareness
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{getText('causeMentalTitle','Mental Health')}</h3>
          <p className="text-[#F97316] font-medium italic">{getText('causeMentalSubtitle','"Breaking the silence"')}</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeMentalBody','Mental health remains a taboo subject in many Indian households. Sabri Helpage is dedicated to de-stigmatizing mental illness through awareness campaigns and counseling support.')}
          </p>
          <p className="text-gray-600 leading-relaxed border-l-4 border-[#F97316] pl-6 py-2 bg-white mb-8">
            {getText('causeMentalBody2','We organize workshops in schools and colleges to help young people recognize the signs of depression and anxiety, fostering a generation that is not afraid to ask for help.')}
          </p>
          
          <button 
            onClick={() => onNavigate('mental-health')}
            className="px-6 py-2 border-2 border-[#F97316] text-[#F97316] font-bold rounded hover:bg-[#F97316] hover:text-white transition-colors"
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    {/* Cause 2: Elderly Care */}
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
          <div className="inline-block px-3 py-1 bg-[#FFF7ED] border border-orange-200 text-[#C2410C] text-xs font-bold uppercase rounded-full mb-4">
            Core Focus
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{getText('causeElderlyTitle','Elderly Care')}</h3>
          <p className="text-[#F97316] font-medium italic">{getText('causeElderlySubtitle','"Making their golden years truly golden"')}</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeElderlyBody','In India, the disintegration of the joint family system has left millions of elderly citizens vulnerable to isolation and neglect. We provide more than just medical aid; we provide a sense of belonging.')}
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-4 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-[#F97316]"></div>
              <span className="text-gray-700">{getText('causeElderlyPoint1','<strong>Legal & Medical Support:</strong> Assisting abandoned seniors with legal counseling to claim their rights and providing free geriatric healthcare.')}</span>
            </li>
            <li className="flex gap-4 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-[#F97316]"></div>
              <span className="text-gray-700">{getText('causeElderlyPoint2','<strong>Combating Isolation:</strong> Organizing community events and recreational centers where seniors can socialize and regain their dignity.')}</span>
            </li>
          </ul>

          <button 
            onClick={() => onNavigate('elderly-care')}
            className="px-6 py-2 border-2 border-[#F97316] text-[#F97316] font-bold rounded hover:bg-[#F97316] hover:text-white transition-colors"
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    {/* Cause 3: Girl Child & Education */}
    <div className="bg-[#FFF7ED] border-y border-orange-100">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
          <div className="inline-block px-3 py-1 bg-white border border-orange-200 text-[#C2410C] text-xs font-bold uppercase rounded-full mb-4">
            Empowerment
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{getText('causeGirlTitle','Girl Child & Education')}</h3>
          <p className="text-[#F97316] font-medium italic">{getText('causeGirlSubtitle','"Empowering the street child"')}</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeGirlBody','Our focus is specifically on <strong>street girls</strong>—the most invisible demographic in urban India. We believe education is the only tool that can break the cycle of poverty for them.')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-8">
            <div className="bg-white p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
              <h4 className="font-bold text-[#C2410C] mb-2">{getText('causeGirlCard1Title','Hygiene & Dignity')}</h4>
              <p className="text-sm text-gray-600">{getText('causeGirlCard1Body','We conduct regular distribution drives for sanitary pads and hygiene kits for street-dwelling women and girls who lack access to clean sanitation.')}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
              <h4 className="font-bold text-[#C2410C] mb-2">{getText('causeGirlCard2Title','Vocational Skills')}</h4>
              <p className="text-sm text-gray-600">{getText('causeGirlCard2Body','Beyond basic literacy, we provide vocational training to ensure these girls can secure safe, dignified employment as they reach adulthood.')}</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('girl-education')}
            className="px-6 py-2 border-2 border-[#F97316] text-[#F97316] font-bold rounded hover:bg-[#F97316] hover:text-white transition-colors"
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    {/* Unique Feature: The SocioFare Awards */}
    <div className="bg-[#C2410C] text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">The SocioFare Awards</h2>
            <p className="text-orange-100 text-lg leading-relaxed mb-8">
              A unique initiative by Sabri Helpage to shine a spotlight on excellence in social welfare. We believe that those who dedicate their lives to helping others deserve to be celebrated.
            </p>
            <button className="bg-white text-[#C2410C] font-bold px-8 py-3 rounded hover:bg-orange-50 transition-colors">
              Nominate a Changemaker
            </button>
          </div>
          <div className="bg-[#F97316] p-8 rounded-xl shadow-lg border border-orange-500">
            <h4 className="text-xl font-bold mb-6 text-white border-b border-orange-400 pb-4">Our Impact</h4>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-1">50,000+</div>
                <div className="text-orange-100 text-sm uppercase tracking-wide">Lives impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-orange-100 text-sm uppercase tracking-wide">Years of Service</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">25+</div>
                <div className="text-orange-100 text-sm uppercase tracking-wide">Regions covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OurCausesLandingPage;
                  