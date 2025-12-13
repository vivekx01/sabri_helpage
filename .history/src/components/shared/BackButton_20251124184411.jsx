import React from 'react';
import { ChevronRight } from 'lucide-react';
import { COLORS } from '../../constants/config';

const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition"
    style={{ color: COLORS.ACCENT_ORANGE }}
  >
    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
  </button>
);

export default BackButton;
