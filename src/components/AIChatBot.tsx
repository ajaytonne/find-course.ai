import React, { useState, useEffect, useRef } from "react";
import { Message } from "../types";
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  User, 
  HelpCircle, 
  Loader2,
  GraduationCap,
  TrendingUp,
  Award,
  FileText
} from "lucide-react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onType?: () => void;
  onComplete?: () => void;
}

function TypewriterText({ text, speed = 8, onType, onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
        if (onType) onType();
      }, speed);
      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [index, text, speed, onType, onComplete]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index < text.length) {
      setDisplayedText(text);
      setIndex(text.length);
      if (onType) onType();
      if (onComplete) onComplete();
    }
  };

  return (
    <div 
      className="whitespace-pre-line font-sans relative cursor-pointer group/typewriter leading-relaxed" 
      onClick={handleSkip}
      title="Click to skip typing effect"
    >
      {displayedText}
      {index < text.length && (
        <span className="inline-block w-1.5 h-3.5 bg-red-500 ml-1.5 animate-pulse align-middle" />
      )}
      {index < text.length && (
        <span className="block text-[8px] text-gray-400 font-mono italic mt-1.5 opacity-0 group-hover/typewriter:opacity-100 transition-opacity">
          ⚡ Tap here to reveal instantly
        </span>
      )}
    </div>
  );
}

interface AIChatBotProps {
  onClose?: () => void;
  floating?: boolean;
  wizardState?: any;
}

