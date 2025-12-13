import React from 'react';
import { COLORS, PAGE_TITLES } from '../../constants/config';

const PageLayout = ({ page, children, onNavigate }) => {
  const pageTitle = PAGE_TITLES[page?.toUpperCase?.()] || PAGE_TITLES[page] || 'Page';

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full flex justify-center mt-8 mb-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-6 max-w-2xl w-full flex items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-left flex-1" style={{ color: COLORS.ACCENT_ORANGE }}>{pageTitle}</h1>
        </div>
      </div>
      {/* Page Content */}
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10 max-w-3xl w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
