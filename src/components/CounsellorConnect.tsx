import React, { useState } from "react";
import { UserCheck, BookOpen, GraduationCap, PhoneCall, CheckCircle, Mail, MapPin, Award, Check } from "lucide-react";

export default function CounsellorConnect() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "Computer Science",
    employmentStatus: "Unemployed",
    timeframe: "Immediately",
    priors: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="counsellor-connect-view">
      {/* Intro Header banner */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-950 p-6 md:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <GraduationCap className="w-56 h-56 text-white" />
        </div>
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="px-3 py-1 bg-red-500 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-white">
            SEAES Trusted Consultants
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold leading-tight">
            Connect 100% Free with Certified Global Advisors
          </h2>
          <p className="text-purple-200 text-xs md:text-sm">
            We specialize in helping currently unemployed individuals acquire high-demand digital skills (like MSc AI, MSc Computer Science, Data Science) with full financial aid routing.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-purple-300">
            <span className="flex items-center gap-1.5 font-medium">✅ No credit card required</span>
            <span className="flex items-center gap-1.5 font-medium">✅ Fully remote counselling</span>
            <span className="flex items-center gap-1.5 font-medium">✅ 10-Min instant feedback</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Advisor Form */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm md:col-span-7">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4" id="consultation-success-state">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-800">Counselling Session Requested!</h3>
              <p className="text-gray-500 text-xs">
                An expert SEAES counsellor has been assigned to your profile. Since your status is listed as <strong>{formData.employmentStatus === "Unemployed" ? "Unemployed (Career Transition)" : formData.employmentStatus}</strong>, we have prioritized you for a VIP expedited callback in under 1 hour.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 w-full text-left space-y-1.5 text-xs text-gray-600">
                <div><strong>Lead ID:</strong> FC-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div><strong>Assigned Professional:</strong> Dr. Robert Sterling (Europe Division)</div>
                <div><strong>Contact Email:</strong> counselors@findcourse.ai</div>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Request another or edit preference
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
              <h3 className="font-display font-bold text-base text-gray-800 border-b border-gray-100 pb-2">
                Expedited Callback Form
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email Coordinates</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile / WhatsApp No.</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 or +1 number"
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Employment / Career Status</label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden"
                  >
                    <option value="Unemployed">Currently Unemployed & Active Seeker</option>
                    <option value="Career Changer">Employed but seeking career transition</option>
                    <option value="Student">Fresh graduate student</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Academic Target Field</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden"
                  >
                    <option value="Computer Science">Computer Science & AI Engineering</option>
                    <option value="Data Science">Data Analytics & Statistics</option>
                    <option value="MBA / Business">MBA & Venture Leadership</option>
                    <option value="Mechanical / PhD">Mechanical / Research PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Urgency of Enrollment</label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden"
                  >
                    <option value="Immediately">Within 1-2 Months (Urgent)</option>
                    <option value="6 Months">Within 6 Months</option>
                    <option value="Next Year">Next Year / Studying options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Prior Experience or Qualifications (Optional)</label>
                <textarea
                  value={formData.priors}
                  onChange={(e) => setFormData({ ...formData, priors: e.target.value })}
                  placeholder="Explain brief background, degrees, or years unemployed. This helps us fit custom scholarship criteria."
                  rows={2}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 focus:ring-1 focus:ring-red-500 outline-hidden resize-none"
                />
              </div>

              <div className="p-3 bg-fuchsia-50 rounded-lg text-[10px] text-fuchsia-800 leading-relaxed border border-fuchsia-100/50">
                ℹ️ <strong>SEAES Platform Commitment:</strong> By submitting, you request free matching services compliant with the Indian IT Act 2000 and the Digital Personal Data Protection Act 2023. We never sell or lease student details.
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-red-500 hover:bg-red-600 font-extrabold text-white text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                Submit Free Consultation Match Lead
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Process tutorials & resources */}
        <div className="space-y-4 md:col-span-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3.5">
            <h3 className="font-display font-bold text-sm text-gray-800">
              Why use FindCourse.ai Consultancy?
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-red-50 rounded-lg shrink-0 text-red-500">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-700">95% AI matching matching rate</h4>
                  <p className="text-[11px] text-gray-500">Verified profiling of admission standards across 500+ schools worldwide in under 60 seconds.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-purple-50 rounded-lg shrink-0 text-purple-500">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-700">Dedicated Job-Transition Routing</h4>
                  <p className="text-[11px] text-gray-500">We work to offset long unemployment periods using study-work pathways (like Canada PGWP or UK Graduate visas).</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-blue-50 rounded-lg shrink-0 text-blue-500">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-700">100% Free - Sea Platform Guarantee</h4>
                  <p className="text-[11px] text-gray-500">We earn support commission transparently from direct universities, keeping consultation absolutely free for our users.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-pink-500 to-red-500 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
            <h3 className="font-display font-bold text-sm text-white mb-2">
              Ready to begin?
            </h3>
            <p className="text-[11px] text-pink-100 leading-relaxed mb-3">
              Most students get personalized career recommendations on their screen automatically in under 60 seconds of answering basic questions.
            </p>
            <div className="text-xs font-mono bg-black/15 py-1 px-3 rounded-lg inline-block">
              Total matched students: 10,000+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
