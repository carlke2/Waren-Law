import type {
  MemberType,
  OfficeType,
  WebinarState,
} from '../../../prisma/generated/client.js';
import {
  HERO_VIDEO_FILE,
  ROUTES,
  SETTING_KEYS,
  type HeroCard,
  type IconName,
} from '@waren/shared';
import { blockText, type ParsedBlock } from './html-to-blocks.js';

export const READING_WORDS_PER_MINUTE = 200;
export const SHORT_SUMMARY_MAX_LENGTH = 220;

export const COMMON_SKIPPED_WIDGETS = [
  'button',
  'image',
  'image-box',
  'image-carousel',
  'icon',
  'divider',
  'star-rating',
  'testimonial',
  'eael-post-grid',
  'wpforms',
  'shortcode',
  'social-icons',
  'google_maps',
  'html',
  'toggle',
] as const;

export const CTA_START = /^Need legal assistance/i;

export const TEXT_FIXES = [
  { from: 'Intergrity', to: 'Integrity', note: 'Corrected the "Intergrity" typo on About' },
  {
    from: 'deepen our insightso that',
    to: 'deepen our insight, so that',
    note: 'Corrected the "insightso" typo on Our Partners',
  },
] as const;

const OUTCOME_CLAIM_NOTE = 'Hid a quantified result or outcome claim in a profile (decision 0010)';

export const OUTCOME_CLAIM_EDITS = [
  {
    from: 'including the successful application and acquisition of gold trading licenses.',
    to: 'including the application for and acquisition of gold trading licenses.',
    note: OUTCOME_CLAIM_NOTE,
  },
  {
    from: 'Represented mining companies in high-stakes negotiations with local communities, successfully securing agreements on royalty distributions and land use that ensured long-term project stability.',
    to: 'Represented mining companies in negotiations with local communities on royalty distributions and land use.',
    note: OUTCOME_CLAIM_NOTE,
  },
  {
    from: 'Successful negotiations with communities',
    to: 'Negotiations with communities',
    note: OUTCOME_CLAIM_NOTE,
  },
  {
    from: 'Advised real estate developers on the successful transfer of over 100 properties, involving the drafting of sale agreements and the seamless issuance of sectional titles to individual purchasers.',
    to: 'Advised real estate developers on the transfer of properties, involving the drafting of sale agreements and the issuance of sectional titles to individual purchasers.',
    note: OUTCOME_CLAIM_NOTE,
  },
  {
    from: 'Represented a prominent SACCO in the preparation and registration of hundreds of charges, ensuring all instruments maintained strict legal compliance and secured the institution’s financial interests.',
    to: 'Represented a SACCO in the preparation and registration of charges.',
    note: OUTCOME_CLAIM_NOTE,
  },
] as const;

export const BANNED_CLAIMS = [
  /\[Client Name\]/i,
  /\[Financial Institution\]/i,
  /98% Recovery/i,
  /500\+ Clients/i,
  /20\+ Jurisdictions/i,
  /15\+? Years/i,
  /over 100 properties/i,
  /hundreds of charges/i,
];

export const MERGED_CATEGORIES: Record<string, string> = {
  'commercial-law': 'conveyancing-and-commercial-services',
  'land-registry': 'conveyancing-and-commercial-services',
  'financial-services-regulatory': 'regulatory-services',
};

export const CATEGORIES_NOT_IMPORTED = ['uncategorized', 'uncategorized-zh'];

export const CATEGORY_ORDER = [
  'conveyancing-and-commercial-services',
  'debt-recovery',
  'dispute-resolution',
  'estate-planning',
  'investment-and-business-law',
  'mining-and-energy-law',
  'regulatory-services',
  'wealth-management',
  'data-protection',
];

export const DATA_PROTECTION_CATEGORY = { slug: 'data-protection', name: 'Data Protection' };

export const UNCATEGORISED_INSIGHT_CATEGORIES: Record<string, string> = {
  'is-kenyas-data-protection-regime-really-working': 'data-protection',
  'knowing-your-rights-as-a-data-subject-in-kenya': 'data-protection',
  'when-consent-comes-with-a-price-tag': 'data-protection',
  'how-kenyas-courts-are-taking-control-of-big-techs-data-decisions': 'data-protection',
  'why-the-high-court-has-pulled-road-accident-claims-out-of-the-small-claims-court':
    'dispute-resolution',
  'waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing':
    'investment-and-business-law',
};

