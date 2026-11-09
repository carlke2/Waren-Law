import Image from 'next/image';
import { dictionary } from '@/lib/utils/dictionary';

const { brand } = dictionary;
const LOGO = '/brand/golden-logo.png';
const LOGO_WIDTH = 1600;
const LOGO_HEIGHT = 351;
const alt = `${brand.wordmark} ${brand.suffix}`;

export function BrandMark({
  className = 'h-12 w-auto',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO}
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={className}
    />
  );
}

export function HeaderLogo() {
  return <BrandMark priority className="h-12 w-auto" />;
}

export function FooterLogo() {
  return <BrandMark className="h-14 w-auto" />;
}
