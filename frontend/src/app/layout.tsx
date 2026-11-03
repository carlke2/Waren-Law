import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { dictionary } from '@/lib/dictionary';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: dictionary.site.name,
  description: dictionary.site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
