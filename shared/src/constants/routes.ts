export const ROUTES = {
  home: '/',
  about: '/about-us/',
  team: '/our-team/',
  partners: '/our-partners/',
  expertise: '/area-of-expertise/',
  insights: '/insights/',
  webinars: '/insights/webinars/',
  contact: '/contact-us/',
  privacy: '/privacy-policy/',
  terms: '/terms/',
  cookies: '/cookie-policy/',
  search: '/search/',
  root: (slug: string) => `/${slug}/`,
  profile: (slug: string) => `/our-team/${slug}/`,
  category: (slug: string) => `/category/${slug}/`,
  insightsPage: (page: number) => (page <= 1 ? '/insights/' : `/insights/page/${page}/`),
  categoryPage: (slug: string, page: number) =>
    page <= 1 ? `/category/${slug}/` : `/category/${slug}/page/${page}/`,
} as const;

export const TEAM_FILTER_PARAM = 'practiceArea';
export const SEARCH_PARAM = 'q';
