import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import TopBar from '../components/layout/TopBar';
import { IMAGE_URLS, COLORS } from '../constants/config';

const GirlEducationPage = ({ onNavigate }) => {

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
      <TopBar title="Girl Child Education" />
      <PageHeader title="Girl Child Education" subtitle="Education and empowerment" />
      <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button removed per request */}
        <ResponsiveImage 
          src={IMAGE_URLS.GIRL_EDUCATION}
          alt="Girl Child Empowerment"
          className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg"
          fallbackText="Girl+Child+Support"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Girl Child</h1>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed font-semibold">
          Sabri Helpage is committed to helping young girls who are having problems with their social, economic, or emotional lives. We think that every girl, no matter what her situation is, should have <strong>access to education, respect, and the chance to dream without limits</strong>.
        </p>

        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          We work with compassion and dedication to make sure that girls in need get the basic help they need to build a better and safer future.
        </p>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ color: COLORS.ACCENT_ORANGE }}>Our Main Goals for Girls in Need</h2>
        
        {/* Goal 1: Education */}
        <div className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: '#3B82F6', backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Helping Girls Get an Education 📚</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            At the centre of our mission is <strong>education</strong>. Sabri Helpage makes sure that girls in need get regular help with their schoolwork, the things they need for school, and advice that gives them the confidence to keep studying. We help them move towards a life full of <strong>opportunities and independence</strong> by giving them a stronger educational base.
          </p>
        </div>

        {/* Goal 2: Menstrual Hygiene/Sanitary Pads */}
        <div className="mb-10 p-6 rounded-xl border-l-4 shadow-md" style={{ borderColor: '#3B82F6', backgroundColor: COLORS.BG_LIGHT_GRAY }}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Help with Sanitary Pads Every Month 🩸</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            We give girls <strong>sanitary pads every month</strong> to make sure they are comfortable, clean, and able to go to school. This program helps them take care of their health with respect and keeps them from missing out on learning because they don't have the right tools, thereby maintaining <strong>dignity and consistent attendance</strong>.
          </p>
        </div>
        
        <p className="text-lg text-gray-700 mb-10 leading-relaxed italic">
          Sabri Helpage is shaping a hopeful and empowered future for girls in need through these focused programs. They give girls the <strong>support, stability, and encouragement</strong> they need to rise and thrive.
        </p>

        <div className="p-6 rounded-xl text-center shadow-lg" style={{ backgroundColor: COLORS.ACCENT_ORANGE }}>
          <h3 className="text-2xl font-bold mb-3 text-white">Sponsor a Girl's Future</h3>
          <p className="text-lg text-white mb-4">Your contribution can directly fund a girl's education and health supplies.</p>
          <button 
            onClick={() => onNavigate('donate')}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl hover:bg-gray-100"
          >
            Sponsor Now
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default GirlEducationPage;
