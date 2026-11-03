const DEFAULT_TIME_ZONE = 'UTC';

export function formatDate(iso: string, timeZone?: string | null): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timeZone ?? DEFAULT_TIME_ZONE,
  }).format(new Date(iso));
}
