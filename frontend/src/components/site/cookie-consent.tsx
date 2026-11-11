'use client';

import type { SiteSettings } from '@waren/shared';
import { ROUTES } from '@waren/shared/constants';
import { SiteLink } from '@/components/ui/site-link';
import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import {
  OPEN_CONSENT_EVENT,
  parseConsent,
  readConsentValue,
  subscribeToConsent,
  writeConsent,
  type ConsentChoice,
} from '@/lib/utils/consent/consent';
import { loadConsentedTags } from '@/lib/utils/consent/tags';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.consent;
const NOT_READ_YET = 'server';
const NOTHING_ACCEPTED: ConsentChoice = { analytics: false, marketing: false };
const EVERYTHING_ACCEPTED: ConsentChoice = { analytics: true, marketing: true };

const readCookie = () => readConsentValue(document.cookie) ?? '';
const readOnServer = () => NOT_READ_YET;

function ChoiceButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 flex-1 border border-ink bg-surface px-4 text-button font-semibold text-ink"
    >
      {children}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-center gap-3 text-meta">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 shrink-0 accent-accent"
      />
      {label}
    </label>
  );
}

export function CookieConsent({ tracking }: { tracking: SiteSettings['tracking'] }) {
  const stored = useSyncExternalStore(subscribeToConsent, readCookie, readOnServer);
  const choice = parseConsent(stored);
  const undecided = stored !== NOT_READ_YET && choice === null;
  const [editing, setEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(NOTHING_ACCEPTED);

  useEffect(() => {
    if (choice) loadConsentedTags(tracking, choice);
  }, [choice, tracking]);

  useEffect(() => {
    const open = () => {
      setDraft(parseConsent(readConsentValue(document.cookie)) ?? NOTHING_ACCEPTED);
      setShowDetails(true);
      setEditing(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (!undecided && !editing) return null;

  const decide = (next: ConsentChoice) => {
    const withdrew =
      (choice?.analytics && !next.analytics) || (choice?.marketing && !next.marketing);
    writeConsent(next);
    setEditing(false);
    setShowDetails(false);
    // Tags that have already loaded can only be removed by a fresh page.
    if (withdrew) window.location.reload();
  };

  return (
    <section
      aria-label={text.title}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface-deep p-5 pb-safe text-ink sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-full sm:max-w-consent sm:border sm:p-4"
    >
      <h2 className="font-heading text-footer-heading">{text.title}</h2>
      <p className="mt-1 text-meta text-text-body">{text.description}</p>
      {showDetails ? (
        <div className="mt-2 flex flex-col">
          <Toggle
            label={text.analytics}
            checked={draft.analytics}
            onChange={(analytics) => setDraft({ ...draft, analytics })}
          />
          <Toggle
            label={text.marketing}
            checked={draft.marketing}
            onChange={(marketing) => setDraft({ ...draft, marketing })}
          />
        </div>
      ) : null}
      <div className="mt-3 flex gap-3">
        <ChoiceButton onClick={() => decide(EVERYTHING_ACCEPTED)}>{text.accept}</ChoiceButton>
        <ChoiceButton onClick={() => decide(NOTHING_ACCEPTED)}>{text.reject}</ChoiceButton>
      </div>
      <div className="mt-1 flex items-center justify-between gap-3 text-meta sm:mt-2">
        {showDetails ? (
          <button
            type="button"
            onClick={() => decide(draft)}
            className="underline underline-offset-4 max-sm:min-h-11"
          >
            {text.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="underline underline-offset-4 max-sm:min-h-11"
          >
            {text.preferences}
          </button>
        )}
        <SiteLink
          href={ROUTES.cookies}
          className="text-text-body underline decoration-accent underline-offset-4 max-sm:flex max-sm:min-h-11 max-sm:items-center"
        >
          {text.policyLink}
        </SiteLink>
      </div>
    </section>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="text-ink underline decoration-accent max-sm:inline-flex max-sm:min-h-11 max-sm:items-center"
    >
      {text.reopen}
    </button>
  );
}
