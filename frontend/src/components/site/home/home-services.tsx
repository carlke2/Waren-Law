import { ROUTES, type PracticeAreaSummary } from '@waren/shared';
import type { CSSProperties } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.home;

function areaDescription(area: PracticeAreaSummary): string {
  const line = area.cardSummary.trim() || area.shortSummary.trim();
  return line.split(/(?<=[.!?])\s+/)[0]?.trim() || line;
}

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function HomeServices({ areas }: { areas: readonly PracticeAreaSummary[] }) {
  return (
    <section className="expertise-canvas rise" aria-labelledby="home-services-heading">
      <div className="expertise-shell site-container">
        <header className="expertise-header">
          <p className="expertise-eyebrow">
            <span aria-hidden="true" className="expertise-eyebrow-rule" />
            {text.servicesEyebrow}
          </p>
          <h2 id="home-services-heading" className="expertise-headline">
            {text.whatWeHandleLead}{' '}
            <span className="expertise-emphasis">{text.whatWeHandleEmphasis}</span>
          </h2>
          <p className="expertise-lead">{text.whatWeHandleLeadCopy}</p>
        </header>

        <ul className="expertise-grid">
          {areas.map((area, index) => (
            <li
              key={area.slug}
              className="expertise-item"
              style={{ '--expertise-stagger': index } as CSSProperties}
            >
              <SiteLink href={ROUTES.root(area.slug)} className="expertise-link">
                <span className="expertise-number" aria-hidden="true">
                  {formatIndex(index)}
                </span>
                <span className="expertise-divider" aria-hidden="true" />
                <span className="expertise-copy">
                  <span className="expertise-title-row">
                    <span className="expertise-title">{area.name}</span>
                    <span className="expertise-arrow" aria-hidden="true">
                      {text.arrow}
                    </span>
                  </span>
                  <span className="expertise-desc">{areaDescription(area)}</span>
                </span>
              </SiteLink>
            </li>
          ))}
        </ul>

        <div className="expertise-cta">
          <SiteLink href={ROUTES.expertise} className="expertise-btn">
            {text.allServices}
            <span aria-hidden="true">{text.arrow}</span>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
