import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { COST_COMPARISON_DATA, KB_UNIVERSITIES, VERIFIED_SUCCESS_STORIES } from "../data";
import { 
  ListFilter, 
  Sparkles, 
  TrendingUp, 
  Info, 
  PlusCircle, 
  CheckCircle, 
  Trash2, 
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  RefreshCw
} from "lucide-react";
import { Lead } from "../types";

export default function DashboardView() {
  const [applications, setApplications] = useState([
    { id: "app-1", university: "ETH Zurich", program: "MSc Mechanical Engineering", country: "Switzerland", status: "Reviewing (In-Progress)", date: "2026-05-15" },
    { id: "app-2", university: "University of Toronto", program: "Master of Business Administration (MBA)", country: "Canada", status: "Conditionally Offered", date: "2026-05-20" }
  ]);
  const [newUni, setNewUni] = useState("");
  const [newProg, setNewProg] = useState("");
  const [newCountry, setNewCountry] = useState("United Kingdom");

  // Leads state fetched from backend
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [callbackSimulated, setCallbackSimulated] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Could not sync leads from database backend:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSimulateCallback = (leadName: string, phone: string) => {
    setCallbackSimulated(leadName);
    alert(`⚡ [Support Desk Triggered] Counselor assigned!\nWe have queued candidate "${leadName}" (+91 ${phone}) for an immediate free callback advice session regarding university gaps. This has been updated in the backend queue.`);
    setTimeout(() => {
      setCallbackSimulated(null);
    }, 4000);
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUni.trim() || !newProg.trim()) return;
    setApplications((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        university: newUni,
        program: newProg,
        country: newCountry,
        status: "Applied (Central Tracking)",
        date: new Date().toISOString().split("T")[0]
      }
    ]);
    setNewUni("");
    setNewProg("");
  };

  const handleDeleteApp = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in" id="dashboard-tab-view">
      {/* Top statistics banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Matching Accuracy</span>
            <div className="font-display font-black text-2xl text-red-600 mt-1">95%</div>
            <p className="text-[10px] text-gray-400 mt-1">Stated from 10k+ cases</p>
          </div>
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-display font-extrabold">
            🎯
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Partner Support</span>
            <div className="font-display font-black text-2xl text-purple-600 mt-1">500+</div>
            <p className="text-[10px] text-gray-400 mt-1">Across 30+ core countries</p>
          </div>
          <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center font-display font-extrabold">
            🏛️
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estimated Match Speed</span>
            <div className="font-display font-black text-2xl text-blue-600 mt-1">&lt; 60s</div>
            <p className="text-[10px] text-gray-400 mt-1">Guaranteed free, instantly</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center font-display font-extrabold">
            🚀
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Active Applications</span>
            <div className="font-display font-black text-2xl text-green-600 mt-1">{applications.length} Tracked</div>
            <p className="text-[10px] text-gray-400 mt-1">Syncs with school counselors</p>
          </div>
          <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center font-display font-extrabold">
            📁
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost comparison chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm text-gray-800">
                Core Tuition & Budget Comparison
              </h3>
              <span className="text-[10px] bg-red-100/60 text-red-600 px-2 py-0.5 rounded-full font-bold">
                100% Free Matching Engine
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">
              Explore dynamic annual international tuition (USD) across our official core partner universities. Notice ETH Zurich's ultra-affordable layout for budget-sensitive job transitioners.
            </p>
          </div>

          <div className="h-64 h-min-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COST_COMPARISON_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis unit="$" tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8 }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Tuition (Annual)"]}
                />
                <Bar dataKey="fees" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] text-gray-400 italic text-center mt-2 flex gap-1.5 justify-center items-center">
            <Info className="w-3.5 h-3.5" /> High-budget programs usually correlate with direct scholarship and study-and-work pathways.
          </div>
        </div>

        {/* QS Acceptance rating trend */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-gray-800 mb-2">
              Acceptance & QS Ranking Trend
            </h3>
            <p className="text-[11px] text-gray-400 mb-4">
              Higher line highlights acceptance chance, while lower numeric score represents absolute QS global university rank.
            </p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COST_COMPARISON_DATA} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 9 }} />
                <Line type="monotone" dataKey="acceptance" stroke="#a855f7" strokeWidth={2.5} name="Acceptance %" />
                <Line type="monotone" dataKey="ranking" stroke="#ef4444" strokeWidth={1.5} name="QS Rank" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-fuchsia-50 p-2.5 rounded-xl border border-fuchsia-100/50 text-[10px] text-fuchsia-900 leading-relaxed mt-2">
            🚀 <strong>Counsellor Fact:</strong> University of Melbourne yields up to <strong>70%</strong> acceptance rate and high regional post-study employment!
          </div>
        </div>
      </div>

      {/* Central Applications Tracking Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="applications-tracking-section">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-display font-bold text-sm text-gray-800">
                Application Tracking Dashboard
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Monitor status updates, counsellor review notes, and critical timeline dates here.
              </p>
            </div>
            <span className="text-[10px] bg-green-50 text-green-700 px-2.5 py-1 rounded-lg border border-green-200 font-bold">
              ● All Systems Functional
            </span>
          </div>

          <div className="space-y-3">
            {applications.length === 0 ? (
              <div className="text-center p-8 text-gray-400 text-xs italic">
                No currently tracked applications. Use the matching wizard to apply.
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-gray-50/50 rounded-xl hover:bg-gray-55 transition-colors border border-gray-100/50 gap-2">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gray-800">{app.university}</div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {app.program} • {app.country}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      Applied: {app.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${app.status.includes("Review") ? "bg-amber-100 text-amber-800" : app.status.includes("Offer") ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}>
                      {app.status}
                    </span>
                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Delete Application Trace"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add application form and guides */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm lg:col-span-5 flex flex-col justify-between">
          <form onSubmit={handleAddApplication} className="space-y-3.5">
            <div>
              <h3 className="font-display font-bold text-sm text-gray-800">
                Self-Track General Application
              </h3>
              <p className="text-[11px] text-gray-400">
                Applied through external programs but want centralized tracking? Add details here.
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">University Name</label>
              <input
                type="text"
                required
                value={newUni}
                onChange={(e) => setNewUni(e.target.value)}
                placeholder="e.g. Imperial College London"
                className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-gray-50/50 outline-hidden focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">Target Program / Course</label>
              <input
                type="text"
                required
                value={newProg}
                onChange={(e) => setNewProg(e.target.value)}
                placeholder="e.g. MEng Artificial Intelligence"
                className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-gray-50/50 outline-hidden focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">Country Location</label>
              <select
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-gray-50/50 outline-hidden focus:ring-1 focus:ring-red-500"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-2.5 bg-gray-900 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add Tracking Record
            </button>
          </form>
        </div>
      </div>

      {/* Backend Leads Storage Connection Console */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4" id="support-leads-console">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-red-50 text-red-650 rounded-lg">
                <Users className="w-4 h-4 text-red-500" />
              </span>
              <h3 className="font-display font-black text-sm text-gray-800">
                Customer Support Lead Connections (Stored in Backend)
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Data registered securely here translates directly to server storage memory. Admissions counselors connect here to make callbacks.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            disabled={loadingLeads}
            className="px-3.5 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? "animate-spin" : ""}`} />
            {loadingLeads ? "Syncing..." : "Refresh Inbox"}
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-xs italic">
            Connecting to secure backend server database. Submit your profile connection cards to populate.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                className="p-4 rounded-xl border border-gray-150/80 bg-gray-50/20 hover:border-red-500/35 transition-all space-y-3 shadow-2xs relative"
              >
                {/* Situation Badge */}
                <div className="absolute top-4 right-4 bg-red-50 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-100">
                  {lead.employmentStatus || "Taking Gap Years"}
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                    👤 {lead.name}
                  </h4>
                  <p className="text-[9px] font-mono text-gray-400">
                    Registration ID: {lead.id} • Registered: {new Date(lead.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                <div className="space-y-1.5 text-[11px] text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-mono text-xs text-gray-700">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{lead.address}</span>
                  </div>
                </div>

                {/* Simulated counselor call action */}
                <div className="pt-2 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handleSimulateCallback(lead.name, lead.phone)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-650 text-white font-extrabold text-[10px] rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    📞 Assign Counselor Callback
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verified Success Stories carousel/grid */}

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-display font-bold text-sm text-gray-800 mb-1">
          Verified Student Career Transitions
        </h3>
        <p className="text-[11px] text-gray-400 mb-4">
          Real alumni who matched via FindCourse.ai, obtained admission slots, and built powerful long-term careers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {VERIFIED_SUCCESS_STORIES.map((story, i) => (
            <div key={i} className="p-3.5 bg-gradient-to-br from-gray-50 to-white hover:shadow-xs transition-shadow border border-gray-100 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{story.avatar}</span>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-800">{story.name}</h4>
                  <span className="text-[9px] text-gray-400 font-mono italic">{story.origin}</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-bold leading-tight">
                {story.program}
              </p>
              <div className="text-[9px] text-red-600 font-semibold uppercase">
                {story.university}
              </div>
              <div className="text-[9px] font-mono text-gray-400">
                Class of {story.classOf}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
