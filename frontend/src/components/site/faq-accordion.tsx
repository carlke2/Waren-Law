import type { FaqItem } from '@waren/shared';
import { Accordion } from '@/components/ui/accordion';

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <Accordion
      items={items.map(({ question, answer }) => ({
        id: question,
        title: question,
        content: <p>{answer}</p>,
      }))}
    />
  );
}
