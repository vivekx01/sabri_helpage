import React, { useState } from 'react';
import { Menu, X, Play, ArrowRight, Star, StarHalf,
Facebook, Twitter, Instagram, Mail, ChevronRight, MessageCircle, Heart, Users,
Globe, Search, Linkedin, Youtube, Calendar, User, MessageSquare } from
'lucide-react';
 
// --- Custom Tailwind Configuration / Constants (ORANGE & DARK BROWN THEME) ---
const PRIMARY_DARK = '#260B00'; // Dark Brown/Off-Black
const ACCENT_ORANGE = '#FF7A42'; // Primary Orange
const BG_LIGHT_GRAY = '#f0f0f0';
const ACCENT_DARK_HOVER = '#e66c3c';
const LOGO_RED = '#d32f2f'; // Secondary Red for Logo Accent
 
// --- VIDEO CONSTANTS (IMPROVEMENT: EMBEDDED VIDEO) ---
const EMBED_VIDEO_URL = 'https://youtu.be/csNcS9X49dQ';
const EMBED_VIDEO_ID = 'csNcS9X49dQ'; // Extracted from the provided URL
const EMBED_VIDEO_TITLE = 'Mental Health Awareness Program at LNMU University | MLSM College, Darbhanga | Sabri Helpage';
 
// --- IMAGE URLs ---
// NOTE: Using fallback for missing images. In a production app, these should be hosted.
const IMAGE_URLS = {
HERO:
'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
CHILDREN_HAPPY:
'https://i.ytimg.com/vi/csNcS9X49dQ/maxresdefault.jpg',
KIDS_LEARNING:
'https://i.ytimg.com/vi/1rkvGnEzcPo/maxresdefault.jpg',
COMMUNITY_SUPPORT:
'https://i.ytimg.com/vi/dGbKiy3rC0A/maxresdefault.jpg',
VIDEO_THUMBNAIL:
'https://i.ytimg.com/vi/csNcS9X49dQ/maxresdefault.jpg',
MENTAL_HEALTH:
'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
ELDERLY_CARE:
'https://images.unsplash.com/photo-1576765974257-b414b9ea0051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
GIRL_EDUCATION:
'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
DONATE_CALLOUT:
'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
AWARDS_BACKGROUND:
'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
NEWS_1_LEGAL:
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
NEWS_2_FOOD:
'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
NEWS_3_WATER:
'https://i.ytimg.com/vi/Y5DlqFH7hHg/maxresdefault.jpg',
};

// Gallery Images for Sabri Helpage
const GALLERY_IMAGES = [
    'https://i.ytimg.com/vi/csNcS9X49dQ/maxresdefault.jpg',
    'https://i.ytimg.com/vi/1rkvGnEzcPo/maxresdefault.jpg',
    'https://i.ytimg.com/vi/dGbKiy3rC0A/maxresdefault.jpg',
    'https://i.ytimg.com/vi/Y5DlqFH7hHg/maxresdefault.jpg',
    'https://i.ytimg.com/vi/aBQWyMwXj8Q/maxresdefault.jpg',
    'https://i.ytimg.com/vi/Zw9RWZ5dZ4g/maxresdefault.jpg',
];
 
// Utility component for consistent section titling
const SectionTitle = ({ children, className = "" }) => (
<h2 className={`text-4xl md:text-5xl font-extrabold leading-tight text-center text-gray-900 ${className}`}>
{children}
</h2>
);
 
// --- NEW/IMPROVED: YouTube Embed Component (Ensure video works) ---
const YoutubeEmbed = ({ videoId, title }) => (
    // Uses padding-top trick for 16:9 aspect ratio for responsive video embedding
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
        ></iframe>
    </div>
);

// --- Image Gallery Component ---
const GalleryPage = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className={`text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition`} style={{color: ACCENT_ORANGE}}>
                    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
                </button>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Photo Gallery</h1>
                <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                    Explore the moments that define our mission and impact in communities across the world.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_IMAGES.map((img, index) => (
                        <div 
                            key={index} 
                            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
                            onClick={() => setSelectedImage(img)}
                        >
                            <img 
                                src={img} 
                                alt={`Sabri Helpage gallery image ${index + 1}`} 
                                className="w-full h-64 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/333333/FFFFFF?text=Gallery+Image" }}
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition duration-300"></div>
                        </div>
                    ))}
                </div>
                
                {/* Lightbox for selected image */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-4 right-4 text-white"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Selected gallery image" 
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};
 
// --- Cause Detail Pages (Mental Health) ---
const MentalHealthPage = ({ onBack }) => {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className={`text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition`} style={{color: ACCENT_ORANGE}}>
                    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
                </button>
                <img src={IMAGE_URLS.MENTAL_HEALTH} alt="Mental Health Support Group" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x400/333333/FFFFFF?text=Mental+Health+Image" }}
                />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Mental Health Awareness and Support</h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Mental health is an intrinsic part of human well-being, yet it often remains stigmatized and underserved. Sabri Helpage is committed to breaking the silence surrounding mental health issues by providing accessible resources, counseling services, and awareness campaigns. Our programs are designed to offer emotional support, stress management techniques, and connect individuals with professional help.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{color: ACCENT_ORANGE}}>Our Approach</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
                    <li>**Free Counseling:** Providing subsidized or free sessions with certified psychoanalysts and counselors.</li>
                    <li>**Awareness Workshops:** Conducting workshops in schools and communities to destigmatize mental illness.</li>
                    <li>**Digital Resources:** Creating online content, articles, and self-help guides for immediate support.</li>
                    <li>**Support Groups:** Facilitating safe, confidential spaces for individuals to share experiences and build resilience.</li>
                </ul>
                <div className="p-6 rounded-xl text-center shadow-inner" style={{backgroundColor: BG_LIGHT_GRAY}}>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Need Help Now?</h3>
                    <p className="text-lg text-gray-700 mb-4">You are not alone. Reach out for confidential support today.</p>
                    <a href="mailto:info@sabrihelpage.org" className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:bg-opacity-90`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        Contact Our Team
                    </a>
                </div>
            </div>
        </section>
    );
};
 
// --- Cause Detail Pages (Elderly Care) ---
const ElderlyCarePage = ({ onBack }) => {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className={`text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition`} style={{color: ACCENT_ORANGE}}>
                    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
                </button>
                <img src={IMAGE_URLS.ELDERLY_CARE} alt="Elderly Woman smiling" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x400/333333/FFFFFF?text=Elderly+Care+Image" }}
                />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Dignified Elderly Care Program</h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Our seniors deserve respect, companionship, and high-quality care. Sabri Helpage runs initiatives focused on combating loneliness, providing essential health check-ups, and ensuring that our elderly community members live their golden years with dignity and comfort. We believe in providing physical, emotional, and social support.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{color: ACCENT_ORANGE}}>Program Pillars</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
                    <li>**Home Visits:** Regular visits from volunteers to provide companionship and basic assistance.</li>
                    <li>**Medical Camps:** Free health screenings, medication assistance, and nutritional advice.</li>
                    <li>**Recreational Centers:** Creating safe spaces for social interaction, games, and light exercise.</li>
                    <li>**Emotional Support:** Counseling services to address depression, grief, and feelings of isolation.</li>
                </ul>
                <div className="p-6 rounded-xl text-center shadow-inner" style={{backgroundColor: BG_LIGHT_GRAY}}>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Volunteer Today</h3>
                    <p className="text-lg text-gray-700 mb-4">Your time is a priceless gift. Spend an hour connecting with a senior.</p>
                    <a href="#" className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:bg-opacity-90`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        Apply to Volunteer
                    </a>
                </div>
            </div>
        </section>
    );
};
 
