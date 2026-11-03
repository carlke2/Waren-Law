import { FEATURED_TEAM_LIMIT, HOME_PAGE_SLUG, LATEST_INSIGHTS_LIMIT, ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AwardList } from '@/components/site/award-list';
import { ContentSections } from '@/components/site/content-sections';
import { CtaBand } from '@/components/site/cta-band';
import { HeroVideo } from '@/components/site/hero-video';
import { InsightCard } from '@/components/site/insight-card';
import { PracticeAreaCard } from '@/components/site/practice-area-card';
import { TeamCard } from '@/components/site/team-card';
import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/card';
import { Container, Section } from '@/components/ui/layout';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import {
  getAwards,
  getClientLogos,
  getInsights,
  getPage,
  getPracticeAreas,
  getSettings,
  getTeam,
  getWebinars,
} from '@/lib/api/content';
import { parseHomeContent } from '@/lib/content/sections';
import { featuredWebinar, webinarStateLabel } from '@/lib/content/webinars';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';

const text = dictionary.home;
const HERO_IMAGE_SIZES = '(min-width: 64rem) 50vw, 100vw';

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const page = await getPage(HOME_PAGE_SLUG);
  return { title: page?.seo.metaTitle, description: page?.seo.metaDescription };
}

export default async function HomePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [page, settings, practiceAreas, team, awards, logos, insights, webinars] =
    await Promise.all([
      getPage(HOME_PAGE_SLUG),
      getSettings(),
      getPracticeAreas(),
      getTeam(),
      getAwards(),
      getClientLogos(),
      getInsights({ pageSize: LATEST_INSIGHTS_LIMIT }),
      getWebinars(),
    ]);
  if (!page) notFound();

  const { headline, whoWeServe, sections } = parseHomeContent(page.body.blocks);
  const hero = settings.homeHero;
  const featuredTeam = team.groups
    .flatMap(({ members }) => members)
    .filter(({ hasProfile }) => hasProfile)
    .slice(0, FEATURED_TEAM_LIMIT);
  const webinar = featuredWebinar(webinars);

  return (
    <>
      <div data-tone="dark" className="bg-navy-900 text-on-dark">
        <Container className="grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div>
            <Heading level={1} size="display">
              {headline}
            </Heading>
            <Lead className="mt-4">{whoWeServe}</Lead>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={settings.booking.url} variant="accent" size="lg">
                {settings.cta.bookingLabel}
              </ButtonLink>
              <ButtonLink href={ROUTES.expertise} variant="outline-dark" size="lg">
                {dictionary.cta.services}
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-hero overflow-hidden rounded-md">
            <Image
              src={hero.media.url}
              alt={hero.media.alt}
              fill
              priority
              fetchPriority="high"
              sizes={HERO_IMAGE_SIZES}
              className="object-cover"
            />
            {hero.videoUrl ? (
              <HeroVideo url={hero.videoUrl} className="absolute inset-0 size-full object-cover" />
            ) : null}
          </div>
        </Container>
      </div>

      <Section>
        <Eyebrow>{text.expertiseEyebrow}</Eyebrow>
        <Heading level={2} className="mt-2">
          {text.expertiseHeading}
        </Heading>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area) => (
            <li key={area.slug}>
              <PracticeAreaCard area={area} />
            </li>
          ))}
        </ul>
      </Section>

      <ContentSections sections={sections} startTone={1} />

      {featuredTeam.length ? (
        <Section>
          <Eyebrow>{text.teamEyebrow}</Eyebrow>
          <Heading level={2} className="mt-2">
            {text.teamHeading}
          </Heading>
          <ul className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featuredTeam.map((member) => (
              <li key={member.slug}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
          <ButtonLink href={ROUTES.team} variant="outline" className="mt-8">
            {text.teamLink}
          </ButtonLink>
        </Section>
      ) : null}

      {awards.length || logos.length ? (
        <Section tone="white">
          <Heading level={2}>{text.trustHeading}</Heading>
          {awards.length ? <AwardList awards={awards} /> : null}
          {logos.length ? (
            <ul className="mt-8 flex flex-wrap items-center gap-8">
              {logos.map((logo) => (
                <li key={logo.slug}>
                  <Image
                    src={logo.logo.url}
                    alt={logo.altText}
                    width={logo.logo.width ?? undefined}
                    height={logo.logo.height ?? undefined}
                    sizes="8rem"
                    className="h-16 w-auto"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      <Section>
        <Heading level={2}>{text.insightsHeading}</Heading>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {insights.items.map((insight) => (
            <li key={insight.slug}>
              <InsightCard insight={insight} />
            </li>
          ))}
        </ul>
        <ButtonLink href={ROUTES.insights} variant="outline" className="mt-8">
          {text.insightsLink}
        </ButtonLink>
      </Section>

      {webinar ? (
        <Section tone="white">
          <Eyebrow>{text.webinarEyebrow}</Eyebrow>
          <Heading level={2} className="mt-2">
            {webinar.title}
          </Heading>
          <Badge className="mt-3">{webinarStateLabel(webinar.state)}</Badge>
          <Lead className="mt-3">{webinar.summary}</Lead>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={ROUTES.root(webinar.slug)}>{text.webinarLink}</ButtonLink>
            <ButtonLink href={ROUTES.webinars} variant="outline">
              {text.webinarsLink}
            </ButtonLink>
          </div>
        </Section>
      ) : null}

      <CtaBand settings={settings} />
    </>
  );
}
