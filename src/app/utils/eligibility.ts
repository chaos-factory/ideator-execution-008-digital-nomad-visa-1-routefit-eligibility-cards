import type { Program, FilterState, EligibilityStatus, EligibilityResult } from '../types';

export function calculateEligibility(
  program: Program,
  filters: FilterState,
  exchangeRates: Record<string, number>
): EligibilityResult {
  const reasons: string[] = [];
  let status: EligibilityStatus = 'pass';

  // Check work type
  if (!program.work_types.includes(filters.workType)) {
    return {
      program,
      status: 'not_eligible',
      reasons: [`Work type '${filters.workType}' not accepted`],
    };
  }

  // Check nationality
  if (program.nationality_rules.excluded_nationalities.includes(filters.nationality)) {
    return {
      program,
      status: 'not_eligible',
      reasons: [`Nationality ${filters.nationality} excluded`],
    };
  }

  // Check dependents
  if (filters.dependents && !program.dependents_allowed) {
    return {
      program,
      status: 'not_eligible',
      reasons: ['Dependents not allowed'],
    };
  }

  // Check income requirement
  const userMonthlyIncome = filters.income;
  const programMonthlyRequirement =
    program.income_requirement.basis === 'monthly'
      ? program.income_requirement.amount
      : program.income_requirement.amount / 12;

  // Convert program requirement to user's currency
  const programRequirementInUserCurrency = convertCurrency(
    programMonthlyRequirement,
    program.income_requirement.currency,
    filters.currency,
    exchangeRates
  );

  const incomeRatio = userMonthlyIncome / programRequirementInUserCurrency;

  if (incomeRatio < 0.9) {
    // More than 10% short
    return {
      program,
      status: 'not_eligible',
      reasons: [`Income below required threshold (${Math.round(incomeRatio * 100)}% of requirement)`],
    };
  } else if (incomeRatio < 1.0) {
    // Within 10% short
    status = 'likely';
    reasons.push('Close to income threshold - review application requirements');
  }

  // Check local work cap for freelancers/self-employed
  if (
    (filters.workType === 'freelancer' || filters.workType === 'self_employed') &&
    program.local_work_cap_percent !== null &&
    program.local_work_cap_percent < 30
  ) {
    status = status === 'pass' ? 'check_nuance' : status;
    reasons.push(`Max ${program.local_work_cap_percent}% income from local companies`);
  }

  // If there are nuances in notes, suggest checking
  if (program.notes && status === 'pass') {
    status = 'likely';
  }

  if (reasons.length === 0 && status === 'pass') {
    reasons.push('All core requirements met');
  }

  return { program, status, reasons };
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Rates are relative to EUR, so we need to convert through EUR
  const amountInEUR = fromCurrency === 'EUR' ? amount : amount / (rates[fromCurrency] || 1);
  const amountInTarget = toCurrency === 'EUR' ? amountInEUR : amountInEUR * (rates[toCurrency] || 1);

  return amountInTarget;
}

export function getStatusLabel(status: EligibilityStatus): string {
  switch (status) {
    case 'pass':
      return 'Pass';
    case 'likely':
      return 'Likely';
    case 'check_nuance':
      return 'Check nuance';
    case 'not_eligible':
      return 'Not eligible';
  }
}

export function getStatusAriaLabel(status: EligibilityStatus, programName: string): string {
  const label = getStatusLabel(status);
  return `Status: ${label} for ${programName}`;
}

export function getConfidenceLabel(confidence?: string): string {
  switch (confidence) {
    case 'official_law':
      return 'Official law';
    case 'official_guidance':
      return 'Official guidance';
    case 'post_practice':
      return 'Post practice';
    default:
      return 'Unknown';
  }
}
