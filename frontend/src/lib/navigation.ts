import { ROUTES } from '@waren/shared';
import { dictionary } from './dictionary';

const { nav } = dictionary;

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: readonly NavLink[] = [
  { label: nav.about, href: ROUTES.about },
  { label: nav.team, href: ROUTES.team },
  { label: nav.insights, href: ROUTES.insights },
  { label: nav.webinars, href: ROUTES.webinars },
  { label: nav.partners, href: ROUTES.partners },
  { label: nav.contact, href: ROUTES.contact },
];

export const LEGAL_LINKS = [
  { label: nav.privacy, href: ROUTES.privacy, slug: 'privacy-policy' },
  { label: nav.terms, href: ROUTES.terms, slug: 'terms' },
  { label: nav.cookies, href: ROUTES.cookies, slug: 'cookie-policy' },
] as const;
