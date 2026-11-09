import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.home;

export function HelpIntro() {
  return (
    <section className="bg-surface">
      <div className="site-container flex flex-col items-center gap-4 py-16 text-center sm:py-28">
        <Eyebrow>{text.helpEyebrow}</Eyebrow>
        <h2 className="font-heading text-h2 font-bold text-balance text-brand uppercase">
          {text.helpTitle}
        </h2>
        <span className="h-rule w-rule-long bg-accent" />
        <p className="max-w-reading text-intro text-text-muted">{text.helpIntro}</p>
      </div>
    </section>
  );
}
