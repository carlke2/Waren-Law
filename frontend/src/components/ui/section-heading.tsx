import { Eyebrow } from './eyebrow';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  onBrand?: boolean;
  compact?: boolean;
}

export function SectionHeading({ eyebrow, title, onBrand, compact }: SectionHeadingProps) {
  const size = compact ? 'text-h2-compact' : 'text-h2';
  return (
    <div className="flex flex-col gap-3">
      {onBrand ? (
        <div className="flex items-center gap-3.5">
          <span className="h-rule w-rule-short bg-accent" />
          <Eyebrow onBrand>{eyebrow}</Eyebrow>
        </div>
      ) : (
        <Eyebrow>{eyebrow}</Eyebrow>
      )}
      <h2 className={`font-heading ${size} font-medium ${onBrand ? '' : 'text-brand'}`}>{title}</h2>
    </div>
  );
}
