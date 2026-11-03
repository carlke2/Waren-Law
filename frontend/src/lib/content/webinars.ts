import type { WebinarSummary } from '@waren/shared';
import { dictionary } from '@/lib/dictionary';

export function webinarStateLabel(state: WebinarSummary['state']): string {
  return dictionary.webinars.states[state];
}

export function featuredWebinar(webinars: readonly WebinarSummary[]): WebinarSummary | undefined {
  return webinars.find(({ state }) => state === 'upcoming') ?? webinars[0];
}
