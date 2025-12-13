import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { IMAGE_URLS, COLORS } from '../constants/config';


const ElderlyCarePage = ({ onNavigate }) => {
  // Static fallback content for Elderly Care page
  const cause = {
    title: 'Elderly Care',
    subtitle: 'Dignity and support for seniors',
    bannerImage: IMAGE_URLS.ELDERLY_CARE,
    contentBlocks: [
      { type: 'paragraph', text: 'Sabri Helpage is a caring support system for older people, reaching out to those who are often ignored and unheard. It was started with the idea that every older person deserves care, respect, and emotional security. We work hard to improve the quality of life for these people. We make sure that age never gets in the way of health, comfort, or hope by providing thoughtful help and caring service.' },
      { type: 'paragraph', text: 'Sabri Helpage has created a support system that touches on every important part of the lives of seniors because we understand the problems they face, such as health issues, limited mobility, loneliness, and money problems. Our programs are more than just services; we are acts of kindness, respect, and humanity.' },
      { type: 'heading', level: 2, text: 'The Most Important Services We Offer to Seniors' },
      { type: 'paragraph', text: 'Regular eye exams, early detection of vision problems, and full support for needed surgeries all help seniors get their vision back, feel more confident, and be more independent.' },
      { type: 'paragraph', text: 'Helping older people get the medicines they need to manage chronic illnesses, which will improve their daily lives and keep their health stable in the long term.' },
      { type: 'paragraph', text: 'Giving seniors balanced nutritional support to make sure they get the vitamins and minerals they need for strength, immunity, and general health.' },
      { type: 'paragraph', text: 'Sabri Helpage gives older people the tools they need to live with dignity, comfort, and a renewed sense of belonging through these important programs. Every life we touch is a sign of our commitment to creating a world where kindness is a way of life and where our elders are respected, supported, and loved.', italic: true },
      { type: 'cta', text: 'Support Our Elders', href: 'donate', label: 'Donate Now' },
    ]
  };

  const ResponsiveImage = ({ src, alt, className, fallbackText }) => (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/1200x600?text=' + fallbackText; }}
      />
    </div>
  );

  return (
    <section className="py-0 bg-white">
      <PageHeader title={cause?.title || 'Elderly Care'} subtitle={cause?.subtitle || 'Dignity and support for seniors'} />
      <div className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back button removed per request */}
        <ResponsiveImage 
          src={cause?.bannerImage || IMAGE_URLS.ELDERLY_CARE}
          alt="Elderly Care"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Elderly+Care"
        />
        {/* Dynamic content blocks from Admin */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{cause?.title || 'Elderly Care'}</h1>
        {(cause?.contentBlocks?.length ? cause.contentBlocks : [
          { type: 'paragraph', text: 'Sabri Helpage is a caring support system for older people, reaching out to those who are often ignored and unheard. It was started with the idea that every older person deserves care, respect, and emotional security. We work hard to improve the quality of life for these people. We make sure that age never gets in the way of health, comfort, or hope by providing thoughtful help and caring service.' },
          { type: 'paragraph', text: 'Sabri Helpage has created a support system that touches on every important part of the lives of seniors because we understand the problems they face, such as health issues, limited mobility, loneliness, and money problems. Our programs are more than just services; we are acts of kindness, respect, and humanity.' },
          { type: 'heading', level: 2, text: 'The Most Important Services We Offer to Seniors' },
          { type: 'paragraph', text: 'Regular eye exams, early detection of vision problems, and full support for needed surgeries all help seniors get their vision back, feel more confident, and be more independent.' },
          { type: 'paragraph', text: 'Helping older people get the medicines they need to manage chronic illnesses, which will improve their daily lives and keep their health stable in the long term.' },
          { type: 'paragraph', text: 'Giving seniors balanced nutritional support to make sure they get the vitamins and minerals they need for strength, immunity, and general health.' },
          { type: 'paragraph', text: 'Sabri Helpage gives older people the tools they need to live with dignity, comfort, and a renewed sense of belonging through these important programs. Every life we touch is a sign of our commitment to creating a world where kindness is a way of life and where our elders are respected, supported, and loved.', italic: true },
        ]).map((rawBlock, idx) => {
          const block = { ...rawBlock };
          if (typeof block.text === 'string') block.text = sanitizeText(block.text);
          if (Array.isArray(block.items)) block.items = sanitizeList(block.items);
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
              <ResponsiveImage key={idx} src={block.imageUrl} alt={block.altText || 'Image'} className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" fallbackText="Elderly+Care" />
            );
          }
          if (block.type === 'cta') {
            return (
              <div key={idx} className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                <h3 className="text-2xl font-bold mb-3 text-white">{block.text || 'Support Our Elders'}</h3>
                <button onClick={() => onNavigate(block.href || 'donate')} className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100">
                  {block.label || 'Donate Now'}
                </button>
              </div>
            );
          }
          return null;
        })}
        
        {!cause?.contentBlocks?.some(b => b.type === 'cta') && (
          <div className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
            <h3 className="text-2xl font-bold mb-3 text-white">Support Our Elders</h3>
            <p className="text-lg text-white mb-4">Your donation helps us provide essential care, medication, and companionship.</p>
            <button 
              onClick={() => onNavigate('donate')}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100"
            >
              Donate Now
            </button>
          </div>
        )}

      </div>
      </div>
    </section>
  );
};

export default ElderlyCarePage;


