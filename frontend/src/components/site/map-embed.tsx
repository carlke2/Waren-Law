'use client';

import { useState } from 'react';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.contact;

export function MapEmbed({ url, officeName }: { url: string; officeName: string }) {
  const [show, setShow] = useState(false);
  if (!show) {
    return (
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={() => setShow(true)}
          className="min-h-11 self-start border-b-2 border-accent text-button font-bold text-brand"
        >
          {text.showMap(officeName)}
        </button>
        <p className="text-meta text-text-subtle">{text.mapNotice}</p>
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title={text.mapTitle(officeName)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="mt-auto aspect-insight w-full border border-border"
    />
  );
}