export const CATEGORY_PRACTICE_AREAS: Record<string, string> = {
  'conveyancing-and-commercial-services': 'real-estate-conveyancing-land-law',
  'debt-recovery': 'corporate-debt-recovery',
  'dispute-resolution': 'litigation-dispute-resolution-international-arbitration',
  'estate-planning': 'wealth-management-investments',
  'investment-and-business-law': 'corporate-commercial-practice',
  'mining-and-energy-law': 'mining-energy-law',
  'wealth-management': 'wealth-management-investments',
};

export interface PracticeAreaEntry {
  slug: string;
  name: string;
  categorySlug: string | null;
  icon: IconName;
  cardTitle: string;
  shortName: string;
  cardSummary: string;
}

export const PRACTICE_AREAS: readonly PracticeAreaEntry[] = [
  {
    slug: 'corporate-debt-recovery',
    name: 'Debt Solutions, Recovery & Asset Tracing',
    categorySlug: 'debt-recovery',
    icon: 'coins',
    cardTitle: 'Debt Recovery & Asset Tracing',
    shortName: 'Debt Recovery & Asset Tracing',
    cardSummary: 'Recovery, tracing and enforcement for lenders and creditors.',
  },
  {
    slug: 'corporate-commercial-practice',
    name: 'Corporate & Commercial Practice',
    categorySlug: 'investment-and-business-law',
    icon: 'briefcase',
    cardTitle: 'Corporate & Commercial',
    shortName: 'Corporate & Commercial',
    cardSummary: 'Company formation, structuring, contracts, mergers and PPPs.',
  },
  {
    slug: 'real-estate-conveyancing-land-law',
    name: 'Real Estate, Conveyancing & Land Law',
    categorySlug: 'conveyancing-and-commercial-services',
    icon: 'home',
    cardTitle: 'Real Estate, Conveyancing & Land',
    shortName: 'Real Estate & Conveyancing',
    cardSummary: 'Transfers, title, due diligence and land disputes.',
  },
  {
    slug: 'wealth-management-investments',
    name: 'Wealth Management & Investments',
    categorySlug: 'wealth-management',
    icon: 'shield-check',
    cardTitle: 'Wealth Management & Investments',
    shortName: 'Wealth Management',
    cardSummary: 'Trusts, holding structures, estate plans and investment.',
  },
  {
    slug: 'litigation-dispute-resolution-international-arbitration',
    name: 'Litigation, Dispute Resolution & International Arbitration',
    categorySlug: 'dispute-resolution',
    icon: 'scales',
    cardTitle: 'Litigation, Dispute Resolution & Arbitration',
    shortName: 'Litigation & Arbitration',
    cardSummary: 'Litigation, international arbitration and mediation.',
  },
  {
    slug: 'banking-finance-law',
    name: 'Banking & Finance Law',
    categorySlug: null,
    icon: 'bank',
    cardTitle: 'Banking & Finance',
    shortName: 'Banking & Finance',
    cardSummary: 'Lending, project finance, securities and enforcement.',
  },
  {
    slug: 'mining-energy-law',
    name: 'Mining & Energy Law',
    categorySlug: 'mining-and-energy-law',
    icon: 'bolt',
    cardTitle: 'Mining & Energy',
    shortName: 'Mining & Energy',
    cardSummary: 'Licensing, joint ventures, ESG and energy projects.',
  },
  {
    slug: 'employment-labour-law',
    name: 'Employment & Labour Law',
    categorySlug: null,
    icon: 'users',
    cardTitle: 'Employment & Labour',
    shortName: 'Employment & Labour',
    cardSummary: 'Contracts, HR compliance, workplace disputes and unions.',
  },
];

export const DEBT_MERGE = {
  shortPageSlug: 'debt-solutions-recovery-asset-tracing',
  servicesHeading: 'What we do for you',
  keptFaqQuestions: [
    'How do you assess whether a debt is recoverable?',
    'What if the debtor claims to have no assets?',
    'Can you recover debts owed by companies in other countries?',
  ],
  droppedFaqSentences: [/This is offered free and without obligation[^.]*\./],
};

export interface TeamEntry {
  name: string;
  memberType: MemberType;
  isAdvocate: boolean;
  roleTitle?: string;
  officeSlug: string | null;
  practiceAreas: readonly string[];
  portrait?: string;
  portraitAlt?: string;
  email?: string;
  phone?: string;
  whatsApp?: string;
  linkedInUrl?: string;
  bookingUrl?: string;
  profilePageSlug?: string;
  homepageOrder?: number;
  featuredInMenu?: boolean;
}

