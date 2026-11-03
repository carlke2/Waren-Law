import { ContentStatus, LegalReviewStatus } from '../../../prisma/generated/client.js';

export const PUBLISHED = { status: ContentStatus.published };

export const PUBLISHED_AND_APPROVED = {
  status: ContentStatus.published,
  legalReviewStatus: LegalReviewStatus.approved,
};
