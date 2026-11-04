import { DIRECT_SOURCE, type Attribution, type LeadChannel } from '@waren/shared';

const WWW_PREFIX = /^www\./;
const NEWSLETTER = /^(newsletter|mailpoet|email)$/;
const EVENT = /^(qr|event)/;
const WHATSAPP = /(^|\.)(whatsapp\.com|wa\.me)$|^whatsapp$/;
const SEARCH = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|baidu|brave)\.|^(google|bing)$/;
const SOCIAL =
  /(^|\.)(linkedin|facebook|instagram|twitter|youtube|tiktok|threads)\.|^(t\.co|x\.com|lnkd\.in|fb\.me|linkedin|facebook|instagram|twitter|x|youtube|tiktok)$/;

export function referrerHost(referrer: string | undefined): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace(WWW_PREFIX, '').toLowerCase() || null;
  } catch {
    return null;
  }
}

export function channelFor(source: string): LeadChannel {
  if (source === DIRECT_SOURCE) return 'Direct';
  if (NEWSLETTER.test(source)) return 'Newsletter';
  if (EVENT.test(source)) return 'Event/QR';
  if (WHATSAPP.test(source)) return 'WhatsApp';
  if (SEARCH.test(source)) return 'Search';
  if (SOCIAL.test(source)) return 'Social';
  return 'Referral';
}

export interface ResolvedAttribution {
  page: string;
  source: string;
  campaign: string | null;
  channel: LeadChannel;
  heardAbout: string | null;
}

export function resolveAttribution(input: Attribution): ResolvedAttribution {
  const source =
    input.utmSource?.trim().toLowerCase() || referrerHost(input.referrer) || DIRECT_SOURCE;
  return {
    page: input.page,
    source,
    campaign: input.utmCampaign?.trim() || null,
    channel: channelFor(source),
    heardAbout: input.heardAbout ?? null,
  };
}
