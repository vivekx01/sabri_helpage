import React from 'react';
import { IMAGE_URLS, COLORS } from '../constants/config';
const GirlEducationPage = ({ onNavigate }) => {
  // Static fallback for cause data
  const cause = {
    title: 'Girl Child Education',
    subtitle: 'Education and empowerment',
    bannerImage: IMAGE_URLS.GIRL_EDUCATION,
    contentBlocks: [
      { type: 'paragraph', text: 'Sabri Helpage is committed to helping young girls who are having problems with their social, economic, or emotional lives. We think that every girl, no matter what her situation is, should have access to education, respect, and the chance to dream without limits.' },
      { type: 'paragraph', text: 'We work with compassion and dedication to make sure that girls in need get the basic help they need to build a better and safer future.' },
      { type: 'heading', level: 2, text: 'Our Main Goals for Girls in Need' },
      { type: 'list', items: ['Helping Girls Get an Education', 'Monthly sanitary pad support'] },
      { type: 'cta', text: "Sponsor a Girl's Future", href: 'donate', label: 'Sponsor Now' },
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
      <div className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back button removed per request */}
        <ResponsiveImage 
          src={cause?.bannerImage || IMAGE_URLS.GIRL_EDUCATION}
          alt="Girl Child Empowerment"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Girl+Child+Support"
        />
        {/* Dynamic content blocks from Admin */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{cause?.title || 'Girl Child'}</h1>
        {(cause?.contentBlocks?.length ? cause.contentBlocks : [
          { type: 'paragraph', text: 'Sabri Helpage is committed to helping young girls who are having problems with their social, economic, or emotional lives. We think that every girl, no matter what her situation is, should have access to education, respect, and the chance to dream without limits.' },
          { type: 'paragraph', text: 'We work with compassion and dedication to make sure that girls in need get the basic help they need to build a better and safer future.' },
          { type: 'heading', level: 2, text: 'Our Main Goals for Girls in Need' },
          { type: 'list', items: ['Helping Girls Get an Education', 'Monthly sanitary pad support'] },
          { type: 'cta', text: "Sponsor a Girl's Future", href: 'donate', label: 'Sponsor Now' },
        ]).map((rawBlock, idx) => {
          const block = { ...rawBlock };

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
              <ResponsiveImage key={idx} src={block.imageUrl} alt={block.altText || 'Image'} className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" fallbackText="Girl+Child+Support" />
            );
          }
          if (block.type === 'cta') {
            return (
              <div key={idx} className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
                <h3 className="text-2xl font-bold mb-3 text-white">{block.text || "Sponsor a Girl's Future"}</h3>
                <button onClick={() => onNavigate(block.href || 'donate')} className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100">
                  {block.label || 'Sponsor Now'}
                </button>
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