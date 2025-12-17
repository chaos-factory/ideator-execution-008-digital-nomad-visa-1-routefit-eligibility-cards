export interface Program {
  program_id: string;
  country_code: string;
  name: string;
  work_types: ('employee' | 'freelancer' | 'self_employed')[];
  nationality_rules: {
    excluded_nationalities: string[];
    notes: string;
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
  confidence: 'official_law' | 'official_guidance' | 'post_practice';
  notes: string;
}

export interface Country {
  code: string;
  name: string;
  region: string;
}

export interface FilterState {
  nationality: string;
  workType: 'employee' | 'freelancer' | 'self_employed';
  income: number;
  currency: string;
  dependents: boolean;
  regions: string[];
  minDuration: number;
  dependentsOnly: boolean;
  sort: 'eligibility' | 'income' | 'duration' | 'updated';
}

export interface EligibilityResult {
  status: 'pass' | 'likely' | 'check_nuance' | 'not_eligible';
  reasons: string[];
  badge: string;
}

export interface ProgramWithEligibility extends Program {
  eligibility: EligibilityResult;
  convertedIncome: number;
}
