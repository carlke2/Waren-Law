import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';

// Cut to the weights and optical sizes the headings use (decision 0020).
export const headingFont = localFont({
  src: './fonts/newsreader-latin-opsz16-72-wght400-600.woff2',
  weight: '400 600',
  style: 'normal',
  variable: '--font-heading-face',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

export const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body-face',
  display: 'swap',
});
