import PageHeader from '../components/layout/PageHeader';
import React from 'react';

const OurCausesLandingPage = ({ onNavigate }) => {
  const BackButton = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="flex items-center text-sm font-semibold mb-8 hover:text-gray-700 transition-all duration-300 hover:translate-x-[-4px] group"
      style={{ color: '#FF7A42' }}
    >
      <svg className="w-5 h-5 rotate-180 mr-1 transition-transform duration-300 group-hover:translate-x-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      Back
    </button>
  );

  const causes = [
    {
      title: 'Mental Health Support',
      description: 'Breaking the stigma around mental health through counseling, awareness, and support groups.',
      icon: '❤️'
    },
    {
      title: 'Elderly Care',
      description: 'Providing compassionate care, medical support, and social engagement for senior citizens.',
      icon: '🤝'
    },
    {
      title: 'Girl Child Education',
      description: 'Empowering girls through scholarships, mentorship, and life skills training.',
      icon: '📚'
    }
  ];


  return (
    <section className="py-0 md:py-24 bg-[#FFF8F0] flex justify-center">
      <PageHeader title="Our Causes" subtitle="Discover the areas where we're creating meaningful change" />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
        <BackButton onClick={() => onNavigate('home')} />

        {/* Causes Boxes */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-[#FFE4D6] flex flex-col items-center p-8 transition duration-300 hover:shadow-2xl">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl mb-6 bg-[#FFF5F0] text-4xl shadow-sm">
                {cause.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{cause.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-center">{cause.description}</p>
              <button
                onClick={() => {
                  if (index === 0) onNavigate('mental-health');
                  else if (index === 1) onNavigate('elderly-care');
                  else onNavigate('girl-education');
                }}
                className="inline-flex items-center space-x-2 font-semibold transition duration-200 px-5 py-2 rounded-full bg-[#FFF8F0] hover:bg-[#FF7A42]/10 text-[#FF7A42] border border-[#FF7A42]"
              >
                <span>Learn More</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default OurCausesLandingPage;
