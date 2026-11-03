export const CONSENT_COOKIE = 'waren_consent';
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const OPEN_CONSENT_EVENT = 'waren:open-consent';
const CONSENT_CHANGED_EVENT = 'waren:consent-changed';
const CONSENT_VERSION = 'v1';

export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

export function serialiseConsent({ analytics, marketing }: ConsentChoice): string {
  return `${CONSENT_VERSION}.${Number(analytics)}.${Number(marketing)}`;
}

export function parseConsent(value: string | null | undefined): ConsentChoice | null {
  const match = value?.match(/^v1\.([01])\.([01])$/);
  return match ? { analytics: match[1] === '1', marketing: match[2] === '1' } : null;
}

export function readConsentValue(cookieHeader: string): string | null {
  const entry = cookieHeader.split('; ').find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`));
  return entry ? entry.slice(CONSENT_COOKIE.length + 1) : null;
}

export function writeConsent(choice: ConsentChoice): void {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${serialiseConsent(choice)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
}
