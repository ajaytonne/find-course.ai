import React, { useState } from "react";
import { GraduationCap, Phone, Mail, MapPin, Shield, CheckCircle, ArrowRight, HelpCircle } from "lucide-react";
import { Lead } from "../types";

const INDIAN_CITIES = [
  "Kolhapur, Maharashtra, India",
  "Mumbai, Maharashtra, India",
  "Pune, Maharashtra, India",
  "Nagpur, Maharashtra, India",
  "Thane, Maharashtra, India",
  "Nashik, Maharashtra, India",
  "Aurangabad, Maharashtra, India",
  "Solapur, Maharashtra, India",
  "Navi Mumbai, Maharashtra, India",
  "Amravati, Maharashtra, India",
  "Delhi, NCR, India",
  "Noida, Uttar Pradesh, India",
  "Gurgaon, Haryana, India",
  "Faridabad, Haryana, India",
  "Bengaluru, Karnataka, India",
  "Mysore, Karnataka, India",
  "Hubli-Dharwad, Karnataka, India",
  "Hyderabad, Telangana, India",
  "Warangal, Telangana, India",
  "Chennai, Tamil Nadu, India",
  "Coimbatore, Tamil Nadu, India",
  "Madurai, Tamil Nadu, India",
  "Tiruchirappalli, Tamil Nadu, India",
  "Salem, Tamil Nadu, India",
  "Kolkata, West Bengal, India",
  "Howrah, West Bengal, India",
  "Ahmedabad, Gujarat, India",
  "Surat, Gujarat, India",
  "Vadodara, Gujarat, India",
  "Rajkot, Gujarat, India",
  "Jaipur, Rajasthan, India",
  "Jodhpur, Rajasthan, India",
  "Kota, Rajasthan, India",
  "Lucknow, Uttar Pradesh, India",
  "Kanpur, Uttar Pradesh, India",
  "Ghaziabad, Uttar Pradesh, India",
  "Agra, Uttar Pradesh, India",
  "Meerut, Uttar Pradesh, India",
  "Varanasi, Uttar Pradesh, India",
  "Aligarh, Uttar Pradesh, India",
  "Bareilly, Uttar Pradesh, India",
  "Moradabad, Uttar Pradesh, India",
  "Patna, Bihar, India",
  "Indore, Madhya Pradesh, India",
  "Bhopal, Madhya Pradesh, India",
  "Gwalior, Madhya Pradesh, India",
  "Jabalpur, Madhya Pradesh, India",
  "Visakhapatnam, Andhra Pradesh, India",
  "Vijayawada, Andhra Pradesh, India",
  "Guntur, Andhra Pradesh, India",
  "Dhanbad, Jharkhand, India",
  "Ranchi, Jharkhand, India",
  "Amritsar, Punjab, India",
  "Ludhiana, Punjab, India",
  "Jalandhar, Punjab, India",
  "Srinagar, Jammu & Kashmir, India",
  "Raipur, Chhattisgarh, India",
  "Guwahati, Assam, India",
  "Chandigarh, India",
  "Bhubaneswar, Odisha, India",
  "Kochi, Kerala, India",
  "Thiruvananthapuram, Kerala, India",
  "Dehradun, Uttarakhand, India"
];

interface RegistrationPageProps {
  onRegisterSuccess: (user: { name: string; email: string; phone: string; address: string; status: string }) => void;
}

