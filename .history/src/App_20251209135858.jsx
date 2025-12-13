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
        <Route path="/about" element={<><Header /><AboutPage /><Footer /></>} />
        <Route path="/contact" element={<><Header /><ContactPage /><Footer /></>} />
        <Route path="/gallery" element={<><Header /><GalleryPage /><Footer /></>} />
        <Route path="/donate" element={<><Header /><DonatePage /><Footer /></>} />
        <Route path="/ilc" element={<><Header /><ILCPage /><Footer /></>} />
        <Route path="/sociofare" element={<><Header /><SociofarePage /><Footer /></>} />
        <Route path="/ourcauses" element={<><Header /><OurCausesLandingPage /><Footer /></>} />
        <Route path="/stories" element={<><Header /><StoriesPage /><Footer /></>} />
        <Route path="/events" element={<><Header /><EventsPage /><Footer /></>} />
        <Route path="/privacy" element={<><Header /><PrivacyPage /><Footer /></>} />
        <Route path="/terms" element={<><Header /><TermsPage /><Footer /></>} />
        <Route path="/faq" element={<><Header /><FAQPage /><Footer /></>} />
        <Route path="/publications" element={<><Header /><PublicationsPage /><Footer /></>} />
        <Route path="/csr" element={<><Header /><CSRSummitPage /><Footer /></>} />
        <Route path="/awards" element={<><Header /><AwardsPage /><Footer /></>} />
        <Route path="/blog" element={<><Header /><BlogPage /><Footer /></>} />
        <Route path="/mental-health" element={<><Header /><MentalHealthPage /><Footer /></>} />
        <Route path="/elderly-care" element={<><Header /><ElderlyCarePage /><Footer /></>} />
        <Route path="/girl-education" element={<><Header /><GirlEducationPage /><Footer /></>} />
        <Route path="/internship" element={<><Header /><InternshipPage /><Footer /></>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
