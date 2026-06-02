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
    description: "One of the oldest and most prestigious research universities in the world, renowned for historic academia."
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
    description: "A world-class science, engineering, and business specialist located in the heart of London."
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
    description: "A leading global research powerhouse nestled in Canada's most diverse cultural tech hub."
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
    description: "Australia's number one university, integrating progressive global design and top employment results."
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
    description: "An exceptional, low-tuition, high-standard European tech hub focusing on research and core engineering."
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
    description: "Asia’s premier global university, leading computational advancements and entrepreneurship."
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
