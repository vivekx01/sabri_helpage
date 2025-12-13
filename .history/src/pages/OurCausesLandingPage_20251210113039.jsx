import React, { useEffect, useState } from 'react';
import api from '../services/api.mjs';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const OurCausesLandingPage = ({ onNavigate }) => {
  const [causes, setCauses] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('causes').then((data) => {
      setCauses(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <PageHeader
        title={causes?.title || 'Our Causes'}
        subtitle={causes?.subtitle || 'Three focused missions driving our impact across communities'}
        eyebrow={causes?.eyebrow || 'What We Do'}
        variant="primary"
      />

      <PageSection bg="white">
        <div className="max-w-5xl mx-auto">
          {(causes?.sections || []).map((section, idx) => (
            <div key={idx} className="rounded-2xl shadow-lg p-8 md:p-10 text-center mb-8" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
              <div className="mb-6 flex justify-center"><Badge>{section.badge || 'Awareness'}</Badge></div>
              <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.PRIMARY_DARK }}>
                {section.title}
              </h2>
              <p className="font-medium italic mb-6" style={{ color: COLORS.PRIMARY }}>
                {section.subtitle}
              </p>
              <div className="space-y-4 text-lg leading-relaxed">
                {(section.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

// Removed all getText usage and static fallback content. Only backend data is used above.

      <PageSection bg="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="md:col-span-2">
            <div className="text-white rounded-2xl p-8" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
              <h2 className="text-3xl font-bold mb-4">The SocioFare Awards</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: COLORS.PRIMARY_PALE }}>
                A unique initiative by Sabri Helpage to shine a spotlight on excellence in social welfare. Celebrate those who dedicate their lives to helping others.
              </p>
              <Button variant="primary">Nominate a Changemaker</Button>
            </div>
          </div>
          <div>
            <div className="p-8 rounded-xl border" style={{ backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY_LIGHT }}>
              <h4 className="text-xl font-bold mb-6 text-white border-b pb-4" style={{ borderColor: COLORS.PRIMARY_LIGHT }}>Our Impact</h4>
              <div className="space-y-6 text-white">
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
      </PageSection>
    </div>
  );
};

export default OurCausesLandingPage;
                  