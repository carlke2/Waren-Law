import { cx } from '@/lib/utils/cx';

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  centred?: boolean;
}

export function HomeEyebrow({ children }: { children: string }) {
  return (
    <span className="text-eyebrow font-bold tracking-eyebrow text-brand uppercase">{children}</span>
  );
}

export function SectionHeading({ title, eyebrow, intro, centred }: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'flex max-w-section-header flex-col gap-4',
        centred && 'mx-auto items-center text-center',
      )}
    >
      {eyebrow ? <HomeEyebrow>{eyebrow}</HomeEyebrow> : null}
      <h2 className="font-heading text-h2 font-medium text-balance text-brand">{title}</h2>
      {intro ? <p className="text-intro text-text-muted">{intro}</p> : null}
    </div>
  );
}
