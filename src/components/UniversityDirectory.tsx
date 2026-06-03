import React, { useState, useMemo } from "react";
import universitiesData from "../data/universities_data.json";
import { Search, Globe, ChevronRight, Award, Compass, Sparkles, BookOpen } from "lucide-react";

interface UniversityItem {
  c: string; // country code
  n: string; // name
  u: string; // url
}

// Map of common country codes to flag emojis & full names for rich UI
const COUNTRY_MAP: { [key: string]: { name: string; flag: string } } = {
  AD: { name: "Andorra", flag: "🇦🇩" },
  AE: { name: "United Arab Emirates", flag: "🇦🇪" },
  AF: { name: "Afghanistan", flag: "🇦🇫" },
  AL: { name: "Albania", flag: "🇦🇱" },
  AM: { name: "Armenia", flag: "🇦🇲" },
  AO: { name: "Angola", flag: "🇦🇴" },
  AR: { name: "Argentina", flag: "🇦🇷" },
  AT: { name: "Austria", flag: "🇦🇹" },
  AU: { name: "Australia", flag: "🇦🇺" },
  AZ: { name: "Azerbaijan", flag: "🇦🇿" },
  BA: { name: "Bosnia & Herzegovina", flag: "🇧🇦" },
  BD: { name: "Bangladesh", flag: "🇧🇩" },
  BE: { name: "Belgium", flag: "🇧🇪" },
  BF: { name: "Burkina Faso", flag: "🇧🇫" },
  BG: { name: "Bulgaria", flag: "🇧🇬" },
  BH: { name: "Bahrain", flag: "🇧🇭" },
  BI: { name: "Burundi", flag: "🇧🇮" },
  BJ: { name: "Benin", flag: "🇧🇯" },
  BM: { name: "Bermuda", flag: "🇧🇲" },
  BN: { name: "Brunei", flag: "🇧🇳" },
  BO: { name: "Bolivia", flag: "🇧🇴" },
  BR: { name: "Brazil", flag: "🇧🇷" },
  BS: { name: "Bahamas", flag: "🇧🇸" },
  BT: { name: "Bhutan", flag: "🇧🇹" },
  BW: { name: "Botswana", flag: "🇧🇼" },
  BY: { name: "Belarus", flag: "🇧🇾" },
  BZ: { name: "Belize", flag: "🇧🇿" },
  CA: { name: "Canada", flag: "🇨🇦" },
  CD: { name: "Congo (DRC)", flag: "🇨🇩" },
  CF: { name: "Central African Republic", flag: "🇨🇫" },
  CG: { name: "Congo", flag: "🇨🇬" },
  CH: { name: "Switzerland", flag: "🇨🇭" },
  CI: { name: "Ivory Coast", flag: "🇨🇮" },
  CL: { name: "Chile", flag: "🇨🇱" },
  CM: { name: "Cameroon", flag: "🇨🇲" },
  CN: { name: "China", flag: "🇨🇳" },
  CO: { name: "Colombia", flag: "🇨🇴" },
  CR: { name: "Costa Rica", flag: "🇨🇷" },
  CU: { name: "Cuba", flag: "🇨🇺" },
  CV: { name: "Cape Verde", flag: "🇨🇵" },
  CY: { name: "Cyprus", flag: "🇨🇾" },
  CZ: { name: "Czech Republic", flag: "🇨🇿" },
  DE: { name: "Germany", flag: "🇩🇪" },
  DJ: { name: "Djibouti", flag: "🇩🇯" },
  DK: { name: "Denmark", flag: "🇩🇰" },
  DM: { name: "Dominica", flag: "🇩🇲" },
  DO: { name: "Dominican Republic", flag: "🇩🇴" },
  DZ: { name: "Algeria", flag: "🇩🇿" },
  EC: { name: "Ecuador", flag: "🇪🇨" },
  EE: { name: "Estonia", flag: "🇪🇪" },
  EG: { name: "Egypt", flag: "🇪🇬" },
  ER: { name: "Eritrea", flag: "🇪🇷" },
  ES: { name: "Spain", flag: "🇪🇸" },
  ET: { name: "Ethiopia", flag: "🇪🇹" },
  FI: { name: "Finland", flag: "🇫🇮" },
  FJ: { name: "Fiji", flag: "🇫🇯" },
  FO: { name: "Faroe Islands", flag: "🇫🇴" },
  FR: { name: "France", flag: "🇫🇷" },
  GA: { name: "Gabon", flag: "🇬🇦" },
  GB: { name: "United Kingdom", flag: "🇬🇧" },
  GD: { name: "Grenada", flag: "🇬🇩" },
  GE: { name: "Georgia", flag: "🇬🇪" },
  GF: { name: "French Guiana", flag: "🇬🇫" },
  GH: { name: "Ghana", flag: "🇬🇭" },
  GL: { name: "Greenland", flag: "🇬🇱" },
  GQ: { name: "Equatorial Guinea", flag: "🇬🇶" },
  GR: { name: "Greece", flag: "🇬🇷" },
  GT: { name: "Guatemala", flag: "🇬🇹" },
  GU: { name: "Guam", flag: "🇬🇺" },
  GY: { name: "Guyana", flag: "🇬🇾" },
  HK: { name: "Hong Kong", flag: "🇭🇰" },
  HN: { name: "Honduras", flag: "🇭🇳" },
  HR: { name: "Croatia", flag: "🇭🇷" },
  HT: { name: "Haiti", flag: "🇭🇹" },
  HU: { name: "Hungary", flag: "🇭🇺" },
  ID: { name: "Indonesia", flag: "🇮🇩" },
  IE: { name: "Ireland", flag: "🇮🇪" },
  IL: { name: "Israel", flag: "🇮🇱" },
  IN: { name: "India", flag: "🇮🇳" },
  IQ: { name: "Iraq", flag: "🇮🇶" },
  IR: { name: "Iran", flag: "🇮🇷" },
  IS: { name: "Iceland", flag: "🇮🇸" },
  IT: { name: "Italy", flag: "🇮🇹" },
  JM: { name: "Jamaica", flag: "🇯🇲" },
  JO: { name: "Jordan", flag: "🇯🇴" },
  JP: { name: "Japan", flag: "🇯🇵" },
  KE: { name: "Kenya", flag: "🇰🇪" },
  KG: { name: "Kyrgyzstan", flag: "🇰🇬" },
  KH: { name: "Cambodia", flag: "🇰🇭" },
  KN: { name: "Saint Kitts & Nevis", flag: "🇰🇳" },
  KP: { name: "North Korea", flag: "🇰🇵" },
  KR: { name: "South Korea", flag: "🇰🇷" },
  KW: { name: "Kuwait", flag: "🇰🇼" },
  KY: { name: "Cayman Islands", flag: "🇰🇾" },
  KZ: { name: "Kazakhstan", flag: "🇰🇿" },
  LA: { name: "Laos", flag: "🇱🇦" },
  LB: { name: "Lebanon", flag: "🇱🇧" },
  LC: { name: "Saint Lucia", flag: "🇱🇨" },
  LI: { name: "Liechtenstein", flag: "🇱🇮" },
  LK: { name: "Sri Lanka", flag: "🇱🇰" },
  LR: { name: "Liberia", flag: "🇱🇷" },
  LS: { name: "Lesotho", flag: "🇱🇸" },
  LT: { name: "Lithuania", flag: "🇱🇹" },
  LU: { name: "Luxembourg", flag: "🇱🇺" },
  LV: { name: "Latvia", flag: "🇱🇻" },
  LY: { name: "Libya", flag: "🇱🇾" },
  MA: { name: "Morocco", flag: "🇲🇦" },
  MC: { name: "Monaco", flag: "🇲🇨" },
  MD: { name: "Moldova", flag: "🇲🇩" },
  MG: { name: "Madagascar", flag: "🇲🇬" },
  MK: { name: "North Macedonia", flag: "🇲🇰" },
  MM: { name: "Myanmar", flag: "🇲🇲" },
  MN: { name: "Mongolia", flag: "🇲🇳" },
  MO: { name: "Macau", flag: "🇲🇴" },
  MT: { name: "Malta", flag: "🇲🇹" },
  MU: { name: "Mauritius", flag: "🇲🇺" },
  MV: { name: "Maldives", flag: "🇲🇻" },
  MW: { name: "Malawi", flag: "🇲🇼" },
  MX: { name: "Mexico", flag: "🇲🇽" },
  MY: { name: "Malaysia", flag: "🇲🇾" },
  MZ: { name: "Mozambique", flag: "🇲🇿" },
  NA: { name: "Namibia", flag: "🇳🇦" },
  NC: { name: "New Caledonia", flag: "🇳🇨" },
  NE: { name: "Niger", flag: "🇳🇪" },
  NG: { name: "Nigeria", flag: "🇳🇬" },
  NI: { name: "Nicaragua", flag: "🇳🇮" },
  NL: { name: "Netherlands", flag: "🇳🇱" },
  NO: { name: "Norway", flag: "🇳🇴" },
  NP: { name: "Nepal", flag: "🇳🇵" },
  NU: { name: "Niue", flag: "🇳🇺" },
  NZ: { name: "New Zealand", flag: "🇳🇿" },
  OM: { name: "Oman", flag: "🇴🇲" },
  PA: { name: "Panama", flag: "🇵🇦" },
  PE: { name: "Peru", flag: "🇵🇪" },
  PF: { name: "French Polynesia", flag: "🇵🇫" },
  PG: { name: "Papua New Guinea", flag: "🇵🇬" },
  PH: { name: "Philippines", flag: "🇵🇭" },
  PK: { name: "Pakistan", flag: "🇵🇰" },
  PL: { name: "Poland", flag: "🇵🇱" },
  PR: { name: "Puerto Rico", flag: "🇵🇷" },
  PS: { name: "Palestine", flag: "🇵🇸" },
  PT: { name: "Portugal", flag: "🇵🇹" },
  PY: { name: "Paraguay", flag: "🇵🇾" },
  QA: { name: "Qatar", flag: "🇶🇦" },
  RE: { name: "Réunion", flag: "🇷🇪" },
  RO: { name: "Romania", flag: "🇷🇴" },
  RS: { name: "Serbia", flag: "🇷🇸" },
  RU: { name: "Russia", flag: "🇷🇺" },
  RW: { name: "Rwanda", flag: "🇷🇼" },
  SA: { name: "Saudi Arabia", flag: "🇸🇦" },
  SB: { name: "Solomon Islands", flag: "🇸🇧" },
  SC: { name: "Seychelles", flag: "🇸🇨" },
  SD: { name: "Sudan", flag: "🇸🇩" },
  SE: { name: "Sweden", flag: "🇸🇪" },
  SG: { name: "Singapore", flag: "🇸🇬" },
  SI: { name: "Slovenia", flag: "🇸🇮" },
  SK: { name: "Slovakia", flag: "🇸🇰" },
  SL: { name: "Sierra Leone", flag: "🇸🇱" },
  SM: { name: "San Marino", flag: "🇸🇲" },
  SN: { name: "Senegal", flag: "🇸🇳" },
  SO: { name: "Somalia", flag: "🇸🇴" },
  SR: { name: "Suriname", flag: "🇸🇷" },
  SS: { name: "South Sudan", flag: "🇸🇸" },
  SV: { name: "El Salvador", flag: "🇸🇻" },
  SY: { name: "Syria", flag: "🇸🇾" },
  SZ: { name: "Swaziland", flag: "🇸🇿" },
  TC: { name: "Turks & Caicos", flag: "🇹🇨" },
  TD: { name: "Chad", flag: "🇹🇩" },
  TG: { name: "Togo", flag: "🇹🇬" },
  TH: { name: "Thailand", flag: "🇹🇭" },
  TJ: { name: "Tajikistan", flag: "🇹🇯" },
  TM: { name: "Turkmenistan", flag: "🇹🇲" },
  TN: { name: "Tunisia", flag: "🇹🇳" },
  TO: { name: "Tonga", flag: "🇹🇴" },
  TR: { name: "Turkey", flag: "🇹🇷" },
  TT: { name: "Trinidad & Tobago", flag: "🇹🇹" },
  TW: { name: "Taiwan", flag: "🇹🇼" },
  TZ: { name: "Tanzania", flag: "🇹🇿" },
  UA: { name: "Ukraine", flag: "🇺🇦" },
  UG: { name: "Uganda", flag: "🇺🇬" },
  US: { name: "United States", flag: "🇺🇸" },
  UY: { name: "Uruguay", flag: "🇺🇾" },
  UZ: { name: "Uzbekistan", flag: "🇺🇿" },
  VA: { name: "Vatican City", flag: "🇻🇦" },
  VC: { name: "St. Vincent", flag: "🇻🇨" },
  VE: { name: "Venezuela", flag: "🇻🇪" },
  VI: { name: "Virgin Islands", flag: "🇻🇮" },
  VN: { name: "Vietnam", flag: "🇻🇳" },
  WS: { name: "Samoa", flag: "🇼🇸" },
  YE: { name: "Yemen", flag: "🇾🇪" },
  ZA: { name: "South Africa", flag: "🇿🇦" },
  ZM: { name: "Zambia", flag: "🇿🇲" },
  ZW: { name: "Zimbabwe", flag: "🇿🇼" }
};

