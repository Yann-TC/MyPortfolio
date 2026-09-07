import type { ProfileSettings } from '../data/profile';

const LONG_MONTH = { month: 'long' } as const;

function parseDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDayMonth(date: Date) {
  return `${date.getDate()} ${date.toLocaleString('en', LONG_MONTH)}`;
}

export function internshipYear(profile: ProfileSettings) {
  return String(parseDate(profile.internshipEnd)?.getFullYear() ?? 2027);
}

export function internshipMonthRange(profile: ProfileSettings) {
  const start = parseDate(profile.internshipStart);
  const end = parseDate(profile.internshipEnd);

  if (!start || !end) {
    return 'April - August';
  }

  return `${start.toLocaleString('en', LONG_MONTH)} - ${end.toLocaleString(
    'en',
    LONG_MONTH,
  )}`;
}

export function internshipDateRange(profile: ProfileSettings) {
  const start = parseDate(profile.internshipStart);
  const end = parseDate(profile.internshipEnd);

  if (!start || !end) {
    return '1 April - 31 August 2027';
  }

  return `${formatDayMonth(start)} - ${formatDayMonth(end)} ${end.getFullYear()}`;
}
