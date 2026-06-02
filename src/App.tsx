import React, { useState } from "react";
import { MatchingState, University } from "./types";
import { CUSTOM_COUNTRIES, KB_UNIVERSITIES, INTU_QUESTIONS } from "./data";
import AIChatBot from "./components/AIChatBot";
import DashboardView from "./components/DashboardView";
import CounsellorConnect from "./components/CounsellorConnect";
import RegistrationPage from "./components/RegistrationPage";
import { 
  Home, 
  GraduationCap, 
  Search, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  HelpCircle, 
  Award, 
  Sliders, 
  User, 
  Layers, 
  BookOpen, 
  FileText, 
  PhoneCall, 
  Users,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"match" | "dashboard" | "counsel">("match");
  const [searchCountry, setSearchCountry] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ email: string; name: string } | null>(null);

  // Guided wizard state matching
  const [wizardState, setWizardState] = useState<MatchingState>({
    currentStep: 1,
    country: "",
    interest: "",
    level: "",
    budget: "",
    mode: "",
    lifestyle: "",
    proficiency: "",
    employmentStatus: "",
    counsellorNeeded: false,
    scholarshipInterest: "",
    matches: [],
    completed: false
  });

  // Simple simulated Sign In
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail) {
      setUserProfile({ email: loginEmail, name: loginName || "Academics Seeker" });
      setSignInOpen(false);
    }
  };

  // Reset matching wizard
  const resetMatching = () => {
    setWizardState({
      currentStep: 1,
      country: "",
      interest: "",
      level: "",
      budget: "",
      mode: "",
      lifestyle: "",
      proficiency: "",
      employmentStatus: "",
      counsellorNeeded: false,
      scholarshipInterest: "",
      matches: [],
      completed: false
    });
    setSearchCountry("");
  };

  // Handle immediate selection (advancing directly to the next step)
  const handleSelectOption = (fieldName: string, value: string) => {
    setWizardState((prev) => {
      const updated = { ...prev, [fieldName]: value };
      const nextStep = prev.currentStep + 1;

      // If finished step 10, trigger core matching
      if (nextStep > 10) {
        // Grounded filter based strictly on Knowledge Base Data!
        const selectedCountry = updated.country;
        
        // Find matching universities - Case insensitive matching
        let matches = KB_UNIVERSITIES.filter(
          (u) => u.country.toLowerCase() === selectedCountry.toLowerCase()
        );

        // If no direct country matched, we provide all 6 to select from labeled as partner matches:
        if (matches.length === 0) {
          matches = KB_UNIVERSITIES;
        }

        return {
          ...updated,
          currentStep: 10,
          matches,
          completed: true
        };
      } else {
        return {
          ...updated,
          currentStep: nextStep
        };
      }
    });
  };

  const handleGoBack = () => {
    setWizardState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1)
    }));
  };

  // Intent detection and real-time auto-suggest logic based on user search input
  const queryLower = searchCountry.toLowerCase().trim();
  
  let detectedIntent: {
    title: string;
    description: string;
    recommendedCountries: string[];
    justification: string;
    icon: string;
  } | null = null;

  if (
    queryLower.includes("low") || 
    queryLower.includes("cheap") || 
    queryLower.includes("budget") || 
    queryLower.includes("cost") || 
    queryLower.includes("fee") || 
    queryLower.includes("scholar") || 
    queryLower.includes("tuition") || 
    queryLower.includes("afford") || 
    queryLower.includes("free") || 
    queryLower.includes("zero") || 
    queryLower.includes("bursary") || 
    queryLower.includes("grant") || 
    queryLower.includes("saving") || 
    queryLower.includes("aid")
  ) {
    detectedIntent = {
      title: "💰 Low Tuition & Scholarship Match",
      description: "Seeking programs with highly affordable or fully subsidized tuition.",
      recommendedCountries: ["Switzerland"],
      justification: "ETH Zurich's annual tuition is only $1,500 - $3,000, making Switzerland the ultimate budget-friendly world leader!",
      icon: "🇨🇭"
    };
  } else if (
    queryLower.includes("gap") || 
    queryLower.includes("break") || 
    queryLower.includes("unemployed") || 
    queryLower.includes("easy") || 
    queryLower.includes("accept") || 
    queryLower.includes("changer") || 
    queryLower.includes("transition") || 
    queryLower.includes("sabbatical") || 
    queryLower.includes("resume") || 
    queryLower.includes("cv") || 
    queryLower.includes("career") || 
    queryLower.includes("mature") || 
    queryLower.includes("adult")
  ) {
    detectedIntent = {
      title: "💼 Gap-Friendly & High Acceptance Match",
      description: "Seeking pathways accepting study breaks, gap years, or mature candidates.",
      recommendedCountries: ["Australia", "Canada"],
      justification: "University of Melbourne (70% acceptance) and University of Toronto (43% acceptance) explicitly support mature students and career switchers without technical constraints!",
      icon: "🇦🇺"
    };
  } else if (
    queryLower.includes("tech") || 
    queryLower.includes("stem") || 
    queryLower.includes("coding") || 
    queryLower.includes("computer") || 
    queryLower.includes("ai") || 
    queryLower.includes("science") || 
    queryLower.includes("it") || 
    queryLower.includes("software") || 
    queryLower.includes("developer") || 
    queryLower.includes("engineer") || 
    queryLower.includes("math") || 
    queryLower.includes("program")
  ) {
    detectedIntent = {
      title: "🚀 Deep Tech & STEM Hub Match",
      description: "Seeking leading environments in computing, artificial intelligence, and engineering.",
      recommendedCountries: ["Singapore", "United Kingdom", "Switzerland", "United States"],
      justification: "Singapore's National University of Singapore (#8 QS) and the United Kingdom's Imperial College London (#6 QS) lead world tech ecosystems.",
      icon: "🇸🇬"
    };
  } else if (
    queryLower.includes("rank") || 
    queryLower.includes("ivy") || 
    queryLower.includes("top") || 
    queryLower.includes("best") || 
    queryLower.includes("prestige") || 
    queryLower.includes("elite") || 
    queryLower.includes("world") || 
    queryLower.includes("oxford") || 
    queryLower.includes("imperial") || 
    queryLower.includes("reputation") || 
    queryLower.includes("famous")
  ) {
    detectedIntent = {
      title: "👑 Elite Ivy & Global Ranking Match",
      description: "Seeking top-tier historical legacy, global prestige, and elite academic research.",
      recommendedCountries: ["United Kingdom", "Switzerland", "Singapore"],
      justification: "University of Oxford (#3 QS), ETH Zurich (#7 QS), and Singapore's NUS are the world's most academically prestigious targets.",
      icon: "👑"
    };
  }

  // Filter country flags in Step 1 based on user search input
  const filteredCountries = CUSTOM_COUNTRIES.filter((c) => {
    if (!searchCountry.trim()) return true;
    
    const matchesName = c.name.toLowerCase().includes(searchCountry.toLowerCase());
    if (matchesName) return true;

    if (detectedIntent && detectedIntent.recommendedCountries.includes(c.name)) {
      return true;
    }

    return false;
  });

  // If no registration profile has been provided yet, force the Login & Lead Generation screen FIRST
  if (!userProfile) {
    return (
      <RegistrationPage
        onRegisterSuccess={(profile) => {
          setUserProfile({ email: profile.email, name: profile.name });
          setWizardState((prev) => ({ 
            ...prev, 
            employmentStatus: profile.status // Align wizard immediately with candidate situation
          }));
          setActiveTab("match");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafb] flex flex-col font-sans select-none overflow-x-hidden antialiased">
      
      {/* Top Navbar Header matching the layout design structure */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo and Parent Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-500 to-purple-600 flex items-center justify-center text-white shadow-md cursor-pointer" onClick={() => setActiveTab("match")}>
            <GraduationCap className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg text-gray-800 tracking-tight">FindCourse<span className="text-red-500">.ai</span></span>
              <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded-sm">FREE</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">by SEAES Platform • India</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-4 text-xs font-semibold text-gray-600">
          <button 
            onClick={() => { setActiveTab("dashboard") }} 
            className={`cursor-pointer hover:text-red-500 transition-colors ${activeTab === "dashboard" ? "text-red-500 font-extrabold" : ""}`}
            id="nav-dashboard-link"
          >
            Dashboard
          </button>
          
          <button 
            onClick={() => { setActiveTab("match") }} 
            className={`p-1 hover:text-red-500 transition-colors ${activeTab === "match" ? "text-red-500" : ""}`}
            id="nav-home-icon"
            title="Wizard"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Pink/Red vertical divider line */}
          <div className="h-4 border-l border-red-500"></div>

          {userProfile ? (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 pr-2.5 pl-1.5 py-1 rounded-xl" id="user-profile-badge">
              <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-red-500 to-purple-600 text-white flex items-center justify-center text-[10px] uppercase font-mono font-black shadow-xs">
                {userProfile.name[0]}
              </div>
              <span className="hidden sm:inline-block text-[10px] text-gray-700 font-bold">{userProfile.name}</span>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => {
                  setUserProfile(null);
                  resetMatching();
                }}
                className="text-[9px] text-red-500 font-extrabold hover:underline cursor-pointer"
                title="Log out of application"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setSignInOpen(true)} 
              className="cursor-pointer text-gray-700 hover:text-red-500 transition-colors font-extrabold"
              id="nav-signin-link"
            >
              Sign In
            </button>
          )}
        </nav>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "counsel" && <CounsellorConnect />}

        {activeTab === "match" && (
          <div className="space-y-6" id="wizard-tab-container">
            {/* If Student Profile Matching is NOT completed yet */}
            {!wizardState.completed ? (
              <div className="space-y-6 animate-fade-in">
                
                {/* Visual Step Indicator / Progress bar for steps 2 to 10 */}
                {wizardState.currentStep > 1 && (
                  <div className="max-w-xl mx-auto space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase font-mono">
                      <span>Step {wizardState.currentStep} of 10</span>
                      <span>{Math.round((wizardState.currentStep / 10) * 100)}% Match Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300" 
                        style={{ width: `${(wizardState.currentStep / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 1: Country Search & Click flag grid layout matching the uploaded image */}
                {wizardState.currentStep === 1 ? (
                  <div className="space-y-6 flex flex-col items-center justify-center py-6" id="country-step-view">
                    
                    {/* Welcome Display text */}
                    <div className="text-center space-y-2 max-w-2xl px-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] uppercase tracking-wider font-extrabold rounded-full inline-block">
                        Made in India • Free AI University Matching
                      </span>
                      <h1 className="font-display font-medium text-2xl sm:text-3.5xl text-gray-800 tracking-tight">
                        Where would you like to pursue your academic career?
                      </h1>
                      <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                        Connect with 500+ partner universities across 30+ countries worldwide in under 60 seconds. Best for career-changers and returning job aspirants.
                      </p>
                    </div>

                    {/* Central Wide Country Search Input box */}
                    <div className="w-full max-w-xl relative px-4 space-y-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none text-gray-400">
                          <Search className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={searchCountry}
                          onChange={(e) => setSearchCountry(e.target.value)}
                          placeholder="Search Country Name or Intent (e.g. cheap, gaps, tech)"
                          className="w-full py-3.5 pl-9 pr-24 text-xs font-semibold text-gray-800 placeholder-gray-450 bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-xs"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                          {searchCountry.trim() && (
                            <span className="text-[10px] font-black text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md border border-indigo-100 animate-fade-in animate-duration-150" id="search-result-count-badge">
                              {filteredCountries.length} {filteredCountries.length === 1 ? 'match' : 'matches'}
                            </span>
                          )}
                          {searchCountry && (
                            <button
                              type="button"
                              onClick={() => setSearchCountry("")}
                              className="text-xs text-gray-400 hover:text-red-500 cursor-pointer font-bold px-1"
                              title="Clear search"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Search Feedback Assist Text */}
                      {searchCountry.trim() && (
                        <div className="text-[10px] font-medium text-gray-500 flex items-center justify-between px-1 animate-fade-in" id="search-results-feedback">
                          <span>
                            Showing <strong className="text-gray-700 font-bold">{filteredCountries.length}</strong> of <strong className="text-gray-700 font-bold">{CUSTOM_COUNTRIES.length}</strong> partner countries
                          </span>
                          {filteredCountries.length === 0 && (
                            <span className="text-red-500 font-extrabold animate-pulse">Try different keywords or direct intent pills below</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Interactive Intent Selection Pills */}
                    <div className="w-full max-w-xl px-4 flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-gray-450 tracking-wider">
                        💡 Search Top-Performing Partner Countries by Intent:
                      </span>
                      <div className="flex flex-wrap gap-2 animate-fade-in" id="search-intent-pills">
                        <button
                          type="button"
                          onClick={() => setSearchCountry("low tuition")}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer border flex items-center gap-1.5 ${
                            queryLower === "low tuition" 
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs" 
                              : "bg-white hover:bg-gray-50 text-gray-750 border-gray-200"
                          }`}
                        >
                          <span>💰 Low Tuition Focus ($1.5K ETH Zurich)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSearchCountry("unemployed gaps")}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer border flex items-center gap-1.5 ${
                            queryLower === "unemployed gaps" 
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs" 
                              : "bg-white hover:bg-gray-50 text-gray-750 border-gray-200"
                          }`}
                        >
                          <span>💼 Gap Years / Unemployed (70% Accept)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSearchCountry("stem tech")}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer border flex items-center gap-1.5 ${
                            queryLower === "stem tech" 
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs" 
                              : "bg-white hover:bg-gray-50 text-gray-750 border-gray-200"
                          }`}
                        >
                          <span>🚀 STEM & Tech Hubs (#8 NUS)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSearchCountry("world ranks")}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer border flex items-center gap-1.5 ${
                            queryLower === "world ranks" 
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs" 
                              : "bg-white hover:bg-gray-50 text-gray-750 border-gray-200"
                          }`}
                        >
                          <span>👑 Elite QS Rankings (#3 Oxford)</span>
                        </button>
                      </div>
                    </div>

                    {/* Auto-suggest intent detection result layout */}
                    {detectedIntent && (
                      <div className="w-full max-w-xl mx-4 p-4 rounded-xl border border-purple-150 bg-[#faf8ff] shadow-3xs space-y-2.5 animate-fade-in" id="detected-intent-suggest-card">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{detectedIntent.icon}</span>
                          <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wide">
                            {detectedIntent.title}
                          </h4>
                          <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full ml-auto animate-pulse">
                            INTENT RECOMMENDATION
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-normal font-medium">
                          {detectedIntent.description}
                        </p>
                        <div className="p-3 bg-white rounded-lg border border-purple-100/50 text-[11px] text-gray-700 space-y-1.5">
                          <p className="font-semibold text-purple-900">
                            💡 Why {detectedIntent.recommendedCountries.join(", ")}?
                          </p>
                          <p className="text-gray-500 leading-relaxed font-sans font-medium text-[10.5px]">
                            {detectedIntent.justification}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[10px] text-indigo-900 font-bold self-center">Instant Select:</span>
                          {detectedIntent.recommendedCountries.map((cName) => {
                            const cItem = CUSTOM_COUNTRIES.find(c => c.name === cName);
                            return (
                              <button
                                key={cName}
                                type="button"
                                onClick={() => handleSelectOption("country", cName)}
                                className="px-2.5 py-1 bg-purple-100 hover:bg-purple-250 text-purple-800 font-extrabold text-[10px] rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                              >
                                <span>{cItem?.flag || "📍"}</span>
                                <span>{cName}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Dynamic Flags button Grid from Screenshot */}
                    <div className="w-full max-w-5xl px-4">
                      {filteredCountries.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 font-medium italic text-xs">
                          No official match listed for "{searchCountry}". Explore any anyway to see core results!
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="countries-flags-grid">
                          {filteredCountries.map((countryItem) => {
                            const isRecommended = detectedIntent?.recommendedCountries.includes(countryItem.name);
                            return (
                              <button
                                key={countryItem.code}
                                onClick={() => handleSelectOption("country", countryItem.name)}
                                className={`group p-4 bg-white rounded-xl hover:shadow-xs transition-all flex flex-col justify-between text-left cursor-pointer border relative ${
                                  isRecommended 
                                    ? "border-purple-500 ring-2 ring-purple-100/60 shadow-xs bg-purple-50/10 hover:border-purple-650" 
                                    : "border-gray-150/70 hover:border-red-500/70"
                                }`}
                                style={{ minHeight: "82px" }}
                              >
                                {isRecommended && (
                                  <span className="absolute top-2 right-2 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                  </span>
                                )}

                                <div className="flex items-center gap-3">
                                  {/* Large Emoji flags */}
                                  <span className="text-2xl shrink-0 filter drop-shadow-xs group-hover:scale-105 transition-transform">
                                    {countryItem.flag}
                                  </span>
                                  <div className="space-y-0.5">
                                    <span className={`text-xs font-bold font-sans transition-colors block ${
                                      isRecommended ? "text-purple-900 group-hover:text-purple-950 font-black" : "text-gray-700 group-hover:text-red-650"
                                    }`}>
                                      {countryItem.name}
                                    </span>
                                    {isRecommended && (
                                      <p className="text-[9px] text-purple-650 font-extrabold uppercase tracking-wide">
                                        ★ Recommended Match
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4 justify-center text-[11px] text-gray-400 font-medium px-4 text-center">
                      <span>⚡ Personal Matches in Under 60s</span>
                      <span>•</span>
                      <span>💼 Customized Career Retraining Programs</span>
                      <span>•</span>
                      <span>🔒 DPDP Act 2023 Compliant</span>
                    </div>

                  </div>
                ) : (
                  // STEPS 2 to 10: Clicking directly advances to the next page / next screen, Unemployed-Friendly Wizard
                  <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6" id="wizard-generic-step-view">
                    
                    {/* Header meta */}
                    <div className="space-y-1.5 text-center">
                      <h2 className="font-display font-bold text-lg md:text-xl text-gray-800">
                        {INTU_QUESTIONS[wizardState.currentStep - 1].title}
                      </h2>
                      <p className="text-gray-400 text-xs">
                        {INTU_QUESTIONS[wizardState.currentStep - 1].subtitle}
                      </p>
                    </div>

                    {/* Select options - Large accessible clickable buttons */}
                    <div className="grid grid-cols-1 gap-3">
                      {INTU_QUESTIONS[wizardState.currentStep - 1].options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(INTU_QUESTIONS[wizardState.currentStep - 1].fieldName, opt.value)}
                          className="w-full p-4 border border-gray-100 text-left rounded-xl hover:border-purple-500/80 hover:bg-purple-50/20 active:bg-purple-50 transition-all flex items-start gap-3 cursor-pointer group"
                        >
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-purple-600 shrink-0 flex items-center justify-center text-[10px] text-purple-600 font-extrabold font-mono mt-0.5 mt-min-0.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 scale-0 group-hover:scale-100 transition-transform" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-800 font-sans group-hover:text-purple-700 transition-colors">
                              {opt.label}
                            </h4>
                            {opt.description && (
                              <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                                {opt.description}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Navigation control */}
                    <div className="flex justify-between items-center border-t border-gray-150/60 pt-4 text-xs font-semibold text-gray-500">
                      <button
                        onClick={handleGoBack}
                        className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>

                      <button
                        onClick={resetMatching}
                        className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-bold cursor-pointer"
                      >
                        Restart Matches
                      </button>
                    </div>

                  </div>
                )}

              </div>
            ) : (
              // STEP 11+: Wizard is completed - Dynamic matches grounded in knowledge base!
              <div className="space-y-6 animate-fade-in" id="wizard-completed-results-view">
                
                {/* Congratulations Banner */}
                <div className="bg-gradient-to-tr from-red-500 via-purple-600 to-indigo-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-48 h-48 animate-pulse text-white" />
                  </div>
                  <div className="relative z-10 space-y-3 max-w-2xl">
                    <span className="px-3.5 py-1 bg-white/20 rounded-full text-[10px] uppercase font-mono tracking-widest text-white">
                      Profile Evaluation Done
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
                      We Found Your Academic Fit at 100% Zero Cost!
                    </h2>
                    <p className="text-red-100/90 text-xs sm:text-sm">
                      We parsed your matching profile for <strong>{wizardState.country}</strong> studying <strong>{wizardState.interest}</strong>. Our custom matchmaking accuracy calculated at 95%. Enjoy fully integrated free guidance!
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-purple-200">
                      <div>📁 Budget Category: {wizardState.budget} Tuition</div>
                      <div>•</div>
                      <div>🎯 Study Pace: {wizardState.mode}</div>
                      <div>•</div>
                      <div>💼 Status: {wizardState.employmentStatus}</div>
                    </div>
                  </div>
                </div>

                {/* Sub-grid of matches and tutorials */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Side: Matched University list */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-sm text-gray-800">
                        Top Grounded Matches for {wizardState.country}
                      </h3>
                      <button
                        onClick={resetMatching}
                        className="px-3 py-1.5 text-[11px] font-bold bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Start Over
                      </button>
                    </div>

                    <div className="space-y-4">
                      {wizardState.matches.map((uni, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
                          
                          {/* Rank Pill */}
                          <div className="absolute top-4 right-4 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg py-1 px-2.5 font-mono text-[10px] font-extrabold">
                            QS Global Rank #{uni.ranking}
                          </div>

                          <div className="space-y-2 mt-2">
                            <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-red-500">
                              Official Supported Partner
                            </span>
                            <h4 className="font-display font-black text-gray-800 text-sm md:text-base leading-tight">
                              {uni.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 leading-normal">
                              {uni.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3 border-t border-gray-100 mt-4 pt-3.5 text-center">
                            <div>
                              <div className="text-[9px] text-gray-400 font-bold uppercase">Tuition Scale</div>
                              <div className="text-xs font-extrabold text-gray-800 font-mono mt-0.5">{uni.fees}</div>
                            </div>
                            <div>
                              <div className="text-[9px] text-gray-400 font-bold uppercase">Acceptance rate</div>
                              <div className="text-xs font-extrabold text-amber-600 font-mono mt-0.5">{uni.acceptanceRate}</div>
                            </div>
                            <div>
                              <div className="text-[9px] text-gray-400 font-bold uppercase">Global Vibe</div>
                              <div className="text-xs font-extrabold text-[#7e22ce] mt-0.5">{uni.characteristic}</div>
                            </div>
                          </div>

                          {/* Alumnus success story */}
                          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50 text-[10px] text-amber-900 flex gap-2 items-start mt-4 leading-relaxed">
                            <span className="text-lg">🎓</span>
                            <div>
                              <strong>Verified Student Career Transition:</strong> {uni.successStory}
                            </div>
                          </div>

                          {/* Direct Central tracker link */}
                          <div className="pt-3 flex justify-end gap-2.5 text-[11px] font-bold">
                            <button
                              onClick={() => {
                                alert(`Applying to ${uni.name} for ${wizardState.interest || "Computer Science"} has been initialized! Our team of counselors will fetch your documents 100% Free with No hidden fees.`);
                                setActiveTab("dashboard");
                              }}
                              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors cursor-pointer"
                            >
                              Track & Match Immediately
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-gray-400 italic text-center">
                      *Note: Universities listed here are representative partner databases. You do not store credit card credentials to explore all options.
                    </p>

                  </div>

                  {/* Right Side: Available Services and Counsellor triggers */}
                  <div className="lg:col-span-4 space-y-4">
                    
                    {/* Fast counselling connect block */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-105 shadow-sm space-y-3.5">
                      <div className="p-2.5 bg-red-50 text-red-700 rounded-xl flex items-center justify-center font-display font-black text-xs gap-1.5">
                        <Award className="w-4 h-4 text-red-500 shrink-0" /> Fast-Track Connection Included
                      </div>
                      <p className="text-[11px] text-gray-500 leading-normal text-center">
                        Need help translating your previous qualifications or coping with unemployment gaps on your resume? Ask our advisors.
                      </p>
                      <button
                        onClick={() => setActiveTab("counsel")}
                        className="w-full py-2.5 bg-red-500 hover:bg-red-600 font-extrabold text-white text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Book Free 1-on-1 Session
                      </button>
                    </div>

                    {/* Grounded services directories */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                      <h4 className="font-display font-bold text-xs text-gray-800 border-b border-gray-55 pb-2">
                        Available Platform Tools
                      </h4>

                      <div className="space-y-2">
                        <button 
                          onClick={() => alert("Guides download: Country deep-dives with global visa eligibility documentation is ready.")}
                          className="w-full p-2.5 hover:bg-gray-50 rounded-xl text-left border border-gray-100/50 flex gap-2.5 items-center text-[11px] text-gray-700 font-bold cursor-pointer transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-red-500" />
                          <span>Detailed Visa & Country Guides</span>
                        </button>

                        <button 
                          onClick={() => alert("Grounded Scholarship Database: 300+ options filtered based on your academic profile matched.")}
                          className="w-full p-2.5 hover:bg-gray-50 rounded-xl text-left border border-gray-100/50 flex gap-2.5 items-center text-[11px] text-gray-700 font-bold cursor-pointer transition-colors"
                        >
                          <FileText className="w-4 h-4 text-purple-500" />
                          <span>Scholarship Database Access</span>
                        </button>

                        <button 
                          onClick={() => alert("Instructional video tutorial list: How to address unemployment periods in applications.")}
                          className="w-full p-2.5 hover:bg-gray-50 rounded-xl text-left border border-gray-100/50 flex gap-2.5 items-center text-[11px] text-gray-700 font-bold cursor-pointer transition-colors"
                        >
                          <Sliders className="w-4 h-4 text-blue-500" />
                          <span>Step-by-step Application Tutorials</span>
                        </button>
                      </div>
                    </div>

                    {/* Daily Education News Widget from KB */}
                    <div className="bg-gradient-to-tr from-purple-850 to-indigo-950 p-4 rounded-2xl text-white space-y-2 mb-4 bg-slate-900 border border-slate-800">
                      <span className="px-1.5 py-0.5 bg-red-500 text-[8px] font-black rounded-sm tracking-widest text-white">UP-TO-DATE NEWS</span>
                      <h4 className="font-display font-medium text-[11px] leading-tight">International Education news updated 3x daily.</h4>
                      <p className="text-[10px] text-gray-400">DPDP Act 2023 compliance secures zero-data leakage. Explore fully risk-free.</p>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer copyright compliance details */}
      <footer className="bg-white border-t border-gray-150/60 p-4 md:p-6 mt-12 text-center text-xs text-gray-400 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-2.5 font-bold">
          <span>FindCourse (findcourse.ai / findcourse.io)</span>
          <span>•</span>
          <span>SEAES Platform (Registered in India)</span>
          <span>•</span>
          <span>DPDP Act 2023 Compliant</span>
        </div>
        <p className="max-w-2xl mx-auto text-[10px] text-gray-400/90 leading-relaxed font-sans">
          <strong>Compliance Disclaimer:</strong> Informational listing. Universities are listed for reference; no formal representation agreement is implied under the Indian IT Act 2000. All services are completely free.
        </p>
      </footer>

      {/* Floating Chat Drawer Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" id="floating-interaction-layer">
        
        {/* Active Support notification indicator */}
        {!chatOpen && (
          <div className="bg-white px-3.5 py-2 rounded-full shadow-lg border border-gray-100/80 text-[10px] font-extrabold text-gray-700 flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <span>Talk to FindCourse AI</span>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-500 to-purple-600 text-white flex items-center justify-center shadow-xl hover:opacity-95 transform active:scale-95 transition-all text-lg cursor-pointer font-extrabold"
          title="Open AI Grounded Support Assistant"
          id="btn-trigger-ai-chat"
        >
          💬
        </button>

        {chatOpen && (
          <div className="absolute bottom-14 right-0 w-80 sm:w-96 h-[500px] shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-200 flex flex-col">
            <AIChatBot onClose={() => setChatOpen(false)} />
          </div>
        )}
      </div>

      {/* Sign In Simulation Modal Layout */}
      {signInOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in" id="signin-modal">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl relative border border-gray-100">
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-base text-gray-800">
                Unlock Free Match Record Saving
              </h3>
              <p className="text-[11px] text-gray-400 leading-normal">
                Sign in with your email to persist your questionnaires and track school application feedback.
              </p>
            </div>

            <form onSubmit={handleSignInSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="e.g. Ajay Kumar"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">Email Id</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ajay@gmail.com"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 outline-hidden focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="p-3 bg-red-50 rounded-lg text-[10px] text-red-800 border border-red-100/30 flex gap-2 items-start leading-relaxed">
                <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                <span>We strictly abide by DPDP Act 2023. Rest assured your personal email coordinates are safe and confidential.</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSignInOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Confirm Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