interface UniversityDirectoryProps {
  onSelectCountryCode: (code: string) => void;
  onInitiateCounselingMatch: (uniName: string) => void;
}

export default function UniversityDirectory({ 
  onSelectCountryCode, 
  onInitiateCounselingMatch 
}: UniversityDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountryCode, setFilterCountryCode] = useState<string>("ALL");

  // Get list of unique country codes present in our list to build smart quick-filter badges
  const availableCountryCodes = useMemo(() => {
    const codes = new Set<string>();
    (universitiesData as UniversityItem[]).forEach((item) => {
      if (item.c) codes.add(item.c);
    });
    return Array.from(codes).sort((a, b) => {
      const nameA = COUNTRY_MAP[a]?.name || a;
      const nameB = COUNTRY_MAP[b]?.name || b;
      return nameA.localeCompare(nameB);
    });
  }, []);

  // Filter our dataset based on search string and select country
  const filteredUniversities = useMemo(() => {
    let list = universitiesData as UniversityItem[];

    if (filterCountryCode !== "ALL") {
      list = list.filter(u => u.c === filterCountryCode);
    }

    if (searchTerm.trim().length > 0) {
      const cleanSearch = searchTerm.toLowerCase().trim();
      list = list.filter((u) => {
        const uniName = u.n.toLowerCase();
        const countryMeta = COUNTRY_MAP[u.c];
        const countryName = countryMeta ? countryMeta.name.toLowerCase() : "";
        return uniName.includes(cleanSearch) || countryName.includes(cleanSearch) || u.c.toLowerCase().includes(cleanSearch);
      });
    }

    return list;
  }, [searchTerm, filterCountryCode]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 md:p-6 space-y-6" id="university-database-explorer">
      
      {/* Decriptive Header (Shiksha pattern) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-50 text-red-500 rounded-lg">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="font-display font-black text-gray-900 text-lg md:text-xl uppercase tracking-tight">
              Global University Index
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            Search verified links from {universitiesData.length}+ world university partners. Instantly connect for Free Counseling.
          </p>
        </div>

        {/* Counter badge */}
        <div className="px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-1 text-[11px] font-mono font-bold text-gray-500 shrink-0 self-start md:self-center">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span>{filteredUniversities.length} Institutions Listed</span>
        </div>
      </div>

      {/* Input controls & buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5" id="directory-controls">
        
        {/* Real-time search filter */}
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by university name, country, or code (e.g. 'Oxford', 'Canada')..."
            className="w-full text-xs border border-gray-200 rounded-xl pl-10 pr-4 py-3 placeholder-gray-400 focus:outline-hidden focus:ring-1 focus:ring-red-500 transition-all text-gray-800 bg-gray-55"
          />
        </div>

        {/* Country Picker Selector */}
        <div className="relative">
          <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filterCountryCode}
            onChange={(e) => setFilterCountryCode(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-xl pl-10 pr-8 py-3 focus:outline-hidden focus:ring-1 focus:ring-red-500 appearance-none bg-gray-55 cursor-pointer text-gray-700 font-bold"
          >
            <option value="ALL">🌎 All Countries & Regions</option>
            {availableCountryCodes.map((code) => {
              const countryInfo = COUNTRY_MAP[code];
              return (
                <option key={code} value={code}>
                  {countryInfo ? `${countryInfo.flag} ${countryInfo.name}` : code}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Country quick badging line */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">
          Quick Region Matches:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setFilterCountryCode("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterCountryCode === "ALL" ? "bg-red-500 text-white shadow-xs" : "bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-100"}`}
          >
            All
          </button>
          {["GB", "CA", "US", "CH", "IN", "SG", "AU"].map((code) => {
            const inf = COUNTRY_MAP[code];
            if (!inf) return null;
            return (
              <button
                key={code}
                onClick={() => setFilterCountryCode(code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${filterCountryCode === code ? "bg-red-500 text-white shadow-xs" : "bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-100"}`}
              >
                <span>{inf.flag}</span>
                <span>{inf.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredUniversities.length === 0 ? (
        <div className="py-16 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 space-y-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <h4 className="text-gray-800 font-bold text-xs">No matching universities found</h4>
          <p className="text-[11px] text-gray-400 max-w-sm mx-auto px-4">
            Try adjusting your search filters. We dynamically match over 1,500+ verified institutes globally.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="directory-grid-list">
          {filteredUniversities.map((uni, idx) => {
            const countryMeta = COUNTRY_MAP[uni.c] || { name: uni.c, flag: "🏳️" };
            return (
              <div 
                key={`${uni.c}-${idx}`}
                className="bg-white border border-gray-150/70 hover:border-red-200 p-4 rounded-xl flex flex-col justify-between hover:shadow-xs transition-all gap-4 animate-fade-in group"
              >
                <div className="space-y-2">
                  {/* Flag & Country label */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{countryMeta.flag}</span>
                    <span className="text-[10px] uppercase font-black font-mono text-gray-400 tracking-wider">
                      {countryMeta.name}
                    </span>
                  </div>

                  {/* University Name */}
                  <h3 className="font-display font-black text-gray-900 text-xs sm:text-sm line-clamp-1 group-hover:text-red-500 transition-colors">
                    {uni.n}
                  </h3>
                </div>

                {/* Micro Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                  {/* Direct Link */}
                  <a
                    href={uni.u}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-center font-bold text-[10px] text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-1"
                    title={`Visit official site for ${uni.n}`}
                  >
                    <span>Official Portal</span>
                  </a>

                  {/* Counselor Pairing */}
                  <button
                    onClick={() => onInitiateCounselingMatch(uni.n)}
                    className="px-3.5 py-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 font-extrabold text-[10px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Get Matched</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom informational foot-board */}
      <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-red-800">
          <Award className="w-4 h-4 text-red-500 shrink-0" />
          <span className="font-semibold text-[11px] leading-snug text-center sm:text-left">
            Need admission and visa counselling for any of these universities?
          </span>
        </div>
        <button
          onClick={() => onInitiateCounselingMatch("General Admissions Guide")}
          className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white font-extrabold text-[10px] rounded-lg cursor-pointer whitespace-nowrap self-stretch sm:self-auto text-center"
        >
          Secure 100% Free Counseling Match
        </button>
      </div>

    </div>
  );
}
