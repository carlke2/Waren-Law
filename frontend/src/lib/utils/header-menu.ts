import {
  MENU_FEATURED_INSIGHTS,
  MENU_FEATURED_PARTNERS,
  ROUTES,
  type InsightSummary,
  type OfficeResponse,
  type PartnerResponse,
  type PracticeAreaSummary,
  type SiteSettings,
  type TeamListResponse,
  type TeamSummary,
  type WebinarSummary,
} from '@waren/shared';
import { dictionary } from './dictionary';
import { whatsAppLink } from './links';

const text = dictionary.nav;

export type MenuPanelId =
  | 'about'
  | 'team'
  | 'partners'
  | 'expertise'
  | 'insights'
  | 'contact';

export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuFeaturedItem {
  label: string;
  href: string;
  meta?: string;
  image?: {
    url: string;
    alt: string;
  };
}

export interface MenuPanel {
  id: MenuPanelId;
  label: string;
  title: string;
  links: readonly MenuLink[];
  featured: readonly MenuFeaturedItem[];
}

export interface HeaderMenuData {
  panels: readonly MenuPanel[];
  placeholders: readonly string[];
}

function officeDetail(office: OfficeResponse): string | undefined {
  const line = [office.building, office.addressLine].filter(Boolean).join(', ');
  if (/upper hill/i.test(line)) return 'Upper Hill';
  if (office.building) return office.building;
  return undefined;
}

function flattenTeam(team: TeamListResponse): TeamSummary[] {
  return team.groups.flatMap(({ members }) => [...members]);
}

function featuredInsight(insight: InsightSummary): MenuFeaturedItem {
  return {
    label: insight.title,
    href: ROUTES.root(insight.slug),
    meta: insight.excerpt || undefined,
    image: insight.featuredImage
      ? { url: insight.featuredImage.url, alt: insight.featuredImage.alt || insight.title }
      : undefined,
  };
}

function featuredMember(member: TeamSummary): MenuFeaturedItem {
  const name = member.displayName ?? member.fullName;
  return {
    label: name,
    href: member.hasProfile ? ROUTES.profile(member.slug) : ROUTES.team,
    meta: member.roleTitle,
    image: member.portrait
      ? { url: member.portrait.url, alt: member.portrait.alt || name }
      : undefined,
  };
}

function featuredPartner(partner: PartnerResponse): MenuFeaturedItem {
  return {
    label: partner.name,
    href: partner.websiteUrl ?? ROUTES.partners,
    meta: partner.description || undefined,
    image: partner.logo
      ? { url: partner.logo.url, alt: partner.logo.alt || partner.name }
      : undefined,
  };
}

function featuredWebinar(webinar: WebinarSummary): MenuFeaturedItem {
  return {
    label: webinar.title,
    href: ROUTES.root(webinar.slug),
    meta: webinar.summary || undefined,
    image: webinar.heroImage
      ? { url: webinar.heroImage.url, alt: webinar.heroImage.alt || webinar.title }
      : undefined,
  };
}

