import type { SiteSettings } from '@waren/shared';
import type { ConsentChoice } from './consent';

type TrackingIds = SiteSettings['tracking'];

const GOOGLE_TAG_MANAGER_URL = 'https://www.googletagmanager.com/gtm.js';
const GOOGLE_TAG_URL = 'https://www.googletagmanager.com/gtag/js';
const META_PIXEL_URL = 'https://connect.facebook.net/en_US/fbevents.js';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; callMethod?: unknown };
    _fbq?: unknown;
  }
}

function addScript(src: string): void {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGoogleTagManager(id: string): void {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  addScript(`${GOOGLE_TAG_MANAGER_URL}?id=${encodeURIComponent(id)}`);
}

function loadGoogleTag(id: string): void {
  window.dataLayer = window.dataLayer ?? [];
  const dataLayer = window.dataLayer;
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
  addScript(`${GOOGLE_TAG_URL}?id=${encodeURIComponent(id)}`);
}

function loadMetaPixel(id: string): void {
  if (!window.fbq) {
    const queue: unknown[] = [];
    const fbq = (...args: unknown[]) => {
      queue.push(args);
    };
    window.fbq = Object.assign(fbq, { queue });
    window._fbq = window.fbq;
  }
  window.fbq('init', id);
  window.fbq('track', 'PageView');
  addScript(META_PIXEL_URL);
}

export function loadConsentedTags(tracking: TrackingIds, choice: ConsentChoice): void {
  if (choice.analytics && tracking.googleTagManagerId) {
    loadGoogleTagManager(tracking.googleTagManagerId);
  }
  if (choice.analytics && tracking.googleTagId) loadGoogleTag(tracking.googleTagId);
  if (choice.marketing && tracking.metaPixelId) loadMetaPixel(tracking.metaPixelId);
}
