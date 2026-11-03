import type { WebinarDetail } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.webinars;

export function WebinarAction({ webinar }: { webinar: WebinarDetail }) {
  if (webinar.state === 'upcoming' && webinar.registrationUrl) {
    return (
      <ButtonLink href={webinar.registrationUrl} variant="accent" size="lg" className="mt-6">
        {text.register}
      </ButtonLink>
    );
  }
  if (webinar.state === 'recording') {
    return (
      <div className="mt-6 max-w-lead rounded-md border border-gold-400 p-4">
        <p className="font-medium text-on-dark">{text.requestRecording}</p>
        <p className="mt-1 text-small">{text.recordingAvailableSoon}</p>
      </div>
    );
  }
  return null;
}
