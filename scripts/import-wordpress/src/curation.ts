import type {
  MemberType,
  OfficeType,
  WebinarState,
} from '../../../backend/prisma/generated/client.js';
import { SETTING_KEYS } from '@waren/shared';

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

export const BANNED_CLAIMS = [
  /\[Client Name\]/i,
  /\[Financial Institution\]/i,
  /98% Recovery/i,
  /500\+ Clients/i,
  /20\+ Jurisdictions/i,
  /15\+? Years/i,
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
}

export const PRACTICE_AREAS: readonly PracticeAreaEntry[] = [
  {
    slug: 'corporate-debt-recovery',
    name: 'Debt Solutions, Recovery & Asset Tracing',
    categorySlug: 'debt-recovery',
  },
  {
    slug: 'wealth-management-investments',
    name: 'Wealth Management & Investments',
    categorySlug: 'wealth-management',
  },
  { slug: 'employment-labour-law', name: 'Employment & Labour Law', categorySlug: null },
  {
    slug: 'corporate-commercial-practice',
    name: 'Corporate & Commercial Practice',
    categorySlug: 'investment-and-business-law',
  },
  {
    slug: 'litigation-dispute-resolution-international-arbitration',
    name: 'Litigation, Dispute Resolution & International Arbitration',
    categorySlug: 'dispute-resolution',
  },
  { slug: 'banking-finance-law', name: 'Banking & Finance Law', categorySlug: null },
  { slug: 'mining-energy-law', name: 'Mining & Energy Law', categorySlug: 'mining-and-energy-law' },
  {
    slug: 'real-estate-conveyancing-land-law',
    name: 'Real Estate, Conveyancing & Land Law',
    categorySlug: 'conveyancing-and-commercial-services',
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
  email?: string;
  phone?: string;
  whatsApp?: string;
  linkedInUrl?: string;
  bookingUrl?: string;
  profilePageSlug?: string;
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
  },
  {
    name: 'Phylis Njane',
    memberType: 'partner',
    isAdvocate: true,
    officeSlug: null,
    practiceAreas: [P.litigation, P.employment],
  },
  {
    name: 'Martin Wachira',
    memberType: 'partner',
    isAdvocate: true,
    officeSlug: NAIROBI,
    practiceAreas: [P.corporate, P.wealth],
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
    roleTitle: 'Associate Advocate',
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
  wordpressSlug: string;
  title: string;
  template: string;
  path: string;
  dropBlocks?: RegExp;
  keepOnly?: RegExp;
}

export const PAGES: readonly PageEntry[] = [
  {
    slug: 'home',
    wordpressSlug: 'home',
    title: 'Home',
    template: 'home',
    path: '/',
    dropBlocks:
      /^(Some of the Brands|Services$|What We Handle|Debt Solutions, Recovery|Corporate & Commercial Practice|Wealth Management & Investments|Recent insights|View More|\d\d\.$)/,
  },
  {
    slug: 'about-us',
    wordpressSlug: 'about-us',
    title: 'About Us',
    template: 'about',
    path: '/about-us/',
    dropBlocks: /^(About Us$|Get to know Us|Recognized to be the best|Awards won)/,
  },
  {
    slug: 'our-partners',
    wordpressSlug: 'our-partners',
    title: 'Our Partners',
    template: 'partners',
    path: '/our-partners/',
    dropBlocks:
      /^(Our Partners$|Meet Our abled partners|Partners$|jingping law$|matrix law$|Jointide$|Beijing Jingping Law Firm hosts|Matrix brings|Jointide Law Firm boasts)/,
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
];

export interface WebinarEntry {
  slug: string;
  state: WebinarState;
  startsAt: string | null;
  timezone: string | null;
  recordingGated: boolean;
  panel: readonly string[];
  heroImage?: string;
}

export const WEBINARS: readonly WebinarEntry[] = [
  {
    slug: 'trusts-taxes-protecting-wealth-across-borders',
    state: 'past',
    startsAt: '2026-07-29T02:00:00.000Z',
    timezone: 'America/Los_Angeles',
    recordingGated: false,
    panel: ['janice-wachuka', 'ephraim-ndegwa', 'martin-wachira'],
  },
  {
    slug: 'wealth-protection-plan-for-kenyans-abroad-webinar',
    state: 'recording',
    startsAt: '2026-06-09T00:00:00.000Z',
    timezone: null,
    recordingGated: true,
    panel: ['janice-wachuka', 'ephraim-ndegwa', 'cecilia-njeri', 'martin-wachira'],
    heroImage: '2026/03/Banner-2-Banner-Landscape-scaled.png',
  },
  {
    slug: 'wealth-built-abroad-protected-in-kenya-webinar',
    state: 'recording',
    startsAt: null,
    timezone: null,
    recordingGated: true,
    panel: ['ephraim-ndegwa', 'cecilia-njeri', 'martin-wachira'],
  },
];

export const WEBINAR_DROP_BLOCKS =
  /^(WEBINAR (FOR|RECORDING)|IT.S HERE|We emailed you|Your Expert Panel|Hear from professionals|Our Clients|Don.t just take|Trusted by Kenyans|Your questions answered|Have a question not answered|Secure Your Legacy|Book an initial consultation|Book your free|July 28|THE PROBLEM WE)/i;
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
  },
  [SETTING_KEYS.contact]: {
    phones: ['+254714350932', '+254719278594'],
    email: 'info@warenlaw.com',
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
  [SETTING_KEYS.siteVerification]: {
    google: 'psyeUDg2m1msvc8mmzPm6ynF4QMH8CcnRx30ZVh3EnA',
    bing: '2B505C576AFA10A6956AF7677134FC44',
  },
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
  page: 5,
  office: 3,
  partner: 3,
  award: 1,
  'client logo': 14,
};

export const IMPORT_NOTES = [
  'Regulatory Services has no insights, because its two posts were among the four dropped',
  'Banking & Finance and Employment & Labour have no insights, as no category maps to them',
  'Banking & Finance has no team member: nobody on the site names it as their practice',
  "Phylis Njane has no office, because the Ruiru branch isn't confirmed",
  'Staff are assigned to the Nairobi office by default, except Florence Wambugu (Nakuru)',
];
