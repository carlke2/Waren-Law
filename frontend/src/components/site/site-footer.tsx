import { ROUTES, type PracticeAreaSummary, type RootSlug, type SiteSettings } from '@waren/shared';
import { LineSvg } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import type { ReactNode } from 'react';
import { dictionary } from '@/lib/utils/dictionary';
import { FOOTER_PRACTICE_LIMIT, LEGAL_LINKS, QUICK_LINKS } from '@/lib/utils/navigation';
import { formatPhone, mailLink, telLink } from '@/lib/utils/links';
import { CookiePreferencesButton } from './cookie-consent';
import { FooterLogo } from './logo';
import { NewsletterForm } from './newsletter-form';
import { SocialLinks } from './social-links';

const text = dictionary.footer;
const CARD = 'team-card flex h-full flex-col gap-4 rounded-team border border-border bg-surface p-6 shadow-card';
const LINK = 'inline-flex min-h-11 items-center gap-2 text-team-body hover:text-team-accent sm:min-h-0';

function FooterCard({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className={CARD}>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-footer-heading font-bold text-team-heading">{heading}</h2>
        <span className="h-rule w-rule-short rounded-full bg-team-accent" />
      </div>
      {children}
    </section>
  );
}

function Chevron() {
  return (
    <LineSvg className="size-3.5 shrink-0">
      <path d="M9 6l6 6-6 6" />
    </LineSvg>
  );
}

function PhoneIcon() {
  return (
    <LineSvg className="size-4 shrink-0 text-brand">
      <path d="M6.5 3.5h3l1.5 3.5-2 1.2a11 11 0 0 0 5 5l1.2-2 3.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 5 6.1a1.5 1.5 0 0 1 1.5-1.6z" />
    </LineSvg>
  );
}

function MailIcon() {
  return (
    <LineSvg className="size-4 shrink-0 text-brand">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </LineSvg>
  );
}

function PinIcon() {
  return (
    <LineSvg className="mt-0.5 size-4 shrink-0 text-brand">
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </LineSvg>
  );
}

interface SiteFooterProps {
  settings: SiteSettings;
  practiceAreas: readonly PracticeAreaSummary[];
  rootSlugs: readonly RootSlug[];
}

export function SiteFooter({ settings, practiceAreas, rootSlugs }: SiteFooterProps) {
  const { firm, contact, newsletter, socials } = settings;
  const published = new Set(rootSlugs.map(({ slug }) => slug));
  return (
    <footer className="bg-surface text-footer text-team-muted">
      <div className="site-container grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-4">
        <section className={CARD}>
          <FooterLogo />
          <p className="text-footer-copy text-team-body">{firm.description}</p>
          <div className="flex flex-col gap-2">
            {contact.phones.map((phone) => (
              <a key={phone} href={telLink(phone)} className={LINK}>
                <PhoneIcon />
                {formatPhone(phone)}
              </a>
            ))}
            <a href={mailLink(contact.email)} className={LINK}>
              <MailIcon />
              {contact.email}
            </a>
          </div>
          <span className="mt-auto h-px w-full bg-team-line" />
          <SocialLinks socials={socials} tone="card" />
        </section>
        <FooterCard heading={text.quickLinks}>
          <nav className="flex flex-col gap-1" aria-label={text.quickLinks}>
            {QUICK_LINKS.map(({ label, href }) => (
              <SiteLink key={href} href={href} className={LINK}>
                <Chevron />
                {label}
              </SiteLink>
            ))}
          </nav>
        </FooterCard>
        <FooterCard heading={text.practiceAreas}>
          <nav className="flex flex-col gap-1" aria-label={text.practiceAreas}>
            {practiceAreas.slice(0, FOOTER_PRACTICE_LIMIT).map(({ slug, shortName }) => (
              <SiteLink key={slug} href={ROUTES.root(slug)} className={LINK}>
                <Chevron />
                {shortName}
              </SiteLink>
            ))}
            <SiteLink href={ROUTES.expertise} className={LINK}>
              <Chevron />
              {text.allPracticeAreas}
            </SiteLink>
          </nav>
        </FooterCard>
        <FooterCard heading={dictionary.newsletter.heading}>
          <p className="text-footer-copy text-team-body">{newsletter.intro}</p>
          <NewsletterForm />
        </FooterCard>
      </div>
      <div className="border-t border-team-line">
        <div className="site-container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-team-muted">
            <PinIcon />
            <span>{contact.addressLine}</span>
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5">
            <span>{text.copyright(new Date().getFullYear(), firm.name)}</span>
            {LEGAL_LINKS.filter(({ slug }) => published.has(slug)).map(({ label, href }) => (
              <span key={href} className="flex items-center gap-x-1.5">
                <span aria-hidden="true">·</span>
                <SiteLink href={href} className="hover:text-team-accent max-sm:inline-flex max-sm:min-h-11 max-sm:items-center">
                  {label}
                </SiteLink>
              </span>
            ))}
            <span aria-hidden="true">·</span>
            <CookiePreferencesButton />
          </p>
        </div>
      </div>
    </footer>
  );
}
