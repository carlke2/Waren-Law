import type { Metadata } from 'next';
import { dictionary } from '@/lib/utils/dictionary';

export const metadata: Metadata = {
  title: dictionary.admin.title,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="site-container py-16">
      <h1 className="font-heading text-h2 font-medium text-brand">{dictionary.admin.title}</h1>
      <p className="mt-4">{dictionary.admin.comingSoon}</p>
    </main>
  );
}
