// src/components/ui/CauseCard.jsx
import React from 'react';
import { Globe, Heart, Users } from 'lucide-react';
import { COLORS } from '../../constants/config';

// Map icon names to lucide-react components
const IconMap = {
    'Globe': Globe,
    'Heart': Heart,
    'Users': Users,
};

const CauseCard = ({ title, goal, raised, progress, description, icon, imageUrl, onReadMore, onDonate }) => {
    const Icon = IconMap[icon] || Globe;
    
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-xl flex flex-col hover:shadow-2xl transition duration-300 border-b-4 h-full`} style={{ borderBottomColor: COLORS.PRIMARY }}>
            <div className="relative mb-4">
                <img src={imageUrl} alt={title} className="rounded-xl w-full h-32 sm:h-40 object-cover" />
                <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 p-3 rounded-full shadow-lg border-4 border-white`} style={{ backgroundColor: COLORS.PRIMARY_DARK, color: COLORS.PRIMARY }}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="pt-6 flex flex-col flex-grow">
                <h3 className={`text-xl font-bold text-gray-900 mb-2 text-center`}>{title}</h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow text-center">{description}</p>
                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Goal: ${goal.toLocaleString()}</span>
                    <span className={`font-bold text-gray-900`}>Raised: ${raised.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full`} style={{ width: `${progress}%`, backgroundColor: COLORS.PRIMARY }}></div>
                </div>
                <div className="flex space-x-3 mt-6">
                    <button onClick={onReadMore} className={`flex-1 text-white px-4 py-3 rounded-full font-bold text-sm text-center transition duration-300 shadow-md`} style={{ backgroundColor: COLORS.PRIMARY }}>
                        Read More
                    </button>
                    <button onClick={onDonate} className={`flex-1 text-white px-4 py-3 rounded-full font-bold text-sm text-center transition duration-300 shadow-md`} style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CauseCard;