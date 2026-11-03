'use client';

import type { SiteSettings } from '@waren/shared';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ROUTES } from '@waren/shared/constants';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/form';
import {
  OPEN_CONSENT_EVENT,
  parseConsent,
  readConsentValue,
  subscribeToConsent,
  writeConsent,
  type ConsentChoice,
} from '@/lib/consent/consent';
import { loadConsentedTags } from '@/lib/consent/tags';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.consent;
const NOT_READ_YET = 'server';

const readCookie = () => readConsentValue(document.cookie) ?? '';
const readOnServer = () => NOT_READ_YET;

export function CookieConsent({ tracking }: { tracking: SiteSettings['tracking'] }) {
  const stored = useSyncExternalStore(subscribeToConsent, readCookie, readOnServer);
  const choice = parseConsent(stored);
  const undecided = stored !== NOT_READ_YET && choice === null;
  const [editing, setEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, marketing: false });

  useEffect(() => {
    if (choice) loadConsentedTags(tracking, choice);
  }, [choice, tracking]);

  useEffect(() => {
    const open = () => {
      setDraft(
        parseConsent(readConsentValue(document.cookie)) ?? { analytics: false, marketing: false },
      );
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
      data-tone="dark"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-gold-500 bg-navy-950 text-on-dark"
    >
      <div className="mx-auto grid max-w-site gap-4 p-gutter md:px-8">
        <div>
          <h2 className="text-h4">{text.title}</h2>
          <p className="mt-1 text-small text-on-dark-muted">{text.description}</p>
          <Link
            href={ROUTES.cookies}
            className="text-small text-on-dark-muted underline underline-offset-4"
          >
            {text.policyLink}
          </Link>
        </div>
        {showDetails ? (
          <div className="grid gap-1 md:grid-cols-2">
            <Checkbox
              label={text.analytics}
              checked={draft.analytics}
              onChange={(event) => setDraft({ ...draft, analytics: event.target.checked })}
            />
            <Checkbox
              label={text.marketing}
              checked={draft.marketing}
              onChange={(event) => setDraft({ ...draft, marketing: event.target.checked })}
            />
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" onClick={() => decide({ analytics: true, marketing: true })}>
            {text.accept}
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => decide({ analytics: false, marketing: false })}
          >
            {text.reject}
          </Button>
          {showDetails ? (
            <Button variant="outline-dark" onClick={() => decide(draft)}>
              {text.save}
            </Button>
          ) : (
            <Button variant="outline-dark" onClick={() => setShowDetails(true)}>
              {text.preferences}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="underline-offset-4 hover:underline"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {text.reopen}
    </button>
  );
}
