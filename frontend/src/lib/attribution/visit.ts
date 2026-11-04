import type { Attribution } from '@waren/shared';

const VISIT_KEY = 'waren_visit';
const UTM_SOURCE = 'utm_source';
const UTM_CAMPAIGN = 'utm_campaign';

type Visit = Pick<Attribution, 'utmSource' | 'utmCampaign' | 'referrer'>;

function readVisit(): Visit {
  try {
    return JSON.parse(sessionStorage.getItem(VISIT_KEY) ?? '{}') as Visit;
  } catch {
    return {};
  }
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Held for this tab's visit only, and sent only when a form is submitted (decision 0017).
export function captureVisit(): void {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    const query = new URLSearchParams(window.location.search);
    const referrerHost = hostOf(document.referrer);
    const visit: Visit = {
      ...(query.get(UTM_SOURCE) ? { utmSource: query.get(UTM_SOURCE) ?? '' } : {}),
      ...(query.get(UTM_CAMPAIGN) ? { utmCampaign: query.get(UTM_CAMPAIGN) ?? '' } : {}),
      ...(referrerHost && referrerHost !== window.location.hostname
        ? { referrer: `https://${referrerHost}/` }
        : {}),
    };
    sessionStorage.setItem(VISIT_KEY, JSON.stringify(visit));
  } catch {
    // Storage can be blocked. The lead then counts as direct, and the form still works.
  }
}

export function visitAttribution(heardAbout = ''): Attribution {
  captureVisit();
  return {
    page: window.location.pathname,
    ...readVisit(),
    ...(heardAbout ? { heardAbout: heardAbout as Attribution['heardAbout'] } : {}),
  };
}
