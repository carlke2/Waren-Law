'use client';

import { ROUTES } from '@waren/shared/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useSyncExternalStore } from 'react';
import { LineSvg } from '@/components/ui/icon';
import { dictionary } from '@/lib/dictionary';
import { CONTACT_LINK, PRIMARY_NAV } from '@/lib/navigation';
import { cx } from '@/lib/utils/cx';
import { HeaderLogo } from './logo';

const { nav } = dictionary;

function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

const isScrolled = () => window.scrollY > 0;
const notScrolledOnServer = () => false;

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, notScrolledOnServer);
  const menu = useRef<HTMLDialogElement>(null);
  const solid = scrolled || pathname !== ROUTES.home;

  return (
    <header
      data-tone="dark"
      data-solid={solid}
      className={cx(
        'sticky top-0 z-40 h-header transition-colors',
        solid ? 'bg-brand shadow-header' : 'bg-transparent',
      )}
    >
      <div className="site-container flex h-full items-center justify-between gap-6">
        <Link href={ROUTES.home} aria-label={dictionary.brand.wordmark}>
          <HeaderLogo />
        </Link>
        <nav aria-label={nav.primary} className="hidden items-center gap-7.5 text-nav lg:flex">
          {PRIMARY_NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className="font-medium text-on-brand hover:text-accent"
            >
              {label}
            </Link>
          ))}
          <Link
            href={CONTACT_LINK.href}
            className="bg-accent px-5 py-2.75 font-bold text-on-accent"
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>
        <button
          type="button"
          aria-label={nav.openMenu}
          aria-haspopup="dialog"
          onClick={() => menu.current?.showModal()}
          className="inline-flex size-11 items-center justify-center border border-menu-outline text-on-brand lg:hidden"
        >
          <LineSvg className="size-5.5">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </LineSvg>
        </button>
      </div>
      <dialog
        ref={menu}
        aria-label={nav.primary}
        data-tone="dark"
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-brand text-on-brand open:flex open:flex-col lg:hidden"
      >
        <div className="site-container flex h-header shrink-0 items-center justify-between gap-6">
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
        <nav aria-label={nav.primary} className="site-container flex flex-col gap-2 py-8">
          {PRIMARY_NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => menu.current?.close()}
              aria-current={pathname === href ? 'page' : undefined}
              className="flex min-h-11 items-center py-2 font-heading text-menu font-medium"
            >
              {label}
            </Link>
          ))}
          <Link
            href={CONTACT_LINK.href}
            onClick={() => menu.current?.close()}
            className="mt-6 bg-accent px-6.5 py-3.5 text-center text-button font-bold text-on-accent"
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