const P = {
  debt: 'corporate-debt-recovery',
  wealth: 'wealth-management-investments',
  employment: 'employment-labour-law',
  corporate: 'corporate-commercial-practice',
  litigation: 'litigation-dispute-resolution-international-arbitration',
  mining: 'mining-energy-law',
  property: 'real-estate-conveyancing-land-law',
};

const NAIROBI = 'nairobi';
const NAKURU = 'nakuru';

export const TEAM: readonly TeamEntry[] = [
  {
    name: 'Janice Wachuka',
    memberType: 'partner',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.wealth, P.property, P.corporate],
    email: 'wmaina@warenlaw.com',
    linkedInUrl: 'https://www.linkedin.com/in/janice-wachuka/',
    profilePageSlug: 'janice-wachuka',
    homepageOrder: 1,
    featuredInMenu: true,
  },
  {
    name: 'Nick Amboko',
    memberType: 'consultant',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.litigation, P.employment],
  },
  {
    name: 'Ephraim Ndegwa',
    memberType: 'partner',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.corporate, P.mining],
    email: 'endegwa@warenlaw.com',
    phone: '+254719278594',
    whatsApp: '254719278594',
    linkedInUrl: 'https://www.linkedin.com/in/ephraim-ndegwa',
    bookingUrl: 'https://calendly.com/endegwa-warenlaw/consultation-with-ephraim-ndegwa',
    profilePageSlug: 'ephraim-ndegwa',
    homepageOrder: 2,
    featuredInMenu: true,
  },
  {
    name: 'Martin Wachira',
    memberType: 'partner',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.corporate, P.wealth],
    homepageOrder: 3,
  },
  {
    name: 'Phylis Njane',
    memberType: 'partner',
    isAdvocate: true,
    portraitAlt: 'Phylis Njane, Partner',
    officeSlug: null,
    practiceAreas: [P.litigation, P.employment],
    homepageOrder: 4,
  },
  {
    name: 'Barbra Katasi',
    memberType: 'advocate',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.debt],
  },
  {
    name: 'Cecilia Njeri',
    memberType: 'advocate',
    isAdvocate: true,
    // Her team card says only "Conveyancing &Commercial"; this is the title her profile page shows.
    roleTitle:
      'Associate Advocate | Conveyancing & Real Estate Law | Commercial & Business Law | Succession & Estate Planning',
    officeSlug: NAIROBI,
    practiceAreas: [P.property, P.corporate, P.wealth],
    portrait: '2026/05/CECILIA-NJERI_upd_1.png',
    email: 'cwangeci@warenlaw.com',
    phone: '+254797899003',
    whatsApp: '254797899003',
    linkedInUrl: 'https://www.linkedin.com/in/cecilia-wangeci-njeri-1117a9267/',
    profilePageSlug: 'cecilia-njeri',
  },
  {
    name: 'Christine Muthoni',
    memberType: 'advocate',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.property, P.corporate],
  },
  {
    name: 'Stephen Warutere',
    memberType: 'advocate',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.debt],
  },
  {
    name: 'Faith Wanjala',
    memberType: 'advocate',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.litigation],
  },
  {
    name: 'Margaret Wanjiru',
    memberType: 'staff',
    isAdvocate: false,
    officeSlug: NAIROBI,
    practiceAreas: [P.wealth],
  },
  ...[
    'Eutycus Kamathi',
    'Charity Wambui',
    'Fridah Gakii',
    'Davis Wachira',
    'Jimmy Wamalwa',
    'Mary Wanjiku',
    'Alex Maina',
    'Charles Ndombi',
  ].map((name) => ({
    name,
    memberType: 'staff' as const,
    isAdvocate: false,
    officeSlug: NAIROBI,
    practiceAreas: [],
  })),
  {
    name: 'Florence Wambugu',
    memberType: 'staff',
    isAdvocate: false,
    officeSlug: NAKURU,
    practiceAreas: [],
  },
];

export const PROFILE_MEMBER_TYPES: readonly MemberType[] = ['partner', 'advocate', 'consultant'];

export const AUTHOR_BIO_PATTERN =
  /\b(Janice Wachuka|Ephraim Ndegwa|Cecilia Njeri)\s+is\s+(?:the|a|an)\s/;
export const FIRST_PERSON_AUTHOR_PATTERN =
  /My name is (Janice Wachuka|Ephraim Ndegwa|Cecilia Njeri)/;

export interface OfficeEntry {
  slug: string;
  name: string;
  type: OfficeType;
  addressLine: string;
  building?: string;
  city: string;
  country: string;
  poBox?: string;
  partnerSlug?: string;
  mapEmbedUrl?: string;
}

