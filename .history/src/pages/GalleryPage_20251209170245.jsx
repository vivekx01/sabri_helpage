import { COLORS } from '../constants/config';
import PageHeader from '../components/layout/PageHeader';

// Static gallery images from public folder
const GALLERY_IMAGES = [
    { url: '/elderlyCareImg.jpg', caption: 'Elderly Care Initiative' },
    { url: '/event1.jpg', caption: 'Community Event 1' },
    { url: '/event2.jpg', caption: 'Community Event 2' },
    { url: '/event3.jpg', caption: 'Community Event 3' },
    { url: '/event4.jpg', caption: 'Community Event 4' },
    { url: '/event5.jpg', caption: 'Community Event 5' },
    { url: '/event6.jpg', caption: 'Community Event 6' },
    { url: '/event7.jpg', caption: 'Community Event 7' },
    { url: '/event8.jpg', caption: 'Community Event 8' },
    { url: '/event9.jpg', caption: 'Community Event 9' },
    { url: '/event10.jpg', caption: 'Community Event 10' },
    { url: '/events1.jpg', caption: 'Special Events 1' },
    { url: '/events2.jpg', caption: 'Special Events 2' },
    { url: '/girlChildEducation.jpg', caption: 'Girl Child Education' },
    { url: '/HeroSection.jpg', caption: 'Hero Section' },
    { url: '/MentalHealth.jpg', caption: 'Mental Health Awareness' },
    { url: '/NGO India _ Charity in India _ Elderly or senior care, non – profit organisation – sabri helpage.jpg', caption: 'NGO Activities' },
    { url: '/WaterFilteration.jpg', caption: 'Water Filtration Project' },
    { url: '/websiteLogo.jpg', caption: 'Sabri Helpage Logo' },
];

const GalleryPage = () => {
    return (
        <section className="py-0 md:py-24" style={{ backgroundColor: COLORS.BG_LIGHT_GRAY }}>
            <PageHeader title="Gallery" subtitle="Moments from our work" />
            <div className="py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Sabri Helpage In Action</h1>
                    <p className="text-lg text-gray-600">A visual journey of our work and impact across communities.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_IMAGES.map((img, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <img
                                src={img.url}
                                alt={img.caption}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(img.caption)}`;
                                }}
                            />
                            <div className="p-4">
                                <p className="text-sm font-medium text-gray-700">{img.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
};

export default GalleryPage;
                   
