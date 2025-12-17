import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Admin imports
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import api from './services/api.mjs';
import { useEffect } from 'react';
import { usePagesStore } from './stores/pageInformationSlice';

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
  const [isLoading, setIsLoading] = useState(false)
  const setPages = usePagesStore((state)=> state.setPages)
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
  const fetchPages = async () => {
    try {
      setIsLoading(true);
      const pages = await api.getPages();
      setPages(pages);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPages();
}, []);


  const renderPage = () => {
    if (isLoading) return <div>Loading Site Data...</div>
    try {
      switch (currentPage) {
        case 'home':
          return <HomePage onNavigate={handleNavigate} />;
        case 'about':
          return <AboutPage onNavigate={handleNavigate} />;
        case 'contact':
          return <ContactPage onNavigate={handleNavigate} />;
        case 'gallery':
          return <GalleryPage onNavigate={handleNavigate} />;
        case 'donate':
          return <DonatePage onNavigate={handleNavigate} />;
        case 'ilc':
          return <ILCPage onNavigate={handleNavigate} />;
        case 'sociofare':
          return <SociofarePage onNavigate={handleNavigate} />;
        case 'causes':
          return <OurCausesLandingPage onNavigate={handleNavigate} />;
        case 'stories':
          return <StoriesPage onNavigate={handleNavigate} />;
        case 'events':
          return <EventsPage onNavigate={handleNavigate} />;
        case 'privacy':
          return <PrivacyPage onNavigate={handleNavigate} />;
        case 'terms':
          return <TermsPage onNavigate={handleNavigate} />;
        case 'faq':
          return <FAQPage onNavigate={handleNavigate} />;
        case 'publications':
          return <PublicationsPage onNavigate={handleNavigate} />;
        case 'csr-summit':
          return <CSRSummitPage onNavigate={handleNavigate} />;
        case 'awards':
          return <AwardsPage onNavigate={handleNavigate} />;
        case 'blog':
          return <BlogPage onNavigate={handleNavigate} />;
        case 'mental-health':
          return <MentalHealthPage onNavigate={handleNavigate} />;
        case 'elderly-care':
          return <ElderlyCarePage onNavigate={handleNavigate} />;
        case 'girl-education':
          return <GirlEducationPage onNavigate={handleNavigate} />;
        case 'internship':
          return <InternshipPage onNavigate={handleNavigate} />;
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
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
                <Header onNavigate={handleNavigate} />
                <Breadcrumbs page={currentPage} onNavigate={handleNavigate} />
                <main className="flex-grow">{renderPage()}</main>
                <Footer onNavigate={handleNavigate} />
              </div>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
