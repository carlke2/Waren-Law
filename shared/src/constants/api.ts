export const API_PREFIX = 'api/v1';
export const HEALTH_PATH = 'health';
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const PUBLIC_CACHE_CONTROL = 'public, max-age=60, s-maxage=300, stale-while-revalidate=600';
export const API_ROUTES = {
  settings: 'settings',
  offices: 'offices',
  pages: 'pages',
  practiceAreas: 'practice-areas',
  team: 'team',
  insights: 'insights',
  categories: 'categories',
  webinars: 'webinars',
  partners: 'partners',
  awards: 'awards',
  clientLogos: 'client-logos',
  testimonials: 'testimonials',
  resolve: 'resolve',
  search: 'search',
  redirects: 'redirects',
  contact: 'contact',
  home: 'home',
  newsletter: 'newsletter',
  consultation: 'consultation',
  recordingRequests: 'recording-requests',
  leads: 'leads',
} as const;
export const RELATED_INSIGHTS_LIMIT = 3;
export const SEARCH_RESULT_LIMIT = 20;
export const SEARCH_QUERY_MAX_LENGTH = 100;
export const SEARCH_RESULT_TYPES = ['insight', 'practice_area', 'team_member'] as const;
export const CONTACT_FIELD_MAX_LENGTH = 200;
export const CONTACT_MESSAGE_MAX_LENGTH = 5000;
export const CONTACT_SOURCE_MAX_LENGTH = 500;
export const NEWSLETTER_CONFIRM_PATH = 'confirm';
export const NEWSLETTER_TOKEN_PARAM = 'token';
export const NEWSLETTER_TOKEN_PATTERN = /^[a-f0-9]{64}$/;
export const FEATURED_TEAM_LIMIT = 4;
export const LATEST_INSIGHTS_LIMIT = 3;
export const REDIRECTS_ALL_PATH = 'all';
export const FEED_ITEM_LIMIT = 30;
