import { dictionary } from '@/lib/dictionary';

const { brand } = dictionary;

export function HeaderLogo() {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        aria-hidden="true"
        className="size-10 text-accent"
      >
        <path d="M8 12l8 26 8-20 8 20 8-26" />
        <path d="M6 12h8M34 12h8" />
      </svg>
      <span className="flex flex-col">
        <span className="font-heading text-wordmark font-semibold tracking-wordmark text-on-brand">
          {brand.wordmark}
        </span>
        <span className="mt-1 text-logo-sub font-bold tracking-logo-sub text-accent">
          {brand.suffix}
        </span>
      </span>
    </span>
  );
}

export function FooterLogo() {
  return (
    <span className="flex flex-col">
      <span className="font-heading text-wordmark-footer font-semibold tracking-wordmark-footer text-accent">
        {brand.wordmark}
      </span>
      <span className="mt-1 text-logo-sub-footer font-bold tracking-logo-sub-footer text-on-brand">
        {brand.suffix}
      </span>
    </span>
  );
}
