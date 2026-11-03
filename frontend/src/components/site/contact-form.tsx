'use client';

import {
  API_PREFIX,
  API_ROUTES,
  contactFormSchema,
  type ContactForm as ContactFormValues,
} from '@waren/shared';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from 'react';
import { ROUTES } from '@waren/shared/constants';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/form';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.contactForm;

type FieldName = keyof Omit<ContactFormValues, 'website'>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Record<FieldName, string> = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
};

function validate(values: Record<FieldName, string>): Errors {
  const result = contactFormSchema.safeParse({
    ...values,
    phone: values.phone || undefined,
  });
  if (result.success) return {};
  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as FieldName;
    errors[field] ??= text.errors[field];
  }
  return errors;
}

const CONTACT_ENDPOINT = `/${API_PREFIX}/${API_ROUTES.contact}/`;
const HONEYPOT_FIELD = 'website';
const TOO_MANY_REQUESTS = 429;

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited';

export function ContactFormFields() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === 'sent') statusRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (failedAttempts)
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [failedAttempts]);

  const update = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = target.name as FieldName;
    const next = { ...values, [name]: target.value };
    setValues(next);
    if (errors[name]) setErrors({ ...errors, [name]: validate(next)[name] });
  };

  const check = ({ target }: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = target.name as FieldName;
    setErrors({ ...errors, [name]: validate(values)[name] });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      setFailedAttempts((count) => count + 1);
      return;
    }
    setStatus('sending');
    const website = new FormData(event.currentTarget).get(HONEYPOT_FIELD);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: values.phone || undefined,
          website: typeof website === 'string' ? website : undefined,
          source: window.location.pathname,
        }),
      });
      setStatus(
        !response.ok ? (response.status === TOO_MANY_REQUESTS ? 'limited' : 'error') : 'sent',
      );
    } catch {
      setStatus('error');
    }
  };

  const field = (name: FieldName) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: update,
    onBlur: check,
  });

  if (status === 'sent') {
    return (
      <p
        ref={statusRef}
        role="status"
        tabIndex={-1}
        className="rounded-md border border-gold-700 bg-surface p-4 text-ink"
      >
        {text.success}
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={text.firstName}
          autoComplete="given-name"
          required
          requiredMark={dictionary.common.required}
          {...field('firstName')}
        />
        <Input
          label={text.lastName}
          autoComplete="family-name"
          required
          requiredMark={dictionary.common.required}
          {...field('lastName')}
        />
      </div>
      <Input
        label={text.email}
        type="email"
        autoComplete="email"
        required
        requiredMark={dictionary.common.required}
        {...field('email')}
      />
      <Input label={text.phone} type="tel" autoComplete="tel" {...field('phone')} />
      <Textarea
        label={text.message}
        rows={6}
        required
        requiredMark={dictionary.common.required}
        {...field('message')}
      />
      <div className="fixed left-full top-full" aria-hidden="true">
        <label>
          {text.honeypot}
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="text-small text-ink-muted">
        {text.privacyNotice}{' '}
        <Link href={ROUTES.privacy} className="text-gold-700 underline underline-offset-4">
          {text.privacyLink}
        </Link>
      </p>
      <div>
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? text.sending : text.submit}
        </Button>
        {status === 'error' || status === 'limited' ? (
          <p role="alert" className="mt-2 text-small text-danger">
            {status === 'limited' ? text.tooMany : text.failed}
          </p>
        ) : null}
      </div>
    </form>
  );
}
