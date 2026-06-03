export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isVoiceInput?: boolean;
  animate?: boolean;
}

export interface CampusHotspot {
  name: string;
  description: string;
  image: string;
  vibe: string;
}

export interface University {
  name: string;
  country: string;
  ranking: number;
  fees: string;
  acceptanceRate: string;
  tags: string[];
  characteristic: string;
  successStory: string;
  description: string;
  image?: string;
  hotspots?: CampusHotspot[];
  admissionDeadline?: string;
  admissionRequirements?: string;
  cutoffScore?: string;
  highestPlacementPackage?: string;
  averagePlacementPackage?: string;
  majorRecruiters?: string[];
  keyHiringSectors?: string[];
}

export interface MatchingState {
  currentStep: number;
  country: string;
  interest: string;
  level: string;
  budget: string;
  mode: string;
  lifestyle: string;
  proficiency: string;
  employmentStatus: string;
  counsellorNeeded: boolean;
  scholarshipInterest: string;
  matches: University[];
  completed: boolean;
}

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  value: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  fieldName: keyof Omit<MatchingState, "currentStep" | "matches" | "completed">;
  options: QuestionOption[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  timestamp: string;
  employmentStatus?: string;
}

