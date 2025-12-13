import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageLayout from './components/layout/PageLayout';
import Breadcrumbs from './components/shared/Breadcrumbs';

// Page imports
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh or contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'contact': return <PageLayout page={currentPage} onNavigate={handleNavigate}><ContactPage onNavigate={handleNavigate} /></PageLayout>;
      case 'gallery': return <PageLayout page={currentPage} onNavigate={handleNavigate}><GalleryPage onNavigate={handleNavigate} /></PageLayout>;
      case 'donate': return <PageLayout page={currentPage} onNavigate={handleNavigate}><DonatePage onNavigate={handleNavigate} /></PageLayout>;
      case 'ilc': return <PageLayout page={currentPage} onNavigate={handleNavigate}><ILCPage onNavigate={handleNavigate} /></PageLayout>;
      case 'about': return <PageLayout page={currentPage} onNavigate={handleNavigate}><AboutPage onNavigate={handleNavigate} /></PageLayout>;
      case 'sociofare': return <PageLayout page={currentPage} onNavigate={handleNavigate}><SociofarePage onNavigate={handleNavigate} /></PageLayout>;
      case 'ourcauses': return <PageLayout page={currentPage} onNavigate={handleNavigate}><OurCausesLandingPage onNavigate={handleNavigate} /></PageLayout>;
      case 'stories': return <PageLayout page={currentPage} onNavigate={handleNavigate}><StoriesPage onNavigate={handleNavigate} /></PageLayout>;
      case 'events': return <PageLayout page={currentPage} onNavigate={handleNavigate}><EventsPage onNavigate={handleNavigate} /></PageLayout>;
      case 'privacy': return <PageLayout page={currentPage} onNavigate={handleNavigate}><PrivacyPage onNavigate={handleNavigate} /></PageLayout>;
      case 'terms': return <PageLayout page={currentPage} onNavigate={handleNavigate}><TermsPage onNavigate={handleNavigate} /></PageLayout>;
      case 'faq': return <PageLayout page={currentPage} onNavigate={handleNavigate}><FAQPage onNavigate={handleNavigate} /></PageLayout>;
      case 'publications': return <PageLayout page={currentPage} onNavigate={handleNavigate}><PublicationsPage onNavigate={handleNavigate} /></PageLayout>;
      case 'csr': return <PageLayout page={currentPage} onNavigate={handleNavigate}><CSRSummitPage onNavigate={handleNavigate} /></PageLayout>;
      case 'awards': return <PageLayout page={currentPage} onNavigate={handleNavigate}><AwardsPage onNavigate={handleNavigate} /></PageLayout>;
      case 'blog': return <PageLayout page={currentPage} onNavigate={handleNavigate}><BlogPage onNavigate={handleNavigate} /></PageLayout>;
      case 'mental-health': return <PageLayout page={currentPage} onNavigate={handleNavigate}><MentalHealthPage onNavigate={handleNavigate} /></PageLayout>;
      case 'elderly-care': return <PageLayout page={currentPage} onNavigate={handleNavigate}><ElderlyCarePage onNavigate={handleNavigate} /></PageLayout>;
      case 'girl-education': return <PageLayout page={currentPage} onNavigate={handleNavigate}><GirlEducationPage onNavigate={handleNavigate} /></PageLayout>;
      case 'internship': return <PageLayout page={currentPage} onNavigate={handleNavigate}><InternshipPage onNavigate={handleNavigate} /></PageLayout>;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
        <Header onNavigate={handleNavigate} />
        <Breadcrumbs page={currentPage} onNavigate={handleNavigate} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
