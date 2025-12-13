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
    try {
      switch (currentPage) {
        case 'home':
          return <HomePage onNavigate={handleNavigate} />;
        default:
          return <HomePage onNavigate={handleNavigate} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We're having trouble loading this page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
        <div style={{padding: 20, background: '#eee', color: '#222', fontWeight: 'bold'}}>Hello World</div>
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
