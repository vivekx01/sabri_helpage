import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      message: 'This organization has made a real difference in our community.',
      role: 'Volunteer',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'I am grateful for the support provided to the elderly.',
      role: 'Beneficiary',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Testimonials</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.message}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