// --- Cause Detail Pages (Girl Education) ---
const GirlEducationPage = ({ onBack }) => {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className={`text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition`} style={{color: ACCENT_ORANGE}}>
                    <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
                </button>
                <img src={IMAGE_URLS.GIRL_EDUCATION} alt="Young girls studying together" className="rounded-xl w-full h-64 md:h-96 object-cover mb-8 shadow-lg" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x400/333333/FFFFFF?text=Girl+Education+Image" }}
                />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Empowering the Girl Child through Education</h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Education is the single most powerful tool for breaking the cycle of poverty. Our Girl Child Education program provides scholarships, school supplies, and safe learning environments for underprivileged girls, ensuring they have the opportunity to realize their full potential and become future leaders in their communities.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{color: ACCENT_ORANGE}}>What We Provide</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 mb-10">
                    <li>**Scholarships:** Covering tuition fees, examination costs, and school uniforms.</li>
                    <li>**Mentorship:** Connecting girls with successful women professionals for guidance and inspiration.</li>
                    <li>**Digital Literacy:** Training in basic computer skills and internet usage to bridge the technological gap.</li>
                    <li>**Health and Hygiene:** Providing essential supplies and education on reproductive health.</li>
                </ul>
                <div className="p-6 rounded-xl text-center shadow-inner" style={{backgroundColor: BG_LIGHT_GRAY}}>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Sponsor a Child</h3>
                    <p className="text-lg text-gray-700 mb-4">Your contribution of just $30 per month can support a girl's entire education.</p>
                    <a href="#" className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:bg-opacity-90`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        Sponsor Now
                    </a>
                </div>
            </div>
        </section>
    );
};
 
// --- Read More / About Page Component ---
const ReadMorePage = ({ onBack }) => (
    <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={onBack} className={`text-sm font-semibold mb-8 flex items-center hover:text-gray-700 transition`} style={{color: ACCENT_ORANGE}}>
                <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Deep Roots and Vision</h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-light">
                Sabri Helpage is more than just an organization; it is the culmination of a decade-long dream to establish a society founded on the principles of **altruism, voluntary spirit, and comprehensive human development.**
            </p>
 
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{color: ACCENT_ORANGE}}>The Founder's Journey</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Founded by **Aarti BR Singh**, a distinguished psychoanalyst and entrepreneur, Sabri Helpage was born from the realization that true societal health requires addressing both the **physical and psychological well-being** of individuals. Aarti's vision was to integrate professional care with grassroots community support, creating a holistic approach to charity that heals the mind and the body.
            </p>
 
            <div className="bg-white p-6 rounded-xl shadow-2xl border-l-4" style={{borderColor: PRIMARY_DARK}}>
                <p className="text-xl italic text-gray-900">
                    "Sarve bhavantu sukhinah, sarve santu niramayah."
                </p>
                <p className="text-md text-gray-600 mt-2">
                    — Let all be happy, let all be free from illness. This ancient mantra guides our every action.
                </p>
            </div>
 
            <h2 className="text-3xl font-bold text-gray-800 my-8" style={{color: ACCENT_ORANGE}}>Our Core Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-5 rounded-xl border-t-4 shadow-sm" style={{borderColor: PRIMARY_DARK}}>
                    <Heart className="w-8 h-8 mb-3" style={{color: ACCENT_ORANGE}} />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Holistic Welfare</h3>
                    <p className="text-gray-600 text-sm">Focusing on mental health, elderly care, and empowering women & children, ensuring no one is left behind.</p>
                </div>
                <div className="p-5 rounded-xl border-t-4 shadow-sm" style={{borderColor: PRIMARY_DARK}}>
                    <Globe className="w-8 h-8 mb-3" style={{color: ACCENT_ORANGE}} />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Development</h3>
                    <p className="text-gray-600 text-sm">Promoting human and global sustainability through international collaborations and knowledge sharing.</p>
                </div>
            </div>
 
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                Today, Sabri Helpage stands as a testament to the power of human kindness. We invite you to explore our work further and join us in building a happier, healthier, and more compassionate future for all.
            </p>
        </div>
    </section>
);

 const DonatePage = ({ onBack, initialData }) => {
    // --- Step 1 State (for the form shown in the image) ---
    const [amount, setAmount] = useState(initialData?.amount || 5000); 
    const [customAmount, setCustomAmount] = useState(initialData?.customAmount || '');
    const [supportCategory, setSupportCategory] = useState(initialData?.category || 'Elderly Care');
    
    // --- Step State for multi-step form ---
    // Start at step 2 if initialData is provided (e.g., coming from a Home form), else 1.
    const [step, setStep] = useState(initialData ? 2 : 1); 

    // --- Step 2 State (for the full donor details form) ---
    const [citizenType, setCitizenType] = useState('indian');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [pan, setPan] = useState(''); // PAN is displayed in Step 1, collected in Step 2 if applicable
    const [isExistingDonor, setIsExistingDonor] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false); // Moved here for clarity in Step 2 logic

    const donationOptions = [5000, 15000, 25000]; // Matching options from the image

    const handleSelectAmount = (val) => {
        setAmount(val);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setAmount(0); // De-select fixed amount when custom is entered
    };

    const finalAmount = customAmount ? parseFloat(customAmount) : amount || 0; 
    const isCustomActive = finalAmount > 0 && !donationOptions.includes(amount);

    // --- Navigation from Step 1 (image's form) to Step 2 (full donor details) ---
    const handleNext = () => {
        if (finalAmount < 500) {
            alert("Minimum donation amount should be Rs. 500/-");
            return;
        }
        setStep(2);
    };

    // --- Final Form Submission (Step 2 logic, remains largely the same) ---
    const handleSubmitStep2 = (e) => {
        e.preventDefault();
        
        // Basic validation for Step 2 fields
        if (!firstName || !lastName || !email || !mobile || !pan || !address || !zip || !city || finalAmount <= 0) {
             alert("Please fill in all required fields and ensure a valid donation amount.");
             return;
        }

        const allDonationData = {
            amount: finalAmount,
            isRecurring,
            supportCategory, 
            citizenType,
            firstName,
            lastName,
            email,
            mobile,
            dob,
            address,
            zip,
            city,
            province,
            pan,
            isExistingDonor,
        };

        console.log("FINAL DONATION SUBMISSION:", allDonationData);
        alert(`Thank you, ${firstName}! Your donation of ₹${finalAmount.toLocaleString('en-IN')} for ${supportCategory} has been processed.`);
        
        // Reset state and go back to a 'home' like state
        onBack(); 
    };

    // ----------------------------------------------------------------------
    // --- RENDER STEP 2: Full-screen Donor Details Form (Hidden by default, shown after "Next >") ---
    // ----------------------------------------------------------------------
    if (step === 2) {
        return (
            <section className="min-h-screen py-10 md:py-16" style={{ backgroundColor: LIGHT_GRAY_BG }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button onClick={() => setStep(1)} className={`text-sm font-semibold mb-8 flex items-center text-gray-700 hover:text-gray-900 transition`} style={{color: PRIMARY_ORANGE}}>
                        <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to Donation Amount
                    </button>
                    
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border-t-8" style={{borderColor: FORM_RED_ACCENT}}>
                        
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Complete Your Donation</h1>
                        <p className="text-gray-600 mb-10">
                            Please provide your details to complete the donation.
                        </p>

                        <form onSubmit={handleSubmitStep2} className="space-y-8">
                            <div className="space-y-6">
                                {/* Current Donation Summary (Updated to reflect current choice) */}
                                <div className="p-4 rounded-lg bg-blue-50 border-l-4" style={{borderColor: FORM_RED_ACCENT}}>
                                    <p className="text-sm font-medium text-gray-700">
                                        You are making a **{isRecurring ? 'Monthly Recurring' : 'One-time'}** donation of **₹{finalAmount.toLocaleString('en-IN')}** for **{supportCategory}**.
                                    </p>
                                    <div className='flex items-center pt-2'>
                                         <input id="is-recurring-step2" type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="h-4 w-4 rounded border-gray-300" style={{ accentColor: FORM_RED_ACCENT }} />
                                         <label htmlFor="is-recurring-step2" className="ml-2 block text-sm font-medium text-gray-700">Make this a Monthly Recurring Donation?</label>
                                    </div>
                                </div>
                                <hr/>

                                {/* Citizen Type */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">Citizenship</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCitizenType('indian')}
                                            className={`flex-1 p-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center ${
                                                citizenType === 'indian' ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:border-gray-500'
                                            }`}
                                            style={citizenType === 'indian' ? { backgroundColor: TEXT_DARK_BROWN } : {}}
                                        >
                                            {citizenType === 'indian' && <CheckMarkIcon />}
                                            Indian Citizens
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCitizenType('foreign')}
                                            className={`flex-1 p-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center ${
                                                citizenType === 'foreign' ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:border-gray-500'
                                            }`}
                                            style={citizenType === 'foreign' ? { backgroundColor: TEXT_DARK_BROWN } : {}}
                                        >
                                            {citizenType === 'foreign' && <CheckMarkIcon />}
                                            Foreign Citizens/OCI
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 ml-1">For Indian Passport holders</p>
                                </div>

                                {/* Name Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                        <input id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                        <input id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                </div>

                                {/* Contact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                        <input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                </div>
                                
                                {/* DOB / PAN Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input id="dob" type="date" placeholder="dd-mm-yyyy" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                    <div>
                                        <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
                                        <input id="pan" type="text" value={pan} onChange={(e) => setPan(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                </div>

                                {/* Address Fields */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                                    <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code *</label>
                                        <input id="zip" type="text" value={zip} onChange={(e) => setZip(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                        <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                </div>
                                
                                {/* Province/State & Existing Donor */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                        <input id="province" type="text" value={province} onChange={(e) => setProvince(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ '--tw-ring-color': FORM_RED_ACCENT }} />
                                    </div>
                                    <div className='flex items-center pt-4'>
                                         <input id="existing-donor" type="checkbox" checked={isExistingDonor} onChange={(e) => setIsExistingDonor(e.target.checked)} className="h-4 w-4 rounded border-gray-300" style={{ accentColor: FORM_RED_ACCENT }} />
                                         <label htmlFor="existing-donor" className="ml-2 block text-sm font-medium text-gray-700">I am an existing donor.</label>
                                    </div>
                                </div>
                            </div>

                            {/* Final Submit Button */}
                            <button
                                type="submit"
                                className={`w-full py-4 rounded-full text-xl font-bold text-white shadow-xl transition duration-300 hover:opacity-90 flex items-center justify-center`}
                                style={{ backgroundColor: PRIMARY_ORANGE }}
                                disabled={finalAmount === 0}
                            >
                                <Heart className="w-6 h-6 mr-2" />
                                Donate ₹{finalAmount.toLocaleString('en-IN')} Now
                            </button>
                            
                            <p className="text-xs text-center text-gray-500 mt-4">
                                Your donation is eligible for tax benefits under Section 80G of the Indian Income Tax Act.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

    // ----------------------------------------------------------------------
    // --- RENDER STEP 1: Layout matching the provided image ---
    // ----------------------------------------------------------------------
    return (
        <div className="min-h-screen font-sans">
            {/* Hero Section - Orange Background */}
            <section className="py-16 md:py-24 text-center text-white" style={{ backgroundColor: PRIMARY_ORANGE }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        Transform Lives, Empower Communities
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-10 opacity-90">
                        Join us in building a compassionate world where every elderly person can thrive with dignity.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div>
                            <p className="text-4xl md:text-5xl font-bold text-white">50K+</p>
                            <p className="text-lg md:text-xl font-medium opacity-90">Lives Touched</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-bold text-white">25</p>
                            <p className="text-lg md:text-xl font-medium opacity-90">Regions Served</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-bold text-white">10+</p>
                            <p className="text-lg md:text-xl font-medium opacity-90">Years of Service</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Focus Areas Section - White Background */}
            <section className="py-16 md:py-24" style={{ backgroundColor: LIGHT_GRAY_BG }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4" style={{ color: TEXT_DARK_BROWN }}>
                        Our Focus Areas
                    </h2>
                    <p className="text-md md:text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        We're committed to creating sustainable change across critical sectors that impact the most vulnerable members of our society.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Elderly Care Card */}
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: 'green' }}> {/* Green border for Elderly */}
                            <ElderlyIcon />
                            <h3 className="text-xl font-bold mb-2" style={{ color: TEXT_DARK_BROWN }}>Elderly Care</h3>
                            <p className="text-gray-600">Dignity and support for senior citizens.</p>
                        </div>
                        {/* Education Card */}
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: 'blue' }}> {/* Blue border for Education */}
                            <EducationIcon />
                            <h3 className="text-xl font-bold mb-2" style={{ color: TEXT_DARK_BROWN }}>Education</h3>
                            <p className="text-gray-600">Education and girl child.</p>
                        </div>
                        {/* Health Card */}
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: 'red' }}> {/* Red border for Health */}
                            <HealthIcon />
                            <h3 className="text-xl font-bold mb-2" style={{ color: TEXT_DARK_BROWN }}>Health</h3>
                            <p className="text-gray-600">Ensuring mental health and healthcare.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Your Support Creates Impact & Donation Form Section */}
            <section className="py-16 md:py-24" style={{ backgroundColor: LIGHT_GRAY_BG }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Your Support Creates Impact */}
                    <div className="lg:pr-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: TEXT_DARK_BROWN }}>
                            Your Support Creates Impact
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            When you donate, you're not just giving money. You're providing education, healthcare, protection, and hope to those who need it most. Every rupee is a step towards a more equitable world.
                        </p>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4" style={{ borderColor: PRIMARY_ORANGE }}>
                            <div className="flex items-center text-gray-800 font-semibold text-sm md:text-base">
                                <Star className="w-5 h-5 mr-2" style={{ color: PRIMARY_ORANGE }} />
                                <span>100% Transparent | Verified NGO | Direct Impact</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-3">
                                We ensure that your donation reaches those who need it most, with complete transparency and accountability.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Donation Form */}
                    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8" style={{ borderColor: FORM_RED_ACCENT }}>
                        <p className="text-center font-bold text-gray-800 mb-6 text-sm">
                            Sabri Helpage PAN No AATCS9585A
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {donationOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleSelectAmount(opt)}
                                    className={`p-3 rounded-lg font-bold text-base transition duration-200 ${
                                        amount === opt && !customAmount
                                            ? 'text-white shadow-md'
                                            : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                                    }`}
                                    style={amount === opt && !customAmount ? { backgroundColor: FORM_RED_ACCENT } : {}}
                                >
                                    ₹{opt.toLocaleString('en-IN')}
                                </button>
                            ))}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="other-amount" className="sr-only">Other Amount</label>
                            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                                <span className="inline-flex items-center px-4 rounded-l-lg border-r border-gray-300 bg-gray-50 text-gray-500">₹</span>
                                <input
                                    id="other-amount"
                                    type="number"
                                    min="500"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    className={`flex-1 p-3 focus:outline-none focus:ring-2 ${isCustomActive ? 'border-orange-500' : 'border-transparent'}`}
                                    placeholder="Other Amount"
                                    style={{ '--tw-ring-color': PRIMARY_ORANGE }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 ml-1">Minimum Amount should be Rs. 500/-</p>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="support-category" className="block text-sm font-medium text-gray-700 mb-2">I offer my support for</label>
                            <select
                                id="support-category"
                                value={supportCategory}
                                onChange={(e) => setSupportCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2"
                                style={{ '--tw-ring-color': PRIMARY_ORANGE }}
                            >
                                <option value="Elderly Care">Elderly Care</option>
                                <option value="Education">Education</option>
                                <option value="Mental Health">Mental Health</option>
                                <option value="General Fund">General Fund</option>
                            </select>
                        </div>

                        <button
                            className="w-full py-3 mb-4 rounded-lg text-base font-semibold text-white shadow-md transition duration-300 hover:opacity-90"
                            style={{ backgroundColor: TEXT_DARK_BROWN }}
                        >
                            For Regular Users Login
                        </button>

                        <button
                            onClick={handleNext}
                            className={`w-full py-3 rounded-lg text-lg font-bold text-white shadow-xl transition duration-300 hover:opacity-90 flex items-center justify-center ${finalAmount > 0 && finalAmount >= 500 ? '' : 'opacity-50 cursor-not-allowed'}`}
                            style={{ backgroundColor: PRIMARY_ORANGE }}
                            disabled={finalAmount === 0 || finalAmount < 500}
                        >
                            Next <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                        
                        <p className="text-xs text-center text-gray-500 mt-4">
                            All Donations to Sabri Helpage are tax exempted.
                        </p>
                    </div>
                </div>
            </section>

            {/* Optional: Add a Footer Here if needed for the complete page context */}
            {/* <Footer /> */} 
        </div>
    );
};


// ----------------------------------------------------------------------
// --- 4. MAIN APP COMPONENT (To render the DonatePage as a full application) ---
// ----------------------------------------------------------------------

function App() {
    const [currentPage, setCurrentPage] = useState('Donate'); // Default to 'Donate' page
    const [initialDonateData, setInitialDonateData] = useState(null);

    const navigateToPage = (page, data = null) => {
        setCurrentPage(page);
        setInitialDonateData(data); // Pass data if navigating to DonatePage with pre-filled options
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header currentPage={currentPage} onNavigate={navigateToPage} />
            <main className="flex-grow">
                {currentPage === 'Home' && <HomePage onDonateClick={(data) => navigateToPage('Donate', data)} />}
                {currentPage === 'Donate' && <DonatePage onBack={() => navigateToPage('Home')} initialData={initialDonateData} />}
                {currentPage === 'Gallery' && <GalleryPage />}
                {currentPage === 'MentalHealth' && <MentalHealthPage />}
                {currentPage === 'ElderlyCare' && <ElderlyCarePage />}
            </main>
            <Footer />
        </div>
    );
}
// --- Updated Header Component (Improved Responsiveness/UX) ---
const Header = ({ onDonateClick, onReadMoreClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    const navItems = [
        { name: 'Home', href: 'home' },
        { name: 'About Us', href: 'read-more' }, // Navigate to About Page
        { name: 'Our Causes', href: '#causes-section-anchor' },
        { name: 'The SocioFare', href: '#sociofare-section-anchor' },
        { name: 'News & Updates', href: '#news-section-anchor' },
        { name: 'Internship', href: '#internship' }, // Placeholder anchor
    ];
 
    const handleNavClick = (href) => {
        setIsMenuOpen(false);
        if (href.startsWith('#')) {
            // Anchor link: scroll to element on current page (or homepage)
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                 // For placeholders like #internship, just go to the top of the page if no element is found
                 window.location.href = '#'; 
            }
        } else if (href === 'read-more') {
            onReadMoreClick();
        } else {
            // Simple home reset
            window.location.href = '#';
        }
    };
 
    return (
        <header className="bg-white shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 md:py-4">
                    {/* Logo */}
                    <button onClick={() => window.location.reload()} className="flex flex-col items-start space-y-0" aria-label="Sabri Helpage Home">
                        <span
                            className="text-2xl md:text-3xl font-handwriting tracking-tight font-extrabold leading-none"
                            style={{ color: LOGO_RED, fontFamily: 'cursive' }}
                        > 
                            SabriHelpAge
                        </span>
                        <div className="w-full h-px" style={{ backgroundColor: PRIMARY_DARK }}></div>
                        <span
                            className="text-[0.6rem] italic font-semibold pt-1"
                            style={{ color: PRIMARY_DARK }}
                        > 
                            sarve bhavantu sukhinah
                        </span>
                    </button>
 
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex flex-1 items-center justify-end space-x-6">
                        <nav className="flex space-x-5 text-sm font-semibold items-center">
                            {navItems.map(item => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`text-gray-700 hover:text-gray-900 transition duration-200 py-2`}
                                > 
                                    {item.name}
                                </button>
                            ))}
                        </nav>
 
                        {/* Search Input */}
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`pl-4 pr-10 py-2 w-32 xl:w-40 border border-gray-200 rounded-full focus:outline-none focus:ring-2 transition duration-200 text-sm shadow-inner text-gray-900`}
                                style={{ '--tw-ring-color': ACCENT_ORANGE }}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
                        </div>
                        {/* Read More Button */}
                        <button
                            onClick={onReadMoreClick}
                            className={`text-white px-5 py-2 rounded-full font-bold transition duration-300 shadow-md text-sm hover:opacity-90`}
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        > 
                            Read More
                        </button>
 
                        {/* Donate Now Button */}
                        <button
                            onClick={onDonateClick}
                            className={`text-white px-5 py-2 rounded-full font-bold transition duration-300 shadow-md text-sm hover:bg-gray-800`}
                            style={{ backgroundColor: PRIMARY_DARK }}
                        > 
                            Donate Now
                        </button>
                    </div>
 
                    {/* Mobile Toggle */}
                    <button className={`lg:hidden p-2 text-gray-900`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
 
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[65px] w-full bg-white z-40 shadow-lg pb-4">
                    <nav className="flex flex-col space-y-1 p-4 text-sm font-medium">
                        {navItems.map(item => (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="py-3 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition text-base text-left"
                            > 
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={() => { onReadMoreClick(); setIsMenuOpen(false); }}
                            className={`text-center text-white mt-4 px-4 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90`}
                            style={{ backgroundColor: ACCENT_ORANGE }}
                        > 
                            Read More
                        </button>
                        <button
                            onClick={() => { onDonateClick(); setIsMenuOpen(false); }}
                            className={`text-center text-white mt-4 px-4 py-3 rounded-full font-bold transition duration-300 shadow-md hover:bg-gray-800`}
                            style={{ backgroundColor: PRIMARY_DARK }}
                        > 
                            Donate Now
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};
 
// --- Refactored About Section (Now matches Screenshot 1 Layout for Mission) ---
const AboutSection = ({ onViewGalleryClick }) => (
    <section className="py-16 md:py-24" style={{ backgroundColor: BG_LIGHT_GRAY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* LEFT COLUMN: Focus Areas - Stacks vertically on all sizes (Matches Screenshot) */}
                <div className="flex flex-col space-y-4">
                    <div className={`p-6 rounded-xl shadow-lg h-32 flex items-center justify-center overflow-hidden relative`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        <img src={IMAGE_URLS.CHILDREN_HAPPY} alt="Children Happy" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                        <h3 className="text-xl md:text-2xl font-bold text-white relative z-10"></h3>
                    </div>
                    <div className={`p-6 rounded-xl shadow-lg h-32 flex items-center justify-center overflow-hidden relative`} style={{ backgroundColor: PRIMARY_DARK }}>
                        <img src={IMAGE_URLS.KIDS_LEARNING} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                        <h3 className="text-xl md:text-2xl font-bold text-white relative z-10"></h3>
                    </div>
                    <div className={`p-6 rounded-xl shadow-lg h-32 flex items-center justify-center overflow-hidden relative`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        <img src={IMAGE_URLS.COMMUNITY_SUPPORT} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                        <h3 className="text-xl md:text-2xl font-bold text-white relative z-10"></h3>
                    </div>
                </div>
 
                {/* RIGHT COLUMN: Mission Statement (What We Stand For) - Matches Screenshot */}
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT_ORANGE }}>WHAT WE STAND FOR</p>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mt-2 mb-6`}>
                        Shaping Lives Through Compassionate Action.
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        At Sabri Helpage, our mission is to make a positive and lasting impact on the lives of marginalized people globally. We focus on integrated health awareness, elderly care, and women & children welfare. Through strategic partnerships and the dedicated support of our global community, we strive to create a more equitable, inclusive, and compassionate world.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button onClick={onViewGalleryClick} className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md hover:opacity-90`} style={{ backgroundColor: PRIMARY_DARK }}>
                            View More
                        </button>
                        {/* Link to the combined Milestones and Video section */}
                        <a href="#milestones-video-section" className={`text-gray-900 border-2 px-8 py-3 rounded-full font-bold transition duration-300 shadow-md flex items-center justify-center hover:bg-gray-50`} style={{ borderColor: PRIMARY_DARK }}>
                            <Play className="w-5 h-5 mr-2" style={{ color: PRIMARY_DARK }} /> Watch Video
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
 
// --- NEW/Refactored Component: Milestones and Video (Replaces StatsSection) ---
const MilestonesAndVideoSection = () => (
    <section id="milestones-video-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
 
                {/* LEFT COLUMN: Milestones Block (Matches Screenshot 1) */}
                <div className="flex flex-col h-full">
                    <div className={`p-6 md:p-8 rounded-xl shadow-2xl h-full flex flex-col`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        <p className="text-sm font-semibold uppercase tracking-widest text-white mb-2">OUR MILESTONES</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 md:mb-8">
                            We've Accomplished <br className="hidden sm:inline" /> Most During This Span.
                        </h3>
                        
                        {/* Stats Numbers (Responsive Grid) */}
                        <div className="grid grid-cols-3 gap-3 md:gap-4 mt-auto">
                            <div className={`p-3 rounded-lg text-center`} style={{ backgroundColor: PRIMARY_DARK }}>
                                <span className="block text-2xl md:text-3xl font-extrabold text-white">75.5K</span>
                                <span className="block text-xs font-medium text-gray-200 uppercase mt-1">People Helped</span>
                            </div>
                            <div className={`p-3 rounded-lg text-center`} style={{ backgroundColor: PRIMARY_DARK }}>
                                <span className="block text-2xl md:text-3xl font-extrabold text-white">34.2K</span>
                                <span className="block text-xs font-medium text-gray-200 uppercase mt-1">Happy Lives</span>
                            </div>
                            <div className={`p-3 rounded-lg text-center`} style={{ backgroundColor: PRIMARY_DARK }}>
                                <span className="block text-2xl md:text-3xl font-extrabold text-white">57.4</span>
                                <span className="block text-xs font-medium text-gray-200 uppercase mt-1">Locations</span>
                            </div>
                        </div>
                    </div>
                </div>
 
                {/* RIGHT COLUMN: Watch Our Story Video (Embedded YouTube) */}
                <div className="flex flex-col h-full">
                    <div className={`relative w-full shadow-2xl rounded-2xl overflow-hidden h-96`}>
                         <YoutubeEmbed videoId={EMBED_VIDEO_ID} title={EMBED_VIDEO_TITLE} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
 
// --- Causes Section ---
const CausesSection = ({ onDonateClick, onCauseClick }) => {
    const causes = [
        { name: 'Mental Health', detailPage: 'mental-health', goal: 50000, raised: 35000, img: IMAGE_URLS.MENTAL_HEALTH, icon: <MessageCircle className="w-5 h-5 mr-2" /> },
        { name: 'Elderly Care', detailPage: 'elderly-care', goal: 120000, raised: 85000, img: IMAGE_URLS.ELDERLY_CARE, icon: <Heart className="w-5 h-5 mr-2" /> },
        { name: 'Girl Child Education', detailPage: 'girl-education', goal: 10000, raised: 7500, img: IMAGE_URLS.GIRL_EDUCATION, icon: <Users className="w-5 h-5 mr-2" /> },
    ];
 
    return (
        <section id="causes-section-anchor" className="py-16 md:py-24" style={{ backgroundColor: BG_LIGHT_GRAY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle className="mb-16">Our Core Causes</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {causes.map((cause) => (
                        <div key={cause.name} className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-[1.02]">
                            {/* Image Placeholder */}
                            <div className="h-48 w-full bg-gray-200 relative">
                                <img src={cause.img} alt={cause.name} className="w-full h-full object-cover" 
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/333333/FFFFFF?text=Cause+Image" }}
                                />
                                <div className="absolute inset-0 bg-black/30"></div>
                                <h4 className="absolute bottom-0 left-0 p-4 text-white text-2xl font-bold">{cause.name}</h4>
                            </div>
 
                            <div className="p-6">
                                <p className="text-gray-600 text-sm mb-4">
                                    Dedicated to providing support for {cause.name.toLowerCase()} initiatives, including counseling and awareness campaigns.
                                </p>
 
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                                        <span>Raised: ${cause.raised.toLocaleString()}</span>
                                        <span>Goal: ${cause.goal.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="h-2.5 rounded-full" 
                                            style={{ 
                                                width: `${Math.min(100, (cause.raised / cause.goal) * 100)}%`, 
                                                backgroundColor: ACCENT_ORANGE 
                                            }}
                                        ></div>
                                    </div>
                                </div>
 
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => onCauseClick(cause.detailPage)}
                                        className={`flex-1 flex items-center justify-center text-sm font-bold px-4 py-2 rounded-full transition duration-300 hover:bg-gray-100`}
                                        style={{ color: ACCENT_ORANGE, border: `2px solid ${ACCENT_ORANGE}` }}
                                    >
                                        Read More
                                    </button>
                                    <button 
                                        onClick={onDonateClick}
                                        className={`flex-1 flex items-center justify-center text-sm font-bold text-white px-4 py-2 rounded-full transition duration-300 hover:opacity-90`}
                                        style={{ backgroundColor: PRIMARY_DARK }}
                                    >
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
 
// --- Donate Callout Section ---
const DonateCalloutSection = ({ onDonateClick }) => (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: PRIMARY_DARK }}>
        <div className="absolute inset-0 opacity-10">
            <img 
                src={IMAGE_URLS.DONATE_CALLOUT} 
                alt="People joining hands" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x500/000000/FFFFFF?text=Callout+Background" }}
            />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Even a Small Donation Can Benefit Many People.
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Your generosity provides essential resources, education, and health support to communities that need it most. Every dollar makes a difference.
            </p>
            <button
                onClick={onDonateClick}
                className={`text-lg text-white px-10 py-4 rounded-full font-extrabold transition duration-300 shadow-xl hover:opacity-90`}
                style={{ backgroundColor: ACCENT_ORANGE }}
            >
                Give Hope Today <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
        </div>
    </section>
);
 
// --- SocioFare Section ---
const SocioFareSection = () => (
    <section id="sociofare-section-anchor" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-100 p-8 rounded-xl shadow-inner">
                
                {/* Initiatives */}
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT_ORANGE }}>OUR INITIATIVES</p>
                    <h2 className={`text-4xl font-extrabold leading-tight text-gray-900 mt-2 mb-6`}>
                        Recognizing Excellence in <br /> Social Welfare.
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        The SocioFare Awards, a prestigious Award by Sabri Helpage, shines a radiant spotlight on the selfless dedication and impactful contributions toward a dignified existence. We celebrate the remarkable individuals and organizations.
                    </p>
                    <a href="#" className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-md inline-flex items-center hover:opacity-90`} style={{ backgroundColor: ACCENT_ORANGE }}>
                        Learn More <ChevronRight className="w-5 h-5 ml-2" />
                    </a>
                </div>
 
                {/* Users/Awards */}
                <div className="flex flex-col space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">USERS</p>
                    <h3 className={`text-3xl font-extrabold leading-tight text-gray-900`}>
                        The SocioFare Awards
                    </h3>
                    <div className={`p-4 rounded-lg flex justify-between items-center transition duration-300 shadow-md hover:bg-white`} style={{ backgroundColor: BG_LIGHT_GRAY }}>
                        <span className="font-semibold text-gray-900 flex items-center">
                            <span className="text-lg font-bold mr-3" style={{ color: ACCENT_ORANGE }}>01</span> Sociofare.com
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className={`p-4 rounded-lg flex justify-between items-center transition duration-300 shadow-md hover:bg-white`} style={{ backgroundColor: BG_LIGHT_GRAY }}>
                        <span className="font-semibold text-gray-900 flex items-center">
                             <span className="text-lg font-bold mr-3" style={{ color: ACCENT_ORANGE }}>02</span> Award Nomination
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
 
