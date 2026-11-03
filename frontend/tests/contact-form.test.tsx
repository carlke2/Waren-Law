import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContactFormFields } from '@/components/site/contact-form';
import { MapEmbed } from '@/components/site/map-embed';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.contactForm;

describe('ContactFormFields', () => {
  it('shows a field error on blur and clears it once fixed', () => {
    render(<ContactFormFields />);
    const email = screen.getByLabelText(new RegExp(text.email));
    fireEvent.change(email, { target: { value: 'not-an-email' } });
    fireEvent.blur(email);
    expect(screen.getByText(text.errors.email)).toBeInTheDocument();
    fireEvent.change(email, { target: { value: 'a@example.test' } });
    expect(screen.queryByText(text.errors.email)).not.toBeInTheDocument();
  });

  it('allows the phone number to be empty', () => {
    render(<ContactFormFields />);
    const phone = screen.getByLabelText(text.phone);
    fireEvent.blur(phone);
    expect(screen.queryByText(text.errors.phone)).not.toBeInTheDocument();
  });

  it('includes a hidden honeypot and a privacy notice', () => {
    const { container } = render(<ContactFormFields />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.getByRole('link', { name: text.privacyLink })).toHaveAttribute(
      'href',
      '/privacy-policy/',
    );
  });
});

describe('ContactFormFields submission', () => {
  const fill = () => {
    fireEvent.change(screen.getByLabelText(new RegExp(text.firstName)), { target: { value: 'A' } });
    fireEvent.change(screen.getByLabelText(new RegExp(text.lastName)), { target: { value: 'B' } });
    fireEvent.change(screen.getByLabelText(new RegExp(text.email)), {
      target: { value: 'a@example.test' },
    });
    fireEvent.change(screen.getByLabelText(new RegExp(text.message)), { target: { value: 'Hi' } });
  };
  const submit = () => fireEvent.click(screen.getByRole('button', { name: text.submit }));

  afterEach(() => vi.unstubAllGlobals());

  it('blocks an invalid form, sends nothing, and focuses the first error', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactFormFields />);
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(text.errors.firstName)).toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByLabelText(new RegExp(text.firstName)));
  });

  it('posts the form without a page reload and shows success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactFormFields />);
    fill();
    submit();
    expect(await screen.findByRole('status')).toHaveTextContent(text.success);
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('/api/v1/contact/');
    expect(JSON.parse(init.body)).toMatchObject({
      firstName: 'A',
      email: 'a@example.test',
      source: window.location.pathname,
      website: '',
    });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('status')));
  });

  it('keeps what was typed and shows an error when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<ContactFormFields />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent(text.failed);
    expect(screen.getByLabelText(new RegExp(text.message))).toHaveValue('Hi');
  });

  it('explains the rate limit', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    render(<ContactFormFields />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent(text.tooMany);
  });
});

describe('MapEmbed', () => {
  it('sends no request to Google until asked', () => {
    const { container } = render(<MapEmbed url="https://maps.test/embed" officeName="Nakuru" />);
    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: dictionary.contact.showMap('Nakuru') }));
    expect(container.querySelector('iframe')).toHaveAttribute('src', 'https://maps.test/embed');
  });
});
