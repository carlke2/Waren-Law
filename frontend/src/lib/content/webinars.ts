import type { WebinarSummary } from '@waren/shared';
import { dictionary } from '@/lib/dictionary';

export function webinarStateLabel(state: WebinarSummary['state']): string {
  return dictionary.webinars.states[state];
}