// --- Testimonials Section (What People Say About Us) ---
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Rohan Sharma",
            title: "Former Intern",
            quote: "The experience was life-changing. I loved the emphasis on elderly care and mental health.",
            avatar: "RS",
            rating: 5,
            color: ACCENT_ORANGE
        },
        {
            name: "Priya Verma",
            title: "Donor",
            quote: "I'm proud to support an organization with such transparency and focus on girl child education.",
            avatar: "PV",
            rating: 4.5,
            color: PRIMARY_DARK
        },
        {
            name: "Dr. Alok Gupta",
            title: "Partner NGO",
            quote: "Our collaboration on mental health initiatives has been immensely successful and rewarding.",
            avatar: "AG",
            rating: 5,
            color: ACCENT_ORANGE
        },
    ];
 
    const Rating = ({ rating }) => (
        <div className="flex items-center text-sm mb-3" style={{ color: ACCENT_ORANGE }}>
            {[...Array(5)].map((_, i) => {
                if (rating >= i + 1) {
                    return <Star key={i} className="w-4 h-4 fill-current" />;
                } else if (rating >= i + 0.5) {
                    return <StarHalf key={i} className="w-4 h-4 fill-current" />;
                }
                return <Star key={i} className="w-4 h-4 text-gray-300" />;
            })}
        </div>
    );
 
    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: BG_LIGHT_GRAY }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle className="mb-12">What People Say About Us <MessageSquare className="w-10 h-10 inline-block align-bottom" style={{ color: PRIMARY_DARK }} /></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-xl border-t-4" style={{ borderColor: t.color }}>
                            <Rating rating={t.rating} />
                            <p className="text-lg italic text-gray-800 mb-5 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mr-3" style={{ backgroundColor: t.color }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{t.name}</p>
                                    <p className="text-sm text-gray-500">{t.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
 
// --- News Section ---
const NewsSection = () => {
    const newsItems = [
        {
            title: "Legal Aid Camp for Rural Women",
            date: "Nov 1, 2025",
            img: IMAGE_URLS.NEWS_1_LEGAL,
            snippet: "Sabri Helpage successfully organized a free legal aid and counseling camp in rural Bihar, assisting over 200 women with land and family disputes."
        },
        {
            title: "Food Distribution Drive in Slums",
            date: "Oct 15, 2025",
            img: IMAGE_URLS.NEWS_2_FOOD,
            snippet: "A week-long food and ration distribution drive helped feed 5,000 families across multiple city slums, thanks to volunteer efforts."
        },
        {
            title: "New Water Filtration Project",
            date: "Sep 28, 2025",
            img: IMAGE_URLS.NEWS_3_WATER,
            snippet: "Launched a sustainable water filtration system in partnership with a local tech firm, providing clean drinking water to a remote village."
        },
    ];
    return (
        <section id="news-section-anchor" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle className="mb-12">Latest News & Updates</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">
                            <img 
                                src={item.img} 
                                alt={item.title} 
                                className="h-56 w-full object-cover" 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x300/333333/FFFFFF?text=News+Image" }}
                            />
                            <div className="p-6">
                                <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT_ORANGE }}>
                                    <Calendar className="w-4 h-4 inline mr-1 align-sub" /> {item.date}
                                </p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{item.snippet}</p>
                                <a href="#" className={`font-semibold text-sm transition duration-300 flex items-center hover:text-gray-900`} style={{ color: ACCENT_ORANGE }}>
                                    Read Full Story <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
 
// --- Footer Component ---
const Footer = () => (
    <footer className="py-12" style={{ backgroundColor: PRIMARY_DARK }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                
                {/* Logo & Contact */}
                <div>
                    <button onClick={() => window.location.reload()} className="flex flex-col items-start space-y-0" aria-label="Sabri Helpage Home">
                        <span
                            className="text-2xl font-handwriting tracking-tight font-extrabold leading-none"
                            style={{ color: LOGO_RED, fontFamily: 'cursive' }}
                        > 
                            SabriHelpAge
                        </span>
                        <div className="w-full h-px bg-white/50"></div>
                        <span
                            className="text-[0.6rem] italic font-semibold pt-1 text-gray-400"
                        > 
                            sarve bhavantu sukhinah
                        </span>
                    </button>
                    <div className="flex space-x-4 mt-6">
                        <a href="https://www.facebook.com/SabriHelpage/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="w-6 h-6 text-gray-400 hover:text-white transition" /></a>
                        <a href="https://twitter.com/SabriHelpage" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-6 h-6 text-gray-400 hover:text-white transition" /></a>
                        <a href="https://www.instagram.com/sabrihelpage/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="w-6 h-6 text-gray-400 hover:text-white transition" /></a>
                        <a href="https://www.youtube.com/@sabrihelpage" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><Youtube className="w-6 h-6 text-gray-400 hover:text-white transition" /></a>
                        <a href="https://www.linkedin.com/company/sabri-helpage/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin"><Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition" /></a>
                    </div>
                </div>
                
                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-4" style={{ color: ACCENT_ORANGE }}>Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> About Us</a></li>
                        <li><a href="#causes-section-anchor" onClick={() => document.getElementById('causes-section-anchor').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Our Causes</a></li>
                        <li><a href="#sociofare-section-anchor" onClick={() => document.getElementById('sociofare-section-anchor').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> The SocioFare</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> News & Blog</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Contact</a></li>
                    </ul>
                </div>
 
                {/* Get Involved */}
                <div>
                    <h4 className="text-lg font-bold mb-4" style={{ color: ACCENT_ORANGE }}>Get Involved</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Become a Volunteer</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Internships</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Careers</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Partner with Us</a></li>
                        <li><button onClick={() => {}} className="hover:text-white transition flex items-center text-left"><ChevronRight className="w-4 h-4 mr-2" /> Donate Securely</button></li>
                    </ul>
                </div>
 
                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-bold mb-4" style={{ color: ACCENT_ORANGE }}>Contact</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Mail className="w-4 h-4 inline mr-3 align-text-bottom" /> info@sabrihelpage.org</li>
                        <li><Calendar className="w-4 h-4 inline mr-3 align-text-bottom" /> +91-8877665544</li>
                        <li><Globe className="w-4 h-4 inline mr-3 align-text-bottom" /> 57A Global Park, New Delhi, 110001, India</li>
                    </ul>
                </div>
            </div>
 
            <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm text-gray-500">
                © 2025 Sabri Helpage. All rights reserved. | <a href="#" className="hover:text-white transition">Privacy Policy</a> | <a href="#" className="hover:text-white transition">Terms of Use</a>
            </div>
        </div>
    </footer>
);
 
// --- Hero Section ---
const HeroSection = ({ onReadMoreClick, onDonateClick }) => (
    <section id="home" className={`relative h-[600px] sm:h-[650px] md:h-[750px] flex items-center justify-center text-white text-center overflow-hidden`} style={{ backgroundColor: PRIMARY_DARK }}>
        <div className="absolute inset-0">
            <img
                src={IMAGE_URLS.HERO}
                alt="Community hands together showing unity and support"
                className="w-full h-full object-cover filter grayscale opacity-80"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x750/333333/FFFFFF?text=Hero+Image" }}
            />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-md sm:text-lg font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT_ORANGE }}>SABRI HELPAGE</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
                Serving society for more than a decade.
            </h1>
            <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
                Sabri Helpage is a dream powered by our Founder Aarti BR Singh, a psychoanalyst and an entrepreneur. It is focused on **Mental Health, Elderly Care, and Women & Children Welfare** to establish a society free from the prohibition of discrimination.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                <button
                    onClick={onReadMoreClick}
                    className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl text-lg hover:opacity-90`}
                    style={{ backgroundColor: ACCENT_ORANGE }}
                >
                    Read More
                </button>
                <button
                    onClick={onDonateClick}
                    className={`text-white px-8 py-3 rounded-full font-bold transition duration-300 shadow-xl text-lg hover:bg-gray-800`}
                    style={{ backgroundColor: PRIMARY_DARK, border: `2px solid ${ACCENT_ORANGE}` }}
                >
                    Support Us
                </button>
            </div>
        </div>
    </section>
);
 
 
// --- Home Page Component ---
const HomePage = ({ onDonateClick, onReadMoreClick, onCauseClick, onViewGalleryClick }) => {
    return (
        <> 
            <Header onDonateClick={onDonateClick} onReadMoreClick={onReadMoreClick} />
            <HeroSection onReadMoreClick={onReadMoreClick} onDonateClick={onDonateClick} />
            {/* Mission/What We Stand For (Refactored) */}
            <AboutSection onViewGalleryClick={onViewGalleryClick} /> 
            {/* Milestones and Video (New Combined Section) */}
            <MilestonesAndVideoSection /> 
            <CausesSection onDonateClick={onDonateClick} onCauseClick={onCauseClick} />
            <DonateCalloutSection onDonateClick={onDonateClick} />
            <SocioFareSection />
            <TestimonialsSection /> 
            <NewsSection />
            <Footer />
        </>
    );
};
 
// --- Main App Component to handle Routing ---
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [causePage, setCausePage] = useState(null);
 
    const handleNavigate = (page, detail = null) => {
        setCurrentPage(page);
        setCausePage(detail);
        window.scrollTo(0, 0); // Scroll to top on page change
    };
 
    const handleDonateClick = () => handleNavigate('donate');
    const handleReadMoreClick = () => handleNavigate('read-more');
    const handleCauseClick = (cause) => handleNavigate('cause-detail', cause);
    const handleViewGalleryClick = () => handleNavigate('gallery');
 
    if (currentPage === 'donate') {
        return <DonatePage onBack={() => handleNavigate('home')} />;
    }
 
    if (currentPage === 'read-more') {
        return <ReadMorePage onBack={() => handleNavigate('home')} />;
    }
    
    if (currentPage === 'gallery') {
        return <GalleryPage onBack={() => handleNavigate('home')} />;
    }
 
    if (currentPage === 'cause-detail') {
        switch (causePage) {
            case 'mental-health':
                return <MentalHealthPage onBack={() => handleNavigate('home')} />;
            case 'elderly-care':
                return <ElderlyCarePage onBack={() => handleNavigate('home')} />;
            case 'girl-education':
                return <GirlEducationPage onBack={() => handleNavigate('home')} />;
            default:
                return <HomePage onDonateClick={handleDonateClick} onReadMoreClick={handleReadMoreClick} onCauseClick={handleCauseClick} onViewGalleryClick={handleViewGalleryClick} />;
        }
    }
 
    return <HomePage onDonateClick={handleDonateClick} onReadMoreClick={handleReadMoreClick} onCauseClick={handleCauseClick} onViewGalleryClick={handleViewGalleryClick} />;
};
 
export default App;