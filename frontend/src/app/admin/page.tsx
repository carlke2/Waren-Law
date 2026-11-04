import type { Metadata } from 'next';
import { dictionary } from '@/lib/dictionary';

export const metadata: Metadata = {
  title: dictionary.admin.title,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main>
      <h1>{dictionary.admin.title}</h1>
      <p>{dictionary.admin.comingSoon}</p>
    </main>
  );
}
