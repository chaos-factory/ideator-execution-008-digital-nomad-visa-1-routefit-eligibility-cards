export type WorkType = 'employee' | 'freelancer' | 'self_employed';

export type EligibilityStatus = 'pass' | 'likely' | 'check_nuance' | 'not_eligible';

export type Confidence = 'official_law' | 'official_guidance' | 'post_practice';

export interface Program {
  program_id: string;
  country_code: string;
  name: string;
  work_types: WorkType[];
  nationality_rules: {
    excluded_nationalities: string[];
    notes?: string;
  };
  income_requirement: {
    amount: number;
    currency: string;
    basis: 'monthly' | 'annual';
  };
  dependents_allowed: boolean;
  local_work_cap_percent: number | null;
  insurance_min: {
    amount: number;
    currency: string;
  } | null;
  duration_months: number;
  renewable: boolean;
  application_channel: string;
  official_url: string;
  as_of: string;
  confidence?: Confidence;
  notes?: string;
}

export interface Country {
  code: string;
  name: string;
  region: string;
}

export interface FilterState {
  nationality: string;
  workType: WorkType;
  income: number;
  currency: string;
  dependents: boolean;
  regions: string[];
  minDuration: number;
  dependentsOnly: boolean;
}

export interface EligibilityResult {
  program: Program;
  status: EligibilityStatus;
  reasons: string[];
}

export interface ExchangeRate {
  rates: Record<string, number>;
  timestamp: number;
}
