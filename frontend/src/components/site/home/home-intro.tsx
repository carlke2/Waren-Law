import {
  ROUTES,
  type OfficeResponse,
  type SiteSettings,
} from '@waren/shared';
import Image from 'next/image';
import { LineSvg } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
import { formatPhone, telLink } from '@/lib/utils/links';

const INTRO_IMAGE = '/home/lady-justice-cutout.webp';
const INTRO_IMAGE_WIDTH = 938;
const INTRO_IMAGE_HEIGHT = 1480;
const INTRO_IMAGE_SIZES = '(min-width: 48rem) 36rem, 90vw';
export const HOME_INTRO_ID = 'intro';

const text = dictionary.home;

function PinIcon() {
  return (
    <LineSvg className="intro-strip-icon">
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </LineSvg>
  );
}

function GlobeIcon() {
  return (
    <LineSvg className="intro-strip-icon">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </LineSvg>
  );
}

function PhoneIcon() {
  return (
    <LineSvg className="intro-strip-icon">
      <path d="M6.5 3h3l1.5 5-2.5 1.5a14 14 0 0 0 6 6L16 13l5 1.5v3A2.5 2.5 0 0 1 18.5 20 15.5 15.5 0 0 1 4 5.5 2.5 2.5 0 0 1 6.5 3z" />
    </LineSvg>
  );
}

function StatueImage({ soft }: { soft?: boolean }) {
  return (
    <div className={soft ? 'intro-statue-layer intro-statue-soft' : 'intro-statue-layer intro-statue-sharp'}>
      <Image
        src={INTRO_IMAGE}
        alt={soft ? '' : text.introImageAlt}
        width={INTRO_IMAGE_WIDTH}
        height={INTRO_IMAGE_HEIGHT}
        sizes={INTRO_IMAGE_SIZES}
        priority={!soft}
        aria-hidden={soft || undefined}
      />
    </div>
  );
}

export function HomeIntro({
  offices,
  phones,
  foundingYear,
}: {
  firm?: SiteSettings['firm'];
  offices: readonly OfficeResponse[];
  partners?: unknown;
  phones: readonly string[];
  foundingYear?: number | null;
}) {
  const nairobi = offices.find(({ city }) => /nairobi/i.test(city));
  const nakuru = offices.find(({ city }) => /nakuru/i.test(city));
  const phone = phones[0] ?? null;
  const eyebrow = foundingYear ? text.introEyebrowEst(foundingYear) : text.introEyebrow;

  return (
    <section id={HOME_INTRO_ID} className="intro-canvas rise scroll-mt-header">
      <div className="intro-shell site-container">
        <div className="intro-copy">
          <p className="intro-eyebrow">
            <span aria-hidden="true" className="intro-eyebrow-rule" />
            {eyebrow}
          </p>
          <h1 className="intro-headline">
            <span className="intro-headline-line">{text.introHeadlineLead}</span>
            <span className="intro-headline-line intro-emphasis">{text.introHeadlineExpertise}</span>
            <span className="intro-headline-line">{text.introHeadlineJudgement}</span>
            <span className="intro-headline-line">
              {text.introHeadlineJoin}{' '}
              <span className="intro-emphasis">{text.introHeadlineClose}</span>
            </span>
          </h1>
          <p className="intro-lead">{text.introLead}</p>
          <div className="intro-actions">
            <SiteLink href={ROUTES.expertise} className="intro-btn intro-btn-primary">
              {text.introDiscover}
              <span aria-hidden="true">{text.arrow}</span>
            </SiteLink>
            <SiteLink href={ROUTES.consultation} className="intro-btn intro-btn-secondary">
              {text.introSchedule}
            </SiteLink>
          </div>

          <div className="intro-strip">
            <div className="intro-strip-col">
              <div className="intro-strip-head">
                <PinIcon />
                <p className="intro-strip-label">{text.introStripLocation}</p>
              </div>
              <div className="intro-strip-body">
                {nairobi ? (
                  <p>{text.introPlace(nairobi.city, nairobi.country)}</p>
                ) : null}
                {nakuru ? <p>{text.introPlace(nakuru.city, nakuru.country)}</p> : null}
              </div>
            </div>
            <div className="intro-strip-col">
              <div className="intro-strip-head">
                <GlobeIcon />
                <p className="intro-strip-label">{text.introStripPresence}</p>
              </div>
              <p className="intro-strip-body">{text.introPresence}</p>
            </div>
            <div className="intro-strip-col">
              <div className="intro-strip-head">
                <PhoneIcon />
                <p className="intro-strip-label">{text.introStripContact}</p>
              </div>
              {phone ? (
                <SiteLink href={telLink(phone)} className="intro-strip-body">
                  {formatPhone(phone)}
                </SiteLink>
              ) : (
                <p className="intro-strip-body">{dictionary.nav.contentSoon}</p>
              )}
            </div>
          </div>
        </div>

        <figure className="intro-statue intro-statue-fade" aria-label={text.introImageAlt}>
          <span className="intro-statue-halo" aria-hidden="true" />
          <span className="intro-statue-ring" aria-hidden="true" />
          <span className="intro-statue-glow" aria-hidden="true" />
          <div className="intro-statue-stack">
            <StatueImage soft />
            <StatueImage />
            <span className="intro-statue-blend" aria-hidden="true" />
          </div>
        </figure>
      </div>
    </section>
  );
}
