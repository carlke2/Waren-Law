import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dictionary } from '@/lib/dictionary';

export const metadata: Metadata = {
  title: dictionary.notFound.title,
  robots: { index: false, follow: true },
};

export default function UnmatchedRoute() {
  notFound();
}
