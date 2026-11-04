import { ROUTES } from '@waren/shared/constants';
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
];

export const CONTACT_LINK: NavLink = { label: nav.contactUs, href: ROUTES.contact };

export const QUICK_LINKS: readonly NavLink[] = [
  { label: footer.aboutUs, href: ROUTES.about },
  { label: footer.ourPeople, href: ROUTES.team },
  { label: footer.ourPartners, href: ROUTES.partners },
  { label: footer.insights, href: ROUTES.insights },
  { label: footer.webinars, href: ROUTES.webinars },
  { label: footer.contact, href: ROUTES.contact },
];

export const FOOTER_PRACTICE_LIMIT = 5;

export const LEGAL_LINKS = [
  { label: footer.terms, href: ROUTES.terms, slug: 'terms' },
  { label: footer.privacy, href: ROUTES.privacy, slug: 'privacy-policy' },
] as const;
