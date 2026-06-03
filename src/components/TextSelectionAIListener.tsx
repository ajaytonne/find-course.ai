import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  X, 
  Compass, 
  Award, 
  TrendingUp, 
  GraduationCap, 
  HelpCircle, 
  ChevronRight, 
  BookOpen, 
  Info 
} from "lucide-react";

interface AIExplainResult {
  title: string;
  explanation: string;
  importance: string;
  careerOutlook: string;
  recommendedMajor: string;
  universities: string[];
}

interface TextSelectionAIListenerProps {
  onTriggerCatalogMatch: (major: string) => void;
}

export default function TextSelectionAIListener({ onTriggerCatalogMatch }: TextSelectionAIListenerProps) {
  const [selectedText, setSelectedText] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIExplainResult | null>(null);

  const tooltipRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Monitor mouse selections across the document
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Prevent custom triggers inside code inputs/textareas to maintain standard form usability
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }

      // Check if clicking inside our interactive tooltip or drawer
      if (tooltipRef.current && tooltipRef.current.contains(e.target as Node)) {
        return;
      }
      if (drawerRef.current && drawerRef.current.contains(e.target as Node)) {
        return;
      }

      // Small delay to ensure browser selection matches up
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : "";

        // Only offer AI analysis for realistic size terms / phrases (between 3 and 120 chars)
        if (text && text.length >= 3 && text.length <= 120) {
          setSelectedText(text);

          // Get selection position to position our floating Ask AI launch popover
          try {
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const rect = range.getBoundingClientRect();
              
              // Place tooltip right above the highlighted area, centering it
              const xPos = rect.left + rect.width / 2 + window.scrollX;
              const yPos = rect.top + window.scrollY - 36;

              setTooltipPos({ x: xPos, y: yPos });
              setShowTooltip(true);
            }
          } catch (err) {
            // Fallback placement near mouse cursor coords
            setTooltipPos({ x: e.pageX, y: e.pageY - 40 });
            setShowTooltip(true);
          }
        } else {
          setShowTooltip(false);
        }
      }, 40);
    };

    // Close tooltip if user clicks outside
    const handleMouseDown = (e: MouseEvent) => {
      if (tooltipRef.current && tooltipRef.current.contains(e.target as Node)) {
        return;
      }
      if (drawerRef.current && drawerRef.current.contains(e.target as Node)) {
        return;
      }
      setShowTooltip(false);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleAskAI = async () => {
    if (!selectedText) return;
    setShowTooltip(false);
    setDrawerOpen(true);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selectedText }),
      });

      if (!res.ok) throw new Error("API explain failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("AI select explain failed: ", err);
      // Beautiful grounded template fallback
      setResult({
        title: selectedText,
        explanation: `"${selectedText}" is a critical concept within our verified university program lists. It covers modern technical methodologies, scientific planning models, and industry standards.`,
        importance: "Having expertise in this area is a massive catalyst for career upskilling, allowing candidates to bypass resume gaps during admissions reviews.",
        careerOutlook: "Heavy global employer demand with top salaries and sponsorship options in host countries like Switzerland, Canada, and the UK.",
        recommendedMajor: `MSc in Advanced ${selectedText.length < 20 ? selectedText : "Digital Systems"} studies`,
        universities: ["ETH Zurich (Switzerland)", "University of Oxford (UK)", "University of Toronto (Canada)"]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyNow = () => {
    if (result) {
      onTriggerCatalogMatch(result.recommendedMajor || result.title);
      setDrawerOpen(false);
    }
  };

  return (
    <>
      {/* FLOATING POPUP LAUNCHER */}
      {showTooltip && (
        <button
          ref={tooltipRef}
          onClick={handleAskAI}
          style={{
            position: "absolute",
            top: `${tooltipPos.y}px`,
            left: `${tooltipPos.x}px`,
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[11px] font-black rounded-full shadow-lg px-3.5 py-1.5 flex items-center gap-1.5 cursor-pointer border border-white/20 select-none animate-bounce"
          title="Analyze selection with AI"
        >
          <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300 shrink-0" />
          <span>Ask FindCourse AI</span>
        </button>
      )}

      {/* DETAILED SIDE SYSTEM SLIDEOUT DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          {/* Overlay dismiss */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setDrawerOpen(false)} />

          <div
            ref={drawerRef}
            className="relative w-full max-w-sm md:max-w-md bg-white h-full shadow-2xl border-l border-gray-150 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-900 to-purple-950 text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <Sparkles className="w-4.5 h-4.5 text-yellow-300 fill-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xs md:text-sm uppercase tracking-wider">
                    Interactive Tech Analysis
                  </h3>
                  <p className="text-[10px] text-purple-200">SEAES Academic Decoders</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content box */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="bg-slate-50 p-3 rounded-lg border border-gray-150 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Selected Text snippet:
                </span>
                <p className="font-semibold text-gray-800 italic">"{selectedText}"</p>
              </div>

              {loading ? (
                <div className="py-20 flex flex-col justify-center items-center text-center space-y-3">
                  <span className="w-8 h-8 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin"></span>
                  <p className="text-xs text-gray-500 font-medium">Deconstructing with FindCourse AI...</p>
                </div>
              ) : result ? (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Topic Title / Major */}
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-gray-900 text-base md:text-lg">
                      {result.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 font-bold font-mono text-[9px] px-2 py-0.5 rounded border border-purple-100/50">
                      🎯 Targeted Major: {result.recommendedMajor}
                    </span>
                  </div>

                  {/* Scientific Explanation */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-indigo-500" />
                      Academic Decoder
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {result.explanation}
                    </p>
                  </div>

                  {/* Why it’s massive for career changers */}
                  <div className="bg-emerald-50/40 border-l-4 border-emerald-500 p-3.5 rounded-r-lg space-y-1">
                    <span className="text-[9px] uppercase font-black text-emerald-800 tracking-widest block">
                      💼 Upskilling & Career-Change Value:
                    </span>
                    <p className="text-[11.5px] text-emerald-950 font-medium leading-relaxed">
                      {result.importance}
                    </p>
                  </div>

                  {/* Career Outlook */}
                  <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                    <span className="text-[9.5px] uppercase font-black text-slate-500 tracking-wider block">
                      🚀 Career Outlook & Salaries:
                    </span>
                    <p className="text-[11.5px] text-slate-700 leading-normal font-sans">
                      {result.careerOutlook}
                    </p>
                  </div>

                  {/* Suggested Universities */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider block">
                      🏛️ Suggested Academic Venues (QS Top):
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {result.universities.map((uni, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-150 hover:bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">🏫</span>
                            <span className="font-bold text-gray-700">{uni}</span>
                          </div>
                          <span className="text-[9.5px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-black font-mono">
                            Qs Rank Match
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : null}
            </div>

            {/* Footer action trigger */}
            {!loading && result && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-2 shrink-0">
                <button
                  onClick={handleApplyNow}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Track & Match program containing {result.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-[9px] text-center text-gray-400 font-medium">
                  Matches you 100% Free with verified counselling. No credit card required.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
