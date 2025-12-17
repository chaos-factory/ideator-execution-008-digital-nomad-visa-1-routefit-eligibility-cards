export function formatDuration(months: number): string {
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years}y ${remainingMonths}m`;
}

export function formatWorkTypes(types: string[]): string {
  const labels: Record<string, string> = {
    employee: 'Employee',
    freelancer: 'Freelancer',
    self_employed: 'Self-employed',
  };
  
  return types.map(t => labels[t] || t).join(', ');
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}
