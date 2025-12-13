const OurCausesLandingPage = () => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="saffron-bg text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Our Causes</h1>
        <div className="flex space-x-6">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">About</button>
          <button className="hover:underline">Contact</button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold saffron-text mb-6">Our Causes</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore all the initiatives we support across India to create lasting social impact and build stronger communities.
        </p>
        <div className="h-1 w-24 saffron-bg mx-auto mt-6"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-orange-50 p-6 rounded-xl text-center">
          <div className="text-4xl font-bold saffron-text mb-2">50+</div>
          <div className="text-gray-700">Communities Served</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl text-center">
          <div className="text-4xl font-bold saffron-text mb-2">25K+</div>
          <div className="text-gray-700">Lives Impacted</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl text-center">
          <div className="text-4xl font-bold saffron-text mb-2">15+</div>
          <div className="text-gray-700">Active Programs</div>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold saffron-text mb-8 text-center">Our Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Community Development', icon: 'fas fa-hands-helping' },
            { title: 'Education & Youth', icon: 'fas fa-graduation-cap' },
            { title: 'Girl Child Empowerment', icon: 'fas fa-female' },
            { title: 'Health & Well-being', icon: 'fas fa-heartbeat' },
            { title: 'Skill Development', icon: 'fas fa-tools' },
            { title: 'Sustainability & Environment', icon: 'fas fa-leaf' },
            { title: 'Social Welfare', icon: 'fas fa-hand-holding-heart' },
            { title: 'Research & Innovation', icon: 'fas fa-flask' }
          ].map((area, idx) => (
            <div key={idx} className="bg-white border border-orange-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <i className={`${area.icon} text-3xl saffron-text mb-4`}></i>
              <h3 className="font-bold text-lg text-gray-800">{area.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Causes */}
      <div>
        <h2 className="text-3xl font-bold saffron-text mb-8 text-center">Featured Causes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Mental Health Awareness', 
              description: 'Providing mental health support and reducing stigma in communities.',
              progress: 75
            },
            { 
              title: 'Elderly Care Program', 
              description: 'Ensuring dignity and care for our senior citizens.',
              progress: 60
            },
            { 
              title: 'Girl Education Initiative', 
              description: 'Empowering girls through education and skill development.',
              progress: 85
            }
          ].map((cause, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100">
              <div className="h-48 bg-orange-200 flex items-center justify-center">
                <i className="fas fa-hands-helping text-5xl text-white"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{cause.title}</h3>
                <p className="text-gray-600 mb-4">{cause.description}</p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{cause.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="saffron-bg h-2 rounded-full" 
                      style={{ width: `${cause.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 saffron-bg text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                  Support This Cause
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);