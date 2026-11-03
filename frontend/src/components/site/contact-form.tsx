'use client';

import { contactFormSchema, type ContactForm as ContactFormValues } from '@waren/shared';
import Link from 'next/link';
import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
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

export function ContactFormFields() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

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

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setErrors(validate(values));
  };

  const field = (name: FieldName) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: update,
    onBlur: check,
  });

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
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
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="text-small text-ink-muted">
        {text.privacyNotice}{' '}
        <Link href={ROUTES.privacy} className="text-gold-700 underline underline-offset-4">
          {text.privacyLink}
        </Link>
      </p>
      <div>
        <Button type="submit" size="lg" disabled aria-describedby="contact-form-status">
          {text.submit}
        </Button>
        <p id="contact-form-status" className="mt-2 text-small text-ink-muted">
          {text.notYetAvailable}
        </p>
      </div>
    </form>
  );
}
