'use client';

import { ROUTES, type SiteSettings } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import { usePathname } from 'next/navigation';
import { useRef, useSyncExternalStore } from 'react';
import { LineSvg } from '@/components/ui/icon';
import { dictionary } from '@/lib/utils/dictionary';
import { activeNavHref, CONTACT_LINK, PRIMARY_NAV, type RootSlugType } from '@/lib/utils/navigation';
import { cx } from '@/lib/utils/cx';
import { formatPhone, mailLink, telLink } from '@/lib/utils/links';
import { buttonClass } from '@/components/ui/button';
import { MorphicNavbar } from '@/components/site/morphic-navbar';
import { HeaderLogo } from './logo';
import { SocialLinks } from './social-links';

const { nav } = dictionary;

function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

const isScrolled = () => window.scrollY > 0;
const notScrolledOnServer = () => false;

export function SiteHeader({
  rootSlugs,
  settings,
}: {
  rootSlugs: readonly RootSlugType[];
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, notScrolledOnServer);
  const menu = useRef<HTMLDialogElement>(null);
  const solid = scrolled;
  const activeHref = activeNavHref(pathname, rootSlugs);
  const { contact } = settings;

  return (
    <header
      data-tone="dark"
      data-solid={solid}
      className="sticky top-0 z-40 flex h-header flex-col-reverse"
    >
      <div
        className={cx(
          'flex h-nav items-center transition-colors',
          solid ? 'bg-brand shadow-header' : 'bg-transparent',
        )}
      >
        <div className="site-container flex h-full w-full items-center justify-between gap-6">
          <SiteLink href={ROUTES.home} aria-label={dictionary.brand.wordmark}>
            <HeaderLogo />
          </SiteLink>
          <nav aria-label={nav.primary} className="hidden items-center gap-5 text-nav xl:flex">
            <MorphicNavbar
              compact
              currentPath={activeHref}
              items={Object.fromEntries(
                PRIMARY_NAV.map(({ href, label }) => [href, { name: label }]),
              )}
              className="px-0 py-0"
            />
            <SiteLink href={CONTACT_LINK.href} className={buttonClass({ variant: 'accent' })}>
              {CONTACT_LINK.label}
            </SiteLink>
            <SiteLink
              href={ROUTES.search}
              aria-label={nav.search}
              className="inline-flex size-11 items-center justify-center text-on-brand hover:text-accent"
            >
              <LineSvg className="size-5">
                <circle cx="11" cy="11" r="6" />
                <path d="M20 20l-3.5-3.5" />
              </LineSvg>
            </SiteLink>
          </nav>
          <button
            type="button"
            aria-label={nav.openMenu}
            aria-haspopup="dialog"
            onClick={() => menu.current?.showModal()}
            className="inline-flex size-11 items-center justify-center border border-menu-outline text-on-brand xl:hidden"
          >
            <LineSvg className="size-5.5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </LineSvg>
          </button>
        </div>
      </div>
      <div className="hidden h-topbar items-center bg-brand-strong text-meta text-on-brand xl:flex">
        <div className="site-container flex w-full items-center justify-between gap-4">
          <SocialLinks socials={settings.socials} />
          <div className="flex items-center gap-5">
            {contact.phones.map((phone) => (
              <a key={phone} href={telLink(phone)} className="hover:text-accent">
                {formatPhone(phone)}
              </a>
            ))}
            <a href={mailLink(contact.email)} className="hover:text-accent">
              {contact.email}
            </a>
            <SiteLink href={ROUTES.consultation} className={buttonClass({ variant: 'accent' })}>
              {settings.cta.bookingLabel}
            </SiteLink>
          </div>
        </div>
      </div>
      <dialog
        ref={menu}
        aria-label={nav.primary}
        data-tone="dark"
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-brand text-on-brand open:flex open:flex-col xl:hidden"
      >
        <div className="site-container flex h-nav shrink-0 items-center justify-between gap-6">
          <HeaderLogo />
          <button
            type="button"
            autoFocus
            aria-label={nav.closeMenu}
            onClick={() => menu.current?.close()}
            className="inline-flex size-11 items-center justify-center border border-menu-outline"
          >
            <LineSvg className="size-5.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </LineSvg>
          </button>
        </div>
        <nav
          aria-label={nav.primary}
          className="site-container flex flex-col gap-2 overflow-auto py-8"
        >
          {PRIMARY_NAV.map(({ label, href }) => (
            <SiteLink
              key={href}
              href={href}
              onClick={() => menu.current?.close()}
              aria-current={activeHref === href ? 'page' : undefined}
              className={cx(
                'flex min-h-11 items-center py-2 font-heading text-menu font-medium',
                activeHref === href && 'text-accent',
              )}
            >
              {label}
            </SiteLink>
          ))}
          <SiteLink
            href={CONTACT_LINK.href}
            onClick={() => menu.current?.close()}
            className={buttonClass({ variant: 'accent', size: 'lg', className: 'mt-6' })}
          >
            {CONTACT_LINK.label}
          </SiteLink>
          <SiteLink
            href={ROUTES.search}
            onClick={() => menu.current?.close()}
            className="mt-3 flex min-h-11 items-center text-button font-semibold"
          >
            {nav.search}
          </SiteLink>
        </nav>
      </dialog>
    </header>
  );
}
