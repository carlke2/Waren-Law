import type { OfficeResponse, PracticeAreaSummary, RootSlug, SiteSettings } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons';
import { Container, VisuallyHidden } from '@/components/ui/layout';
import { SmartLink } from '@/components/ui/smart-link';
import { dictionary } from '@/lib/dictionary';
import { LEGAL_LINKS, PRIMARY_NAV } from '@/lib/navigation';
import { formatPhone, mailLink, telLink } from '@/lib/utils/links';
import { CookiePreferencesButton } from './cookie-consent';

const { footer, nav } = dictionary;
const LINK = 'inline-block py-1 underline-offset-4 hover:text-gold-400 hover:underline';

interface SiteFooterProps {
  settings: SiteSettings;
  offices: readonly OfficeResponse[];
  practiceAreas: readonly PracticeAreaSummary[];
  rootSlugs: readonly RootSlug[];
}

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-3 text-h4 text-gold-400">{children}</h2>;
}

export function SiteFooter({ settings, offices, practiceAreas, rootSlugs }: SiteFooterProps) {
  const visibleSlugs = new Set(rootSlugs.map(({ slug }) => slug));
  const socials = [
    { label: nav.linkedIn, href: settings.socials.linkedIn, Icon: LinkedInIcon },
    { label: nav.facebook, href: settings.socials.facebook, Icon: FacebookIcon },
    { label: nav.instagram, href: settings.socials.instagram, Icon: InstagramIcon },
    { label: nav.youtube, href: settings.socials.youtube, Icon: YouTubeIcon },
  ];
  return (
    <footer data-tone="dark" className="bg-navy-950 pt-section text-small text-on-dark-muted">
      <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <FooterHeading>{footer.offices}</FooterHeading>
          <ul className="grid gap-4">
            {offices.map((office) => (
              <li key={office.slug}>
                <p className="font-medium text-on-dark">{office.name}</p>
                <p>{[office.building, office.addressLine].filter(Boolean).join(', ')}</p>
                <p>{office.city}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <FooterHeading>{footer.quickLinks}</FooterHeading>
          <ul>
            {PRIMARY_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <FooterHeading>{footer.expertise}</FooterHeading>
          <ul>
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={ROUTES.root(area.slug)} className={LINK}>
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <FooterHeading>{footer.getInTouch}</FooterHeading>
          <ul>
            {settings.contact.phones.map((phone) => (
              <li key={phone}>
                <a href={telLink(phone)} className={LINK}>
                  {formatPhone(phone)}
                </a>
              </li>
            ))}
            <li>
              <a href={mailLink(settings.contact.email)} className={LINK}>
                {settings.contact.email}
              </a>
            </li>
          </ul>
          <ul className="mt-3 flex gap-1">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <SmartLink
                  href={href}
                  className="inline-flex size-tap items-center justify-center hover:text-gold-400"
                >
                  <Icon className="size-5" />
                  <VisuallyHidden>{label}</VisuallyHidden>
                </SmartLink>
              </li>
            ))}
          </ul>
        </section>
      </Container>
      <Container className="mt-10 border-t border-line-strong py-6">
        <p className="max-w-reading">{footer.disclaimer}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p>
            © {new Date().getFullYear()} {settings.firm.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {LEGAL_LINKS.filter(({ slug }) => visibleSlugs.has(slug)).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
