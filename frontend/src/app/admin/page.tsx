import type { Metadata } from 'next';
import { dictionary } from '@/lib/dictionary';

export const metadata: Metadata = {
  title: dictionary.admin.title,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-lead p-8">
      <h1 className="text-h1">{dictionary.admin.title}</h1>
      <p className="mt-4">{dictionary.admin.comingSoon}</p>
    </main>
  );
}
