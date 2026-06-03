import React, { useState } from "react";
import { University } from "../types";
import { getCountryFlag } from "../data";
import { 
  Award, 
  BookOpen, 
  ChevronRight, 
  Compass, 
  Eye, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  DollarSign,
  Users,
  MessageCircle,
  ThumbsUp
} from "lucide-react";

interface UniversityMatchCardProps {
  key?: any;
  uni: University;
  interest: string;
  onTrackImmediately: () => void;
}

export default function UniversityMatchCard({ uni, interest, onTrackImmediately }: UniversityMatchCardProps) {
  // -1 represent the main cover campus image
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number>(-1);
  const [selectedSeason, setSelectedSeason] = useState<"autumn" | "spring" | "regular">("regular");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "success" | "hotspots">("overview");

  // Multi-season filter simulation to make it extra interactive
  const getDisplayImageUrl = () => {
    if (activeHotspotIndex !== -1 && uni.hotspots && uni.hotspots[activeHotspotIndex]) {
      return uni.hotspots[activeHotspotIndex].image;
    }
    // Main campus image
    if (selectedSeason === "autumn") {
      return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"; // Rich autumn scene
    }
    if (selectedSeason === "spring") {
      return "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=800"; // Cherry spring blossoms
    }
    return uni.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800";
  };

  const getDisplayVibe = () => {
    if (activeHotspotIndex !== -1 && uni.hotspots && uni.hotspots[activeHotspotIndex]) {
      return uni.hotspots[activeHotspotIndex].vibe;
    }
    if (selectedSeason === "autumn") return "🍁 Warm Autumn Foliage";
    if (selectedSeason === "spring") return "🌸 Spring Bloom Season";
    return `✨ ${uni.characteristic}`;
  };

  const getDisplayDescription = () => {
    if (activeHotspotIndex !== -1 && uni.hotspots && uni.hotspots[activeHotspotIndex]) {
      return uni.hotspots[activeHotspotIndex].description;
    }
    return uni.description;
  };

  // Extract tuition numeric estimation is used for progress bar representation
  const getTuitionPercentage = (fees: string) => {
    if (fees.includes("1,500")) return 15; // Low-tuition Swiss example
    if (fees.includes("20,000")) return 50;
    if (fees.includes("28,000")) return 70;
    if (fees.includes("30,000")) return 78;
    return 90;
  };

  const getAcceptancePercentage = (rate: string) => {
    return parseInt(rate.replace("%", ""), 10) || 50;
  };

  return (
    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:grid md:grid-cols-12 md:min-h-[460px]">
      
      {/* Col 1: Interactive Media Sandbox Dashboard (col-span-5) */}
      <div className="md:col-span-5 bg-gray-50 flex flex-col relative border-b md:border-b-0 md:border-r border-gray-100">
        
        {/* Dynamic Image Canvas Box with hover parallax-like scaling */}
        <div className="relative h-60 md:h-full min-h-[220px] max-h-[360px] md:max-h-none overflow-hidden group/img">
          <img 
            src={getDisplayImageUrl()} 
            alt={uni.name} 
            className="w-full h-full object-cover transition-all duration-700 ease-out absolute inset-0"
            style={{ filter: "brightness(0.92)" }}
            referrerPolicy="no-referrer"
            key={activeHotspotIndex + selectedSeason} // Trigger transition on change
          />

          {/* Quick interactive action overlays */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="bg-gray-900/80 backdrop-blur-md text-white border border-white/10 rounded-lg py-1 px-2.5 font-mono text-[9px] font-black tracking-wide flex items-center gap-1 shadow-sm">
              👑 QS Rank #{uni.ranking}
            </span>
            <span className="bg-red-500 text-white rounded-lg py-1 px-2 font-sans text-[8.5px] font-black tracking-widest uppercase shadow-xs">
              PARTNER
            </span>
          </div>

          {/* Top-Right Interactive Favorite heart & Fullscreen Inspect buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
                isLiked 
                  ? "bg-red-500/90 hover:bg-red-600/90 text-white border-red-500" 
                  : "bg-white/80 hover:bg-white text-gray-700 border-gray-200/50"
              }`}
              title="Add to My Shortlist Favorites"
            >
              ❤️
            </button>
            <button
              onClick={() => setLightboxOpen(true)}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 border border-gray-200/50 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              title="View full-size photo"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Vibe glass overlay */}
          <div className="absolute bottom-3 left-3 z-10 bg-black/55 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 flex items-center gap-1.5 text-[9.5px] text-white font-extrabold font-mono tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            {getDisplayVibe()}
          </div>

          {/* Dynamic instruction tooltip overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center duration-300">
            <p className="text-white text-center text-xs font-bold font-sans bg-gray-900/90 py-2 px-4 rounded-xl border border-white/10 shadow-lg flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Explore Interactive Campus Hotspots Below!</span>
            </p>
          </div>
        </div>

        {/* Season Simulator and interactive controls under picture */}
        <div className="p-3.5 bg-white space-y-3 shrink-0 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider flex items-center gap-1">
              🗺️ Simulate Season Vibe:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => { setSelectedSeason("autumn"); setActiveHotspotIndex(-1); }}
                className={`px-2 py-0.5 rounded text-[8.5px] font-bold border transition-colors cursor-pointer ${
                  selectedSeason === "autumn" && activeHotspotIndex === -1
                    ? "bg-amber-100 text-amber-800 border-amber-300"
                    : "bg-gray-50 border-gray-150 hover:bg-gray-100 text-gray-500"
                }`}
              >
                🍁 Autumn
              </button>
              <button
                onClick={() => { setSelectedSeason("spring"); setActiveHotspotIndex(-1); }}
                className={`px-2 py-0.5 rounded text-[8.5px] font-bold border transition-colors cursor-pointer ${
                  selectedSeason === "spring" && activeHotspotIndex === -1
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-gray-50 border-gray-150 hover:bg-gray-100 text-gray-500"
                }`}
              >
                🌸 Spring
              </button>
              <button
                onClick={() => { setSelectedSeason("regular"); setActiveHotspotIndex(-1); }}
                className={`px-2 py-0.5 rounded text-[8.5px] font-bold border transition-colors cursor-pointer ${
                  selectedSeason === "regular" && activeHotspotIndex === -1
                    ? "bg-purple-100 text-purple-800 border-purple-300"
                    : "bg-gray-50 border-gray-150 hover:bg-gray-100 text-gray-500"
                }`}
              >
                ☀️ Normal
              </button>
            </div>
          </div>

          {/* Interactive hotspots grid */}
          <div className="space-y-1.5">
            <span className="text-[9.5px] font-bold uppercase text-gray-450 tracking-wider block">
              📍 Click to Teleport to Campus Hotspots:
            </span>
            <div className="grid grid-cols-4 gap-1.5" id="campus-hotspots-navigator">
              {/* Main anchor button */}
              <button
                onClick={() => setActiveHotspotIndex(-1)}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                  activeHotspotIndex === -1 
                    ? "border-red-500 bg-red-50/70 text-red-700 ring-1 ring-red-100" 
                    : "border-gray-150 hover:border-gray-300 hover:bg-gray-50 text-gray-600 bg-white"
                }`}
              >
                <span className="text-xs">🏛️</span>
                <span className="text-[8px] font-extrabold mt-0.5 truncate w-full">Cover</span>
              </button>
              
              {uni.hotspots?.map((hot, hIndex) => (
                <button
                  key={hIndex}
                  onClick={() => setActiveHotspotIndex(hIndex)}
                  className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                    activeHotspotIndex === hIndex 
                      ? "border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-100" 
                      : "border-gray-150 hover:border-gray-300 hover:bg-gray-50 text-gray-600 bg-white"
                  }`}
                >
                  <span className="text-xs">{hIndex === 0 ? "📚" : hIndex === 1 ? "🌳" : "🔬"}</span>
                  <span className="text-[8px] font-extrabold mt-0.5 truncate w-full">{hot.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Col 2: Academic Program Information & Dynamic Tab Actions (col-span-7) */}
      <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        
        {/* Head Block with title and interactive badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9.5px] font-extrabold uppercase font-mono tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-md border border-red-100 flex items-center gap-1">
              {getCountryFlag(uni.country)} {uni.country}
            </span>
            <span className="text-[9.5px] font-semibold text-gray-400">
              Verified Partner Code: fc-{uni.ranking}-{uni.acceptanceRate.replace("%", "")}
            </span>
          </div>

          <h4 className="font-display font-black text-gray-800 text-base md:text-xl leading-tight">
            {uni.name}
          </h4>

          {/* Custom Tabs inside Card to reduce height and boost interactivity */}
          <div className="flex border-b border-gray-100 pb-1.5 gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-[11px] font-bold border-b-2 pb-1.5 transition-all cursor-pointer ${
                activeTab === "overview" 
                  ? "border-red-500 text-gray-900 font-extrabold" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`text-[11px] font-bold border-b-2 pb-1.5 transition-all cursor-pointer ${
                activeTab === "stats" 
                  ? "border-red-500 text-gray-900 font-extrabold" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Academic Stats
            </button>
            <button
              onClick={() => setActiveTab("success")}
              className={`text-[11px] font-bold border-b-2 pb-1.5 transition-all cursor-pointer ${
                activeTab === "success" 
                  ? "border-red-500 text-gray-900 font-extrabold" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Alumni Success
            </button>
            <button
              onClick={() => setActiveTab("hotspots")}
              className={`text-[11px] font-bold border-b-2 pb-1.5 transition-all cursor-pointer ${
                activeTab === "hotspots" 
                  ? "border-red-500 text-gray-900 font-extrabold" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Hotspot Secrets
            </button>
          </div>
        </div>

        {/* Dynamic Tab Contents */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <div className="space-y-3.5 animate-fade-in">
              <p className="text-[11.5px] text-gray-500 leading-normal font-sans font-medium">
                {getDisplayDescription()}
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {uni.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-lg font-bold text-gray-600">
                    🌱 {tag}
                  </span>
                ))}
                <span className="text-[10px] bg-yellow-50 border border-yellow-100 text-amber-800 px-2.5 py-1 rounded-lg font-black uppercase">
                  💡 {uni.characteristic}
                </span>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-[10px] font-black uppercase text-purple-900 tracking-wider">
                Grounded University Admissions Profile:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tuition Cost Meter */}
                <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500 font-bold">Tuition Cost Scale</span>
                    <strong className="text-gray-700 font-black">{uni.fees}</strong>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500 h-full rounded-full" 
                      style={{ width: `${getTuitionPercentage(uni.fees)}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-400">
                    {getTuitionPercentage(uni.fees) < 30 ? "🌿 Outstanding Swiss Zero-Tuition alternative!" : "🍁 Standard premium world rate"}
                  </p>
                </div>

                {/* Acceptance Rate Difficulty */}
                <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500 font-bold">Admissions Acceptance</span>
                    <strong className="text-amber-600 font-black">{uni.acceptanceRate}</strong>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ width: `${getAcceptancePercentage(uni.acceptanceRate)}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-400">
                    {getAcceptancePercentage(uni.acceptanceRate) > 40 ? "💼 Gap-friendly acceptance for mature students" : "🧬 Fastidious selection process (#Qs-Elite)"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "success" && (
            <div className="space-y-3 animate-fade-in bg-amber-50/50 p-4 rounded-xl border border-amber-100/60">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <div>
                  <h5 className="text-[11.5px] font-black text-amber-900">
                    Interactive Verified Legacy Success Story
                  </h5>
                  <p className="text-[10px] text-gray-400 font-medium">Real student transit database match</p>
                </div>
              </div>
              <p className="text-[11px] text-amber-850 leading-relaxed italic">
                "{uni.successStory}"
              </p>
              <div className="pt-2 border-t border-amber-100/50 flex justify-between items-center text-[10px] text-amber-900 font-bold">
                <span>🎯 Matched target field: {interest || "General Study"}</span>
                <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  100% Free Visa Assistance Included
                </span>
              </div>
            </div>
          )}

          {activeTab === "hotspots" && (
            <div className="space-y-3.5 animate-fade-in bg-purple-50/30 p-4 rounded-xl border border-purple-100/60">
              <div className="flex items-center justify-between">
                <h5 className="text-[11px] font-extrabold uppercase text-purple-900 tracking-wide">
                  Explore Hotspot Details:
                </h5>
                <span className="text-[9px] text-gray-400">Active Campus Hotspots: 3 registered</span>
              </div>

              <div className="space-y-2">
                {uni.hotspots?.map((hot, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveHotspotIndex(index)}
                    className={`w-full p-2.5 rounded-lg border text-left flex justify-between items-center transition-all cursor-pointer ${
                      activeHotspotIndex === index 
                        ? "bg-purple-100/80 border-purple-300 text-purple-900 font-extrabold shadow-3xs" 
                        : "bg-white border-gray-150 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{index === 0 ? "📚" : index === 1 ? "🌳" : "🔬"}</span>
                      <span className="text-[10.5px] font-semibold">{hot.name}</span>
                    </div>
                    <span className="text-[9.5px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-gray-500 group-hover:bg-purple-200">
                      {hot.vibe}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Direct application action footer inside Card */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center">
          <div className="space-y-0.5 text-left">
            <span className="text-[9px] text-purple-500 font-black uppercase tracking-wider block">
              Global Support Vibe Index:
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-gray-800">
                100% SECURE & RELIABLE
              </span>
              <span className="text-xs text-gray-300">|</span>
              <span className="text-[10px] text-gray-500 font-medium">Free Counsel</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onTrackImmediately}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-[11px] font-extrabold transition-all duration-150 cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
            >
              <span>Track & Apply Free</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL VIEWER */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-55 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-4">
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <span className="text-white text-xs font-mono bg-white/15 px-3 py-1 rounded">
              {activeHotspotIndex === -1 ? "Main Campus Landscape" : uni.hotspots?.[activeHotspotIndex].name}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="text-white text-lg font-black bg-white/20 hover:bg-white/40 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              title="Close image inspect"
            >
              ✕
            </button>
          </div>
          <div className="max-w-4xl max-h-[80vh] relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <img
              src={getDisplayImageUrl()}
              alt={uni.name}
              className="w-full h-full object-contain max-h-[75vh]"
              referrerPolicy="no-referrer"
            />
            {/* Description text bar underneath in lightbox */}
            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-md p-4 text-white text-center">
              <h5 className="font-display font-black text-sm">{uni.name} - {activeHotspotIndex === -1 ? "Main Campus" : uni.hotspots?.[activeHotspotIndex].name}</h5>
              <p className="text-[11px] text-gray-300 mt-1 max-w-2xl mx-auto">{getDisplayDescription()}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
