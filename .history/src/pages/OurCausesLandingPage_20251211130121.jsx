const OurCausesLandingPage = () => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#FF7F50] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Our Causes</h1>
        <div className="flex space-x-6">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">About</button>
          <button className="hover:underline">Contact</button>
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-[#FF7F50] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Causes</h1>
        <p className="text-xl text-[#FFE4D6] max-w-3xl mx-auto">
          Explore all the initiatives we support across India to create lasting social impact and build stronger communities.
        </p>
        <div className="h-1 w-24 bg-white mx-auto mt-8 opacity-50"></div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16 -mt-10">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { number: "50+", label: "Communities Served", icon: "fas fa-users" },
          { number: "25K+", label: "Lives Impacted", icon: "fas fa-heart" },
          { number: "15+", label: "Active Programs", icon: "fas fa-chart-line" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-[#FFE4D6] text-center hover:shadow-xl transition-shadow">
            <i className={`${stat.icon} text-4xl text-[#FF7F50] mb-4`}></i>
            <div className="text-4xl font-bold text-[#FF7F50] mb-2">{stat.number}</div>
            <div className="text-gray-700 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Focus Areas */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#FF7F50] mb-4">Our Focus Areas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to creating sustainable change across critical sectors that impact society
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Community Development', icon: 'fas fa-hands-helping', color: 'bg-[#FF7F50]' },
            { title: 'Education & Youth', icon: 'fas fa-graduation-cap', color: 'bg-[#E67347]' },
            { title: 'Girl Child Empowerment', icon: 'fas fa-female', color: 'bg-[#FF7F50]' },
            { title: 'Health & Well-being', icon: 'fas fa-heartbeat', color: 'bg-[#E67347]' },
            { title: 'Skill Development', icon: 'fas fa-tools', color: 'bg-[#FF7F50]' },
            { title: 'Sustainability & Environment', icon: 'fas fa-leaf', color: 'bg-[#E67347]' },
            { title: 'Social Welfare', icon: 'fas fa-hand-holding-heart', color: 'bg-[#FF7F50]' },
            { title: 'Research & Innovation', icon: 'fas fa-flask', color: 'bg-[#E67347]' }
          ].map((area, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#FFE4D6] group cursor-pointer">
              <div className={`${area.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${area.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-[#FF7F50] transition-colors">{area.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Causes */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#FF7F50] mb-4">Featured Causes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support our ongoing initiatives that are making a real difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Mental Health Awareness', 
              description: 'Providing mental health support and reducing stigma in communities.',
              progress: 75,
              icon: 'fas fa-brain'
            },
            { 
              title: 'Elderly Care Program', 
              description: 'Ensuring dignity and care for our senior citizens.',
              progress: 60,
              icon: 'fas fa-wheelchair'
            },
            { 
              title: 'Girl Education Initiative', 
              description: 'Empowering girls through education and skill development.',
              progress: 85,
              icon: 'fas fa-graduation-cap'
            }
          ].map((cause, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#FFE4D6] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-[#FF7F50] to-[#E67347] flex items-center justify-center relative overflow-hidden">
                <i className={`${cause.icon} text-6xl text-white opacity-20 absolute top-4 right-4`}></i>
                <i className={`${cause.icon} text-4xl text-white z-10`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{cause.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{cause.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Campaign Progress</span>
                    <span className="font-semibold text-[#FF7F50]">{cause.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF7F50] h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${cause.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-[#FF7F50] text-white font-semibold rounded-lg hover:bg-[#E67347] transition-colors flex items-center justify-center gap-2">
                  <i className="fas fa-hand-holding-heart"></i>
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