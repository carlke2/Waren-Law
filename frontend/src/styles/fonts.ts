import { Manrope, Newsreader } from 'next/font/google';

export const headingFont = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-heading-face',
  display: 'swap',
});

export const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body-face',
  display: 'swap',
});
