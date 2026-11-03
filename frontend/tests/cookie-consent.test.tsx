import { fireEvent, render, screen } from '@testing-library/react';
import { CookieConsent, CookiePreferencesButton } from '@/components/site/cookie-consent';
import { CONSENT_COOKIE, parseConsent, serialiseConsent } from '@/lib/consent/consent';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.consent;
const tracking = {
  googleTagManagerId: 'GTM-TEST',
  googleTagId: 'GT-TEST',
  metaPixelId: '123',
};

const trackingScripts = () =>
  [...document.querySelectorAll('script[src]')].map((script) => script.getAttribute('src'));

function clearConsent() {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
  document.head.querySelectorAll('script').forEach((script) => script.remove());
  delete window.fbq;
  delete window.gtag;
  delete window.dataLayer;
}

describe('consent cookie', () => {
  it('round-trips a choice', () => {
    const choice = { analytics: true, marketing: false };
    expect(parseConsent(serialiseConsent(choice))).toEqual(choice);
  });

  it('treats invalid values as no choice', () => {
    expect(parseConsent('yes')).toBeNull();
    expect(parseConsent(null)).toBeNull();
  });
});

describe('CookieConsent', () => {
  beforeEach(clearConsent);
  afterEach(clearConsent);

  it('shows the banner and loads no tags before a choice', () => {
    render(<CookieConsent tracking={tracking} />);
    expect(screen.getByRole('button', { name: text.accept })).toBeInTheDocument();
    expect(trackingScripts()).toEqual([]);
    expect(window.dataLayer).toBeUndefined();
  });

  it('loads all tags after accept and hides the banner', () => {
    render(<CookieConsent tracking={tracking} />);
    fireEvent.click(screen.getByRole('button', { name: text.accept }));
    const scripts = trackingScripts().join(' ');
    expect(scripts).toContain('gtm.js?id=GTM-TEST');
    expect(scripts).toContain('gtag/js?id=GT-TEST');
    expect(scripts).toContain('fbevents.js');
    expect(screen.queryByRole('button', { name: text.accept })).not.toBeInTheDocument();
    expect(document.cookie).toContain(`${CONSENT_COOKIE}=v1.1.1`);
  });

  it('loads nothing after reject and remembers the choice', () => {
    render(<CookieConsent tracking={tracking} />);
    fireEvent.click(screen.getByRole('button', { name: text.reject }));
    expect(trackingScripts()).toEqual([]);
    expect(document.cookie).toContain(`${CONSENT_COOKIE}=v1.0.0`);
    expect(screen.queryByRole('button', { name: text.reject })).not.toBeInTheDocument();
  });

  it('applies granular preferences', () => {
    render(<CookieConsent tracking={tracking} />);
    fireEvent.click(screen.getByRole('button', { name: text.preferences }));
    fireEvent.click(screen.getByLabelText(text.analytics));
    fireEvent.click(screen.getByRole('button', { name: text.save }));
    const scripts = trackingScripts().join(' ');
    expect(scripts).toContain('gtm.js');
    expect(scripts).not.toContain('fbevents.js');
  });

  it('loads tags on a later visit from the stored choice', () => {
    document.cookie = `${CONSENT_COOKIE}=v1.0.1; Path=/`;
    render(<CookieConsent tracking={tracking} />);
    expect(trackingScripts().join(' ')).toContain('fbevents.js');
    expect(trackingScripts().join(' ')).not.toContain('gtm.js');
    expect(screen.queryByRole('button', { name: text.accept })).not.toBeInTheDocument();
  });

  it('can be reopened from the footer button', () => {
    document.cookie = `${CONSENT_COOKIE}=v1.0.0; Path=/`;
    render(
      <>
        <CookieConsent tracking={tracking} />
        <CookiePreferencesButton />
      </>,
    );
    fireEvent.click(screen.getByRole('button', { name: text.reopen }));
    expect(screen.getByRole('button', { name: text.save })).toBeInTheDocument();
  });
});
