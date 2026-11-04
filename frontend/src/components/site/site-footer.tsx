import { ROUTES, type PracticeAreaSummary, type RootSlug, type SiteSettings } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import type { ReactNode } from 'react';
import { dictionary } from '@/lib/dictionary';
import { FOOTER_PRACTICE_LIMIT, LEGAL_LINKS, QUICK_LINKS } from '@/lib/navigation';
import { cx } from '@/lib/utils/cx';
import { formatPhone, mailLink, telLink } from '@/lib/utils/links';
import { CookiePreferencesButton } from './cookie-consent';
import { FooterLogo } from './logo';
import { NewsletterForm } from './newsletter-form';

const text = dictionary.footer;
const COLUMN_LINK =
  'text-on-brand-muted hover:text-on-brand max-sm:flex max-sm:min-h-11 max-sm:items-center';
const CONTACT_LINK =
  'text-on-brand hover:text-accent max-sm:flex max-sm:min-h-11 max-sm:items-center';
const BOTTOM_LINK = 'hover:text-on-brand max-sm:inline-flex max-sm:min-h-11 max-sm:items-center';

function Column({
  heading,
  className,
  children,
}: {
  heading: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx('flex flex-col gap-0 sm:gap-3.5', className)}>
      <h2 className="mb-2 font-heading text-footer-heading font-normal text-on-brand sm:mb-0">
        {heading}
      </h2>
      {children}
    </div>
  );
}

interface SiteFooterProps {
  settings: SiteSettings;
  practiceAreas: readonly PracticeAreaSummary[];
  rootSlugs: readonly RootSlug[];
}

export function SiteFooter({ settings, practiceAreas, rootSlugs }: SiteFooterProps) {
  const { firm, contact, newsletter } = settings;
  const published = new Set(rootSlugs.map(({ slug }) => slug));
  return (
    <footer data-tone="dark" className="bg-brand text-footer text-on-brand-muted">
      <div className="site-container grid grid-auto-footer gap-12 pt-16 pb-10 sm:pt-20 lg:grid-cols-4">
        <div className="flex flex-col gap-4.5">
          <FooterLogo />
          <p className="text-footer-copy">{firm.description}</p>
          <div className="flex flex-col gap-1">
            {contact.phones.map((phone) => (
              <a key={phone} href={telLink(phone)} className={CONTACT_LINK}>
                {formatPhone(phone)}
              </a>
            ))}
            <a href={mailLink(contact.email)} className={CONTACT_LINK}>
              {contact.email}
            </a>
          </div>
        </div>
        <Column heading={text.quickLinks} className="max-sm:order-1 sm:order-none">
          {QUICK_LINKS.map(({ label, href }) => (
            <SiteLink key={href} href={href} className={COLUMN_LINK}>
              {label}
            </SiteLink>
          ))}
        </Column>
        <Column heading={text.practiceAreas} className="max-sm:order-2 sm:order-none">
          {practiceAreas.slice(0, FOOTER_PRACTICE_LIMIT).map(({ slug, shortName }) => (
            <SiteLink key={slug} href={ROUTES.root(slug)} className={COLUMN_LINK}>
              {shortName}
            </SiteLink>
          ))}
          <SiteLink href={ROUTES.expertise} className={COLUMN_LINK}>
            {text.allPracticeAreas}
          </SiteLink>
        </Column>
        <Column heading={dictionary.newsletter.heading}>
          <p className="text-footer-copy">{newsletter.intro}</p>
          <div className="mt-3.5 sm:mt-0">
            <NewsletterForm />
          </div>
        </Column>
      </div>
      <div className="border-t border-divider-on-brand">
        <div className="site-container flex flex-wrap justify-between gap-3 py-6 text-meta max-sm:justify-center max-sm:text-center">
          <span>{contact.addressLine}</span>
          <span className="flex flex-wrap items-center gap-x-1.5 max-sm:justify-center">
            <span>{text.copyright(new Date().getFullYear(), firm.name)}</span>
            {LEGAL_LINKS.filter(({ slug }) => published.has(slug)).map(({ label, href }) => (
              <span key={href} className="flex items-center gap-x-1.5">
                <span aria-hidden="true">·</span>
                <SiteLink href={href} className={BOTTOM_LINK}>
                  {label}
                </SiteLink>
              </span>
            ))}
            <span aria-hidden="true">·</span>
            <CookiePreferencesButton />
          </span>
        </div>
      </div>
    </footer>
  );
}
