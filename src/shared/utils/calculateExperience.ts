/**
 * Calculate years of professional experience from a start date.
 * @param startDate - Career start date (format: YYYY-MM-DD)
 * @returns Formatted string like "8+" or "10+"
 */
export function calculateYearsOfExperience(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();

  const years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();

  const adjustedYears = monthDiff < 0 ? years - 1 : years;

  return `${adjustedYears}+`;
}

export const CAREER_START_DATE = '2017-08-01';

export const yearsOfExperience = calculateYearsOfExperience(CAREER_START_DATE);
