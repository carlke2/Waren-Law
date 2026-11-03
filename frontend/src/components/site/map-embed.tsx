'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.contact;

export function MapEmbed({ url, officeName }: { url: string; officeName: string }) {
  const [show, setShow] = useState(false);
  if (!show) {
    return (
      <div className="mt-4">
        <Button variant="outline" onClick={() => setShow(true)}>
          {text.showMap(officeName)}
        </Button>
        <p className="mt-2 text-caption text-ink-muted">{text.mapNotice}</p>
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title={text.mapTitle(officeName)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="mt-4 aspect-feature w-full rounded-md border border-line"
    />
  );
}
