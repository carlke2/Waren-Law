import { fireEvent, render, screen, within } from '@testing-library/react';
import { SiteNavigation } from '@/components/site/site-navigation';
import { dictionary } from '@/lib/dictionary';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const { nav } = dictionary;
const props = {
  practiceAreas: [{ label: 'Mining', href: '/mining/' }],
  bookingUrl: 'https://book.example.test',
  bookingLabel: 'Book',
};

describe('mobile menu', () => {
  const open = () => {
    render(<SiteNavigation {...props} />);
    const opener = screen.getByRole('button', { name: nav.openMenu });
    opener.focus();
    fireEvent.click(opener);
    return { opener, dialog: screen.getByRole('dialog', { name: nav.menu }) };
  };

  it('moves focus into the dialog when opened', () => {
    const { dialog } = open();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it('closes on Escape and returns focus to the opener', () => {
    const { opener, dialog } = open();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(opener);
  });

  it('traps Tab inside the dialog', () => {
    const { dialog } = open();
    const links = within(dialog).getAllByRole('link');
    const last = links.at(-1) as HTMLElement;
    last.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(document.activeElement).toBe(
      within(dialog).getByRole('button', { name: nav.closeMenu }),
    );
  });
});

describe('expertise dropdown', () => {
  it('opens by button and closes on Escape', () => {
    render(<SiteNavigation {...props} />);
    const primary = screen.getByRole('navigation', { name: nav.primary });
    const button = within(primary).getByRole('button', { name: nav.expertise });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(within(primary).getByRole('link', { name: 'Mining' })).toBeInTheDocument();
    fireEvent.keyDown(button, { key: 'Escape' });
    expect(within(primary).queryByRole('link', { name: 'Mining' })).not.toBeInTheDocument();
  });
});
