import type { IconName } from '@waren/shared';
import type { ReactNode } from 'react';

const PATHS: Record<IconName, ReactNode> = {
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  home: (
    <>
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M2 21h20" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  coins: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
    </>
  ),
  'shield-check': (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  scales: (
    <>
      <path d="M12 3v18" />
      <path d="M6 21h12" />
      <path d="M3 7h18" />
      <path d="M6 7l-3 7a3 3 0 0 0 6 0z" />
      <path d="M18 7l-3 7a3 3 0 0 0 6 0z" />
    </>
  ),
  bank: (
    <>
      <path d="M3 22h18" />
      <path d="M6 18v-7" />
      <path d="M10 18v-7" />
      <path d="M14 18v-7" />
      <path d="M18 18v-7" />
      <path d="M12 2l8 5H4z" />
    </>
  ),
  bolt: <path d="M13 2L3 14h9l-1 8 10-12h-9z" />,
  users: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
    </>
  ),
};

export function LineSvg({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <LineSvg className={className}>{PATHS[name]}</LineSvg>;
}
