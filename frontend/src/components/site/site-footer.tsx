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
const CARD = 'flex h-full flex-col gap-4';
const LINK =
  'inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline sm:min-h-0';

function FooterCard({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className={CARD}>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-footer-heading font-medium text-ink">{heading}</h2>
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
    <LineSvg className="size-4 shrink-0 text-ink">
      <path d="M6.5 3.5h3l1.5 3.5-2 1.2a11 11 0 0 0 5 5l1.2-2 3.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 5 6.1a1.5 1.5 0 0 1 1.5-1.6z" />
    </LineSvg>
  );
}

function MailIcon() {
  return (
    <LineSvg className="size-4 shrink-0 text-ink">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
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
    <footer className="bg-surface-footer text-footer text-ink">
      <div className="site-container grid grid-cols-1 gap-10 py-section sm:grid-cols-2 lg:grid-cols-4">
        <section className={CARD}>
          <h2 className="font-heading text-footer-heading font-medium text-ink">{text.contact}</h2>
          <p className="text-footer-copy text-text-body">{firm.description}</p>
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
            <p className="text-text-body">{contact.addressLine}</p>
          </div>
          <SocialLinks socials={socials} tone="quiet" />
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
          <p className="text-footer-copy text-text-body">{newsletter.intro}</p>
          <NewsletterForm />
        </FooterCard>
      </div>
      <div className="border-t border-border">
        <div className="site-container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterLogo />
          <p className="flex flex-wrap items-center gap-x-1.5">
            <span>{text.copyright(new Date().getFullYear(), firm.name)}</span>
            {LEGAL_LINKS.filter(({ slug }) => published.has(slug)).map(({ label, href }) => (
              <span key={href} className="flex items-center gap-x-1.5">
                <span aria-hidden="true">·</span>
                <SiteLink
                  href={href}
                  className="underline decoration-accent max-sm:inline-flex max-sm:min-h-11 max-sm:items-center"
                >
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
