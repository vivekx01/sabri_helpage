import React from 'react';
import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';
import PageSection from '../components/layout/PageSection';
import Button from '../components/ui/Button';

export default function AboutUsPage({ onNavigate }) {
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
            <p className="text-lg text-gray-700 mb-6">
              Founded with a vision to create lasting change, Sabri Helpage has been at the forefront of social welfare initiatives since our establishment. 
              Our journey began with a simple yet powerful idea: to build a more compassionate and equitable society.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.PRIMARY }}>Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To empower underprivileged communities through sustainable development programs in education, healthcare, and social welfare, 
                while fostering dignity, equality, and self-reliance.
              </p>
              <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.PRIMARY }}>Our Vision</h3>
              <p className="text-gray-700">
                We envision a society where every individual has access to basic necessities, quality education, and healthcare, 
                enabling them to lead a life of dignity and fulfillment.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: COLORS.PRIMARY_DARK }}>Our Impact</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1" style={{ color: COLORS.PRIMARY }}>10,000+</div>
                  <p className="text-gray-600">Lives Touched</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1" style={{ color: COLORS.PRIMARY }}>500+</div>
                  <p className="text-gray-600">Volunteers</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1" style={{ color: COLORS.PRIMARY }}>15+</div>
                  <p className="text-gray-600">Years of Service</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.PRIMARY_DARK }}>Our Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Compassion',
                  description: 'We approach every individual with empathy and understanding.'
                },
                {
                  title: 'Integrity',
                  description: 'We maintain the highest standards of honesty and ethical conduct.'
                },
                {
                  title: 'Innovation',
                  description: 'We embrace creative solutions to address social challenges.'
                },
                {
                  title: 'Inclusivity',
                  description: 'We celebrate diversity and ensure equal opportunities for all.'
                },
                {
                  title: 'Accountability',
                  description: 'We take responsibility for our actions and their impact.'
                },
                {
                  title: 'Sustainability',
                  description: 'We create lasting, positive change in communities.'
                }
              ].map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY }}>{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection bg="gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.PRIMARY_DARK }}>Join Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Be part of our journey to create meaningful change in communities. Your support can help us reach more lives and create lasting impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" onClick={() => onNavigate?.('donate')}>
              Donate Now
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('volunteer')}>
              Volunteer
            </Button>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