export const OFFICES: readonly OfficeEntry[] = [
  {
    slug: NAIROBI,
    name: 'Nairobi Head Office',
    type: 'head',
    addressLine: 'Suite No. 8, B2, Kiambere Road, Upper Hill',
    building: 'Manga House',
    city: 'Nairobi',
    country: 'Kenya',
    poBox: 'P.O. Box 54954-00200, City Square, Nairobi',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Manga%20House%2C%20Kiambere%20Road%2C%20Upper%20Hill%20Nairobi&t=m&z=15&output=embed&iwloc=near',
  },
  {
    slug: NAKURU,
    name: 'Nakuru Branch',
    type: 'branch',
    addressLine: '3rd Floor, Room 308, Kenyatta Avenue',
    building: 'Wilmur House',
    city: 'Nakuru',
    country: 'Kenya',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Wilmur%20House%2C%20Kenyatta%20Avenue%2C%20Nakuru&t=m&z=15&output=embed&iwloc=near',
  },
  {
    slug: 'beijing',
    name: 'Beijing Joint Office',
    type: 'joint',
    addressLine: '20th Floor, Building A, No. 18 Zhongguancun Street, Haidian District',
    building: 'Zhongguancun Science and Technology Trade Center',
    city: 'Beijing',
    country: 'China',
    partnerSlug: 'beijing-jingping-law-firm',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=No.%2018%20Zhongguancun%20Street%2C%20Haidian%20District%2C%20Beijing&t=m&z=15&output=embed&iwloc=near',
  },
];

export const PARTNERS = [
  {
    slug: 'beijing-jingping-law-firm',
    name: 'Beijing Jingping Law Firm',
    heading: 'jingping law',
    websiteUrl: 'https://www.jinglawyer.com/',
    carouselIndex: 1,
  },
  {
    slug: 'beijing-matrix-law-firm',
    name: 'Beijing Matrix Law Firm',
    heading: 'matrix law',
    websiteUrl: 'https://en.imatrixlaw.com/',
    carouselIndex: 0,
  },
  {
    slug: 'jointide-law-firm',
    name: 'Jointide Law Firm',
    heading: 'Jointide',
    websiteUrl: 'https://www.jointide.com/en/',
    carouselIndex: 0,
  },
] as const;

export const PARTNERS_PAGE_SLUG = 'our-partners';

export interface PageEntry {
  slug: string;
  wordpressSlug?: string;
  title: string;
  template: string;
  path: string;
  dropBlocks?: RegExp;
  keepOnly?: RegExp;
  reshape?: (blocks: readonly ParsedBlock[]) => ParsedBlock[];
  authored?: { blocks: readonly ParsedBlock[]; metaDescription: string };
}

const heading = (level: 2 | 3, text: string): ParsedBlock => ({
  type: 'heading',
  level,
  content: [{ text }],
});
const paragraph = (text: string): ParsedBlock => ({ type: 'paragraph', content: [{ text }] });
const bullets = (items: readonly string[]): ParsedBlock => ({
  type: 'list',
  ordered: false,
  items: items.map((text) => [{ text }]),
});

const blockStarting = (blocks: readonly ParsedBlock[], start: string): number => {
  const index = blocks.findIndex((block) => blockText(block).startsWith(start));
  if (index === -1) throw new Error(`Expected a block starting with "${start}"`);
  return index;
};

const section = (blocks: readonly ParsedBlock[], from: string, until?: string): ParsedBlock[] =>
  blocks.slice(blockStarting(blocks, from), until ? blockStarting(blocks, until) : undefined);

const asCardHeading = (block: ParsedBlock): ParsedBlock =>
  block.type === 'heading' ? heading(3, blockText(block).replace(/:$/, '')) : block;

const WHO_WE_SERVE =
  'We serve individuals and corporates, local and international, with clarity, precision, and unwavering integrity.';

function reshapeHome(blocks: readonly ParsedBlock[]): ParsedBlock[] {
  const [headline] = blocks;
  if (!headline) throw new Error('Home has no headline');
  return [
    headline,
    paragraph(WHO_WE_SERVE),
    heading(2, 'Why choose us'),
    ...section(blocks, 'A New Standard').map(asCardHeading),
  ];
}

function reshapeAbout(blocks: readonly ParsedBlock[]): ParsedBlock[] {
  const lead = blocks[blockStarting(blocks, 'Discover the principles')];
  if (!lead) throw new Error('About has no mission lead');
  return [
    ...section(blocks, 'Our History', 'Trust'),
    heading(2, 'Our Mission & Vision'),
    paragraph(blockText(lead)),
    ...section(blocks, 'Mission', 'Our History').map(asCardHeading),
    heading(2, 'Our Values'),
    ...section(blocks, 'Trust', 'Why Choose us').map(asCardHeading),
    heading(2, 'Why choose us'),
    ...section(blocks, 'At Waren, we combine'),
  ];
}

