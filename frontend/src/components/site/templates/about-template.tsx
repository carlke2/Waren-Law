import type { PageResponse } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import { AboutVideo } from '@/components/site/about-video';
import { AwardList } from '@/components/site/award-list';
import { ContentSectionBlock, ContentSections } from '@/components/site/content-sections';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/layout';
import { Heading, Lead } from '@/components/ui/typography';
import { getAwards, getPartners, getSettings } from '@/lib/api/content';
import { groupSections } from '@/lib/content/sections';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.about;

export async function AboutTemplate({ page }: { page: PageResponse }) {
  const [settings, awards, partners] = await Promise.all([
    getSettings(),
    getAwards(),
    getPartners(),
  ]);
  const [story, ...rest] = groupSections(page.body.blocks);
  const { aboutVideo } = settings;

  return (
    <>
      <PageHero title={page.title} crumbs={[{ label: page.title }]} />
      {story ? <ContentSectionBlock section={story} /> : null}
      <Section tone="sand" aria-label={text.videoTitle}>
        <AboutVideo
          url={aboutVideo.url}
          captionsUrl={aboutVideo.captionsUrl}
          poster={aboutVideo.media}
        />
      </Section>
      <ContentSections sections={rest} startTone={0} />
      {awards.length ? (
        <Section tone="sand">
          <Heading level={2}>{text.awardsHeading}</Heading>
          <AwardList awards={awards} />
        </Section>
      ) : null}
      {partners.length ? (
        <Section tone="white">
          <Heading level={2}>{text.partnersHeading}</Heading>
          <Lead className="mt-3">{text.partnersLead}</Lead>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <li key={partner.slug}>
                <Card className="h-full">
                  <h3 className="text-h4">{partner.name}</h3>
                </Card>
              </li>
            ))}
          </ul>
          <ButtonLink href={ROUTES.partners} variant="outline" className="mt-6">
            {text.partnersLink}
          </ButtonLink>
        </Section>
      ) : null}
      <CtaBand settings={settings} />
    </>
  );
}
