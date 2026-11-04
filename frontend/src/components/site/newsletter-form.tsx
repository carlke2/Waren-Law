'use client';

import { API_PREFIX, API_ROUTES, ROUTES } from '@waren/shared/constants';
import { useId, useState, type FormEvent } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/dictionary';
import { cx } from '@/lib/utils/cx';

const text = dictionary.newsletter;
const ENDPOINT = `/${API_PREFIX}/${API_ROUTES.newsletter}/`;
const HONEYPOT_FIELD = 'website';
const TOO_MANY_REQUESTS = 429;

type Status = 'idle' | 'sending' | 'sent' | 'invalid' | 'failed' | 'limited';

const MESSAGES: Partial<Record<Status, string>> = {
  sending: text.sending,
  sent: text.success,
  invalid: text.invalid,
  failed: text.failed,
  limited: text.tooMany,
};

async function submit(email: string, website: string): Promise<Status> {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, website }),
    });
    if (response.ok) return 'sent';
    return response.status === TOO_MANY_REQUESTS ? 'limited' : 'failed';
  } catch {
    return 'failed';
  }
}

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const emailId = useId();
  const statusId = useId();
  const message = MESSAGES[status];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email'));
    const website = String(data.get(HONEYPOT_FIELD));
    // Loaded on submit, so the schema library isn't part of the first page load.
    const { newsletterFormSchema } = await import('@waren/shared');
    if (!newsletterFormSchema.safeParse({ email, website }).success) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    const next = await submit(email, website);
    setStatus(next);
    if (next === 'sent') form.reset();
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor={emailId} className="text-meta text-on-brand">
        {text.email}
      </label>
      <div className="flex">
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={text.placeholder}
          aria-invalid={status === 'invalid'}
          aria-describedby={statusId}
          className="h-12 min-w-0 flex-auto border border-border-on-brand bg-brand-soft px-3.5 text-on-brand placeholder:text-on-brand-muted"
        />
        <button
          type="submit"
          aria-label={text.submit}
          disabled={status === 'sending'}
          className="h-12 w-13 shrink-0 bg-accent text-arrow font-bold text-on-accent"
        >
          {text.submitIcon}
        </button>
      </div>
      <p className="text-meta text-on-brand-muted">
        {text.privacyNote}{' '}
        <SiteLink href={ROUTES.privacy} className="underline hover:text-on-brand">
          {text.privacyLink}
        </SiteLink>
      </p>
      <div className="sr-only" aria-hidden="true">
        <label>
          {text.honeypot}
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p
        id={statusId}
        role="status"
        className={cx(
          'text-meta empty:hidden',
          status === 'sent' && 'text-success-on-brand',
          (status === 'invalid' || status === 'failed' || status === 'limited') &&
            'text-error-on-brand',
        )}
      >
        {message}
      </p>
    </form>
  );
}
