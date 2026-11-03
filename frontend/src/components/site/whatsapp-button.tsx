import type { SiteSettings } from '@waren/shared';
import { WhatsAppIcon } from '@/components/ui/icons';
import { VisuallyHidden } from '@/components/ui/layout';
import { dictionary } from '@/lib/dictionary';
import { whatsAppLink } from '@/lib/utils/links';

export function WhatsAppButton({ whatsApp }: { whatsApp: SiteSettings['whatsApp'] }) {
  return (
    <a
      href={whatsAppLink(whatsApp.number, whatsApp.message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-card transition-colors duration-(--duration-calm) hover:bg-gold-400"
    >
      <WhatsAppIcon className="size-7" />
      <VisuallyHidden>{dictionary.cta.whatsApp}</VisuallyHidden>
    </a>
  );
}
