// src/components/sections/NewsSection.jsx
import React from 'react';
import SectionTitle from '../SectionTitle';
import NewsCard from '../ui/NewsCard';
import { IMAGE_URLS } from '../../constants/config';

const NewsSection = () => (
    <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle className="mb-14">
                Latest News & Updates
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <NewsCard 
                    image={IMAGE_URLS.NEWS_1_LEGAL}
                    title="Legal Aid Initiative"
                    description="Providing free legal assistance to underprivileged communities across multiple regions."
                    date="March 15, 2024"
                />
                <NewsCard 
                    image={IMAGE_URLS.NEWS_2_FOOD}
                    title="Food Distribution Drive"
                    description="Successfully distributed meals to over 5,000 families in need during the holiday season."
                    date="February 28, 2024"
                />
                <NewsCard 
                    image={IMAGE_URLS.NEWS_3_WATER}
                    title="Clean Water Access"
                    description="New water purification systems installed in rural communities, benefiting 10,000+ residents."
                    date="January 12, 2024"
                />
            </div>
        </div>
    </section>
);

export default NewsSection;