function reshapePartners(blocks: readonly ParsedBlock[]): ParsedBlock[] {
  return [
    ...blocks.slice(0, blockStarting(blocks, 'Jointide law firm')),
    heading(2, 'Jointide Law Firm and Beijing Matrix Law Firm agreement'),
    ...section(blocks, 'On the morning', 'Beijing Jingping Law Firm agreement'),
  ];
}

const TERMS_BLOCKS: readonly ParsedBlock[] = [
  heading(2, 'About this website'),
  paragraph(
    'This website is operated by WAREN Law Advocates LLP, a firm of advocates with offices in Nairobi and Nakuru and a joint office in Beijing.',
  ),
  heading(2, 'General information only'),
  paragraph(
    'The content on this website is general information. It is not legal advice and should not be relied on as legal advice for any particular situation. Laws change and each matter turns on its own facts.',
  ),
  heading(2, 'No advocate-client relationship'),
  paragraph(
    'Reading this website or contacting the firm through it does not create an advocate-client relationship. That relationship begins only when the firm confirms its engagement. Please do not send confidential information until then.',
  ),
  heading(2, 'Links to other websites'),
  paragraph(
    'This website links to other websites and services, such as booking and social media pages. The firm does not control those websites and is not responsible for their content.',
  ),
  heading(2, 'Contact'),
  paragraph('Questions about this website can be sent to info@warenlaw.com.'),
];

const COOKIE_BLOCKS: readonly ParsedBlock[] = [
  heading(2, 'How consent works'),
  paragraph(
    'When you first visit, the website asks whether you accept optional cookies. Analytics and advertising tags load only after you accept them. You can change your choice at any time using the "Cookie preferences" link at the bottom of every page.',
  ),
  heading(2, 'Necessary cookie'),
  bullets([
    'waren_consent: a first-party cookie that remembers your choice for up to 12 months. It is set only after you make a choice.',
  ]),
  heading(2, 'Optional cookies'),
  bullets([
    'Analytics: Google Tag Manager and the Google tag help the firm understand how the website is used. These are provided by Google.',
    'Advertising: the Meta Pixel helps the firm measure its advertising. It is provided by Meta.',
  ]),
  heading(2, 'Contact'),
  paragraph('Questions about cookies can be sent to info@warenlaw.com.'),
];

export const PAGES: readonly PageEntry[] = [
  {
    slug: 'home',
    wordpressSlug: 'home',
    title: 'Home',
    template: 'home',
    path: '/',
    dropBlocks:
      /^(Some of the Brands|Services$|What We Handle|Debt Solutions, Recovery|Corporate & Commercial Practice|Wealth Management & Investments|Recent insights|View More|\d\d\.$)/,
    reshape: reshapeHome,
  },
  {
    slug: 'about-us',
    wordpressSlug: 'about-us',
    title: 'About Us',
    template: 'about',
    path: '/about-us/',
    dropBlocks: /^(About Us$|Get to know Us|Recognized to be the best|Awards won)/,
    reshape: reshapeAbout,
  },
  {
    slug: 'our-partners',
    wordpressSlug: 'our-partners',
    title: 'Our Partners',
    template: 'partners',
    path: '/our-partners/',
    dropBlocks:
      /^(Our Partners$|Meet Our abled partners|Partners$|jingping law$|matrix law$|Jointide$|Beijing Jingping Law Firm hosts|Matrix brings|Jointide Law Firm boasts)/,
    reshape: reshapePartners,
  },
  {
    slug: 'contact-us',
    wordpressSlug: 'contact-us',
    title: 'Contact Us',
    template: 'contact',
    path: '/contact-us/',
    keepOnly: /^(Let.s Get Personal|Schedule an initial consultation)/,
  },
  {
    slug: 'privacy-policy',
    wordpressSlug: 'privacy-policy',
    title: 'Privacy Policy',
    template: 'legal',
    path: '/privacy-policy/',
  },
  {
    slug: 'terms',
    title: 'Terms and Legal Disclaimer',
    template: 'legal',
    path: '/terms/',
    authored: {
      blocks: TERMS_BLOCKS,
      metaDescription: 'Terms of use and legal disclaimer for the WAREN Law Advocates LLP website.',
    },
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    template: 'legal',
    path: '/cookie-policy/',
    authored: {
      blocks: COOKIE_BLOCKS,
      metaDescription:
        'Which cookies the WAREN Law Advocates LLP website uses and how consent works.',
    },
  },
];

