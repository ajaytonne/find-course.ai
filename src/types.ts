export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isVoiceInput?: boolean;
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

