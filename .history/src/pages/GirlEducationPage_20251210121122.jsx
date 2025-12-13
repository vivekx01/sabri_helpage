import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { COLORS } from '../constants/config';
import api from '../services/api.mjs';

const GirlEducationPage = () => {
  const [cause, setCause] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('girl-education').then((data) => {
      setCause(data);
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
      <PageHeader title={cause?.title || 'Girl Child Education'} subtitle={cause?.subtitle || 'Education and empowerment'} />
      <div className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <ResponsiveImage 
          src={cause?.bannerImage}
          alt="Girl Child Empowerment"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{cause?.title || 'Girl Child'}</h1>
        {(cause?.contentBlocks?.length ? cause.contentBlocks : []).map((block, idx) => {
          if (block.type === 'heading') {
            const Tag = block.level === 1 ? 'h1' : block.level === 2 ? 'h2' : 'h3';
            return (
              <Tag key={idx} className={block.level === 2 ? 'text-3xl font-bold text-gray-800 mb-6' : 'text-2xl font-bold text-gray-800 mb-4'} style={block.level === 2 ? { color: COLORS.ACCENT_ORANGE } : undefined}>
                {block.text}
              </Tag>
            );
          }
          if (block.type === 'paragraph') {
            return (
              <p key={idx} className={`text-lg text-gray-700 mb-6 leading-relaxed${block.italic ? ' italic' : ''}`}>{block.text}</p>
            );
          }
          if (block.type === 'list' && Array.isArray(block.items)) {
            return (
              <ul key={idx} className="list-disc pl-6 text-gray-700 mb-6">
                {block.items.map((item, i) => (<li key={i} className="mb-2">{item}</li>))}
              </ul>
            );
          }
          if (block.type === 'image') {
            return (
              <ResponsiveImage key={idx} src={block.imageUrl} alt={block.altText || 'Image'} className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" />
            );
          }
          if (block.type === 'cta') {
            return (
              <div key={idx} className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                <h3 className="text-2xl font-bold mb-3 text-white">{block.text || "Sponsor a Girl's Future"}</h3>
                <a href={block.href || 'donate'} className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100">
                  {block.label || 'Sponsor Now'}
                </a>
              </div>
            );
          }
          return null;
        })}
      </div>
      </div>
    </section>
  );
};

export default GirlEducationPage;
