import type { HomeResponse, PracticeAreaSummary } from '@waren/shared';
import { PracticeCard } from '@/components/site/practice-card';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { CARD_HOVER_LINE } from './home-links';
import { SectionHeading } from './section-heading';

interface ExpertiseProps {
  home: HomeResponse;
  practiceAreas: readonly PracticeAreaSummary[];
}

export function Expertise({ home, practiceAreas }: ExpertiseProps) {
  return (
    <HomeSection tone="tint">
      <SectionHeading
        eyebrow={dictionary.home.expertiseEyebrow}
        title={home.expertiseTitle}
        intro={home.expertiseIntro}
        centred
      />
      <div className={`grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 ${CARD_HOVER_LINE}`}>
        {practiceAreas.map((area, index) => (
          <PracticeCard key={area.slug} area={area} index={index} />
        ))}
      </div>
    </HomeSection>
  );
}
