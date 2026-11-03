import type { PracticeAreaSummary, SiteSettings } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/brand/logo.webp';
import { Container } from '@/components/ui/layout';
import { SiteNavigation } from './site-navigation';

interface SiteHeaderProps {
  settings: SiteSettings;
  practiceAreas: readonly PracticeAreaSummary[];
}

export function SiteHeader({ settings, practiceAreas }: SiteHeaderProps) {
  return (
    <header data-tone="dark" className="sticky top-0 z-40 bg-navy-900">
      <Container className="flex min-h-header items-center justify-between gap-4">
        <Link href={ROUTES.home} className="inline-flex min-h-tap items-center">
          <Image
            src={logo}
            alt={settings.firm.name}
            className="h-10 w-auto"
            loading="eager"
            sizes="12rem"
          />
        </Link>
        <SiteNavigation
          practiceAreas={practiceAreas.map(({ name, slug }) => ({
            label: name,
            href: ROUTES.root(slug),
          }))}
          bookingUrl={settings.booking.url}
          bookingLabel={settings.cta.bookingLabel}
        />
      </Container>
    </header>
  );
}
