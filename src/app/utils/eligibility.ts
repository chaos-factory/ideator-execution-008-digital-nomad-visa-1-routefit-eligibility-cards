import type { Program, FilterState, EligibilityResult } from '../types';

export function calculateEligibility(
  program: Program,
  filters: FilterState,
  convertedIncome: number // Income converted to program currency
): EligibilityResult {
  const issues: string[] = [];
  let status: 'pass' | 'likely' | 'check_nuance' | 'not_eligible' = 'pass';

  // Check work type
  if (!program.work_types.includes(filters.workType)) {
    return {
      status: 'not_eligible',
      reasons: ['Work type not supported by this program'],
      badge: 'not-eligible',
    };
  }

  // Check nationality exclusions
  if (
    program.nationality_rules.excluded_nationalities &&
    program.nationality_rules.excluded_nationalities.includes(filters.nationality)
  ) {
    return {
      status: 'not_eligible',
      reasons: [`Excludes ${filters.nationality} nationals`],
      badge: 'not-eligible',
    };
  }

  // Check dependents
  if (filters.dependents && !program.dependents_allowed) {
    return {
      status: 'not_eligible',
      reasons: ['Dependents not allowed'],
      badge: 'not-eligible',
    };
  }

  // Check income requirement
  const programMonthlyIncome =
    program.income_requirement.basis === 'annual'
      ? program.income_requirement.amount / 12
      : program.income_requirement.amount;

  const incomeRatio = convertedIncome / programMonthlyIncome;

  if (incomeRatio < 0.9) {
    // More than 10% short
    return {
      status: 'not_eligible',
      reasons: [
        `Income requirement not met (need ${programMonthlyIncome.toFixed(0)} ${
          program.income_requirement.currency
        }/month)`,
      ],
      badge: 'not-eligible',
    };
  } else if (incomeRatio < 1.0) {
    // Within 10% short
    status = 'likely';
    issues.push('Close to income threshold - may need additional documentation');
  }

  // Check local work cap for freelancers/self-employed
  if (
    (filters.workType === 'freelancer' || filters.workType === 'self_employed') &&
    program.local_work_cap_percent !== null &&
    program.local_work_cap_percent < 30
  ) {
    status = status === 'pass' ? 'check_nuance' : status;
    issues.push(
      `Local work limited to ${program.local_work_cap_percent}% - verify client locations`
    );
  }

  return {
    status,
    reasons: issues,
    badge: status,
  };
}

export function getStatusBadgeColor(
  status: 'pass' | 'likely' | 'check_nuance' | 'not_eligible'
): string {
  switch (status) {
    case 'pass':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'likely':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'check_nuance':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'not_eligible':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function getStatusLabel(
  status: 'pass' | 'likely' | 'check_nuance' | 'not_eligible'
): string {
  switch (status) {
    case 'pass':
      return 'Pass';
    case 'likely':
      return 'Likely';
    case 'check_nuance':
      return 'Check nuance';
    case 'not_eligible':
      return 'Not eligible';
    default:
      return 'Unknown';
  }
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'official_law':
      return 'bg-purple-100 text-purple-800';
    case 'official_guidance':
      return 'bg-indigo-100 text-indigo-800';
    case 'post_practice':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getConfidenceLabel(confidence: string): string {
  switch (confidence) {
    case 'official_law':
      return 'Official law';
    case 'official_guidance':
      return 'Official guidance';
    case 'post_practice':
      return 'Reported practice';
    default:
      return confidence;
  }
}
