'use client';

import React, { useState } from 'react';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import Breadcrumbs from '../src/components/shared/Breadcrumbs';

import HomePage from '../src/pages/HomePage';
import ContactPage from '../src/pages/ContactPage';
import GalleryPage from '../src/pages/GalleryPage';
import DonatePage from '../src/pages/DonatePage';
import ILCPage from '../src/pages/ILCPage';
import AboutPage from '../src/pages/AboutPage';
import SociofarePage from '../src/pages/SociofarePage';
import OurCausesLandingPage from '../src/pages/OurCausesLandingPage';
import StoriesPage from '../src/pages/StoriesPage';
import EventsPage from '../src/pages/EventsPage';
import PrivacyPage from '../src/pages/PrivacyPage';
import FAQPage from '../src/pages/FAQPage';
import PublicationsPage from '../src/pages/PublicationsPage';
import CSRSummitPage from '../src/pages/CSRSummitPage';
import AwardsPage from '../src/pages/AwardsPage';
import BlogPage from '../src/pages/BlogPage';
import MentalHealthPage from '../src/pages/MentalHealthPage';
import ElderlyCarePage from '../src/pages/ElderlyCarePage';
import GirlEducationPage from '../src/pages/GirlEducationPage';
import InternshipPage from '../src/pages/InternshipPage';
import TermsPage from '../src/pages/TermsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'contact': return <ContactPage onNavigate={handleNavigate} />;
      case 'gallery': return <GalleryPage onNavigate={handleNavigate} />;
      case 'donate': return <DonatePage onNavigate={handleNavigate} />;
      case 'ilc': return <ILCPage onNavigate={handleNavigate} />;
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
      case 'sociofare': return <SociofarePage onNavigate={handleNavigate} />;
      case 'ourcauses': return <OurCausesLandingPage onNavigate={handleNavigate} />;
      case 'stories': return <StoriesPage onNavigate={handleNavigate} />;
      case 'events': return <EventsPage onNavigate={handleNavigate} />;
      case 'privacy': return <PrivacyPage onNavigate={handleNavigate} />;
      case 'faq': return <FAQPage onNavigate={handleNavigate} />;
      case 'publications': return <PublicationsPage onNavigate={handleNavigate} />;
      case 'csr': return <CSRSummitPage onNavigate={handleNavigate} />;
      case 'awards': return <AwardsPage onNavigate={handleNavigate} />;
      case 'blog': return <BlogPage onNavigate={handleNavigate} />;
      case 'mental-health': return <MentalHealthPage onNavigate={handleNavigate} />;
      case 'elderly-care': return <ElderlyCarePage onNavigate={handleNavigate} />;
      case 'girl-education': return <GirlEducationPage onNavigate={handleNavigate} />;
      case 'internship': return <InternshipPage onNavigate={handleNavigate} />;
      case 'terms': return <TermsPage onNavigate={handleNavigate} />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      <Header onNavigate={handleNavigate} />
      <Breadcrumbs page={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
