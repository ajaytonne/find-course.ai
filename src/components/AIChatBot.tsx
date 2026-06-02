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

interface AIChatBotProps {
  onClose?: () => void;
  floating?: boolean;
}

export default function AIChatBot({ onClose, floating = false }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your FindCourse.ai Assistant. Ask me anything about our partner universities, scholarships, or how our free matching works. If you are currently changing careers, I can help you find full-time or flexible routes!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<"general" | "upskill" | "scholarship" | "resume">("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const changeSpecialistMode = (m: "general" | "upskill" | "scholarship" | "resume") => {
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
    }

    const modeChangedMsg: Message = {
      id: `mode-${Math.random().toString(36).substring(7)}`,
      role: "assistant",
      content: introText,
      timestamp: new Date()
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

  // Handle Text-to-Speech playback
  const speakText = (text: string) => {
    if (!ttsEnabled) return;
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
      alert("Speech recognition is not supported in this browser. Try using Google Chrome.");
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      // Warm up TTS contexts on tap
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      recognition.start();
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
          mode: activeModule // Cleanly pass active module to the backend Gemini SDK instruction switcher!
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
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(assistantMsg.content);
    } catch (err) {
      console.error("Send message error:", err);
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: "I apologize, but I had trouble reaching the servers. Please rest assured FindCourse matches you to 500+ partner universities 100% Free with no credit card required!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
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
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title={ttsEnabled ? "Turn off Voice Answer Readout" : "Turn on Voice Answer Readout"}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white/50" />}
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
      </div>

      {/* Sub Info warning that is Unemployed focused */}
      <div className="bg-red-50 p-2.5 px-4 text-xs text-red-800 border-b border-red-100/50 flex gap-2 items-start">
        <HelpCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <div>
          <strong>100% Free Matching Agent:</strong> Guaranteed no payments, no credit card required. Perfect for job transition & career upskilling resources.
        </div>
      </div>

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
                <div className="whitespace-pre-line font-sans">{msg.content}</div>
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
      </div>


      {/* Form Inputs */}
      <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl flex items-center gap-2">
        <button
          onClick={toggleVoiceRecording}
          className={`p-2.5 rounded-xl transition-all shadow-xs shrink-0 ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          title={isRecording ? "Listening to your voice..." : "Tap to Speak (Voice Input)"}
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
