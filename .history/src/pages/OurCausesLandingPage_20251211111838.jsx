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
    <section className="py-16 md:py-24 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Our Causes</h1>
          <p className="text-xl text-gray-600">Discover the areas where we're creating meaningful change</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <div className="h-32 bg-gradient-to-br from-orange-50 to-amber-50" />
              <div className="p-8">
                <div className="flex items-center justify-center h-14 w-14 rounded-lg mb-4 bg-[#FFF5F0] text-3xl">
                  {cause.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{cause.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{cause.description}</p>
                <button
                  onClick={() => {
                    if (index === 0) onNavigate('mental-health');
                    else if (index === 1) onNavigate('elderly-care');
                    else onNavigate('girl-education');
                  }}
                  className="inline-flex items-center space-x-2 font-semibold transition duration-200"
                  style={{ color: '#FF7A42' }}
                >
                  <span>Learn More</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default OurCausesLandingPage;
