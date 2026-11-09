import { act, fireEvent, render, screen } from '@testing-library/react';
import { CookieConsent, CookiePreferencesButton } from '@/components/site/cookie-consent';
import { CONSENT_COOKIE } from '@/lib/utils/consent/consent';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.consent;
const tracking = { googleTagManagerId: 'GTM-TEST', googleTagId: null, metaPixelId: 'PIXEL' };

function clearConsent() {
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
}

const scriptSources = () =>
  [...document.querySelectorAll<HTMLScriptElement>('script')].map(({ src }) => src);

describe('CookieConsent', () => {
  beforeEach(() => {
    clearConsent();
    document.head.innerHTML = '';
  });
  afterEach(clearConsent);

  it('asks first and loads no tags', () => {
    render(<CookieConsent tracking={tracking} />);
    expect(screen.getByRole('button', { name: text.accept })).toBeVisible();
    expect(scriptSources()).toEqual([]);
  });

  it('gives Accept and Reject the same styling', () => {
    render(<CookieConsent tracking={tracking} />);
    expect(screen.getByRole('button', { name: text.accept }).className).toBe(
      screen.getByRole('button', { name: text.reject }).className,
    );
  });

  it('loads tags only after Accept, and hides itself', () => {
    render(<CookieConsent tracking={tracking} />);
    fireEvent.click(screen.getByRole('button', { name: text.accept }));
    expect(scriptSources().some((src) => src.includes('googletagmanager'))).toBe(true);
    expect(scriptSources().some((src) => src.includes('facebook'))).toBe(true);
    expect(screen.queryByRole('button', { name: text.accept })).toBeNull();
  });

  it('remembers Reject and loads no tags', () => {
    render(<CookieConsent tracking={tracking} />);
    fireEvent.click(screen.getByRole('button', { name: text.reject }));
    expect(document.cookie).toContain(`${CONSENT_COOKIE}=v1.0.0`);
    expect(scriptSources()).toEqual([]);
  });

  it('can save a single choice from Preferences', () => {
    render(<CookieConsent tracking={tracking} />);
    fireEvent.click(screen.getByRole('button', { name: text.preferences }));
    fireEvent.click(screen.getByRole('checkbox', { name: text.marketing }));
    fireEvent.click(screen.getByRole('button', { name: text.save }));
    expect(document.cookie).toContain(`${CONSENT_COOKIE}=v1.0.1`);
    expect(scriptSources().some((src) => src.includes('googletagmanager'))).toBe(false);
  });

  it('reopens from the footer button', () => {
    document.cookie = `${CONSENT_COOKIE}=v1.0.0; Path=/`;
    render(
      <>
        <CookieConsent tracking={tracking} />
        <CookiePreferencesButton />
      </>,
    );
    expect(screen.queryByRole('button', { name: text.accept })).toBeNull();
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: text.reopen }));
    });
    expect(screen.getByRole('button', { name: text.accept })).toBeVisible();
  });
});
