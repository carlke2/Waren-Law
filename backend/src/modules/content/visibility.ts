import { ContentStatus, LegalReviewStatus } from '../../../prisma/generated/client.js';
import type { Env } from '../../config/env.schema.js';

export const PUBLISHED = { status: ContentStatus.published };

export const PUBLISHED_AND_APPROVED = {
  status: ContentStatus.published,
  legalReviewStatus: LegalReviewStatus.approved,
};

export function pageVisibility(env: Pick<Env, 'PREVIEW_UNREVIEWED_PAGES'>) {
  return env.PREVIEW_UNREVIEWED_PAGES ? PUBLISHED : PUBLISHED_AND_APPROVED;
}
