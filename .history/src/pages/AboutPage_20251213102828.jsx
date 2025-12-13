import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';

const AboutPage = ({ onNavigate }) => {
  const teamMembers = [
    {
      name: 'Aarti BR Singh',
      role: 'Founder',
      description: 'Visionary leader and driving force behind Sabri Helpage, dedicated to social welfare and community development.',
      image: '/images/team/aarti.jpg'
    },
    {
      name: 'Md. Naushad',
      role: 'Co-Founder',
      description: 'Passionate about community service and expanding the reach of our programs to underserved areas.',
      image: '/images/team/naushad.jpg'
    },
    {
      name: 'Siraj Khan',
      role: 'Treasurer',
      description: 'Ensuring financial integrity and effective resource allocation for maximum community impact.',
      image: '/images/team/siraj.jpg'
    }
  ];

  const aboutContent = {
    sections: [
      { text: 'Sabri Helpage was founded in 2013 and is based in Kolkata, India. Our mission is to bring dignity, care, and emotional support to communities that are often ignored. Over time, we have grown into a comprehensive social initiative focusing on mental health awareness, elderly care, and girl child education.' },
      { text: 'We work at the grassroots level, helping families in need across hard-to-reach villages where access to information and support is limited. Through counseling camps, emotional well-being programs, elderly support initiatives, and educational empowerment programs, we strive to create lasting change in the communities we serve.' }
    ],
    governingBody: [
      {
        name: 'Aarti BR Singh',
        paragraphs: [
          'Aarti BR Singh, the visionary Founder of Sabri Helpage, is a caring social leader whose work has changed the lives of many people in India. She started Sabri Helpage in 2013 because she cared deeply about the well-being of her community.',
          'Aarti is known for her hands-on approach, often working directly with communities to understand their needs and find solutions. She believes in the power of education and emotional support to change lives and has made it her mission to make these available to everyone.'
        ]
      },
      {
        name: 'Md. Naushad',
        paragraphs: [
          'Md. Naushad is the Co-Founder and a key figure at Sabri Helpage. His journey in social work is deeply personal, driven by his own experiences and a strong desire to help those in need.',
          'With a background in community organization and social work, Naushad brings valuable expertise in program implementation and community engagement.'
        ]
      },
      {
        name: 'Siraj Khan',
        paragraphs: [
          'Siraj Khan serves as the Treasurer of Sabri Helpage, bringing financial expertise and strategic planning to the organization.',
          'His careful financial oversight has allowed Sabri Helpage to maintain transparency and accountability in all its operations.'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <PageHeader
        title="About Us"
        subtitle="Empowering communities through compassion and action"
        variant="primary"
      />

      <PageSection bg="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.PRIMARY_DARK }}>Our Story</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <div className="prose prose-lg max-w-4xl mx-auto">
              {aboutContent.sections.map((section, index) => (
                <p key={index} className="text-gray-700 mb-6">
                  {section.text}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: COLORS.PRIMARY_DARK }}>Our Team</h2>
            <div className="flex flex-col gap-10">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col md:flex-row items-center md:items-stretch">
                  <div className="w-full md:w-1/3 h-56 md:h-auto bg-gray-200 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${COLORS.PRIMARY.slice(1)}&color=fff&size=200`;
                      }}
                    />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>{member.name}</h3>
                    <p className="text-lg text-gray-500 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-700 text-base">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default AboutPage;
