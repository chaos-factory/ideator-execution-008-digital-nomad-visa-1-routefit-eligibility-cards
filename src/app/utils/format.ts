export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (e) {
    return `${currency} ${amount.toFixed(0)}`;
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

export function formatDuration(months: number): string {
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  
  return `${years}y ${remainingMonths}m`;
}

export function formatWorkType(workType: string): string {
  switch (workType) {
    case 'employee':
      return 'Employee';
    case 'freelancer':
      return 'Freelancer';
    case 'self_employed':
      return 'Self-employed';
    default:
      return workType;
  }
}
