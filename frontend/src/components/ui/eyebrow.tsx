import type { ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

export function Eyebrow({ onBrand, children }: { onBrand?: boolean; children: ReactNode }) {
  return (
    <span
      className={cx(
        'text-eyebrow font-bold tracking-eyebrow uppercase',
        onBrand ? 'text-accent' : 'text-accent-text',
      )}
    >
      {children}
    </span>
  );
}
