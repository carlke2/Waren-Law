import type { SiteSettings } from '@waren/shared';
import Image from 'next/image';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { SectionHeading } from './section-heading';

type WhyPoint = SiteSettings['pageCopy']['about']['whyPoints'][number];

const STATUE = '/home/lady-justice.webp';
const STATUE_SIZES = '(min-width: 64rem) 28rem, 100vw';
const NUMBER_WIDTH = 2;

export function WhyChoose({ points }: { points: readonly WhyPoint[] }) {
  if (!points.length) return null;
  return (
    <HomeSection tone="plain">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex min-w-0 flex-col gap-8">
          <SectionHeading title={dictionary.about.whyEyebrow} />
          <ol className="divide-y divide-border border-y border-border">
            {points.map((point, index) => (
              <li key={point.title} className="flex gap-6 py-6">
                <span className="font-heading text-h3-card text-brand-soft">
                  {String(index + 1).padStart(NUMBER_WIDTH, '0')}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="font-heading text-h3-card font-semibold text-brand">
                    {point.title}
                  </h3>
                  <p className="text-card-body text-text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative mx-auto aspect-certificate w-full max-w-teaser overflow-hidden rounded-card">
          <Image src={STATUE} alt="" fill sizes={STATUE_SIZES} className="object-cover" />
        </div>
      </div>
    </HomeSection>
  );
}
