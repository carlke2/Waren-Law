import { ROUTES } from '@waren/shared/constants';
import type { RootSlug } from '@waren/shared';
import { dictionary } from './dictionary';

const { nav, footer } = dictionary;

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: readonly NavLink[] = [
  { label: nav.home, href: ROUTES.home },
  { label: nav.about, href: ROUTES.about },
  { label: nav.practiceAreas, href: ROUTES.expertise },
  { label: nav.people, href: ROUTES.team },
  { label: nav.insights, href: ROUTES.insights },
  { label: nav.partners, href: ROUTES.partners },
  { label: nav.faq, href: ROUTES.faq },
];

export const CONTACT_LINK: NavLink = { label: nav.contactUs, href: ROUTES.contact };

export const PANEL_NAV: readonly { id: string; label: string }[] = [
  { id: 'about', label: nav.aboutUs },
  { id: 'team', label: nav.ourTeam },
  { id: 'partners', label: nav.ourPartners },
  { id: 'expertise', label: nav.areaOfExpertise },
  { id: 'insights', label: nav.insights },
  { id: 'contact', label: nav.contactUs },
];

export const QUICK_LINKS: readonly NavLink[] = [
  { label: footer.aboutUs, href: ROUTES.about },
  { label: footer.ourPeople, href: ROUTES.team },
  { label: footer.ourPartners, href: ROUTES.partners },
  { label: footer.insights, href: ROUTES.insights },
  { label: footer.webinars, href: ROUTES.webinars },
  { label: footer.contact, href: ROUTES.contact },
  { label: footer.faq, href: ROUTES.faq },
];

export const FOOTER_PRACTICE_LIMIT = 5;

export const LEGAL_LINKS = [
  { label: footer.terms, href: ROUTES.terms, slug: 'terms' },
  { label: footer.privacy, href: ROUTES.privacy, slug: 'privacy-policy' },
] as const;

export type RootSlugType = Pick<RootSlug, 'slug' | 'type'>;

const ABOUT_PATHS: readonly string[] = [ROUTES.about];
const CATEGORY_PREFIX = ROUTES.category('');

export function activeNavHref(pathname: string, rootSlugs: readonly RootSlugType[]): string | null {
  if (pathname === ROUTES.home) return ROUTES.home;
  if (pathname === ROUTES.partners) return ROUTES.partners;
  if (pathname === ROUTES.faq) return ROUTES.faq;
  if (ABOUT_PATHS.includes(pathname)) return ROUTES.about;
  if (pathname.startsWith(ROUTES.team)) return ROUTES.team;
  if (pathname === ROUTES.expertise) return ROUTES.expertise;
  if (pathname.startsWith(ROUTES.insights) || pathname.startsWith(CATEGORY_PREFIX)) {
    return ROUTES.insights;
  }
  const root = rootSlugs.find(({ slug }) => ROUTES.root(slug) === pathname);
  if (root?.type === 'practice_area') return ROUTES.expertise;
  if (root?.type === 'insight' || root?.type === 'webinar') return ROUTES.insights;
  return null;
}