export function buildHeaderMenu({
  team,
  partners,
  practiceAreas,
  insights,
  webinars,
  offices,
  whatsApp,
}: {
  team: TeamListResponse;
  partners: readonly PartnerResponse[];
  practiceAreas: readonly PracticeAreaSummary[];
  insights: readonly InsightSummary[];
  webinars: readonly WebinarSummary[];
  offices: readonly OfficeResponse[];
  whatsApp: SiteSettings['whatsApp'];
}): HeaderMenuData {
  const placeholders: string[] = [];
  const members = flattenTeam(team);
  const nairobi = offices.find(({ city }) => /nairobi/i.test(city));
  const nakuru = offices.find(({ city }) => /nakuru/i.test(city));
  const menuWebinars = webinars.filter((webinar) => webinar.featuredInMenu);
  if (menuWebinars.length === 0) {
    placeholders.push('Insights menu: no webinar is featured in the menu.');
  }

  const teamLinks: MenuLink[] = [
    { label: text.seeAllTeam, href: ROUTES.team },
    ...members.map((member) => {
      const name = member.displayName ?? member.fullName;
      if (!member.hasProfile) {
        placeholders.push(`Our Team menu: ${name} has no profile page yet.`);
        return { label: name, href: ROUTES.team };
      }
      return { label: name, href: ROUTES.profile(member.slug) };
    }),
  ];

  const partnerLinks: MenuLink[] = [
    { label: text.seeAllPartners, href: ROUTES.partners },
    ...partners.map((partner) => ({
      label: partner.name,
      href: partner.websiteUrl ?? ROUTES.partners,
    })),
  ];
  if (partners.some((partner) => !partner.websiteUrl)) {
    placeholders.push(
      'Our Partners menu: some partners have no individual page, so their name opens the partners page.',
    );
  }

  const aboutLinks: MenuLink[] = [{ label: text.seeMoreAbout, href: ROUTES.about }];
  if (nairobi) {
    aboutLinks.push({
      label: text.officesLabel(nairobi.city, officeDetail(nairobi)),
      href: ROUTES.contact,
    });
  } else {
    placeholders.push('About Us menu: Nairobi office is missing.');
  }
  if (nakuru) {
    aboutLinks.push({
      label: text.officesLabel(nakuru.city, officeDetail(nakuru)),
      href: ROUTES.contact,
    });
  } else {
    placeholders.push('About Us menu: Nakuru office is missing.');
  }

  const contactLinks: MenuLink[] = [{ label: text.contactPage, href: ROUTES.contact }];
  if (nairobi) {
    contactLinks.push({
      label: text.officeLabel(nairobi.city, officeDetail(nairobi)),
      href: ROUTES.contact,
    });
  }
  if (nakuru) {
    contactLinks.push({
      label: text.officeLabel(nakuru.city, officeDetail(nakuru)),
      href: ROUTES.contact,
    });
  }
  contactLinks.push({
    label: dictionary.cta.whatsApp,
    href: whatsAppLink(whatsApp.number, whatsApp.message),
  });

  const insightLinks: MenuLink[] = [
    { label: text.seeAllInsights, href: ROUTES.insights },
    { label: text.articles, href: ROUTES.insights },
    { label: text.webinars, href: ROUTES.webinars },
    ...menuWebinars.map((webinar) => ({ label: webinar.title, href: ROUTES.root(webinar.slug) })),
  ];

  const featuredTeam = members.filter((member) => member.featuredInMenu).map(featuredMember);
  if (featuredTeam.length === 0) {
    placeholders.push('Our Team featured: no member is featured in the menu.');
  }

  const featuredPartners = partners.slice(0, MENU_FEATURED_PARTNERS).map(featuredPartner);
  if (featuredPartners.some((item) => !item.image)) {
    placeholders.push(
      'Our Partners featured: one or more featured partners have no logo or photo in the database.',
    );
  }
  const featuredInsights = insights.slice(0, MENU_FEATURED_INSIGHTS).map(featuredInsight);
  const latestInsight = insights[0] ? [featuredInsight(insights[0])] : [];
  if (!insights[0]) placeholders.push('About Us featured: no insight is published yet.');
  const latestWebinar = webinars[0] ? [featuredWebinar(webinars[0])] : [];
  if (!webinars[0]) placeholders.push('Contact Us featured: no webinar is published yet.');
  const insightFeatured = [
    ...insights.slice(0, 2).map(featuredInsight),
    ...webinars.slice(0, Math.max(0, 2 - Math.min(insights.length, 2))).map(featuredWebinar),
  ].slice(0, 2);

  const panels: MenuPanel[] = [
    {
      id: 'about',
      label: text.aboutUs,
      title: text.aboutUs,
      links: aboutLinks,
      featured: latestInsight,
    },
    {
      id: 'team',
      label: text.ourTeam,
      title: text.ourTeam,
      links: teamLinks,
      featured: featuredTeam,
    },
    {
      id: 'partners',
      label: text.ourPartners,
      title: text.ourPartners,
      links: partnerLinks,
      featured: featuredPartners,
    },
    {
      id: 'expertise',
      label: text.areaOfExpertise,
      title: text.areaOfExpertise,
      links: [
        { label: text.seeAllAreas, href: ROUTES.expertise },
        ...practiceAreas.map((area) => ({ label: area.name, href: ROUTES.root(area.slug) })),
      ],
      featured: featuredInsights,
    },
    {
      id: 'insights',
      label: text.insights,
      title: text.insights,
      links: insightLinks,
      featured: insightFeatured,
    },
    {
      id: 'contact',
      label: text.contactUs,
      title: text.contactUs,
      links: contactLinks,
      featured: latestWebinar,
    },
  ];

  return { panels, placeholders };
}
