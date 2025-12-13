import PageHeader from '../components/layout/PageHeader';
import React from 'react';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import { COLORS } from '../constants/config';

// Static about page content
const ABOUT_CONTENT = {
  sections: [
    { type: 'paragraph', text: 'Sabri Helpage was founded in 2013 and is based in Kolkata, India. Its simple goal is to bring dignity, care, and emotional support to communities that are often ignored. Over time, it has become a caring social project that focuses on three main areas: mental health, caring for the elderly, and educating girls.' },
    { type: 'paragraph', text: "Sabri Helpage works at the grassroots level, helping families in need and villages that are hard to reach where there isn't much information or help. Sabri Helpage keeps making a difference by running counselling camps, programs for emotional well-being, help for seniors, and programs that promote education and empowerment for young girls." },
    { type: 'paragraph', text: 'What started as a sincere effort has now become a dependable source of support for many. Sabri Helpage is dedicated to making society more knowledgeable, emotionally strong, and welcoming, one life at a time.' }
  ],
  governingBody: [
    {
      name: 'Aarti BR Singh',
      paragraphs: [
        'Aarti BR Singh, the visionary Founder of Sabri Helpage, is a caring social leader whose work has changed the lives of many people in India. She started Sabri Helpage in 2013 because she cared deeply about the well-being of her community. She believed that everyone, no matter their age, background, or situation, deserves emotional support, respect, and hope.',
        "Aarti's journey has been fuelled by her concern for three important areas that society often ignores: mental health, elderly care, and girl child education. Sabri Helpage has become a trusted and respected initiative under her leadership. It helps vulnerable communities, especially in areas that don't get enough attention and don't have easy access to services.",
        'Her caring attitude, hands-on work, and ability to connect with people from all walks of life have helped shape the organization\'s identity. People know Aarti BR Singh for her commitment to making society more emotionally strong and welcoming. Her work continues to inspire many people who want to make a difference in the world.'
      ]
    },
    {
      name: 'Yash Guptaa',
      paragraphs: [
        'Yash Guptaa is a young philanthropist who makes a difference in the world. His work for the greater good shows both compassion and purpose. He believes strongly in giving back to society, so he has worked to support causes that make a real difference in the lives of vulnerable communities over time.',
        "Yash's giving is based on feeling for others, taking responsibility, and taking action. He thinks that real service isn't just giving money; it's also understanding the real problems on the ground and working towards long-term solutions. His focus extends across mental health awareness, education for underprivileged children, elderly support, and welfare initiatives that uplift marginalized groups.",
        'With a forward-looking mindset, Yash Guptaa actively collaborates with organizations and social changemakers to amplify impact. His commitment to humanitarian work reflects his core values - kindness, integrity, and the desire to build a more compassionate society. He continues to inspire others to join the journey of meaningful service by volunteering, supporting community programs, or speaking out for social causes.'
      ]
    },
    {
      name: 'Prerna Guptaa',
      paragraphs: [
        'Prerna Guptaa is a kind-hearted person who helps others because she cares about them and wants to make the world a better place. She is very aware of the problems that vulnerable communities face and has dedicated herself to supporting programs that promote dignity, opportunity, and mental health.',
        "Prerna's charitable work is more than just giving money; it's thoughtful, open to everyone, and based on real human connection. She thinks that the best way to make a difference is to understand what people have been through and meet their needs with care and respect. She supports education for girls, women's health, mental health, and community development. This shows that she believes that people who are empowered make societies that are empowered.",
        'Prerna Guptaa is known for being down-to-earth and strong. She always supports important causes by giving advice, resources, and hands-on help. Her presence gives people peace of mind and motivates them to do good deeds and be responsible members of society.',
        'She continues to improve people\'s lives and help make society more aware, welcoming, and caring through her kind leadership and deep commitment.'
      ]
    }
  ]
};

const AboutPage = ({ onNavigate }) => {
  const about = ABOUT_CONTENT;
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader title="About Us" subtitle="Our journey, mission, and the people behind Sabri Helpage" />

      <Section>
        <Container className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-5 text-lg leading-relaxed text-gray-700">
              {about.sections.map((section, index) => (
                <p key={index}>{section.text}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section bgColor="bg-gray-50">
        <Container>
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">Governing Body</h2>
            <div className="space-y-10">
              {about.governingBody.map((member, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{member.name}</h3>
                  {member.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AboutPage;
