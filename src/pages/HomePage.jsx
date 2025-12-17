import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  Star,
  ChevronRight,
  Heart,
  Users,
  BookOpen,
  CheckCircle,
} from 'lucide-react';
import { COLORS, IMAGE_URLS, YOUTUBE_VIDEO_ID } from '../constants/config';
import SectionTitle from '../components/shared/SectionTitle';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ResponsiveImage from '../components/shared/ResponsiveImage';
import YoutubeEmbed from '../components/shared/YoutubeEmbed';
import { usePagesStore } from '../stores/pageInformationSlice';

const HomePage = ({ onNavigate }) => {
  const pageData = usePagesStore((state)=>state.getPageBySlug("home"))
  React.useEffect(() => {
    if (pageData) {
      console.log("Home page data:", pageData);
    }
  }, [pageData]);

  const supporters = [
    "Google", "Microsoft", "Tata Trusts", "Reliance Foundation", "HDFC Bank"
  ];

  const stories = [
    { id: 1, title: "Riya's Dream of Education", img: IMAGE_URLS.GIRL_EDUCATION, date: "Oct 20, 2025" },
    { id: 2, title: "Healing Minds in Rural India", img: IMAGE_URLS.MENTAL_HEALTH, date: "Nov 05, 2025" },
    { id: 3, title: "Dignity for Senior Citizens", img: IMAGE_URLS.ELDERLY_CARE, date: "Nov 12, 2025" }
  ];

  const newsItems = [
    {
      title: "Legal Aid Camp for Rural Women",
      date: "Nov 1, 2025",
      img: IMAGE_URLS.NEWS_1_LEGAL,
      snippet: "Sabri Helpage successfully organized a free legal aid and counseling camp in rural Bihar."
    },
    {
      title: "Food Distribution Drive in Slums",
      date: "Oct 15, 2025",
      img: IMAGE_URLS.NEWS_2_FOOD,
      snippet: "A week-long food and ration distribution drive helped feed 5,000 families."
    },
    {
      title: "New Water Filtration Project",
      date: "Sep 28, 2025",
      img: IMAGE_URLS.NEWS_3_WATER,
      snippet: "Launched a sustainable water filtration system providing clean drinking water."
    }
  ];

  return (
    <>
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <ResponsiveImage
            src={IMAGE_URLS.HERO}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-70"
            fallbackText="Hero+Image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight" style={{ color: COLORS.PRIMARY }}>
            Serving society for <br className="hidden md:block"/>
            more than a decade.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('about')}
              className="text-white px-10 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              Read More
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 hover:bg-gray-100 shadow-lg border-2 border-white"
            >
              Support Us
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full py-3 text-center group cursor-default z-20 transition-all duration-300" style={{ backgroundColor: COLORS.PRIMARY }}>
             <span className="text-white text-xl md:text-2xl font-medium block group-hover:hidden tracking-wide">
               सर्वे भवन्तु सुखिनः
             </span>
             <span className="text-white text-xl md:text-2xl font-medium hidden group-hover:block tracking-wide">
               May all be happy
             </span>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col h-full">
              <div 
                className="p-8 md:p-12 rounded-3xl shadow-2xl h-full flex flex-col transition-all duration-500 hover:shadow-xl" 
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.PRIMARY} 0%, ${COLORS.PRIMARY_DARK} 100%)`
                }}
              >
                <p className="text-sm font-bold uppercase tracking-widest text-white/90 mb-4">
                  Our Impact in Numbers
                </p>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
                  Making a Difference, One Life at a Time
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-auto">
                  {[
                    { value: '75.5K+', label: 'Lives Touched' },
                    { value: '500+', label: 'Projects' },
                    { value: '10+', label: 'Years' }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center border border-white/10 transition-all duration-300 hover:bg-white/20"
                    >
                      <span className="block text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</span>
                      <span className="block text-sm font-medium text-white/80 mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:pl-12">
              <div className="bg-white p-3 rounded-3xl shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
                <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-black/5">
                   <YoutubeEmbed videoId={YOUTUBE_VIDEO_ID} title="Sabri Helpage Story" />
                </div>
              </div>

              <a 
                href="https://www.youtube.com/@sabrihelpage167" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-red-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                     </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Watch Our Stories</span>
                    <span className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">Visit YouTube Channel</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                   <svg className="w-4 h-4 text-gray-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

            </div>

          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionTitle className="mb-16">Our Core Causes</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          title: 'Mental Health', 
          img: IMAGE_URLS.MENTAL_HEALTH, 
          route: 'mental-health' 
        },
        { 
          title: 'Elderly Care', 
          img: IMAGE_URLS.ELDERLY_CARE, 
          route: 'elderly-care' 
        },
        { 
          title: 'Girl Child Education', 
          img: IMAGE_URLS.GIRL_EDUCATION, 
          route: 'girl-education' 
        }
      ].map((cause, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
          <div className="h-56 relative">
            <ResponsiveImage src={cause.img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{cause.title}</h3>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-6 text-sm line-clamp-3">
              Dedicated to providing resources, support, and advocacy for {cause.title.toLowerCase()} initiatives across the country.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => onNavigate(cause.route)} 
                className="flex-1 py-2 rounded-full font-bold transition text-sm"
                style={{ border: `2px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY, backgroundColor: 'transparent' }}
              >
                Read More
              </button>
              <button 
                onClick={() => onNavigate('donate')}
                className="flex-1 text-white py-2 rounded-full font-bold transition text-sm"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Our Supporters</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition duration-500">
            {supporters.map((s, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-gray-600">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center mb-12">
            <SectionTitle className="text-center">Our Stories</SectionTitle>
            <button 
              onClick={() => onNavigate('stories')}
              className="hidden md:flex absolute right-0 items-center font-bold"
              style={{ color: COLORS.PRIMARY }}
            >
              Read All <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {newsItems.map((story) => (
              <div key={story.title} className="group cursor-pointer" onClick={() => onNavigate('blog')}>
                <div className="overflow-hidden rounded-2xl mb-4 shadow-md">
                  <ResponsiveImage 
                    src={story.img} 
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700" 
                  />
                </div>
                <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: COLORS.PRIMARY }}>{story.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 transition" style={{ color: COLORS.TEXT_DARK }}>{story.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{story.snippet}</p>
                <button className="mt-4 text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: COLORS.TEXT_DARK, textDecorationColor: COLORS.PRIMARY }}>Read Story</button>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <button 
              onClick={() => onNavigate('stories')}
              className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-bold"
            >
              Read All Stories
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;