export interface WebinarEntry {
  slug: string;
  state: WebinarState;
  startsAt: string | null;
  timezone: string | null;
  recordingGated: boolean;
  panel: readonly string[];
  heroImage?: string;
  featuredOnHome?: boolean;
  featuredInMenu?: boolean;
}

export const WEBINARS: readonly WebinarEntry[] = [
  {
    slug: 'trusts-taxes-protecting-wealth-across-borders',
    state: 'past',
    startsAt: '2026-07-29T02:00:00.000Z',
    timezone: 'America/Los_Angeles',
    recordingGated: false,
    panel: ['janice-wachuka', 'ephraim-ndegwa', 'martin-wachira'],
    featuredInMenu: true,
  },
  {
    slug: 'wealth-protection-plan-for-kenyans-abroad-webinar',
    state: 'recording',
    startsAt: '2026-06-09T00:00:00.000Z',
    timezone: null,
    recordingGated: true,
    panel: ['janice-wachuka', 'ephraim-ndegwa', 'cecilia-njeri', 'martin-wachira'],
    heroImage: '2026/03/Banner-2-Banner-Landscape-scaled.png',
    featuredOnHome: true,
    featuredInMenu: true,
  },
  {
    slug: 'wealth-built-abroad-protected-in-kenya-webinar',
    state: 'recording',
    startsAt: null,
    timezone: null,
    recordingGated: true,
    panel: ['ephraim-ndegwa', 'cecilia-njeri', 'martin-wachira'],
    featuredInMenu: true,
  },
];

export const WEBINAR_DROP_BLOCKS =
  /^(WEBINAR (FOR|RECORDING)|WHAT YOU.LL WALK AWAY|IT.S HERE|We emailed you|Your Expert Panel|Hear from professionals|Our Clients|Don.t just take|Trusted by Kenyans|Your questions answered|Have a question not answered|Secure Your Legacy|Book an initial consultation|Book your free|July 28|THE PROBLEM WE)/i;
export const WEBINAR_SUMMARY_HEADING = /^What this webinar is really about/i;
export const WEBINAR_AUDIENCE_HEADING = /^Who should attend/i;

export const AWARD = {
  slug: 'legal-insider-2025-litigation-firm-of-the-year',
  name: 'Litigation and Dispute Resolution Firm of the Year, Nairobi',
  awarder: 'Legal Insider',
  year: 2025,
  category: 'Litigation and Dispute Resolution',
  image: '2025/12/Cert-1.webp',
  imageAlt: 'Legal Insider 2025 award certificate for WAREN Law Advocates LLP',
};

export const CLIENT_LOGOS = [
  { name: 'Republic of Kenya coat of arms', file: '2025/12/download-2.png' },
  { name: 'County crest (name to confirm)', file: '2025/12/download-4.jpeg' },
  { name: 'Nairobi City County', file: '2025/12/download-2.jpeg' },
  { name: "Murang'a County", file: '2025/12/download-1.png' },
  { name: 'KETEPA', file: '2025/12/download.jpeg' },
  { name: 'Britam', file: '2025/12/download-3.png' },
  { name: 'Jubilee Insurance', file: '2025/12/download-4.png' },
  { name: 'Crest (name to confirm)', file: '2025/12/download-3.jpeg' },
  { name: 'KEBS', file: '2025/12/kebs-logo-png_seeklogo-280724-1.webp' },
  { name: 'ICEA Lion Group', file: '2025/12/download-6.jpeg' },
  { name: 'Honor', file: '2025/12/download.png' },
  { name: 'Old Mutual', file: '2025/12/download-5.jpeg' },
  { name: 'CHINT', file: '2025/12/download-1.webp' },
  { name: 'Blue globe mark (name to confirm)', file: '2025/12/Screenshot-2025-12-11-120209.webp' },
];

