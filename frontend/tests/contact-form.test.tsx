import { fireEvent, render, screen } from '@testing-library/react';
import { ContactFormFields } from '@/components/site/contact-form';
import { MapEmbed } from '@/components/site/map-embed';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.contactForm;

describe('ContactFormFields', () => {
  it('keeps submit disabled and explains why', () => {
    render(<ContactFormFields />);
    const submit = screen.getByRole('button', { name: text.submit });
    expect(submit).toBeDisabled();
    expect(submit).toHaveAccessibleDescription(text.notYetAvailable);
  });

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

describe('MapEmbed', () => {
  it('sends no request to Google until asked', () => {
    const { container } = render(<MapEmbed url="https://maps.test/embed" officeName="Nakuru" />);
    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: dictionary.contact.showMap('Nakuru') }));
    expect(container.querySelector('iframe')).toHaveAttribute('src', 'https://maps.test/embed');
  });
});
