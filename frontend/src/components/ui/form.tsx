import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cx } from '@/lib/utils/cx';

const CONTROL =
  'w-full min-h-tap rounded-sm border border-line-strong bg-surface px-3 py-2 text-body text-ink aria-invalid:border-danger';

interface FieldProps {
  label: string;
  error?: string | undefined;
  hint?: ReactNode;
  required?: boolean | undefined;
  requiredMark?: string;
  children: (ids: { id: string; describedBy: string | undefined }) => ReactNode;
}

function Field({ label, error, hint, required, requiredMark, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = cx(error ? errorId : null, hint ? hintId : null) || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-small font-medium text-ink">
        {label}
        {required && requiredMark ? <span aria-hidden="true"> {requiredMark}</span> : null}
      </label>
      {children({ id, describedBy })}
      {hint ? (
        <p id={hintId} className="mt-1 text-caption text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 text-small text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Common = Pick<FieldProps, 'label' | 'error' | 'hint' | 'requiredMark'>;

export function Input({
  label,
  error,
  hint,
  requiredMark,
  className,
  ...props
}: Common & ComponentProps<'input'>) {
  return (
    <Field {...{ label, error, hint, requiredMark }} required={props.required}>
      {({ id, describedBy }) => (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx(CONTROL, className)}
          {...props}
        />
      )}
    </Field>
  );
}

export function Textarea({
  label,
  error,
  hint,
  requiredMark,
  className,
  ...props
}: Common & ComponentProps<'textarea'>) {
  return (
    <Field {...{ label, error, hint, requiredMark }} required={props.required}>
      {({ id, describedBy }) => (
        <textarea
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx(CONTROL, className)}
          {...props}
        />
      )}
    </Field>
  );
}

export function Select({
  label,
  error,
  hint,
  requiredMark,
  className,
  children,
  ...props
}: Common & ComponentProps<'select'>) {
  return (
    <Field {...{ label, error, hint, requiredMark }} required={props.required}>
      {({ id, describedBy }) => (
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx(CONTROL, className)}
          {...props}
        >
          {children}
        </select>
      )}
    </Field>
  );
}

export function Checkbox({
  label,
  className,
  ...props
}: { label: ReactNode } & ComponentProps<'input'>) {
  return (
    <label className={cx('flex min-h-tap items-start gap-3 py-2 text-small', className)}>
      <input type="checkbox" className="mt-1 size-4 accent-navy-900" {...props} />
      <span>{label}</span>
    </label>
  );
}
