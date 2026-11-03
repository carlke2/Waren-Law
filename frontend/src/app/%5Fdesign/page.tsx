import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DesignShowcase } from '@/components/ui/design-showcase';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DesignPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <DesignShowcase />;
}
