export const CONTENT_STATUSES = ['draft', 'published', 'archived'] as const;
export const LEGAL_REVIEW_STATUSES = ['needs_advocate_review', 'approved'] as const;
export const MEMBER_TYPES = ['partner', 'advocate', 'consultant', 'staff'] as const;
export const OFFICE_TYPES = ['head', 'branch', 'joint'] as const;
export const WEBINAR_STATES = ['upcoming', 'recording', 'past'] as const;
export const SLUG_TYPES = ['page', 'practice_area', 'insight', 'webinar'] as const;
export const SUBSCRIBER_SOURCES = ['newsletter', 'webinar'] as const;
export const CHANGE_ACTIONS = [
  'create',
  'update',
  'delete',
  'publish',
  'unpublish',
  'restore',
] as const;
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const HOME_PAGE_SLUG = 'home';
export const PAGE_TEMPLATES = ['home', 'about', 'partners', 'contact', 'legal'] as const;
export const BLOCK_DOCUMENT_VERSION = 1;
export const HEADING_LEVELS = [2, 3, 4] as const;
export const INLINE_MARKS = ['bold', 'italic', 'underline'] as const;
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;
export const SETTING_KEYS = {
  firm: 'firm',
  contact: 'contact',
  whatsApp: 'whatsApp',
  socials: 'socials',
  booking: 'booking',
  tracking: 'tracking',
  siteVerification: 'siteVerification',
  cta: 'cta',
  homeHero: 'homeHero',
  aboutVideo: 'aboutVideo',
} as const;
