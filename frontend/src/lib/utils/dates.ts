const DEFAULT_TIME_ZONE = 'UTC';

const ORDINALS: Record<number, string> = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  21: 'st',
  22: 'nd',
  23: 'rd',
  31: 'st',
};

export function formatDate(iso: string, timeZone?: string | null): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timeZone ?? DEFAULT_TIME_ZONE,
  }).format(new Date(iso));
}

function dayOrdinal(day: number): string {
  return ORDINALS[day] ?? 'th';
}

export function formatFeatureEvent(
  iso: string,
  timeZone?: string | null,
): { month: string; day: number; ordinal: string; time: string | null; zone: string | null } {
  const zone = timeZone?.trim() || DEFAULT_TIME_ZONE;
  const date = new Date(iso);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: zone })
    .format(date)
    .toUpperCase();
  const day = Number(
    new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: zone }).format(date),
  );
  const hourParts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: zone,
  }).formatToParts(date);
  const hour = hourParts.find((part) => part.type === 'hour')?.value ?? '';
  const minute = hourParts.find((part) => part.type === 'minute')?.value ?? '';
  const dayPeriod = hourParts.find((part) => part.type === 'dayPeriod')?.value ?? '';
  const isMidnight = hour === '12' && minute === '00' && dayPeriod.toUpperCase() === 'AM';
  const time = isMidnight && !timeZone
    ? null
    : `${hour}${minute === '00' ? '' : `:${minute}`} ${dayPeriod}`.toUpperCase();
  const rawZone = timeZone
    ? new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'long',
        timeZone: zone,
        hour: 'numeric',
      })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')
        ?.value?.toUpperCase()
    : null;
  const zoneLabel = rawZone
    ? rawZone.replace(/\s+(DAYLIGHT|STANDARD)\s+TIME$/, ' TIME')
    : null;
  return { month, day, ordinal: dayOrdinal(day).toUpperCase(), time, zone: zoneLabel };
}

export function isYoutubeUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return host === 'youtube.com' || host === 'youtu.be' || host.endsWith('.youtube.com');
  } catch {
    return false;
  }
}
