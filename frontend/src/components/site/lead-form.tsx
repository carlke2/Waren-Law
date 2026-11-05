'use client';

import {
  API_PREFIX,
  API_ROUTES,
  CLIENT_TYPES,
  COUNTRIES,
  HEARD_ABOUT_OPTIONS,
  MEETING_OPTIONS,
  ROUTES,
} from '@waren/shared/constants';
import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input, inputClass } from '@/components/ui/input';
import { SiteLink } from '@/components/ui/site-link';
import { Textarea } from '@/components/ui/textarea';
import { visitAttribution } from '@/lib/attribution/visit';
import { dictionary } from '@/lib/dictionary';
import { cx } from '@/lib/utils/cx';

const text = dictionary.leadForm;
const HONEYPOT_FIELD = 'website';
const TOO_MANY_REQUESTS = 429;

type FormName = 'contact' | 'consultation' | 'recording';
type FieldName = keyof typeof text.labels;
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'limited' | 'invalid';

interface FormField {
  name: FieldName;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  options?: readonly string[];
  required?: boolean;
  autoComplete?: string;
  wide?: boolean;
}

const NAME: FormField = { name: 'name', type: 'text', required: true, autoComplete: 'name' };
const EMAIL: FormField = { name: 'email', type: 'email', required: true, autoComplete: 'email' };
const COUNTRY: FormField = {
  name: 'country',
  type: 'select',
  options: COUNTRIES,
  required: true,
  autoComplete: 'country-name',
};
const HEARD_ABOUT: FormField = {
  name: 'heardAbout',
  type: 'select',
  options: HEARD_ABOUT_OPTIONS,
  wide: true,
};

function fieldsFor(form: FormName, practiceAreas: readonly string[]): FormField[] {
  switch (form) {
    case 'contact':
      return [
        NAME,
        EMAIL,
        { name: 'phone', type: 'tel', autoComplete: 'tel' },
        COUNTRY,
        { name: 'message', type: 'textarea', required: true, wide: true },
        HEARD_ABOUT,
      ];
    case 'consultation':
      return [
        NAME,
        EMAIL,
        { name: 'phone', type: 'tel', required: true, autoComplete: 'tel' },
        COUNTRY,
        { name: 'practiceArea', type: 'select', options: practiceAreas, required: true },
        { name: 'clientType', type: 'select', options: CLIENT_TYPES, required: true },
        { name: 'preferredMeeting', type: 'select', options: MEETING_OPTIONS, required: true },
        { name: 'preferredDates', type: 'text', required: true },
        { name: 'summary', type: 'textarea', required: true, wide: true },
        HEARD_ABOUT,
      ];
    case 'recording':
      return [NAME, EMAIL, HEARD_ABOUT];
  }
}

const ENDPOINTS: Record<FormName, string> = {
  contact: API_ROUTES.contact,
  consultation: API_ROUTES.consultation,
  recording: API_ROUTES.recordingRequests,
};

const MESSAGES: Partial<Record<Status, string>> = {
  sending: text.sending,
  failed: text.failed,
  limited: text.tooMany,
  invalid: text.invalid,
};

async function schemaFor(form: FormName) {
  // Loaded on submit, so the schema library isn't part of the first page load.
  const shared = await import('@waren/shared');
  const schemas = {
    contact: shared.contactFormSchema,
    consultation: shared.consultationFormSchema,
    recording: shared.recordingFormSchema,
  };
  return schemas[form];
}

function FieldControl({
  field,
  error,
  submit,
}: {
  field: FormField;
  error: string | undefined;
  submit?: ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: field.name,
    required: field.required,
    autoComplete: field.autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  };
  return (
    <Field
      className={cx('min-w-0', field.wide && 'col-span-full')}
      data-invalid={error ? true : undefined}
    >
      <FieldLabel htmlFor={id}>{text.labels[field.name]}</FieldLabel>
      {field.type === 'textarea' ? (
        <Textarea rows={5} {...shared} />
      ) : field.type === 'select' ? (
        <select defaultValue="" className={inputClass()} {...shared}>
          <option value="">{dictionary.forms.choose}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <Input type={field.type} {...shared} />
      )}
      <FieldError id={errorId}>{error}</FieldError>
      {submit}
    </Field>
  );
}

interface LeadFormProps {
  form: FormName;
  practiceAreas?: readonly string[];
  submitLabel: string;
}

export function LeadForm({ form, practiceAreas = [], submitLabel }: LeadFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const fields = fieldsFor(form, practiceAreas);
  const notes = fields.filter((field) => field.type !== 'textarea');
  const messages = fields.filter((field) => field.type === 'textarea');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const element = event.currentTarget;
    const values = Object.fromEntries(new FormData(element)) as Record<string, string>;
    const { heardAbout = '', phone, ...rest } = values;
    const candidate = { ...rest, ...(phone ? { phone } : {}) };
    const parsed = (await schemaFor(form)).safeParse(candidate);
    if (!parsed.success) {
      const found: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const name = issue.path[0] as FieldName;
        found[name] = text.errors[name as keyof typeof text.errors] ?? text.invalid;
      }
      setErrors(found);
      setStatus('invalid');
      return;
    }
    setErrors({});
    setStatus('sending');
    try {
      const response = await fetch(`/${API_PREFIX}/${ENDPOINTS[form]}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...candidate, ...visitAttribution(heardAbout) }),
      });
      if (response.ok) {
        setStatus('sent');
        element.reset();
      } else {
        setStatus(response.status === TOO_MANY_REQUESTS ? 'limited' : 'failed');
      }
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <p role="status" className="border-l-2 border-success pl-5 text-intro text-success">
        {text.success}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-auto-field gap-5">
      {notes.map((field) => (
        <FieldControl key={field.name} field={field} error={errors[field.name]} />
      ))}
      <div className="sr-only" aria-hidden="true">
        <label>
          {dictionary.newsletter.honeypot}
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="col-span-full text-meta text-text-muted">
        {text.privacyNotice}{' '}
        <SiteLink href={ROUTES.privacy} className="underline">
          {text.privacyLink}
        </SiteLink>
      </p>
      {messages.map((field) => (
        <FieldControl
          key={field.name}
          field={field}
          error={errors[field.name]}
          submit={
            <Button type="submit" disabled={status === 'sending'} className="self-start">
              {submitLabel}
            </Button>
          }
        />
      ))}
      {messages.length === 0 ? (
        <Button type="submit" disabled={status === 'sending'} className="col-span-full w-fit">
          {submitLabel}
        </Button>
      ) : null}
      <p
        role="status"
        className={cx(
          'col-span-full text-meta empty:hidden',
          status === 'sending' ? 'text-text-muted' : 'text-error',
        )}
      >
        {MESSAGES[status]}
      </p>
    </form>
  );
}
