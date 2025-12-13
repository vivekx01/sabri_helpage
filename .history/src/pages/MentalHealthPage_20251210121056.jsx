import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { COLORS } from '../constants/config';
import api from '../services/api.mjs';

const MentalHealthPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('mental-health').then((data) => {
      setContent(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const ResponsiveImage = ({ src, alt, className }) => (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );

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
      <PageHeader title={content?.title || 'Mental Health'} subtitle={content?.subtitle || 'Awareness, support, and care'} eyebrow={content?.eyebrow} />
      <div className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <ResponsiveImage 
          src={content?.bannerImage}
          alt="Mental Health Support"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{content?.title || 'Mental Health'}</h1>
        {(content?.contentBlocks?.length ? content.contentBlocks : []).map((blk, i) => {
          if (blk.type === 'heading') return (<h2 key={i} className="text-3xl font-bold text-gray-800 mb-6" style={{ color: COLORS.ACCENT_ORANGE }}>{blk.text}</h2>);
          if (blk.type === 'paragraph') return (<p key={i} className="text-lg text-gray-700 mb-8 leading-relaxed">{blk.text}</p>);
          if (blk.type === 'list') return (
            <div key={i} className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{blk.text}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                {(blk.items || []).map((li, j) => (<li key={j}>{li}</li>))}
              </ul>
            </div>
          );
          return null;
        })}
        {/* Optionally, render additional sections if provided by backend */}
        {content?.extraSections?.map((section, idx) => (
          <div key={idx} className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: COLORS.ACCENT_ORANGE, backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{section.title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{section.text}</p>
          </div>
        ))}
        {content?.closingText && (
          <p className="text-lg text-gray-700 mb-10 leading-relaxed italic">
            {content.closingText}
          </p>
        )}
        <div className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
          <h3 className="text-2xl font-bold mb-3 text-white">Need Confidential Support?</h3>
          <p className="text-lg text-white mb-4">You are not alone. Reach out to our dedicated team today.</p>
          <a 
            href="mailto:info@sabrihelpage.org"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100"
          >
            Contact Our Team
          </a>
        </div>
      </div>
      </div>
    </section>
  );
};

export default MentalHealthPage;
