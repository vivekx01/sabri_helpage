import React from "react";

const PageHeader = ({ title, subtitle, eyebrow, variant = "primary" }) => {
  // Variant can be used for color theme, but default is centered box
  return (
    <div className="w-full flex justify-center py-10">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg px-8 py-10 text-center border border-gray-100">
        {eyebrow && (
          <div className="text-xs font-bold uppercase tracking-widest mb-3 text-orange-500">{eyebrow}</div>
        )}
        {title && (
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">{title}</h1>
        )}
        {subtitle && (
          <p className="text-lg text-gray-600 mb-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
