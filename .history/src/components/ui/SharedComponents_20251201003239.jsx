import React from 'react';
import { ChevronRight } from 'lucide-react';
import { COLORS, PAGE_TITLES } from '../../constants/config';

// ==================== SHARED COMPONENTS ====================
export const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center text-gray-900 ${className}`}>
    {children}
  </h2>
);

export const ResponsiveImage = ({ src, alt, className = "", fallbackText = "Image" }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    onError={(e) => { 
      e.target.onerror = null; 
      e.target.src = `https://placehold.co/600x400/333333/FFFFFF?text=${fallbackText}`;
    }}
  />
);

export const Breadcrumbs = ({ page, onNavigate }) => {
  if (page === 'home') return null;

  const title = PAGE_TITLES[page] || page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <div className="bg-gray-100 py-3 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
        <button 
          onClick={() => onNavigate('home')} 
          className="hover:text-orange-500 transition-colors font-medium"
          style={{ color: 'inherit' }}
        >
          Home
        </button>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-800 font-semibold" style={{ color: COLORS.ACCENT_ORANGE }}>
          {title}
        </span>
      </div>
    </div>
  );
};

export const YoutubeEmbed = ({ videoId, title }) => (
  <div className="space-y-3">
    {/* YouTube Video */}
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>

    {/* Watch on YouTube Button */}
    <a
      href="https://www.youtube.com/@sabrihelpage167"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-700 transition"
    >
      YouTube
    </a>
  </div>
);

export const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition"
    style={{ color: COLORS.ACCENT_ORANGE }}
  >
    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
  </button>
);

export const StatCard = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center text-white p-3 transform transition-all duration-300 hover:scale-110">
    <Icon className="w-8 h-8 mb-1 animate-pulse" />
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm font-medium text-white/90">{label}</div>
  </div>
);

export const FocusAreaCard = ({ icon: Icon, title, subtitle, iconColor }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border-b-4 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group">
    <div 
      className="p-4 rounded-full mb-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" 
      style={{ backgroundColor: iconColor.bg }}
    >
      <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" style={{ color: iconColor.fg }} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-orange-500" style={{ color: 'inherit' }}>
      {title}
    </h3>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export const FormInput = ({ id, label, type = 'text', value, onChange, required = false }) => (
  <div className="group">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-orange-500">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-gray-400"
      style={{ '--tw-ring-color': COLORS.ACCENT_ORANGE }}
    />
  </div>
);