export const SETTINGS = {
  [SETTING_KEYS.firm]: {
    name: 'WAREN Law Advocates LLP',
    tagline: 'Mastery, Nobility, Trust & Solutions',
    description:
      'Legal solutions tailored to individual and corporate needs, from Nairobi, Nakuru and Beijing.',
  },
  [SETTING_KEYS.contact]: {
    phones: ['+254714350932', '+254719278594'],
    email: 'info@warenlaw.com',
    addressLine:
      'Manga House, Suite No. 8 B2, Kiambere Road, Upper Hill, Nairobi · Wilmur House, Room 308, Kenyatta Avenue, Nakuru',
  },
  [SETTING_KEYS.newsletter]: {
    intro: 'Insights on Kenyan law, property and cross-border wealth, sent occasionally.',
  },
  [SETTING_KEYS.whatsApp]: { number: '254719278594', message: null },
  [SETTING_KEYS.socials]: {
    linkedIn: 'https://www.linkedin.com/company/waren-law-advocates-llp',
    facebook: 'https://www.facebook.com/people/WAREN-LAW-Advocates-LLP/61552278663285/',
    instagram: 'https://www.instagram.com/warenlawadvocates/',
    youtube: 'https://www.youtube.com/channel/UCz6UDevugAvWf2gs4H2JHEw',
  },
  [SETTING_KEYS.booking]: {
    url: 'https://bookings.cloud.microsoft/book/WARENLawConsultationsCopy@warenlaw.com/',
  },
  [SETTING_KEYS.tracking]: {
    googleTagManagerId: 'GTM-T58XBX56',
    googleTagId: 'GT-5MRWVKJK',
    metaPixelId: '1808355966500012',
  },
  [SETTING_KEYS.cta]: {
    heading: 'Need legal assistance? We’re here to guide you.',
    text: 'Book a consultation and speak to one of our advocates.',
    bookingLabel: 'Book a consultation',
  },
  [SETTING_KEYS.seo]: {
    titleTemplate: '%s | WAREN Law Advocates LLP',
    description:
      'WAREN Law Advocates LLP is a firm of advocates in Nairobi and Nakuru, with a joint office in Beijing.',
  },
  [SETTING_KEYS.aboutVideo]: { url: null, captionsUrl: null },
  [SETTING_KEYS.pageCopy]: {
    about: {
      heroTitle: 'About WAREN Law',
      heroIntro:
        'A Nairobi law firm advising businesses, institutions and Kenyans at home and abroad.',
      storyTitle: 'Established to provide exceptional legal solutions',
      storyClosing:
        'Today the firm works from Manga House in Upper Hill, Nairobi, from Wilmur House in Nakuru, and from a joint office in Beijing, with partner firms in China and South Korea.',
      filmTitle: 'Meet WAREN Law',
      whyTitle: 'How we work',
      whyPoints: [
        {
          title: 'A new standard of legal practice',
          text: 'Blending experience with innovation for today’s legal landscape.',
        },
        {
          title: 'Client-centred approach',
          text: 'You are guided, supported and informed every step of the way.',
        },
        {
          title: 'Trusted by corporates and individuals',
          text: 'A strong record of professionalism and reliability.',
        },
        {
          title: 'Global outlook',
          text: 'A strong presence in East Africa and trusted partners across the globe.',
        },
      ],
      leadershipTitle: 'Our Partners',
      partnersTitle: 'Working with firms in China and South Korea',
    },
    partners: {
      heroTitle: 'Our International Partners',
      heroIntro: 'Reputable firms we work with to serve clients across borders.',
      introTitle: 'Partner firms in China and South Korea',
      intro:
        'Our partnerships give clients investing between Kenya and Asia access to trusted counsel on both sides, from a joint office in Beijing to firms with branches across mainland China and South Korea.',
      firmNotes: {
        'beijing-jingping-law-firm': 'Reciprocal joint offices in Beijing and Nairobi.',
        'beijing-matrix-law-firm': 'Over a decade of experience in overseas law and investments.',
        'jointide-law-firm': 'More than 20 branches across mainland China and South Korea.',
      },
      signingLabel: 'Signing ceremony · 27 November 2025',
      signingTitle: 'Tripartite cooperation signed in Beijing',
      signingText:
        'WAREN Law signed a cooperation agreement with its partner firms in Beijing, strengthening legal ties between China and Africa.',
      signingInsightSlug:
        'waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing',
    },
    contact: {
      heroIntro: 'Speak to an advocate in Nairobi, Nakuru or online.',
    },
    consultation: {
      heroIntro:
        'Tell us about your matter and we will arrange a consultation in Nairobi, Nakuru or online.',
      steps: [
        {
          title: 'You send your request',
          text: 'Tell us briefly about your matter and which dates suit you.',
        },
        {
          title: 'We review it',
          text: 'Our team reads your request and directs it to the right advocate.',
        },
        {
          title: 'We arrange the consultation',
          text: 'We contact you to confirm a time in Nairobi, Nakuru or by video call.',
        },
      ],
    },
  },
  [SETTING_KEYS.siteVerification]: {
    google: 'psyeUDg2m1msvc8mmzPm6ynF4QMH8CcnRx30ZVh3EnA',
    bing: '2B505C576AFA10A6956AF7677134FC44',
  },
};

