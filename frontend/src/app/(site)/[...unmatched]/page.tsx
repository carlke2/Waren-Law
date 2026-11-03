import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dictionary } from '@/lib/dictionary';
import { NOINDEX_FOLLOW } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: dictionary.notFound.title,
  robots: NOINDEX_FOLLOW,
};

export default function UnmatchedRoute() {
  notFound();
}
