'use client';

import { API_PREFIX, API_ROUTES, HEARD_ABOUT_OPTIONS, ROUTES } from '@waren/shared/constants';
import { useId, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input, inputClass } from '@/components/ui/input';
import { SiteLink } from '@/components/ui/site-link';
import { visitAttribution } from '@/lib/utils/attribution/visit';
import { dictionary } from '@/lib/utils/dictionary';
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

async function submit(email: string, website: string, heardAbout: string): Promise<Status> {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, website, ...visitAttribution(heardAbout) }),
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
  const heardAboutId = useId();
  const message = MESSAGES[status];
  const invalid = status === 'invalid';
  const sending = status === 'sending';

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
    const next = await submit(email, website, String(data.get('heardAbout') ?? ''));
    setStatus(next);
    if (next === 'sent') form.reset();
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-2">
      <Field data-invalid={invalid || undefined} data-disabled={sending || undefined}>
        <FieldLabel htmlFor={emailId}>{text.email}</FieldLabel>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={text.placeholder}
            disabled={sending}
            aria-invalid={invalid || undefined}
            aria-describedby={statusId}
          />
          <Button type="submit" variant="blue" disabled={sending} className="w-full sm:w-auto">
            {text.submit}
          </Button>
        </div>
      </Field>
      <Field>
        <FieldLabel htmlFor={heardAboutId}>{dictionary.forms.heardAbout}</FieldLabel>
        <select
          id={heardAboutId}
          name="heardAbout"
          defaultValue=""
          disabled={sending}
          className={inputClass()}
        >
          <option value="">{dictionary.forms.choose}</option>
          {HEARD_ABOUT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <FieldDescription>
        {text.privacyNote}{' '}
        <SiteLink href={ROUTES.privacy} className="text-team-accent underline hover:text-brand">
          {text.privacyLink}
        </SiteLink>
      </FieldDescription>
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
          status === 'sent' && 'text-success',
          (status === 'invalid' || status === 'failed' || status === 'limited') && 'text-error',
        )}
      >
        {message}
      </p>
    </form>
  );
}
