import type { WebinarDetail } from '@waren/shared';
import { render, screen } from '@testing-library/react';
import { WebinarAction } from '@/components/site/webinar-action';
import { featuredWebinar } from '@/lib/content/webinars';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.webinars;
const webinar = (overrides: Partial<WebinarDetail>) =>
  ({ state: 'past', registrationUrl: null, ...overrides }) as WebinarDetail;

describe('WebinarAction', () => {
  it('links to registration when upcoming', () => {
    render(
      <WebinarAction
        webinar={webinar({ state: 'upcoming', registrationUrl: 'https://zoom.test/r' })}
      />,
    );
    expect(screen.getByRole('link', { name: text.register })).toHaveAttribute(
      'href',
      'https://zoom.test/r',
    );
  });

  it('says the recording is coming soon, with no form yet', () => {
    const { container } = render(<WebinarAction webinar={webinar({ state: 'recording' })} />);
    expect(screen.getByText(text.recordingAvailableSoon)).toBeInTheDocument();
    expect(container.querySelector('form, input')).toBeNull();
  });

  it('offers no action for a past webinar', () => {
    const { container } = render(<WebinarAction webinar={webinar({ state: 'past' })} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('featuredWebinar', () => {
  it('prefers an upcoming webinar, otherwise the newest', () => {
    const past = webinar({ slug: 'old', state: 'past' });
    const soon = webinar({ slug: 'soon', state: 'upcoming' });
    expect(featuredWebinar([past, soon])?.slug).toBe('soon');
    expect(featuredWebinar([past])?.slug).toBe('old');
    expect(featuredWebinar([])).toBeUndefined();
  });
});
