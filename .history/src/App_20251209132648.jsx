import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo here if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: 32 }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/ilc" element={<ILCPage />} />
        <Route path="/sociofare" element={<SociofarePage />} />
        <Route path="/ourcauses" element={<OurCausesLandingPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/csr" element={<CSRSummitPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/mental-health" element={<MentalHealthPage />} />
        <Route path="/elderly-care" element={<ElderlyCarePage />} />
        <Route path="/girl-education" element={<GirlEducationPage />} />
        <Route path="/internship" element={<InternshipPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
