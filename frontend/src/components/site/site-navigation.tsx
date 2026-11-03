'use client';

import { ROUTES } from '@waren/shared/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ButtonLink } from '@/components/ui/button';
import { ChevronIcon, CloseIcon, MenuIcon, SearchIcon } from '@/components/ui/icons';
import { VisuallyHidden } from '@/components/ui/layout';
import { dictionary } from '@/lib/dictionary';
import { PRIMARY_NAV, type NavLink } from '@/lib/navigation';
import { cx } from '@/lib/utils/cx';

const { nav } = dictionary;
const NAV_LINK =
  'inline-flex min-h-tap items-center gap-1 px-2 text-small font-medium text-on-dark transition-colors duration-(--duration-calm) hover:text-gold-400';
const FOCUSABLE = 'a[href], button:not([disabled])';

interface SiteNavigationProps {
  practiceAreas: readonly NavLink[];
  bookingUrl: string;
  bookingLabel: string;
}

function ExpertiseDropdown({ practiceAreas }: Pick<SiteNavigationProps, 'practiceAreas'>) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', closeOnOutside);
    return () => document.removeEventListener('click', closeOnOutside);
  }, [open]);

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      button.current?.focus();
    }
  };

  return (
    <div ref={root} className="relative" onKeyDown={closeOnEscape}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        className={NAV_LINK}
        onClick={() => setOpen(!open)}
      >
        {nav.expertise}
        <ChevronIcon className={cx('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open ? (
        <ul className="absolute top-full left-0 w-80 rounded-md border border-line bg-surface py-2 shadow-card">
          <li>
            <Link
              href={ROUTES.expertise}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-small font-semibold text-navy-900 hover:bg-sand"
            >
              {nav.allExpertise}
            </Link>
          </li>
          {practiceAreas.map((area) => (
            <li key={area.href}>
              <Link
                href={area.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-small text-ink hover:bg-sand"
              >
                {area.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MobileMenu({ practiceAreas, bookingUrl, bookingLabel }: SiteNavigationProps) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const button = opener.current;
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      button?.focus();
    };
  }, [open]);

  const trapFocus = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab' || !panel.current) return;
    const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div className="lg:hidden">
      <button
        ref={opener}
        type="button"
        aria-expanded={open}
        className={NAV_LINK}
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="size-7" />
        <VisuallyHidden>{nav.openMenu}</VisuallyHidden>
      </button>
      {open ? (
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={nav.menu}
          data-tone="dark"
          onKeyDown={trapFocus}
          className="fixed inset-0 z-50 overflow-y-auto bg-navy-950 p-gutter text-on-dark"
        >
          <div className="flex justify-end">
            <button type="button" className={NAV_LINK} onClick={() => setOpen(false)}>
              <CloseIcon className="size-7" />
              <VisuallyHidden>{nav.closeMenu}</VisuallyHidden>
            </button>
          </div>
          <nav aria-label={nav.menu}>
            <ul className="grid gap-1 text-lead">
              <li>
                <Link href={ROUTES.expertise} className={cx(NAV_LINK, 'text-lead')}>
                  {nav.expertise}
                </Link>
                <ul className="ml-4 border-l border-line-strong pl-2">
                  {practiceAreas.map((area) => (
                    <li key={area.href}>
                      <Link href={area.href} className={NAV_LINK}>
                        {area.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {PRIMARY_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={cx(NAV_LINK, 'text-lead')}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.search} className={cx(NAV_LINK, 'text-lead')}>
                  {nav.search}
                </Link>
              </li>
            </ul>
          </nav>
          <ButtonLink href={bookingUrl} variant="accent" className="mt-6 w-full">
            {bookingLabel}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}

export function SiteNavigation(props: SiteNavigationProps) {
  return (
    <>
      <nav aria-label={nav.primary} className="hidden items-center gap-1 lg:flex">
        <ExpertiseDropdown practiceAreas={props.practiceAreas} />
        {PRIMARY_NAV.map((link) => (
          <Link key={link.href} href={link.href} className={NAV_LINK}>
            {link.label}
          </Link>
        ))}
        <Link href={ROUTES.search} className={NAV_LINK}>
          <SearchIcon className="size-5" />
          <VisuallyHidden>{nav.search}</VisuallyHidden>
        </Link>
        <ButtonLink href={props.bookingUrl} variant="accent" className="ml-2">
          {props.bookingLabel}
        </ButtonLink>
      </nav>
      <MobileMenu {...props} />
    </>
  );
}
