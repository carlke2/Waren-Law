import { channelFor, referrerHost, resolveAttribution } from './attribution.js';

const PAGE = '/contact-us/';

describe('resolveAttribution', () => {
  it('reads a newsletter link as Newsletter with its issue', () => {
    expect(
      resolveAttribution({ page: PAGE, utmSource: 'newsletter', utmCampaign: 'October 2026' }),
    ).toEqual({
      page: PAGE,
      source: 'newsletter',
      campaign: 'October 2026',
      channel: 'Newsletter',
      heardAbout: null,
    });
  });

  it('reads Google as Search and stores only the host name', () => {
    const result = resolveAttribution({
      page: PAGE,
      referrer: 'https://www.google.com/search?q=private+details',
    });
    expect(result.source).toBe('google.com');
    expect(result.channel).toBe('Search');
    expect(JSON.stringify(result)).not.toContain('private');
  });

  it('reads LinkedIn as Social', () => {
    const result = resolveAttribution({ page: PAGE, referrer: 'https://www.linkedin.com/feed/' });
    expect(result.channel).toBe('Social');
  });

  it('reads no referrer as Direct', () => {
    const result = resolveAttribution({ page: PAGE });
    expect(result.source).toBe('direct');
    expect(result.channel).toBe('Direct');
  });

  it('prefers utm_source over the referrer', () => {
    const result = resolveAttribution({
      page: PAGE,
      utmSource: 'LinkedIn',
      referrer: 'https://google.com/',
    });
    expect(result.source).toBe('linkedin');
    expect(result.channel).toBe('Social');
  });

  it('keeps what the person says they heard about us', () => {
    expect(resolveAttribution({ page: PAGE, heardAbout: 'Webinar' }).heardAbout).toBe('Webinar');
  });
});

describe('channelFor', () => {
  it.each([
    ['web.whatsapp.com', 'WhatsApp'],
    ['wa.me', 'WhatsApp'],
    ['qr-office-poster', 'Event/QR'],
    ['t.co', 'Social'],
    ['bing.com', 'Search'],
    ['lawsociety.example', 'Referral'],
  ])('maps %s to %s', (source, channel) => {
    expect(channelFor(source)).toBe(channel);
  });
});

describe('referrerHost', () => {
  it('ignores a value that is not a URL', () => {
    expect(referrerHost('not a url')).toBeNull();
  });
});
