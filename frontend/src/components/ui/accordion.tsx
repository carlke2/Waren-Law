import type { ReactNode } from 'react';
import { ChevronIcon } from './icons';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-h4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
            {item.title}
            <ChevronIcon className="size-5 shrink-0 transition-transform duration-(--duration-calm) group-open:rotate-180" />
          </summary>
          <div className="pb-5 text-ink-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
