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
} as const;
export const RELATED_INSIGHTS_LIMIT = 3;
export const SEARCH_RESULT_LIMIT = 20;
export const SEARCH_QUERY_MAX_LENGTH = 100;
export const SEARCH_RESULT_TYPES = ['insight', 'practice_area', 'team_member'] as const;
