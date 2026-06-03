import { Question, University } from "./types";

export const CUSTOM_COUNTRIES = [
  { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
  { name: "Canada", flag: "🇨🇦", code: "CA" },
  { name: "Australia", flag: "🇦🇺", code: "AU" },
  { name: "Switzerland", flag: "🇨🇭", code: "CH" },
  { name: "Singapore", flag: "🇸🇬", code: "SG" },
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ" },
  { name: "Ireland", flag: "🇮🇪", code: "IE" },
  { name: "Georgia", flag: "🇬🇪", code: "GE" },
  { name: "Russia", flag: "🇷🇺", code: "RU" },
  { name: "Uzbekistan", flag: "🇺🇿", code: "UZ" },
  { name: "Tajikistan", flag: "🇹🇯", code: "TJ" },
  { name: "Kazakhstan", flag: "🇰🇿", code: "KZ" },
  { name: "Kyrgyzstan", flag: "🇰🇬", code: "KG" },
  { name: "Albania", flag: "🇦🇱", code: "AL" },
  { name: "American Samoa", flag: "🇦🇸", code: "AS" },
  { name: "Armenia", flag: "🇦🇲", code: "AM" },
  { name: "Aruba", flag: "🇦🇼", code: "AW" }
];

export const getCountryFlag = (countryName: string): string => {
  if (!countryName) return "🗺️";
  const known = CUSTOM_COUNTRIES.find(c => c.name.toLowerCase() === countryName.trim().toLowerCase());
  if (known) return known.flag;
  
  const lower = countryName.toLowerCase();
  if (lower.includes("united kingdom") || lower.includes("uk")) return "🇬🇧";
  if (lower.includes("united states") || lower.includes("usa") || lower.includes("us")) return "🇺🇸";
  if (lower.includes("canada")) return "🇨🇦";
  if (lower.includes("australia")) return "🇦🇺";
  if (lower.includes("switzerland")) return "🇨🇭";
  if (lower.includes("singapore")) return "🇸🇬";
  if (lower.includes("new zealand")) return "🇳🇿";
  if (lower.includes("ireland")) return "🇮🇪";
  if (lower.includes("india")) return "🇮🇳";
  if (lower.includes("germany")) return "🇩🇪";
  if (lower.includes("france")) return "🇫🇷";
  if (lower.includes("georgia")) return "🇬🇪";
  if (lower.includes("russia")) return "🇷🇺";
  if (lower.includes("uzbekistan")) return "🇺🇿";
  if (lower.includes("tajikistan")) return "🇹🇯";
  if (lower.includes("kazakhstan")) return "🇰🇿";
  if (lower.includes("kyrgyzstan")) return "🇰🇬";
  if (lower.includes("albania")) return "🇦🇱";
  return "🏳️";
};

export const KB_UNIVERSITIES: University[] = [
  {
    name: "University of Oxford",
    country: "United Kingdom",
    ranking: 3,
    fees: "$25,000 - $35,000",
    acceptanceRate: "17%",
    tags: ["Research", "Historic"],
    characteristic: "Research, Historic",
    successStory: "Sarah Johnson: Studied MSc Computer Science at Oxford (From USA to UK, Class of 2024).",
    description: "One of the oldest and most prestigious research universities in the world, renowned for historic academia.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
    hotspots: [
      {
        name: "Bodleian Library",
        description: "Established in 1602, the iconic study room with massive vaulted ceilings and 13 million books.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
        vibe: "🤫 Quiet Elite Study"
      },
      {
        name: "Christ Church Meadow",
        description: "Lush green space bordered by the river Cherwell, perfect for contemplative evening walks.",
        image: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&q=80&w=600",
        vibe: "🌳 Riverside Oasis"
      },
      {
        name: "Clarendon Science Lab",
        description: "Leading-edge labs researching advanced physics, subatomic particles, and supercomputing.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600",
        vibe: "🔬 Historic Tech"
      }
    ],
    admissionDeadline: "January 15, 2027 (standard wave)",
    admissionRequirements: "IELTS 7.5+ or TOEFL 110+, target GPA 3.7+ (First-Class degree or equivalent)",
    cutoffScore: "IELTS 7.5 or equivalent",
    highestPlacementPackage: "£160,000 (~$204,000 USD)",
    averagePlacementPackage: "£85,000 (~$108,000 USD)",
    majorRecruiters: ["Oxford Sciences", "DeepMind", "Barclays", "McKinsey", "Goldman Sachs"],
    keyHiringSectors: ["AI Research", "Investment Banking", "Quantitative Trading", "Consulting"]
  },
  {
    name: "Imperial College London",
    country: "United Kingdom",
    ranking: 6,
    fees: "$30,000 - $40,000",
    acceptanceRate: "14%",
    tags: ["STEM", "Innovation"],
    characteristic: "STEM, Innovation",
    successStory: "Chen Wei: Studied MEng AI at Imperial College London (From China to UK, Class of 2023).",
    description: "A world-class science, engineering, and business specialist located in the heart of London.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    hotspots: [
      {
        name: "The Queen's Tower",
        description: "Imperial's iconic central landmark tower standing proud in the heart of the London campus.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=600",
        vibe: "🏰 Central Landmark"
      },
      {
        name: "Robotics & AI Center",
        description: "Creative workshop where neural-network drone prototypes and AI agents are designed.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
        vibe: "🤖 Brain-Power Coding"
      },
      {
        name: "Exhibition Road Courtyard",
        description: "Sleek pedestrian avenue linking colleges with science museums and active student bistros.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
        vibe: "☕ South Kensington Vibe"
      }
    ],
    admissionDeadline: "Late January (for STEM wave)",
    admissionRequirements: "IELTS 7.0+ or TOEFL 100+, strong GRE scores recommended for Finance routes",
    cutoffScore: "IELTS 7.0+ or equivalent",
    highestPlacementPackage: "£140,000 (~$178,000 USD)",
    averagePlacementPackage: "£72,000 (~$92,000 USD)",
    majorRecruiters: ["AstraZeneca", "Barclays", "DeepMind", "Goldman Sachs"],
    keyHiringSectors: ["BioTech", "Quantitative Finance", "AI Engineering", "Software Systems"]
  },
  {
    name: "University of Toronto",
    country: "Canada",
    ranking: 21,
    fees: "$35,000 - $45,000",
    acceptanceRate: "43%",
    tags: ["Diverse", "Research"],
    characteristic: "Diverse, Research",
    successStory: "Maria Silva: Studied MBA at University of Toronto (From Brazil to Canada, Class of 2024).",
    description: "A leading global research powerhouse nestled in Canada's most diverse cultural tech hub.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    hotspots: [
      {
        name: "King's College Circle",
        description: "Huge grassy meadow in the center of campus offering spectacular views of the old Gothic spires.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
        vibe: "🎓 Classical Campus Vibe"
      },
      {
        name: "Robarts Library Structure",
        description: "Historic Brutalist giant containing Canada's largest scientific database and quiet thesis alcoves.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600",
        vibe: "📚 Hardcore Study Mode"
      },
      {
        name: "MaRS Discovery Incubator",
        description: "Urban innovation lab accelerating medical, tech, and automated intelligence research startups.",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600",
        vibe: "🚀 Startup Hub"
      }
    ],
    admissionDeadline: "Mid-January to March 1 (varies by program)",
    admissionRequirements: "IELTS 7.0+ (minimum 6.5 in each section) or TOEFL 100+",
    cutoffScore: "IELTS 7.0 or TOEFL 100",
    highestPlacementPackage: "CAD 165,000 (~$120,000 USD)",
    averagePlacementPackage: "CAD 84,000 (~$61,000 USD)",
    majorRecruiters: ["Shopify", "RBC", "Deloitte", "Amazon Canada", "TD Bank Group"],
    keyHiringSectors: ["Technology Startups", "Retail Commerce", "Supply Chain Logistics", "SaaS Programs"]
  },
  {
    name: "University of Melbourne",
    country: "Australia",
    ranking: 14,
    fees: "$28,000 - $38,000",
    acceptanceRate: "70%",
    tags: ["Innovation", "Global"],
    characteristic: "Innovation, Global",
    successStory: "Emma Thompson: Studied MS Data Science at Stanford (From Australia to USA, Class of 2024) [Origin: Australian].",
    description: "Australia's number one university, integrating progressive global design and top employment results.",
    image: "https://images.unsplash.com/photo-1525920980442-e27417ec06b4?auto=format&fit=crop&q=80&w=800",
    hotspots: [
      {
        name: "The Sandstone Quadrangle",
        description: "Fabulous gothic courtyard surrounded by deep-shaded cloisters and sprawling green grass.",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
        vibe: "🏰 Heritage Court"
      },
      {
        name: "School of Design Atrium",
        description: "Stunning eco-atrium focusing on industrial architecture, spatial layout, and high-tech modeling.",
        image: "https://images.unsplash.com/photo-1512403754473-27855f33d4fc?auto=format&fit=crop&q=80&w=600",
        vibe: "📐 Avant-Garde Design"
      },
      {
        name: "University Southbank Hub",
        description: "Vibrant creative core hosting year-round indie concert series, food drives, and live exhibits.",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600",
        vibe: "🎨 Social & Arts"
      }
    ],
    admissionDeadline: "October 31 for Semester 1 (February), April 30 for Semester 2 (July)",
    admissionRequirements: "GPA 3.0+ (on 4.0 scale), IELTS 6.5+ (no band less than 6.0) or TOEFL 79+",
    cutoffScore: "IELTS 6.5 or equivalent",
    highestPlacementPackage: "AUD 155,000 (~$102,000 USD)",
    averagePlacementPackage: "AUD 78,000 (~$51,000 USD)",
    majorRecruiters: ["Atlassian", "Macquarie Group", "BHP", "PwC Australia", "ANZ Bank"],
    keyHiringSectors: ["Software Engineering", "Mining Infrastructure", "Business Analytics", "Financial Consulting"]
  },
  {
    name: "ETH Zurich",
    country: "Switzerland",
    ranking: 7,
    fees: "$1,500 - $3,000",
    acceptanceRate: "8%",
    tags: ["Engineering", "Research"],
    characteristic: "Engineering, Research",
    successStory: "Rajesh Kumar: Studied PhD Mechanical Engineering at ETH Zurich (From India to Switzerland, Class of 2023).",
    description: "An exceptional, low-tuition, high-standard European tech hub focusing on research and core engineering.",
    image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=800",
    hotspots: [
      {
        name: "Main Polyterrasse",
        description: "Grand stone terrace looking over the historic old town roofs of Zurich—breath-taking study break.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
        vibe: "🏔️ Swiss Horizon"
      },
      {
        name: "Einstein's Study Lounge",
        description: "Dedicated study workspace celebrating Albert Einstein, the university's legendary Nobel alumnus.",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
        vibe: "💡 Physics Legacy"
      },
      {
        name: "Hönggerberg Science City",
        description: "Latter-day science city focusing on molecular engineering, zero-emission structures, and biology.",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
        vibe: "🌲 Mountain Eco-STEM"
      }
    ],
    admissionDeadline: "November 1 to December 15 (for first/intercontinental round)",
    admissionRequirements: "Extremely high academic honors in Bachelor's degree (rigorous engineering/math checklist), IELTS 7.0+ or TOEFL 100+",
    cutoffScore: "IELTS 7.0 or equivalent",
    highestPlacementPackage: "CHF 175,000 (~$192,000 USD)",
    averagePlacementPackage: "CHF 98,000 (~$107,000 USD)",
    majorRecruiters: ["Google Zurich", "ABB", "Swiss Re", "Credit Suisse / UBS", "Hoffmann-La Roche"],
    keyHiringSectors: ["Robotics Systems", "Molecular Engineering", "Zero-Emission Tech", "Quantum Supercomputing"]
  },
  {
    name: "National University of Singapore (NUS)",
    country: "Singapore",
    ranking: 8,
    fees: "$20,000 - $30,000",
    acceptanceRate: "5%",
    tags: ["Asia Tech", "Featured Hub"],
    characteristic: "Featured Asia Tech Hub",
    successStory: "Perfect fit for global business and deep technological disruption in Southeast Asia.",
    description: "Asia’s premier global university, leading computational advancements and entrepreneurship.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800",
    hotspots: [
      {
        name: "UTown Green Center",
        description: "Masterpiece tropical quadrangle linking residential halls, study rooms, and organic food hubs.",
        image: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&q=80&w=600",
        vibe: "🌴 Biophilic UTown"
      },
      {
        name: "Supercomputing AI Labs",
        description: "The peak of high-tech machine learning computing research clusters and quantum chips in Asia.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
        vibe: "💻 Quantum Supercomputer"
      },
      {
        name: "Tropical Biosphere Canopy",
        description: "Magnificent greenhouse research zones exploring agricultural drone harvesting and urban crops.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
        vibe: "🌱 Green AI Research"
      }
    ],
    admissionDeadline: "December 15 to February 15 (standard intake cycle)",
    admissionRequirements: "GPA 3.8+ (on 4.0 scale) or top 10% class rank, IELTS 7.0+ or TOEFL 100+",
    cutoffScore: "IELTS 7.0 or equivalent",
    highestPlacementPackage: "SGD 180,000 (~$133,000 USD)",
    averagePlacementPackage: "SGD 88,000 (~$65,000 USD)",
    majorRecruiters: ["Shopee", "Grab", "Google Asia", "DBS Bank", "McKinsey Singapore"],
    keyHiringSectors: ["FinTech", "Automated Security Systems", "Cybersecurity", "E-Commerce", "E-Logistics"]
  }
];

