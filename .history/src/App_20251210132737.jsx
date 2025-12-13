import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import NotFoundPage from './pages/NotFoundPage';



// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current page from the URL
  const currentPage = location.pathname.split('/')[1] || 'home';

  const handleNavigate = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      <ScrollToTop />
      <Header onNavigate={handleNavigate} />
      <Breadcrumbs page={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {/* ErrorBoundary removed */}
          <Routes>
            <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
            <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
            <Route path="/gallery" element={<GalleryPage onNavigate={handleNavigate} />} />
            <Route path="/donate" element={<DonatePage onNavigate={handleNavigate} />} />
            <Route path="/ilc" element={<ILCPage onNavigate={handleNavigate} />} />
            <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
            <Route path="/sociofare" element={<SociofarePage onNavigate={handleNavigate} />} />
            <Route path="/ourcauses" element={<OurCausesLandingPage onNavigate={handleNavigate} />} />
            <Route path="/stories" element={<StoriesPage onNavigate={handleNavigate} />} />
            <Route path="/events" element={<EventsPage onNavigate={handleNavigate} />} />
            <Route path="/privacy" element={<PrivacyPage onNavigate={handleNavigate} />} />
            <Route path="/terms" element={<TermsPage onNavigate={handleNavigate} />} />
            <Route path="/faq" element={<FAQPage onNavigate={handleNavigate} />} />
            <Route path="/publications" element={<PublicationsPage onNavigate={handleNavigate} />} />
            <Route path="/csr" element={<CSRSummitPage onNavigate={handleNavigate} />} />
            <Route path="/awards" element={<AwardsPage onNavigate={handleNavigate} />} />
            <Route path="/blog" element={<BlogPage onNavigate={handleNavigate} />} />
            <Route path="/mental-health" element={<MentalHealthPage onNavigate={handleNavigate} />} />
            <Route path="/elderly-care" element={<ElderlyCarePage onNavigate={handleNavigate} />} />
            <Route path="/girl-education" element={<GirlEducationPage onNavigate={handleNavigate} />} />
            <Route path="/internship" element={<InternshipPage onNavigate={handleNavigate} />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFoundPage onNavigate={handleNavigate} />} />
          </Routes>
        {/* ErrorBoundary removed */}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
