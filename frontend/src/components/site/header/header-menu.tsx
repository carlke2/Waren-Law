'use client';

import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { LineSvg } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { cx } from '@/lib/utils/cx';
import { dictionary } from '@/lib/utils/dictionary';
import type { HeaderMenuData, MenuPanel, MenuPanelId } from '@/lib/utils/header-menu';
import { HeaderLogo } from '../logo';

const text = dictionary.nav;
const FEATURED_SIZES = '(min-width: 64rem) 12rem, 40vw';

function Chevron() {
  return (
    <span aria-hidden="true" className="text-accent">
      ›
    </span>
  );
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function MenuAnchor({
  href,
  className,
  onNavigate,
  children,
}: {
  href: string;
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <SiteLink href={href} onClick={onNavigate} className={className}>
      {children}
    </SiteLink>
  );
}

function PanelBody({
  panel,
  onNavigate,
  onClose,
  showTitle = true,
}: {
  panel: MenuPanel;
  onNavigate?: () => void;
  onClose?: () => void;
  showTitle?: boolean;
}) {
  return (
    <div className="site-container flex flex-col gap-8 py-8">
      {showTitle ? (
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-heading text-h3-card font-semibold text-ink">{panel.title}</h2>
          {onClose ? (
            <button
              type="button"
              aria-label={text.closePanel}
              onClick={onClose}
              className="inline-flex size-11 shrink-0 items-center justify-center text-ink"
            >
              <LineSvg className="size-5">
                <path d="M6 6l12 12M18 6L6 18" />
              </LineSvg>
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-10 lg:grid-menu-panel">
        <ul className="columns-1 gap-x-8 sm:columns-2 xl:columns-3">
          {panel.links.map((link) => (
            <li key={`${panel.id}-${link.href}-${link.label}`} className="mb-1 break-inside-avoid">
              <MenuAnchor
                href={link.href}
                onNavigate={onNavigate}
                className="menu-link-row text-button"
              >
                <span>{link.label}</span>
                <Chevron />
              </MenuAnchor>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          <h3 className="text-button font-semibold text-ink">{text.featured}</h3>
          {panel.featured.length ? (
            <ul className="flex flex-col gap-5">
              {panel.featured.map((item) => (
                <li key={`${panel.id}-featured-${item.href}-${item.label}`}>
                  <MenuAnchor
                    href={item.href}
                    onNavigate={onNavigate}
                    className="group flex gap-4 text-ink"
                  >
                    {item.image ? (
                      <span className="relative block size-20 shrink-0 overflow-hidden bg-surface-deep">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt}
                          fill
                          sizes={FEATURED_SIZES}
                          className="object-cover object-top"
                        />
                      </span>
                    ) : null}
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="text-button font-semibold group-hover:underline">
                        {item.label}
                      </span>
                      {item.meta ? (
                        <span className="line-clamp-2 text-meta text-text-body">{item.meta}</span>
                      ) : null}
                    </span>
                  </MenuAnchor>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-meta text-text-body">{text.contentSoon}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeaderMenu({ menu }: { menu: HeaderMenuData }) {
  const [openId, setOpenId] = useState<MenuPanelId | null>(null);
  const [hintId, setHintId] = useState<MenuPanelId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuPanelId | null>(null);
  const openButton = useRef<HTMLButtonElement | null>(null);
  const triggers = useRef(new Map<MenuPanelId, HTMLButtonElement>());
  const panelIds = useId();
  const desktopPanelId = `${panelIds}-panel`;
  const mobilePanelId = `${panelIds}-mobile`;
  const open = openId !== null;
  const activePanel = menu.panels.find((panel) => panel.id === openId) ?? null;

  const closeDesktop = useCallback(() => {
    setOpenId(null);
    setHintId(null);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  useEffect(() => {
    if (!open && !mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (mobileOpen) {
        closeMobile();
        openButton.current?.focus();
        return;
      }
      const id = openId;
      closeDesktop();
      if (id) triggers.current.get(id)?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeDesktop, closeMobile, mobileOpen, open, openId]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => closeDesktop();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [closeDesktop, open]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function toggleDesktop(id: MenuPanelId) {
    setOpenId((current) => (current === id ? null : id));
  }

  function onTriggerKey(event: ReactKeyboardEvent<HTMLButtonElement>, id: MenuPanelId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDesktop(id);
    }
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label={text.closePanel}
          className="fixed inset-0 z-30 cursor-default bg-overlay-menu"
          onClick={closeDesktop}
        />
      ) : null}

      <header
        className={cx('relative z-40 border-b border-border', open ? 'bg-surface-panel' : 'bg-surface')}
      >
        <div className="relative flex h-header items-center">
          <div className="site-container relative flex h-full w-full items-center justify-between gap-6">
            <SiteLink href={ROUTES.home} aria-label={dictionary.brand.wordmark}>
              <HeaderLogo />
            </SiteLink>

            <nav
              aria-label={text.primary}
              className="absolute top-1/2 left-1/2 hidden -translate-x-[42%] -translate-y-1/2 items-center gap-1 lg:flex"
              onMouseLeave={() => setHintId(null)}
            >
              {menu.panels.map((panel) => {
                const isOpen = openId === panel.id;
                return (
                  <button
                    key={panel.id}
                    type="button"
                    ref={(node) => {
                      if (node) triggers.current.set(panel.id, node);
                      else triggers.current.delete(panel.id);
                    }}
                    className="menu-trigger"
                    aria-expanded={isOpen}
                    aria-controls={desktopPanelId}
                    data-open={isOpen || undefined}
                    data-hint={hintId === panel.id || undefined}
                    onClick={() => toggleDesktop(panel.id)}
                    onKeyDown={(event) => onTriggerKey(event, panel.id)}
                    onMouseEnter={() => {
                      if (open && openId !== panel.id) setHintId(panel.id);
                    }}
                  >
                    {panel.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <SiteLink
                href={ROUTES.search}
                className="inline-flex min-h-11 items-center gap-2 px-2 text-button text-ink"
              >
                <LineSvg className="size-5">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M20 20l-3.5-3.5" />
                </LineSvg>
                <span className="hidden lg:inline">{text.search}</span>
                <span className="sr-only lg:hidden">{text.search}</span>
              </SiteLink>
              <button
                type="button"
                ref={openButton}
                aria-label={text.openMenu}
                aria-expanded={mobileOpen}
                aria-controls={mobilePanelId}
                onClick={() => setMobileOpen(true)}
                className="inline-flex size-11 items-center justify-center border border-ink text-ink lg:hidden"
              >
                <LineSvg className="size-5.5">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </LineSvg>
              </button>
            </div>
          </div>
        </div>

        <div
          id={desktopPanelId}
          className="menu-panel-shell absolute inset-x-0 top-full z-40 bg-surface-panel max-lg:hidden"
          data-open={open ? 'true' : undefined}
          aria-hidden={!open}
        >
          <div>
            {activePanel ? (
              <PanelBody
                panel={activePanel}
                onNavigate={closeDesktop}
                onClose={closeDesktop}
              />
            ) : (
              <div className="h-0" aria-hidden="true" />
            )}
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          id={mobilePanelId}
          role="dialog"
          aria-modal="true"
          aria-label={text.primary}
          className="fixed inset-0 z-50 flex flex-col bg-surface text-ink lg:hidden"
        >
          <div className="flex h-header shrink-0 items-center border-b border-border">
            <div className="site-container flex w-full items-center justify-between gap-6">
              <HeaderLogo />
              <button
                type="button"
                autoFocus
                aria-label={text.closeMenu}
                onClick={() => {
                  closeMobile();
                  openButton.current?.focus();
                }}
                className="inline-flex size-11 items-center justify-center border border-ink"
              >
                <LineSvg className="size-5.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </LineSvg>
              </button>
            </div>
          </div>
          <nav aria-label={text.primary} className="site-container flex-1 overflow-auto py-4">
            <ul className="flex flex-col">
              {menu.panels.map((panel) => {
                const expanded = mobileSection === panel.id;
                return (
                  <li key={panel.id} className="border-b border-border">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      className="menu-link-row w-full text-left text-button font-semibold"
                      onClick={() =>
                        setMobileSection((current) => (current === panel.id ? null : panel.id))
                      }
                    >
                      <span>{panel.label}</span>
                      <Chevron />
                    </button>
                    {expanded ? (
                      <div className="pb-6">
                        <PanelBody
                          panel={panel}
                          onNavigate={closeMobile}
                          showTitle={false}
                        />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <SiteLink
              href={ROUTES.search}
              onClick={closeMobile}
              className="menu-link-row mt-4 text-button font-semibold"
            >
              <span>{text.search}</span>
              <Chevron />
            </SiteLink>
          </nav>
        </div>
      ) : null}
    </>
  );
}
