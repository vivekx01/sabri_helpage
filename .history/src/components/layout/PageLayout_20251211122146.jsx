import React from 'react';
import { COLORS, PAGE_TITLES } from '../../constants/config';

const PageLayout = ({ page, children, onNavigate }) => {
  const pageTitle = PAGE_TITLES[page] || 'Page';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: COLORS.ACCENT_ORANGE }}
            >
              {pageTitle}
            </h1>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: COLORS.ACCENT_ORANGE }}
            ></div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
