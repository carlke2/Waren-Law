import { FEATURED_TEAM_LIMIT, ROUTES, type PageResponse } from '@waren/shared';
import { SiteCta } from '@/components/site/home/cta-band';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SectionHeading } from '@/components/ui/section-heading';
import { TextLink } from '@/components/ui/text-link';
import { getAwards, getPartners, getSettings, getTeam } from '@/lib/api/content';
import { groupSections, inlineToText } from '@/lib/utils/content/sections';
import { dictionary } from '@/lib/utils/dictionary';
import { AboutFilm } from '../about-film';
import { BlockRenderer } from '../block-renderer';
import { PageHero } from '../page-hero';
import { CARD_PHOTO } from '@/lib/utils/content/photo-files';
import { TeamCardGrid } from '@/components/site/home/team-member-card';
import { RecognitionBlock } from '../recognition-block';

const text = dictionary.about;
const PARTNER_GROUP = 'partner';
const NUMBER_WIDTH = 2;

export async function AboutTemplate({ page }: { page: PageResponse }) {
  const [settings, awards, partners, team] = await Promise.all([
    getSettings(),
    getAwards(),
    getPartners(),
    getTeam(),
  ]);
  const copy = settings.pageCopy.about;
  const [story, statements, values] = groupSections(page.body.blocks);
  const [award] = awards;
  const leaders =
    team.groups
      .find(({ memberType }) => memberType === PARTNER_GROUP)
      ?.members.slice(0, FEATURED_TEAM_LIMIT) ?? [];

  return (
    <>
      <PageHero
        title={copy.heroTitle}
        eyebrow={text.eyebrow}
        intro={copy.heroIntro}
        crumbs={[{ label: page.title }]}
      />

      <section className="bg-surface">
        <div className="site-container flex flex-wrap items-start gap-16 py-16 sm:py-28">
          <div className="flex min-w-0 flex-welcome-title flex-col gap-4">
            <Eyebrow>{text.storyEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{copy.storyTitle}</h2>
            <span className="mt-2 h-rule w-rule-long bg-accent" />
          </div>
          <div className="flex min-w-0 flex-welcome-body flex-col gap-5">
            <BlockRenderer blocks={story?.intro ?? []} />
            <p className="text-body text-text-body">{copy.storyClosing}</p>
          </div>
        </div>
      </section>

      <section data-tone="dark" className="bg-brand text-on-brand">
        <div className="site-container flex flex-col items-center gap-7 py-16 text-center sm:py-26">
          <div className="flex items-center gap-3.5">
            <span className="h-rule w-rule-short bg-accent" />
            <Eyebrow onBrand>{text.filmEyebrow}</Eyebrow>
          </div>
          <h2 className="font-heading text-h2 font-medium">{copy.filmTitle}</h2>
          <AboutFilm
            url={settings.aboutVideo.url}
            captionsUrl={settings.aboutVideo.captionsUrl}
            poster={settings.aboutVideo.media}
          />
          {settings.aboutVideo.url ? null : (
            <p className="text-card-body text-on-brand-muted">{text.videoComingSoon}</p>
          )}
        </div>
      </section>

      {statements?.cards.length ? (
        <section className="bg-surface-alt">
          <div className="site-container grid grid-auto-statement gap-7 py-16 sm:py-28">
            {statements.cards.map((card) => (
              <div
                key={card.title}
                className="surface-card flex flex-col gap-3.5 p-8"
              >
                <Eyebrow>{text.statementLabel(card.title)}</Eyebrow>
                <p className="font-heading text-statement text-brand">
                  {card.blocks.map((block) =>
                    block.type === 'paragraph' ? inlineToText(block) : null,
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-surface">
        <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={text.whyEyebrow} title={copy.whyTitle} />
            <div className="flex flex-wrap gap-2.5">
              {values?.cards.map(({ title }) => (
                <span
                  key={title}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-eyebrow font-bold tracking-chip text-brand uppercase"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-auto-team gap-8">
            {copy.whyPoints.map(({ title, text: pointText }, index) => (
              <div key={title} className="surface-card flex flex-col gap-2.5 p-6">
                <span className="text-eyebrow font-bold text-accent-text">
                  {String(index + 1).padStart(NUMBER_WIDTH, '0')}
                </span>
                <h3 className="font-heading text-name font-semibold text-brand">{title}</h3>
                <p className="text-card-body text-text-muted">{pointText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {award ? <RecognitionBlock award={award} /> : null}

      {leaders.length ? (
        <section className="bg-team-canvas">
          <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow={text.leadershipEyebrow} title={copy.leadershipTitle} />
              <ButtonLink href={ROUTES.team} variant="primary">
                {dictionary.home.allPeople}
              </ButtonLink>
            </div>
            <TeamCardGrid members={leaders} photos={CARD_PHOTO} />
          </div>
        </section>
      ) : null}

      {partners.length ? (
        <section className="bg-surface">
          <div className="site-container flex flex-wrap items-center justify-between gap-8 py-16 sm:py-24">
            <div className="max-w-teaser">
              <SectionHeading eyebrow={text.partnersEyebrow} title={copy.partnersTitle} compact />
            </div>
            <div className="flex flex-wrap gap-4">
              {partners.map(({ slug, name }) => (
                <span
                  key={slug}
                  className="rounded-card border border-border bg-surface px-5 py-4 font-semibold text-brand shadow-card"
                >
                  {name}
                </span>
              ))}
            </div>
            <TextLink href={ROUTES.partners}>
              {text.partnersLink} {dictionary.home.arrow}
            </TextLink>
          </div>
        </section>
      ) : null}

      <SiteCta />
    </>
  );
}
