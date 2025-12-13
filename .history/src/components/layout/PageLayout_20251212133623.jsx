// PageLayout.jsx
import React from 'react';
import { COLORS, PAGE_TITLES } from '../../constants/config';

const PageLayout = ({ page, children, onNavigate }) => {
  const pageTitle = PAGE_TITLES[page] || 'Page';

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header - Modern centered box with spacing */}
      <div className="py-16 md:py-24" style={{ backgroundColor: COLORS.PRIMARY }}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {pageTitle}
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full mt-6"
            style={{ backgroundColor: COLORS.PRIMARY_PALE }}
          ></div>
        </div>
      </div>

      {/* Page Content - Centered with spacing on both sides */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;