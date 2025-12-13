import React from 'react';
import { COLORS } from '../constants/config';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Fallback text values
const FALLBACK_TEXTS = {
  'causeMentalTitle': 'Mental Health Awareness',
  'causeMentalSubtitle': '"Breaking the silence"',
  'causeMentalBody': 'Mental health remains a taboo subject in many Indian households. Sabri Helpage is dedicated to de-stigmatizing mental illness through awareness campaigns and counseling support.',
  'causeMentalBody2': 'We organize workshops to help young people recognize the signs of depression and anxiety, fostering a generation that is not afraid to ask for help.',
  'causeElderlyTitle': 'Elderly Care & Dignity',
  'causeElderlyBody': 'We support abandoned seniors with medical camps, legal aid, and essential supplies, ensuring safety, dignity, and access to care.',
  'causeElderlyPoint1': 'Legal & Medical Support for seniors to claim their rights and receive geriatric care.',
  'causeElderlyPoint2': 'Community programs combating loneliness and promoting active, healthy living.',
  'causeGirlTitle': 'Girl Child & Education',
  'causeGirlBody': 'Our focus is on street girls—the most invisible demographic in urban India. Education is the tool to break the cycle of poverty.',
  'causeGirlCard1Title': 'Hygiene & Dignity',
  'causeGirlCard1Body': 'Menstrual hygiene kits and health education for adolescent girls.',
  'causeGirlCard2Title': 'Vocational Skills',
  'causeGirlCard2Body': 'Beyond literacy, we provide skills to secure safe, dignified employment.',
};

const getText = (key, fallback) => FALLBACK_TEXTS[key] || fallback;

const OurCausesLandingPage = ({ onNavigate = () => {} }) => {

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50">
      <Section>
        <Container>
          <div className="rounded-3xl shadow-lg p-8 md:p-10 text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE }}>
            <div className="mb-6 flex justify-center"><Badge>Awareness</Badge></div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.PRIMARY_DARK }}>
              {getText('causeMentalTitle', 'Mental Health Awareness')}
            </h2>
            <p className="font-medium italic mb-6" style={{ color: COLORS.PRIMARY }}>
              {getText('causeMentalSubtitle', '"Breaking the silence"')}
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {getText(
                'causeMentalBody',
                'Mental health remains a taboo subject in many Indian households. Sabri Helpage is dedicated to de-stigmatizing mental illness through awareness campaigns and counseling support.'
              )}
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {getText(
                'causeMentalBody2',
                'We organize workshops to help young people recognize the signs of depression and anxiety, fostering a generation that is not afraid to ask for help.'
              )}
            </p>
            <Button variant="outline" onClick={() => onNavigate?.('mental-health')}>
              Read More
            </Button>
          </div>
        </Container>
      </Section>

      <PageSection bg="white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl shadow-lg p-8 md:p-10 text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE, marginTop: '2rem' }}>
            <div className="mb-6 flex justify-center"><Badge tone="primary">Core Focus</Badge></div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.PRIMARY_DARK }}>
              {getText('causeElderlyTitle', 'Elderly Care & Dignity')}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {getText(
                'causeElderlyBody',
                'We support abandoned seniors with medical camps, legal aid, and essential supplies, ensuring safety, dignity, and access to care.'
              )}
            </p>
            <ul className="space-y-4 mb-8 text-left max-w-xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="mt-2 min-w-[6px] h-[6px] rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></span>
                <span className="text-gray-700">
                  {getText(
                    'causeElderlyPoint1',
                    'Legal & Medical Support for seniors to claim their rights and receive geriatric care.'
                  )}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 min-w-[6px] h-[6px] rounded-full" style={{ backgroundColor: COLORS.PRIMARY }}></span>
                <span className="text-gray-700">
                  {getText(
                    'causeElderlyPoint2',
                    'Community programs combating loneliness and promoting active, healthy living.'
                  )}
                </span>
              </li>
            </ul>
            <Button variant="outline" onClick={() => onNavigate?.('elderly-care')}>
              Read More
            </Button>
          </div>
        </div>
      </PageSection>

      <PageSection bg="white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl shadow-lg p-8 md:p-10 text-center" style={{ backgroundColor: COLORS.PRIMARY_PALE, marginTop: '2rem' }}>
            <div className="mb-6 flex justify-center"><Badge>Empowerment</Badge></div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.PRIMARY_DARK }}>
              {getText('causeGirlTitle', 'Girl Child & Education')}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {getText(
                'causeGirlBody',
                'Our focus is on street girls—the most invisible demographic in urban India. Education is the tool to break the cycle of poverty.'
              )}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="bg-white p-6 rounded-xl border shadow-sm" style={{ borderColor: COLORS.PRIMARY_PALE }}>
                <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>
                  {getText('causeGirlCard1Title', 'Hygiene & Dignity')}
                </h4>
                <p className="text-sm text-gray-600">
                  {getText('causeGirlCard1Body', 'Menstrual hygiene kits and health education for adolescent girls.')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border shadow-sm" style={{ borderColor: COLORS.PRIMARY_PALE }}>
                <h4 className="font-bold mb-2" style={{ color: COLORS.PRIMARY_DARK }}>
                  {getText('causeGirlCard2Title', 'Vocational Skills')}
                </h4>
                <p className="text-sm text-gray-600">
                  {getText('causeGirlCard2Body', 'Beyond literacy, we provide skills to secure safe, dignified employment.')}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => onNavigate?.('girl-education')}>
              Read More
            </Button>
          </div>
        </div>
      </PageSection>

    </div>
  );
};

export default OurCausesLandingPage;