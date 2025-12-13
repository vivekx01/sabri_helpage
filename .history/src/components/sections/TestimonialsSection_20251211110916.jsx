import React from 'react';
import SectionTitle from '../SectionTitle';
// import removed: useConfig
import { COLORS } from '../../constants/config';

const TestimonialsSection = () => {
  // useConfig removed: use static testimonials
  const items = [
    {
      name: "Rohan Sharma",
      title: "Former Intern",
      quote: "The experience was life-changing. I loved the emphasis on elderly care and mental health.",
      initials: "RS",
      rating: 5
    },
    {
      name: "Priya Verma",
      title: "Donor",
      quote: "I'm proud to support an organization with such transparency and focus on girl child education.",
      initials: "PV",
      rating: 4.5
    },
    {
      name: "Dr. Alok Gupta",
      title: "Partner NGO",
      quote: "Our collaboration on mental health initiatives has been immensely successful and rewarding.",
      initials: "AG",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle title="Voices of Support" subtitle="Stories from our community" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, idx) => (
            <div key={idx} className="rounded-xl shadow-sm border p-6 bg-gray-50">
              <p className="text-gray-800 mb-4">“{t.quote}”</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                    {t.initials || (t.name || '?').split(' ').map(x => x[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    {t.title && <div className="text-sm text-gray-600">{t.title}</div>}
                  </div>
                </div>
                <div className="text-sm font-semibold" style={{ color: COLORS.ACCENT_ORANGE }}>
                  {t.rating ? `${t.rating}★` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