export default function AIChatBot({ onClose, floating = false, wizardState }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your FindCourse.ai Assistant. Ask me anything about our partner universities, scholarships, or how our free matching works. If you are currently changing careers, I can help you find full-time or flexible routes!",
      timestamp: new Date()
    }
  ]);

  // Sync and display loaded wizard profile context
  useEffect(() => {
    if (wizardState) {
      const { country, interest, budget, level } = wizardState;
      if (country || interest || budget || level) {
        const details: string[] = [];
        if (country) details.push(`Destination: ${country}`);
        if (interest) details.push(`Major: ${interest}`);
        if (budget) details.push(`Budget: ${budget}`);
        if (level) details.push(`Level: ${level}`);

        const summary = details.join(", ");
        setMessages((prev) => {
          if (prev.some(m => m.id === "personalized-welcome")) return prev;
          return [
            ...prev,
            {
              id: "personalized-welcome",
              role: "assistant",
              content: `🎯 **Profile Synced**: I have matched your profile (${summary}). My answers are now dynamically customized to fit these goals! Feel free to ask direct questions about this field of study.`,
              timestamp: new Date()
            }
          ];
        });
      }
    }
  }, [wizardState]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<"general" | "upskill" | "scholarship" | "resume" | "shikshagpt">("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const changeSpecialistMode = (m: "general" | "upskill" | "scholarship" | "resume" | "shikshagpt") => {
    setActiveModule(m);
    let introText = "";
    if (m === "general") {
      introText = "🌐 Active AI Mode: GENERAL UNIVERSITY MATCHMAKER\n\nI am now optimized as your General Academic Matcher. Ask me about Oxbridge ranking, UK/Canada entry requirements, or how we match 100% Free.";
    } else if (m === "upskill") {
      introText = "💼 Active AI Mode: CAREER RETRAINING ADVISOR\n\nI am now optimized for transition support. If you have been unemployed, taken gap years, or don't have a technical degree, tell me your story. I will find paths with no coding prerequisites.";
    } else if (m === "scholarship") {
      introText = "💰 Active AI Mode: SCHOLARSHIP & BUDGET OPTIMIZER\n\nI am now focusing on low-tuition and grants. Ask me about ETH Zurich's extremely low yearly tuition of $1,500 - $3,000, or how to secure merit bursaries.";
    } else if (m === "resume") {
      introText = "📝 Active AI Mode: RESUME GAP BRIDGE EXPERT\n\nI will guide you step-by-step on how to frame career breaks on your CV. For example, instead of 'unemployed', let's use terms like 'Independent Upskilling Academic Sabbatical'. Ask me how!";
    } else if (m === "shikshagpt") {
      introText = "🎓 Welcome to ShikshaGPT (Your College Admissions Companion)!\n\nThink of me as your expert local advisor for university admissions, fees, and campus placements. There is absolutely NO technical knowledge required—you can ask me questions using simple, everyday language, or even a mix of Hindi and English (Hinglish)!\n\nHere are some of the most popular topics I can guide you through:\n📍 Indian and Global college registration cutoffs\n💰 Real admission costs, tuition fees, and scholarship tips\n💼 Campus jobs and average starting salary packages\n\nAll data is sourced directly from verified directories so you get 100% reliable info. Feel free to tap any of the helpful suggestions below to see how I can assist you!";
    }

    const modeChangedMsg: Message = {
      id: `mode-${Math.random().toString(36).substring(7)}`,
      role: "assistant",
      content: introText,
      timestamp: new Date(),
      animate: true
    };
    setMessages((prev) => [...prev, modeChangedMsg]);
    speakText(introText);
  };

  // Initialize Speech Recognition on mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = "en-US";
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
        setSpeechError(null);
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text) {
          handleSendMessage(text, true);
        }
      };

      rec.onerror = (err: any) => {
        console.error("Speech Recognition Error:", err);
        setIsRecording(false);
        if (err.error === 'not-allowed') {
          setSpeechError("Microphone access blocked. Please enable mic permissions in your browser.");
        } else if (err.error === 'no-speech') {
          setSpeechError("No speech detected. Please try speaking again louder.");
        } else if (err.error === 'audio-capture') {
          setSpeechError("No microphone hardware found or voice capture failed.");
        } else {
          setSpeechError(`Microphone issue: ${err.error || "unable to connect"}`);
        }
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  // Sync scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const triggerScrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const ttsEnabledRef = useRef(ttsEnabled);
  useEffect(() => {
    ttsEnabledRef.current = ttsEnabled;
  }, [ttsEnabled]);

  // Handle Text-to-Speech playback
  const speakText = (text: string) => {
    if (!ttsEnabledRef.current) return;
    try {
      // Cancel any ongoing speaking
      window.speechSynthesis.cancel();

      // Clean markdown tags briefly for better spoken readability
      const cleanText = text
        .replace(/[*#_`~-]/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("TTS initiation failed:", e);
    }
  };

  const toggleVoiceRecording = () => {
    if (!recognition) {
      setSpeechError("Speech recognition is not supported in this browser. Try using Google Chrome.");
      return;
    }

    if (isRecording) {
      try {
        recognition.abort(); // Forceful instant mute/abort
      } catch (e) {}
      try {
        recognition.stop();
      } catch (e) {}
      setIsRecording(false);
    } else {
      // Warm up TTS contexts on tap
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      try {
        recognition.start();
        setIsRecording(true);
        setSpeechError(null);
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
        setIsRecording(false);
      }
    }
  };

  const handleSendMessage = async (customText?: string, isVoice: boolean = false) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend) return;

    if (!customText) {
      setInputMessage("");
    }

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
      isVoiceInput: isVoice
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Send historical context to maintain chatbot flow
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/support/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: apiMessages,
          mode: activeModule, // Cleanly pass active module to the backend Gemini SDK instruction switcher!
          profile: wizardState
        })
      });

      if (!res.ok) {
        throw new Error("Failed to call support assistant");
      }

      const data = await res.json();
      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: data.text || "I found perfect matches. The platform is 100% Free, has no hidden fees, and requires no credit card.",
        timestamp: new Date(),
        animate: true
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(assistantMsg.content);
    } catch (err) {
      console.error("Send message error:", err);
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: "I apologize, but I had trouble reaching the servers. Please rest assured FindCourse matches you to 500+ partner universities 100% Free with no credit card required!",
        timestamp: new Date(),
        animate: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIInsight = (type: "plan" | "budget" | "docs" | "motivation") => {
    if (!wizardState) {
      handleSendMessage("Analyze my potential global study options and map out key upskilling courses.");
      return;
    }
    const { country, interest, level, budget } = wizardState;
    if (type === "plan") {
      handleSendMessage(`Create a customized Career Transition Plan for study in ${country || "selected destination"} pursuing ${interest || "selected major"}. List specific job vacancies matched to this choice.`);
    } else if (type === "budget") {
      handleSendMessage(`Give me a smart budget-saving cost analysis for a ${level || "Master's"} program with a budget level of ${budget || "Ultra-Low"}. Provide housing cost hacks.`);
    } else if (type === "docs") {
      handleSendMessage(`What is the comprehensive admission document and visa checklist for international students traveling to ${country || "destination"} for study?`);
    } else if (type === "motivation") {
      handleSendMessage(`Help me write a professional motivation draft for applying to a ${level || "Master's"} in ${interest || "selected field"} that gracefully bridges past career breaks.`);
    }
  };

  return (
    <div className={`flex flex-col bg-white border border-gray-100 ${floating ? "shadow-2xl rounded-2xl w-96 h-[570px] fixed bottom-6 right-6 z-50 animate-fade-in" : "w-full h-full rounded-xl"}`} id="support-chatbot-card">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-red-500 to-purple-600 rounded-t-2xl text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-wide">FindCourse Support AI</h3>
            <span className="text-[10px] text-white/80 font-mono">SEAES Platform • Live 24x7</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const nextVal = !ttsEnabled;
              setTtsEnabled(nextVal);
              try {
                window.speechSynthesis.cancel();
              } catch (e) {}
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title={ttsEnabled ? "Force Mute Active Voice Reader" : "Turn On Active Voice Reader"}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4 text-white animate-bounce-slow" /> : <VolumeX className="w-4 h-4 text-white/50" />}
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Specialty AI Technologies Selection Tabs */}
      <div className="bg-gray-50 p-2 border-b border-gray-150/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0" id="specialist-tabs-row">
        <button
          onClick={() => changeSpecialistMode("general")}
          className={`px-2.5 py-1.5 text-[9px] font-extrabold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 ${activeModule === "general" ? "bg-red-500 text-white shadow-xs" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-150/60"}`}
        >
          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
          General Match
        </button>
        <button
          onClick={() => changeSpecialistMode("upskill")}
          className={`px-2.5 py-1.5 text-[9px] font-extrabold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 ${activeModule === "upskill" ? "bg-red-500 text-white shadow-xs" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-150/60"}`}
        >
          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
          Career Advisor
        </button>
        <button
          onClick={() => changeSpecialistMode("scholarship")}
          className={`px-2.5 py-1.5 text-[9px] font-extrabold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 ${activeModule === "scholarship" ? "bg-red-500 text-white shadow-xs" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-150/60"}`}
        >
          <Award className="w-3.5 h-3.5 shrink-0" />
          Scholarship AI
        </button>
        <button
          onClick={() => changeSpecialistMode("resume")}
          className={`px-2.5 py-1.5 text-[9px] font-extrabold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 ${activeModule === "resume" ? "bg-red-500 text-white shadow-xs" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-150/60"}`}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          Resume Gap
        </button>
        <button
          onClick={() => changeSpecialistMode("shikshagpt")}
          className={`px-2.5 py-1.5 text-[9px] font-extrabold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 ${activeModule === "shikshagpt" ? "bg-gradient-to-r from-purple-600 to-red-500 text-white shadow-xs animate-pulse" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-150/60"}`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400 animate-spin-slow" />
          ShikshaGPT (RAG)
        </button>
      </div>

      {/* Sub Info warning that is Unemployed focused or ShikshaGPT controls */}
      {activeModule === "shikshagpt" ? (
        <div className="bg-gradient-to-r from-purple-55 to-indigo-55/70 p-3 px-4 border-b border-purple-150 flex flex-col gap-2 shrink-0 animate-fade-in" id="shikshagpt-dashboard">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-gradient-to-r from-purple-600 to-red-500 text-white font-black px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-xs tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow rotate-12" /> Simple College Guide Active
            </span>
            <div className="flex gap-1.5">
              <span className="text-[8px] text-green-750 font-bold bg-green-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Verified Data
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-700 leading-relaxed font-medium">
            We automatically compare 500+ top colleges, cutoffs, and placements for you. No technical jargon needed—just type or speak what is on your mind!
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <div className="p-1.5 px-2 bg-white border border-purple-100 rounded-lg text-[9px] text-gray-600 flex items-center gap-1.5 shadow-3xs">
              <span className="text-purple-600 font-extrabold text-xs">🌐</span> Worldwide search
            </div>
            <div className="p-1.5 px-2 bg-white border border-purple-100 rounded-lg text-[9px] text-gray-600 flex items-center gap-1.5 shadow-3xs">
              <span className="text-purple-600 font-extrabold text-xs">💬</span> Type in Hinglish
            </div>
            <div className="p-1.5 px-2 bg-white border border-purple-100 rounded-lg text-[9px] text-gray-600 flex items-center gap-1.5 shadow-3xs">
              <span className="text-purple-600 font-extrabold text-xs">🎯</span> Accurate Fee Charts
            </div>
            <div className="p-1.5 px-2 bg-white border border-purple-100 rounded-lg text-[9px] text-gray-600 flex items-center gap-1.5 shadow-3xs">
              <span className="text-purple-600 font-extrabold text-xs">✍️</span> Simple Auto-Correction
            </div>
          </div>
          
          {/* Quick non-technical helpers */}
          <div className="pt-2 border-t border-purple-100/60 flex flex-col gap-1">
            <span className="text-[8px] font-black uppercase text-purple-800 tracking-wider flex items-center gap-1">
              💡 Tap any popular question to ask instantly:
            </span>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-0.5" id="shikshagpt-student-helpers">
              <button
                onClick={() => handleSendMessage("What are the simple steps to apply for college admissions?")}
                className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-750 border border-purple-200 hover:border-purple-400 rounded-md text-[8px] font-extrabold shadow-3xs cursor-pointer shrink-0 transition-all"
                title="Ask about application steps"
              >
                👉 How do I apply?
              </button>
              <button
                onClick={() => handleSendMessage("Connect me with a counselor for a free Indian callback")}
                className="px-2.5 py-1 bg-white hover:bg-indigo-100 text-indigo-750 border border-indigo-200 hover:border-indigo-400 rounded-md text-[8px] font-extrabold shadow-3xs cursor-pointer shrink-0 transition-all"
                title="Ask for free callback"
              >
                📞 Get Free Call Back
              </button>
              <button
                onClick={() => handleSendMessage("Which global college offers the absolute lowest tuition budget?")}
                className="px-2.5 py-1 bg-white hover:bg-red-100 text-red-750 border border-red-200 hover:border-red-400 rounded-md text-[8px] font-extrabold shadow-3xs cursor-pointer shrink-0 transition-all"
                title="Check lowest tuition options"
              >
                💸 Lowest Tuition Colleges
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 p-2.5 px-4 text-xs text-red-800 border-b border-red-100/50 flex gap-2 items-start shrink-0">
          <HelpCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <strong>100% Free Matching Agent:</strong> Guaranteed no payments, no credit card required. Perfect for job transition & career upskilling resources.
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50" id="chatbot-msg-container">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-[10px] text-red-600 font-extrabold shadow-sm shrink-0">
                  AI
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed shadow-xs ${isUser ? "bg-gradient-to-tr from-red-500 to-red-600 text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"}`}>
                {msg.role === "assistant" && msg.animate ? (
                  <TypewriterText text={msg.content} onType={triggerScrollBottom} />
                ) : (
                  <div className="whitespace-pre-line font-sans">{msg.content}</div>
                )}
                <div className={`text-[9px] mt-1 text-right ${isUser ? "text-red-100" : "text-gray-400"}`}>
                  {msg.isVoiceInput && <span className="font-semibold text-red-200 mr-2">🎤 Voice Input •</span>}
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-xs text-red-600 animate-bounce shrink-0">
              AI
            </div>
            <div className="bg-white text-gray-400 border border-gray-100 rounded-xl rounded-bl-none p-3.5 text-xs shadow-xs flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
              <span>Typing matching guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested quick pills */}
      <div className="p-2 border-t border-gray-100 bg-white flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none" id="quick-replies">
        {activeModule === "general" && (
          <>
            <button
              onClick={() => handleSendMessage("Are there any hidden fees or paid plans?")}
              className="px-2.5 py-1 text-[10px] bg-red-50 hover:bg-red-100 text-red-700 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              Is counselling 100% free?
            </button>
            <button
              onClick={() => handleSendMessage("Tell me about Oxford admission rates and fees")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              Oxford details
            </button>
            <button
              onClick={() => handleSendMessage("Can I track multiple external applications?")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              How tracker works
            </button>
          </>
        )}

        {activeModule === "upskill" && (
          <>
            <button
              onClick={() => handleSendMessage("I am currently unemployed and need a career reset. Where should I start?")}
              className="px-2.5 py-1 text-[10px] bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              Unemployed career reset advice
            </button>
            <button
              onClick={() => handleSendMessage("Do I need computer science/coding background for upskilling programs?")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              Prior coding required?
            </button>
            <button
              onClick={() => handleSendMessage("What programs does University of Toronto offer for non-tech career changers?")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              Toronto career changer options
            </button>
          </>
        )}

        {activeModule === "scholarship" && (
          <>
            <button
              onClick={() => handleSendMessage("How can I study abroad with low or zero tuition?")}
              className="px-2.5 py-1 text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              Zero/Low tuition tips
            </button>
            <button
              onClick={() => handleSendMessage("Is ETH Zurich really $1,500 - $3,000 per year? Explain that tuition model.")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              ETH Zurich tuition details
            </button>
            <button
              onClick={() => handleSendMessage("Are there scholarships for students with study breaks / gaps?")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              Gaps and scholarships
            </button>
          </>
        )}

        {activeModule === "resume" && (
          <>
            <button
              onClick={() => handleSendMessage("I have a 3-year gap in my resume. How should I rewrite this for university applications?")}
              className="px-2.5 py-1 text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              How to rewrite 3-year gap
            </button>
            <button
              onClick={() => handleSendMessage("Suggest 3 professional terms to replace 'unemployed' on my CV.")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              Better terms than 'unemployed'
            </button>
            <button
              onClick={() => handleSendMessage("Will study gaps cause visa rejection?")}
              className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors shrink-0 cursor-pointer"
            >
              Visa and gap years concern
            </button>
          </>
        )}

        {activeModule === "shikshagpt" && (
          <>
            <button
              onClick={() => handleSendMessage("What are the admission requirements and cutoffs for Oxford and Imperial?")}
              className="px-2.5 py-1 text-[10px] bg-purple-55 hover:bg-purple-100 text-purple-700 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              📊 Admission & Cutoffs
            </button>
            <button
              onClick={() => handleSendMessage("Compare ETH Zurich and University of Toronto tuition and acceptance rates")}
              className="px-2.5 py-1 text-[10px] bg-red-55 hover:bg-red-100 text-red-750 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              ⚖️ Side-by-Side Comparison
            </button>
            <button
              onClick={() => handleSendMessage("Provide placement records and highest packages for NUS and Imperial")}
              className="px-2.5 py-1 text-[10px] bg-indigo-55 hover:bg-indigo-100 text-indigo-750 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              💼 Placement Records
            </button>
            <button
              onClick={() => handleSendMessage("How do exams like JEE or CAT align with top programs?")}
              className="px-2.5 py-1 text-[10px] bg-amber-55 hover:bg-amber-100 text-amber-750 rounded-full font-bold transition-colors shrink-0 cursor-pointer"
            >
              🎯 Competitive Exams Map
            </button>
            <button
              onClick={() => handleSendMessage("mujhe placement and scholarship details chahiye")}
              className="px-2.5 py-1 text-[10px] bg-teal-55 hover:bg-teal-100 text-teal-750 rounded-full font-semibold transition-colors shrink-0 cursor-pointer"
            >
              🇮🇳 Ask in Hinglish style
            </button>
          </>
        )}
      </div>


      {/* Dynamic Profile-Tailored AI Specialist Agent triggers */}
      <div className="p-2 border-t border-gray-150/70 bg-gradient-to-r from-red-505/5 to-purple-605/5 flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-red-500 animate-bounce" /> Profile Specialist AI Tools
          </span>
          {wizardState && (
            <span className="text-[8px] bg-red-50 text-red-700 font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
              {wizardState.interest || "Student"} • Profile Synced
            </span>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => generateAIInsight("plan")}
            className="px-3 py-1.5 bg-white border border-red-200 hover:border-red-500 hover:bg-red-50/30 text-red-750 rounded-lg text-[10px] font-extrabold shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
          >
            📋 Career Transition Plan
          </button>
          <button
            onClick={() => generateAIInsight("budget")}
            className="px-3 py-1.5 bg-white border border-purple-200 hover:border-purple-505 hover:bg-purple-50/30 text-purple-750 rounded-lg text-[10px] font-extrabold shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
          >
            💰 living Cost Saving Analyzer
          </button>
          <button
            onClick={() => generateAIInsight("docs")}
            className="px-3 py-1.5 bg-white border border-amber-200 hover:border-amber-505 hover:bg-amber-50/30 text-amber-750 rounded-lg text-[10px] font-extrabold shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
          >
            🛂 Visa Admission Checker
          </button>
          <button
            onClick={() => generateAIInsight("motivation")}
            className="px-3 py-1.5 bg-white border border-emerald-200 hover:border-emerald-505 hover:bg-emerald-50/30 text-emerald-750 rounded-lg text-[10px] font-extrabold shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
          >
            📝 CV Gaps Motivation Generator
          </button>
        </div>
      </div>

      {speechError && (
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-100 flex items-center justify-between gap-3 animate-fade-in shrink-0">
          <span className="text-[10px] text-amber-800 font-medium flex items-center gap-1.5">
            ⚠️ {speechError}
          </span>
          <button 
            onClick={() => setSpeechError(null)}
            className="text-[10px] font-extrabold text-amber-900 hover:bg-amber-100 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {isRecording && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex items-center justify-between gap-3 animate-fade-in shrink-0">
          <span className="text-[10px] text-red-650 font-bold tracking-wider uppercase animate-pulse flex items-center gap-1.5 shrink-0">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            Mic Recording Active
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <span className="w-1 h-5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
            <span className="w-1 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }} />
            <span className="w-1 h-6 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-1 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            <span className="w-1 h-2 bg-red-300 rounded-full animate-bounce" style={{ animationDelay: "0.7s" }} />
          </div>
          <button 
            onClick={() => {
              if (recognition) {
                try { recognition.stop(); } catch (e) {}
              }
              setIsRecording(false);
            }}
            className="text-[10px] font-extrabold text-red-700 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded-md cursor-pointer"
          >
            Cancel Microphone
          </button>
        </div>
      )}

      {/* Form Inputs */}
      <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl flex items-center gap-2">
        <button
          onClick={toggleVoiceRecording}
          className={`p-2.5 rounded-xl transition-all shadow-xs shrink-0 ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          title={isRecording ? "Mute Microphone & Stop listening" : "Tap to Speak (Voice Input)"}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder={isRecording ? "Listening... Speak now" : "Ask FindCourse AI assistant..."}
          disabled={isLoading || isRecording}
          className="flex-1 text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-55"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || isLoading || isRecording}
          className="p-2.5 bg-gradient-to-tr from-purple-600 to-red-500 hover:opacity-95 text-white rounded-xl transition-opacity disabled:opacity-40 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