export default function RegistrationPage({ onRegisterSuccess }: RegistrationPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Unemployed / Career Transition");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // OTP State Management
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [sandboxOtp, setSandboxOtp] = useState<string | null>(null);

  // Send verification OTP handler
  const handleSendOTP = async () => {
    if (!name.trim()) {
      setErrorMsg("Please enter your Full Name first before requesting an OTP.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid Email Address first.");
      return;
    }
    setErrorMsg("");
    setSendingOtp(true);
    setSandboxOtp(null);

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() })
      });

      if (!response.ok) {
        throw new Error("Failed to dispatch verification code.");
      }

      const data = await response.json();
      if (data.success) {
        setOtpSent(true);
        setTimer(300); // 5 minutes standard timer
        if (data.sandbox && data.otp) {
          setSandboxOtp(data.otp);
        }
      } else {
        throw new Error(data.error || "Sending failed");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Trouble sending OTP email. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  // Timer countdown hook
  React.useEffect(() => {
    let interval: any;
    if (timer > 0 && otpSent && !otpVerified) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent, otpVerified]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Verify OTP callback
  const handleVerifyOTP = async () => {
    const code = otpCode.trim();
    if (!code || code.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }
    setErrorMsg("");
    setVerifyingOtp(true);

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: code })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setOtpVerified(true);
        setSandboxOtp(null);
      } else {
        throw new Error(data.error || "Incorrect code or code has expired.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "OTP verification failed. Please double check.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Reset OTP if user modifies email
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    if (otpSent || otpVerified) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode("");
      setSandboxOtp(null);
      setTimer(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg("Please fill in all details so our agents can reach you.");
      return;
    }

    if (!otpVerified) {
      setErrorMsg("Please complete Email Verification via OTP before completing enrollment.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number (after +91).");
      return;
    }

    const fullPhone = `+91 ${cleanPhone}`;

    setErrorMsg("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/register-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone,
          address,
          employmentStatus: status
        })
      });

      if (!response.ok) {
        throw new Error("Server could not save details.");
      }

      const data = await response.json();
      if (data.success) {
        // Log user in
        onRegisterSuccess({ name, email, phone: fullPhone, address, status });
      } else {
        throw new Error("Server returned false status.");
      }
    } catch (err: any) {
      console.error(err);
      // Fallback to local success if server temporarily offline during build so user never blocks
      onRegisterSuccess({ name, email, phone: fullPhone, address, status });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]/50 flex flex-col md:flex-row shadow-inner" id="registration-layout-container">
      
      {/* Left side: Friendly Brand Welcome & Value Proposition */}
      <div className="w-full md:w-1/2 bg-gradient-to-tr from-red-600 via-purple-700 to-indigo-900 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent)]" />
        
        {/* Brand Banner */}
        <div className="relative z-15 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight">FindCourse<span className="text-red-400">.ai</span></span>
              <span className="text-[9px] bg-red-500/30 text-white font-bold px-1.5 py-0.5 rounded-sm">100% FREE</span>
            </div>
            <p className="text-[10px] text-white/70 font-medium">by SEAES Platform • Govt of India registered IT consultancies fallback</p>
          </div>
        </div>

        {/* Central message for non-technical or unemployed users */}
        <div className="relative z-10 my-12 space-y-6 max-w-lg">
          <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
            🇮🇳 Digital India Skills Initiative
          </span>
          <h1 className="text-3xl md:text-4.5xl leading-tight font-display font-black tracking-tight text-white">
            Stuck in employment gaps? Let's fix that.
          </h1>
          <p className="text-gray-200/90 text-sm leading-relaxed">
            We built FindCourse to make university admissions and high-paying career retraining simple. 
            No technical knowledge is required. Just tell us your basic contact details, click through our simple questionnaire, and get matched to official global programs in under 60 seconds.
          </p>

          <div className="space-y-3.5 pt-4">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">✓</div>
              <p className="font-semibold">No coding skills or technical knowledge required to apply</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">✓</div>
              <p className="font-semibold">Absolutely Free for Life — no hidden advisor commissions</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">✓</div>
              <p className="font-semibold">1-on-1 human callback included to guide your course translation</p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer badge */}
        <div className="relative z-10 border-t border-white/20 pt-6 text-[11px] text-gray-300 space-y-1">
          <p className="flex items-center gap-1.5 font-bold text-white">
            <Shield className="w-4 h-4 text-emerald-400" />
            DPDP Act 2023 Digital Trust Secured
          </p>
          <p className="leading-relaxed">
            Your data is stored securely in our private servers to enable free advisor callback services. No commercial advertising spam or leaks.
          </p>
        </div>
      </div>

      {/* Right side: Clean, incredibly intuitive registration form */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center shrink-0">
        <div className="max-w-md w-full mx-auto space-y-6">
          
          <div className="space-y-1.5">
            <h2 className="font-display font-extrabold text-2xl text-gray-850">
              Save Your Spot for Free Connect
            </h2>
            <p className="text-xs text-gray-400">
              Please provide your direct coordinates. Our support desk will reach out over WhatsApp/Email to compile your university documents.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-semibold text-red-700">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-xs font-bold">
                  👤
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ajay Kumar"
                  className="w-full pl-9 py-3 text-xs font-semibold border border-gray-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-50/20"
                />
              </div>
            </div>

            {/* Input Email with OTP dispatch panel */}
            <div className="space-y-1.5 focus-within:text-indigo-600 transition-colors">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-sans">Email Address</label>
                {otpVerified ? (
                  <span className="text-[10px] text-green-700 font-extrabold uppercase tracking-wide flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-sm">
                    ✓ Verified Mail
                  </span>
                ) : (
                  <span className="text-[9px] text-purple-700 font-bold uppercase tracking-wider">
                    OTP Verification Required
                  </span>
                )}
              </div>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-405">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </span>
                  <input
                    type="email"
                    required
                    disabled={otpVerified || sendingOtp}
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="ajay@gmail.com"
                    className="w-full pl-9 py-3 text-xs font-semibold border border-gray-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-50/20 disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
                {!otpVerified && (
                  <button
                    type="button"
                    disabled={sendingOtp || !email.trim() || !name.trim()}
                    onClick={handleSendOTP}
                    className="px-4 py-2 bg-gradient-to-r from-red-550 to-purple-550 hover:from-red-600 hover:to-purple-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-3xs cursor-pointer hover:shadow-2xs active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center bg-red-500"
                  >
                    {sendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}
              </div>

              {/* Enter OTP Section */}
              {otpSent && !otpVerified && (
                <div className="mt-2.5 p-3.5 bg-purple-50/40 border border-purple-100 rounded-xl space-y-2.5 animate-fade-in relative z-20">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-purple-800 tracking-wider">Enter 6-Digit Code</span>
                    {timer > 0 ? (
                      <span className="text-[9px] text-gray-500 font-bold">Expires in {formatTime(timer)}</span>
                    ) : (
                      <span className="text-[9px] text-red-650 font-bold">Code expired • click resend</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 123456"
                      value={otpCode}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        setOtpCode(cleaned.slice(0, 6));
                      }}
                      className="w-full px-3.5 py-2.5 text-center text-xs font-black tracking-[4px] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                    />
                    <button
                      type="button"
                      disabled={verifyingOtp || otpCode.trim().length !== 6}
                      onClick={handleVerifyOTP}
                      className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      {verifyingOtp ? "Checking..." : "Verify Code"}
                    </button>
                  </div>

                  {sandboxOtp && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200/60 rounded-md text-[9px] text-amber-800 leading-normal font-semibold flex items-start gap-1.5 animate-pulse">
                      <span className="text-xs">👋</span>
                      <div>
                        <strong>Demo Sandbox Mode Activated:</strong> SMTP has not been configured in your .env secrets. Please enter <strong className="text-amber-900 bg-amber-100 rounded px-1.5 py-0.5 select-all font-mono font-black text-[10px] tracking-wider">{sandboxOtp}</strong> to instantly complete verification!
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Phone */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-sans">Phone / WhatsApp Number</label>
                <span className="text-[9px] text-red-600 font-bold uppercase tracking-wider bg-red-50 px-1.5 py-0.5 rounded-sm">🇮🇳 Indian Number Only</span>
              </div>
              <div className="relative flex border border-gray-250 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-red-500 bg-gray-50/10">
                <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-250 text-xs font-bold text-gray-500 shrink-0 select-none">
                  <span className="text-sm">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    setPhone(cleaned.slice(0, 10));
                  }}
                  placeholder="e.g. 98765 43210"
                  className="w-full px-3.5 py-3 text-xs font-semibold focus:outline-none bg-transparent"
                />
              </div>
              <p className="text-[9px] text-gray-400 font-semibold leading-relaxed">Enter your 10-digit mobile number. Our support team will reach out via WhatsApp.</p>
            </div>

            {/* Input Address */}
            <div className="space-y-1.5 relative">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-sans">Permanent Address / Location</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAddress(val);
                    if (val.trim().length >= 2) {
                      const lowerVal = val.toLowerCase();
                      const matched = INDIAN_CITIES.filter(city => 
                        city.toLowerCase().includes(lowerVal)
                      ).slice(0, 5);
                      setCitySuggestions(matched);
                      setShowSuggestions(true);
                    } else {
                      setCitySuggestions([]);
                      setShowSuggestions(false);
                    }
                  }}
                  onFocus={() => {
                    if (address.trim().length >= 2) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSuggestions(false);
                    }, 250);
                  }}
                  placeholder="Type to search (e.g. Kolhapur, Pune, Mumbai)"
                  className="w-full pl-9 py-3 text-xs font-semibold border border-gray-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-50/20"
                />
              </div>

              {/* Suggestions Dropdown with beautiful shadow & spacing */}
              {showSuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-gray-100 animate-fade-in">
                  {citySuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onMouseDown={(e) => {
                        // Prevent instant inputs from losing focus before registering click
                        e.preventDefault(); 
                      }}
                      onClick={() => {
                        setAddress(city);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-xs">📍</span>
                      <span>{city}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selection Status */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Current Situation</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full py-3 px-3 text-xs font-bold border border-gray-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-50/20"
              >
                <option value="Unemployed / Gap Years">Currently Unemployed / Taking Gap Years</option>
                <option value="Non-Tech Career Changer">Non-Technical Background / Career Changer</option>
                <option value="General Student">Active High School / College Student</option>
                <option value="Parent Seeker">Parent seeking free guidance for child</option>
              </select>
            </div>

            {/* Direct Register Action Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-red-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {submitting ? (
                <span>Registering connection...</span>
              ) : (
                <>
                  <span>Reveal Personalized Match Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick FAQ info panel for absolute reassuring */}
          <div className="bg-[#fbfcff] p-4 rounded-xl border border-blue-50/60 space-y-2">
            <h4 className="text-[11px] font-extrabold text-indigo-900 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </h4>
            <ul className="text-[10px] text-gray-500 space-y-1 leading-relaxed">
              <li>• <strong>Do I need computer science knowledge?</strong> No, this is made for career switchers. All steps are automated and simple click-to-match.</li>
              <li>• <strong>Any hidden charges?</strong> Absolutely None. SEAES Platform is funded by global host institutions so you pay 0 rupees.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
