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
import { useId, useState, type FormEvent } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { visitAttribution } from '@/lib/attribution/visit';
import { dictionary } from '@/lib/dictionary';
import { cx } from '@/lib/utils/cx';

const text = dictionary.leadForm;
const HONEYPOT_FIELD = 'website';
const TOO_MANY_REQUESTS = 429;
const CONTROL =
  'min-h-12 w-full border border-border-strong bg-surface px-3.5 py-2.5 text-text aria-invalid:border-error';

type FormName = 'contact' | 'consultation' | 'recording';
type FieldName = keyof typeof text.labels;
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'limited' | 'invalid';

interface Field {
  name: FieldName;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  options?: readonly string[];
  required?: boolean;
  autoComplete?: string;
  wide?: boolean;
}

const NAME: Field = { name: 'name', type: 'text', required: true, autoComplete: 'name' };
const EMAIL: Field = { name: 'email', type: 'email', required: true, autoComplete: 'email' };
const COUNTRY: Field = {
  name: 'country',
  type: 'select',
  options: COUNTRIES,
  required: true,
  autoComplete: 'country-name',
};
const HEARD_ABOUT: Field = {
  name: 'heardAbout',
  type: 'select',
  options: HEARD_ABOUT_OPTIONS,
  wide: true,
};

function fieldsFor(form: FormName, practiceAreas: readonly string[]): Field[] {
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

function FieldControl({ field, error }: { field: Field; error: string | undefined }) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: field.name,
    required: field.required,
    autoComplete: field.autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: CONTROL,
  };
  return (
    <div className={cx('flex min-w-0 flex-col gap-2', field.wide && 'col-span-full')}>
      <label htmlFor={id} className="text-link font-semibold text-brand">
        {text.labels[field.name]}
      </label>
      {field.type === 'textarea' ? (
        <textarea rows={5} {...shared} />
      ) : field.type === 'select' ? (
        <select defaultValue="" {...shared}>
          <option value="">{dictionary.forms.choose}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={field.type} {...shared} />
      )}
      {error ? (
        <p id={errorId} className="text-meta text-error">
          {error}
        </p>
      ) : null}
    </div>
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
      {fields.map((field) => (
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
      <div className="col-span-full">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-block min-h-12 bg-brand px-6.5 py-3.5 text-center text-button font-semibold text-on-brand"
        >
          {submitLabel}
        </button>
      </div>
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
