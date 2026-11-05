import type { ComponentProps } from 'react';
import { cx } from '@/lib/utils/cx';

const ORIENTATION = {
  vertical: 'flex-col',
  horizontal: 'flex-row items-center',
} as const;

type FieldOrientation = keyof typeof ORIENTATION;

export function Field({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<'div'> & { orientation?: FieldOrientation }) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cx(
        'group/field flex w-full gap-2 data-[invalid=true]:text-error',
        ORIENTATION[orientation],
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      data-slot="field-label"
      className={cx(
        'flex w-fit text-link font-semibold text-brand group-data-disabled/field:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cx('text-meta text-text-muted', className)}
      {...props}
    />
  );
}

export function FieldError({ className, children, ...props }: ComponentProps<'p'>) {
  if (!children) return null;
  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cx('text-meta text-error', className)}
      {...props}
    >
      {children}
    </p>
  );
}
