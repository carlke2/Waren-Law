import { ROUTES, type TeamDetail } from '@waren/shared';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteCta } from '@/components/home/cta-band';
import { BlockRenderer } from '@/components/site/block-renderer';
import { InsightsBand } from '@/components/site/insights-band';
import { JsonLd } from '@/components/site/json-ld';
import { PageHero } from '@/components/site/page-hero';
import { PortraitGrid } from '@/components/site/portrait-card';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SectionHeading } from '@/components/ui/section-heading';
import { SiteLink } from '@/components/ui/site-link';
import { getTeam, getTeamMember } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { serverEnv } from '@/lib/env';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata, seoMetadataInput } from '@/lib/seo/metadata';
import { personSchema } from '@/lib/seo/schema';
import { mailLink, telLink, whatsAppLink } from '@/lib/utils/links';

const text = dictionary.profile;
const RELATED_LIMIT = 4;
const PORTRAIT_SIZES = '(min-width: 40rem) 18rem, 100vw';

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return staticParams(async () =>
    (await getTeam()).groups
      .flatMap(({ members }) => members)
      .filter(({ hasProfile }) => hasProfile)
      .map(({ slug }) => ({ slug })),
  );
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({
    ...seoMetadataInput(member.seo, member.displayName ?? member.fullName, ROUTES.profile(slug)),
    description: member.seo.metaDescription ?? member.shortBio,
    image: member.seo.ogImage ?? member.portrait,
  });
}

function credentials(member: TeamDetail) {
  return [
    { title: text.experience, items: member.experience },
    { title: text.education, items: member.education },
    { title: text.admissions, items: member.admissions },
    { title: text.memberships, items: member.memberships },
    { title: text.languages, items: member.languages },
  ].flatMap(({ title, items }) => (items?.length ? [{ title, items }] : []));
}

function ContactButtons({ member }: { member: TeamDetail }) {
  return (
    <div className="mt-2 flex flex-wrap gap-3.5">
      <ButtonLink href={ROUTES.consultation} variant="gold">
        {text.book}
      </ButtonLink>
      {member.email ? (
        <ButtonLink href={mailLink(member.email)} variant="outline" external>
          {text.email}
        </ButtonLink>
      ) : null}
      {member.phone ? (
        <ButtonLink href={telLink(member.phone)} variant="outline" external>
          {text.call}
        </ButtonLink>
      ) : null}
      {member.whatsApp ? (
        <ButtonLink href={whatsAppLink(member.whatsApp)} variant="outline" external>
          {text.whatsApp}
        </ButtonLink>
      ) : null}
      {member.linkedInUrl ? (
        <ButtonLink href={member.linkedInUrl} variant="outline" external>
          {text.linkedIn}
        </ButtonLink>
      ) : null}
    </div>
  );
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const { slug } = await params;
  const [member, team] = await Promise.all([getTeamMember(slug), getTeam()]);
  if (!member) notFound();
  const name = member.displayName ?? member.fullName;
  const related =
    team.groups
      .find(({ memberType }) => memberType === member.memberType)
      ?.members.filter((other) => other.slug !== member.slug)
      .slice(0, RELATED_LIMIT) ?? [];
  const lists = credentials(member);
  return (
    <>
      <JsonLd data={personSchema(member, serverEnv().siteUrl)} />
      <PageHero
        title={name}
        eyebrow={member.roleTitle}
        crumbs={[{ label: dictionary.nav.people, href: ROUTES.team }, { label: name }]}
        aside={
          member.portrait ? (
            <div className="relative aspect-portrait w-full max-w-profile bg-placeholder">
              <Image
                src={member.portrait.url}
                alt={member.portrait.alt}
                fill
                sizes={PORTRAIT_SIZES}
                className="object-cover object-top"
              />
            </div>
          ) : null
        }
      >
        <ContactButtons member={member} />
      </PageHero>

      <section className="bg-surface">
        <div className="site-container flex flex-wrap items-start gap-16 py-16 sm:py-28">
          <div className="flex min-w-0 flex-welcome-title flex-col gap-4">
            <Eyebrow>{text.biographyEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{text.about(name)}</h2>
            <span className="mt-2 h-rule w-rule-long bg-accent" />
          </div>
          {member.longBio ? (
            <BlockRenderer blocks={member.longBio.blocks} className="min-w-0 flex-welcome-body" />
          ) : (
            <p className="min-w-0 flex-welcome-body text-body text-text-body">{member.shortBio}</p>
          )}
        </div>
      </section>

      {lists.length || member.practiceAreas.length ? (
        <section className="bg-surface-alt">
          <div className="site-container grid grid-auto-statement gap-12 py-16 sm:py-28">
            {lists.map(({ title, items }) => (
              <div key={title} className="flex flex-col gap-3.5">
                <h2 className="font-heading text-h3-card font-semibold text-brand">{title}</h2>
                <ul className="flex flex-col gap-2 text-card-body text-text-muted">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            {member.practiceAreas.length ? (
              <div className="flex flex-col gap-3.5">
                <h2 className="font-heading text-h3-card font-semibold text-brand">
                  {dictionary.team.practiceAreas}
                </h2>
                <ul className="flex flex-wrap gap-2.5">
                  {member.practiceAreas.map(({ slug: areaSlug, name: areaName }) => (
                    <li key={areaSlug}>
                      <SiteLink
                        href={ROUTES.root(areaSlug)}
                        className="inline-flex min-h-11 items-center border border-border-strong bg-surface px-4 py-2 text-link font-semibold text-brand hover:border-brand"
                      >
                        {areaName}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <InsightsBand title={text.insights(name)} insights={member.insights} />

      {related.length ? (
        <section data-tone="dark" className="bg-brand text-on-brand">
          <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
            <SectionHeading eyebrow={text.relatedEyebrow} title={text.related} onBrand />
            <PortraitGrid members={related} />
          </div>
        </section>
      ) : null}

      <SiteCta />
    </>
  );
}