export const VERIFIED_SUCCESS_STORIES = [
  {
    name: "Sarah Johnson",
    program: "MSc Computer Science",
    university: "University of Oxford",
    origin: "USA to UK",
    classOf: "2024",
    avatar: "👩‍💻"
  },
  {
    name: "Rajesh Kumar",
    program: "PhD Mechanical Engineering",
    university: "ETH Zurich",
    origin: "India to Switzerland",
    classOf: "2023",
    avatar: "👨‍🔬"
  },
  {
    name: "Maria Silva",
    program: "MBA",
    university: "University of Toronto",
    origin: "Brazil to Canada",
    classOf: "2024",
    avatar: "👩‍💼"
  },
  {
    name: "Chen Wei",
    program: "MEng AI",
    university: "Imperial College London",
    origin: "China to UK",
    classOf: "2023",
    avatar: "👨‍💻"
  },
  {
    name: "Emma Thompson",
    program: "MS Data Science",
    university: "Stanford University",
    origin: "Australia to USA",
    classOf: "2024",
    avatar: "👩‍💻"
  }
];

export const INTU_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Where would you like to pursue your academic career?",
    subtitle: "Select your dream host destination. Instantly match across 30+ countries.",
    fieldName: "country",
    options: CUSTOM_COUNTRIES.map(c => ({
      id: c.name.toLowerCase(),
      label: `${c.flag} ${c.name}`,
      value: c.name
    }))
  },
  {
    id: 2,
    title: "What is your primary area of interest?",
    subtitle: "Aligning your learning path with long-term regional career opportunities.",
    fieldName: "interest",
    options: [
      { id: "cs", label: "💻 Computer Science & AI", description: "Software development, data networks, machine learning", value: "Computer Science" },
      { id: "stem", label: "🔬 STEM & Engineering", description: "Mechanical, electrical, physical sciences & design", value: "STEM" },
      { id: "business", label: "📈 Business / MBA", description: "Finance, strategic leadership, and management", value: "Business" },
      { id: "data", label: "📊 Data Science & Stats", description: "Advanced analytics, database management, and tracking", value: "Data Science" },
      { id: "creative", label: "🎨 Arts & Humanities", description: "Media, historic preservation, and creative design", value: "Arts" },
      { id: "general", label: "🌍 Other / Multidisciplinary", description: "General education, language, or social fields", value: "General" }
    ]
  },
  {
    id: 3,
    title: "What is your target level of study?",
    subtitle: "Find the entry path that corresponds to your academic background.",
    fieldName: "level",
    options: [
      { id: "bachelors", label: "🎓 Bachelor's Degree", description: "Undergraduate programs of 3-4 years", value: "Bachelor's" },
      { id: "masters", label: "🎓 Master's / Postgraduate", description: "Specialized MSc, MA, or MBA programs of 1-2 years", value: "Master's" },
      { id: "phd", label: "🧪 PhD / Doctorate", description: "Advanced research fellowships and PhD study", value: "PhD" },
      { id: "diploma", label: "📜 Associate Degree / Diploma", description: "Accelerated skill focus for immediate work", value: "Diploma" }
    ]
  },
  {
    id: 4,
    title: "What is your annual tuition budget?",
    subtitle: "SEAES filters matches to help you skip debt and locate affordable options.",
    fieldName: "budget",
    options: [
      { id: "minimal", label: "🌿 Ultra-Low Budget ($1,500 - $3,000 / year)", description: "Best for countries like Switzerland (ETH Zurich)", value: "Ultra-Low" },
      { id: "low", label: "🌻 Moderate Budget ($20,000 - $25,000 / year)", description: "Lower tuition hubs and state sponsorships", value: "Moderate" },
      { id: "medium", label: "🍁 Premium Budget ($25,000 - $35,000 / year)", description: "Standard international tuition (UK, Canada, Australia)", value: "Premium" },
      { id: "high", label: "💎 Luxury Budget ($35,000+ / year)", description: "Elite research universities", value: "High" }
    ]
  },
  {
    id: 5,
    title: "How do you prefer to attend lectures?",
    subtitle: "Accommodate your personal commitments or part-time work goals.",
    fieldName: "mode",
    options: [
      { id: "oncampus", label: "🏫 Full-Time On-Campus", description: "Traditional study with maximum network benefits", value: "On-Campus" },
      { id: "hybrid", label: "🌐 Hybrid Study Model", description: "Split online seminars with periodic campus labs", value: "Hybrid" },
      { id: "online", label: "🖥️ 100% Online & Flexible", description: "Study remote at your own flexible study pacing", value: "Online" }
    ]
  },
  {
    id: 6,
    title: "What describes your ideal campus style & focus?",
    subtitle: "Different cultures match different personal growth paths.",
    fieldName: "lifestyle",
    options: [
      { id: "research", label: "🔍 Research & Historic Focus", description: "Deep academic records, library facilities, and legacies", value: "Research-led" },
      { id: "stem_innov", label: "💡 STEM & Engineering Innovation", description: "Cutting-edge prototyping labs, incubators, and startups", value: "STEM-Innovation" },
      { id: "diverse", label: "🤝 Highly Diverse & Global Network", description: "Vibrant international population and social events", value: "Diverse-Global" },
      { id: "industry", label: "🏭 Direct Industry Partnerships", description: "Co-op programs, placement tracks, and work guidance", value: "Industry-Partnerships" }
    ]
  },
  {
    id: 7,
    title: "What is your English proficiency level?",
    subtitle: "Helps us index programs with matching entry criteria.",
    fieldName: "proficiency",
    options: [
      { id: "fluent", label: "⭐ Expert / Native Speaker", description: "Confident speaking, reading, and listening", value: "Expert" },
      { id: "pro", label: "💬 Upper Intermediate", description: "Good professional command of the language", value: "Intermediate" },
      { id: "pre", label: "✏️ Practical / Basic", description: "Know basic terms, planning to take IELTS/TOEFL", value: "Basic" },
      { id: "none", label: "❌ No English Certificate Yet", description: "Interested in preparatory pathway courses", value: "None" }
    ]
  },
  {
    id: 8,
    title: "What is your current employment/career status?",
    subtitle: "We prioritize resources, internships, and entry channels based on status.",
    fieldName: "employmentStatus",
    options: [
      { id: "unemployed", label: "💼 Currently Unemployed / Career Changing", description: "Tailored counseling to transition back into high-demand roles", value: "Unemployed-Transition" },
      { id: "student", label: "🎒 Fresh graduate or Student", description: "Direct advancement to higher learning", value: "Student" },
      { id: "employed", label: "👔 Employed Professional", description: "Part-time or executive options to upskill", value: "Employed" }
    ]
  },
  {
    id: 9,
    title: "Would you like free 1-on-1 advisor assistance?",
    subtitle: "SEAES includes verified expert education consultants 100% Free.",
    fieldName: "counsellorNeeded",
    options: [
      { id: "yes_urgent", label: "🚀 Yes, connect me instantly", description: "Assign counsellor who specializes in job transitions", value: "true" },
      { id: "no_general", label: "📦 Not right now, I'll explore alone", description: "Can enable later from my central dashboard", value: "false" }
    ]
  },
  {
    id: 10,
    title: "What is your interest level in scholarships?",
    subtitle: "FindCourse provides database access for global scholarship options.",
    fieldName: "scholarshipInterest",
    options: [
      { id: "high", label: "💸 Crucial - Need funding to enroll", description: "Filter for merit-based or geographic scholarship schemes", value: "High" },
      { id: "mod", label: "🌟 Interested - Helpful but not dealbreaker", description: "Search for low-interest loans or general bursaries", value: "Medium" },
      { id: "low", label: "🛡️ Self-Funded", description: "I do not require study financial aid", value: "Low" }
    ]
  }
];

export const PLATFORM_STATS = [
  { name: "Matching Accuracy", value: 95, unit: "%", color: "#ef4444" },
  { name: "Partner Universities", value: 500, unit: "+", color: "#a855f7" },
  { name: "Global Countries", value: 30, unit: "+", color: "#3b82f6" },
  { name: "Students Assisted", value: 10000, unit: "+", color: "#10b981" }
];

export const COST_COMPARISON_DATA = [
  { name: "ETH Zurich", fees: 2250, ranking: 7, acceptance: 8 },
  { name: "U Melbourne", fees: 33000, ranking: 14, acceptance: 70 },
  { name: "U Toronto", fees: 40000, ranking: 21, acceptance: 43 },
  { name: "Oxford", fees: 30000, ranking: 3, acceptance: 17 },
  { name: "Imperial Col.", fees: 35000, ranking: 6, acceptance: 14 },
  { name: "Singapore NUS", fees: 25000, ranking: 8, acceptance: 5 }
];
