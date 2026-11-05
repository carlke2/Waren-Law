export const ROUTES = {
  home: '/',
  about: '/about-us/',
  team: '/our-team/',
  partners: '/our-partners/',
  expertise: '/area-of-expertise/',
  insights: '/insights/',
  webinars: '/insights/webinars/',
  contact: '/contact-us/',
  consultation: '/book-a-consultation/',
  privacy: '/privacy-policy/',
  terms: '/terms/',
  cookies: '/cookie-policy/',
  search: '/search/',
  faq: '/faq/',
  feed: '/feed/',
  root: (slug: string) => `/${slug}/`,
  profile: (slug: string) => `/our-team/${slug}/`,
  teamArea: (slug: string) => `/our-team/area/${slug}/`,
  category: (slug: string) => `/category/${slug}/`,
  insightsPage: (page: number) => (page <= 1 ? '/insights/' : `/insights/page/${page}/`),
  categoryPage: (slug: string, page: number) =>
    page <= 1 ? `/category/${slug}/` : `/category/${slug}/page/${page}/`,
} as const;

export const TEAM_FILTER_PARAM = 'practiceArea';
export const INSIGHT_PRACTICE_PARAM = 'practiceArea';
export const INSIGHT_CATEGORY_PARAM = 'category';
export const INSIGHT_KIND_PARAM = 'kind';
export const INSIGHT_KIND_WEBINARS = 'webinars';
export const SEARCH_PARAM = 'q';
