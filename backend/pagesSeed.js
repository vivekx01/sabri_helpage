const pages = [
  // 1. HOME
  {
    slug: "home",
    title: "Home",
    sections: [
      {
        type: "hero",
        backgroundImage: IMAGE_URLS.HERO,
        headline: "Serving society for more than a decade.",
        subhead: "सर्वे भवन्तु सुखिनः",
        cta: { label: "Donate Now", targetSlug: "donate" }
      },
      {
        type: "stats",
        items: [
          { label: "Lives Impacted", value: "50K+" },
          { label: "Years Service", value: "12+" }
        ]
      },
      {
        type: "causes",
        items: [
          { title: "Mental Health", description: "2,500+ sessions", image: IMAGE_URLS.MENTAL_HEALTH },
          { title: "Elderly Care", description: "1,200+ elders", image: IMAGE_URLS.ELDERLY_CARE },
          { title: "Girl Education", description: "800+ girls", image: IMAGE_URLS.GIRL_EDUCATION }
        ]
      },
      {
        type: "stories",
        items: [
          {
            title: "Legal Aid Camp",
            date: "Nov 1, 2025",
            image: IMAGE_URLS.NEWS_1_LEGAL
          },
          {
            title: "Food Distribution",
            date: "Oct 15, 2025",
            image: IMAGE_URLS.NEWS_2_FOOD
          }
        ]
      },
      {
        type: "video",
        videoId: YOUTUBE_VIDEO_ID,
        title: "Our Impact Story"
      }
    ]
  },

  // 2. ABOUT
  {
    slug: "about",
    title: "About Us",
    sections: [
      {
        type: "mission",
        text: "Founded 2013. Mental health, elderly care, girl education."
      },
      {
        type: "team",
        members: [
          {
            name: "Aarti BR Singh",
            role: "Founder",
            image: "/images/team/aarti.jpg",
            description: "Visionary leader and founder of Sabri Helpage."
          },
          {
            name: "Md. Naushad",
            role: "Co-Founder",
            image: "/images/team/naushad.jpg",
            description: "Community service and program expansion."
          },
          {
            name: "Siraj Khan",
            role: "Treasurer",
            image: "/images/team/siraj.jpg",
            description: "Financial integrity and resource allocation."
          }
        ]
      },
      {
        type: "supporters",
        supporters: ["Google", "Microsoft", "Tata Trusts"]
      }
    ]
  },

  // 3. OUR CAUSES
  {
    slug: "our-causes",
    title: "Our Causes",
    sections: [
      {
        type: "cause",
        id: "mental-health",
        title: "Mental Health Awareness",
        image: IMAGE_URLS.MENTAL_HEALTH,
        description: "Free counseling and workshops.",
        services: ["Counseling", "Workshops", "Helpline"],
        impact: "2,500+ sessions | 150+ workshops"
      },
      {
        type: "cause",
        id: "elderly-care",
        title: "Elderly Care",
        image: IMAGE_URLS.ELDERLY_CARE,
        description: "Health checkups and support.",
        services: ["Health Checkups", "Medications", "Meals"],
        impact: "1,200+ elders | 24 camps/month"
      },
      {
        type: "cause",
        id: "girl-education",
        title: "Girl Child Education",
        image: IMAGE_URLS.GIRL_EDUCATION,
        description: "Scholarships and supplies.",
        services: ["Scholarships", "Supplies", "Tutoring"],
        impact: "800+ girls | 95% retention"
      }
    ]
  },

  // 4. GALLERY
  {
    slug: "gallery",
    title: "Gallery",
    sections: [
      {
        type: "images",
        items: [
          { url: "/images/gallery/community-outreach.jpg", caption: "Community Outreach" },
          { url: "/images/gallery/elderly-care.jpg", caption: "Elderly Care" },
          { url: "/images/gallery/education.jpg", caption: "Girl Education" },
          { url: "/images/gallery/mental-health.jpg", caption: "Mental Health Workshop" }
        ]
      }
    ]
  },

  // 5. SOCIOFARE
  {
    slug: "sociofare",
    title: "SocioFare Awards",
    sections: [
      {
        type: "intro",
        text: "Honoring those who serve society."
      },
      {
        type: "events",
        items: [
          { 
            title: "Award Ceremony #1", 
            date: "MAR 2025",
            image: "/images/sociofare/ceremony-1.jpg"
          },
          { 
            title: "Award Ceremony #2", 
            date: "MAR 2025",
            image: "/images/sociofare/ceremony-2.jpg"
          }
        ]
      }
    ]
  },

  // 6. ILC
  {
    slug: "ilc",
    title: "Impact Leaders Circle",
    sections: [
      {
        type: "intro",
        text: "Leaders driving social change."
      },
      {
        type: "focusAreas",
        areas: [
          "Community Development",
          "Education & Youth",
          "Health & Well-being"
        ]
      }
    ]
  },

  // 7. DONATE
  {
    slug: "donate",
    title: "Donate",
    sections: [
      {
        type: "form",
        headline: "Support Our Mission",
        tagline: "80G tax-exempt (50% deduction)",
        amounts: [500, 1000, 2500, 5000, 10000],
        frequencies: ["one-time", "monthly"],
        programs: [
          { id: "mental-health", label: "Mental Health" },
          { id: "elderly-care", label: "Elderly Care" },
          { id: "girl-education", label: "Girl Education" },
          { id: "general", label: "Where Needed" }
        ],
        fields: [
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", required: true },
          { name: "phone", label: "Phone", required: true }
        ]
      },
      {
        type: "impact",
        examples: [
          "₹500 = 1 counseling session",
          "₹1,000 = 1 elder's medicine/month"
        ]
      },
      {
        type: "faq",
        items: [
          { 
            question: "Is my donation tax-deductible?", 
            answer: "Yes! 80G registered. 50% tax deduction."
          }
        ]
      }
    ]
  },

  // 8. CONTACT
  {
    slug: "contact",
    title: "Contact",
    sections: [
      {
        type: "info",
        email: "contact@sabrihelpage.org",
        phone: "+91 [Phone]",
        address: "[Address], [City], India",
        hours: "Mon-Sat: 9-6"
      },
      {
        type: "form",
        fields: [
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", required: true },
          { name: "subject", label: "Subject", options: ["General", "Volunteer", "Donation"] },
          { name: "message", label: "Message", required: true }
        ]
      }
    ]
  },

  // 9. PRIVACY
  {
    slug: "privacy",
    title: "Privacy Policy",
    sections: [
      {
        type: "legal",
        updated: "Jan 2024",
        sections: [
          { title: "Collection", content: "Name, email, phone, donation details, PAN." },
          { title: "Use", content: "Process donations, send receipts. Never sell data." },
          { title: "Security", content: "SSL encryption, secure storage." },
          { title: "Rights", content: "Contact: privacy@sabrihelpage.org" }
        ]
      }
    ]
  },

  // 10. TERMS
  {
    slug: "terms",
    title: "Terms of Use",
    sections: [
      {
        type: "legal",
        updated: "Jan 2024",
        sections: [
          { title: "Acceptance", content: "Using site = agreement to terms." },
          { title: "Donations", content: "Voluntary, non-refundable. 80G eligible." },
          { title: "Content", content: "Personal use OK, no commercial use." },
          { title: "Law", content: "Indian law. Contact: legal@sabrihelpage.org" }
        ]
      }
    ]
  }
];

module.exports = pages;