export const SETTING_MEDIA: Record<string, { file: string; baseName: string; altText: string }> = {
  [SETTING_KEYS.seo]: {
    file: '2025/11/MOK_5299-scaled-1.webp',
    baseName: 'home-hero-team',
    altText: 'The WAREN Law team together in the firm’s office',
  },
  [SETTING_KEYS.aboutVideo]: {
    file: '2025/11/MOK_5490-scaled-1.webp',
    baseName: 'about-video-poster',
    altText: 'WAREN Law advocates seated together',
  },
};

export const HOME_HERO_IMAGE = {
  fileName: 'nairobi-skyline-hero.webp',
  originalName: 'nairobi-skyline.jpg',
  mimeType: 'image/webp',
  altText: 'Nairobi skyline at sunset, with Mount Kenya and the Kenyan flag',
};

// Not committed (no videos in git): it must already be in UPLOADS_DIR.
export const HOME_HERO_VIDEO = {
  fileName: HERO_VIDEO_FILE,
  originalName: HERO_VIDEO_FILE,
  mimeType: 'video/mp4',
  altText: 'Nairobi from the air',
};

const HERO_CARDS: readonly HeroCard[] = [
  {
    icon: 'briefcase',
    title: 'For Businesses',
    text: 'Corporate, banking, employment and dispute advice for companies, lenders and investors in Kenya.',
    href: ROUTES.root(P.corporate),
  },
  {
    icon: 'home',
    title: 'For Property & Families',
    text: 'Conveyancing, succession and wealth planning to protect land, homes and family assets.',
    href: ROUTES.root(P.property),
  },
  {
    icon: 'globe',
    title: 'For Kenyans Abroad',
    text: 'Support to buy property, plan succession and invest in Kenya from the UK, US, Europe and beyond.',
    href: ROUTES.root(P.wealth),
  },
];

export const HOME_CONTENT = {
  heroCards: HERO_CARDS,
  pageH1: 'WAREN Law Advocates LLP — Advocates in Nairobi, Nakuru and Beijing',
  welcomeTitle: 'Welcome to WAREN Law',
  welcomeBody: [
    paragraph(
      'WAREN Law Advocates LLP was established to provide exceptional legal solutions tailored to both individual and corporate needs. From our offices in Upper Hill, Nairobi and in Nakuru, and our joint office in Beijing, we advise businesses, institutions and Kenyans at home and abroad.',
    ),
    paragraph(
      'We combine experience with innovation, and our clients are guided, supported and informed at every step of their matter.',
    ),
  ],
  welcomeCtaLabel: 'Learn more about us',
  expertiseTitle: 'Areas of Expertise',
  expertiseIntro:
    'Eight practice areas covering the needs of companies, lenders, investors, families and individuals.',
  teamTitle: 'Meet Our Partners',
  teamIntro:
    'Advocates who lead our corporate, property, wealth, litigation and cross-border work.',
  insightsTitle: 'Latest from our advocates',
  ctaTitle: 'Need legal assistance? Speak to an advocate.',
  ctaBody:
    'Tell us about your matter and we will arrange a consultation in Nairobi, Nakuru or online.',
};

export const STATIC_FIXES = [
  "Cecilia Njeri's displayed email now matches her link (cwangeci@warenlaw.com)",
  'WhatsApp numbers stored in international format (254719278594 and 254797899003)',
  'Phone numbers stored once, so +254 714 350 932 no longer dials the second number',
  'LinkedIn company link uses the current waren-law-advocates-llp address',
  'Booking link no longer carries a stray query string',
  'Nairobi map uses zoom 15 and no longer has the P.O. Box in its search',
];

export const EXPECTED_COUNTS = {
  insight: 32,
  'practice area': 8,
  'team member': 20,
  webinar: 3,
  page: 7,
  office: 3,
  partner: 3,
  award: 1,
  'client logo': 14,
  'home content': 1,
  setting: 12,
};

export const IMPORT_NOTES = [
  'Regulatory Services has no insights, because its two posts were among the four dropped',
  'Banking & Finance and Employment & Labour have no insights, as no category maps to them',
  'Banking & Finance has no team member: nobody on the site names it as their practice',
  "Phylis Njane has no office, because the Ruiru branch isn't confirmed",
  'Staff are assigned to the Nairobi office by default, except Florence Wambugu (Nakuru)',
];
