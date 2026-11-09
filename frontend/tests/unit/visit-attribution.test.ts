import { visitAttribution } from '@/lib/utils/attribution/visit';

describe('visitAttribution', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.pushState({}, '', '/contact-us/?utm_source=newsletter&utm_campaign=October');
  });

  it('reads the tags from the first page of the visit and keeps them on later pages', () => {
    visitAttribution();
    window.history.pushState({}, '', '/book-a-consultation/');
    expect(visitAttribution('Webinar')).toEqual({
      page: '/book-a-consultation/',
      utmSource: 'newsletter',
      utmCampaign: 'October',
      heardAbout: 'Webinar',
    });
  });

  it('stores nothing in a cookie', () => {
    visitAttribution();
    expect(document.cookie).toBe('');
  });
});
