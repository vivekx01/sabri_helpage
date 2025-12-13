// src/components/sections/StatsSection.jsx
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import StatBox from '../ui/StatBox';
import { COLORS, IMAGE_URLS, YOUTUBE_VIDEO_ID } from '../../constants/config';
import { useConfig } from '../../context/ConfigContext';

const StatsSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { config } = useConfig();
    const PRIMARY_DARK = COLORS.PRIMARY_DARK;
    const ACCENT_ORANGE = COLORS.ACCENT_ORANGE;
    const BG_LIGHT_GRAY = COLORS.BG_LIGHT_GRAY;
    const videoId = config?.primaryVideoId || YOUTUBE_VIDEO_ID;
    const thumb = config?.imageMap?.VIDEO_THUMBNAIL || IMAGE_URLS.WHAT_WE_STAND_FOR_1;
    
    return (
        <section className="py-20 md:py-36" style={{ backgroundColor: BG_LIGHT_GRAY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className={`p-8 md:p-14 rounded-2xl shadow-2xl h-auto md:h-80 flex flex-col justify-between`} style={{ backgroundColor: ACCENT_ORANGE }}>
                    <p className={`text-sm font-semibold uppercase tracking-wider mb-2`} style={{ color: PRIMARY_DARK }}>Our Milestones</p>
                    <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8`} style={{ color: PRIMARY_DARK }}>
                        We've Accomplished Much <br/> During This Span.
                    </h3>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <StatBox value="75.5K" label="Lives Touched" />
                        <StatBox value="34.2K" label="Volunteer Hours" />
                        <StatBox value="57.4" label="Global Events" />
                    </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80">
                    {isPlaying ? (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    ) : (
                        <>
                            <img src={thumb} alt="Volunteers helping community members" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                <button 
                                    className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white bg-opacity-90 transition duration-300 shadow-xl`} 
                                    style={{ color: PRIMARY_DARK }}
                                    onClick={() => setIsPlaying(true)}
                                    aria-label="Play video: Watch Our Story"
                                >
                                    <Play className={`w-8 h-8 sm:w-10 sm:h-10`} style={{ fill: PRIMARY_DARK }} />
                                </button>
                            </div>
                            <p className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 text-white font-black text-lg sm:text-xl">Watch Our Story</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;