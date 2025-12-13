// src/components/ui/NewsCard.jsx
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { COLORS } from '../../constants/config';

const NewsCard = ({ image, title, description, date }) => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {date}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-700 mb-4">{description}</p>
            <a href="#" className={`font-semibold transition duration-300`} style={{ color: COLORS.PRIMARY }}>
                Read More <ArrowRight className="w-4 h-4 inline ml-1" />
            </a>
        </div>
    </div>
);

export default NewsCard;