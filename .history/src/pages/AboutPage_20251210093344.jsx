
import React, { useEffect, useState } from 'react';
import api from '../services/api.mjs';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('about').then((data) => {
      setAbout(data);
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
    <section className="py-0 bg-white">
      <PageHeader title={about?.title || 'About'} subtitle={about?.subtitle || 'Founding, purpose and governing body'} eyebrow={about?.eyebrow} />
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-10 text-gray-800">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.PRIMARY_DARK }}>{about?.title || 'About'}</h2>
            <div className="space-y-5 text-lg leading-relaxed">
              {(about?.sections || []).map((blk, i) => (
                <p key={i}>{blk.text}</p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.PRIMARY_DARK }}>Governing Body</h2>
            <div className="space-y-10">
              {(about?.sectionsGoverning || []).map((s, i) => (
                <div key={i}>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>{s.name}</h3>
                  {s.paragraphs?.map((p, j) => (
                    <p key={j} className="leading-relaxed text-gray-700 mt-4">{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
