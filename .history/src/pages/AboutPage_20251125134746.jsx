import React from 'react';
import { Heart, Globe, Users, Award, ArrowRight } from 'lucide-react';
import BackButton from '../components/shared/BackButton';
import { COLORS } from '../constants/config';

const AboutPage = ({ onNavigate }) => {
  const founders = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'With 25 years of experience in social development, Dr. Kumar founded Sabri Helpage to bridge gaps in healthcare and education.',
      image: 'https://placehold.co/150?text=Dr.+Rajesh'
    },
    {
      name: 'Ms. Priya Sharma',
      role: 'Co-Founder & COO',
      bio: 'A passionate advocate for mental health awareness, Priya leads our counseling and support programs across multiple cities.',
      image: 'https://placehold.co/150?text=Ms.+Priya'
    },
    {
      name: 'Mr. Amit Patel',
      role: 'Co-Founder & Head of Programs',
      bio: 'Amit brings expertise in community development and has directly impacted over 50,000 lives through innovative initiatives.',
      image: 'https://placehold.co/150?text=Mr.+Amit'
    }
  ];

  const commitments = [
    { icon: Heart, title: 'Compassion', description: 'We serve with empathy and respect for every individual' },
    { icon: Globe, title: 'Inclusivity', description: 'Ensuring no one is left behind in our mission' },
    { icon: Users, title: 'Community', description: 'Partnering with communities to drive sustainable change' },
    { icon: Award, title: 'Excellence', description: 'Maintaining highest standards in all our programs' }
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onClick={() => onNavigate('home')} />

        {/* About Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">About Sabri Helpage</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Founded with a vision to create positive social change, Sabri Helpage has been serving underprivileged communities for over a decade.</p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            What started as a small initiative by a group of passionate individuals has grown into a recognized non-profit organization working across mental health, elderly care, and girl child education. We believe that every individual deserves dignity, care, and opportunity.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, Sabri Helpage operates in 15 cities, has trained over 500 volunteers, and directly impacts thousands of lives every year. Our programs are designed to be sustainable, scalable, and community-centric.
          </p>
        </div>

        {/* Founders */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition duration-200">
                <img src={founder.image} alt={founder.name} className="h-32 w-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{founder.name}</h3>
                <p className="text-sm font-semibold text-orange-600 mb-4">{founder.role}</p>
                <p className="text-gray-600">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Commitments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition duration-200">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
                      <Icon className="h-8 w-8" style={{ color: COLORS.ACCENT_ORANGE }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{commitment.title}</h3>
                  <p className="text-gray-600">{commitment.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold mb-2">10+</div>
              <p className="text-sm">Years of Service</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">50K+</div>
              <p className="text-sm">Lives Impacted</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">500+</div>
              <p className="text-sm">Active Volunteers</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">15</div>
              <p className="text-sm">Cities Covered</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-gray-600 mb-8">Be part of a movement creating lasting social change.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('donate')}
              className="px-8 py-3 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center space-x-2"
              style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
            >
              <span>Donate Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate('ilc')}
              className="px-8 py-3 rounded-lg font-semibold border-2 transition duration-200"
              style={{ borderColor: COLORS.ACCENT_ORANGE, color: COLORS.ACCENT_ORANGE }}
            >
              Become SSIC Member
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
