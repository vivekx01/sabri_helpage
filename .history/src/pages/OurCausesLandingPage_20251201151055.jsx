import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { COLORS } from '../constants/config';

const OurCausesLandingPage = ({ onNavigate }) => {
  const [cfg, setCfg] = useState(null);

import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
  useEffect(() => {
    let mounted = true;
    api
    <PageHeader
      title={getText('ourCausesTitle','Our Causes')}
      subtitle={getText('ourCausesSubtitle','Three focused missions driving our impact across communities')}
      eyebrow={getText('ourCausesEyebrow','What We Do')}
      variant="primary"
    />
      .getConfig()
      .then((res) => {
    <PageSection bg="pale">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        if (mounted) setCfg(data);
          <Badge>Awareness</Badge>
      mounted = false;
    };
  }, []);
        <div className="md:col-span-2">
  const texts = cfg?.texts;
  const getText = (key, fallback) =>
    (texts && typeof texts.get === 'function' && texts.get(key)) || fallback;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
          <Button variant="outline" onClick={() => onNavigate('mental-health')}>Read More</Button>
          <p className="font-medium italic" style={{ color: COLORS.PRIMARY }}>{getText('causeMentalSubtitle','"Breaking the silence"')}</p>
      </div>
    </PageSection>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {getText('causeMentalBody','Mental health remains a taboo subject in many Indian households. Sabri Helpage is dedicated to de-stigmatizing mental illness through awareness campaigns and counseling support.')}
    <PageSection bg="white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {getText('causeMentalBody2','We organize workshops in schools and colleges to help young people recognize the signs of depression and anxiety, fostering a generation that is not afraid to ask for help.')}
          <Badge>Core Focus</Badge>
            onClick={() => onNavigate('mental-health')}
            className="px-6 py-2 font-bold rounded transition-colors border-2"
            style={{ borderColor: COLORS.PRIMARY, color: COLORS.PRIMARY }}
        <div className="md:col-span-2">
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
          <Button variant="outline" onClick={() => onNavigate('elderly-care')}>Read More</Button>
          <ul className="space-y-4 mb-8">
      </div>
    </PageSection>
              <span className="text-gray-700">{getText('causeElderlyPoint1','<strong>Legal & Medical Support:</strong> Assisting abandoned seniors with legal counseling to claim their rights and providing free geriatric healthcare.')}</span>
            </li>
    <PageSection bg="pale">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="mt-1 min-w-[6px] h-[6px] rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></div>
          <Badge>Empowerment</Badge>

          <button 
            onClick={() => onNavigate('elderly-care')}
        <div className="md:col-span-2">
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
          <Button variant="outline" onClick={() => onNavigate('girl-education')}>Read More</Button>
            {getText('causeGirlBody','Our focus is specifically on <strong>street girls</strong>—the most invisible demographic in urban India. We believe education is the only tool that can break the cycle of poverty for them.')}
      </div>
    </PageSection>
            <div className="bg-white p-6 rounded-xl border transition-colors" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>{getText('causeGirlCard1Title','Hygiene & Dignity')}</h4>
    <PageSection bg="white" className="p-0">
      <div className="text-white" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="bg-white p-6 rounded-xl border transition-colors" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>{getText('causeGirlCard2Title','Vocational Skills')}</h4>
              <p className="text-sm text-gray-600">{getText('causeGirlCard2Body','Beyond basic literacy, we provide vocational training to ensure these girls can secure safe, dignified employment as they reach adulthood.')}</p>
            </div>
          </div>

              <Button variant="primary" className="bg-white text-[inherit]" style={{ color: COLORS.PRIMARY_DARK, backgroundColor: '#fff', borderColor: '#fff' }}>
                Nominate a Changemaker
              </Button>
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
        </div>
      </div>
    </PageSection>
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
                  