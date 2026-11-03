import { ROUTES, type TeamDetail } from '@waren/shared';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/site/block-renderer';
import { CtaBand } from '@/components/site/cta-band';
import { JsonLd } from '@/components/site/json-ld';
import { InsightCard } from '@/components/site/insight-card';
import { ButtonLink } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  CalendarIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from '@/components/ui/icons';
import { Container, Section } from '@/components/ui/layout';
import { Heading, Prose } from '@/components/ui/typography';
import { getSettings, getTeam, getTeamMember } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata, seoMetadataInput } from '@/lib/seo/metadata';
import { breadcrumbSchema, personSchema } from '@/lib/seo/schema';
import { serverEnv } from '@/lib/env';
import { formatPhone, mailLink, telLink, whatsAppLink } from '@/lib/utils/links';

const text = dictionary.profile;
const PORTRAIT_SIZES = '(min-width: 64rem) 24rem, 100vw';

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
  const member = await getTeamMember((await params).slug);
  if (!member) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({
    ...seoMetadataInput(
      member.seo,
      `${member.fullName}, ${member.roleTitle}`,
      ROUTES.profile(member.slug),
    ),
    description: member.seo.metaDescription ?? member.shortBio,
    image: member.seo.ogImage ?? member.portrait,
  });
}

function contactActions(member: TeamDetail) {
  return [
    member.phone && {
      key: 'phone',
      href: telLink(member.phone),
      label: formatPhone(member.phone),
      Icon: PhoneIcon,
    },
    member.email && {
      key: 'email',
      href: mailLink(member.email),
      label: member.email,
      Icon: MailIcon,
    },
    member.whatsApp && {
      key: 'whatsApp',
      href: whatsAppLink(member.whatsApp),
      label: text.whatsApp,
      Icon: WhatsAppIcon,
    },
    member.linkedInUrl && {
      key: 'linkedIn',
      href: member.linkedInUrl,
      label: text.linkedIn,
      Icon: LinkedInIcon,
    },
  ].filter((action) => !!action);
}

function CredentialList({ title, items }: { title: string; items: readonly string[] | null }) {
  if (!items?.length) return null;
  return (
    <div>
      <Heading level={3}>{title}</Heading>
      <Prose className="mt-2">
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Prose>
    </div>
  );
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const [member, settings] = await Promise.all([getTeamMember((await params).slug), getSettings()]);
  if (!member) notFound();
  const name = member.displayName ?? member.fullName;
  const crumbs = [
    { label: dictionary.common.home, href: ROUTES.home },
    { label: dictionary.team.title, href: ROUTES.team },
    { label: name },
  ];
  const { siteUrl } = serverEnv();
  const hasCredentials = [member.education, member.admissions, member.memberships].some(
    (list) => list?.length,
  );

  return (
    <>
      <JsonLd data={personSchema(member, siteUrl)} />
      <JsonLd data={breadcrumbSchema(crumbs, siteUrl)} />
      <div data-tone="dark" className="bg-navy-900 py-12 text-on-dark-muted md:py-16">
        <Container>
          <Breadcrumbs label={dictionary.common.breadcrumb} crumbs={crumbs} />
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-12">
            {member.portrait ? (
              <Image
                src={member.portrait.url}
                alt={member.portrait.alt}
                width={member.portrait.width ?? undefined}
                height={member.portrait.height ?? undefined}
                sizes={PORTRAIT_SIZES}
                priority
                className="aspect-portrait w-full max-w-portrait rounded-md object-cover object-top"
              />
            ) : null}
            <div>
              <Heading level={1}>{name}</Heading>
              <p className="mt-2 text-lead text-gold-400">{member.roleTitle}</p>
              {member.practiceAreas.length ? (
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-small">
                  {member.practiceAreas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={ROUTES.root(area.slug)}
                        className="underline underline-offset-4 hover:text-on-dark"
                      >
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-4 max-w-lead">{member.shortBio}</p>
              {member.office ? (
                <p className="mt-4 flex items-center gap-2 text-small">
                  <PinIcon className="size-5 shrink-0 text-gold-400" />
                  {member.office.name}
                </p>
              ) : null}
              <ul className="mt-4 grid gap-1 text-small sm:grid-cols-2">
                {contactActions(member).map(({ key, href, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      className="inline-flex min-h-tap items-center gap-2 underline-offset-4 hover:text-on-dark hover:underline"
                    >
                      <Icon className="size-5 shrink-0 text-gold-400" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={member.bookingUrl ?? settings.booking.url}
                variant="accent"
                size="lg"
                className="mt-6"
              >
                <CalendarIcon className="size-5" />
                {text.book(name)}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {member.longBio?.blocks.length ? (
        <Section>
          <Heading level={2}>{text.about(name)}</Heading>
          <BlockRenderer blocks={member.longBio.blocks} className="mt-4" />
        </Section>
      ) : null}

      {member.experience?.length ? (
        <Section tone="white">
          <Heading level={2}>{text.experience}</Heading>
          <Prose className="mt-4">
            <ul>
              {member.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Prose>
        </Section>
      ) : null}

      {hasCredentials || member.languages.length ? (
        <Section>
          <Heading level={2}>{text.credentials}</Heading>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <CredentialList title={text.admissions} items={member.admissions} />
            <CredentialList title={text.education} items={member.education} />
            <CredentialList title={text.memberships} items={member.memberships} />
            <CredentialList title={text.languages} items={member.languages} />
          </div>
        </Section>
      ) : null}

      {member.insights.length ? (
        <Section tone="white">
          <Heading level={2}>{text.insights(name)}</Heading>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {member.insights.map((insight) => (
              <li key={insight.slug}>
                <InsightCard insight={insight} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand settings={settings} />
    </>
  );
}
