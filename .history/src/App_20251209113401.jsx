import React, { useMemo, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Breadcrumbs from './components/shared/Breadcrumbs';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import DonatePage from './pages/DonatePage';
import ILCPage from './pages/ILCPage';
import AboutPage from './pages/AboutPage';
import SociofarePage from './pages/SociofarePage';
import OurCausesLandingPage from './pages/OurCausesLandingPage';
import StoriesPage from './pages/StoriesPage';
import EventsPage from './pages/EventsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import PublicationsPage from './pages/PublicationsPage';
import CSRSummitPage from './pages/CSRSummitPage';
import AwardsPage from './pages/AwardsPage';
import BlogPage from './pages/BlogPage';
import MentalHealthPage from './pages/MentalHealthPage';
import ElderlyCarePage from './pages/ElderlyCarePage';
import GirlEducationPage from './pages/GirlEducationPage';
import InternshipPage from './pages/InternshipPage';
import AdminJSPanel from './components/AdminJSPanel';
import AdminLogin from './components/AdminLogin';

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
      case 'terms': return <TermsPage onNavigate={handleNavigate} />;
      case 'faq': return <FAQPage onNavigate={handleNavigate} />;
      case 'publications': return <PublicationsPage onNavigate={handleNavigate} />;
      case 'csr': return <CSRSummitPage onNavigate={handleNavigate} />;
      case 'awards': return <AwardsPage onNavigate={handleNavigate} />;
      case 'blog': return <BlogPage onNavigate={handleNavigate} />;
      case 'mental-health': return <MentalHealthPage onNavigate={handleNavigate} />;
      case 'elderly-care': return <ElderlyCarePage onNavigate={handleNavigate} />;
      case 'girl-education': return <GirlEducationPage onNavigate={handleNavigate} />;
      case 'internship': return <InternshipPage onNavigate={handleNavigate} />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminRoute = useMemo(() => typeof window !== 'undefined' && window.location && window.location.pathname === '/admin', []);
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('adminToken');
  const [adminUser, setAdminUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('adminUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  });

  if (isAdminRoute) {
    // Optionally, you can add authentication here if needed
    return (
      <div className="min-h-screen">
        <AdminJSPanel />
      </div>
    );
  }

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
