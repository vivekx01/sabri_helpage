import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { COLORS } from '../constants/config';

const OurCausesLandingPage = ({ onNavigate }) => {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .getConfig()
      .then((res) => {
        const data = res?.data || res;
        if (mounted) setCfg(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const texts = cfg?.texts;
  const getText = (key, fallback) =>
    (texts && typeof texts.get === 'function' && texts.get(key)) || fallback;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
    {/* Cause 1: Mental Health */}
    <div className="border-y" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
           <div className="inline-block px-3 py-1 bg-white border text-xs font-bold uppercase rounded-full mb-4" style={{ borderColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY_DARK }}>
            Awareness
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{getText('causeMentalTitle','Mental Health')}</h3>
          <p className="font-medium italic" style={{ color: COLORS.PRIMARY }}>{getText('causeMentalSubtitle','"Breaking the silence"')}</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeMentalBody','Mental health remains a taboo subject in many Indian households. Sabri Helpage is dedicated to de-stigmatizing mental illness through awareness campaigns and counseling support.')}
          </p>
          <p className="text-gray-600 leading-relaxed border-l-4 pl-6 py-2 bg-white mb-8" style={{ borderLeftColor: COLORS.PRIMARY }}>
            {getText('causeMentalBody2','We organize workshops in schools and colleges to help young people recognize the signs of depression and anxiety, fostering a generation that is not afraid to ask for help.')}
          </p>
          
          <button 
            onClick={() => onNavigate('mental-health')}
            className="px-6 py-2 font-bold rounded transition-colors border-2"
            style={{ borderColor: COLORS.PRIMARY, color: COLORS.PRIMARY }}
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
          <div className="inline-block px-3 py-1 text-xs font-bold uppercase rounded-full mb-4 border" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY_DARK }}>
            Core Focus
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{getText('causeElderlyTitle','Elderly Care')}</h3>
          <p className="font-medium italic" style={{ color: COLORS.PRIMARY }}>{getText('causeElderlySubtitle','"Making their golden years truly golden"')}</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeElderlyBody','In India, the disintegration of the joint family system has left millions of elderly citizens vulnerable to isolation and neglect. We provide more than just medical aid; we provide a sense of belonging.')}
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-4 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></div>
              <span className="text-gray-700">{getText('causeElderlyPoint1','<strong>Legal & Medical Support:</strong> Assisting abandoned seniors with legal counseling to claim their rights and providing free geriatric healthcare.')}</span>
            </li>
            <li className="flex gap-4 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></div>
              <span className="text-gray-700">{getText('causeElderlyPoint2','<strong>Combating Isolation:</strong> Organizing community events and recreational centers where seniors can socialize and regain their dignity.')}</span>
            </li>
          </ul>

          <button 
            onClick={() => onNavigate('elderly-care')}
            className="px-6 py-2 font-bold rounded transition-colors border-2"
            style={{ borderColor: COLORS.PRIMARY, color: COLORS.PRIMARY }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    {/* Cause 3: Girl Child & Education */}
    <div className="border-y" style={{ backgroundColor: COLORS.PRIMARY_PALE, borderColor: COLORS.PRIMARY_PALE }}>
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
          <div className="inline-block px-3 py-1 bg-white border text-xs font-bold uppercase rounded-full mb-4" style={{ borderColor: COLORS.PRIMARY_PALE, color: COLORS.PRIMARY_DARK }}>
            Empowerment
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{getText('causeGirlTitle','Girl Child & Education')}</h3>
          <p className="font-medium italic" style={{ color: COLORS.PRIMARY }}>{getText('causeGirlSubtitle','"Empowering the street child"')}</p>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeGirlBody','Our focus is specifically on <strong>street girls</strong>—the most invisible demographic in urban India. We believe education is the only tool that can break the cycle of poverty for them.')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-8">
            <div className="bg-white p-6 rounded-xl border transition-colors" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>{getText('causeGirlCard1Title','Hygiene & Dignity')}</h4>
              <p className="text-sm text-gray-600">{getText('causeGirlCard1Body','We conduct regular distribution drives for sanitary pads and hygiene kits for street-dwelling women and girls who lack access to clean sanitation.')}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border transition-colors" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>{getText('causeGirlCard2Title','Vocational Skills')}</h4>
              <p className="text-sm text-gray-600">{getText('causeGirlCard2Body','Beyond basic literacy, we provide vocational training to ensure these girls can secure safe, dignified employment as they reach adulthood.')}</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('girl-education')}
            className="px-6 py-2 font-bold rounded transition-colors border-2"
            style={{ borderColor: COLORS.PRIMARY, color: COLORS.PRIMARY }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    {/* Unique Feature: The SocioFare Awards */}
    <div className="text-white" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">The SocioFare Awards</h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: COLORS.PRIMARY_PALE }}>
              A unique initiative by Sabri Helpage to shine a spotlight on excellence in social welfare. We believe that those who dedicate their lives to helping others deserve to be celebrated.
            </p>
            <button className="bg-white font-bold px-8 py-3 rounded transition-colors" style={{ color: COLORS.PRIMARY_DARK }}>
              Nominate a Changemaker
            </button>
          </div>
          <div className="p-8 rounded-xl shadow-lg border" style={{ backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY_LIGHT }}>
            <h4 className="text-xl font-bold mb-6 text-white border-b pb-4" style={{ borderColor: COLORS.PRIMARY_LIGHT }}>Our Impact</h4>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-1">50,000+</div>
                <div className="text-sm uppercase tracking-wide" style={{ color: COLORS.PRIMARY_PALE }}>Lives impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-sm uppercase tracking-wide" style={{ color: COLORS.PRIMARY_PALE }}>Years of Service</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">25+</div>
                <div className="text-sm uppercase tracking-wide" style={{ color: COLORS.PRIMARY_PALE }}>Regions covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OurCausesLandingPage;
                  