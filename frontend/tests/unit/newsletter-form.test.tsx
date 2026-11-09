import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterForm } from '@/components/site/newsletter-form';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.newsletter;

function submitWith(email: string) {
  fireEvent.change(screen.getByLabelText(text.email), { target: { value: email } });
  fireEvent.click(screen.getByRole('button', { name: text.submit }));
}

describe('NewsletterForm', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    render(<NewsletterForm />);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('rejects a bad address without calling the API', async () => {
    submitWith('nope');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(text.invalid));
    expect(screen.getByLabelText(text.email)).toHaveAttribute('aria-invalid', 'true');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the address and clears the form on success', async () => {
    fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));
    submitWith('asha@example.test');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(text.success));
    expect(fetchMock.mock.calls[0]?.[0]).toBe('/api/v1/newsletter/');
    expect(JSON.parse(fetchMock.mock.calls[0]?.[1].body)).toMatchObject({
      email: 'asha@example.test',
    });
    expect(screen.getByLabelText(text.email)).toHaveValue('');
  });

  it.each([
    ['a rate limit', () => Promise.resolve(new Response('{}', { status: 429 })), text.tooMany],
    ['a server error', () => Promise.resolve(new Response('{}', { status: 500 })), text.failed],
    ['a network failure', () => Promise.reject(new Error('offline')), text.failed],
  ])('explains %s', async (_name, response, message) => {
    fetchMock.mockImplementation(response);
    submitWith('asha@example.test');
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(message));
  });
});
